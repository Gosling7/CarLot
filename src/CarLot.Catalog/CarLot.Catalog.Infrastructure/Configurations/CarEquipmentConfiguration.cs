using CarLot.Catalog.Infrastructure.DataAccessObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CarLot.Catalog.Infrastructure.Configurations;

public class CarEquipmentConfiguration : IEntityTypeConfiguration<CarEquipmentDao>
{
    public void Configure(EntityTypeBuilder<CarEquipmentDao> builder)
    {
        builder.ToTable("CarEquipment")
            .HasKey(e => e.Id);

        builder.Property(e => e.Id)
            .ValueGeneratedOnAdd();

        builder.HasOne(e => e.Car)
            .WithMany(c => c.Equipment)
            .HasForeignKey(e => e.CarId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(e => e.Equipment)
            .WithMany()
            .HasForeignKey(e => e.EquipmentId)
            .OnDelete(DeleteBehavior.Restrict);

        // TODO: add some index? 
    }
}
