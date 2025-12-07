using CarSeerDemo.Models;
using CarSeerDemo.Services;
using CarSeerDemo.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Threading.Tasks;

namespace CarSeerDemo.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IMakeService _makeService;
        private readonly IVehicleType _vehicleType;
        private readonly ICarModels _carModels;

        public HomeController(
            ILogger<HomeController> logger,
            IMakeService makeService,
            IVehicleType vehicleType,
            ICarModels carModels
            )
        {
            _logger = logger;
            _makeService = makeService;
            _vehicleType = vehicleType;
            _carModels = carModels;
        }

        public IActionResult Index()
        {

            return View();
        }

        [HttpGet]
        [ResponseCache(Duration = 5184000, Location = ResponseCacheLocation.Any, NoStore = false)]
        public async Task<ActionResult> GetAllMakes()
        {
            return Json(await _makeService.GetAllMakesAsync());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Search(SearchFormViewModel searchForm)
        {
            if (!ModelState.IsValid)
                return BadRequest("Please enter a valid search term.");

            return Json(new
            {
                redirectUrl = Url.Action("SearchResult", "Home", searchForm)
            });
        }

        public IActionResult SearchResult(SearchFormViewModel searchForm)
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetVehicleTypesForMakeId(int MakeId)
        {
            return Json(await _vehicleType.GetVehicleTypesForMakeIdAsync(MakeId));
        }

        [HttpGet]
        public async Task<IActionResult> GetModelsForMakeIdYear(int MakeId, int Year)
        {
            return Json(await _carModels.GetModelsForMakeIdYearAsync(MakeId,Year));
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
