using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Project1.Data;
using Project1.IRepository;
using Project1.Models;
using project1.fillters;
using System.Text.Json;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.DotNet.Scaffolding.Shared.CodeModifier.CodeChange;
using System.Net.Http;
using Project1.Models.DTO;
using System.Runtime.InteropServices;

namespace Project1.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
   // [Authentication]
    public class StudentComplaintController : Controller
    {
        private readonly IStudentRepositary _studentRepositary;
        private readonly ApplicationDbContext _context;
        private readonly IHttpClientFactory _clientFactory;


        public StudentComplaintController(IHttpClientFactory clientFactory ,IStudentRepositary studentRepositary,ApplicationDbContext context)
        {
            _studentRepositary = studentRepositary;
            _context = context;
            _clientFactory = clientFactory;
        }
        public async Task<IActionResult> Index()
        {
            //try
            //{
            //    IEnumerable<StudentModel> data = _studentRepositary.GetAllStudents();
            //    return View(data);
            //}
            //catch (Exception)
            //{
            //    return View("Error");
            //}
            var client = _clientFactory.CreateClient();
            var httpReponseMessage = await client.GetAsync("https://localhost:7210/api/Student");
            httpReponseMessage.EnsureSuccessStatusCode();
            List<StudentModel> students = new List<StudentModel>();
             students.AddRange(await httpReponseMessage.Content.ReadFromJsonAsync<List<StudentModel>>());
            return View(students);
        }

        [Route("")]
        [Route("AddStudent")]
        public IActionResult AddStudentDetials()
        {
            List<CountryModel> countryModels = _context.CountrysTb.ToList();
            ViewBag.ListCountry = countryModels;
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> AddStudentDetials(StudentModel student)
        {
            if (ModelState.IsValid)
            {
                //Create Client first
                var Client = _clientFactory.CreateClient();
                var HttpRequestMessage = new HttpRequestMessage()
                {
                    Method = HttpMethod.Post,
                    RequestUri = new Uri("https://localhost:7210/api/Student"),
                    Content = new StringContent(JsonSerializer.Serialize(student), Encoding.UTF8, "application/json")
                };

                var response = await Client.SendAsync(HttpRequestMessage);
                response.EnsureSuccessStatusCode();
                var responseMessage = await response.Content.ReadAsStringAsync();
                if (responseMessage != null)
                {
                    return RedirectToAction("Index");
                }
            }
            return View();
            //if (ModelState.IsValid)
            //{
            //   int result =  _studentRepositary.AddStudent(student);
            //    TempData["SuccessMessage"] = " Data added successfully!";
            //    if (result > 0)
            //    {
            //        return RedirectToAction("Index"); 
            //    }
            //    else
            //    {
            //        ModelState.AddModelError("", "Error occurred while adding student.");
            //    }
            //}          
            //return View(student);
        }
        
        [HttpGet]
        public IActionResult GetCities(int countryId)
        {

            var cities = _studentRepositary.GetCitiesByCountryId(countryId);
            return Json(cities);
        }
        //[Authentication]
        public async Task<IActionResult> GetStudentID(int id,string mode )
        {          
            if (mode== "View")
            {

                //------------------------------Calling Api ----------------------------------------------
                // Send an HTTP GET request to the API to fetch the student details
                //var client = _clientFactory.CreateClient();
                //var httpReponseMessage = await client.GetAsync($"https://localhost:7210/api/Student/{id}");
                //if(!httpReponseMessage.IsSuccessStatusCode)
                //{
                //    // Handle the case where the API request fails
                //    return View("Error");
                //}
                
                //StudentModel studentde = new StudentModel();

                //studentde = await httpReponseMessage.Content.ReadFromJsonAsync<StudentModel>();

                //--------------------------------End----------------------------------------------------

                 StudentModel studentde = _studentRepositary.GetIdFromView(id);
             
                if (studentde != null)
                {
                    var getcountryname =  _context.CountrysTb.Where(u =>u.CountryId == studentde.CountryId).FirstOrDefault();
                    if(getcountryname != null)
                    {
                        ViewBag.GetCountry = getcountryname.CountryName;
                    }
                    var getcity = _context.CitysTb.Where(u =>u.CityId == studentde.CityId).FirstOrDefault();
                    if(getcity != null)
                    {
                        ViewBag.GetCity = getcity.CityName;
                    }
                   var cheakbox =  _context.StudentsTb.Where(u => u.StudentId == studentde.StudentId).FirstOrDefault();
                    if(cheakbox != null)
                    {
                      ViewBag.GetCheackboxvalue =   cheakbox.PreferredContactCheackBox;
                    }

                    ViewBag.ForViewOnly = mode;
                    return View("~/Views/StudentComplaint/AddStudentDetials.cshtml", studentde);
                }
            }
           
          return View();    
            
        }
        public IActionResult DispalyViewPage(int id)
        {
            ViewBag.Id= id;
            ViewBag.ForViewOnly = "View";          
            return View("~/Views/StudentComplaint/AddStudentDetials.cshtml");
        }
        public IActionResult DispalyUpdatePage(int id)
        {
            ViewBag.Id = id;
            ViewBag.ForViewOnly = "Update";
            return View("~/Views/StudentComplaint/AddStudentDetials.cshtml");
        }
        public async Task<IActionResult> Update(int id, string action )
        {
            if (action == "Update")
            {
                try
                {
                    var client = _clientFactory.CreateClient();
                    var httpReponseMessage = await client.GetAsync($"https://localhost:7210/api/Student/{id}");
                    if (!httpReponseMessage.IsSuccessStatusCode)
                    {
                        // Handle the case where the API request fails
                        return View("Error");
                    }

                    StudentModel studentde = new StudentModel();

                    studentde = await httpReponseMessage.Content.ReadFromJsonAsync<StudentModel>();

                    //var existingStudent = _studentRepositary.GetIdFromView(id);
                    var getCountry = _context.CountrysTb.FirstOrDefault(c => c.CountryId == studentde.CountryId);
                    if (getCountry != null)
                    {
                        ViewBag.GetCountry = getCountry.CountryName;
                    }

                    var getCity = _context.CitysTb.FirstOrDefault(c => c.CityId == studentde.CityId);
                    if (getCity != null)
                    {
                        ViewBag.GetCity = getCity.CityName;
                    }

                    ViewBag.ForViewOnly = "Update";
                    return View("/Views/StudentComplaint/AddStudentDetials.cshtml", studentde);
                   
                }
                catch (Exception ex)
                {
                    ViewBag.ErrorMessage = "An error occurred: " + ex.Message;
                }
            }
            else
            {
                ViewBag.ErrorMessage = "Invalid action or updated student data.";
            }

            return RedirectToAction("Index");
        }
        public async Task<IActionResult> UpdateData(StudentModel student)
        {
            try
            {               
                //var Client = _clientFactory.CreateClient();
                //var HttpRequestMessage = new HttpRequestMessage()
                //{
                //    Method = HttpMethod.Put,
                //    RequestUri = new Uri("https://localhost:7210/api/Student"),
                //    Content = new StringContent(JsonSerializer.Serialize(student), Encoding.UTF8, "application/json")
                //};
                //var response = await Client.SendAsync(HttpRequestMessage);
                //response.EnsureSuccessStatusCode();
                //var responseMessage = await response.Content.ReadAsStringAsync();
                //if (responseMessage != null)
                //{
                //    TempData["SuccessMessage"] = "User Updated successfully!";
                //    return RedirectToAction("Index");
                //}                             
                //_studentRepositary.Update(student);
                return View("/Views/StudentComplaint/AddStudentDetials.cshtml");
            }
            catch (Exception ex)
            {
                ViewBag.ErrorMessage = "An error occurred while updating data: " + ex.Message;
                return View("/Views/StudentComplaint/AddStudentDetials.cshtml");
            }
            
        }
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var Client = _clientFactory.CreateClient();
                var HttpResponseMessage = await Client.DeleteAsync($"https://localhost:7210/api/Student/{id}");
                HttpResponseMessage.EnsureSuccessStatusCode();
                int deletedUser = _studentRepositary.Delete(id);

                //if (deletedUser == null)
                //{
                //    return NotFound();
                //}
                TempData["SuccessMessage"] = "User deleted successfully!";
                return RedirectToAction("Index");
            }
            catch (Exception)
            {
                ViewBag.ErrorMessage = "An error occurred while processing your request.";
                
                return View("~/Views/StudentComplaint/Index");
            }
        }     
    }
}        
