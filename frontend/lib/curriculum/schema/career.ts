import { LocalizedString } from "./concept";

export type CareerPreferenceDimension = 
  | "frontend"
  | "backend"
  | "mobile"
  | "ai_ml"
  | "cybersecurity"
  | "data_engineering"
  | "devops"
  | "game_development"
  | "systems_programming";

export type CareerPreferenceQuestion = {
  id: string;
  questionText: LocalizedString;
  
  options: {
    id: string;
    text: LocalizedString;
    /**
     * The signals applied to different dimensions if the user chooses this option.
     * e.g., { backend: 2, devops: 1, frontend: -1 }
     */
    signals: Partial<Record<CareerPreferenceDimension, number>>;
  }[];
};

export type CareerTrack = {
  id: CareerPreferenceDimension;
  title: LocalizedString;
  description: LocalizedString;
  
  /**
   * The learning paths recommended for this career track.
   * e.g., ['programming-fundamentals', 'data-structures', 'backend-engineering']
   */
  recommendedPathIds: string[];
  
  /**
   * Key skills that will be developed in this track.
   */
  keySkills: string[];
};

export type CareerExplorationResult = {
  userId: string;
  
  /**
   * Accumulated scores for each dimension based on user answers.
   */
  dimensionScores: Record<CareerPreferenceDimension, number>;
  
  /**
   * The top N recommended tracks ordered by score.
   */
  topRecommendations: CareerPreferenceDimension[];
};
