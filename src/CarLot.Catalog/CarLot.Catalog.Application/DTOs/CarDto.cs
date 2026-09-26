using CarLot.Core;

namespace CarLot.Catalog.Application.DTOs;

public record CarDto(
    Guid Id,
    string Vin,
    string Make,
    string Model,
    int Year,
    FuelType FuelType,
    Transmission Transmission,
    AdditionalFuelType? AdditionalFuelType,
    int PowerHp,
    float? EngineDisplacement,
    bool Turbocharged,
    string Body,
    string RegistrationPlate,
    CarLot.Core.DriveType DriveType,
    int MileageKm,
    string Location,
    int Version,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc,
    CarStatus Status,
    IReadOnlyCollection<EquipmentDto> Equipment
);