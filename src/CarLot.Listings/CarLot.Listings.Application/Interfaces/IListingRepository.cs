using CarLot.Listings.Application.DTOs;
using CarLot.Listings.Domain.Entities;

namespace CarLot.Listings.Application.Interfaces;

public interface IListingRepository
{
    public Task<Guid> AddAsync(Listing listing);
    public Task<ListingDto?> GetDtoByVinAsync(string vin);
    public Task<Listing?> GetEntityByVinAsync(string vin);
    public Task SaveChangesAsync();
}
