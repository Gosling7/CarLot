FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 5002


# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/CarLot.Core/CarLot.Core.csproj", "src/CarLot.Core/"]
COPY ["src/CarLot.Catalog/CarLot.Catalog.Domain/CarLot.Catalog.Domain.csproj", "src/CarLot.Catalog/CarLot.Catalog.Domain/"]
COPY ["src/CarLot.Listings/CarLot.Listings.API/CarLot.Listings.API.csproj", "src/CarLot.Listings/CarLot.Listings.API/"]
COPY ["src/CarLot.Listings/CarLot.Listings.Application/CarLot.Listings.Application.csproj", "src/CarLot.Listings/CarLot.Listings.Application/"]
COPY ["src/CarLot.Listings/CarLot.Listings.Domain/CarLot.Listings.Domain.csproj", "src/CarLot.Listings/CarLot.Listings.Domain/"]
COPY ["src/CarLot.Listings/CarLot.Listings.Infrastructure/CarLot.Listings.Infrastructure.csproj", "src/CarLot.Listings/CarLot.Listings.Infrastructure/"]
RUN dotnet restore "./src/CarLot.Listings/CarLot.Listings.API/CarLot.Listings.API.csproj"
COPY . .
WORKDIR "/src/src/CarLot.Listings/CarLot.Listings.API"
RUN dotnet build "./CarLot.Listings.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./CarLot.Listings.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CarLot.Listings.API.dll"]
