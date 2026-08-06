using CarLot.Listings.Application.DTOs;
using CarLot.Listings.Domain.ValueObjects;

namespace CarLot.Listings.Infrastructure.Extensions;

internal static class ListingMapper
{
    public static Equipment ToValueObject(this EquipmentDto equipment)
    {
        return new Equipment
        {
            Id = equipment.Id,
            Code = equipment.Code,
            Name = equipment.Name
        };
    }
}
