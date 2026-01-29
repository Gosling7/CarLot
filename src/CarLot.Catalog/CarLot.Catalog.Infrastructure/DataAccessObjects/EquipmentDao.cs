namespace CarLot.Catalog.Infrastructure.DataAccessObjects;

public class EquipmentDao
{
    public Guid Id { get; set; }
    public string Code { get; set; } = null!;
    public string Name { get; set; } = null!;
    public Guid CategoryId { get; set; }

    public EquipmentCategoryDao Category { get; set; } = null!;
}
