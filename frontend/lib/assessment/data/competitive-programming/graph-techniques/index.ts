import { shortest_paths_questions } from './shortest-paths';
import { trees_questions } from './trees';
import { dsu_questions } from './dsu';
import { topological_sorting_questions } from './topological-sorting';
import { scc_questions } from './scc';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const graph_techniques_questions: AssessmentQuestion[] = [
  ...shortest_paths_questions,
  ...trees_questions,
  ...dsu_questions,
  ...topological_sorting_questions,
  ...scc_questions
];
