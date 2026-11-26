import { bfs_questions } from './bfs';
import { dfs_questions } from './dfs';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const traversal_questions: AssessmentQuestion[] = [
  ...bfs_questions,
  ...dfs_questions
];
