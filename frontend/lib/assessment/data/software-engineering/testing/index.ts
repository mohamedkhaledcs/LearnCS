import { unit_testing_questions } from './unit-testing';
import { integration_testing_questions } from './integration-testing';
import { system_testing_questions } from './system-testing';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const testing_questions: AssessmentQuestion[] = [
  ...unit_testing_questions,
  ...integration_testing_questions,
  ...system_testing_questions
];
