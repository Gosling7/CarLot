using CarLot.Core;

namespace CarLot.Catalog.Application.DTOs;

public record EditCarRequest(
    string Vin,
    string Make,
    string Model,
    int Year,
    FuelType FuelType,
    AdditionalFuelType? AdditionalFuelType,
    Transmission Transmission,
    int PowerHp,
    float? EngineDisplacement,
    bool Turbocharged,
    string Body,
    string RegistrationPlate,
    CarLot.Core.DriveType DriveType,
    int MileageKm,
    string Location,
    IEnumerable<string> EquipmentCodes);
