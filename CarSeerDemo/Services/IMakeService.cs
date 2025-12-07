using CarSeerDemo.Common;
using CarSeerDemo.Models;
using Refit;

namespace CarSeerDemo.Services;

public interface IMakeService
{
    [Get("/api/vehicles/getallmakes?format=json")]
    Task<NhtsaApiResponse<Make>> GetAllMakesAsync();
}

