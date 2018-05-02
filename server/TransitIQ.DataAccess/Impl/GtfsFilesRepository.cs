using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TransitIQ.Interfaces.Entities;
using TransitIQ.Interfaces.Repositories;

namespace TransitIQ.DataAccess.Impl
{
    public class GtfsFilesRepository : Repository<GtfsFile>, IGtfsFilesRepository
    {
        private readonly DbSet<GtfsFile> _dbset;

        public GtfsFilesRepository(DataContext context) : base(context)
        {
            _dbset = context.GtfsFiles;
        }

        public async Task<IEnumerable<GtfsFile>> GetAll()
        {
            return await _dbset.AsQueryable().OrderByDescending(f => f.UploadedUtc).ToListAsync();
        }

        public async Task AddGtfsFile(GtfsFile item)
        {
            _dbset.Add(item);
        }

        public async Task DeleteGtfsFile()
        {

        }

        public async Task SetValid(string gtfsId, bool valid)
        {
            var gtfs = _dbset.FirstOrDefault(g => g.GtfsFileId == gtfsId);
            gtfs.Valid = valid;
        }
    }
}