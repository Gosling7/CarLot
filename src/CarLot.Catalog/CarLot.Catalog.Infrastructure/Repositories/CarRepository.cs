using CarLot.Catalog.Application.DTOs;
using CarLot.Catalog.Application.Interfaces;
using CarLot.Catalog.Domain.Entities;
using CarLot.Catalog.Infrastructure.Extensions;
using Microsoft.EntityFrameworkCore;

namespace CarLot.Catalog.Infrastructure.Repositories;

internal class CarRepository : ICarRepository
{
    private readonly CatalogDbContext _dbContext;

    public CarRepository(CatalogDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Guid> AddAsync(Car car)
    {
        _dbContext.Cars.Add(car.ToDao());
        await _dbContext.SaveChangesAsync();

        return car.Id;
    }

    public async Task<CarDto> GetByIdAsync(Guid carId)
    {
        return await _dbContext.Cars
            .Include(c => c.Equipment)
            .ThenInclude(c => c.Equipment)
            .Where(c => c.Id == carId)
            .Select(c => c.ToDto())
            .AsNoTracking()
            .FirstOrDefaultAsync();
    }

    public async Task DeleteAsync(Guid carId)
    {
        await _dbContext.Cars
            .Where(c => c.Id == carId)
            .ExecuteDeleteAsync();
    }
}
