using CarLot.Catalog.Domain.Enums;
using CarLot.Catalog.Domain.Events;
using CarLot.Catalog.Domain.ValueObjects;

namespace CarLot.Catalog.Domain.Entities;

public class Car
{
    private List<Equipment> _equipment = [];
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
    public CarStatus Status { get; private set; }
    public DateTime CreatedAtUtc { get; private set; } = DateTime.UtcNow;
    public DateTime? UpdatedAtUtc { get; private set; }

    public List<Equipment> Equipment { get; set; } = [];

    public IReadOnlyCollection<IDomainEvent> DomainEvents => _domainEvents.AsReadOnly();

    private Car() { } // for ef core

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
        Status = CarStatus.Received;
        CreatedAtUtc = DateTime.UtcNow;

        Equipment.AddRange(equipment ?? Enumerable.Empty<Equipment>());

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
        List<Equipment> equipment,
        bool isVinUnique)
    {
        if (!isVinUnique)
        {
            return Result<Car>.Failure(
                [new Error(nameof(VIN), "Car with the given VIN is already in the catalog.")]);
        }

        // TODO: if electric then no transmission
        // and other checks like that
        // domain validations

        return Result<Car>.Success(new Car(
            id: Guid.NewGuid(),
            vin: vin,
            make: make,
            model: model,
            year: year,
            fuelType: fuelType,
            additionalFuelType: additionalFuelType,
            transmission: transmission,
            powerHp: powerHp,
            engineDisplacement: engineDisplacement,
            turbocharged: turbocharged,
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
        Version++;

        return Result.Success();
    }

    public void UpdateStatus(CarStatus newStatus)
    {
        // TODO: check what domain validation is needed here

        /*         
        Received,
        NeedUpdate,
        ReadyForListing,
        LiveListing,
        Archived

        Received -> ReadyForListing -> LiveListing -> Archived
        Received -> NeedUpdate -> ReadyForListing -> LiveListing -> Archived
        Received -> NeedUpdate -> ReadyForListing -> LiveListing -> Sold
         */


        Status = newStatus;
        Version++;
    }

    public void UpdateEquipment(List<Equipment> newEquipment)
    {
        Equipment = newEquipment;
        Version++;
    }

    public Result Edit(
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
        List<Equipment> equipment)
    {
        // TODO: same domain checks as Create e.g. electric + no transmission
        // You may want to extract those into a private static Validate(...) method
        // shared between Create and EditCar

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
        Equipment = equipment;

        UpdatedAtUtc = DateTime.UtcNow;
        Version++;

        // _domainEvents.Add(new CarEditedEvent(id));

        return Result.Success();
    }
}
