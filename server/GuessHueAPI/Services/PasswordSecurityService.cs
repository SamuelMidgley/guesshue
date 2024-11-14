using System.Security.Cryptography;

namespace GuessHueAPI.Services;

public interface IPasswordSecurityService
{
    (byte[] Hash, byte[] Salt) HashPassword(string password);

    bool ValidatePassword(string password, byte[] passwordHash, byte[] passwordSalt);
}

public class PasswordSecurityService : IPasswordSecurityService
{
    private const int SaltSize = 32;
    private const int HashSize = 32;
    private const int Iterations = 100000;

    public (byte[] Hash, byte[] Salt) HashPassword(string password)
    {
        var salt = new byte[SaltSize];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(salt);
        }

        var hash = GenerateHash(password, salt);

        return (hash, salt);
    }

    public bool ValidatePassword(string password, byte[] passwordHash, byte[] passwordSalt)
    {
        var computedHash = GenerateHash(password, passwordSalt);

        return computedHash.SequenceEqual(passwordHash);
    }

    private static byte[] GenerateHash(string password, byte[] salt)
    {
        using var pbkdf2 = new Rfc2898DeriveBytes(
            password,
            salt,
            Iterations,
            HashAlgorithmName.SHA256);

        return pbkdf2.GetBytes(HashSize);
    }
}