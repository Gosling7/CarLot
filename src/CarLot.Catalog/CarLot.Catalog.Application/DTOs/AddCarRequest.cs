using CarLot.Catalog.Domain.Enums;

namespace CarLot.Catalog.Application.DTOs;

public record AddCarRequest(
    string Vin,
    string Make,
    string Model,
    int Year,
    FuelType FuelType,
    AdditionalFuelType AdditionalFuelType,
    TransmissionType Transmission,
    int PowerHp,
    float? EngineDisplacement,
    bool Turbocharged,
    string Body,
    string RegistrationPlate,
    Domain.Enums.DriveType DriveType,
    int MileageKm,
    string Location,
    IEnumerable<string> EquipmentCodes);