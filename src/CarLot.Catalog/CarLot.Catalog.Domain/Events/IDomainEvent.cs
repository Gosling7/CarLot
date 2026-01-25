namespace CarLot.Catalog.Domain.Events;

public interface IDomainEvent
{
    DateTime OccurredAt { get; }
}
