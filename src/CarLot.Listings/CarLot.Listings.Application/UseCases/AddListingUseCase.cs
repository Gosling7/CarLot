using CarLot.Listings.Domain.ValueObjects;
using CarLot.Core;
using CarLot.Listings.Application.DTOs;
using CarLot.Listings.Application.Interfaces;
using CarLot.Listings.Domain.Entities;

namespace CarLot.Listings.Application.UseCases;

public class AddListingUseCase
{
    private readonly IListingRepository _listingRepository;
    private readonly ICatalogClient _catalogClient;

    public AddListingUseCase(IListingRepository listingRepository, ICatalogClient catalogClient)
    {
        _listingRepository = listingRepository;
        _catalogClient = catalogClient;
    }

    public async Task<Result> ExecuteAsync(AddListingRequest request, CancellationToken cancellationToken)
    {
        List<Error> errors = [];

        // TODO: validation

        // TODO: got some json problem with wrong vin
        var catalogResult = await _catalogClient.GetCarByVinAsync(request.Vin, cancellationToken);
        var car = catalogResult.Value;
        if (car is null)
        {
            // TODO: return no car with the given VIN
            return Result.Failure([new Error(nameof(request.Vin), "No car with the given VIN.")]);
        }

        var result = Listing.Create(
            car.Make,
            car.Model,
            car.Body,
            car.Vin,
            car.FuelType,
            car.DriveType,
            car.Transmission,
            car.Year,
            car.PowerHp,
            request.Description,
            car.EngineDisplacement,
            car.MileageKm,
            car.Location,
            car.RegistrationPlate,
            car.Turbocharged,
            request.Price,
            car.Equipment.Select(e => new Equipment
            {
                Id = e.Id, 
                Name = e.Name, 
                Code = e.Code,
            }).ToList(),
            request.status); 

        if (!result.IsSuccess)
        {
            return result;
        }

        var listing = result.Value!;
        await _listingRepository.AddAsync(listing);

        return Result<Guid>.Success(listing.Id);
    }
}
