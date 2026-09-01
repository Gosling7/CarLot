using CarLot.Catalog.Domain.Entities;
using CarLot.Core.Constants;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CarLot.Catalog.Infrastructure.Configurations;

internal class CarConfiguration : IEntityTypeConfiguration<Car>
{
    public void Configure(EntityTypeBuilder<Car> builder)
    {
        builder.ToTable("Cars")
            .HasKey(c => c.Id);

        builder.OwnsOne(c => c.Vin, vin =>
        {
            vin.Property(v => v.Value)
                .HasColumnName("VIN")
                .HasMaxLength(CarSchema.VinMaxLength);

            vin.HasIndex(v => v.Value)
                .IsUnique();
        });

        builder.OwnsOne(c => c.Engine, engine =>
        {
            engine.Property(e => e.FuelType)
                .HasColumnName("FuelType")
                .HasConversion<string>()
                .HasMaxLength(CarSchema.EnumMaxLength);

            engine.Property(e => e.AdditionalFuelType)
                .HasColumnName("AdditionalFuelType")
                .HasConversion<string>()
                .HasMaxLength(CarSchema.EnumMaxLength);

            engine.Property(e => e.PowerHp).HasColumnName("PowerHp");
            engine.Property(e => e.EngineDisplacement).HasColumnName("EngineDisplacement");
            engine.Property(e => e.Turbocharged).HasColumnName("Turbocharged");
        });

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

        builder.Property(c => c.Transmission)
            .HasConversion<string>()
            .HasMaxLength(CarSchema.EnumMaxLength);

        builder.Property(c => c.DriveType)
            .HasConversion<string>()
            .HasMaxLength(CarSchema.EnumMaxLength);

        builder.Property(c => c.Status)
            .HasConversion<string>()
            .HasMaxLength(CarSchema.EnumMaxLength);

        builder.Property(c => c.Version)
            .IsConcurrencyToken();

        builder.HasMany(c => c.Equipment)
            .WithMany();
    }
}
