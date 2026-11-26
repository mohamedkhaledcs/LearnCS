import { arithmetic_questions } from './arithmetic';
import { logical_questions } from './logical';
import { bitwise_questions } from './bitwise';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const operators_and_expressions_questions: AssessmentQuestion[] = [
  ...arithmetic_questions,
  ...logical_questions,
  ...bitwise_questions
];
