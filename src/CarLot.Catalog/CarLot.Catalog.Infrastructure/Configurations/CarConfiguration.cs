using CarLot.Catalog.Infrastructure.DataAccessObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CarLot.Catalog.Infrastructure.Configurations;

internal class CarConfiguration : IEntityTypeConfiguration<CarDAO>
{
    public void Configure(EntityTypeBuilder<CarDAO> builder)
    {
        builder.ToTable("Cars")
            .HasKey(c => c.Id);

        builder.HasIndex(c => c.VIN)
            .IsUnique();

        builder.Property(c => c.Version)
            .IsConcurrencyToken();

        builder.HasMany(c => c.Equipment)
            .WithOne(e => e.Car)
            .HasForeignKey(e => e.CarId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
