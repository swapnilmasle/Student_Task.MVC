using Microsoft.AspNetCore.Mvc;
using Project1.Data;
using Project1.Models;
using System.Diagnostics.Metrics;

namespace Project1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CountryController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CountryController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<CountryModel> GetCountries()
        {
            return _context.CountrysTb.ToList();
        }
    }
}
