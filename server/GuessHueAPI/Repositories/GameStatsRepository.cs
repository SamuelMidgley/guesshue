using Dapper;
using GuessHueAPI.Helpers;

namespace GuessHueAPI.Repositories;

public interface IGameStatsRepository
{
    Task<int> GetGamesPlayed();
}

public class GameStatsRepository(DataContext context) : IGameStatsRepository
{
    
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