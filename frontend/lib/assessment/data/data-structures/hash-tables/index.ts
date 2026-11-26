import { hash_functions_questions } from './hash-functions';
import { collision_resolution_questions } from './collision-resolution';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const hash_tables_questions: AssessmentQuestion[] = [
  ...hash_functions_questions,
  ...collision_resolution_questions
];
