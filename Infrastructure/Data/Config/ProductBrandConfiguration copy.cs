using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
  public class ProductTypeConfiguration : IEntityTypeConfiguration<ProductType>
  {
    public void Configure(EntityTypeBuilder<ProductType> builder)
    {
      builder.Property(t => t.Id).ValueGeneratedNever();
    }
  }
}