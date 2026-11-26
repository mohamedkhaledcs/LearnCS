import { race_conditions_questions } from './race-conditions';
import { synchronization_questions } from './synchronization';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const concurrency_questions: AssessmentQuestion[] = [
  ...race_conditions_questions,
  ...synchronization_questions
];
