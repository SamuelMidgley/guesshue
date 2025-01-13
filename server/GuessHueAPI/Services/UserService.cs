using GuessHueAPI.Models;
using GuessHueAPI.Repositories;
using Serilog;

namespace GuessHueAPI.Services;

public interface IUserService
{
    Task<IEnumerable<User>> GetAll();

    Task<User?> GetById(int id);

    Task<User?> GetByEmail(string email);
}

public class UserService(IUserRepository userRepository) : IUserService
{
    public async Task<IEnumerable<User>> GetAll()
    {
        var users = await userRepository.GetAll();

        return users;
    }

    public async Task<User?> GetById(int id)
    {
        var user = await userRepository.GetById(id);

        if (user == null)
        {
            Log.Warning($"User with id {id} was not found");
            throw new KeyNotFoundException("User not found");
        }

        return user;
    }

    public async Task<User?> GetByEmail(string email)
    {
        var user = await userRepository.GetByEmail(email);

        if (user == null)
        {
            Log.Warning($"User with email {email} was not found");
            throw new KeyNotFoundException("User not found");
        }
        
        return user;
    }
}