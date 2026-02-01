using CarLot.Catalog.Application.DTOs;

namespace CarLot.Catalog.Application.Interfaces;

public interface ICarRepository
{
    Task<Guid> AddAsync(Domain.Entities.Car car);
    Task<CarDto> GetByIdAsync(Guid carId);
    Task DeleteAsync(Guid carId);
}
