using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authentication;

namespace GuessHueAPI.Helpers;

public interface IUserHelper
{
    Task<int?> GetUserIdFromHttpContext(HttpContext httpContext);
}

public class UserHelper: IUserHelper
{
    public async Task<int?> GetUserIdFromHttpContext(HttpContext httpContext)
    {
        var jwt = await httpContext.GetTokenAsync("access_token");

        if (jwt == null)
        {
            
            return null;
        }
        
        var handler = new JwtSecurityTokenHandler();
        var token = handler.ReadJwtToken(jwt);
        
        var result =  int.TryParse(token.Subject, out var userId);

        if (result)
        {
            return userId;
        }
        
        // Log something like can't find the Id
        return null;
    }
}