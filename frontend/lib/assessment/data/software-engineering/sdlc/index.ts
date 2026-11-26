import { requirements_questions } from './requirements';
import { design_questions } from './design';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const sdlc_questions: AssessmentQuestion[] = [
  ...requirements_questions,
  ...design_questions
];
