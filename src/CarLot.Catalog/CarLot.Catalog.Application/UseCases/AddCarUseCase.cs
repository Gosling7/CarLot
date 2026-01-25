using CarLot.Catalog.Application.Interfaces;
using CarLot.Catalog.Domain.Entities;

namespace CarLot.Catalog.Application.UseCases;

public class AddCarUseCase
{
    private readonly ICarRepository _carRepository;

    public AddCarUseCase(ICarRepository carRepository)
    {
        _carRepository = carRepository;
    }

    public async Task<Guid> ExecuteAsync(Car car)
    {
        await _carRepository.AddAsync(car);

        return car.Id;
    }
}
