using CarLot.Catalog.Application.Interfaces;
using CarLot.Catalog.Domain;
using CarLot.Catalog.Domain.Entities;

namespace CarLot.Catalog.Application.UseCases;

public class UpdateMileageUseCase
{
    private readonly ICarRepository _carRepository;

    public UpdateMileageUseCase(ICarRepository carRepository)
    {
        _carRepository = carRepository;
    }

    public async Task<Result> ExecuteAsync(string vin, int mileage)
    {
        var car = await _carRepository.GetEntityByVinAsync(vin);
        if (car is null)
        {
            return Result.Failure(
                [new Error(nameof(Car.Vin), "No car with the given vin")]);
        }

        var result = car.UpdateMileage(mileage);
        if (!result.IsSuccess)
        {
            return result;
        }

        await _carRepository.SaveChangesAsync();

        return result;
    }
}
