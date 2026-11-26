import { os_concepts_questions } from './os-concepts';
import { system_calls_questions } from './system-calls';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const fundamentals_questions: AssessmentQuestion[] = [
  ...os_concepts_questions,
  ...system_calls_questions
];
