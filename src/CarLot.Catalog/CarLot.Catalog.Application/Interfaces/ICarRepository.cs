using System;
using System.Collections.Generic;
using System.Text;

namespace CarLot.Catalog.Application.Interfaces;

public interface ICarRepository
{
    Task<Guid> AddAsync(Domain.Entities.Car car);
}
