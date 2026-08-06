using CarLot.Listings.Application.Interfaces;
using CarLot.Listings.Infrastructure.HttpClients;
using CarLot.Listings.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CarLot.Listings.Infrastructure;

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

            services.AddDbContext<ListingsDbContext>(optionsBuilder =>
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
            services.AddDbContext<ListingsDbContext>(optionsBuilder =>
            {
                optionsBuilder.UseSqlServer(connectionString);
            });
        }

        services
            .AddHttpClient<ICatalogClient, CatalogClient>();

        services
            .AddScoped<IListingRepository, ListingRepository>();

        return services;
    }
}