FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 5000


# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/CarLot.Gateway/CarLot.Gateway.csproj", "src/CarLot.Gateway/"]
RUN dotnet restore "./src/CarLot.Gateway/CarLot.Gateway.csproj"
COPY . .
WORKDIR "/src/src/CarLot.Gateway"
RUN dotnet build "./CarLot.Gateway.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./CarLot.Gateway.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CarLot.Gateway.dll"]
