using CarLot.Catalog.Application.DTOs;
using CarLot.Catalog.Domain.Entities;
using CarLot.Catalog.Domain.ValueObjects;

namespace CarLot.Catalog.Infrastructure.Extensions;

internal static class CarMapper
{
    //public static CarDao ToDao(this CarOld car)
    //{
    //    return new CarDao
    //    {
    //        Id = car.Id,
    //        VIN = car.VIN,
    //        Make = car.Make,
    //        Model = car.Model,
    //        Year = car.Year,
    //        FuelType = car.FuelType,
    //        AdditionalFuelType = car.AdditionalFuelType,
    //        Transmission = car.Transmission,
    //        PowerHP = car.PowerHp,
    //        EngineDisplacement = car.EngineDisplacement,
    //        Turbocharged = car.Turbocharged,
    //        Body = car.Body,
    //        RegistrationPlate = car.RegistrationPlate,
    //        DriveType = car.DriveType,
    //        MileageKm = car.MileageKm,
    //        Location = car.Location,
    //        Equipment = car.Equipment.Select(e => e.AsDao(car)).ToList(),
    //        Status = car.Status,
    //        CreatedAtUtc = car.CreatedAtUtc,
    //        UpdatedAtUtc = car.UpdatedAtUtc,
    //        Version = car.Version
    //    };
    //}

    //public static CarOld ToEntity(this CarDao car)
    //{
    //    return new CarOld(
    //        car.Id,
    //        car.VIN,
    //        car.Make,
    //        car.Model,
    //        car.Year,
    //        car.FuelType,
    //        car.AdditionalFuelType,
    //        car.Transmission,
    //        car.PowerHP,
    //        car.EngineDisplacement,
    //        car.Turbocharged,
    //        car.Body,
    //        car.RegistrationPlate,
    //        car.DriveType,
    //        car.MileageKm,
    //        car.Location,
    //        car.Equipment.Select(e => e.ToEntity()).ToList());
    //}

    public static CarDto ToDto(this Car car)
    {
        return new CarDto(
            Id: car.Id,
            Vin: car.VIN,
            Make: car.Make,
            Model: car.Model,
            Year: car.Year,
            FuelType: car.FuelType,
            Transmission: car.Transmission,
            AdditionalFuelType: car.AdditionalFuelType,
            PowerHp: car.PowerHp,
            EngineDisplacement: car.EngineDisplacement,
            Turbocharged: car.Turbocharged,
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

    //public static Equipment ToEntity(this CarEquipmentDao carEquipment)
    //{
    //    return new Equipment
    //    {
    //        Id = carEquipment.Id,
    //        Code = carEquipment.Equipment.Code,
    //        Name = carEquipment.Equipment.Name
    //    };
    //}

    //public static CarEquipmentDao AsDao(this Equipment carEquipment, CarOld car)
    //{
    //    return new CarEquipmentDao
    //    {
    //        CarId = car.Id,
    //        EquipmentId = carEquipment.Id
    //    };
    //}

    //public static Equipment AsEntity(this EquipmentDao equipment)
    //{
    //    return new Equipment
    //    {
    //        Id = equipment.Id,
    //        Code = equipment.Code,
    //        Name = equipment.Name
    //    };
    //}
}
