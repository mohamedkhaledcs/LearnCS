import { conditionals_questions } from './conditionals';
import { loops_questions } from './loops';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const control_structures_questions: AssessmentQuestion[] = [
  ...conditionals_questions,
  ...loops_questions
];
