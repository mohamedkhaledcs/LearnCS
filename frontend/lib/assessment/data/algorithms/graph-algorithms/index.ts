import { fundamentals_questions } from './fundamentals';
import { traversal_questions } from './traversal';
import { shortest_path_questions } from './shortest-path';
import { minimum_spanning_tree_questions } from './minimum-spanning-tree';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const graph_algorithms_questions: AssessmentQuestion[] = [
  ...fundamentals_questions,
  ...traversal_questions,
  ...shortest_path_questions,
  ...minimum_spanning_tree_questions
];
