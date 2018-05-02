using Microsoft.EntityFrameworkCore;
using TransitIQ.Interfaces.Entities;

namespace TransitIQ.DataAccess
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            :base(options)
        {
            
        }
        public DbSet<GtfsFile> GtfsFiles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            ////Configure default schema
            //modelBuilder.HasDefaultSchema("Admin");

            //Map entity to table
            modelBuilder.Entity<GtfsFile>().ToTable("GtfsFile");
            modelBuilder.Entity<Agency>().ToTable("Agency");
            modelBuilder.Entity<GtfsSubAgency>().ToTable("GtfsSubAgency");

        }
    }
}
