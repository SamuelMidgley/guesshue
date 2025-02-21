using GuessHueAPI.Models;
using GuessHueAPI.Repositories;
using Serilog;

namespace GuessHueAPI.Services;

public interface IGameService
{
    Task<Game> CreateGame(int userId);
    
    Task<bool> AddGuess(int gameId, int userId,  string colorGuess);
}

public class GameService(IGameRepository gameRepository) : IGameService
{
    public async Task<Game> CreateGame(int userId)
    {
        var options = CreateHexColors();
        
        var random = new Random();
        
        var game = new Game
        {
            CorrectColor = options[random.Next(0, 3)],
            OptionOne = options[0],
            OptionTwo = options[1],
            OptionThree = options[2],
            UserId = userId
        };
        
        var newGameId = await gameRepository.SaveGame(game);
        
        game.Id = newGameId;
        
        return game;
    }
    
    public async Task<bool> AddGuess(int gameId, int userId, string colorGuess)
    {
        var userCanGuess = await gameRepository.CanUserGuess(gameId, userId);

        if (!userCanGuess)
        {
            Log.Warning($"User {userId} is not a valid guess");
            return false;
        }
        
        var success = await gameRepository.AddGuess(gameId, userId, colorGuess);
        
        return success;
    }

    private static string CreateHexColor()
    {
        var random = new Random();
        var color = $"#{random.Next(0x1000000):X6}";
        
        return color;
    }

    private static List<string> CreateHexColors()
    {
        return
        [
            CreateHexColor(),
            CreateHexColor(),
            CreateHexColor()
        ];
    }
}