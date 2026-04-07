using CarLot.Catalog.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CarLot.Catalog.Infrastructure.Configurations;

public class EquipmentConfiguration : IEntityTypeConfiguration<Equipment>
{
    public void Configure(EntityTypeBuilder<Equipment> builder)
    {
        builder.ToTable("Equipment")
            .HasKey(e => e.Id);

        builder.Property(e => e.Name)
               .HasMaxLength(200)
               .IsRequired();

        //builder.HasOne(e => e.Category)
        //    .WithMany()
        //    .HasForeignKey(e => e.CategoryId)
        //    .OnDelete(DeleteBehavior.Restrict);
    }
}
