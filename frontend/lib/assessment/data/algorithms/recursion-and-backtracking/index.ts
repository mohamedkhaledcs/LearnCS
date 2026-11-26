import { recursion_fundamentals_questions } from './recursion-fundamentals';
import { backtracking_questions } from './backtracking';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const recursion_and_backtracking_questions: AssessmentQuestion[] = [
  ...recursion_fundamentals_questions,
  ...backtracking_questions
];
