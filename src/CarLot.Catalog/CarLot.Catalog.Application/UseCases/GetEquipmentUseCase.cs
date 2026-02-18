using CarLot.Catalog.Application.DTOs;
using CarLot.Catalog.Application.Interfaces;

namespace CarLot.Catalog.Application.UseCases;

public class GetEquipmentUseCase
{
    private readonly IEquipmentRepository _equipmentRepository;

    public GetEquipmentUseCase(IEquipmentRepository equipmentRepository)
    {
        _equipmentRepository = equipmentRepository;
    }

    public async Task<IEnumerable<EquipmentDto>> ExecuteAsync()
    {
        var equipment = await _equipmentRepository.GetAllAsync();
        return equipment;
    }
}
