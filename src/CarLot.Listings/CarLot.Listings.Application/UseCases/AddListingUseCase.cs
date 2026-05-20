using CarLot.Core;
using CarLot.Listings.Application.DTOs;
using CarLot.Listings.Application.Interfaces;
using CarLot.Listings.Domain.Entities;

namespace CarLot.Listings.Application.UseCases;

public class AddListingUseCase
{
    private readonly IListingRepository _listingRepository;

    public AddListingUseCase(IListingRepository listingRepository)
    {
        _listingRepository = listingRepository;
    }

    public async Task<Result> ExecuteAsync(AddListingRequest request)
    {
        List<Error> errors = [];

        // TODO: validation

        var result = Listing.Create(
            request.Make,
            request.Model,
            request.Body,
            request.VIN,
            request.FuelType, 
            request.DriveType, 
            request.Transmission,
            request.Year,
            request.PowerHp,
            request.Description,
            request.EngineDisplacement,
            request.MileageKm,
            request.Location,
            request.RegistrationPlate,
            request.Turbocharged, 
            request.Price);

        if (!result.IsSuccess)
        {
            return result;
        }

        var listing = result.Value!;
        await _listingRepository.AddAsync(listing);

        return Result<Guid>.Success(listing.Id);
    }
}
