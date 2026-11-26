import { linear_search_questions } from './linear-search';
import { binary_search_questions } from './binary-search';
import { ternary_search_questions } from './ternary-search';
import { interpolation_search_questions } from './interpolation-search';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const searching_questions: AssessmentQuestion[] = [
  ...linear_search_questions,
  ...binary_search_questions,
  ...ternary_search_questions,
  ...interpolation_search_questions
];
