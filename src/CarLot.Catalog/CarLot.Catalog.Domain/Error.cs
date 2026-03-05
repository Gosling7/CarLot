namespace CarLot.Catalog.Domain;

// TODO: do oddzielnego projektu class library
public class Error
{
    public string PropertyName { get; }
    public string ErrorMessage { get; }

    public Error(string propertyName, string errorMessage)
    {
        PropertyName = propertyName;
        ErrorMessage = errorMessage;
    }
}
