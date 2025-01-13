using GuessHueAPI.Repositories;

namespace GuessHueAPI.Services;

public interface IGameStatsService
{
    Task<int> GetGamesPlayed();
}

public class GameStatsService(IGameStatsRepository gameStatsRepository) : IGameStatsService
{
    public Task<int> GetGamesPlayed()
    {
        return gameStatsRepository.GetGamesPlayed();
    }
}