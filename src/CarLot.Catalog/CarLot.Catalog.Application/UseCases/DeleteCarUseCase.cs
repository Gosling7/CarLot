using CarLot.Catalog.Application.Interfaces;

namespace CarLot.Catalog.Application.UseCases;

public class DeleteCarUseCase
{
    private readonly ICarRepository _carRepository;

    public DeleteCarUseCase(ICarRepository carRepository)
    {
        _carRepository = carRepository;
    }

    public async Task ExecuteAsync(string carId)
    {
        await _carRepository.DeleteAsync(Guid.Parse(carId));
    }
}
