export type QuestionDifficulty = "easy" | "medium" | "hard";
export type QuestionType =
  | "single-choice"
  | "multiple-choice"
  | "code-output"
  | "code-trace"
  | "complexity"
  | "debugging"
  | "scenario"
  | "concept";

export type LocalizedString = {
  en: string;
  ar: string;
};

export type QuestionOption = {
  id: string;
  text: LocalizedString;
};

export type AssessmentQuestion = {
  id: string;
  language: "en" | "ar" | "both";

  domain: string;
  topic: string;
  subtopic: string;
  specialization?: string;

  difficulty: QuestionDifficulty;
  type: QuestionType;

  // The code snippet (optional)
  codeSnippet?: string;
  codeLanguage?: string;

  question: LocalizedString;
  options: QuestionOption[];

  // This will be stripped out before sending to client
  correctAnswer: string | string[];

  explanation?: LocalizedString;
  tags?: string[];
  prerequisites?: string[];
  estimatedTime?: number; // in seconds

  statistics?: {
    attempts?: number;
    correctRate?: number;
    discrimination?: number;
  };
};

export type AssessmentConfig = {
  minQuestions: number;
  defaultQuestions: number;
  maxQuestions: number;
  difficultyDistribution: Record<QuestionDifficulty, number>; // e.g. { easy: 0.25, medium: 0.5, hard: 0.25 }
};

export type PublicQuestion = Omit<AssessmentQuestion, "correctAnswer" | "explanation" | "statistics">;

export type AssessmentSession = {
  sessionId: string;
  startTime: string;
  questions: PublicQuestion[];
};

export type SubmittedAnswer = {
  questionId: string;
  answer: string | string[];
};

export type TopicScore = {
  topic: string;
  score: number;
  max: number;
  percentage: number;
  level: "insufficient_data" | "emerging" | "developing" | "strong";
};

export type DomainScore = {
  domain: string;
  score: number;
  max: number;
  percentage: number;
  topics: TopicScore[];
};

export type WeakTopicGap = {
  domain: string;
  topic: string;
  percentage: number;
};

export type DiagnosticPathRecommendation = {
  pathId: string;
  title: LocalizedString;
  reason: LocalizedString;
  missingPrerequisites: LocalizedString[];
  startUnitId: string;
  priority: number;
};

export type AssessmentResult = {
  sessionId: string;
  overallScore: number;
  maxScore: number;
  percentage: number;
  domains: DomainScore[];
  recommendedLevel?: "beginner" | "intermediate" | "advanced";
  strongDomains?: string[];
  weakDomains?: string[];
  weakTopics?: WeakTopicGap[];
  recommendedPaths?: DiagnosticPathRecommendation[];
};
