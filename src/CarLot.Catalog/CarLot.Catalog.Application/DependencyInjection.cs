using CarLot.Catalog.Application.DTOs;
using CarLot.Catalog.Application.UseCases;
using CarLot.Catalog.Application.Validators;
using FluentValidation;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CarLot.Catalog.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration)
    {
        services
            .AddScoped<AddCarUseCase>()
            .AddScoped<IValidator<AddCarRequest>, AddCarRequestValidator>()

            .AddScoped<GetCarUseCase>()

            .AddScoped<GetCarsUseCase>()

            .AddScoped<DeleteCarUseCase>()

            .AddScoped<GetEquipmentUseCase>();

        return services;
    }
}
