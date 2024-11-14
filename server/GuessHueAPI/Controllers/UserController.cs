using System.IdentityModel.Tokens.Jwt;
using GuessHueAPI.Models;
using GuessHueAPI.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace GuessHueAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController(IUserService userService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<User>>> Get()
    {
        var users = await userService.GetAll();

        return Ok(users);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<User>> Get(int id)
    {
        var user = await userService.GetById(id);

        return Ok(user);
    }

    [HttpGet("me")]
    public async Task<ActionResult<User>> GetMe()
    {
        var jwt = await Request.HttpContext.GetTokenAsync("access_token");

        if (jwt == null)
        {
            return Unauthorized();
        }
        
        var handler = new JwtSecurityTokenHandler();
        var token = handler.ReadJwtToken(jwt);

        int.TryParse(token.Subject, out var userId);
        
        var user = await userService.GetById(userId);
        
        return Ok(user);
    }
}