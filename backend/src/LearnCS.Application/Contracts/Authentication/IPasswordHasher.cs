namespace LearnCS.Application.Contracts.Authentication;

/// <summary>
/// Abstraction for secure password hashing and verification.
/// Prevents Application layer from depending directly on BCrypt or specific crypto libraries.
/// </summary>
public interface IPasswordHasher
{
    /// <summary>
    /// Hashes a plain-text password using a secure algorithm (e.g., BCrypt).
    /// </summary>
    string HashPassword(string password);

    /// <summary>
    /// Verifies a plain-text password against a hashed password.
    /// </summary>
    bool VerifyPassword(string password, string passwordHash);
}
