using System;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
  public class ProductBrandConfiguration : IEntityTypeConfiguration<ProductBrand>
  {
    public void Configure(EntityTypeBuilder<ProductBrand> builder)
    {
      builder.Property(pb => pb.Id).ValueGeneratedNever();
    }
  }
}