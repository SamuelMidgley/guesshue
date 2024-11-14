using GuessHueAPI.Models;
using GuessHueAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace GuessHueAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController(IAuthService authService) : ControllerBase
{
    [HttpPost("login")]
    public async Task<ActionResult<string>> Login([FromBody] LoginUserRequest request)
    {
        var token = await authService.Login(request);

        return Ok(new
        {
            Token = token
        });
    }

    [HttpPost("register")]
    public async Task<ActionResult<string>> Register([FromBody] CreateUserRequest request)
    {
        var token = await authService.Register(request);

        return Ok(new
        {
            Token = token
        });
    }
}