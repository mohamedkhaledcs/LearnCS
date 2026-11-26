import { bubble_sort_questions } from './bubble-sort';
import { selection_sort_questions } from './selection-sort';
import { insertion_sort_questions } from './insertion-sort';
import { merge_sort_questions } from './merge-sort';
import { quick_sort_questions } from './quick-sort';
import { heap_sort_questions } from './heap-sort';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const comparison_sorts_questions: AssessmentQuestion[] = [
  ...bubble_sort_questions,
  ...selection_sort_questions,
  ...insertion_sort_questions,
  ...merge_sort_questions,
  ...quick_sort_questions,
  ...heap_sort_questions
];
