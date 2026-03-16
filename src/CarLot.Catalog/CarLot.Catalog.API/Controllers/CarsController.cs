using CarLot.Catalog.Application.DTOs;
using CarLot.Catalog.Application.Queries;
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
    private readonly GetCarStatsQuery _getCarStatsQuery;
    private readonly GetCarByVinQuery _getCarByVinQuery;

    public CarsController(
        AddCarUseCase addCarUseCase,
        GetCarUseCase getCarUseCase,
        GetCarsUseCase getCarsUseCase,
        DeleteCarUseCase deleteCarUseCase,
        GetCarStatsQuery getCarStatsQuery,
        GetCarByVinQuery getCarByVinQuery)
    {
        _addCarUseCase = addCarUseCase;
        _getCarUseCase = getCarUseCase;
        _getCarsUseCase = getCarsUseCase;
        _deleteCarUseCase = deleteCarUseCase;
        _getCarStatsQuery = getCarStatsQuery;
        _getCarByVinQuery = getCarByVinQuery;
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
    public async Task<ActionResult<PaginatedResponse<CarDto>>> GetCars([FromQuery] GetCarsRequest request)
    {
        var cars = await _getCarsUseCase.ExecuteAsync(request);
        return Ok(cars);
    }

    //[HttpGet]
    //[Route("{carId}")]
    //public async Task<ActionResult<CarDto>> GetCarById(Guid carId)
    //{
    //    var car = await _getCarUseCase.ExecuteAsync(carId);
    //    return Ok(car);
    //}

    [HttpGet]
    [Route("{vin}")]
    public async Task<ActionResult<CarDto>> GetCarByVin(string vin)
    {
        var car = await _getCarByVinQuery.ExecuteAsync(vin);
        return Ok(car);
    }

    [HttpGet]
    [Route("stats")]
    public async Task<ActionResult<CarStatsDto>> GetCarStats()
    {
        var stats  = await _getCarStatsQuery.ExecuteAsync();
        return Ok(stats);
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
