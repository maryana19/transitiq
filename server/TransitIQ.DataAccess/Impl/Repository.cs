using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using TransitIQ.Interfaces.Repositories;

namespace TransitIQ.DataAccess.Impl
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly DataContext _dbContext;

        private DbSet<T> _dbSet => _dbContext.Set<T>();

        public IQueryable<T> Entities => _dbSet;

        public Repository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void Remove(T entity)
        {
            _dbSet.Remove(entity);
        }
        public void Add(T entity)
        {
            _dbSet.Add(entity);
        }

    }
}
