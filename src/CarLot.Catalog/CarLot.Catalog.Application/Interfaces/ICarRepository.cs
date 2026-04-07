using CarLot.Catalog.Application.DTOs;
using CarLot.Catalog.Domain.Entities;

namespace CarLot.Catalog.Application.Interfaces;

public interface ICarRepository
{
    Task<Guid> AddAsync(Car car);
    Task<CarDto?> GetDtoByVinAsync(string vin);
    Task<PaginatedResponse<CarDto>> GetAsync(GetCarsRequest request);
    Task<CarStatsDto> GetCarStatsAsync();
    Task SaveChangesAsync();
    Task<bool> IsVinAlreadyPresentAsync(string vin);
    Task<Car?> GetEntityByVinAsync(string vin);
    Task UpdateMileage(int mileage);
    Task DeleteAsync(Guid carId);
}
