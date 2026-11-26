import { lca_questions } from './lca';
import { tree_diameter_questions } from './tree-diameter';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const trees_questions: AssessmentQuestion[] = [
  ...lca_questions,
  ...tree_diameter_questions
];
