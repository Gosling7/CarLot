using CarLot.Catalog.Application.Interfaces;
using CarLot.Catalog.Domain.ValueObjects;
using CarLot.Catalog.Infrastructure.Extensions;
using Microsoft.EntityFrameworkCore;

namespace CarLot.Catalog.Infrastructure.Repositories;

internal class EquipmentRepository : IEquipmentRepository
{
    private readonly CatalogDbContext _dbContext;

    public EquipmentRepository(CatalogDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Equipment>> GetByCodesAsync(IEnumerable<string> equipmentCodes)
    {
        return await _dbContext.Equipment
            .Where(e => equipmentCodes.Contains(e.Code))
            .Select(e => e.AsEntity())
            .ToListAsync();
    }
}
