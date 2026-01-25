namespace CarLot.Catalog.Infrastructure.DataAccessObjects;

internal class CarDAO
{
    public Guid Id { get; set; }
    public string VIN { get; set; } = null!;
    public string Make { get; set; } = null!;
    public string Model { get; set; } = null!;
    public int Year { get; set; }
    public string FuelType { get; set; } = null!;
    public string Transmission { get; set; } = null!;
    public int PowerHp { get; set; }
    public int MileageKm { get; set; }
    public string Location { get; set; } = null!;
    public long Version { get; set; }
    
    // public string Status { get; set; }
    // TODO: czego brakuje?

    public ICollection<CarEquipmentDAO> Equipment { get; set; } = [];
}