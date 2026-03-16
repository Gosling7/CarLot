using CarLot.Catalog.Application.DTOs;

namespace CarLot.Catalog.Application.Interfaces;

public interface ICarRepository
{
    Task<Guid> AddAsync(Domain.Entities.Car car);
    Task<CarDto?> GetByIdAsync(Guid carId);
    Task<CarDto?> GetByVinAsync(string vin);
    Task<PaginatedResponse<CarDto>> GetAsync(GetCarsRequest request);
    Task<CarStatsDto> GetCarStatsAsync();
    Task<bool> IsVinAlreadyPresentAsync(string vin);
    Task DeleteAsync(Guid carId);
}
