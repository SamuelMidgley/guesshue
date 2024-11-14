using System.Data;
using Microsoft.Extensions.Options;
using Npgsql;

namespace GuessHueAPI.Helpers;

public class DataContext(IOptions<DbSettings> dbSettings)
{
    private readonly DbSettings _dbSettings = dbSettings.Value;

    public IDbConnection CreateConnection()
    {
        var connectionString = _dbSettings.DefaultConnection;

        return new NpgsqlConnection(connectionString);
    }
}