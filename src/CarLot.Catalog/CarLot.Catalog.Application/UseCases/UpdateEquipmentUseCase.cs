using CarLot.Catalog.Application.DTOs;
using CarLot.Catalog.Application.Interfaces;
using CarLot.Catalog.Domain;
using CarLot.Catalog.Domain.Entities;

namespace CarLot.Catalog.Application.UseCases;

public class UpdateEquipmentUseCase
{
    private readonly ICarRepository _carRepository;
    private readonly IEquipmentRepository _equipmentRepository;

    public UpdateEquipmentUseCase(
        ICarRepository carRepository,
        IEquipmentRepository equipmentRepository)
    {
        _carRepository = carRepository;
        _equipmentRepository = equipmentRepository;
    }

    public async Task<Result> ExecuteAsync(string vin, UpdateEquipmentRequest request)
    {
        var car = await _carRepository.GetEntityByVinAsync(vin);
        if (car is null)
        {
            return Result.Failure(
                [new Error(nameof(Car.Vin), "No car with the given vin")]);
        }

        var equipment = await _equipmentRepository.GetByCodesAsync(request.EquipmentCodes);
        var foundCodes = equipment.Select(e => e.Code).ToHashSet();
        var unknownCodes = request.EquipmentCodes.Where(e => !foundCodes.Contains(e));
        if (unknownCodes.Any())
        {
            return Result.Failure(
                [new Error(
                    nameof(request.EquipmentCodes), 
                    $"Unknown codes: {string.Join(", ", unknownCodes)}")]);
        }

        var updateResult = car.UpdateEquipment(equipment);
        if (!updateResult.IsSuccess)
        {
            return updateResult;
        }

        await _carRepository.SaveChangesAsync();

        return Result.Success();
    }
}
