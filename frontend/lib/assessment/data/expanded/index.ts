import { PART1_QUESTIONS, PART1_UNIT_MAP } from "./part1-foundations-oop";
import { PART2_QUESTIONS, PART2_UNIT_MAP } from "./part2-ds-algo";
import { PART3_QUESTIONS, PART3_UNIT_MAP } from "./part3-cp-db-systems";
import type { AssessmentQuestion } from "@/lib/assessment/schema";

export const EXPANDED_QUESTIONS: AssessmentQuestion[] = [
  ...PART1_QUESTIONS,
  ...PART2_QUESTIONS,
  ...PART3_QUESTIONS
];

export const EXPANDED_UNIT_QUESTION_MAP: Record<string, string[]> = {
  ...PART1_UNIT_MAP,
  ...PART2_UNIT_MAP,
  ...PART3_UNIT_MAP
};
