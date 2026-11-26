import { kmp_questions } from './kmp';
import { z_algorithm_questions } from './z-algorithm';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const pattern_matching_questions: AssessmentQuestion[] = [
  ...kmp_questions,
  ...z_algorithm_questions
];
