import { traversal_questions } from './traversal';
import { insertion_questions } from './insertion';
import { deletion_questions } from './deletion';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const array_operations_questions: AssessmentQuestion[] = [
  ...traversal_questions,
  ...insertion_questions,
  ...deletion_questions
];
