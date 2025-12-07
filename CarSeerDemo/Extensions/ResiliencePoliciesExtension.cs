using Microsoft.Extensions.Http.Resilience;
using Polly;

namespace CarSeerDemo.Extensions;

public static class ResiliencePoliciesExtension
{
    public static Action<ResiliencePipelineBuilder<HttpResponseMessage>> CreateRetryStrategy()
    {
        return builder =>
        {
            builder.AddRetry(new HttpRetryStrategyOptions
            {
                MaxRetryAttempts = 3,
                Delay = TimeSpan.FromSeconds(3),
                BackoffType = DelayBackoffType.Exponential,
                UseJitter = true,
                ShouldHandle = new PredicateBuilder<HttpResponseMessage>()
                    .Handle<HttpRequestException>()
                    .HandleResult(response => !response.IsSuccessStatusCode)
            });
        };
    }
}

