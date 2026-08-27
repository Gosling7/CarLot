using CarLot.Catalog.Domain.Enums;
using CarLot.Catalog.Domain.Events;
using CarLot.Catalog.Domain.ValueObjects;

namespace CarLot.Catalog.Domain.Entities;

public class Car
{
    private static readonly Dictionary<CarStatus, CarStatus[]> AllowedStatusTransitions = new()
    {
        [CarStatus.Received] = [CarStatus.NeedUpdate, CarStatus.ReadyForListing],
        [CarStatus.NeedUpdate] = [CarStatus.ReadyForListing],
        [CarStatus.ReadyForListing] = [CarStatus.LiveListing],
        [CarStatus.LiveListing] = [CarStatus.Archived],
        [CarStatus.Archived] = [],
    };

    private readonly List<Equipment> _equipment = [];
    private readonly List<IDomainEvent> _domainEvents = new();

    public Guid Id { get; }
    public Vin Vin { get; private set; }
    public string Make { get; private set; }
    public string Model { get; private set; }
    public int Year { get; private set; }
    public Engine Engine { get; private set; }
    public TransmissionType Transmission { get; private set; }
    public string Body { get; private set; }
    public string RegistrationPlate { get; private set; }
    public Enums.DriveType DriveType { get; private set; }
    public int MileageKm { get; private set; }
    public string Location { get; private set; }
    public int Version { get; private set; } = 1;
    public CarStatus Status { get; private set; }
    public DateTime CreatedAtUtc { get; private set; } = DateTime.UtcNow;
    public DateTime? UpdatedAtUtc { get; private set; }

    public IReadOnlyCollection<Equipment> Equipment => _equipment.AsReadOnly();

    public IReadOnlyCollection<IDomainEvent> DomainEvents => _domainEvents.AsReadOnly();

    private Car() { } // for ef core

    private Car(
        Guid id,
        Vin vin,
        string make,
        string model,
        int year,
        Engine engine,
        TransmissionType transmission,
        string body,
        string registrationPlate,
        Enums.DriveType driveType,
        int mileageKm,
        string location,
        IEnumerable<Equipment> equipment)
    {
        Id = id;
        Vin = vin;
        Make = make;
        Model = model;
        Year = year;
        Engine = engine;
        Transmission = transmission;
        Body = body;
        RegistrationPlate = registrationPlate;
        DriveType = driveType;
        MileageKm = mileageKm;
        Location = location;
        Status = CarStatus.Received;
        CreatedAtUtc = DateTime.UtcNow;

        _equipment.AddRange(equipment ?? Enumerable.Empty<Equipment>());

        _domainEvents.Add(new CarCreatedEvent(id));
    }

    public static Result<Car> Create(
        string vin,
        string make,
        string model,
        int year,
        Engine engine,
        TransmissionType transmission,
        string body,
        string registrationPlate,
        Enums.DriveType driveType,
        int mileageKm,
        string location,
        List<Equipment> equipment,
        bool isVinUnique)
    {
        var vinResult = Vin.Create(vin);
        var errors = new List<Error>(vinResult.Errors);

        if (!isVinUnique)
        {
            errors.Add(new Error(nameof(Vin), "Car with the given VIN is already in the catalog."));
        }

        errors.AddRange(ValidateInvariants(year, mileageKm, engine, transmission));

        if (errors.Count > 0)
        {
            return Result<Car>.Failure(errors);
        }

        return Result<Car>.Success(new Car(
            id: Guid.NewGuid(),
            vin: vinResult.Value!,
            make: make,
            model: model,
            year: year,
            engine: engine,
            transmission: transmission,
            body: body,
            registrationPlate: registrationPlate,
            driveType: driveType,
            mileageKm: mileageKm,
            location: location,
            equipment: equipment));
    }

    public Result UpdateMileage(int newMileage)
    {
        if (newMileage <= MileageKm)
        {
            return Result.Failure(
                [new Error(nameof(MileageKm), "Mileage cannot decrease or be the same.")]);
        }

        MileageKm = newMileage;
        IncrementVersion();

        return Result.Success();
    }

    public Result UpdateStatus(CarStatus newStatus)
    {
        if (!AllowedStatusTransitions[Status].Contains(newStatus))
        {
            return Result.Failure(
                [new Error(nameof(Status), $"Cannot transition from {Status} to {newStatus}.")]);
        }

        Status = newStatus;
        IncrementVersion();

        return Result.Success();
    }

    public Result UpdateEquipment(IEnumerable<Equipment> newEquipment)
    {
        _equipment.Clear();
        _equipment.AddRange(newEquipment);
        IncrementVersion();

        return Result.Success();
    }

    public Result Edit(
        string make,
        string model,
        int year,
        Engine engine,
        TransmissionType transmission,
        string body,
        string registrationPlate,
        Enums.DriveType driveType,
        int mileageKm,
        string location,
        List<Equipment> equipment)
    {
        var errors = ValidateInvariants(year, mileageKm, engine, transmission);
        if (errors.Count > 0)
        {
            return Result.Failure(errors);
        }

        Make = make;
        Model = model;
        Year = year;
        Engine = engine;
        Transmission = transmission;
        Body = body;
        RegistrationPlate = registrationPlate;
        DriveType = driveType;
        MileageKm = mileageKm;
        Location = location;

        _equipment.Clear();
        _equipment.AddRange(equipment);

        IncrementVersion();

        return Result.Success();
    }

    private static List<Error> ValidateInvariants(int year, int mileageKm, Engine engine, TransmissionType transmission)
    {
        var errors = new List<Error>();

        if (year < 1900 || year > DateTime.UtcNow.Year + 1)
        {
            errors.Add(new Error(nameof(Year), "Year is out of range."));
        }

        if (mileageKm < 0)
        {
            errors.Add(new Error(nameof(MileageKm), "Mileage cannot be negative."));
        }

        if (engine.FuelType == FuelType.Electric && transmission != TransmissionType.Automatic)
        {
            errors.Add(new Error(nameof(Transmission), "Electric cars must use automatic transmission."));
        }

        return errors;
    }

    private void IncrementVersion()
    {
        UpdatedAtUtc = DateTime.UtcNow;
        Version++;
    }
}
