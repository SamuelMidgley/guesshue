using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using GuessHueAPI.Helpers;
using GuessHueAPI.Models;
using GuessHueAPI.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace GuessHueAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController(IUserService userService, IUserHelper userHelper) : ControllerBase
{
    // [HttpGet]
    // public async Task<ActionResult<List<User>>> Get()
    // {
    //     var users = await userService.GetAll();
    //
    //     return Ok(users);
    // }
    //
    // [HttpGet("{id:int}")]
    // public async Task<ActionResult<User>> Get(int id)
    // {
    //     var user = await userService.GetById(id);
    //
    //     return Ok(user);
    // }

    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<User>> GetMe()
    {
        Log.Information("Getting me");
        var userId = userHelper.GetUserIdFromJwt(User);

        if (!userId.HasValue)
        {
            return BadRequest();
        }
        
        var user = await userService.GetById(userId.Value);
        
        return Ok(user);
    }
}