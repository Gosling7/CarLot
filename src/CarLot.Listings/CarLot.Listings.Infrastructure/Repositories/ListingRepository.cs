using CarLot.Listings.Application.DTOs;
using CarLot.Listings.Application.Interfaces;
using CarLot.Listings.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CarLot.Listings.Infrastructure.Repositories;

internal class ListingRepository : IListingRepository
{
    private readonly ListingsDbContext _dbContext;

    public ListingRepository(ListingsDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Guid> AddAsync(Listing listing)
    {
        _dbContext.Listings.Add(listing);
        await _dbContext.SaveChangesAsync();
        return listing.Id;
    }

    public async Task<ListingDto?> GetDtoByVinAsync(string vin)
    {
        return await _dbContext.Listings
            .AsNoTracking()
            .Where(l => l.VIN == vin)
            .Select(l => new ListingDto(
                l.VIN, 
                l.Make, 
                l.Model,
                l.Year,
                l.FuelType,
                l.Transmission,
                l.PowerHp,
                l.EngineDisplacement,
                l.Turbocharged,
                l.Body,
                l.RegistrationPlate,
                l.DriveType,
                l.MileageKm,
                l.Location,
                l.Description,
                l.Price,
                l.Equipment.Select(e => new EquipmentDto(e.Id, e.Code, e.Name)).ToList(),
                l.CreatedAtUtc,
                l.UpdatedAtUtc))
            .FirstOrDefaultAsync();
    }

    public async Task<Listing?> GetEntityByVinAsync(string vin)
    {
        return await _dbContext.Listings
            .FirstOrDefaultAsync(l => l.VIN == vin);
    }

    public async Task SaveChangesAsync()
    {
        await _dbContext.SaveChangesAsync();
    }
}
