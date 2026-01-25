namespace CarLot.Catalog.Domain.ValueObjects;

public class CarEquipment
{
    public string Code { get; }
    public string Source { get; }
    public DateTime InstalledAt { get; }

    public CarEquipment(string code, string source, DateTime installedAt)
    {
        if (string.IsNullOrWhiteSpace(code))
            throw new ArgumentException("Equipment code is required");

        Code = code;
        Source = source;
        InstalledAt = installedAt;
    }
}
