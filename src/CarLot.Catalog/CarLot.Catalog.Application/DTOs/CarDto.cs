using CarLot.Catalog.Domain.Enums;

namespace CarLot.Catalog.Application.DTOs;

public record CarDto(
    Guid Id,
    string Vin,
    string Make,
    string Model,
    int Year,
    FuelType FuelType,
    TransmissionType Transmission,
    AdditionalFuelType AdditionalFuelType,
    int PowerHp,
    float? EngineDisplacement,
    bool Turbocharged,
    string Body,
    string RegistrationPlate,
    Domain.Enums.DriveType DriveType,
    int MileageKm,
    string Location,
    int Version,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc,
    CarStatus Status,
    IReadOnlyCollection<EquipmentDto> Equipment
);