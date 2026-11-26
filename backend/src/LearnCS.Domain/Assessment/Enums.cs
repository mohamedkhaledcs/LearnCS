namespace LearnCS.Domain.Assessment;

public enum AssessmentType
{
    Initial = 0,        // Onboarding assessment to determine starting level
    Placement = 1,      // Placement test for a specific path
    ConceptQuiz = 2,    // Quiz on specific concepts after lessons
    Practice = 3,       // Practice problems
    Career = 4          // Career discovery assessment
}

public enum AssessmentStatus { Draft = 0, Published = 1, Archived = 2 }

public enum QuestionType
{
    MultipleChoice = 0,
    TrueFalse = 1,
    ShortAnswer = 2,
    Coding = 3
}

public enum QuestionDifficulty { Easy = 1, Medium = 2, Hard = 3 }

public enum AttemptStatus { InProgress = 0, Completed = 1, Abandoned = 2, TimedOut = 3 }
