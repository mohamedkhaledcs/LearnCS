namespace LearnCS.Domain.Knowledge;

public enum ConceptDifficulty
{
    Beginner = 1,
    Elementary = 2,
    Intermediate = 3,
    Advanced = 4,
    Expert = 5
}

public enum ConceptStatus
{
    Draft = 0,
    Published = 1,
    Archived = 2
}

public enum RelationType
{
    Prerequisite = 1,   // Source must be learned before Target
    BuildsOn = 2,       // Target extends Source
    Related = 3,        // Conceptually related
    PartOf = 4          // Source is a component of Target
}

public enum BloomLevel
{
    Remember = 1,
    Understand = 2,
    Apply = 3,
    Analyze = 4,
    Evaluate = 5,
    Create = 6
}
