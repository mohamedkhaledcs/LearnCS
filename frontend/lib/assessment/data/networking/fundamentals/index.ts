import { network_concepts_questions } from './network-concepts';
import { topologies_questions } from './topologies';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const fundamentals_questions: AssessmentQuestion[] = [
  ...network_concepts_questions,
  ...topologies_questions
];
