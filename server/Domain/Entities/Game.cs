namespace Domain.Entities;

public class Game
{
    public int Id { get; set; }
    
    public int UserId { get; set; }
    
    public required string CorrectColor { get; set; }
    
    public required string OptionOne { get; set; }
    
    public required string OptionTwo { get; set; }
    
    public required string OptionThree { get; set; }
}