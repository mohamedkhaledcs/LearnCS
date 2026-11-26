export type ProgressStatus = "not_started" | "in_progress" | "completed" | "mastered";

export type LearningUnitProgress = {
  /**
   * IMPORTANT: Progress is tied to the ReusableLearningUnit, NOT the path.
   * If a user masters 'unit-binary-search-foundations', this single record reflects it everywhere.
   */
  unitId: string;
  userId: string;
  
  status: ProgressStatus;
  
  /**
   * A 0-100 score reflecting confidence or assessment results for this specific unit.
   */
  masteryScore?: number;
  
  startedAt?: string;
  completedAt?: string;
  lastEvaluatedAt?: string;
};

export type LearningPathProgress = {
  pathId: string;
  userId: string;
  
  status: ProgressStatus;
  
  /**
   * The percentage of canonical units within this path that the user has completed.
   * This is calculated dynamically from CanonicalUnitProgress, not stored statically.
   */
  calculatedCompletionPercentage: number;
  
  startedAt?: string;
  completedAt?: string;
};
