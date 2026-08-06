using CarLot.Listings.Application.Queries;
using CarLot.Listings.Application.UseCases;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CarLot.Listings.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration)
    {
        services
            .AddScoped<GetListingByVinQuery>()

            .AddScoped<AddListingUseCase>()
            .AddScoped<UpdateListingDescriptionUseCase>()
            .AddScoped<UpdateListingPriceUseCase>()
            .AddScoped<UpdateListingStatusUseCase>();

        return services;
    }
}