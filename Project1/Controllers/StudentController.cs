using Microsoft.AspNetCore.Mvc;
using Project1.IRepository;
using Project1.Models;

namespace Project1.Controllers
{
    public class StudentController : Controller
    {
        private readonly IStudentRepositary _studentRepository;
        private readonly ICountryRepository _countryRepository;
        private readonly ICityRepository _cityRepository;

        public StudentController(IStudentRepositary studentRepository,ICountryRepository countryRepository, ICityRepository cityRepository)
        {
            _studentRepository = studentRepository;
            _countryRepository = countryRepository;
            _cityRepository = cityRepository;
        }
        public IActionResult AddStudent()
        {
            //ViewBag.Countries = _countryRepository.GetAllCountries();
            
            return View();  
        }

        [HttpPost]
        public IActionResult AddStudent(StudentModel student)
        {

            if (ModelState.IsValid)
            {
                _studentRepository.AddStudent(student);
                return RedirectToAction("Index", "StudentComplaint"); // Redirect to home page after adding student
            }
            ViewBag.Countries = _countryRepository.GetAllCountries();
            return View(student); // Return the view with validation errors
        }

        [HttpGet]
        public IActionResult GetCountries()
        {
           
            IEnumerable<CountryModel> countries = _countryRepository.GetAllCountries();
            return Json(countries); // Return countries as JSON
        }
        [HttpGet]
        public IActionResult GetCities(int countryId)
        {
            
            IEnumerable<CityModel> cities = _cityRepository.GetCitiesByCountryId(countryId);
            return Json(cities); 
        }
    }
}
