using CarLot.Listings.Domain.Entities;

namespace CarLot.Listings.Application.Interfaces;

public interface IListingRepository
{
    public Task<Guid> AddAsync(Listing listing);
}
