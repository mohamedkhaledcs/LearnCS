import { chaining_questions } from './chaining';
import { open_addressing_questions } from './open-addressing';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const collision_resolution_questions: AssessmentQuestion[] = [
  ...chaining_questions,
  ...open_addressing_questions
];
