import { injective_questions } from './injective';
import { surjective_questions } from './surjective';
import { bijective_questions } from './bijective';
import { composition_questions } from './composition';
import { inverse_functions_questions } from './inverse-functions';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const functions_questions: AssessmentQuestion[] = [
  ...injective_questions,
  ...surjective_questions,
  ...bijective_questions,
  ...composition_questions,
  ...inverse_functions_questions
];
