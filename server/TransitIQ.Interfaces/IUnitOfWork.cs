using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TransitIQ.Interfaces.Entities;
using TransitIQ.Interfaces.Repositories;

namespace TransitIQ.Interfaces
{
    public interface IUnitOfWork: IDisposable
    {
        //IGtfsFilesRepository GtfsFilesRepository { get; }
        IGtfsFilesRepository GtfsFilesRepository { get; }

        IRepository<Agency> AgencyRepository { get; }

        IRepository<GtfsSubAgency> SubAgencyRepository { get; }

        Task SaveChangesAsync();

        Task<IEnumerable<string>> PublishGtfsFile(string agencyId, string gtfsFileId, bool unpublishExisting = false);

    }
}
