using CarLot.Catalog.Application.DTOs;
using CarLot.Catalog.Application.Interfaces;

namespace CarLot.Catalog.Application.UseCases;

public class GetCarUseCase
{
    private readonly ICarRepository _carRepository;

    public GetCarUseCase(
        ICarRepository carRepository)
    {
        _carRepository = carRepository;
    }

    public async Task<CarDto> ExecuteAsync(Guid carId)
    {
        var car = await _carRepository.GetByIdAsync(carId);
        return car;
    }
}
