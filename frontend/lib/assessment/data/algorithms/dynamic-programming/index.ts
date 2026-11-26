import { fundamentals_questions } from './fundamentals';
import { _1d_dp_questions } from './1d-dp';
import { _2d_dp_questions } from './2d-dp';
import { knapsack_questions } from './knapsack';
import { subsequences_questions } from './subsequences';
import { interval_dp_questions } from './interval-dp';
import { bitmask_dp_questions } from './bitmask-dp';
import { tree_dp_questions } from './tree-dp';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const dynamic_programming_questions: AssessmentQuestion[] = [
  ...fundamentals_questions,
  ..._1d_dp_questions,
  ..._2d_dp_questions,
  ...knapsack_questions,
  ...subsequences_questions,
  ...interval_dp_questions,
  ...bitmask_dp_questions,
  ...tree_dp_questions
];
