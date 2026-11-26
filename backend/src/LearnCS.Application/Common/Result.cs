namespace LearnCS.Application.Common;

/// <summary>
/// Lightweight application-level result pattern wrapper.
/// Avoids exposing internal exceptions or database details to callers.
/// </summary>
public class Result<T>
{
    public bool IsSuccess { get; }
    public T? Value { get; }
    public string? ErrorMessage { get; }
    public string? ErrorCode { get; }

    private Result(bool isSuccess, T? value, string? errorMessage, string? errorCode)
    {
        IsSuccess = isSuccess;
        Value = value;
        ErrorMessage = errorMessage;
        ErrorCode = errorCode;
    }

    public static Result<T> Success(T value) => new(true, value, null, null);
    public static Result<T> Failure(string errorMessage, string? errorCode = null) => new(false, default, errorMessage, errorCode);
}
