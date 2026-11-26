import { searching_questions } from './searching';
import { sorting_questions } from './sorting';
import { recursion_and_backtracking_questions } from './recursion-and-backtracking';
import { divide_and_conquer_questions } from './divide-and-conquer';
import { greedy_algorithms_questions } from './greedy-algorithms';
import { dynamic_programming_questions } from './dynamic-programming';
import { graph_algorithms_questions } from './graph-algorithms';
import { complexity_analysis_questions } from './complexity-analysis';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const algorithms_questions: AssessmentQuestion[] = [
  ...searching_questions,
  ...sorting_questions,
  ...recursion_and_backtracking_questions,
  ...divide_and_conquer_questions,
  ...greedy_algorithms_questions,
  ...dynamic_programming_questions,
  ...graph_algorithms_questions,
  ...complexity_analysis_questions
];
