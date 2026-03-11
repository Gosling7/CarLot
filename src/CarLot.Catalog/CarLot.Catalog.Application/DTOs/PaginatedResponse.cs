namespace CarLot.Catalog.Application.DTOs;

public record PaginatedResponse<T>(
    int Page,
    int PageSize,
    int TotalPages,
    int TotalItemsCount,
    List<T> Items);
