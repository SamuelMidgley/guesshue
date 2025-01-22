using System.Security.Claims;

namespace GuessHueAPI.Helpers;

public interface IUserHelper
{
    int? GetUserIdFromJwt(ClaimsPrincipal user);
}

public class UserHelper(ILogger<UserHelper> logger): IUserHelper
{
    public int? GetUserIdFromJwt(ClaimsPrincipal user)
    {
        logger.LogInformation("Attempting to get user id from jwt");
        
        var userIdString = user.FindFirstValue(ClaimTypes.NameIdentifier);
        
        var result =  int.TryParse(userIdString, out var userId);

        if (result)
        {
            logger.LogInformation("User with id {userId} was retrieved from jwt", userId);
            return userId;
        }
        
        logger.LogInformation("Unable to obtain user id from jwt");
        return null;
    }
}