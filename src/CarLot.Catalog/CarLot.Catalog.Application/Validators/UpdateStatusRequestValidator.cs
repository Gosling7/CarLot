using CarLot.Catalog.Application.DTOs;
using FluentValidation;

namespace CarLot.Catalog.Application.Validators;

internal class UpdateStatusRequestValidator : AbstractValidator<UpdateStatusRequest>
{
    public UpdateStatusRequestValidator()
    {
        RuleFor(x => x.Status)
            .IsInEnum();
    }
}
