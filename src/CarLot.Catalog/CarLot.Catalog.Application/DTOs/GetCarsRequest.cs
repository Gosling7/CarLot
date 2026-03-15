using CarLot.Catalog.Domain.Enums;

namespace CarLot.Catalog.Application.DTOs;

public record GetCarsRequest(
    List<CarStatus>? Status,
    string Search = "",
    int PageSize = 20,
    int Page = 1);

//public class GetCarsRequest
//{
//    public List<CarStatus> Status { get; set; }
//    public string Search { get; set; } = "";
//    public int PageSize { get; set; } = 20;
//    public int Page { get; set; } = 1;
//}