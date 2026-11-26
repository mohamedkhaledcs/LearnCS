/*
===============================================================================
Project     : LearnCS
Database    : Microsoft SQL Server 2022
Description : Creates all authentication and authorization tables for the
              LearnCS platform.
===============================================================================
*/

USE LearnCS;
GO

SET NOCOUNT ON;
GO

-- =============================================================================
-- Table: Users
-- Description: Stores authentication and core account information.
-- =============================================================================

CREATE TABLE Users
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_Users
        PRIMARY KEY
        DEFAULT NEWID(),

    username NVARCHAR(50)
        NOT NULL,

    email NVARCHAR(255)
        NOT NULL,

    password_hash NVARCHAR(255)
        NOT NULL,

    account_status TINYINT
        NOT NULL
        CONSTRAINT DF_Users_AccountStatus
        DEFAULT (1),

    email_verified BIT
        NOT NULL
        CONSTRAINT DF_Users_EmailVerified
        DEFAULT (0),

    phone_verified BIT
        NOT NULL
        CONSTRAINT DF_Users_PhoneVerified
        DEFAULT (0),

    two_factor_enabled BIT
        NOT NULL
        CONSTRAINT DF_Users_TwoFactorEnabled
        DEFAULT (0),

    failed_login_attempts INT
        NOT NULL
        CONSTRAINT DF_Users_FailedLoginAttempts
        DEFAULT (0),

    lockout_until DATETIME2 NULL,

    last_login_at DATETIME2 NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_Users_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2 NULL,

    deleted_at DATETIME2 NULL,

    CONSTRAINT UQ_Users_Username
        UNIQUE (username),

    CONSTRAINT UQ_Users_Email
        UNIQUE (email),

    CONSTRAINT CK_Users_AccountStatus
        CHECK (account_status IN (0,1,2,3,4))
);
GO

-- =============================================================================
-- Indexes
-- =============================================================================

CREATE INDEX IX_Users_Email
ON Users(email);
GO

CREATE INDEX IX_Users_Username
ON Users(username);
GO

CREATE INDEX IX_Users_Status
ON Users(account_status);
GO

CREATE INDEX IX_Users_CreatedAt
ON Users(created_at);
GO

-- =============================================================================
-- Table: Roles
-- Description: Stores all application roles.
-- =============================================================================

CREATE TABLE Roles
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_Roles
        PRIMARY KEY
        DEFAULT NEWID(),

    name NVARCHAR(100)
        NOT NULL,

    description NVARCHAR(500)
        NULL,

    is_system_role BIT
        NOT NULL
        CONSTRAINT DF_Roles_IsSystemRole
        DEFAULT (0),

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_Roles_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2 NULL,

    CONSTRAINT UQ_Roles_Name
        UNIQUE(name)
);
GO

CREATE INDEX IX_Roles_Name
ON Roles(name);
GO

-- =============================================================================
-- Table: Permissions
-- Description: Stores all permissions used by the authorization system.
-- =============================================================================

CREATE TABLE Permissions
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_Permissions
        PRIMARY KEY
        DEFAULT NEWID(),

    name NVARCHAR(150)
        NOT NULL,

    code NVARCHAR(150)
        NOT NULL,

    description NVARCHAR(500)
        NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_Permissions_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT UQ_Permissions_Name
        UNIQUE(name),

    CONSTRAINT UQ_Permissions_Code
        UNIQUE(code)
);
GO

CREATE INDEX IX_Permissions_Code
ON Permissions(code);
GO

-- =============================================================================
-- Table: UserRoles
-- Description: Maps users to roles.
-- =============================================================================

CREATE TABLE UserRoles
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_UserRoles
        PRIMARY KEY
        DEFAULT NEWID(),

    user_id UNIQUEIDENTIFIER
        NOT NULL,

    role_id UNIQUEIDENTIFIER
        NOT NULL,

    assigned_at DATETIME2
        NOT NULL
        CONSTRAINT DF_UserRoles_AssignedAt
        DEFAULT SYSUTCDATETIME(),

    assigned_by UNIQUEIDENTIFIER
        NULL,

    CONSTRAINT FK_UserRoles_Users
        FOREIGN KEY (user_id)
        REFERENCES Users(id),

    CONSTRAINT FK_UserRoles_Roles
        FOREIGN KEY (role_id)
        REFERENCES Roles(id),

    CONSTRAINT FK_UserRoles_AssignedBy
        FOREIGN KEY (assigned_by)
        REFERENCES Users(id),

    CONSTRAINT UQ_UserRoles_UserRole
        UNIQUE(user_id, role_id)
);
GO

CREATE INDEX IX_UserRoles_UserId
ON UserRoles(user_id);
GO

CREATE INDEX IX_UserRoles_RoleId
ON UserRoles(role_id);
GO

-- =============================================================================
-- Table: RolePermissions
-- Description: Maps roles to permissions.
-- =============================================================================

CREATE TABLE RolePermissions
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_RolePermissions
        PRIMARY KEY
        DEFAULT NEWID(),

    role_id UNIQUEIDENTIFIER
        NOT NULL,

    permission_id UNIQUEIDENTIFIER
        NOT NULL,

    granted_at DATETIME2
        NOT NULL
        CONSTRAINT DF_RolePermissions_GrantedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_RolePermissions_Roles
        FOREIGN KEY(role_id)
        REFERENCES Roles(id),

    CONSTRAINT FK_RolePermissions_Permissions
        FOREIGN KEY(permission_id)
        REFERENCES Permissions(id),

    CONSTRAINT UQ_RolePermissions
        UNIQUE(role_id, permission_id)
);
GO

CREATE INDEX IX_RolePermissions_RoleId
ON RolePermissions(role_id);
GO

CREATE INDEX IX_RolePermissions_PermissionId
ON RolePermissions(permission_id);
GO

-- =============================================================================
-- Table: RefreshTokens
-- Description: Stores JWT Refresh Tokens.
-- =============================================================================

CREATE TABLE RefreshTokens
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_RefreshTokens
        PRIMARY KEY
        DEFAULT NEWID(),

    user_id UNIQUEIDENTIFIER
        NOT NULL,

    token_hash NVARCHAR(512)
        NOT NULL,

    expires_at DATETIME2
        NOT NULL,

    revoked_at DATETIME2
        NULL,

    replaced_by_token_id UNIQUEIDENTIFIER
        NULL,

    created_ip NVARCHAR(45)
        NULL,

    revoked_ip NVARCHAR(45)
        NULL,

    user_agent NVARCHAR(500)
        NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_RefreshTokens_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_RefreshTokens_Users
        FOREIGN KEY(user_id)
        REFERENCES Users(id),

    CONSTRAINT FK_RefreshTokens_ReplacedBy
        FOREIGN KEY(replaced_by_token_id)
        REFERENCES RefreshTokens(id)
);
GO

CREATE INDEX IX_RefreshTokens_UserId
ON RefreshTokens(user_id);
GO

CREATE INDEX IX_RefreshTokens_ExpiresAt
ON RefreshTokens(expires_at);
GO

-- =============================================================================
-- Table: EmailVerificationTokens
-- Description: Stores email verification tokens.
-- =============================================================================

CREATE TABLE EmailVerificationTokens
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_EmailVerificationTokens
        PRIMARY KEY
        DEFAULT NEWID(),

    user_id UNIQUEIDENTIFIER
        NOT NULL,

    token_hash NVARCHAR(512)
        NOT NULL,

    expires_at DATETIME2
        NOT NULL,

    verified_at DATETIME2
        NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_EmailVerificationTokens_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_EmailVerificationTokens_Users
        FOREIGN KEY(user_id)
        REFERENCES Users(id)
);
GO

CREATE INDEX IX_EmailVerificationTokens_UserId
ON EmailVerificationTokens(user_id);
GO

-- =============================================================================
-- Table: PasswordResetTokens
-- Description: Stores password reset tokens.
-- =============================================================================

CREATE TABLE PasswordResetTokens
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_PasswordResetTokens
        PRIMARY KEY
        DEFAULT NEWID(),

    user_id UNIQUEIDENTIFIER
        NOT NULL,

    token_hash NVARCHAR(512)
        NOT NULL,

    expires_at DATETIME2
        NOT NULL,

    used_at DATETIME2
        NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_PasswordResetTokens_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_PasswordResetTokens_Users
        FOREIGN KEY(user_id)
        REFERENCES Users(id)
);
GO

CREATE INDEX IX_PasswordResetTokens_UserId
ON PasswordResetTokens(user_id);
GO

CREATE INDEX IX_PasswordResetTokens_ExpiresAt
ON PasswordResetTokens(expires_at);
GO

-- =============================================================================
-- Table: UserSessions
-- Description: Stores active and historical user sessions.
-- =============================================================================

CREATE TABLE UserSessions
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_UserSessions
        PRIMARY KEY
        DEFAULT NEWID(),

    user_id UNIQUEIDENTIFIER
        NOT NULL,

    refresh_token_id UNIQUEIDENTIFIER
        NULL,

    session_token NVARCHAR(512)
        NOT NULL,

    ip_address NVARCHAR(45)
        NULL,

    user_agent NVARCHAR(500)
        NULL,

    device_name NVARCHAR(255)
        NULL,

    operating_system NVARCHAR(100)
        NULL,

    browser NVARCHAR(100)
        NULL,

    location NVARCHAR(255)
        NULL,

    started_at DATETIME2
        NOT NULL
        CONSTRAINT DF_UserSessions_StartedAt
        DEFAULT SYSUTCDATETIME(),

    last_activity_at DATETIME2
        NOT NULL
        CONSTRAINT DF_UserSessions_LastActivityAt
        DEFAULT SYSUTCDATETIME(),

    expires_at DATETIME2
        NOT NULL,

    ended_at DATETIME2
        NULL,

    is_active BIT
        NOT NULL
        CONSTRAINT DF_UserSessions_IsActive
        DEFAULT (1),

    CONSTRAINT FK_UserSessions_Users
        FOREIGN KEY(user_id)
        REFERENCES Users(id),

    CONSTRAINT FK_UserSessions_RefreshTokens
        FOREIGN KEY(refresh_token_id)
        REFERENCES RefreshTokens(id)
);
GO

CREATE INDEX IX_UserSessions_UserId
ON UserSessions(user_id);
GO

CREATE INDEX IX_UserSessions_IsActive
ON UserSessions(is_active);
GO

CREATE INDEX IX_UserSessions_ExpiresAt
ON UserSessions(expires_at);
GO

-- =============================================================================
-- Table: LoginHistory
-- Description: Stores login attempts and authentication events.
-- =============================================================================

CREATE TABLE LoginHistory
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_LoginHistory
        PRIMARY KEY
        DEFAULT NEWID(),

    user_id UNIQUEIDENTIFIER
        NULL,

    email NVARCHAR(255)
        NULL,

    ip_address NVARCHAR(45)
        NULL,

    user_agent NVARCHAR(500)
        NULL,

    login_method NVARCHAR(50)
        NOT NULL,

    status TINYINT
        NOT NULL,

    failure_reason NVARCHAR(255)
        NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_LoginHistory_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_LoginHistory_Users
        FOREIGN KEY(user_id)
        REFERENCES Users(id),

    CONSTRAINT CK_LoginHistory_Status
        CHECK(status IN (0,1))
);
GO

CREATE INDEX IX_LoginHistory_UserId
ON LoginHistory(user_id);
GO

CREATE INDEX IX_LoginHistory_CreatedAt
ON LoginHistory(created_at);
GO

CREATE INDEX IX_LoginHistory_Status
ON LoginHistory(status);
GO

-- =============================================================================
-- Table: TrustedDevices
-- Description: Stores remembered devices for MFA and trusted logins.
-- =============================================================================

CREATE TABLE TrustedDevices
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_TrustedDevices
        PRIMARY KEY
        DEFAULT NEWID(),

    user_id UNIQUEIDENTIFIER
        NOT NULL,

    device_identifier NVARCHAR(255)
        NOT NULL,

    device_name NVARCHAR(255)
        NULL,

    operating_system NVARCHAR(100)
        NULL,

    browser NVARCHAR(100)
        NULL,

    ip_address NVARCHAR(45)
        NULL,

    last_used_at DATETIME2
        NULL,

    expires_at DATETIME2
        NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_TrustedDevices_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_TrustedDevices_Users
        FOREIGN KEY(user_id)
        REFERENCES Users(id),

    CONSTRAINT UQ_TrustedDevices
        UNIQUE(user_id, device_identifier)
);
GO

CREATE INDEX IX_TrustedDevices_UserId
ON TrustedDevices(user_id);
GO

-- =============================================================================
-- Table: ExternalLogins
-- Description: Stores OAuth/OpenID Connect external login providers.
-- =============================================================================

CREATE TABLE ExternalLogins
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_ExternalLogins
        PRIMARY KEY
        DEFAULT NEWID(),

    user_id UNIQUEIDENTIFIER
        NOT NULL,

    provider NVARCHAR(50)
        NOT NULL,

    provider_user_id NVARCHAR(255)
        NOT NULL,

    provider_email NVARCHAR(255)
        NULL,

    access_token NVARCHAR(MAX)
        NULL,

    refresh_token NVARCHAR(MAX)
        NULL,

    token_expires_at DATETIME2
        NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_ExternalLogins_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2
        NULL,

    CONSTRAINT FK_ExternalLogins_Users
        FOREIGN KEY(user_id)
        REFERENCES Users(id),

    CONSTRAINT UQ_ExternalLogins
        UNIQUE(provider, provider_user_id)
);
GO

CREATE INDEX IX_ExternalLogins_UserId
ON ExternalLogins(user_id);
GO

CREATE INDEX IX_ExternalLogins_Provider
ON ExternalLogins(provider);
GO

