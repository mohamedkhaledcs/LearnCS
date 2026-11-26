import { one_dimensional_questions } from './one-dimensional';
import { multi_dimensional_questions } from './multi-dimensional';
import { array_operations_questions } from './array-operations';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const arrays_questions: AssessmentQuestion[] = [
  ...one_dimensional_questions,
  ...multi_dimensional_questions,
  ...array_operations_questions
];
