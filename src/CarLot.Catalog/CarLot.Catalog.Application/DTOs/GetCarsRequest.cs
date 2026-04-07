using CarLot.Catalog.Domain.Enums;

namespace CarLot.Catalog.Application.DTOs;

public record GetCarsRequest(
    List<CarStatus>? Status,
    string? Search,
    int PageSize = 20,
    int Page = 1);