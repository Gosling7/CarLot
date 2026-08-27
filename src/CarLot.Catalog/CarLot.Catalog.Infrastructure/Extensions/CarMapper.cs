using CarLot.Catalog.Application.DTOs;
using CarLot.Catalog.Domain.Entities;

namespace CarLot.Catalog.Infrastructure.Extensions;

internal static class CarMapper
{

    public static CarDto ToDto(this Car car)
    {
        return new CarDto(
            Id: car.Id,
            Vin: car.Vin.Value,
            Make: car.Make,
            Model: car.Model,
            Year: car.Year,
            FuelType: car.Engine.FuelType,
            Transmission: car.Transmission,
            AdditionalFuelType: car.Engine.AdditionalFuelType.GetValueOrDefault(),
            PowerHp: car.Engine.PowerHp,
            EngineDisplacement: car.Engine.EngineDisplacement,
            Turbocharged: car.Engine.Turbocharged,
            Body: car.Body,
            RegistrationPlate: car.RegistrationPlate,
            DriveType: car.DriveType,
            MileageKm: car.MileageKm,
            Location: car.Location,
            Version: car.Version,
            CreatedAtUtc: car.CreatedAtUtc,
            UpdatedAtUtc: car.UpdatedAtUtc,
            Status: car.Status,
            Equipment: car.Equipment.Select(e => e.ToDto()).ToList()
        );
    }

    public static EquipmentDto ToDto(this Equipment equipment)
    {
        return new EquipmentDto(
            Id: equipment.Id,
            Code: equipment.Code,
            Name: equipment.Name
        );
    }
}
