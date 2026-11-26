export interface ConceptMasteryItemDto {
  conceptId: string;
  conceptName: string;
  masteryScore: number;
  confidence: number;
  isMastered: boolean;
  isWeak: boolean;
  totalAttempts: number;
  lastEvaluatedAt: string;
}

export interface LearnerProgressSummaryDto {
  userId: string;
  level: string;
  totalXp: number;
  currentStreakDays: number;
  longestStreakDays: number;
  completedLessonsCount: number;
  masteredConceptsCount: number;
  overallMasteryScore: number;
  topMasteredConcepts: ConceptMasteryItemDto[];
}
