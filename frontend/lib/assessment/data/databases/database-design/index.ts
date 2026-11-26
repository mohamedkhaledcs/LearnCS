import { er_modeling_questions } from './er-modeling';
import { normalization_questions } from './normalization';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const database_design_questions: AssessmentQuestion[] = [
  ...er_modeling_questions,
  ...normalization_questions
];
