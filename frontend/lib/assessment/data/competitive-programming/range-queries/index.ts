import { segment_tree_questions } from './segment-tree';
import { fenwick_tree_questions } from './fenwick-tree';
import { sparse_table_questions } from './sparse-table';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const range_queries_questions: AssessmentQuestion[] = [
  ...segment_tree_questions,
  ...fenwick_tree_questions,
  ...sparse_table_questions
];
