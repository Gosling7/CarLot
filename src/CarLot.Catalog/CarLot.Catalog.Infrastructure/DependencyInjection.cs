using CarLot.Catalog.Application.Interfaces;
using CarLot.Catalog.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CarLot.Catalog.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        if (string.IsNullOrWhiteSpace(connectionString))
        {
            var dbHost = configuration["MSSQL_HOST"];
            var dbPassword = configuration["MSSQL_SA_PASSWORD"];
            var dbName = configuration["MSSQL_DB_NAME"];

            services.AddDbContext<CatalogDbContext>(optionsBuilder =>
            {
                optionsBuilder.UseSqlServer(
                    $"Data Source={dbHost},1433;" +
                    $"Initial Catalog={dbName};" +
                    "User ID=sa;" +
                    $"Password={dbPassword};" +
                    "Encrypt=False;" +
                    "Trust Server Certificate=True");
            });
        }
        else
        {
            services.AddDbContext<CatalogDbContext>(optionsBuilder =>
            {
                optionsBuilder.UseSqlServer(connectionString);
            });
        }

        services.AddScoped<ICarRepository, CarRepository>();
        services.AddScoped<IEquipmentRepository, EquipmentRepository>();
        services.AddScoped<IDataSeeder, DataSeeder>();

        return services;
    }
}