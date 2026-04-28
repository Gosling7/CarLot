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
    private readonly DeleteCarUseCase _deleteCarUseCase;
    private readonly EditCarUseCase _editCarUseCase;

    private readonly UpdateMileageUseCase _updateMileageUseCase;
    private readonly UpdateStatusUseCase _updateStatusUseCase;
    private readonly UpdateEquipmentUseCase _updateEquipmentUseCase;

    private readonly GetCarStatsQuery _getCarStatsQuery;
    private readonly GetCarByVinQuery _getCarByVinQuery;
    private readonly GetCarsQuery _getCarsQuery;

    public CarsController(
        AddCarUseCase addCarUseCase,
        DeleteCarUseCase deleteCarUseCase,
        GetCarStatsQuery getCarStatsQuery,
        GetCarByVinQuery getCarByVinQuery,
        UpdateMileageUseCase updateMileageUseCase,
        GetCarsQuery getCarsQuery,
        UpdateStatusUseCase updateStatusUseCase,
        UpdateEquipmentUseCase updateEquipmentUseCase,
        EditCarUseCase editCarUseCase)
    {
        _addCarUseCase = addCarUseCase;
        _deleteCarUseCase = deleteCarUseCase;
        _getCarStatsQuery = getCarStatsQuery;
        _getCarByVinQuery = getCarByVinQuery;
        _updateMileageUseCase = updateMileageUseCase;
        _getCarsQuery = getCarsQuery;
        _updateStatusUseCase = updateStatusUseCase;
        _updateEquipmentUseCase = updateEquipmentUseCase;
        _editCarUseCase = editCarUseCase;
    }

    [HttpGet]
    [Route("")]
    public async Task<ActionResult<PaginatedResponse<CarDto>>> GetCars(
        [FromQuery] GetCarsRequest request)
    {
        var result = await _getCarsQuery.ExecuteAsync(request);
        if (!result.IsSuccess)
        {
            var problemDetails = CreateValidationProblemDetails(HttpContext, result.Errors);
            return BadRequest(problemDetails);
        }

        return Ok(result.Value);
    }

    [HttpPatch]
    [Route("{vin}/mileage")]
    public async Task<ActionResult<CarDto>> UpdateMileageByVin(
        [FromRoute] string vin, [FromBody] int mileage)
    {
        var result = await _updateMileageUseCase.ExecuteAsync(vin, mileage);
        if (!result.IsSuccess)
        {
            var problemDetails = CreateValidationProblemDetails(HttpContext, result.Errors);
            return BadRequest(problemDetails);
        }

        return Ok();
    }

    [HttpPatch]
    [Route("{vin}/status")]
    public async Task<ActionResult<CarDto>> UpdateStatusByVin(
        [FromRoute] string vin, [FromBody] UpdateStatusRequest request)
    {
        var result = await _updateStatusUseCase.ExecuteAsync(vin, request);
        if (!result.IsSuccess)
        {
            var problemDetails = CreateValidationProblemDetails(HttpContext, result.Errors);
            return BadRequest(problemDetails);
        }

        return Ok();
    }

    [HttpPatch]
    [Route("{vin}/equipment")]
    public async Task<ActionResult<CarDto>> UpdateEquipmentByVin(
    [   FromRoute] string vin, [FromBody] UpdateEquipmentRequest request)
    {
        var result = await _updateEquipmentUseCase.ExecuteAsync(vin, request);
        if (!result.IsSuccess)
        {
            var problemDetails = CreateValidationProblemDetails(HttpContext, result.Errors);
            return BadRequest(problemDetails);
        }

        return Ok();
    }

    [HttpPatch]
    [Route("{vin}/edit")]
    public async Task<ActionResult<CarDto>> EditCarByVin([FromRoute] string vin, 
        [FromBody] EditCarRequest request)
    {
        var result = await _editCarUseCase.ExecuteAsync(vin, request);
        if (!result.IsSuccess)
        {
            var problemDetails = CreateValidationProblemDetails(HttpContext, result.Errors);
            return BadRequest(problemDetails);
        }

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
        var stats = await _getCarStatsQuery.ExecuteAsync();
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
            .GroupBy(error => error.Property)
            .ToDictionary(
                group => group.Key,
                group => group.Select(error => error.Message).ToArray());

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
