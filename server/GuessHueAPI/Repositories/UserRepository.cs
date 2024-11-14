using Dapper;
using GuessHueAPI.Helpers;
using GuessHueAPI.Models;

namespace GuessHueAPI.Repositories;

public interface IUserRepository
{
    Task<IEnumerable<User>> GetAll();

    Task<User?> GetByEmail(string email);

    Task<User?> GetById(int id);

    Task<int> Create(CreateUser user);

    Task<bool> IsUsernameOrEmailUnique(string email, string username);
}

public class UserRepository(DataContext context) : IUserRepository
{
    public async Task<IEnumerable<User>> GetAll()
    {
        using var connection = context.CreateConnection();

        const string sql = """
                           SELECT id, email, username, password_hash as PasswordHash, password_salt as PasswordSalt
                           FROM guesshue.public.users
                           """;

        return await connection.QueryAsync<User>(sql);
    }

    public async Task<User?> GetByEmail(string email)
    {
        using var connection = context.CreateConnection();

        const string sql = """
                           SELECT id, email, username, password_hash as PasswordHash, password_salt as PasswordSalt
                           FROM guesshue.public.users
                           WHERE email = @email
                           """;

        return await connection.QuerySingleOrDefaultAsync<User>(sql, new { email });
    }

    public async Task<User?> GetById(int id)
    {
        using var connection = context.CreateConnection();

        const string sql = """
                           SELECT id, email, username
                           FROM guesshue.public.users
                           WHERE id = @id
                           """;

        return await connection.QuerySingleOrDefaultAsync<User>(sql, id);
    }

    public async Task<int> Create(CreateUser user)
    {
        using var connection = context.CreateConnection();

        const string sql = """
                           INSERT INTO guesshue.public.users (username, email, password_hash, password_salt) 
                           VALUES (@username, @email, @passwordHash, @passwordSalt)
                           RETURNING id
                           """;

        return await connection.ExecuteScalarAsync<int>(sql, new
        {
            username = user.Username,
            email = user.Email,
            passwordHash = user.PasswordHash,
            passwordSalt = user.PasswordSalt
        });
    }

    public async Task<bool> IsUsernameOrEmailUnique(string email, string username)
    {
        using var connection = context.CreateConnection();

        const string sql = """
                           SELECT count(*)
                           FROM guesshue.public.users
                           WHERE email = @email
                           OR username = @username
                           """;

        var count = await connection.ExecuteScalarAsync<int>(sql, new
        {
            email,
            username
        });

        return count == 0;
    }
}