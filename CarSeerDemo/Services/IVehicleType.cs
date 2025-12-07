using CarSeerDemo.Common;
using CarSeerDemo.Models;
using Refit;

namespace CarSeerDemo.Services;

public interface IVehicleType
{
    [Get("/api/vehicles/GetVehicleTypesForMakeId/{MakeId}?format=json")]
    Task<NhtsaApiResponse<VehicleType>> GetVehicleTypesForMakeIdAsync(int MakeId);
}

