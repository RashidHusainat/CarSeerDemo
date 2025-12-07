using CarSeerDemo.Common;
using CarSeerDemo.Models;
using Refit;

namespace CarSeerDemo.Services;

public interface ICarModels
{
    [Get("/api/vehicles/GetModelsForMakeIdYear/makeId/{MakeId}/modelyear/{Year}?format=json")]
    Task<NhtsaApiResponse<VehicleModel>> GetModelsForMakeIdYearAsync(int MakeId,int Year);
}

