using Microsoft.AspNetCore.Mvc;
using project1.fillters;

namespace Project1.Controllers
{
    [Authentication]
    public class TemplateController : Controller
    {
        [HttpGet]

        public IActionResult Index()
        {
            return View();
        }public IActionResult About()
        {
            return View();
        }public IActionResult Work()
        {
            return View();
        }public IActionResult Pricing()
        {
            return View();
        }public IActionResult Contact()
        {
            return View();
        }

    }
}
