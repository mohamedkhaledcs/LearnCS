import { fundamentals_questions } from './fundamentals';
import { interval_scheduling_questions } from './interval-scheduling';
import { huffman_coding_questions } from './huffman-coding';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const greedy_algorithms_questions: AssessmentQuestion[] = [
  ...fundamentals_questions,
  ...interval_scheduling_questions,
  ...huffman_coding_questions
];
