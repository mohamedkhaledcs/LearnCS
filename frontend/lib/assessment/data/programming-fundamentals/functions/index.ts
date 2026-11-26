import { parameters_and_arguments_questions } from './parameters-and-arguments';
import { return_values_questions } from './return-values';
import { scope_questions } from './scope';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const functions_questions: AssessmentQuestion[] = [
  ...parameters_and_arguments_questions,
  ...return_values_questions,
  ...scope_questions
];
