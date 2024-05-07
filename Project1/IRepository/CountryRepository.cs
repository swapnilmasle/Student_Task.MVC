using Project1.Data;
using Project1.Models;

namespace Project1.IRepository
{
    public class CountryRepository : ICountryRepository
    {
        private readonly ApplicationDbContext _context;

        public CountryRepository(ApplicationDbContext context)
        {
            _context = context;  
        }

        public IEnumerable<CountryModel> GetAllCountries() 
        {
           return  _context.CountrysTb.ToList();
        }
    }
}
