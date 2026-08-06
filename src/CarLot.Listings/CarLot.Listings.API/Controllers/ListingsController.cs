using CarLot.Core;
using CarLot.Listings.Application.DTOs;
using CarLot.Listings.Application.Queries;
using CarLot.Listings.Application.UseCases;
using Microsoft.AspNetCore.Mvc;

namespace CarLot.Listings.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ListingsController : ControllerBase
{
    private readonly AddListingUseCase _addListingUseCase;
    private readonly UpdateListingPriceUseCase _updateListingPriceUseCase;
    private readonly UpdateListingDescriptionUseCase _updateListingDescriptionUseCase;
    private readonly UpdateListingStatusUseCase _updateListingStatusUseCase;
    private readonly GetListingByVinQuery _getListingByVinQuery;

    public ListingsController(
        AddListingUseCase addListingUseCase,
        GetListingByVinQuery getListingByVinQuery,
        UpdateListingPriceUseCase updateListingPriceUseCase,
        UpdateListingDescriptionUseCase updateListingDescriptionUseCase,
        UpdateListingStatusUseCase updateListingStatusUseCase)
    {
        _addListingUseCase = addListingUseCase;
        _getListingByVinQuery = getListingByVinQuery;
        _updateListingPriceUseCase = updateListingPriceUseCase;
        _updateListingDescriptionUseCase = updateListingDescriptionUseCase;
        _updateListingStatusUseCase = updateListingStatusUseCase;
    }

    [HttpPost]
    [Route("")]
    public async Task<IActionResult> AddListing(AddListingRequest request, CancellationToken cancellationToken)
    {
        var result = await _addListingUseCase.ExecuteAsync(request, cancellationToken);
        return result.IsSuccess
            ? Ok()
            : BadRequest(CreateValidationProblemDetails(HttpContext, result.Errors));
    }

    [HttpGet]
    [Route("{vin}")]
    public async Task<IActionResult> GetListingByVin(string vin, CancellationToken cancellationToken)
    {
        var listing = await _getListingByVinQuery.ExecuteAsync(vin, cancellationToken);
        return Ok(listing);
    }

    [HttpPatch]
    [Route("{vin}/price")]
    public async Task<IActionResult> UpdateListingPriceByVin(string vin, [FromBody] decimal price, CancellationToken cancellationToken)
    {
        var result = await _updateListingPriceUseCase.ExecuteAsync(vin, price, cancellationToken);
        return result.IsSuccess
            ? Ok()
            : BadRequest(CreateValidationProblemDetails(HttpContext, result.Errors));
    }

    [HttpPatch]
    [Route("{vin}/description")]
    public async Task<IActionResult> UpdateListingDescriptionByVin(string vin, [FromBody] string description, CancellationToken cancellationToken)
    {
        var result = await _updateListingDescriptionUseCase.ExecuteAsync(vin, description, cancellationToken);
        return result.IsSuccess
            ? Ok()
            : BadRequest(CreateValidationProblemDetails(HttpContext, result.Errors));
    }

    [HttpPatch]
    [Route("{vin}/status")]
    public async Task<IActionResult> UpdateListingStatusByVin(string vin, [FromBody] string status, CancellationToken cancellationToken)
    {
        var result = await _updateListingStatusUseCase.ExecuteAsync(vin, status, cancellationToken);
        return result.IsSuccess
            ? Ok()
            : BadRequest(CreateValidationProblemDetails(HttpContext, result.Errors));
    }

    // TODO: temporary, move into Core
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
