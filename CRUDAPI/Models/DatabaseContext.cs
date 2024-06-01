using Microsoft.EntityFrameworkCore;

namespace CRUDAPI.Models
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) 
            : base(options)
        {
            
        }
        
    }
}