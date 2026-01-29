using CarLot.Catalog.Domain.Enums;
using CarLot.Catalog.Domain.Events;
using CarLot.Catalog.Domain.ValueObjects;

namespace CarLot.Catalog.Domain.Entities;

public class Car
{
    private readonly List<Equipment> _equipment = [];
    private readonly List<IDomainEvent> _domainEvents = new();

    public Guid Id { get; }
    public string VIN { get; private set; }
    public string Make { get; private set; }
    public string Model { get; private set; }
    public int Year { get; private set; }
    public FuelType FuelType { get; private set; }
    public AdditionalFuelType AdditionalFuelType { get; private set; }
    public TransmissionType Transmission { get; private set; }
    public int PowerHp { get; private set; }
    public float? EngineDisplacement { get; private set; }
    public bool Turbocharged { get; private set; } = false;
    public string Body { get; private set; }
    public string RegistrationPlate { get; private set; }
    public Enums.DriveType DriveType { get; private set; }
    public int MileageKm { get; private set; }
    public string Location { get; private set; }
    public int Version { get; private set; } = 1;
    public CarStatus Status { get; private set; } = CarStatus.Received;
    public DateTime CreatedAtUtc { get; private set; } = DateTime.UtcNow;
    public DateTime? UpdatedAtUtc { get; private set; }

    public IReadOnlyCollection<Equipment> Equipment => _equipment.AsReadOnly();
    public IReadOnlyCollection<IDomainEvent> DomainEvents => _domainEvents.AsReadOnly();

    public Car(
        Guid id,
        string vin,
        string make,
        string model,
        int year,
        FuelType fuelType,
        AdditionalFuelType additionalFuelType,
        TransmissionType transmission,
        int powerHp,
        float? engineDisplacement,
        bool turbocharged,
        string body,
        string registrationPlate,
        Enums.DriveType driveType,
        int mileageKm,
        string location,
        IEnumerable<Equipment> equipment)
    {
        Id = id;
        VIN = vin;
        Make = make;
        Model = model;
        Year = year;
        FuelType = fuelType;
        AdditionalFuelType = additionalFuelType;
        Transmission = transmission;
        PowerHp = powerHp;
        EngineDisplacement = engineDisplacement;
        Turbocharged = turbocharged;
        Body = body;
        RegistrationPlate = registrationPlate;
        DriveType = driveType;
        MileageKm = mileageKm;
        Location = location;

        _equipment.AddRange(equipment ?? Enumerable.Empty<Equipment>());

        _domainEvents.Add(new CarCreatedEvent(id));
    }

    public static Result<Car> Create(
        string vin,
        string make,
        string model,
        int year,
        FuelType fuelType,
        AdditionalFuelType additionalFuelType,
        TransmissionType transmission,
        int powerHp,
        float? engineDisplacement,
        bool turbocharged,
        string body,
        string registrationPlate,
        Enums.DriveType driveType,
        int mileageKm,
        string location,
        IEnumerable<Equipment> equipment)
    {
        // TODO: domain errors handling

        return Result<Car>.Success(new Car(
            Guid.NewGuid(),
            vin,
            make,
            model,
            year,
            fuelType,
            additionalFuelType,
            transmission,
            powerHp,
            engineDisplacement,
            turbocharged,
            body,
            registrationPlate,
            driveType,
            mileageKm,
            location,
            equipment));
    }

    public void UpdateMileage(int newMileage)
    {
        if (newMileage < MileageKm)
        {
            throw new InvalidOperationException("Mileage cannot decrease");
        }

        MileageKm = newMileage;
        Version++;

        // _domainEvents.Add(new CarUpdatedEvent(Id));
    }
}
