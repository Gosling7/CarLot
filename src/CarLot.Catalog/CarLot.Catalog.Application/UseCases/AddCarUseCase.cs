using CarLot.Catalog.Application.DataTransferObjects;
using CarLot.Catalog.Application.Interfaces;
using CarLot.Catalog.Domain.Entities;

namespace CarLot.Catalog.Application.UseCases;

public class AddCarUseCase
{
    private readonly ICarRepository _carRepository;
    private readonly IEquipmentRepository _equipmentRepository;

    public AddCarUseCase(
        ICarRepository carRepository, 
        IEquipmentRepository equipmentRepository)
    {
        _carRepository = carRepository;
        _equipmentRepository = equipmentRepository;
    }

    public async Task<Guid> ExecuteAsync(AddCarRequest request)
    {
        // Walidacja z Fluenta

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

        return car.Id;
    }
}
