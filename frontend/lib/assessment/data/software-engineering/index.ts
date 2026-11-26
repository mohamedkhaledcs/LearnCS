import { sdlc_questions } from './sdlc';
import { methodologies_questions } from './methodologies';
import { testing_questions } from './testing';
import { version_control_questions } from './version-control';
import { design_patterns_questions } from './design-patterns';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const software_engineering_questions: AssessmentQuestion[] = [
  ...sdlc_questions,
  ...methodologies_questions,
  ...testing_questions,
  ...version_control_questions,
  ...design_patterns_questions
];
