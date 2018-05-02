using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using TransitIQ.Interfaces.Entities;

namespace TransitIQ.Services
{
    public interface IGtfsFileService
    {
        Task<IEnumerable<GtfsFile>> GetAllGtfs(string agencyId);

        Task AddGtfs(GtfsFile gtfs);

        Task DeleteGtfs(string agencyId, string gtfsId);

        Task<string> SaveGtfs(Stream stream, string fileName, string agencyId);

        Task<IEnumerable<string>> PublishGtfsFile(string agencyId, string gtfsFileId, bool unpublishExisting = false);

        Task UnublishGtfsFile(string gtfsFileId);

        Task<bool> ValidateGtfsFile(string gtfsFileId);

    }
}
