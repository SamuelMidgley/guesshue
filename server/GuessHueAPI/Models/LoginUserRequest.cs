using System.ComponentModel.DataAnnotations;

namespace GuessHueAPI.Models;

public class LoginUserRequest
{
    [EmailAddress] public required string Email { get; set; }

    public required string Password { get; set; }
}