namespace LearnCS.Domain.Learning;

public enum LearningPathStatus { Draft = 0, Published = 1, Archived = 2 }
public enum LessonType { Text = 0, Video = 1, Interactive = 2, Exercise = 3, Lab = 4 }
public enum LessonStatus { Draft = 0, Published = 1, Archived = 2 }
public enum ResourceType { Article = 0, Video = 1, Book = 2, Documentation = 3, Exercise = 4, CodingProblem = 5, Podcast = 6 }
public enum EnrollmentStatus { Active = 0, Completed = 1, Paused = 2, Dropped = 3 }
public enum LessonProgressStatus { NotStarted = 0, InProgress = 1, Completed = 2 }
public enum ProjectDifficulty { Beginner = 1, Intermediate = 2, Advanced = 3 }
public enum ProjectStatus { Draft = 0, Published = 1, Archived = 2 }
public enum SubmissionStatus { NotStarted = 0, InProgress = 1, Submitted = 2, Reviewed = 3 }
