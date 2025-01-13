using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace GuessHueAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class HomeController() : ControllerBase
{
    [HttpGet]
    public string Get()
    {
        Log.Information("this is an updated log");
        return "Hello from the VPS!!!!";
    }
}