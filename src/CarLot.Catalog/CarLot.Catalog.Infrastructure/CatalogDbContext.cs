using CarLot.Catalog.Domain.Entities;
using CarLot.Catalog.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;

namespace CarLot.Catalog.Infrastructure;

public class CatalogDbContext : DbContext
{
    public DbSet<Car> Cars { get; set; }
    public DbSet<Equipment> Equipment { get; set; }
    //public DbSet<CarEquipmentDao> CarEquipment { get; set; }
    //public DbSet<EquipmentCategoryDao> EquipmentCategories { get; set; }

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
