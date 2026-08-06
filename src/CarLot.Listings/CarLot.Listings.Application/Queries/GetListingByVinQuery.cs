using CarLot.Listings.Application.DTOs;
using CarLot.Listings.Application.Interfaces;

namespace CarLot.Listings.Application.Queries;

public class GetListingByVinQuery
{
    private readonly IListingRepository _listingRepository;

    public GetListingByVinQuery(IListingRepository listingRepository)
    {
        _listingRepository = listingRepository;
    }

    public async Task<ListingDto?> ExecuteAsync(string vin, CancellationToken cancellationToken)
    {
        return await _listingRepository.GetDtoByVinAsync(vin);
    }
}
