import { adjacency_matrix_questions } from './adjacency-matrix';
import { adjacency_list_questions } from './adjacency-list';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const graphs_questions: AssessmentQuestion[] = [
  ...adjacency_matrix_questions,
  ...adjacency_list_questions
];
