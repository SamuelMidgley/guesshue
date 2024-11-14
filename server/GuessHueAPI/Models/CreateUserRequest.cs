using System.ComponentModel.DataAnnotations;

namespace GuessHueAPI.Models;

public class CreateUserRequest
{
    [Required] [EmailAddress] public string Email { get; set; }

    [Required] public string Username { get; set; }

    [Required] [MinLength(6)] public string Password { get; set; }

    [Required]
    [Compare("Password", ErrorMessage = "Passwords do not match")]
    public string ConfirmPassword { get; set; }
}