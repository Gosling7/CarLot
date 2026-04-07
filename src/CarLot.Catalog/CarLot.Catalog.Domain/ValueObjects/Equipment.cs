using CarLot.Catalog.Domain.Entities;

namespace CarLot.Catalog.Domain.ValueObjects;

public class Equipment
{
    public Guid Id { get; set;  }
    public string Code { get; set;  }
    public string Name { get; set;  }

    public List<Car> Car { get; set; }
}
