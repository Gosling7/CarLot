using CarLot.Core;
using CarLot.Listings.Application.DTOs;
using CarLot.Listings.Application.Interfaces;

namespace CarLot.Listings.Application.UseCases;

public class UpdateListingUseCase
{
    private readonly IListingRepository _listingRepository;

    public UpdateListingUseCase(IListingRepository listingRepository)
    {
        _listingRepository = listingRepository;
    }

    public async Task<Result> ExecuteAsync(UpdateListingRequest request, CancellationToken cancellationToken)
    {
        // TODO: validate
        var errors = new List<Error>();

        var existingListing = await _listingRepository.GetEntityByVinAsync(request.Vin);
        if (existingListing is null)
        {
            return Result.Failure(errors);
        }

        existingListing.Update(
            description: request.Description,
            price: request.Price,
            status: request.Status);

        await _listingRepository.SaveChangesAsync();
        
        return Result.Success();
    }
}
