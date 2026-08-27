using CarLot.Catalog.Application.DTOs;
using CarLot.Catalog.Application.Interfaces;
using CarLot.Catalog.Domain.Entities;
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

    public async Task<List<EquipmentDto>> GetAllAsync()
    {
        return await _dbContext.Equipment.Select(e => e.ToDto()).ToListAsync();
    }

    public async Task<List<Equipment>> GetByCodesAsync(IEnumerable<string> equipmentCodes)
    {
        return await _dbContext.Equipment
            .Where(e => equipmentCodes.Contains(e.Code))
            .ToListAsync();
    }
}
