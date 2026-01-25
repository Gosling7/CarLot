using CarLot.Catalog.Application.UseCases;
using Microsoft.AspNetCore.Mvc;

namespace CarLot.Catalog.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarsController : ControllerBase
{
    //private readonly AddCarUseCase _addCarUseCase;

    //public CarsController(AddCarUseCase addCarUseCase)
    //{
    //    _addCarUseCase = addCarUseCase;
    //}

    //[HttpPost]
    //public async Task<IActionResult> AddCar([FromBody] Domain.Entities.Car car)
    //{
    //    var carId = await _addCarUseCase.ExecuteAsync(car);
    //    return CreatedAtAction(nameof(AddCar), new { id = carId }, null);
    //}
}
