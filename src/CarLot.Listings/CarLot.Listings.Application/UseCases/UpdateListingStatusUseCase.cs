using CarLot.Core;
using CarLot.Listings.Application.Interfaces;

namespace CarLot.Listings.Application.UseCases;

public class UpdateListingStatusUseCase
{
    private readonly IListingRepository _listingRepository;

    public UpdateListingStatusUseCase(IListingRepository listingRepository)
    {
        _listingRepository = listingRepository;
    }

    public async Task<Result> ExecuteAsync(string vin, string status, CancellationToken cancellationToken)
    {
        var listing = await _listingRepository.GetEntityByVinAsync(vin);
        listing.UpdateStatus();
        await _listingRepository.SaveChangesAsync();
        return Result.Success();
    }
}
