namespace CarLot.Catalog.Domain.Events;

internal class CarCreatedEvent : IDomainEvent
{
    public Guid CarId { get; set; }

    public DateTime OccurredAt => DateTime.UtcNow;

    public CarCreatedEvent(Guid carId)
    {
        CarId = carId;
    }
}
