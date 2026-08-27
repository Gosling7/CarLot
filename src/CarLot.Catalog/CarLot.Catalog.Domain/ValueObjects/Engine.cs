using CarLot.Catalog.Domain.Enums;

namespace CarLot.Catalog.Domain.ValueObjects;

public sealed class Engine
{
    public FuelType FuelType { get; }
    public AdditionalFuelType? AdditionalFuelType { get; }
    public int PowerHp { get; }
    public float? EngineDisplacement { get; }
    public bool Turbocharged { get; }

    private Engine(
        FuelType fuelType,
        AdditionalFuelType? additionalFuelType,
        int powerHp,
        float? engineDisplacement,
        bool turbocharged)
    {
        FuelType = fuelType;
        AdditionalFuelType = additionalFuelType;
        PowerHp = powerHp;
        EngineDisplacement = engineDisplacement;
        Turbocharged = turbocharged;
    }

    public static Result<Engine> Create(
        FuelType fuelType,
        AdditionalFuelType? additionalFuelType,
        int powerHp,
        float? engineDisplacement,
        bool turbocharged)
    {
        var errors = new List<Error>();

        if (powerHp <= 0)
        {
            errors.Add(new Error(nameof(PowerHp), "Power must be greater than zero."));
        }

        if (fuelType == FuelType.Electric)
        {
            if (engineDisplacement is not null)
            {
                errors.Add(new Error(nameof(EngineDisplacement),
                    "Electric cars cannot have engine displacement."));
            }

            if (turbocharged)
            {
                errors.Add(new Error(nameof(Turbocharged),
                    "Electric cars cannot be turbocharged."));
            }
        }
        else if (engineDisplacement is null or <= 0)
        {
            errors.Add(new Error(nameof(EngineDisplacement),
                "Combustion engines require a positive displacement."));
        }

        if (errors.Count > 0)
        {
            return Result<Engine>.Failure(errors);
        }

        return Result<Engine>.Success(
            new Engine(fuelType, additionalFuelType, powerHp, engineDisplacement, turbocharged));
    }
}
