using Microsoft.AspNetCore.Mvc;

namespace Project1.Controllers
{
    public class ExampleController : Controller
    {
        public IActionResult Index()
        {
            return View();
        } public IActionResult Example()
        {
            return View();
        }
    }
}
