import { b_trees_questions } from './b-trees';
import { hash_indexes_questions } from './hash-indexes';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const indexing_questions: AssessmentQuestion[] = [
  ...b_trees_questions,
  ...hash_indexes_questions
];
