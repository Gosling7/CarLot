using CarLot.Core;
using CarLot.Listings.Application.DTOs;
using CarLot.Listings.Application.Interfaces;
using System.Net;
using System.Net.Http.Json;

namespace CarLot.Listings.Infrastructure.HttpClients;

public class CatalogClient : ICatalogClient
{
    private readonly HttpClient _httpClient;

    public CatalogClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<Result<CarDto?>> GetCarByVinAsync(string vin, CancellationToken cancellationToken)
    {
        HttpResponseMessage response;

        try
        {
            response = await _httpClient.GetAsync($"http://localhost:5000/api/cars/{vin}", cancellationToken);
        }
        catch (HttpRequestException)
        {
            throw new HttpRequestException();
        }

        if (response.StatusCode == HttpStatusCode.NotFound)
        {
            return Result<CarDto?>.Success(null);
        }

        response.EnsureSuccessStatusCode();

        var car = await response.Content.ReadFromJsonAsync<CarDto>(cancellationToken);
        return Result<CarDto?>.Success(car);
    }
}
