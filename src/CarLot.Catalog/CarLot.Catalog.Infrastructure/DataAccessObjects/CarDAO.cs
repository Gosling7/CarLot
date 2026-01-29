using CarLot.Catalog.Domain.Enums;

namespace CarLot.Catalog.Infrastructure.DataAccessObjects;

public class CarDAO
{
    public Guid Id { get; set; }
    public string VIN { get; set; } = null!;
    public string Make { get; set; } = null!;
    public string Model { get; set; } = null!;
    public int Year { get; set; }
    public FuelType FuelType { get; set; }
    public TransmissionType Transmission { get; set; }
    public AdditionalFuelType AdditionalFuelType { get; set; }
    public int PowerHP { get; set; }
    public float? EngineDisplacement { get; set; }
    public bool Turbocharged { get; set; } = false;
    public string Body { get; set; } = null!;
    public string RegistrationPlate { get; set; } = null!;
    public Domain.Enums.DriveType DriveType { get; set; }
    public int MileageKm { get; set; }
    public string Location { get; set; } = null!;
    public int Version { get; set; }
    public DateTime CreatedAtUtc { get; set; }
    public DateTime? UpdatedAtUtc { get; set; }
    public CarStatus Status { get; set; }

    public ICollection<CarEquipmentDao> Equipment { get; set; } = new List<CarEquipmentDao>();
}