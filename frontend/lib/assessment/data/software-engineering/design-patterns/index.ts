import { creational_questions } from './creational';
import { structural_questions } from './structural';
import { behavioral_questions } from './behavioral';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const design_patterns_questions: AssessmentQuestion[] = [
  ...creational_questions,
  ...structural_questions,
  ...behavioral_questions
];
