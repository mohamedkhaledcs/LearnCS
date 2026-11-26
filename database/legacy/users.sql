/*
===============================================================================
Project     : LearnCS
Database    : Microsoft SQL Server 2022
Description : Creates user profile and user-related tables.
===============================================================================
*/

USE LearnCS;
GO

SET NOCOUNT ON;
GO

-- =============================================================================
-- Table: UserProfiles
-- Description: Stores personal information for each user.
-- =============================================================================

CREATE TABLE UserProfiles
(
    user_id UNIQUEIDENTIFIER
        CONSTRAINT PK_UserProfiles
        PRIMARY KEY,

    first_name NVARCHAR(100)
        NOT NULL,

    last_name NVARCHAR(100)
        NOT NULL,

    display_name NVARCHAR(150)
        NULL,

    bio NVARCHAR(1000)
        NULL,

    profile_picture_url NVARCHAR(500)
        NULL,

    cover_picture_url NVARCHAR(500)
        NULL,

    phone_number NVARCHAR(20)
        NULL,

    gender TINYINT
        NULL,

    date_of_birth DATE
        NULL,

    country NVARCHAR(100)
        NULL,

    city NVARCHAR(100)
        NULL,

    timezone NVARCHAR(100)
        NULL,

    website NVARCHAR(255)
        NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_UserProfiles_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2
        NULL,

    CONSTRAINT FK_UserProfiles_Users
        FOREIGN KEY(user_id)
        REFERENCES Users(id)
        ON DELETE CASCADE,

    CONSTRAINT CK_UserProfiles_Gender
        CHECK (gender IN (0,1,2))
);
GO

CREATE INDEX IX_UserProfiles_Country
ON UserProfiles(country);
GO

CREATE INDEX IX_UserProfiles_City
ON UserProfiles(city);
GO

-- =============================================================================
-- Table: UserSettings
-- Description: Stores user preferences.
-- =============================================================================

CREATE TABLE UserSettings
(
    user_id UNIQUEIDENTIFIER
        CONSTRAINT PK_UserSettings
        PRIMARY KEY,

    language_code NVARCHAR(10)
        NOT NULL
        CONSTRAINT DF_UserSettings_Language
        DEFAULT ('en'),

    theme NVARCHAR(20)
        NOT NULL
        CONSTRAINT DF_UserSettings_Theme
        DEFAULT ('system'),

    email_notifications BIT
        NOT NULL
        CONSTRAINT DF_UserSettings_EmailNotifications
        DEFAULT (1),

    push_notifications BIT
        NOT NULL
        CONSTRAINT DF_UserSettings_PushNotifications
        DEFAULT (1),

    marketing_emails BIT
        NOT NULL
        CONSTRAINT DF_UserSettings_MarketingEmails
        DEFAULT (0),

    profile_visibility TINYINT
        NOT NULL
        CONSTRAINT DF_UserSettings_ProfileVisibility
        DEFAULT (0),

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_UserSettings_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2
        NULL,

    CONSTRAINT FK_UserSettings_Users
        FOREIGN KEY(user_id)
        REFERENCES Users(id)
        ON DELETE CASCADE
);
GO

-- =============================================================================
-- Table: UserLanguages
-- Description: Stores spoken/programming languages.
-- =============================================================================

CREATE TABLE UserLanguages
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_UserLanguages
        PRIMARY KEY
        DEFAULT NEWID(),

    user_id UNIQUEIDENTIFIER
        NOT NULL,

    language_name NVARCHAR(100)
        NOT NULL,

    proficiency_level TINYINT
        NOT NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_UserLanguages_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_UserLanguages_Users
        FOREIGN KEY(user_id)
        REFERENCES Users(id)
        ON DELETE CASCADE,

    CONSTRAINT UQ_UserLanguages
        UNIQUE(user_id, language_name)
);
GO

CREATE INDEX IX_UserLanguages_UserId
ON UserLanguages(user_id);
GO

-- =============================================================================
-- Table: UserSkills
-- Description: Stores user skills.
-- =============================================================================

CREATE TABLE UserSkills
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_UserSkills
        PRIMARY KEY
        DEFAULT NEWID(),

    user_id UNIQUEIDENTIFIER
        NOT NULL,

    skill_name NVARCHAR(150)
        NOT NULL,

    skill_level TINYINT
        NOT NULL,

    years_of_experience DECIMAL(4,1)
        NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_UserSkills_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_UserSkills_Users
        FOREIGN KEY(user_id)
        REFERENCES Users(id)
        ON DELETE CASCADE,

    CONSTRAINT UQ_UserSkills
        UNIQUE(user_id, skill_name)
);
GO

CREATE INDEX IX_UserSkills_UserId
ON UserSkills(user_id);
GO

-- =============================================================================
-- Table: UserGoals
-- Description: Stores user learning goals.
-- =============================================================================

CREATE TABLE UserGoals
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_UserGoals
        PRIMARY KEY
        DEFAULT NEWID(),

    user_id UNIQUEIDENTIFIER
        NOT NULL,

    title NVARCHAR(200)
        NOT NULL,

    description NVARCHAR(1000)
        NULL,

    target_date DATE
        NULL,

    status TINYINT
        NOT NULL
        CONSTRAINT DF_UserGoals_Status
        DEFAULT (0),

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_UserGoals_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2
        NULL,

    CONSTRAINT FK_UserGoals_Users
        FOREIGN KEY(user_id)
        REFERENCES Users(id)
        ON DELETE CASCADE,

    CONSTRAINT CK_UserGoals_Status
        CHECK(status IN (0,1,2,3))
);
GO

CREATE INDEX IX_UserGoals_UserId
ON UserGoals(user_id);
GO

CREATE INDEX IX_UserGoals_Status
ON UserGoals(status);
GO

-- =============================================================================
-- Table: UserInterests
-- Description: Stores user interests.
-- =============================================================================

CREATE TABLE UserInterests
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_UserInterests
        PRIMARY KEY
        DEFAULT NEWID(),

    user_id UNIQUEIDENTIFIER
        NOT NULL,

    interest_name NVARCHAR(150)
        NOT NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_UserInterests_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_UserInterests_Users
        FOREIGN KEY(user_id)
        REFERENCES Users(id)
        ON DELETE CASCADE,

    CONSTRAINT UQ_UserInterests
        UNIQUE(user_id, interest_name)
);
GO

CREATE INDEX IX_UserInterests_UserId
ON UserInterests(user_id);
GO

-- =============================================================================
-- Table: UserEducation
-- Description: Stores educational history.
-- =============================================================================

CREATE TABLE UserEducation
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_UserEducation
        PRIMARY KEY
        DEFAULT NEWID(),

    user_id UNIQUEIDENTIFIER
        NOT NULL,

    institution_name NVARCHAR(255)
        NOT NULL,

    faculty NVARCHAR(255)
        NULL,

    specialization NVARCHAR(255)
        NULL,

    degree NVARCHAR(100)
        NULL,

    start_date DATE
        NULL,

    end_date DATE
        NULL,

    is_current BIT
        NOT NULL
        CONSTRAINT DF_UserEducation_IsCurrent
        DEFAULT (0),

    grade NVARCHAR(50)
        NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_UserEducation_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2
        NULL,

    CONSTRAINT FK_UserEducation_Users
        FOREIGN KEY(user_id)
        REFERENCES Users(id)
        ON DELETE CASCADE
);
GO

CREATE INDEX IX_UserEducation_UserId
ON UserEducation(user_id);
GO

-- =============================================================================
-- Table: UserSocialLinks
-- Description: Stores user social media accounts.
-- =============================================================================

CREATE TABLE UserSocialLinks
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_UserSocialLinks
        PRIMARY KEY
        DEFAULT NEWID(),

    user_id UNIQUEIDENTIFIER
        NOT NULL,

    platform_name NVARCHAR(100)
        NOT NULL,

    profile_url NVARCHAR(500)
        NOT NULL,

    username NVARCHAR(150)
        NULL,

    is_public BIT
        NOT NULL
        CONSTRAINT DF_UserSocialLinks_IsPublic
        DEFAULT (1),

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_UserSocialLinks_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2
        NULL,

    CONSTRAINT FK_UserSocialLinks_Users
        FOREIGN KEY(user_id)
        REFERENCES Users(id)
        ON DELETE CASCADE,

    CONSTRAINT UQ_UserSocialLinks
        UNIQUE(user_id, platform_name)
);
GO

CREATE INDEX IX_UserSocialLinks_UserId
ON UserSocialLinks(user_id);
GO

CREATE INDEX IX_UserSocialLinks_Platform
ON UserSocialLinks(platform_name);
GO

