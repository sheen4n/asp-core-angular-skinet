using System;
using System.Linq;
using System.Reflection;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Infrastructure.Data
{
  public class StoreContext : DbContext
  {
    public StoreContext(DbContextOptions<StoreContext> options) : base(options)
    {

    }

    public DbSet<Product> Products { get; set; }
    public DbSet<ProductBrand> ProductBrands { get; set; }
    public DbSet<ProductType> ProductTypes { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<DeliveryMethod> DeliveryMethods { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);
      modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());



      if (Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
      {
        modelBuilder.Model.GetEntityTypes().ToList().ForEach(
          entityType =>
          {
            var properties = entityType.ClrType
              .GetProperties()
              .Where(p => p.PropertyType == typeof(decimal));

            properties.ToList().ForEach(p =>
              modelBuilder.Entity(entityType.Name)
              .Property(p.Name)
              .HasConversion<double>()
            );

            var dateTimeProperties = entityType.ClrType
              .GetProperties()
              .Where(p => p.PropertyType == typeof(DateTimeOffset));

            dateTimeProperties.ToList().ForEach(p =>
              modelBuilder.Entity(entityType.Name)
              .Property(p.Name)
              .HasConversion(new DateTimeOffsetToBinaryConverter())
            );
          }
        );
      }
    }
  }
}