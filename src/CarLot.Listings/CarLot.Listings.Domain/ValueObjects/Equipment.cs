using CarLot.Listings.Domain.Entities;

namespace CarLot.Listings.Domain.ValueObjects;

public class Equipment
{
    public Guid Id { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }

    public List<Listing> Listing { get; set; }
}
