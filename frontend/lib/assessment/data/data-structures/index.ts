import { arrays_questions } from './arrays';
import { linked_lists_questions } from './linked-lists';
import { stacks_questions } from './stacks';
import { queues_questions } from './queues';
import { hash_tables_questions } from './hash-tables';
import { trees_questions } from './trees';
import { graphs_questions } from './graphs';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const data_structures_questions: AssessmentQuestion[] = [
  ...arrays_questions,
  ...linked_lists_questions,
  ...stacks_questions,
  ...queues_questions,
  ...hash_tables_questions,
  ...trees_questions,
  ...graphs_questions
];
