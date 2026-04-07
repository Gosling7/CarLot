using CarLot.Catalog.Application.DTOs;
using CarLot.Catalog.Application.Interfaces;
using CarLot.Catalog.Domain;
using FluentValidation;

namespace CarLot.Catalog.Application.Queries;

public class GetCarsQuery
{
    private readonly ICarRepository _carRepository;
    private readonly IValidator<GetCarsRequest> _validator;

    public GetCarsQuery(
        ICarRepository carRepository, 
        IValidator<GetCarsRequest> validator)
    {
        _carRepository = carRepository;
        _validator = validator;
    }

    public async Task<Result<PaginatedResponse<CarDto>>> ExecuteAsync(GetCarsRequest request)
    {
        var errors = new List<Error>();

        var validationResult = await _validator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            foreach (var error in validationResult.Errors)
            {
                errors.Add(new Error(error.PropertyName, error.ErrorMessage));
            }

            return Result<PaginatedResponse<CarDto>>.Failure(errors);
        }
        
        var cars = await _carRepository.GetAsync(request);
        return Result<PaginatedResponse<CarDto>>.Success(cars);
    }
}
