using CarLot.Core;
using DriveType = CarLot.Core.DriveType;

namespace CarLot.Listings.Application.DTOs;

public record CarDto(
    Guid Id,
    string Vin,
    string Make,
    string Model,
    int Year,
    FuelType FuelType,
    Transmission Transmission,
    AdditionalFuelType AdditionalFuelType,
    int PowerHp,
    float? EngineDisplacement,
    bool Turbocharged,
    string Body,
    string RegistrationPlate,
    DriveType DriveType,
    int MileageKm,
    string Location,
    int Version,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc,
    CarStatus Status,
    IReadOnlyCollection<EquipmentDto> Equipment
);