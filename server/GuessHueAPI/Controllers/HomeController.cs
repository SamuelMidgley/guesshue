using Microsoft.AspNetCore.Mvc;

namespace GuessHueAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class HomeController : ControllerBase
{
    [HttpGet]
    public string Get()
    {
        return "Hello from the VPS!!!!";
    }
}