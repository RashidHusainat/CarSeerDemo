using System.ComponentModel.DataAnnotations;

namespace CarSeerDemo.ViewModels;

public class SearchFormViewModel
{
    [Required]
    public int MakeId { get; set; }

    [Required]
    [Range(1886, 2100, ErrorMessage = "Please enter a valid year between 1886 and 2100.")]
    public int Year { get; set; } 

    [Required]
    public string MakeName { get; set; } = null!;
}

