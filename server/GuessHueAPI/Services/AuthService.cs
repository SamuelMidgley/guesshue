using GuessHueAPI.Helpers;
using GuessHueAPI.Models;
using GuessHueAPI.Repositories;
using Serilog;

namespace GuessHueAPI.Services;

public interface IAuthService
{
    Task<string> Login(LoginUserRequest loginRequest);

    Task<string> Register(CreateUserRequest createUserRequest);
}

public class AuthService(
    IUserRepository userRepository,
    IPasswordSecurityService passwordSecurityService,
    ITokenGenerator tokenGenerator,
    ILogger<AuthService> logger)
    : IAuthService
{
    public async Task<string> Register(CreateUserRequest createUserRequest)
    {
        // Todo: Use fluent validation
        if (!await userRepository.IsUsernameOrEmailUnique(createUserRequest.Email, createUserRequest.Username))
        {
            logger.LogWarning($"User with the email {createUserRequest.Email} already exists");
            throw new ApplicationException($"User with the email {createUserRequest.Email} already exists");
        }

        var (hash, salt) = passwordSecurityService.HashPassword(createUserRequest.Password);

        var newUser = new CreateUser
        {
            Email = createUserRequest.Email,
            Username = createUserRequest.Username,
            PasswordHash = hash,
            PasswordSalt = salt
        };

        var newUserId = await userRepository.Create(newUser);

        return tokenGenerator.GenerateJwtToken(newUserId);
    }

    public async Task<string> Login(LoginUserRequest loginRequest)
    {
        var user = await userRepository.GetByEmail(loginRequest.Email);

        if (user == null)
        {
            logger.LogWarning($"User with the email {loginRequest.Email} does not exist");
            throw new ApplicationException($"User with the email {loginRequest.Email} does not exist");
        }

        var isPasswordValid =
            passwordSecurityService.ValidatePassword(loginRequest.Password, user.PasswordHash, user.PasswordSalt);

        if (!isPasswordValid)
        {
            logger.LogWarning($"Invalid login attempt for user {loginRequest.Email}, password is invalid");
            throw new ApplicationException("Invalid email or password combination");
        }

        return tokenGenerator.GenerateJwtToken(user.Id);
    }
}