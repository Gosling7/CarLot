namespace CarLot.Catalog.Domain;

// TODO: do oddzielnego projektu class library
public class Result
{
    public bool IsSuccess { get; }
    public IReadOnlyList<Error> Errors { get; }

    protected Result(bool isSuccess, IReadOnlyList<Error> errors)
    {
        IsSuccess = isSuccess;
        Errors = errors;
    }

    public static Result Success() => new(true, []);
    public static Result Failure(IEnumerable<Error> errors) => new(false, errors.ToList());
}

public class Result<T> : Result
{
    public T? Value { get; }

    private Result(T value) 
        : base(true, [])
    {
        Value = value;
    }

    private Result(List<Error> errors) 
        : base(false, errors)
    {
    }

    public static Result<T> Success(T value) => new(value);
}