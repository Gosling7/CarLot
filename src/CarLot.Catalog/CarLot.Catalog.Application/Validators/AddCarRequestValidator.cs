using CarLot.Catalog.Application.DTOs;
using CarLot.Catalog.Application.Interfaces;
using FluentValidation;

namespace CarLot.Catalog.Application.Validators;

internal class AddCarRequestValidator : AbstractValidator<AddCarRequest>
{
    private readonly ICarRepository _carRepository;

    public AddCarRequestValidator(ICarRepository carRepository)
    {
        _carRepository = carRepository;

        RuleFor(x => x.Vin)
            .MustAsync(BeUnique).WithMessage("Car with the given VIN is already in the catalog.")
            .Length(5, 10);
    }

    private async Task<bool> BeUnique(string vin, CancellationToken cancellationToken)
    {
        return !await _carRepository.IsVinAlreadyPresentAsync(vin);
    }
}
