import { AssessmentQuestion, QuestionDifficulty, QuestionType } from "@/lib/assessment/schema";

interface BilingualPair {
  en: string;
  ar: string;
}

export interface CompactQuestionSpec {
  id: string;
  domain: string;
  topic: string;
  subtopic: string;
  difficulty: QuestionDifficulty;
  type: QuestionType;
  slotIndex: 0 | 1 | 2 | 3;
  codeSnippet?: string;
  codeLanguage?: string;
  question: BilingualPair;
  correct: BilingualPair;
  distractors: [BilingualPair, BilingualPair, BilingualPair];
  explanation: BilingualPair;
}

export function buildExpandedQuestion(spec: CompactQuestionSpec): AssessmentQuestion {
  const keys = ["a", "b", "c", "d"] as const;
  const slots: BilingualPair[] = [spec.distractors[0], spec.distractors[1], spec.distractors[2]];
  slots.splice(spec.slotIndex, 0, spec.correct);
  const correctKey = keys[spec.slotIndex];

  return {
    id: spec.id,
    language: "both",
    domain: spec.domain,
    topic: spec.topic,
    subtopic: spec.subtopic,
    difficulty: spec.difficulty,
    type: spec.type,
    ...(spec.codeSnippet ? { codeSnippet: spec.codeSnippet, codeLanguage: spec.codeLanguage || "cpp" } : {}),
    question: spec.question,
    options: slots.map((text, idx) => ({ id: keys[idx], text })),
    correctAnswer: correctKey,
    explanation: spec.explanation
  };
}
