using CarLot.Catalog.Application.DTOs;
using CarLot.Catalog.Application.UseCases;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarLot.Catalog.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EquipmentController : ControllerBase
{
    private readonly GetEquipmentUseCase _useCase;

    public EquipmentController(GetEquipmentUseCase useCase)
    {
        _useCase = useCase;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EquipmentDto>>> GetEquipment()
    {
        var equipment = await _useCase.ExecuteAsync();
        return Ok(equipment);
    }
}
