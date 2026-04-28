using CarLot.Catalog.Application.DTOs;
using CarLot.Catalog.Application.Interfaces;
using CarLot.Catalog.Domain;

namespace CarLot.Catalog.Application.UseCases;

public class EditCarUseCase
{
    private readonly ICarRepository _carRepository;
    private readonly IEquipmentRepository _equipmentRepository;

    public EditCarUseCase(
        ICarRepository carRepository,
        IEquipmentRepository equipmentRepository)
    {
        _carRepository = carRepository;
        _equipmentRepository = equipmentRepository;
    }

    public async Task<Result> ExecuteAsync(string vin, EditCarRequest request)
    {
        // TODO: validate
        var errors = new List<Error>();

        var existingCar = await _carRepository.GetEntityByVinAsync(vin);
        if (existingCar is null)
        {
            // TODO: no car with given vin
            return Result.Failure(errors);
        }

        var equipment = await _equipmentRepository.GetByCodesAsync(request.EquipmentCodes);
        if (equipment.Count == 0)
        {
            errors.Add(new Error(nameof(request.EquipmentCodes), "No equipment with the given codes."));
            return Result.Failure(errors);
        }
        
        var result = existingCar.Edit(
            make: request.Make,
            model: request.Model,
            year: request.Year,
            fuelType: request.FuelType,
            additionalFuelType: request.AdditionalFuelType,
            transmission: request.Transmission,
            powerHp: request.PowerHp,
            engineDisplacement: request.EngineDisplacement,
            turbocharged: request.Turbocharged,
            body: request.Body,
            registrationPlate: request.RegistrationPlate,
            driveType: request.DriveType,
            mileageKm: request.MileageKm,
            location: request.Location,
            equipment: equipment);

        await _carRepository.SaveChangesAsync();

        return result;
    }
}
