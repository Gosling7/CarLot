using CarLot.Catalog.Application.DTOs;
using CarLot.Catalog.Domain.Entities;

namespace CarLot.Catalog.Application.Interfaces;

public interface IEquipmentRepository
{
    Task<List<EquipmentDto>> GetAllAsync();
    Task<List<Equipment>> GetByCodesAsync(IEnumerable<string> equipmentCodes);
}
