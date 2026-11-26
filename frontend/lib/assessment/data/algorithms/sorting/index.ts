import { fundamentals_questions } from './fundamentals';
import { comparison_sorts_questions } from './comparison-sorts';
import { non_comparison_sorts_questions } from './non-comparison-sorts';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const sorting_questions: AssessmentQuestion[] = [
  ...fundamentals_questions,
  ...comparison_sorts_questions,
  ...non_comparison_sorts_questions
];
