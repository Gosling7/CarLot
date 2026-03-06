using CarLot.Catalog.Application.DTOs;
using CarLot.Catalog.Application.Interfaces;

namespace CarLot.Catalog.Application.UseCases;

public class GetCarsUseCase
{
    private readonly ICarRepository _carRepository;

    public GetCarsUseCase(
        ICarRepository carRepository)
    {
        _carRepository = carRepository;
    }

    public async Task<IEnumerable<CarDto>> ExecuteAsync()
    {
        var cars = await _carRepository.GetAsync();
        return cars;
    }
}
