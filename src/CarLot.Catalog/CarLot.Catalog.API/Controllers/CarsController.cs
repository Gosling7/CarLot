using CarLot.Catalog.Application.DTOs;
using CarLot.Catalog.Application.UseCases;
using CarLot.Catalog.Domain;
using CarLot.Catalog.Domain.Enums;
using Microsoft.AspNetCore.Mvc;

namespace CarLot.Catalog.API.Controllers;

public record TestRequest(FuelType FuelType, string Name);

[ApiController]
[Route("api/[controller]")]
public class CarsController : ControllerBase
{
    private readonly AddCarUseCase _addCarUseCase;
    private readonly GetCarUseCase _getCarUseCase;
    private readonly GetCarsUseCase _getCarsUseCase;
    private readonly DeleteCarUseCase _deleteCarUseCase;

    public CarsController(
        AddCarUseCase addCarUseCase,
        GetCarUseCase getCarUseCase,
        GetCarsUseCase getCarsUseCase,
        DeleteCarUseCase deleteCarUseCase)
    {
        _addCarUseCase = addCarUseCase;
        _getCarUseCase = getCarUseCase;
        _getCarsUseCase = getCarsUseCase;
        _deleteCarUseCase = deleteCarUseCase;
    }

    [HttpPost]
    [Route("enum")]
    public async Task<IActionResult> AddEnum([FromBody] TestRequest request)
    {
        Console.WriteLine(request);

        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> AddCar([FromBody] AddCarRequest request)
    {
        var result = await _addCarUseCase.ExecuteAsync(request);

        if (result.Errors.Any())
        {
            var problemDetails = CreateValidationProblemDetails(HttpContext, result.Errors);
            return BadRequest(problemDetails);
        }

        // TODO: zwracać id stworzonego auta 
        return CreatedAtAction(nameof(AddCar), new { id = result }, null);
    }

    [HttpGet]
    [Route("")]
    public async Task<ActionResult<IEnumerable<CarDto>>> GetCars()
    {
        var cars = await _getCarsUseCase.ExecuteAsync();
        return Ok(cars);
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

    public static ValidationProblemDetails CreateValidationProblemDetails(
        HttpContext httpContext,
        IEnumerable<Error> errors,
        string title = "One or more validation errors occurred",
        string type = "https://tools.ietf.org/html/rfc9110#section-15.5.1",
        int statusCode = StatusCodes.Status400BadRequest)
    {
        var errorsDict = errors
            .GroupBy(error => error.PropertyName)
            .ToDictionary(
                group => group.Key,
                group => group.Select(error => error.ErrorMessage).ToArray());

        var problemDetails = new ValidationProblemDetails(errorsDict)
        {
            Type = type,
            Title = title,
            Status = statusCode,
            Instance = $"{httpContext.Request.Method} {httpContext.Request.Path}"
        };

        problemDetails.Extensions["traceId"] = httpContext.TraceIdentifier;

        return problemDetails;
    }
}
