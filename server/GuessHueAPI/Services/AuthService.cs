using GuessHueAPI.Helpers;
using GuessHueAPI.Models;
using GuessHueAPI.Repositories;

namespace GuessHueAPI.Services;

public interface IAuthService
{
    Task<string> Login(LoginUserRequest loginRequest);

    Task<string> Register(CreateUserRequest createUserRequest);
}

public class AuthService(
    IUserRepository userRepository,
    IPasswordSecurityService passwordSecurityService)
    : IAuthService
{
    public async Task<string> Register(CreateUserRequest createUserRequest)
    {
        // Todo: Use fluent validation
        if (!await userRepository.IsUsernameOrEmailUnique(createUserRequest.Email, createUserRequest.Username))
            throw new ApplicationException($"User with the email {createUserRequest.Email} already exists");

        var (hash, salt) = passwordSecurityService.HashPassword(createUserRequest.Password);

        var newUser = new CreateUser
        {
            Email = createUserRequest.Email,
            Username = createUserRequest.Username,
            PasswordHash = hash,
            PasswordSalt = salt
        };

        var newUserId = await userRepository.Create(newUser);

        return TokenGenerator.GenerateToken(newUserId);
    }

    public async Task<string> Login(LoginUserRequest loginRequest)
    {
        var user = await userRepository.GetByEmail(loginRequest.Email);

        if (user == null) throw new ApplicationException($"User with the email {loginRequest.Email} does not exist");

        var isPasswordValid =
            passwordSecurityService.ValidatePassword(loginRequest.Password, user.PasswordHash, user.PasswordSalt);

        if (!isPasswordValid) throw new ApplicationException("Invalid email or password combination");

        return TokenGenerator.GenerateToken(user.Id);
    }
}