import { linear_recurrences_questions } from './linear-recurrences';
import { solving_recurrences_questions } from './solving-recurrences';
import { master_theorem_related_concepts_questions } from './master-theorem-related-concepts';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const recurrence_relations_questions: AssessmentQuestion[] = [
  ...linear_recurrences_questions,
  ...solving_recurrences_questions,
  ...master_theorem_related_concepts_questions
];
