using System.ComponentModel.DataAnnotations.Schema;

namespace GuessHueAPI.Models;

public class User
{
    [Column("id")] public int Id { get; set; }

    [Column("username")] public string Username { get; set; }

    [Column("email")] public string Email { get; set; }

    [Column("password_hash")] public byte[] PasswordHash { get; set; }

    [Column("password_salt")] public byte[] PasswordSalt { get; set; }
}