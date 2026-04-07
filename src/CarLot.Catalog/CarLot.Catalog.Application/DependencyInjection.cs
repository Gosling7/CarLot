using CarLot.Catalog.Application.DTOs;
using CarLot.Catalog.Application.Queries;
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

            .AddScoped<DeleteCarUseCase>()

            .AddScoped<GetCarStatsQuery>()
            .AddScoped<GetCarByVinQuery>()

            .AddScoped<GetCarsQuery>()
            .AddScoped<IValidator<GetCarsRequest>, GetCarsRequestValidator>()

            .AddScoped<UpdateMileageUseCase>()

            .AddScoped<UpdateStatusUseCase>()
            .AddScoped<IValidator<UpdateStatusRequest>, UpdateStatusRequestValidator>()

            .AddScoped<UpdateEquipmentUseCase>()

            .AddScoped<UpdateEquipmentUseCase>()

            .AddScoped<GetEquipmentUseCase>();

        return services;
    }
}
