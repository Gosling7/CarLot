using CarLot.Catalog.Application.DataTransferObjects;
using CarLot.Catalog.Application.UseCases;
using Microsoft.AspNetCore.Mvc;

namespace CarLot.Catalog.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarsController : ControllerBase
{
    private readonly AddCarUseCase _addCarUseCase;

    public CarsController(AddCarUseCase addCarUseCase)
    {
        _addCarUseCase = addCarUseCase;
    }

    [HttpPost]
    public async Task<IActionResult> AddCar([FromBody] AddCarRequest request)
    {
        var carId = await _addCarUseCase.ExecuteAsync(request);
        return CreatedAtAction(nameof(AddCar), new { id = carId }, null);
    }
}
