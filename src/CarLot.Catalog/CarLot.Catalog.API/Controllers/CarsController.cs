using CarLot.Catalog.Application.DTOs;
using CarLot.Catalog.Application.UseCases;
using Microsoft.AspNetCore.Mvc;

namespace CarLot.Catalog.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarsController : ControllerBase
{
    private readonly AddCarUseCase _addCarUseCase;
    private readonly GetCarUseCase _getCarUseCase;
    private readonly DeleteCarUseCase _deleteCarUseCase;

    public CarsController(
        AddCarUseCase addCarUseCase,
        GetCarUseCase getCarUseCase,
        DeleteCarUseCase deleteCarUseCase)
    {
        _addCarUseCase = addCarUseCase;
        _getCarUseCase = getCarUseCase;
        _deleteCarUseCase = deleteCarUseCase;
    }

    [HttpPost]
    public async Task<IActionResult> AddCar([FromBody] AddCarRequest request)
    {
        var carId = await _addCarUseCase.ExecuteAsync(request);
        // TODO: zwracać id stworzonego auta 
        return CreatedAtAction(nameof(AddCar), new { id = carId }, null);
    }

    [HttpGet]
    [Route("{carId}")]
    public async Task<ActionResult<CarDto>> GetCarById(Guid carId)
    {
        var car = await _getCarUseCase.ExecuteAsync(carId);
        return Ok(car);
    }

    [HttpDelete]
    [Route("{carId}")]
    public async Task<IActionResult> DeleteCarById(string carId)
    {        
        await _deleteCarUseCase.ExecuteAsync(carId);
        return NoContent();
    }
}
