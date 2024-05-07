using Project1.Data;
using Project1.Models;

namespace Project1.IRepository
{
    public class CityRepository :ICityRepository
    {
        private readonly ApplicationDbContext _context;

        public CityRepository(ApplicationDbContext context)
        {
                _context=context;
        }
        public IEnumerable<CityModel> GetCitiesByCountryId(int countryId)
        {
           return _context.CitysTb.Where(cid => cid.CountryId == countryId).ToList();
        }
    }
}
