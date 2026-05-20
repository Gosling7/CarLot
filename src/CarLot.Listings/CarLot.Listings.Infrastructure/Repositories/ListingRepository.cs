using CarLot.Listings.Application.Interfaces;
using CarLot.Listings.Domain.Entities;

namespace CarLot.Listings.Infrastructure.Repositories;

internal class ListingRepository : IListingRepository
{
    private readonly ListingsDbContext _dbContext;

    public ListingRepository(ListingsDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Guid> AddAsync(Listing listing)
    {
        _dbContext.Listings.Add(listing);
        await _dbContext.SaveChangesAsync();
        return listing.Id;
    }
}
