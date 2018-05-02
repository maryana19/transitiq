using System.Collections.Generic;
using System.Threading.Tasks;
using TransitIQ.Interfaces.Entities;

namespace TransitIQ.Interfaces.Repositories
{
    public interface IGtfsFilesRepository: IRepository<GtfsFile>
    {
        Task<IEnumerable<GtfsFile>> GetAll();

        Task AddGtfsFile(GtfsFile gtfs);

        Task DeleteGtfsFile();

        Task SetValid(string gtfsId, bool valid);

    }
}
