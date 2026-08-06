namespace CarLot.Listings.Application.DTOs;

public record AddListingRequest(
    string Vin,
    decimal Price,
    string Description);
