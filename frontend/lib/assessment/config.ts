import { AssessmentConfig } from "./schema";

export const ASSESSMENT_CONFIG: AssessmentConfig = {
  minQuestions: 50,
  defaultQuestions: 75,
  maxQuestions: 100,
  difficultyDistribution: {
    easy: 0.25,
    medium: 0.5,
    hard: 0.25,
  },
};
