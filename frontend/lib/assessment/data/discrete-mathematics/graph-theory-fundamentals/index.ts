import { graph_properties_questions } from './graph-properties';
import { paths_questions } from './paths';
import { cycles_questions } from './cycles';
import { trees_questions } from './trees';
import { bipartite_graphs_questions } from './bipartite-graphs';
import { connectivity_questions } from './connectivity';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const graph_theory_fundamentals_questions: AssessmentQuestion[] = [
  ...graph_properties_questions,
  ...paths_questions,
  ...cycles_questions,
  ...trees_questions,
  ...bipartite_graphs_questions,
  ...connectivity_questions
];
