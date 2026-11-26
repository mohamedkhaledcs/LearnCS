import { counting_sort_questions } from './counting-sort';
import { radix_sort_questions } from './radix-sort';
import { bucket_sort_questions } from './bucket-sort';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const non_comparison_sorts_questions: AssessmentQuestion[] = [
  ...counting_sort_questions,
  ...radix_sort_questions,
  ...bucket_sort_questions
];
