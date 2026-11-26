import { prevention_questions } from './prevention';
import { avoidance_questions } from './avoidance';
import { detection_questions } from './detection';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const deadlocks_questions: AssessmentQuestion[] = [
  ...prevention_questions,
  ...avoidance_questions,
  ...detection_questions
];
