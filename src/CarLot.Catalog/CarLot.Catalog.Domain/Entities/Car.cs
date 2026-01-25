using CarLot.Catalog.Domain.Events;
using CarLot.Catalog.Domain.ValueObjects;

namespace CarLot.Catalog.Domain.Entities;

public class Car
{
    private readonly List<CarEquipment> _equipment = [];
    private readonly List<IDomainEvent> _domainEvents = new();

    public Guid Id { get; }
    public string VIN { get; private set; }
    public string Make { get; private set; }
    public string Model { get; private set; }
    public int Year { get; private set; }
    public string FuelType { get; private set; }
    public string Transmission { get; private set; }
    public int PowerHp { get; private set; }
    public int MileageKm { get; private set; }
    public string Location { get; private set; }

    public IReadOnlyCollection<CarEquipment> Equipment => _equipment.AsReadOnly();
    public IReadOnlyCollection<IDomainEvent> DomainEvents => _domainEvents.AsReadOnly();

    public Car(
        Guid id,
        string vin,
        string make,
        string model,
        int year,
        string fuelType,
        string transmission,
        int powerHp,
        int mileageKm,
        string location,
        IEnumerable<CarEquipment> equipment)
    {
        Id = id;
        VIN = vin;
        Make = make;
        Model = model;
        Year = year;
        FuelType = fuelType;
        Transmission = transmission;
        PowerHp = powerHp;
        MileageKm = mileageKm;
        Location = location;

        _equipment.AddRange(equipment ?? Enumerable.Empty<CarEquipment>());

        _domainEvents.Add(new CarCreatedEvent(id));
    }
}
