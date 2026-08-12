using CarLot.Core.Constants;
using CarLot.Listings.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CarLot.Listings.Infrastructure.Configurations;

internal class ListingConfiguration : IEntityTypeConfiguration<Listing>
{
    public void Configure(EntityTypeBuilder<Listing> builder)
    {
        builder.ToTable("Listings")
            .HasKey(c => c.Id);

        builder.Property(c => c.VIN)
            .HasMaxLength(CarSchema.VinMaxLength); 
        builder.HasIndex(c => c.VIN)
            .IsUnique();

        builder.Property(c => c.Make)
            .HasMaxLength(CarSchema.MakeMaxLength);

        builder.Property(c => c.Model)
            .HasMaxLength(CarSchema.ModelMaxLength);

        builder.Property(c => c.Body)
            .HasMaxLength(CarSchema.BodyMaxLength);

        builder.Property(c => c.Location)
            .HasMaxLength(CarSchema.LocationMaxLength);

        builder.Property(c => c.RegistrationPlate)
            .HasMaxLength(CarSchema.RegistrationPlateMaxLength);

        builder.Property(c => c.Version)
            .IsConcurrencyToken();

        builder.HasMany(l => l.Equipment)
            .WithMany(e => e.lis)
    }
}
