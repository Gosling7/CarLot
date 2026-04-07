using CarLot.Catalog.Application.DTOs;
using FluentValidation;

namespace CarLot.Catalog.Application.Validators;

internal class GetCarsRequestValidator : AbstractValidator<GetCarsRequest>
{
    public GetCarsRequestValidator()
    {
        RuleFor(x => x.Search)
            .MaximumLength(20);
    }
}
