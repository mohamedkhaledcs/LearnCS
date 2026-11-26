import { dijkstra_questions } from './dijkstra';
import { bellman_ford_questions } from './bellman-ford';
import { floyd_warshall_questions } from './floyd-warshall';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const shortest_path_questions: AssessmentQuestion[] = [
  ...dijkstra_questions,
  ...bellman_ford_questions,
  ...floyd_warshall_questions
];
