using CarLot.Catalog.Application.UseCases;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CarLot.Catalog.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration)
    {
        services
            .AddScoped<AddCarUseCase>()
            .AddScoped<GetCarUseCase>()
            .AddScoped<DeleteCarUseCase>();

        return services;
    }
}
