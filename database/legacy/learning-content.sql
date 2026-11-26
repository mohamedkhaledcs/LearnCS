/*
===============================================================================
Project     : LearnCS
Module      : Learning Content
File        : learning-content.sql
Database    : Microsoft SQL Server 2022

Description :
    Creates all learning content tables for the LearnCS platform.

Dependencies :
    - auth.sql
    - users.sql
    - knowledge-graph.sql

===============================================================================
*/

USE LearnCS;
GO

SET NOCOUNT ON;
GO

/*==============================================================================
    Lookup Table : Languages
==============================================================================*/

CREATE TABLE Languages
(
    id TINYINT
        IDENTITY(1,1)
        CONSTRAINT PK_Languages
        PRIMARY KEY,

    code NVARCHAR(10)
        NOT NULL,

    name NVARCHAR(100)
        NOT NULL,

    native_name NVARCHAR(100)
        NOT NULL,

    is_active BIT
        NOT NULL
        CONSTRAINT DF_Languages_IsActive
        DEFAULT (1),

    CONSTRAINT UQ_Languages_Code
        UNIQUE(code),

    CONSTRAINT UQ_Languages_Name
        UNIQUE(name)
);
GO

/*==============================================================================
    Lookup Table : ResourceTypes
==============================================================================*/

CREATE TABLE ResourceTypes
(
    id TINYINT
        IDENTITY(1,1)
        CONSTRAINT PK_ResourceTypes
        PRIMARY KEY,

    name NVARCHAR(100)
        NOT NULL,

    description NVARCHAR(500)
        NULL,

    CONSTRAINT UQ_ResourceTypes_Name
        UNIQUE(name)
);
GO

/*==============================================================================
    Lookup Table : SourceTypes
==============================================================================*/

CREATE TABLE SourceTypes
(
    id TINYINT
        IDENTITY(1,1)
        CONSTRAINT PK_SourceTypes
        PRIMARY KEY,

    name NVARCHAR(100)
        NOT NULL,

    description NVARCHAR(500)
        NULL,

    CONSTRAINT UQ_SourceTypes_Name
        UNIQUE(name)
);
GO

/*==============================================================================
    Lookup Table : DifficultyLevels
==============================================================================*/

CREATE TABLE DifficultyLevels
(
    id TINYINT
        IDENTITY(1,1)
        CONSTRAINT PK_DifficultyLevels
        PRIMARY KEY,

    name NVARCHAR(100)
        NOT NULL,

    display_order TINYINT
        NOT NULL,

    CONSTRAINT UQ_DifficultyLevels_Name
        UNIQUE(name)
);
GO

/*==============================================================================
    Lookup Table : DependencyTypes
==============================================================================*/

CREATE TABLE DependencyTypes
(
    id TINYINT
        IDENTITY(1,1)
        CONSTRAINT PK_DependencyTypes
        PRIMARY KEY,

    name NVARCHAR(100)
        NOT NULL,

    description NVARCHAR(500)
        NULL,

    CONSTRAINT UQ_DependencyTypes_Name
        UNIQUE(name)
);
GO

/*==============================================================================
    Lookup Table : ResourceStatuses
==============================================================================*/

CREATE TABLE ResourceStatuses
(
    id TINYINT
        IDENTITY(1,1)
        CONSTRAINT PK_ResourceStatuses
        PRIMARY KEY,

    name NVARCHAR(50)
        NOT NULL,

    CONSTRAINT UQ_ResourceStatuses_Name
        UNIQUE(name)
);
GO

/*==============================================================================
    Table : Platforms
==============================================================================*/

CREATE TABLE Platforms
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_Platforms
        PRIMARY KEY
        DEFAULT NEWID(),

    name NVARCHAR(150)
        NOT NULL,

    website_url NVARCHAR(500)
        NULL,

    logo_url NVARCHAR(500)
        NULL,

    icon NVARCHAR(100)
        NULL,

    is_active BIT
        NOT NULL
        CONSTRAINT DF_Platforms_IsActive
        DEFAULT(1),

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_Platforms_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT UQ_Platforms_Name
        UNIQUE(name)
);
GO

CREATE INDEX IX_Platforms_IsActive
ON Platforms(is_active);
GO

/*==============================================================================
    Table : Authors
==============================================================================*/

CREATE TABLE Authors
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_Authors
        PRIMARY KEY
        DEFAULT NEWID(),

    full_name NVARCHAR(255)
        NOT NULL,

    biography NVARCHAR(MAX)
        NULL,

    website_url NVARCHAR(500)
        NULL,

    avatar_url NVARCHAR(500)
        NULL,

    organization NVARCHAR(255)
        NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_Authors_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2
        NULL,

    CONSTRAINT UQ_Authors_Name
        UNIQUE(full_name)
);
GO

CREATE INDEX IX_Authors_Name
ON Authors(full_name);
GO

/*==============================================================================
    Table : ContentProviders
==============================================================================*/

CREATE TABLE ContentProviders
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_ContentProviders
        PRIMARY KEY
        DEFAULT NEWID(),

    platform_id UNIQUEIDENTIFIER
        NULL,

    name NVARCHAR(255)
        NOT NULL,

    website_url NVARCHAR(500)
        NULL,

    logo_url NVARCHAR(500)
        NULL,

    contact_email NVARCHAR(255)
        NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_ContentProviders_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_ContentProviders_Platforms
        FOREIGN KEY(platform_id)
        REFERENCES Platforms(id),

    CONSTRAINT UQ_ContentProviders_Name
        UNIQUE(name)
);
GO

CREATE INDEX IX_ContentProviders_Platform
ON ContentProviders(platform_id);
GO

/*==============================================================================
    Table : Categories
==============================================================================*/

CREATE TABLE Categories
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_Categories
        PRIMARY KEY
        DEFAULT NEWID(),

    parent_category_id UNIQUEIDENTIFIER
        NULL,

    name NVARCHAR(150)
        NOT NULL,

    slug NVARCHAR(150)
        NOT NULL,

    description NVARCHAR(1000)
        NULL,

    display_order INT
        NOT NULL
        CONSTRAINT DF_Categories_DisplayOrder
        DEFAULT(0),

    is_active BIT
        NOT NULL
        CONSTRAINT DF_Categories_IsActive
        DEFAULT(1),

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_Categories_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2
        NULL,

    CONSTRAINT FK_Categories_Parent
        FOREIGN KEY(parent_category_id)
        REFERENCES Categories(id),

    CONSTRAINT UQ_Categories_Slug
        UNIQUE(slug)
);
GO

CREATE INDEX IX_Categories_Parent
ON Categories(parent_category_id);
GO

CREATE INDEX IX_Categories_DisplayOrder
ON Categories(display_order);
GO

/*==============================================================================
    Table : Resources
    Description :
        Base entity for every learning resource in the platform.
==============================================================================*/

CREATE TABLE Resources
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_Resources
        PRIMARY KEY
        DEFAULT NEWID(),

    resource_type_id TINYINT
        NOT NULL,

    source_type_id TINYINT
        NOT NULL,

    difficulty_level_id TINYINT
        NULL,

    language_id TINYINT
        NULL,

    provider_id UNIQUEIDENTIFIER
        NULL,

    created_by UNIQUEIDENTIFIER
        NOT NULL,

    updated_by UNIQUEIDENTIFIER
        NULL,

    status_changed_by UNIQUEIDENTIFIER
        NULL,

    status_id TINYINT
        NOT NULL,

    title NVARCHAR(300)
        NOT NULL,

    slug NVARCHAR(350)
        NOT NULL,

    short_description NVARCHAR(1000)
        NULL,

    description NVARCHAR(MAX)
        NULL,

    thumbnail_url NVARCHAR(1000)
        NULL,

    estimated_duration_minutes INT
        NULL,

    published_at DATETIME2
        NULL,

    status_changed_at DATETIME2
        NULL,

    is_featured BIT
        NOT NULL
        CONSTRAINT DF_Resources_IsFeatured
        DEFAULT(0),

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_Resources_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2
        NULL,

    deleted_at DATETIME2
        NULL,

    deleted_by UNIQUEIDENTIFIER
        NULL,

    CONSTRAINT UQ_Resources_Slug
        UNIQUE(slug),

    CONSTRAINT CK_Resources_EstimatedDuration
    CHECK
    (
        estimated_duration_minutes IS NULL
        OR estimated_duration_minutes >= 0
    ),

    CONSTRAINT FK_Resources_ResourceTypes
        FOREIGN KEY(resource_type_id)
        REFERENCES ResourceTypes(id),

    CONSTRAINT FK_Resources_SourceTypes
        FOREIGN KEY(source_type_id)
        REFERENCES SourceTypes(id),

    CONSTRAINT FK_Resources_DifficultyLevels
        FOREIGN KEY(difficulty_level_id)
        REFERENCES DifficultyLevels(id),

    CONSTRAINT FK_Resources_Languages
        FOREIGN KEY(language_id)
        REFERENCES Languages(id),

    CONSTRAINT FK_Resources_ContentProviders
        FOREIGN KEY(provider_id)
        REFERENCES ContentProviders(id),

    CONSTRAINT FK_Resources_Status
        FOREIGN KEY(status_id)
        REFERENCES ResourceStatuses(id),

    CONSTRAINT FK_Resources_CreatedBy
        FOREIGN KEY(created_by)
        REFERENCES Users(id),

    CONSTRAINT FK_Resources_UpdatedBy
        FOREIGN KEY(updated_by)
        REFERENCES Users(id)
);
GO

CREATE INDEX IX_Resources_Type
ON Resources(resource_type_id);
GO

CREATE INDEX IX_Resources_SourceType
ON Resources(source_type_id);
GO

CREATE INDEX IX_Resources_Difficulty
ON Resources(difficulty_level_id);
GO

CREATE INDEX IX_Resources_Language
ON Resources(language_id);
GO

CREATE INDEX IX_Resources_Provider
ON Resources(provider_id);
GO

CREATE INDEX IX_Resources_Status
ON Resources(status_id);
GO

CREATE INDEX IX_Resources_CreatedBy
ON Resources(created_by);
GO

CREATE INDEX IX_Resources_Featured
ON Resources(is_featured);
GO

CREATE INDEX IX_Resources_PublishedAt
ON Resources(published_at);
GO

/*==============================================================================
    Table : ResourceAuthors
==============================================================================*/

CREATE TABLE ResourceAuthors
(
    resource_id UNIQUEIDENTIFIER
        NOT NULL,

    author_id UNIQUEIDENTIFIER
        NOT NULL,

    author_order SMALLINT
        NOT NULL
        CONSTRAINT DF_ResourceAuthors_Order
        DEFAULT(1),

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_ResourceAuthors_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT PK_ResourceAuthors
        PRIMARY KEY(resource_id, author_id),

    CONSTRAINT FK_ResourceAuthors_Resources
        FOREIGN KEY(resource_id)
        REFERENCES Resources(id)
        ON DELETE CASCADE,

    CONSTRAINT FK_ResourceAuthors_Authors
        FOREIGN KEY(author_id)
        REFERENCES Authors(id)
);
GO

CREATE INDEX IX_ResourceAuthors_Author
ON ResourceAuthors(author_id);
GO

/*==============================================================================
    Table : ResourceCategories
==============================================================================*/

CREATE TABLE ResourceCategories
(
    resource_id UNIQUEIDENTIFIER
        NOT NULL,

    category_id UNIQUEIDENTIFIER
        NOT NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_ResourceCategories_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT PK_ResourceCategories
        PRIMARY KEY(resource_id, category_id),

    CONSTRAINT FK_ResourceCategories_Resources
        FOREIGN KEY(resource_id)
        REFERENCES Resources(id)
        ON DELETE CASCADE,

    CONSTRAINT FK_ResourceCategories_Categories
        FOREIGN KEY(category_id)
        REFERENCES Categories(id)
);
GO

CREATE INDEX IX_ResourceCategories_Category
ON ResourceCategories(category_id);
GO

/*==============================================================================
    Table : ResourceTopics
==============================================================================*/

CREATE TABLE ResourceTopics
(
    resource_id UNIQUEIDENTIFIER
        NOT NULL,

    topic_id UNIQUEIDENTIFIER
        NOT NULL,

    display_order INT
        NOT NULL
        CONSTRAINT DF_ResourceTopics_Order
        DEFAULT(0),

    is_required BIT
        NOT NULL
        CONSTRAINT DF_ResourceTopics_IsRequired
        DEFAULT(0),

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_ResourceTopics_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT PK_ResourceTopics
        PRIMARY KEY(resource_id, topic_id),

    CONSTRAINT FK_ResourceTopics_Resources
        FOREIGN KEY(resource_id)
        REFERENCES Resources(id)
        ON DELETE CASCADE,

    CONSTRAINT FK_ResourceTopics_Topics
        FOREIGN KEY(topic_id)
        REFERENCES Topics(id)
        ON DELETE CASCADE
);
GO

CREATE INDEX IX_ResourceTopics_Topic
ON ResourceTopics(topic_id);
GO

/*==============================================================================
    Table : ResourceAnalytics
==============================================================================*/

CREATE TABLE ResourceAnalytics
(
    resource_id UNIQUEIDENTIFIER
        CONSTRAINT PK_ResourceAnalytics
        PRIMARY KEY,

    total_views BIGINT
        NOT NULL
        CONSTRAINT DF_ResourceAnalytics_Views
        DEFAULT(0),

    total_bookmarks BIGINT
        NOT NULL
        CONSTRAINT DF_ResourceAnalytics_Bookmarks
        DEFAULT(0),

    total_likes BIGINT
        NOT NULL
        CONSTRAINT DF_ResourceAnalytics_Likes
        DEFAULT(0),

    total_shares BIGINT
        NOT NULL
        CONSTRAINT DF_ResourceAnalytics_Shares
        DEFAULT(0),

    average_rating DECIMAL(3,2)
        NULL,

    total_ratings INT
        NOT NULL
        CONSTRAINT DF_ResourceAnalytics_Ratings
        DEFAULT(0),

    last_viewed_at DATETIME2
        NULL,

    updated_at DATETIME2
        NOT NULL
        CONSTRAINT DF_ResourceAnalytics_UpdatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_ResourceAnalytics_Resources
        FOREIGN KEY(resource_id)
        REFERENCES Resources(id)
        ON DELETE CASCADE
);
GO

/*==============================================================================
    Table : Videos
==============================================================================*/

CREATE TABLE Videos
(
    resource_id UNIQUEIDENTIFIER
        CONSTRAINT PK_Videos
        PRIMARY KEY,

    platform_id UNIQUEIDENTIFIER
        NULL,

    video_url NVARCHAR(1000)
        NOT NULL,

    duration_seconds INT
        NULL,

    subtitles_available BIT
        NOT NULL
        CONSTRAINT DF_Videos_Subtitles
        DEFAULT(0),

    transcript_available BIT
        NOT NULL
        CONSTRAINT DF_Videos_Transcript
        DEFAULT(0),

    resolution NVARCHAR(50)
        NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_Videos_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_Videos_Resources
        FOREIGN KEY(resource_id)
        REFERENCES Resources(id)
        ON DELETE CASCADE,

    CONSTRAINT FK_Videos_Platforms
        FOREIGN KEY(platform_id)
        REFERENCES Platforms(id)
);
GO

CREATE INDEX IX_Videos_Platform
ON Videos(platform_id);
GO

/*==============================================================================
    Table : Articles
==============================================================================*/

CREATE TABLE Articles
(
    resource_id UNIQUEIDENTIFIER
        CONSTRAINT PK_Articles
        PRIMARY KEY,

    article_url NVARCHAR(1000)
        NOT NULL,

    reading_minutes INT
        NULL,

    word_count INT
        NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_Articles_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_Articles_Resources
        FOREIGN KEY(resource_id)
        REFERENCES Resources(id)
        ON DELETE CASCADE
);
GO

/*==============================================================================
    Table : Books
==============================================================================*/

CREATE TABLE Books
(
    resource_id UNIQUEIDENTIFIER
        CONSTRAINT PK_Books
        PRIMARY KEY,

    isbn NVARCHAR(30)
        NULL,

    publisher NVARCHAR(255)
        NULL,

    edition NVARCHAR(100)
        NULL,

    publication_year SMALLINT
        NULL,

    total_pages INT
        NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_Books_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_Books_Resources
        FOREIGN KEY(resource_id)
        REFERENCES Resources(id)
        ON DELETE CASCADE
);
GO

CREATE INDEX IX_Books_ISBN
ON Books(isbn);
GO

/*==============================================================================
    Table : Documents
==============================================================================*/

CREATE TABLE Documents
(
    resource_id UNIQUEIDENTIFIER
        CONSTRAINT PK_Documents
        PRIMARY KEY,

    page_count INT
        NULL,

    file_format NVARCHAR(20)
        NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_Documents_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_Documents_Resources
        FOREIGN KEY(resource_id)
        REFERENCES Resources(id)
        ON DELETE CASCADE
);
GO

/*==============================================================================
    Table : ExternalLinks
==============================================================================*/

CREATE TABLE ExternalLinks
(
    resource_id UNIQUEIDENTIFIER
        CONSTRAINT PK_ExternalLinks
        PRIMARY KEY,

    url NVARCHAR(1000)
        NOT NULL,

    domain_name NVARCHAR(255)
        NULL,

    open_in_new_tab BIT
        NOT NULL
        CONSTRAINT DF_ExternalLinks_NewTab
        DEFAULT(1),

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_ExternalLinks_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_ExternalLinks_Resources
        FOREIGN KEY(resource_id)
        REFERENCES Resources(id)
        ON DELETE CASCADE
);
GO

/*==============================================================================
    Table : Courses
==============================================================================*/

CREATE TABLE Courses
(
    resource_id UNIQUEIDENTIFIER
        CONSTRAINT PK_Courses
        PRIMARY KEY,

    instructor_id UNIQUEIDENTIFIER
        NULL,

    certificate_available BIT
        NOT NULL
        CONSTRAINT DF_Courses_Certificate
        DEFAULT(0),

    enrollment_limit INT
        NULL,

    estimated_hours DECIMAL(6,2)
        NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_Courses_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_Courses_Resources
        FOREIGN KEY(resource_id)
        REFERENCES Resources(id)
        ON DELETE CASCADE,

    CONSTRAINT FK_Courses_Instructor
        FOREIGN KEY(instructor_id)
        REFERENCES Users(id)
);
GO

CREATE INDEX IX_Courses_Instructor
ON Courses(instructor_id);
GO

/*==============================================================================
    Table : CourseSections
==============================================================================*/

CREATE TABLE CourseSections
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_CourseSections
        PRIMARY KEY
        DEFAULT NEWID(),

    course_resource_id UNIQUEIDENTIFIER
        NOT NULL,

    title NVARCHAR(300)
        NOT NULL,

    description NVARCHAR(1000)
        NULL,

    display_order SMALLINT
        NOT NULL
        CONSTRAINT DF_CourseSections_DisplayOrder
        DEFAULT(1),

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_CourseSections_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2
        NULL,

    CONSTRAINT FK_CourseSections_Courses
        FOREIGN KEY(course_resource_id)
        REFERENCES Courses(resource_id)
        ON DELETE CASCADE
);
GO

CREATE INDEX IX_CourseSections_Course
ON CourseSections(course_resource_id);
GO

/*==============================================================================
    Table : CourseLessons
==============================================================================*/

CREATE TABLE CourseLessons
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_CourseLessons
        PRIMARY KEY
        DEFAULT NEWID(),

    section_id UNIQUEIDENTIFIER
        NOT NULL,

    title NVARCHAR(300)
        NOT NULL,

    description NVARCHAR(2000)
        NULL,

    display_order SMALLINT
        NOT NULL
        CONSTRAINT DF_CourseLessons_DisplayOrder
        DEFAULT(1),

    estimated_minutes INT
        NULL,

    is_preview BIT
        NOT NULL
        CONSTRAINT DF_CourseLessons_IsPreview
        DEFAULT(0),

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_CourseLessons_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2
        NULL,

    CONSTRAINT FK_CourseLessons_Sections
        FOREIGN KEY(section_id)
        REFERENCES CourseSections(id)
        ON DELETE CASCADE
);
GO

CREATE INDEX IX_CourseLessons_Section
ON CourseLessons(section_id);
GO

/*==============================================================================
    Table : LessonResources
==============================================================================*/

CREATE TABLE LessonResources
(
    lesson_id UNIQUEIDENTIFIER
        NOT NULL,

    resource_id UNIQUEIDENTIFIER
        NOT NULL,

    display_order SMALLINT
        NOT NULL
        CONSTRAINT DF_LessonResources_DisplayOrder
        DEFAULT(1),

    is_required BIT
        NOT NULL
        CONSTRAINT DF_LessonResources_IsRequired
        DEFAULT(1),

    unlock_after_completion BIT
        NOT NULL
        CONSTRAINT DF_LessonResources_UnlockAfterCompletion
        DEFAULT(0),

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_LessonResources_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT PK_LessonResources
        PRIMARY KEY
        (
            lesson_id,
            resource_id
        ),

    CONSTRAINT FK_LessonResources_Lessons
        FOREIGN KEY(lesson_id)
        REFERENCES CourseLessons(id)
        ON DELETE CASCADE,

    CONSTRAINT FK_LessonResources_Resources
        FOREIGN KEY(resource_id)
        REFERENCES Resources(id)
);
GO

CREATE INDEX IX_LessonResources_Resource
ON LessonResources(resource_id);
GO

/*==============================================================================
    Table : Files
==============================================================================*/

CREATE TABLE Files
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_Files
        PRIMARY KEY
        DEFAULT NEWID(),

    original_file_name NVARCHAR(255)
        NOT NULL,

    stored_file_name NVARCHAR(255)
        NOT NULL,

    file_extension NVARCHAR(20)
        NOT NULL,

    mime_type NVARCHAR(150)
        NOT NULL,

    file_size_bytes BIGINT
        NOT NULL,

    checksum_sha256 CHAR(64)
        NULL,

    storage_provider NVARCHAR(100)
        NULL,

    storage_path NVARCHAR(1000)
        NOT NULL,

    is_public BIT
        NOT NULL
        CONSTRAINT DF_Files_IsPublic
        DEFAULT(0),

    created_by UNIQUEIDENTIFIER
        NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_Files_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_Files_Users
        FOREIGN KEY(created_by)
        REFERENCES Users(id)
);
GO

CREATE INDEX IX_Files_Path
ON Files(storage_path);
GO

CREATE INDEX IX_Files_Checksum
ON Files(checksum_sha256);
GO

/*==============================================================================
    Table : ResourceFiles
==============================================================================*/

CREATE TABLE ResourceFiles
(
    resource_id UNIQUEIDENTIFIER
        NOT NULL,

    file_id UNIQUEIDENTIFIER
        NOT NULL,

    file_role NVARCHAR(50)
        NOT NULL,

    display_order SMALLINT
        NOT NULL
        CONSTRAINT DF_ResourceFiles_Order
        DEFAULT(1),

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_ResourceFiles_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT PK_ResourceFiles
        PRIMARY KEY(resource_id,file_id),

    CONSTRAINT FK_ResourceFiles_Resources
        FOREIGN KEY(resource_id)
        REFERENCES Resources(id)
        ON DELETE CASCADE,

    CONSTRAINT FK_ResourceFiles_Files
        FOREIGN KEY(file_id)
        REFERENCES Files(id)
        ON DELETE CASCADE
);
GO

CREATE INDEX IX_ResourceFiles_File
ON ResourceFiles(file_id);
GO

/*==============================================================================
    Table : ResourceVersions
==============================================================================*/

CREATE TABLE ResourceVersions
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_ResourceVersions
        PRIMARY KEY
        DEFAULT NEWID(),

    resource_id UNIQUEIDENTIFIER
        NOT NULL,

    version_number INT
        NOT NULL,

    title NVARCHAR(300)
        NOT NULL,

    short_description NVARCHAR(1000)
        NULL,

    description NVARCHAR(MAX)
        NULL,

    change_log NVARCHAR(MAX)
        NULL,

    created_by UNIQUEIDENTIFIER
        NOT NULL,

    published_at DATETIME2
        NULL,

    is_current BIT
        NOT NULL
        CONSTRAINT DF_ResourceVersions_IsCurrent
        DEFAULT(0),

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_ResourceVersions_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_ResourceVersions_Resources
        FOREIGN KEY(resource_id)
        REFERENCES Resources(id)
        ON DELETE CASCADE,

    CONSTRAINT FK_ResourceVersions_Users
        FOREIGN KEY(created_by)
        REFERENCES Users(id),

    CONSTRAINT UQ_ResourceVersions
        UNIQUE(resource_id, version_number)
);
GO

CREATE INDEX IX_ResourceVersions_Current
ON ResourceVersions(resource_id, is_current);
GO

/*==============================================================================
    Table : ResourceTranslations
==============================================================================*/

CREATE TABLE ResourceTranslations
(
    resource_id UNIQUEIDENTIFIER
        NOT NULL,

    language_id TINYINT
        NOT NULL,

    title NVARCHAR(300)
        NOT NULL,

    short_description NVARCHAR(1000)
        NULL,

    description NVARCHAR(MAX)
        NULL,

    translated_by UNIQUEIDENTIFIER
        NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_ResourceTranslations_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2
        NULL,

    CONSTRAINT PK_ResourceTranslations
        PRIMARY KEY(resource_id, language_id),

    CONSTRAINT FK_Translations_Resources
        FOREIGN KEY(resource_id)
        REFERENCES Resources(id)
        ON DELETE CASCADE,

    CONSTRAINT FK_Translations_Languages
        FOREIGN KEY(language_id)
        REFERENCES Languages(id),

    CONSTRAINT FK_Translations_Users
        FOREIGN KEY(translated_by)
        REFERENCES Users(id)
);
GO

/*==============================================================================
    Table : ResourceDependencies
==============================================================================*/

CREATE TABLE ResourceDependencies
(
    resource_id UNIQUEIDENTIFIER
        NOT NULL,

    depends_on_resource_id UNIQUEIDENTIFIER
        NOT NULL,

    dependency_type_id TINYINT
        NOT NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_ResourceDependencies_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT PK_ResourceDependencies
        PRIMARY KEY
        (
            resource_id,
            depends_on_resource_id
        ),

    CONSTRAINT FK_ResourceDependencies_Resource
        FOREIGN KEY(resource_id)
        REFERENCES Resources(id)
        ON DELETE CASCADE,

    CONSTRAINT FK_ResourceDependencies_DependsOn
        FOREIGN KEY(depends_on_resource_id)
        REFERENCES Resources(id),

    CONSTRAINT FK_ResourceDependencies_Type
        FOREIGN KEY(dependency_type_id)
        REFERENCES DependencyTypes(id)
);
GO

CREATE INDEX IX_ResourceDependencies_Depends
ON ResourceDependencies(depends_on_resource_id);
GO

/*==============================================================================
    Table : ResourceRatings
==============================================================================*/

CREATE TABLE ResourceRatings
(
    resource_id UNIQUEIDENTIFIER
        NOT NULL,

    user_id UNIQUEIDENTIFIER
        NOT NULL,

    rating TINYINT
        NOT NULL,

    review NVARCHAR(3000)
        NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_ResourceRatings_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2
        NULL,

    CONSTRAINT PK_ResourceRatings
        PRIMARY KEY(resource_id, user_id),

    CONSTRAINT FK_ResourceRatings_Resource
        FOREIGN KEY(resource_id)
        REFERENCES Resources(id)
        ON DELETE CASCADE,

    CONSTRAINT FK_ResourceRatings_User
        FOREIGN KEY(user_id)
        REFERENCES Users(id),

    CONSTRAINT CK_ResourceRatings_Value
        CHECK(rating BETWEEN 1 AND 5)
);
GO

CREATE TABLE ResourceBookmarks
(
    resource_id UNIQUEIDENTIFIER NOT NULL,

    user_id UNIQUEIDENTIFIER NOT NULL,

    created_at DATETIME2 NOT NULL
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT PK_ResourceBookmarks
        PRIMARY KEY(resource_id,user_id),

    CONSTRAINT FK_ResourceBookmarks_Resource
        FOREIGN KEY(resource_id)
        REFERENCES Resources(id)
        ON DELETE CASCADE,

    CONSTRAINT FK_ResourceBookmarks_User
        FOREIGN KEY(user_id)
        REFERENCES Users(id)
);
GO

/*==============================================================================
    Table : Tags
==============================================================================*/

CREATE TABLE Tags
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_Tags
        PRIMARY KEY
        DEFAULT NEWID(),

    name NVARCHAR(100)
        NOT NULL,

    slug NVARCHAR(120)
        NOT NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_Tags_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT UQ_Tags_Name
        UNIQUE(name),

    CONSTRAINT UQ_Tags_Slug
        UNIQUE(slug)
);
GO

CREATE INDEX IX_Tags_Name
ON Tags(name);
GO

/*==============================================================================
    Table : ResourceTags
==============================================================================*/

CREATE TABLE ResourceTags
(
    resource_id UNIQUEIDENTIFIER
        NOT NULL,

    tag_id UNIQUEIDENTIFIER
        NOT NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_ResourceTags_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT PK_ResourceTags
        PRIMARY KEY(resource_id, tag_id),

    CONSTRAINT FK_ResourceTags_Resources
        FOREIGN KEY(resource_id)
        REFERENCES Resources(id)
        ON DELETE CASCADE,

    CONSTRAINT FK_ResourceTags_Tags
        FOREIGN KEY(tag_id)
        REFERENCES Tags(id)
        ON DELETE CASCADE
);
GO

CREATE INDEX IX_ResourceTags_Tag
ON ResourceTags(tag_id);
GO

