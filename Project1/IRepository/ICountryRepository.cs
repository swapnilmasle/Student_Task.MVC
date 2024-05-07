using Project1.Models;

namespace Project1.IRepository
{
    public interface ICountryRepository
    {
        IEnumerable<CountryModel> GetAllCountries();
    }
}
