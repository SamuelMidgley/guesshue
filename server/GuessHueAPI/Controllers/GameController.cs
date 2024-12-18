using GuessHueAPI.Helpers;
using GuessHueAPI.Models;
using GuessHueAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GuessHueAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class GameController(IGameService gameService) : ControllerBase
{
    [Authorize]
    [HttpGet]
    public async Task<ActionResult<Game>> CreateGame()
    {
        var userId = await UserHelper.GetUserIdFromToken(Request.HttpContext);

        if (!userId.HasValue)
        {
            return Unauthorized();
        }
        
        var game = await gameService.CreateGame(userId.Value);
        
        return Ok(game);
    }
    
    [Authorize]
    [HttpPost("{gameId:int}/guess")]

    public async Task<IActionResult> AddGuess(int gameId, AddGuessRequest request)
    {
        var userId = await UserHelper.GetUserIdFromToken(Request.HttpContext);

        if (!userId.HasValue)
        {
            return Unauthorized();
        }

        var result = await gameService.AddGuess(gameId, userId.Value, request.ColorGuess);
        
        return result ? Ok() : BadRequest();
    }

    [HttpGet("games-played")]
    public async Task<IActionResult> GetGamesPlayed()
    {
        var gamesPlayed = await gameService.GetGamesPlayed();
        
        return Ok(gamesPlayed);
    }
}