import { two_pointers_questions } from './two-pointers';
import { sliding_window_questions } from './sliding-window';
import { prefix_sums_questions } from './prefix-sums';
import { difference_arrays_questions } from './difference-arrays';
import { coordinate_compression_questions } from './coordinate-compression';
import { meet_in_the_middle_questions } from './meet-in-the-middle';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const techniques_questions: AssessmentQuestion[] = [
  ...two_pointers_questions,
  ...sliding_window_questions,
  ...prefix_sums_questions,
  ...difference_arrays_questions,
  ...coordinate_compression_questions,
  ...meet_in_the_middle_questions
];
