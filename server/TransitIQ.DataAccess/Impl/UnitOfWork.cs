using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TransitIQ.Interfaces;
using TransitIQ.Interfaces.Entities;
using TransitIQ.Interfaces.Repositories;

namespace TransitIQ.DataAccess.Impl
{
    public class UnitOfWork: IUnitOfWork
    {
        private readonly DataContext _dataContext;

        public UnitOfWork(DataContext dataContext)
        {
            _dataContext = dataContext;

            //GtfsFilesRepository = new GtfsFilesRepository(_dataContext);
        }

        //public IGtfsFilesRepository GtfsFilesRepository { get; }

        public IGtfsFilesRepository GtfsFilesRepository => new GtfsFilesRepository(_dataContext);

        //public IRepository<GtfsFile> GtfsFilesRepository => new Repository<GtfsFile>(_dataContext);

        public IRepository<Agency> AgencyRepository => new Repository<Agency>(_dataContext);

        public IRepository<GtfsSubAgency> SubAgencyRepository => new Repository<GtfsSubAgency>(_dataContext);

        public async Task SaveChangesAsync()
        {
            await _dataContext.SaveChangesAsync();
        }

        public void Dispose()
        {
            _dataContext.Dispose();
        }

        public async Task<IEnumerable<string>> PublishGtfsFile(string agencyId, string gtfsFileId, bool unpublishExisting = false)
        {
            using (var command = _dataContext.Database.GetDbConnection().CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "PublishGtfsFile";

                var pAgency = command.CreateParameter();
                pAgency.ParameterName = "@agencyId";
                pAgency.Value = agencyId;
                command.Parameters.Add(pAgency);

                var pGtfsId = command.CreateParameter();
                pGtfsId.ParameterName = "@gtfsFileId";
                pGtfsId.Value = gtfsFileId;
                command.Parameters.Add(pGtfsId);

                var param = command.CreateParameter();
                param.ParameterName = "@unpublishExisting";
                param.Value = unpublishExisting;
                command.Parameters.Add(param);

                //command.Parameters.Add(new SqlParameter("@agencyId", SqlDbType.VarChar).AddWithValue("@agencyId", agencyId);
                //command.Parameters..AddWithValue("@gtfsFileId", gtfsFileId);
                //command.Parameters.AddWithValue("@unpublishExisting", unpublishExisting);

                _dataContext.Database.OpenConnection();
                var reader = await command.ExecuteReaderAsync();
                var result = new List<string>();

                while (reader.Read())
                {
                    result.Add(reader.GetString(0));
                }
                //await SaveChangesAsync();
                _dataContext.Database.CloseConnection();
                return result;
            }
        }
    }
}
