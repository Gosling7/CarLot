using CarLot.Core.Constants;

namespace CarLot.Catalog.Domain.ValueObjects;

public sealed class Vin
{
    public string Value { get; }

    private Vin(string value)
    {
        Value = value;
    }

    public static Result<Vin> Create(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return Result<Vin>.Failure([new Error(nameof(Vin), "VIN is required.")]);
        }

        var upperCaseValue = value.Trim().ToUpperInvariant();

        if (upperCaseValue.Length > CarSchema.VinMaxLength)
        {
            return Result<Vin>.Failure(
                [new Error(nameof(Vin), $"VIN cannot be longer than {CarSchema.VinMaxLength} characters.")]);
        }

        return Result<Vin>.Success(new Vin(upperCaseValue));
    }

    public override string ToString() => Value;
}
