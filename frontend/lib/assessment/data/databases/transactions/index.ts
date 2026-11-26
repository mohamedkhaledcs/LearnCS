import { acid_questions } from './acid';
import { concurrency_control_questions } from './concurrency-control';
import { isolation_levels_questions } from './isolation-levels';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const transactions_questions: AssessmentQuestion[] = [
  ...acid_questions,
  ...concurrency_control_questions,
  ...isolation_levels_questions
];
