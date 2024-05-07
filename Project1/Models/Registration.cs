using System.ComponentModel.DataAnnotations;

namespace Project1.Models
{
    public class Registration
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [RegularExpression(@"^[a-zA-Z\s]*$", ErrorMessage = "Name must contain only letters.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", ErrorMessage = "Invalid email format")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        [MinLength(6, ErrorMessage = "Must contain at least six characters.")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Confirm Password is required")]
        // [Compare("Password", ErrorMessage = "Passwords do not match")]
       

        public bool IsDeleted { get; set; }
    }
}
