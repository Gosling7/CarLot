using CarLot.Catalog.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CarLot.Catalog.Infrastructure;

public class DataSeeder : IDataSeeder
{
    private readonly CatalogDbContext _dbContext;

    public DataSeeder(CatalogDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task EnsureDatabaseInitializedAsync()
    {
        await _dbContext.Database.MigrateAsync();
        if (!_dbContext.Equipment.Any())
        {
            await SeedEquipmentAsync();
        }
    }

    private async Task SeedEquipmentAsync()
    {
        var equipment = new List<Equipment>
        {
            new(Guid.NewGuid(), "AC", "Air Conditioning"),
            new(Guid.NewGuid(), "LANE_ASSIST", "Lane Assist"),
        };

        await _dbContext.Equipment.AddRangeAsync(equipment);
        await _dbContext.SaveChangesAsync();
    }
}
