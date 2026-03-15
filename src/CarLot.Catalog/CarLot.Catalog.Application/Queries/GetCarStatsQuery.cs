using CarLot.Catalog.Application.DTOs;
using CarLot.Catalog.Application.Interfaces;

namespace CarLot.Catalog.Application.Queries;

public class GetCarStatsQuery
{
    private readonly ICarRepository _carRepository;

    public GetCarStatsQuery(ICarRepository carRepository)
    {
        _carRepository = carRepository;
    }

    public async Task<CarStatsDto> ExecuteAsync()
    {
        return await _carRepository.GetCarStatsAsync();
    }
}
