using CarLot.Listings.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CarLot.Listings.Infrastructure;

internal class ListingsDbContext : DbContext
{
    public DbSet<Listing> Listings { get; set; }

    public ListingsDbContext(DbContextOptions<ListingsDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(ListingsDbContext).Assembly);
    }
}
