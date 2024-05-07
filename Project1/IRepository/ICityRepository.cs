using Project1.Models;

namespace Project1.IRepository
{
    public interface ICityRepository
    {
        IEnumerable<CityModel> GetCitiesByCountryId(int countryId);
    }
}
