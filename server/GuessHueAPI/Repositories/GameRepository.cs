using Dapper;
using GuessHueAPI.Helpers;
using GuessHueAPI.Models;

namespace GuessHueAPI.Repositories;

public interface IGameRepository
{
    Task<int> SaveGame(Game game);
    
    Task<bool> CanUserGuess(int gameId, int userId);
    
    Task<bool> AddGuess(int gameId, int userId,  string colorGuess);

    Task<int> GetGamesPlayed();
}

public class GameRepository(DataContext context) : IGameRepository
{
    public async Task<int> SaveGame(Game game)
    {
        using var connection = context.CreateConnection();

        const string sql = """
                             INSERT INTO guesshue.public.game (correct_color, option_one, option_two, option_three, user_id)
                             VALUES (@CorrectColor, @OptionOne, @OptionTwo, @OptionThree, @UserId)
                             RETURNING id
                           """;

        var result = await connection.ExecuteScalarAsync<int>(sql, new
        {
            game.CorrectColor,
            game.OptionOne,
            game.OptionTwo,
            game.OptionThree,
            game.UserId
        });

        return result;
    }
    
    public async Task<bool> CanUserGuess(int gameId, int userId)
    {
        using var connection = context.CreateConnection();

        const string sql = """
                             SELECT Count(1)
                             FROM guesshue.public.game
                             WHERE id = @gameId
                             AND user_id = @userId
                           """;

        var result = await connection.ExecuteScalarAsync<int>(sql, new
        {
            userId,
            gameId
        });

        return result == 1;
    }
    
    public async Task<bool> AddGuess(int gameId, int userId, string colorGuess)
    {
        using var connection = context.CreateConnection();

        const string sql = """
                             INSERT INTO guesshue.public.guess (user_id, game_id, color_guess)
                             VALUES (@userId, @gameId, @colorGuess)
                             RETURNING id
                           """;

        var result = await connection.ExecuteAsync(sql, new
        {
            userId,
            gameId,
            colorGuess
        });

        return result == 1;
    }

    public async Task<int> GetGamesPlayed()
    {
        using var connection = context.CreateConnection();

        const string sql = """
                           SELECT count(*) 
                           FROM guesshue.public.game
                           """;
        
        return await connection.ExecuteScalarAsync<int>(sql);
    }
}