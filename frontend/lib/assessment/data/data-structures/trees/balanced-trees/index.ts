import { avl_questions } from './avl';
import { red_black_questions } from './red-black';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const balanced_trees_questions: AssessmentQuestion[] = [
  ...avl_questions,
  ...red_black_questions
];
