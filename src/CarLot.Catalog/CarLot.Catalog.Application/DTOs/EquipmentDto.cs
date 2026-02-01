namespace CarLot.Catalog.Application.DTOs;

public record EquipmentDto(
    Guid Id,
    string Code,
    string Name
);