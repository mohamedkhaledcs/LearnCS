export type LocalizedString = {
  en: string;
  ar: string;
};

export type ContentSectionType =
  | "theory"
  | "example"
  | "code"
  | "video"
  | "exercise"
  | "interactive"
  | "pitfalls"
  | "summary"
  | "quiz";

export type SectionQuestionOption = {
  id: string;
  text: LocalizedString;
};

export type SectionQuestion = {
  id: string;
  question: LocalizedString;
  options: SectionQuestionOption[];
  correctAnswerId: string;
  explanation: LocalizedString;
};

export type SectionWorkedExample = {
  title: LocalizedString;
  description: LocalizedString;
  code?: string;
  language?: string;
  output?: string;
};

export type ContentSection = {
  id: string;
  type: ContentSectionType;
  title?: LocalizedString;
  content?: any;
  codeSnippet?: string;
  codeLanguage?: string;
  codeExplanation?: LocalizedString;
  expectedOutput?: string;
  examples?: SectionWorkedExample[];
  pitfalls?: LocalizedString[];
  interactiveModuleId?: string;
  isRequired: boolean;
  questions?: SectionQuestion[];
};

export type ExternalReference = {
  title: string;
  url: string;
  type: "article" | "video" | "documentation" | "practice_problem" | "cp_platform" | "roadmap";
  source?: string;
  category?: string;
  language?: "en" | "ar" | "bilingual";
  description?: LocalizedString;
  difficulty?: string;
  tags?: string[];
};

/**
 * A Reusable Learning Unit is a specific layer or segment of learning
 * for a broader Canonical Concept.
 * e.g., 'unit-binary-search-foundations', 'unit-binary-search-cp-patterns'
 */
export type ReusableLearningUnit = {
  id: string;

  title: LocalizedString;
  description: LocalizedString;

  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedMinutes: number;

  tags: string[];

  /**
   * Defines learning objectives in English and Arabic.
   */
  objectives?: {
    en: string[];
    ar: string[];
  };

  /**
   * Final unit mastery quiz policy.
   */
  quizConfig?: {
    passPercentage: number;
    questionCount: number;
  };

  publishStatus?: "draft" | "review" | "published";
  version?: number;
  isFreeTier?: boolean;

  /**
   * Defines prerequisites required before unlocking this unit.
   */
  prerequisites?: import("./prerequisites").PrerequisiteRule[];

  /**
   * Educational content like theory, code examples.
   */
  sections: ContentSection[];

  /**
   * References to interactive modules defined in the interactive schema.
   */
  interactiveModuleIds?: string[];

  /**
   * Links to the Assessment Question Bank.
   * e.g., ['AL-SEARCH-M-002', 'AL-SEARCH-H-003']
   */
  assessmentQuestionIds?: string[];

  /**
   * External resources for further reading or CP problem practice.
   */
  externalReferences?: ExternalReference[];
};

/**
 * The overarching concept that groups multiple learning units/layers together.
 * e.g., 'concept-binary-search', 'concept-arrays'
 */
export type CanonicalConcept = {
  id: string;
  
  title: LocalizedString;
  description: LocalizedString;
  
  /**
   * The different depth layers/segments for this concept.
   */
  units: ReusableLearningUnit[];
};
