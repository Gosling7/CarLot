using CarLot.Catalog.Application.Interfaces;
using CarLot.Catalog.Domain.Entities;
using CarLot.Catalog.Infrastructure.Extensions;

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
        _dbContext.Cars.Add(car.AsDao());
        await _dbContext.SaveChangesAsync();

        return car.Id;
    }
}
