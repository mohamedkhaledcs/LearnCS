import { boolean_expressions_questions } from './boolean-expressions';
import { boolean_laws_questions } from './boolean-laws';
import { simplification_questions } from './simplification';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const boolean_algebra_questions: AssessmentQuestion[] = [
  ...boolean_expressions_questions,
  ...boolean_laws_questions,
  ...simplification_questions
];
