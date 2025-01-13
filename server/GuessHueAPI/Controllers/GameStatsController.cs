using GuessHueAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace GuessHueAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class GameStatsController(IGameStatsService gameStatsService) : ControllerBase
{
    [HttpGet("games-played")]
    public async Task<IActionResult> GetGamesPlayed()
    {
        var gamesPlayed = await gameStatsService.GetGamesPlayed();
        
        return Ok(gamesPlayed);
    }
}