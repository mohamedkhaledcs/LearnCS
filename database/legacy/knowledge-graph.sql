/*
===============================================================================
Project     : LearnCS
Database    : Microsoft SQL Server 2022
Description : Creates the Knowledge Graph structure for the LearnCS platform.
===============================================================================
*/

USE LearnCS;
GO

SET NOCOUNT ON;
GO

-- =============================================================================
-- Table: Domains
-- Description: High-level learning domains.
-- =============================================================================

CREATE TABLE Domains
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_Domains
        PRIMARY KEY
        DEFAULT NEWID(),

    name NVARCHAR(150)
        NOT NULL,

    slug NVARCHAR(150)
        NOT NULL,

    description NVARCHAR(1000)
        NULL,

    display_order INT
        NOT NULL
        CONSTRAINT DF_Domains_DisplayOrder
        DEFAULT (0),

    is_active BIT
        NOT NULL
        CONSTRAINT DF_Domains_IsActive
        DEFAULT (1),

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_Domains_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2
        NULL,

    CONSTRAINT UQ_Domains_Name
        UNIQUE(name),

    CONSTRAINT UQ_Domains_Slug
        UNIQUE(slug)
);
GO

CREATE INDEX IX_Domains_DisplayOrder
ON Domains(display_order);
GO

-- =============================================================================
-- Table: Subjects
-- Description: Subjects that belong to a domain.
-- =============================================================================

CREATE TABLE Subjects
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_Subjects
        PRIMARY KEY
        DEFAULT NEWID(),

    domain_id UNIQUEIDENTIFIER
        NOT NULL,

    name NVARCHAR(150)
        NOT NULL,

    slug NVARCHAR(150)
        NOT NULL,

    description NVARCHAR(1000)
        NULL,

    display_order INT
        NOT NULL
        CONSTRAINT DF_Subjects_DisplayOrder
        DEFAULT (0),

    is_active BIT
        NOT NULL
        CONSTRAINT DF_Subjects_IsActive
        DEFAULT (1),

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_Subjects_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2
        NULL,

    CONSTRAINT FK_Subjects_Domains
        FOREIGN KEY(domain_id)
        REFERENCES Domains(id)
        ON DELETE CASCADE,

    CONSTRAINT UQ_Subjects_Domain_Name
        UNIQUE(domain_id, name),

    CONSTRAINT UQ_Subjects_Slug
        UNIQUE(slug)
);
GO

CREATE INDEX IX_Subjects_DomainId
ON Subjects(domain_id);
GO

-- =============================================================================
-- Table: Topics
-- Description: Topics that belong to a subject.
-- =============================================================================

CREATE TABLE Topics
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_Topics
        PRIMARY KEY
        DEFAULT NEWID(),

    subject_id UNIQUEIDENTIFIER
        NOT NULL,

    parent_topic_id UNIQUEIDENTIFIER
        NULL,

    name NVARCHAR(200)
        NOT NULL,

    slug NVARCHAR(200)
        NOT NULL,

    description NVARCHAR(2000)
        NULL,

    difficulty_level TINYINT
        NOT NULL
        CONSTRAINT DF_Topics_Difficulty
        DEFAULT (1),

    estimated_minutes INT
        NULL,

    display_order INT
        NOT NULL
        CONSTRAINT DF_Topics_DisplayOrder
        DEFAULT (0),

    is_active BIT
        NOT NULL
        CONSTRAINT DF_Topics_IsActive
        DEFAULT (1),

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_Topics_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2
        NULL,

    CONSTRAINT FK_Topics_Subjects
        FOREIGN KEY(subject_id)
        REFERENCES Subjects(id)
        ON DELETE CASCADE,

    CONSTRAINT FK_Topics_Parent
        FOREIGN KEY(parent_topic_id)
        REFERENCES Topics(id),

    CONSTRAINT UQ_Topics_Subject_Name
        UNIQUE(subject_id, name),

    CONSTRAINT UQ_Topics_Slug
        UNIQUE(slug),

    CONSTRAINT CK_Topics_Difficulty
        CHECK (difficulty_level BETWEEN 1 AND 5)
);
GO

CREATE INDEX IX_Topics_SubjectId
ON Topics(subject_id);
GO

CREATE INDEX IX_Topics_Parent
ON Topics(parent_topic_id);
GO

-- =============================================================================
-- Table: Concepts
-- Description: Stores atomic learning concepts within topics.
-- =============================================================================

CREATE TABLE Concepts
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_Concepts
        PRIMARY KEY
        DEFAULT NEWID(),

    topic_id UNIQUEIDENTIFIER
        NOT NULL,

    parent_concept_id UNIQUEIDENTIFIER
        NULL,

    name NVARCHAR(200)
        NOT NULL,

    slug NVARCHAR(200)
        NOT NULL,

    description NVARCHAR(4000)
        NULL,

    difficulty_level TINYINT
        NOT NULL
        CONSTRAINT DF_Concepts_Difficulty
        DEFAULT (1),

    estimated_minutes INT
        NULL,

    display_order INT
        NOT NULL
        CONSTRAINT DF_Concepts_DisplayOrder
        DEFAULT (0),

    is_active BIT
        NOT NULL
        CONSTRAINT DF_Concepts_IsActive
        DEFAULT (1),

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_Concepts_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2
        NULL,

    CONSTRAINT FK_Concepts_Topics
        FOREIGN KEY(topic_id)
        REFERENCES Topics(id)
        ON DELETE CASCADE,

    CONSTRAINT FK_Concepts_Parent
        FOREIGN KEY(parent_concept_id)
        REFERENCES Concepts(id),

    CONSTRAINT UQ_Concepts_Topic_Name
        UNIQUE(topic_id, name),

    CONSTRAINT UQ_Concepts_Slug
        UNIQUE(slug),

    CONSTRAINT CK_Concepts_Difficulty
        CHECK(difficulty_level BETWEEN 1 AND 5)
);
GO

CREATE INDEX IX_Concepts_TopicId
ON Concepts(topic_id);
GO

CREATE INDEX IX_Concepts_Parent
ON Concepts(parent_concept_id);
GO

CREATE INDEX IX_Concepts_Difficulty
ON Concepts(difficulty_level);
GO

-- =============================================================================
-- Table: ConceptRelations
-- Description: Stores relationships between concepts.
-- =============================================================================

CREATE TABLE ConceptRelations
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_ConceptRelations
        PRIMARY KEY
        DEFAULT NEWID(),

    source_concept_id UNIQUEIDENTIFIER
        NOT NULL,

    target_concept_id UNIQUEIDENTIFIER
        NOT NULL,

    relation_type TINYINT
        NOT NULL,

    weight DECIMAL(5,2)
        NOT NULL
        CONSTRAINT DF_ConceptRelations_Weight
        DEFAULT (1.00),

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_ConceptRelations_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_ConceptRelations_Source
        FOREIGN KEY(source_concept_id)
        REFERENCES Concepts(id)
        ON DELETE CASCADE,

    CONSTRAINT FK_ConceptRelations_Target
        FOREIGN KEY(target_concept_id)
        REFERENCES Concepts(id)
        ON DELETE CASCADE,

    CONSTRAINT UQ_ConceptRelations
        UNIQUE(source_concept_id, target_concept_id, relation_type),

    CONSTRAINT CK_ConceptRelations_Type
        CHECK(relation_type BETWEEN 1 AND 10)
);
GO

CREATE INDEX IX_ConceptRelations_Source
ON ConceptRelations(source_concept_id);
GO

CREATE INDEX IX_ConceptRelations_Target
ON ConceptRelations(target_concept_id);
GO

CREATE INDEX IX_ConceptRelations_Type
ON ConceptRelations(relation_type);
GO

-- =============================================================================
-- Table: Prerequisites
-- Description: Stores prerequisite relationships between concepts.
-- =============================================================================

CREATE TABLE Prerequisites
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_Prerequisites
        PRIMARY KEY
        DEFAULT NEWID(),

    concept_id UNIQUEIDENTIFIER
        NOT NULL,

    prerequisite_concept_id UNIQUEIDENTIFIER
        NOT NULL,

    is_required BIT
        NOT NULL
        CONSTRAINT DF_Prerequisites_IsRequired
        DEFAULT (1),

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_Prerequisites_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_Prerequisites_Concept
        FOREIGN KEY(concept_id)
        REFERENCES Concepts(id)
        ON DELETE CASCADE,

    CONSTRAINT FK_Prerequisites_Prerequisite
        FOREIGN KEY(prerequisite_concept_id)
        REFERENCES Concepts(id)
        ON DELETE NO ACTION,

    CONSTRAINT UQ_Prerequisites
        UNIQUE(concept_id, prerequisite_concept_id)
);
GO

CREATE INDEX IX_Prerequisites_ConceptId
ON Prerequisites(concept_id);
GO

CREATE INDEX IX_Prerequisites_PrerequisiteId
ON Prerequisites(prerequisite_concept_id);
GO

-- =============================================================================
-- Table: LearningObjectives
-- Description: Stores measurable learning objectives.
-- =============================================================================

CREATE TABLE LearningObjectives
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_LearningObjectives
        PRIMARY KEY
        DEFAULT NEWID(),

    concept_id UNIQUEIDENTIFIER
        NOT NULL,

    title NVARCHAR(300)
        NOT NULL,

    description NVARCHAR(2000)
        NULL,

    bloom_level TINYINT
        NOT NULL,

    display_order INT
        NOT NULL
        CONSTRAINT DF_LearningObjectives_DisplayOrder
        DEFAULT (0),

    is_active BIT
        NOT NULL
        CONSTRAINT DF_LearningObjectives_IsActive
        DEFAULT (1),

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_LearningObjectives_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    updated_at DATETIME2
        NULL,

    CONSTRAINT FK_LearningObjectives_Concepts
        FOREIGN KEY(concept_id)
        REFERENCES Concepts(id)
        ON DELETE CASCADE,

    CONSTRAINT CK_LearningObjectives_Bloom
        CHECK(bloom_level BETWEEN 1 AND 6)
);
GO

CREATE INDEX IX_LearningObjectives_ConceptId
ON LearningObjectives(concept_id);
GO

CREATE INDEX IX_LearningObjectives_Bloom
ON LearningObjectives(bloom_level);
GO

-- =============================================================================
-- Table: ConceptAliases
-- Description: Stores alternative names and synonyms for concepts.
-- =============================================================================

CREATE TABLE ConceptAliases
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_ConceptAliases
        PRIMARY KEY
        DEFAULT NEWID(),

    concept_id UNIQUEIDENTIFIER
        NOT NULL,

    alias NVARCHAR(255)
        NOT NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_ConceptAliases_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_ConceptAliases_Concepts
        FOREIGN KEY(concept_id)
        REFERENCES Concepts(id)
        ON DELETE CASCADE,

    CONSTRAINT UQ_ConceptAliases
        UNIQUE(concept_id, alias)
);
GO

CREATE INDEX IX_ConceptAliases_ConceptId
ON ConceptAliases(concept_id);
GO

CREATE INDEX IX_ConceptAliases_Alias
ON ConceptAliases(alias);
GO

-- =============================================================================
-- Table: Tags
-- Description: Stores reusable tags across the platform.
-- =============================================================================

CREATE TABLE Tags
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_Tags
        PRIMARY KEY
        DEFAULT NEWID(),

    name NVARCHAR(100)
        NOT NULL,

    slug NVARCHAR(100)
        NOT NULL,

    color NVARCHAR(20)
        NULL,

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

-- =============================================================================
-- Table: ConceptTags
-- Description: Maps concepts to tags.
-- =============================================================================

CREATE TABLE ConceptTags
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_ConceptTags
        PRIMARY KEY
        DEFAULT NEWID(),

    concept_id UNIQUEIDENTIFIER
        NOT NULL,

    tag_id UNIQUEIDENTIFIER
        NOT NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_ConceptTags_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_ConceptTags_Concepts
        FOREIGN KEY(concept_id)
        REFERENCES Concepts(id)
        ON DELETE CASCADE,

    CONSTRAINT FK_ConceptTags_Tags
        FOREIGN KEY(tag_id)
        REFERENCES Tags(id)
        ON DELETE CASCADE,

    CONSTRAINT UQ_ConceptTags
        UNIQUE(concept_id, tag_id)
);
GO

CREATE INDEX IX_ConceptTags_ConceptId
ON ConceptTags(concept_id);
GO

CREATE INDEX IX_ConceptTags_TagId
ON ConceptTags(tag_id);
GO

-- =============================================================================
-- Table: TopicTags
-- Description: Maps topics to tags.
-- =============================================================================

CREATE TABLE TopicTags
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_TopicTags
        PRIMARY KEY
        DEFAULT NEWID(),

    topic_id UNIQUEIDENTIFIER
        NOT NULL,

    tag_id UNIQUEIDENTIFIER
        NOT NULL,

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_TopicTags_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_TopicTags_Topics
        FOREIGN KEY(topic_id)
        REFERENCES Topics(id)
        ON DELETE CASCADE,

    CONSTRAINT FK_TopicTags_Tags
        FOREIGN KEY(tag_id)
        REFERENCES Tags(id)
        ON DELETE CASCADE,

    CONSTRAINT UQ_TopicTags
        UNIQUE(topic_id, tag_id)
);
GO

CREATE INDEX IX_TopicTags_TopicId
ON TopicTags(topic_id);
GO

CREATE INDEX IX_TopicTags_TagId
ON TopicTags(tag_id);
GO

-- =============================================================================
-- Table: TopicResources
-- Description: Links learning resources to topics.
-- =============================================================================

CREATE TABLE TopicResources
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_TopicResources
        PRIMARY KEY
        DEFAULT NEWID(),

    topic_id UNIQUEIDENTIFIER
        NOT NULL,

    resource_id UNIQUEIDENTIFIER
        NOT NULL,

    display_order INT
        NOT NULL
        CONSTRAINT DF_TopicResources_DisplayOrder
        DEFAULT (0),

    is_required BIT
        NOT NULL
        CONSTRAINT DF_TopicResources_IsRequired
        DEFAULT (0),

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_TopicResources_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_TopicResources_Topics
        FOREIGN KEY(topic_id)
        REFERENCES Topics(id)
        ON DELETE CASCADE,

    CONSTRAINT FK_TopicResources_Resources
        FOREIGN KEY(resource_id)
        REFERENCES Resources(id)
        ON DELETE CASCADE,

    CONSTRAINT UQ_TopicResources
        UNIQUE(topic_id, resource_id)
);
GO

CREATE INDEX IX_TopicResources_TopicId
ON TopicResources(topic_id);
GO

CREATE INDEX IX_TopicResources_ResourceId
ON TopicResources(resource_id);
GO

-- =============================================================================
-- Table: ConceptResources
-- Description: Links learning resources to concepts.
-- =============================================================================

CREATE TABLE ConceptResources
(
    id UNIQUEIDENTIFIER
        CONSTRAINT PK_ConceptResources
        PRIMARY KEY
        DEFAULT NEWID(),

    concept_id UNIQUEIDENTIFIER
        NOT NULL,

    resource_id UNIQUEIDENTIFIER
        NOT NULL,

    display_order INT
        NOT NULL
        CONSTRAINT DF_ConceptResources_DisplayOrder
        DEFAULT (0),

    is_required BIT
        NOT NULL
        CONSTRAINT DF_ConceptResources_IsRequired
        DEFAULT (0),

    created_at DATETIME2
        NOT NULL
        CONSTRAINT DF_ConceptResources_CreatedAt
        DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_ConceptResources_Concepts
        FOREIGN KEY(concept_id)
        REFERENCES Concepts(id)
        ON DELETE CASCADE,

    CONSTRAINT FK_ConceptResources_Resources
        FOREIGN KEY(resource_id)
        REFERENCES Resources(id)
        ON DELETE CASCADE,

    CONSTRAINT UQ_ConceptResources
        UNIQUE(concept_id, resource_id)
);
GO

CREATE INDEX IX_ConceptResources_ConceptId
ON ConceptResources(concept_id);
GO

CREATE INDEX IX_ConceptResources_ResourceId
ON ConceptResources(resource_id);
GO

