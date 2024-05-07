using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project1.Models
{
    public class CountryModel
    {

        [Key]
        public int CountryId { get; set; } 

        public string CountryName { get; set; }

        //[InverseProperty("Country")]
        
         // Navigation property
        
        public ICollection<CityModel> Cities { get; set; }


    }
}
