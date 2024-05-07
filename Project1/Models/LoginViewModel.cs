using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Project1.Models
{
 
    public class LoginViewModel
    {
            [Required(ErrorMessage = "Username is Required")]
        
            public required string Email { get; set; }
            [Required(ErrorMessage = "Password is Required")]
            public required string Password { get; set; }
    }
}
