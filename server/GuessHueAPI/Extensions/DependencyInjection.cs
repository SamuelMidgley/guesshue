using GuessHueAPI.Helpers;
using GuessHueAPI.Repositories;
using GuessHueAPI.Services;

namespace GuessHueAPI.Extensions;

public static class DependencyInjection
{
    public static void AddInfrastructure(this WebApplicationBuilder builder)
    {
        builder.Services.Configure<DbSettings>(builder.Configuration.GetSection("ConnectionStrings"));

        builder.Services.AddSingleton<DataContext>();
        builder.Services.AddSingleton<TokenGenerator>();
        builder.Services.AddScoped<IUserHelper, UserHelper>();
        builder.Services.AddScoped<IUserRepository, UserRepository>();
        builder.Services.AddScoped<IUserService, UserService>();
        builder.Services.AddScoped<IAuthService, AuthService>();
        builder.Services.AddScoped<IPasswordSecurityService, PasswordSecurityService>();
        builder.Services.AddScoped<IGameRepository, GameRepository>();
        builder.Services.AddScoped<IGameService, GameService>();
        builder.Services.AddScoped<IGameStatsRepository, GameStatsRepository>();
        builder.Services.AddScoped<IGameStatsService, GameStatsService>();
    }
}