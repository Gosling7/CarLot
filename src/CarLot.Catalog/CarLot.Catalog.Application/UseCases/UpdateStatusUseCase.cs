using CarLot.Catalog.Application.DTOs;
using CarLot.Catalog.Application.Interfaces;
using CarLot.Catalog.Domain;
using CarLot.Catalog.Domain.Entities;
using FluentValidation;

namespace CarLot.Catalog.Application.UseCases;

public class UpdateStatusUseCase
{
    private readonly ICarRepository _carRepository;
    private readonly IValidator<UpdateStatusRequest> _validator;

    public UpdateStatusUseCase(
        ICarRepository carRepository,
        IValidator<UpdateStatusRequest> validator)
    {
        _carRepository = carRepository;
        _validator = validator;
    }

    public async Task<Result> ExecuteAsync(string vin, UpdateStatusRequest request)
    {
        var errors = new List<Error>();

        var validationResult = await _validator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            foreach (var error in validationResult.Errors)
            {
                errors.Add(new Error(error.PropertyName, error.ErrorMessage));
            }

            return Result.Failure(errors);
        }

        var car = await _carRepository.GetEntityByVinAsync(vin);
        if (car is null)
        {
            return Result.Failure(
                [new Error(nameof(Car.VIN), "No car with the given vin")]);
        }

        car.UpdateStatus(request.Status);

        await _carRepository.SaveChangesAsync();

        return Result.Success();
    }
}
