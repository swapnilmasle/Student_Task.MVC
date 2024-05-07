using Microsoft.AspNetCore.Mvc;
using Project1.IRepository;
using Project1.Models;

namespace Project1.Controllers
{
   
    public class LoginController : Controller
    {
        private readonly IUserRepositary _login;
        private readonly IHttpContextAccessor _contextAccessor;
        

        public LoginController(IUserRepositary login,IHttpContextAccessor contextAccessor)
        {
            _login=login;
            _contextAccessor=contextAccessor;
        }

        [HttpGet]
        public IActionResult LoginPage()
        {
            return View();
        }
        [HttpPost]
        //[Route("")]
        //[Route("LoginPage")]

        public IActionResult LoginPage(LoginViewModel user)
        {
            try
            {
                if (user != null)
                {
                    bool check = _login.ValidateCredentials(user.Email, user.Password);
                    if (check)
                    {
                        var session = _contextAccessor.HttpContext.Session;                            
                            session.SetString("User", "Valid");
                            
                            return RedirectToAction("Index", "User");      
                    }
                    else
                    {
                        ViewBag.ErrorMessage = "Invalid username or password";
                        return View();
                    }
                }
                return NotFound();
            }
            catch (Exception ex)
            {
                
                ViewBag.ErrorMessage = "An error occurred: " + ex.Message;
                return View();
            }
        }

        public IActionResult LoginForm()
        {
            return View();
        }

    }
}
