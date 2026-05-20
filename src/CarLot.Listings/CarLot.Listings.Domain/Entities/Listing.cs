using CarLot.Core;

namespace CarLot.Listings.Domain.Entities;

public class Listing
{
    public Guid Id { get; }
    public string VIN { get; private set; }
    public string Make { get; private set; }
    public string Model { get; private set; }
    public int Year { get; private set; }
    public FuelType FuelType { get; private set; }
    public Transmission Transmission { get; private set; }
    public int PowerHp { get; private set; }
    public float? EngineDisplacement { get; private set; }
    public bool Turbocharged { get; private set; } = false;
    public string Body { get; private set; }
    public string RegistrationPlate { get; private set; }
    public Core.DriveType DriveType { get; private set; }
    public int MileageKm { get; private set; }
    public string Location { get; private set; }
    public string Description { get; private set; }
    public decimal Price { get; private set; }
    public int Version { get; private set; } = 1;
    public DateTime CreatedAtUtc { get; private set; } = DateTime.UtcNow;
    public DateTime? UpdatedAtUtc { get; private set; }

    private Listing() { }

    private Listing(
        Guid id,
        string vin,
        string make,
        string model,
        int year,
        FuelType fuelType,
        Transmission transmission,
        int powerHp,
        float? engineDisplacement,
        bool turbocharged,
        string body,
        string registrationPlate,
        Core.DriveType driveType,
        int mileageKm,
        string location,
        string description,
        decimal price)
    {
        Id = id;
        VIN = vin;
        Make = make;
        Model = model;
        Year = year;
        FuelType = fuelType;
        Transmission = transmission;
        PowerHp = powerHp;
        EngineDisplacement = engineDisplacement;
        Turbocharged = turbocharged;
        Body = body;
        RegistrationPlate = registrationPlate;
        DriveType = driveType;
        MileageKm = mileageKm;
        Location = location;
        Description = description;
        Price = price;
    }

    public static Result<Listing> Create(
        string make,
        string model,
        string body,
        string vin,
        FuelType fuelType,
        Core.DriveType driveType,
        Transmission transmission,
        int year,
        int powerHp,
        string description,
        float? engineDisplacement,
        int mileageKm,
        string location,
        string registrationPlate,
        bool turbocharged,
        decimal price)
    {
        return Result<Listing>.Success(new(
            id: Guid.NewGuid(),
            make: make,
            model: model,
            body: body,
            vin: vin,
            fuelType: fuelType,
            driveType: driveType,
            transmission: transmission,
            year: year,
            powerHp: powerHp,
            description: description,
            engineDisplacement: engineDisplacement,
            mileageKm: mileageKm,
            location: location,
            registrationPlate: registrationPlate,
            turbocharged: turbocharged,
            price: price));
    }
}
