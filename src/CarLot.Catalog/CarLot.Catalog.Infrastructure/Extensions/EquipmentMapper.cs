using CarLot.Catalog.Application.DTOs;
using CarLot.Catalog.Infrastructure.DataAccessObjects;

namespace CarLot.Catalog.Infrastructure.Extensions;

internal static class EquipmentMapper
{
    public static EquipmentDto ToDto(this EquipmentDao equipmentDao)
    {
        return new(equipmentDao.Id, equipmentDao.Code, equipmentDao.Name);
    }
}
