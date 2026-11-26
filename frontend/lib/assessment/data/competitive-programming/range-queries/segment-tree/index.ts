import { basic_questions } from './basic';
import { lazy_propagation_questions } from './lazy-propagation';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const segment_tree_questions: AssessmentQuestion[] = [
  ...basic_questions,
  ...lazy_propagation_questions
];
