import { kruskal_questions } from './kruskal';
import { prim_questions } from './prim';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const minimum_spanning_tree_questions: AssessmentQuestion[] = [
  ...kruskal_questions,
  ...prim_questions
];
