namespace CarLot.Core;

public class Error
{
    public string Property { get; }
    public string Message { get; }

    public Error(string property, string message)
    {
        Property = property;
        Message = message;
    }
}
