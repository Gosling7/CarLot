namespace CarLot.Catalog.Infrastructure.DataAccessObjects;

public class CarEquipmentDao
{
    public Guid Id { get; set; }
    public Guid CarId { get; set; }
    public Guid EquipmentId { get; set; }

    public CarDAO Car { get; set; } = null!;
    public EquipmentDao Equipment { get; set; } = null!;
}
