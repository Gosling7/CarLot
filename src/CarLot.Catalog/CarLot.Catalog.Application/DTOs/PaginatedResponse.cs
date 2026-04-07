namespace CarLot.Catalog.Application.DTOs;

public record PaginatedResponse<T>(
    int Page,
    int PageSize,
    int TotalPages,
    int TotalItems,
    List<T> Items);
