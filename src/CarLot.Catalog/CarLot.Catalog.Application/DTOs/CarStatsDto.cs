namespace CarLot.Catalog.Application.DTOs;

public record CarStatsDto(
    int CarsInCatalog,
    int CarsWithLiveListings,
    int CarsReadyForListing);