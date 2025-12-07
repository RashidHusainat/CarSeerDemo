namespace CarSeerDemo.Common;

public class NhtsaApiResponse<TResponse> where TResponse : class
{
    public int Count { get; set; }
    public string? Message { get; set; }
    public string? SearchCriteria { get; set; }
    public List<TResponse> Results { get; set; } = [];
}


