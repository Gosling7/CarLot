using CarLot.Catalog.Domain.ValueObjects;

namespace CarLot.Catalog.Application.Interfaces;

public interface IEquipmentRepository
{
    Task<IEnumerable<Equipment>> GetByCodesAsync(IEnumerable<string> equipmentCodes);
}
