import { stability_questions } from './stability';
import { in_place_questions } from './in-place';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const fundamentals_questions: AssessmentQuestion[] = [
  ...stability_questions,
  ...in_place_questions
];
