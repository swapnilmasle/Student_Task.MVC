using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Project1.Data;
using Project1.IRepository;
using Project1.Models;
using Microsoft.AspNetCore.Mvc.Filters;
using project1.fillters;

namespace Project1.Controllers
{
    
    public class UserController : Controller
    {

        private readonly IUserRepositary _login;
        
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserController(IUserRepositary login, IHttpContextAccessor httpContextAccessor)
        {
            _login = login;
           
            _httpContextAccessor = httpContextAccessor;
        }
        [Authentication]
        public IActionResult Index()
        {
            try
            {
                var get = _login.GetallList();
                return View(get);
            }
            catch (Exception)
            {

                ViewBag.ErrorMessage = "An error occurred while processing your request.";
                return View();
            }
        }
       // [Authentication]
        public IActionResult RegistrationPage()
        {
           
            return View("~/Views/User/RegistrationPage.cshtml");
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult RegistrationPage(Registration registration)
        {
            try
            {
                int result = _login.Add(registration);
                if (result == 1)
                {
                    TempData["RegistrationSuccess"] = "Registration successful. You can now login.";
                    return View("~/Views/Login/LoginPage.cshtml");
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception)
            {

                return StatusCode(500, "An error occurred while processing your request.");
            }

        }
        public IActionResult Edit(int id)
        {
            try
            {
                var user = _login.GetById(id);

                if (user == null)
                {
                    return NotFound();
                }

                return View(user);
            }
            catch (Exception)
            {
                ViewBag.ErrorMessage = "An error occurred while processing your request.";
                return View();
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, Registration update)
        {
            try
            {
                var updatedRegistration = _login.Edit(id, update);
                if (updatedRegistration == null)
                {
                    return NotFound();
                }

                TempData["SuccessMessage"] = "Registration updated successfully!";
                return RedirectToAction("Index");
            }
            catch (InvalidOperationException ex)
            {
                ViewBag.ErrorMessage = ex.Message;
                return View(update);
            }
            catch (Exception)
            {
                ViewBag.ErrorMessage = "An error occurred while processing your request.";
                return View(update);
            }
        }

        //public IActionResult Editr(int id, Registration registration)
        //{
        //    if (id != registration.Id)
        //    {
        //        return BadRequest(); // Invalid ID
        //    }

        //    if (ModelState.IsValid)
        //    {


        //        try
        //        {
        //            _context.Update(registration);
        //            _context.SaveChanges();
        //        }
        //        catch (DbUpdateConcurrencyException)
        //        {
        //            if (!EmployeeExists(employee.Id))
        //            {
        //                return NotFound();
        //            }
        //            else
        //            {
        //                throw;
        //            }
        //        }

        //        TempData["SuccessMessage"] = "Employee updated successfully!";
        //        return RedirectToAction(nameof(Index));
        //    }

        //    return View(employee);
        //}




        public IActionResult Delete(int id)
        {
            try
            {
                var deletedUser = _login.Delete(id);
                if (deletedUser == null)
                {
                    return NotFound();
                }

                TempData["SuccessMessage"] = "User deleted successfully!";
                return RedirectToAction("Index");
            }
            catch (Exception)
            {
                ViewBag.ErrorMessage = "An error occurred while processing your request.";
                return View("Index", _login.GetallList());
            }
        }
        [HttpPost]
        public IActionResult Create()
        {
            return View();
        }
      

    }
}