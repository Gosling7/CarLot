using CarLot.Catalog.Application.DTOs;
using CarLot.Catalog.Application.Interfaces;
using CarLot.Catalog.Domain;
using CarLot.Catalog.Domain.Entities;
using FluentValidation;

namespace CarLot.Catalog.Application.UseCases;

public class AddCarUseCase
{
    private readonly ICarRepository _carRepository;
    private readonly IEquipmentRepository _equipmentRepository;
    private readonly IValidator<AddCarRequest> _validator;

    public AddCarUseCase(
        ICarRepository carRepository,
        IEquipmentRepository equipmentRepository,
        IValidator<AddCarRequest> validator)
    {
        _carRepository = carRepository;
        _equipmentRepository = equipmentRepository;
        _validator = validator;
    }

    public async Task<Result> ExecuteAsync(AddCarRequest request)
    {
        // Walidacja z Fluenta

        //var doesCarExist = await _carRepository.IsVinAlreadyPresentAsync(request.Vin);
        //if (doesCarExist)
        //{
        //    throw new NotImplementedException();
        //}
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

        var equipment = await _equipmentRepository.GetByCodesAsync(request.EquipmentCodes);

        var result = Car.Create(
            request.Vin,
            request.Make,
            request.Model,
            request.Year,
            request.FuelType,
            request.AdditionalFuelType,
            request.Transmission,
            request.PowerHp,
            request.EngineDisplacement,
            request.Turbocharged,
            request.Body,
            request.RegistrationPlate,
            request.DriveType,
            request.MileageKm,
            request.Location,
            equipment
        );

        if (!result.IsSuccess)
        {
            // TODO: handle error
        }

        var car = result.Value!;
        await _carRepository.AddAsync(car);

        // return car.Id;
        return Result<Guid>.Success(car.Id);
    }
}
