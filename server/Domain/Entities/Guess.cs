namespace Domain.Entities;

public class Guess
{
    public int Id { get; set; }
    
    public int UserId { get; set; }
    
    public int GameId { get; set; }
    
    public required string ColorGuess { get; set; }
    
    public bool IsCorrect { get; set; }
}