using CarSeerDemo.Services;
using Refit;

namespace CarSeerDemo.Extensions;

public static class AddNhtsaApiClients
{
    private static readonly Uri BaseAddress = new Uri("https://vpic.nhtsa.dot.gov");

    public static IServiceCollection AddNhtsaApiClient(this IServiceCollection services)
    {
        services.AddRefitClient<IMakeService>()
        .ConfigureHttpClient(client => client.BaseAddress = BaseAddress)
          .AddResilienceHandler("RetryStrategy", ResiliencePoliciesExtension.CreateRetryStrategy());


        services.AddRefitClient<IVehicleType>()
       .ConfigureHttpClient(client => client.BaseAddress = BaseAddress)
         .AddResilienceHandler("RetryStrategy", ResiliencePoliciesExtension.CreateRetryStrategy());


        services.AddRefitClient<ICarModels>()
       .ConfigureHttpClient(client => client.BaseAddress = BaseAddress)
         .AddResilienceHandler("RetryStrategy", ResiliencePoliciesExtension.CreateRetryStrategy());

        return services;
    }

}

