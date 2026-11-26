import { composition_questions } from './composition';
import { aggregation_questions } from './aggregation';
import { association_questions } from './association';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const relationships_questions: AssessmentQuestion[] = [
  ...composition_questions,
  ...aggregation_questions,
  ...association_questions
];
