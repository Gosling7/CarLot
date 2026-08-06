using CarLot.Core;
using CarLot.Listings.Application.DTOs;

namespace CarLot.Listings.Application.Interfaces;

public interface ICatalogClient
{
    Task<Result<CarDto?>> GetCarByVinAsync(string vin, CancellationToken cancellationToken);
}