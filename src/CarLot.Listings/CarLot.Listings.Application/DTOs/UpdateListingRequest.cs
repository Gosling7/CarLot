using CarLot.Listings.Domain.Enums;

namespace CarLot.Listings.Application.DTOs;

public record UpdateListingRequest(
    string Vin,
    string Description,
    decimal Price,
    ListingStatus Status);
