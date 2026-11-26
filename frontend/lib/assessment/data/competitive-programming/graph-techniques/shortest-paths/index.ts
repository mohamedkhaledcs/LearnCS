import { dijkstra_variants_questions } from './dijkstra-variants';
import { bellman_ford_questions } from './bellman-ford';
import { floyd_warshall_questions } from './floyd-warshall';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const shortest_paths_questions: AssessmentQuestion[] = [
  ...dijkstra_variants_questions,
  ...bellman_ford_questions,
  ...floyd_warshall_questions
];
