namespace CarLot.Catalog.Application.DTOs;

public record GetCarsRequest(
    string Search = "",
    int PageSize = 20,
    int Page = 1);