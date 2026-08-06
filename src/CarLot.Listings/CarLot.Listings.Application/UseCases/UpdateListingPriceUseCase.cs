using CarLot.Core;
using CarLot.Listings.Application.Interfaces;

namespace CarLot.Listings.Application.UseCases;

public class UpdateListingPriceUseCase
{
    private readonly IListingRepository _listingRepository;

    public UpdateListingPriceUseCase(IListingRepository listingRepository)
    {
        _listingRepository = listingRepository;
    }

    public async Task<Result> ExecuteAsync(string vin, decimal price, CancellationToken cancellationToken)
    {
        var listing = await _listingRepository.GetEntityByVinAsync(vin);
        listing.UpdatePrice(price);
        await _listingRepository.SaveChangesAsync();
        return Result.Success();
    }
}
