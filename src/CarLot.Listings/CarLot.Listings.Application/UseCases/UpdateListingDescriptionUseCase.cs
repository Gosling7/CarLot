using CarLot.Core;
using CarLot.Listings.Application.Interfaces;

namespace CarLot.Listings.Application.UseCases;

public class UpdateListingDescriptionUseCase
{
    private readonly IListingRepository _listingRepository;

    public UpdateListingDescriptionUseCase(IListingRepository listingRepository)
    {
        _listingRepository = listingRepository;
    }

    public async Task<Result> ExecuteAsync(string vin, string description, CancellationToken cancellationToken)
    {
        var listing = await _listingRepository.GetEntityByVinAsync(vin);
        listing.UpdateDescription(description);
        await _listingRepository.SaveChangesAsync();
        return Result.Success();
    }
}
