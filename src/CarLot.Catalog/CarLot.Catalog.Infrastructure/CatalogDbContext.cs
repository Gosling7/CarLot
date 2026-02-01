using CarLot.Catalog.Infrastructure.DataAccessObjects;
using Microsoft.EntityFrameworkCore;

namespace CarLot.Catalog.Infrastructure;

public class CatalogDbContext : DbContext
{
    public DbSet<CarDao> Cars { get; set; }
    public DbSet<EquipmentDao> Equipment { get; set; }
    public DbSet<CarEquipmentDao> CarEquipment { get; set; }
    public DbSet<EquipmentCategoryDao> EquipmentCategories { get; set; }

    public CatalogDbContext(DbContextOptions<CatalogDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(CatalogDbContext).Assembly);
    }
}
