using Microsoft.AspNetCore.Mvc;

namespace Project1.Controllers
{
    public class HerbTeaShopController : Controller
    {
        //[Route("")]
        //[Route("Tea")]

        public IActionResult TeaShop()
        {
            return View();
        }
    }
}
