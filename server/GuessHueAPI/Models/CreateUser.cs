namespace GuessHueAPI.Models;

public class CreateUser
{
    public required string Username { get; set; }

    public required string Email { get; set; }

    public required byte[] PasswordHash { get; set; }

    public required byte[] PasswordSalt { get; set; }
}