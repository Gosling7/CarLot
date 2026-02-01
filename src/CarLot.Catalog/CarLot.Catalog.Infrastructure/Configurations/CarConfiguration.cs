using CarLot.Catalog.Infrastructure.DataAccessObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CarLot.Catalog.Infrastructure.Configurations;

internal class CarConfiguration : IEntityTypeConfiguration<CarDao>
{
    public void Configure(EntityTypeBuilder<CarDao> builder)
    {
        builder.ToTable("Cars")
            .HasKey(c => c.Id);

        builder.Property(c => c.VIN)
            .HasMaxLength(20) // just in case for some obscure old cars
            .IsRequired();
        builder.HasIndex(c => c.VIN)
            .IsUnique();

        builder.Property(c => c.Make)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(c => c.Model)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(c => c.Year)
            .IsRequired();

        builder.Property(c => c.FuelType)
            .IsRequired();

        builder.Property(c => c.Body)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(c => c.Location)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(c => c.RegistrationPlate)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(c => c.DriveType)
            .IsRequired();

        builder.Property(c => c.MileageKm)
            .IsRequired();

        builder.Property(c => c.PowerHP)
            .IsRequired();

        builder.Property(c => c.Status)
            .IsRequired();
        
        builder.Property(c => c.CreatedAtUtc)
            .IsRequired();

        builder.Property(c => c.Transmission)
            .IsRequired();

        builder.Property(c => c.Version)
            .IsConcurrencyToken();

        builder.HasMany(c => c.Equipment)
            .WithOne(ce => ce.Car)
            .HasForeignKey(ce => ce.CarId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
