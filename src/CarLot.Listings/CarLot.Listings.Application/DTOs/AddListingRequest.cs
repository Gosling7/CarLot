using CarLot.Core;
using CarLot.Listings.Domain.ValueObjects;
using DriveType = CarLot.Core.DriveType;

namespace CarLot.Listings.Application.DTOs;

public record AddListingRequest(
    string Make,
    string Model,
    string VIN,
    FuelType FuelType,
    DriveType DriveType,
    Transmission Transmission,
    int PowerHp,
    int EngineDisplacement,
    int Year,
    int MileageKm,
    string Body,
    string RegistrationPlate,
    string Location,
    IEnumerable<Equipment> Equipment,
    decimal Price,
    string Description,
    bool Turbocharged);
