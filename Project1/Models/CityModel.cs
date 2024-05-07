using System.ComponentModel.DataAnnotations;

namespace Project1.Models
{
    public class CityModel
    {
        [Key]
        public int CityId { get; set; }
        public string CityName { get; set; }
        public int CountryId { get; set; }
        public virtual CountryModel Country { get; set; }

        

    }
}
