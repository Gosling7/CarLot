using CarLot.Catalog.Infrastructure.DataAccessObjects;
using Microsoft.EntityFrameworkCore;

namespace CarLot.Catalog.Infrastructure;

public class DataSeeder : IDataSeeder
{
    private readonly CatalogDbContext _dbContext;

    private readonly Guid ComfortCategoryId = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa");
    private readonly Guid SafetyCategoryId = Guid.Parse("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb");

    public DataSeeder(CatalogDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task EnsureDatabaseInitializedAsync()
    {
        await _dbContext.Database.MigrateAsync();

        if (!_dbContext.EquipmentCategories.Any())
        {
            await SeedCategoriesAsync();
        }
        if (!_dbContext.Equipment.Any())
        {
            await SeedEquipmentAsync();
        }
    }

    private async Task SeedCategoriesAsync()
    {
        var categories = new List<EquipmentCategoryDao>
        {
            new()
            {
                Id = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                Code = "COMFORT",
                Name = "Comfort"
            },
            new()
            {
                Id = Guid.Parse("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                Code = "SAFETY",
                Name = "Safety"
            }
        };

        await _dbContext.EquipmentCategories.AddRangeAsync(categories);
        await _dbContext.SaveChangesAsync();
    }

    private async Task SeedEquipmentAsync()
    {
        var equipment = new List<EquipmentDao>
        {
            new()
            {
                Code = "AC",
                Name = "Air Conditioning",
                CategoryId = ComfortCategoryId
            },
            new()
            {
                Code = "LANE_ASSIST",
                Name = "Lane Assist",
                CategoryId = SafetyCategoryId
            }
        };

        await _dbContext.Equipment.AddRangeAsync(equipment);
        await _dbContext.SaveChangesAsync();
    }
}
