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

    public async Task<PaginatedResponse<CarDto>> GetAsync(GetCarsRequest request)
    {
        var query = _dbContext.Cars.AsQueryable();

        var search = request.Search;
        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.ToLower();

            query = query.Where(c =>
                c.VIN.ToLower().Contains(s) ||
                c.Make.ToLower().Contains(s) ||
                c.Model.ToLower().Contains(s));
        }

        if (request.Status is not null && request.Status.Count != 0)
        {
            query = query.Where(c => request.Status.Contains(c.Status));
        }

        var carsCount = query.Count();

        var pageSize = request.PageSize;
        var page = request.Page;
        var cars = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Include(c => c.Equipment)
            .Select(c => c.ToDto())
            .AsNoTracking()
            .ToListAsync();

        var totalPages = (int)MathF.Ceiling((float)carsCount / pageSize);

        return new PaginatedResponse<CarDto>(
            Items: cars,
            Page: page,
            PageSize: pageSize,
            TotalPages: totalPages,
            TotalItems: carsCount);
    }

    public async Task<Car?> GetEntityByVinAsync(string vin)
    {
        return await _dbContext.Cars
            .Include(c => c.Equipment)
            .Where(c => c.VIN == vin)
            .FirstOrDefaultAsync();
    }

    public async Task<CarDto?> GetDtoByVinAsync(string vin)
    {
        return await _dbContext.Cars
            .Include(c => c.Equipment)
            .Where(c => c.VIN == vin)
            .Select(c => c.ToDto())
            .AsNoTracking()
            .FirstOrDefaultAsync();
    }

    public async Task<Guid> AddAsync(Car car)
    {
        _dbContext.Cars.Add(car);
        await _dbContext.SaveChangesAsync();

        return car.Id;
    }

    public async Task SaveChangesAsync()
    {
        await _dbContext.SaveChangesAsync();
    }

    public async Task<bool> IsVinUniqueAsync(string vin)
    {
        return await _dbContext.Cars.AnyAsync(c => c.VIN != vin);
    }

    public Task DeleteAsync(Guid carId)
    {
        throw new NotImplementedException();
    }

    public Task<CarDto?> GetByIdAsync(Guid carId)
    {
        throw new NotImplementedException();
    }

    public Task<CarStatsDto> GetCarStatsAsync()
    {
        throw new NotImplementedException();
    }

    public Task UpdateMileage(int mileage)
    {
        throw new NotImplementedException();
    }

    //public async Task<CarDto?> GetByIdAsync(Guid carId)
    //{
    //    return await _dbContext.Cars
    //        .Include(c => c.Equipment)
    //        .ThenInclude(c => c.Equipment)
    //        .Where(c => c.Id == carId)
    //        .Select(c => c.ToDto())
    //        .AsNoTracking()
    //        .FirstOrDefaultAsync();
    //}

    //public async Task<Car> GetEntityByVin(string vin)
    //{
    //    return await _dbContext.Cars
    //        .Include(c => c.Equipment)
    //        .ThenInclude(c => c.Equipment)
    //        .Where(c => c.VIN == vin)
    //        .Select(c => c.ToEntity())
    //        .FirstOrDefaultAsync();
    //}

    //public async Task<PaginatedResponse<CarDto>> GetAsync(GetCarsRequest request)
    //{
    //    var query = _dbContext.Cars.AsQueryable();

    //    var search = request.Search;
    //    if (!string.IsNullOrWhiteSpace(search))
    //    {
    //        var s = search.ToLower();

    //        query = query.Where(c =>
    //            c.VIN.ToLower().Contains(s) ||
    //            c.Make.ToLower().Contains(s) ||
    //            c.Model.ToLower().Contains(s));
    //    }

    //    query = query.Where(c => request.Status.Contains(c.Status));

    //    var count = query.Count();

    //    var pageSize = request.PageSize;
    //    var page = request.Page;
    //    var cars = await query
    //        .Skip((page - 1) * pageSize)
    //        .Take(pageSize)
    //        .Include(c => c.Equipment)
    //        .ThenInclude(c => c.Equipment)
    //        .Select(c => c.ToDto())
    //        .AsNoTracking()
    //        .ToListAsync();

    //    var totalPages = (int)MathF.Ceiling((float)count / pageSize);

    //    return new PaginatedResponse<CarDto>(
    //        Items: cars,
    //        Page: page,
    //        PageSize: pageSize,
    //        TotalPages: totalPages,
    //        TotalItemsCount: count);
    //}

    //public async Task<CarStatsDto> GetCarStatsAsync()
    //{
    //    var stats = await _dbContext.Cars
    //        .GroupBy(_ => true)
    //        .Select(g => new CarStatsDto(
    //            g.Count(),
    //            g.Count(c => c.Status == CarStatus.Received),
    //            g.Count(c => c.Status == CarStatus.Preparing))
    //        )
    //        .FirstOrDefaultAsync();

    //    stats ??= new CarStatsDto(0, 0, 0);

    //    return stats;
    //}



    //public async Task DeleteAsync(Guid carId)
    //{
    //    await _dbContext.Cars
    //        .Where(c => c.Id == carId)
    //        .ExecuteDeleteAsync();
    //}

    //public Task UpdateMileage(int mileage)
    //{
    //    throw new NotImplementedException();
    //}
}
