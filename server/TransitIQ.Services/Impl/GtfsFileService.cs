using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TransitIQ.Interfaces;
using TransitIQ.Interfaces.Entities;
using TransitIQ.Services.Helpers;

namespace TransitIQ.Services.Impl
{
    public class GtfsFileService: IGtfsFileService
    {
        private readonly IUnitOfWork _unitOfWork;
        private IStorage _storage;
        private const string TRANSITIQ_API_URL = "https://api.transitiq.com/Service.svc/";

        public GtfsFileService(IUnitOfWork unitOfWork, IStorage storage)
        {
            _unitOfWork = unitOfWork;
            _storage = storage;
        }

        public async Task<IEnumerable<GtfsFile>> GetAllGtfs(string agencyId)
        {
            return await _unitOfWork.GtfsFilesRepository.Entities
                .Where(g => g.AgencyId == agencyId)
                .OrderByDescending(g => g.UploadedUtc)
                .ToListAsync(); 
        }

        public async Task DeleteGtfs(string agencyId, string gtfsId)
        {
            var agency = _unitOfWork.AgencyRepository.Entities.FirstOrDefault(a => a.AgencyId == agencyId);

            if (agency == null)
            {
                throw new Exception($"Agency {agencyId} was not found.");
            }
            await _storage.DeleteBlob(agency.StorageAccountName, gtfsId);

            var gtfs = await _unitOfWork.GtfsFilesRepository.Entities.FirstOrDefaultAsync(e => e.GtfsFileId == gtfsId);
            _unitOfWork.GtfsFilesRepository.Remove(gtfs);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task AddGtfs(GtfsFile gtfsRecord)
        {
            _unitOfWork.GtfsFilesRepository.Add(gtfsRecord);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<string> SaveGtfs(Stream stream, string originalName, string agencyId)
        {
            DateTime? fromDate;
            DateTime? toDate;
            string timezone;

            var gtfsSubAgencies = new List<GtfsSubAgency>();

            GtfsHelper.ParseGtfs(stream, out fromDate, out toDate, out timezone, out gtfsSubAgencies);

            var agency = _unitOfWork.AgencyRepository.Entities.FirstOrDefault(a => a.AgencyId == agencyId);

            if (agency == null)
            {
                throw new Exception($"Agency {agencyId} was not found.");
            }
            var gtfsFileId = GtfsHelper.GetGtfsFileId(agencyId);
            string url;

            /*using (var memoryStream = new MemoryStream())
            {
                stream.CopyTo(memoryStream);
                var fileBytes = memoryStream.ToArray();

                url =  await _storage.StoreFileInBlob(agency.StorageAccountName, gtfsFileId, fileBytes);
            }*/
            byte[] arr = new byte[stream.Length];

            //var memoryStream = new MemoryStream(arr);
            
            //stream.CopyTo(memoryStream);
            //var fileBytes = memoryStream.ToArray();

            //url = await _storage.StoreFileInBlob(agency.StorageAccountName, gtfsFileId, fileBytes);
            stream.Position = 0;
            url = await _storage.StoreFileInBlob(agency.StorageAccountName, gtfsFileId, stream);

            foreach (var subAgency in gtfsSubAgencies)
            {
                subAgency.GtfsFileId = gtfsFileId;
                _unitOfWork.SubAgencyRepository.Add(subAgency);
            }

            var gtfsEntity = new GtfsFile
            {
                AgencyId = agencyId,
                CalendarFrom = fromDate.HasValue
                    ? GtfsHelper.DateTimeToDateTimeOffset(timezone, fromDate.Value)
                    : (DateTimeOffset?) null,
                CalendarTo = toDate.HasValue
                    ? GtfsHelper.DateTimeToDateTimeOffset(timezone, toDate.Value)
                    : (DateTimeOffset?) null,
                OriginalName = originalName,
                GtfsFileId = gtfsFileId,
                UploadedUtc = DateTime.UtcNow,
                Status = "New"
            };

            _unitOfWork.GtfsFilesRepository.Add(gtfsEntity);

            await _unitOfWork.SaveChangesAsync();
            return url;
        }

        public async Task<IEnumerable<string>> PublishGtfsFile(string agencyId, string gtfsFileId, bool unpublishExisting = false)
        {
            return await _unitOfWork.PublishGtfsFile(agencyId, gtfsFileId, unpublishExisting);
        }

        public async Task UnublishGtfsFile(string gtfsFileId)
        {
            var gtfs =  _unitOfWork.GtfsFilesRepository.Entities.FirstOrDefault(g => g.GtfsFileId == gtfsFileId);
            gtfs.Status = "Unpublished";
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<bool> ValidateGtfsFile(string gtfsFileId)
        {
            bool result;
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(TRANSITIQ_API_URL);
                client.DefaultRequestHeaders.Accept.Clear();

                var response = await client.GetAsync($"ValidateGTFS?format=json&gtfsFileId={gtfsFileId}");

                if (!response.IsSuccessStatusCode)
                    throw new Exception(await response.Content.ReadAsStringAsync());

                var apiRes = await response.Content.ReadAsStringAsync();
                result = apiRes == "\"Ok\"";
                //return apiRes.Data;
            }

            await _unitOfWork.GtfsFilesRepository.SetValid(gtfsFileId, result);
            await _unitOfWork.SaveChangesAsync();
            return result;
        }
    }
}
