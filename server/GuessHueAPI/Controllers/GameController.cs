using GuessHueAPI.Helpers;
using GuessHueAPI.Models;
using GuessHueAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GuessHueAPI.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class GameController(IGameService gameService, IUserHelper userHelper) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<Game>> CreateGame()
    {
        var userId = userHelper.GetUserIdFromJwt(User);

        if (!userId.HasValue)
        {
            return Unauthorized();
        }
        
        var game = await gameService.CreateGame(userId.Value);
        
        return Ok(game);
    }
    
    [HttpPost("{gameId:int}/guess")]
    public async Task<IActionResult> AddGuess(int gameId, AddGuessRequest request)
    {
        var userId = userHelper.GetUserIdFromJwt(User);

        if (!userId.HasValue)
        {
            return Unauthorized();
        }

        var result = await gameService.AddGuess(gameId, userId.Value, request.ColorGuess);
        
        return result ? Ok() : BadRequest();
    }
}