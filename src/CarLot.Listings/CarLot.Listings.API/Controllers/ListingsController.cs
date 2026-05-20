using CarLot.Core;
using CarLot.Listings.Application.DTOs;
using CarLot.Listings.Application.UseCases;
using Microsoft.AspNetCore.Mvc;

namespace CarLot.Listings.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ListingsController : ControllerBase
{
    private readonly AddListingUseCase _addListingUseCase;

    public ListingsController(
        AddListingUseCase addListingUseCase)
    {
        _addListingUseCase = addListingUseCase;
    }

    [HttpGet]
    [Route("")]
    public async Task<IActionResult> AddListing(AddListingRequest request)
    {
        var result = await _addListingUseCase.ExecuteAsync(request);
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
