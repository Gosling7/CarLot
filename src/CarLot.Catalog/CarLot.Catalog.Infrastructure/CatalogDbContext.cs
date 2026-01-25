using CarLot.Catalog.Infrastructure.DataAccessObjects;
using Microsoft.EntityFrameworkCore;

namespace CarLot.Catalog.Infrastructure;

internal class CatalogDbContext : DbContext
{
    public DbSet<CarDAO> Cars { get; set; }
    public DbSet<EquipmentCodeDAO> EquipmentCodes { get; set; }
    public DbSet<CarEquipmentDAO> CarEquipments { get; set; }

    public CatalogDbContext(DbContextOptions<CatalogDbContext> options)
        : base(options)
    {
    }
}
