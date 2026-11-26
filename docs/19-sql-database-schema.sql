/*
===========================================================
LearnCS Database Schema
SQL Server
Version: 1.0.0
===========================================================
*/

CREATE DATABASE LearnCS;
GO

USE LearnCS;
GO

/*
===========================================================
Authentication Module
===========================================================
*/

CREATE TABLE Roles
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    name NVARCHAR(100) NOT NULL UNIQUE,

    description NVARCHAR(500),

    created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

CREATE TABLE Users
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    first_name NVARCHAR(100) NOT NULL,

    last_name NVARCHAR(100) NOT NULL,

    email NVARCHAR(255) NOT NULL UNIQUE,

    password_hash NVARCHAR(MAX) NOT NULL,

    email_verified BIT NOT NULL DEFAULT 0,

    avatar_url NVARCHAR(500),

    status NVARCHAR(30) NOT NULL DEFAULT 'Active',

    last_login_at DATETIME2,

    created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

    deleted_at DATETIME2
);
GO

CREATE TABLE UserRoles
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    user_id UNIQUEIDENTIFIER NOT NULL,

    role_id UNIQUEIDENTIFIER NOT NULL,

    assigned_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_UserRoles_User
        FOREIGN KEY (user_id)
        REFERENCES Users(id),

    CONSTRAINT FK_UserRoles_Role
        FOREIGN KEY (role_id)
        REFERENCES Roles(id),

    CONSTRAINT UQ_User_Role
        UNIQUE(user_id, role_id)
);
GO

/*
===========================================================
User Management Module
===========================================================
*/

CREATE TABLE ExperienceLevels
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    name NVARCHAR(100) NOT NULL UNIQUE,

    description NVARCHAR(500)
);
GO

CREATE TABLE LearningGoals
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    name NVARCHAR(150) NOT NULL UNIQUE,

    description NVARCHAR(500)
);
GO

CREATE TABLE LearnerProfiles
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    user_id UNIQUEIDENTIFIER NOT NULL UNIQUE,

    experience_level_id UNIQUEIDENTIFIER,

    learning_goal_id UNIQUEIDENTIFIER,

    bio NVARCHAR(1000),

    country NVARCHAR(100),

    university NVARCHAR(200),

    study_year INT,

    preferred_language NVARCHAR(50),

    created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_Profile_User
        FOREIGN KEY(user_id)
        REFERENCES Users(id),

    CONSTRAINT FK_Profile_Experience
        FOREIGN KEY(experience_level_id)
        REFERENCES ExperienceLevels(id),

    CONSTRAINT FK_Profile_Goal
        FOREIGN KEY(learning_goal_id)
        REFERENCES LearningGoals(id)
);
GO

/*
===========================================================
Knowledge Graph Module
===========================================================
*/

CREATE TABLE Domains
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    name NVARCHAR(150) NOT NULL UNIQUE,

    slug NVARCHAR(150) NOT NULL UNIQUE,

    description NVARCHAR(MAX),

    icon NVARCHAR(255),

    display_order INT NOT NULL DEFAULT 0,

    is_active BIT NOT NULL DEFAULT 1,

    created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

CREATE TABLE Topics
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    domain_id UNIQUEIDENTIFIER NOT NULL,

    title NVARCHAR(200) NOT NULL,

    slug NVARCHAR(200) NOT NULL UNIQUE,

    description NVARCHAR(MAX),

    difficulty_level INT NOT NULL DEFAULT 1,

    estimated_duration_minutes INT,

    theory_weight DECIMAL(5,2) DEFAULT 0,

    practice_weight DECIMAL(5,2) DEFAULT 0,

    importance_score DECIMAL(5,2) DEFAULT 0,

    is_active BIT NOT NULL DEFAULT 1,

    created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_Topic_Domain
        FOREIGN KEY(domain_id)
        REFERENCES Domains(id)
);
GO

CREATE TABLE TopicPrerequisites
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    topic_id UNIQUEIDENTIFIER NOT NULL,

    prerequisite_topic_id UNIQUEIDENTIFIER NOT NULL,

    created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_Prerequisite_Topic
        FOREIGN KEY(topic_id)
        REFERENCES Topics(id),

    CONSTRAINT FK_Prerequisite_RequiredTopic
        FOREIGN KEY(prerequisite_topic_id)
        REFERENCES Topics(id),

    CONSTRAINT UQ_Topic_Prerequisite
        UNIQUE(topic_id, prerequisite_topic_id)
);
GO

CREATE TABLE TopicTags
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    name NVARCHAR(100) NOT NULL UNIQUE,

    color NVARCHAR(30),

    created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

CREATE TABLE TopicTagMappings
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    topic_id UNIQUEIDENTIFIER NOT NULL,

    tag_id UNIQUEIDENTIFIER NOT NULL,

    CONSTRAINT FK_TopicTagMapping_Topic
        FOREIGN KEY(topic_id)
        REFERENCES Topics(id),

    CONSTRAINT FK_TopicTagMapping_Tag
        FOREIGN KEY(tag_id)
        REFERENCES TopicTags(id),

    CONSTRAINT UQ_Topic_Tag
        UNIQUE(topic_id, tag_id)
);
GO

/*
===========================================================
Learning Content Module
===========================================================
*/

CREATE TABLE Resources
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    title NVARCHAR(255) NOT NULL,

    description NVARCHAR(MAX),

    resource_type NVARCHAR(50) NOT NULL,

    provider NVARCHAR(150),

    author_name NVARCHAR(150),

    url NVARCHAR(MAX),

    estimated_duration_minutes INT,

    difficulty_level INT DEFAULT 1,

    language NVARCHAR(50),

    is_free BIT NOT NULL DEFAULT 1,

    is_active BIT NOT NULL DEFAULT 1,

    created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

CREATE TABLE ResourceTopics
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    resource_id UNIQUEIDENTIFIER NOT NULL,

    topic_id UNIQUEIDENTIFIER NOT NULL,

    CONSTRAINT FK_ResourceTopics_Resource
        FOREIGN KEY(resource_id)
        REFERENCES Resources(id),

    CONSTRAINT FK_ResourceTopics_Topic
        FOREIGN KEY(topic_id)
        REFERENCES Topics(id),

    CONSTRAINT UQ_Resource_Topic
        UNIQUE(resource_id, topic_id)
);
GO

/*
===========================================================
Assessment Module
===========================================================
*/

CREATE TABLE Assessments
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    title NVARCHAR(255) NOT NULL,

    description NVARCHAR(MAX),

    assessment_type NVARCHAR(50) NOT NULL,

    duration_minutes INT,

    passing_score DECIMAL(5,2),

    total_marks DECIMAL(8,2),

    is_active BIT NOT NULL DEFAULT 1,

    created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

CREATE TABLE Questions
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    topic_id UNIQUEIDENTIFIER NOT NULL,

    title NVARCHAR(MAX) NOT NULL,

    explanation NVARCHAR(MAX),

    difficulty_level INT DEFAULT 1,

    question_type NVARCHAR(50) NOT NULL,

    marks DECIMAL(6,2) DEFAULT 1,

    created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_Question_Topic
        FOREIGN KEY(topic_id)
        REFERENCES Topics(id)
);
GO

CREATE TABLE QuestionOptions
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    question_id UNIQUEIDENTIFIER NOT NULL,

    option_text NVARCHAR(MAX) NOT NULL,

    is_correct BIT NOT NULL DEFAULT 0,

    display_order INT DEFAULT 0,

    CONSTRAINT FK_QuestionOption_Question
        FOREIGN KEY(question_id)
        REFERENCES Questions(id)
);
GO

CREATE TABLE AssessmentQuestions
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    assessment_id UNIQUEIDENTIFIER NOT NULL,

    question_id UNIQUEIDENTIFIER NOT NULL,

    display_order INT DEFAULT 0,

    CONSTRAINT FK_AssessmentQuestion_Assessment
        FOREIGN KEY(assessment_id)
        REFERENCES Assessments(id),

    CONSTRAINT FK_AssessmentQuestion_Question
        FOREIGN KEY(question_id)
        REFERENCES Questions(id),

    CONSTRAINT UQ_Assessment_Question
        UNIQUE(assessment_id, question_id)
);
GO

CREATE TABLE AssessmentAttempts
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    assessment_id UNIQUEIDENTIFIER NOT NULL,

    user_id UNIQUEIDENTIFIER NOT NULL,

    started_at DATETIME2,

    submitted_at DATETIME2,

    score DECIMAL(8,2),

    percentage DECIMAL(5,2),

    passed BIT,

    completion_time_seconds INT,

    created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_Attempt_Assessment
        FOREIGN KEY(assessment_id)
        REFERENCES Assessments(id),

    CONSTRAINT FK_Attempt_User
        FOREIGN KEY(user_id)
        REFERENCES Users(id)
);
GO

CREATE TABLE Answers
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    attempt_id UNIQUEIDENTIFIER NOT NULL,

    question_id UNIQUEIDENTIFIER NOT NULL,

    selected_option_id UNIQUEIDENTIFIER,

    answer_text NVARCHAR(MAX),

    earned_marks DECIMAL(6,2),

    is_correct BIT,

    answered_at DATETIME2 DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_Answer_Attempt
        FOREIGN KEY(attempt_id)
        REFERENCES AssessmentAttempts(id),

    CONSTRAINT FK_Answer_Question
        FOREIGN KEY(question_id)
        REFERENCES Questions(id),

    CONSTRAINT FK_Answer_Option
        FOREIGN KEY(selected_option_id)
        REFERENCES QuestionOptions(id)
);
GO

/*
===========================================================
Competency Module
===========================================================
*/

CREATE TABLE Competencies
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    user_id UNIQUEIDENTIFIER NOT NULL,

    topic_id UNIQUEIDENTIFIER NOT NULL,

    competency_score DECIMAL(5,2) NOT NULL,

    competency_level NVARCHAR(50),

    confidence_score DECIMAL(5,2),

    last_assessed_at DATETIME2,

    updated_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_Competency_User
        FOREIGN KEY(user_id)
        REFERENCES Users(id),

    CONSTRAINT FK_Competency_Topic
        FOREIGN KEY(topic_id)
        REFERENCES Topics(id),

    CONSTRAINT UQ_User_Topic
        UNIQUE(user_id, topic_id)
);
GO

/*
===========================================================
Roadmap Module
===========================================================
*/

CREATE TABLE Roadmaps
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    user_id UNIQUEIDENTIFIER NOT NULL,

    title NVARCHAR(255),

    is_active BIT DEFAULT 1,

    generated_at DATETIME2 DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_Roadmap_User
        FOREIGN KEY(user_id)
        REFERENCES Users(id)
);
GO

CREATE TABLE RoadmapSteps
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    roadmap_id UNIQUEIDENTIFIER NOT NULL,

    topic_id UNIQUEIDENTIFIER NOT NULL,

    step_order INT NOT NULL,

    status NVARCHAR(30) DEFAULT 'Pending',

    unlocked_at DATETIME2,

    completed_at DATETIME2,

    CONSTRAINT FK_RoadmapStep_Roadmap
        FOREIGN KEY(roadmap_id)
        REFERENCES Roadmaps(id),

    CONSTRAINT FK_RoadmapStep_Topic
        FOREIGN KEY(topic_id)
        REFERENCES Topics(id)
);
GO

/*
===========================================================
Recommendation Module
===========================================================
*/

CREATE TABLE Recommendations
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    user_id UNIQUEIDENTIFIER NOT NULL,

    topic_id UNIQUEIDENTIFIER,

    resource_id UNIQUEIDENTIFIER,

    recommendation_type NVARCHAR(50) NOT NULL,

    priority_score DECIMAL(6,2),

    reason NVARCHAR(MAX),

    is_completed BIT NOT NULL DEFAULT 0,

    expires_at DATETIME2,

    created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_Recommendation_User
        FOREIGN KEY(user_id)
        REFERENCES Users(id),

    CONSTRAINT FK_Recommendation_Topic
        FOREIGN KEY(topic_id)
        REFERENCES Topics(id),

    CONSTRAINT FK_Recommendation_Resource
        FOREIGN KEY(resource_id)
        REFERENCES Resources(id)
);
GO

/*
===========================================================
Progress Tracking Module
===========================================================
*/

CREATE TABLE LearningSessions
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    user_id UNIQUEIDENTIFIER NOT NULL,

    started_at DATETIME2 NOT NULL,

    ended_at DATETIME2,

    duration_minutes INT,

    session_type NVARCHAR(50),

    created_at DATETIME2 DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_LearningSession_User
        FOREIGN KEY(user_id)
        REFERENCES Users(id)
);
GO

CREATE TABLE Progress
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    user_id UNIQUEIDENTIFIER NOT NULL,

    topic_id UNIQUEIDENTIFIER NOT NULL,

    completion_percentage DECIMAL(5,2) DEFAULT 0,

    completed_resources INT DEFAULT 0,

    solved_questions INT DEFAULT 0,

    total_study_minutes INT DEFAULT 0,

    last_studied_at DATETIME2,

    updated_at DATETIME2 DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_Progress_User
        FOREIGN KEY(user_id)
        REFERENCES Users(id),

    CONSTRAINT FK_Progress_Topic
        FOREIGN KEY(topic_id)
        REFERENCES Topics(id),

    CONSTRAINT UQ_Progress_UserTopic
        UNIQUE(user_id, topic_id)
);
GO

/*
===========================================================
AI Mentor Module
===========================================================
*/

CREATE TABLE AIConversations
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    user_id UNIQUEIDENTIFIER NOT NULL,

    title NVARCHAR(255),

    created_at DATETIME2 DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2 DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_AIConversation_User
        FOREIGN KEY(user_id)
        REFERENCES Users(id)
);
GO

CREATE TABLE AIMessages
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    conversation_id UNIQUEIDENTIFIER NOT NULL,

    sender NVARCHAR(20) NOT NULL,

    message NVARCHAR(MAX) NOT NULL,

    tokens_used INT,

    created_at DATETIME2 DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_AIMessage_Conversation
        FOREIGN KEY(conversation_id)
        REFERENCES AIConversations(id)
);
GO

/*
===========================================================
Achievement Module
===========================================================
*/

CREATE TABLE Achievements
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    title NVARCHAR(255) NOT NULL,

    description NVARCHAR(MAX),

    icon NVARCHAR(255),

    xp_reward INT DEFAULT 0,

    created_at DATETIME2 DEFAULT SYSUTCDATETIME()
);
GO

CREATE TABLE UserAchievements
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    user_id UNIQUEIDENTIFIER NOT NULL,

    achievement_id UNIQUEIDENTIFIER NOT NULL,

    earned_at DATETIME2 DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_UserAchievement_User
        FOREIGN KEY(user_id)
        REFERENCES Users(id),

    CONSTRAINT FK_UserAchievement_Achievement
        FOREIGN KEY(achievement_id)
        REFERENCES Achievements(id),

    CONSTRAINT UQ_User_Achievement
        UNIQUE(user_id, achievement_id)
);
GO

/*
===========================================================
Notification Module
===========================================================
*/

CREATE TABLE Notifications
(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    user_id UNIQUEIDENTIFIER NOT NULL,

    title NVARCHAR(255) NOT NULL,

    message NVARCHAR(MAX) NOT NULL,

    notification_type NVARCHAR(50),

    is_read BIT NOT NULL DEFAULT 0,

    created_at DATETIME2 DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_Notification_User
        FOREIGN KEY(user_id)
        REFERENCES Users(id)
);
GO

/*
===========================================================
Indexes
===========================================================
*/

CREATE INDEX IX_Users_Email
ON Users(email);

CREATE INDEX IX_Topics_Domain
ON Topics(domain_id);

CREATE INDEX IX_Questions_Topic
ON Questions(topic_id);

CREATE INDEX IX_Resources_Type
ON Resources(resource_type);

CREATE INDEX IX_AssessmentAttempts_User
ON AssessmentAttempts(user_id);

CREATE INDEX IX_AssessmentAttempts_Assessment
ON AssessmentAttempts(assessment_id);

CREATE INDEX IX_Competencies_User
ON Competencies(user_id);

CREATE INDEX IX_Competencies_Topic
ON Competencies(topic_id);

CREATE INDEX IX_Progress_User
ON Progress(user_id);

CREATE INDEX IX_Recommendations_User
ON Recommendations(user_id);

CREATE INDEX IX_AIConversation_User
ON AIConversations(user_id);

CREATE INDEX IX_Notifications_User
ON Notifications(user_id);
GO

