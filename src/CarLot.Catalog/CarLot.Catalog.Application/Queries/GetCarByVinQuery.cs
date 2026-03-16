using CarLot.Catalog.Application.DTOs;
using CarLot.Catalog.Application.Interfaces;

namespace CarLot.Catalog.Application.Queries;

public class GetCarByVinQuery
{
    private readonly ICarRepository _carRepository;

    public GetCarByVinQuery(ICarRepository carRepository)
    {
        _carRepository = carRepository;
    }

    public async Task<CarDto> ExecuteAsync(string vin)
    {
        return await _carRepository.GetByVinAsync(vin);
    }
}
