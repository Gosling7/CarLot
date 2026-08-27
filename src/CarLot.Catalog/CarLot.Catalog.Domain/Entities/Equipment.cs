namespace CarLot.Catalog.Domain.Entities;

public class Equipment
{
    public Guid Id { get; private set; }
    public string Code { get; private set; }
    public string Name { get; private set; }

    private Equipment() { } // for ef core

    public Equipment(Guid id, string code, string name)
    {
        Id = id;
        Code = code;
        Name = name;
    }
}
