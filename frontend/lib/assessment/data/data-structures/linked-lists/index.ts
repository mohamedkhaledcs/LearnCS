import { singly_linked_list_questions } from './singly-linked-list';
import { doubly_linked_list_questions } from './doubly-linked-list';
import { circular_linked_list_questions } from './circular-linked-list';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const linked_lists_questions: AssessmentQuestion[] = [
  ...singly_linked_list_questions,
  ...doubly_linked_list_questions,
  ...circular_linked_list_questions
];
