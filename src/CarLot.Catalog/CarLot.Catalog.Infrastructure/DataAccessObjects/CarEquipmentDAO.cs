namespace CarLot.Catalog.Infrastructure.DataAccessObjects;

internal class CarEquipmentDAO
{
    public Guid Id { get; set; }
    public Guid CarId { get; set; }

    public string Code { get; set; } = null!;

    // TODO: czy to potrzebne?
    //public string Source { get; set; } = null!;
    //public DateTime InstalledAt { get; set; }

    public CarDAO Car { get; set; } = null!;
}
