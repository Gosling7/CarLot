using CarLot.Core;
using DriveType = CarLot.Core.DriveType;

namespace CarLot.Listings.Application.DTOs;

public record ListingDto(
    string VIN, 
    string Make, 
    string Model, 
    int Year,
    FuelType FuelType,
    Transmission Transmission,
    int PowerHp,
    float? EngineDisplacement,
    bool Turbocharged,
    string Body,
    string RegistrationPlate,
    DriveType DriveType,
    int MileageKm,
    string Location,
    string Description,
    decimal Price,
    List<EquipmentDto> Equipment,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc);