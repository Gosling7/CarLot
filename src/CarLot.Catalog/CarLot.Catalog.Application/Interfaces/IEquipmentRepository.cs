using CarLot.Catalog.Application.DTOs;
using CarLot.Catalog.Domain.ValueObjects;

namespace CarLot.Catalog.Application.Interfaces;

public interface IEquipmentRepository
{
    Task<IEnumerable<EquipmentDto>> GetAllAsync();
    Task<IEnumerable<Equipment>> GetByCodesAsync(IEnumerable<string> equipmentCodes);
}
