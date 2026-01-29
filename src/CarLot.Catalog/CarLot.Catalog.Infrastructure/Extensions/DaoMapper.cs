using CarLot.Catalog.Domain.Entities;
using CarLot.Catalog.Domain.ValueObjects;
using CarLot.Catalog.Infrastructure.DataAccessObjects;

namespace CarLot.Catalog.Infrastructure.Extensions;

internal static class DaoMapper
{
    public static CarDAO AsDao(this Car car)
    {
        return new CarDAO
        {
            Id = car.Id,
            VIN = car.VIN,
            Make = car.Make,
            Model = car.Model,
            Year = car.Year,
            FuelType = car.FuelType,
            AdditionalFuelType = car.AdditionalFuelType,
            Transmission = car.Transmission,
            PowerHP = car.PowerHp,
            EngineDisplacement = car.EngineDisplacement,
            Turbocharged = car.Turbocharged,
            Body = car.Body,
            RegistrationPlate = car.RegistrationPlate,
            DriveType = car.DriveType,
            MileageKm = car.MileageKm,
            Location = car.Location,
            Equipment = car.Equipment.Select(e => e.AsDao(car)).ToList(),
            Status = car.Status,
            CreatedAtUtc = car.CreatedAtUtc,
            UpdatedAtUtc = car.UpdatedAtUtc,
            Version = car.Version
        };
    }

    public static CarEquipmentDao AsDao(this Equipment carEquipment, Car car)
    {
        return new CarEquipmentDao
        {
            Id = carEquipment.Id,
            CarId = car.Id,
            EquipmentId = carEquipment.Id
        };
    }

    public static Equipment AsEntity(this EquipmentDao equipment)
    {
        return new Equipment
        {
            Id = equipment.Id,
            Code = equipment.Code,
            Name = equipment.Name
        };
    }
}
