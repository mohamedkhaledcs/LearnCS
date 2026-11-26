import { simple_queue_questions } from './simple-queue';
import { circular_queue_questions } from './circular-queue';
import { priority_queue_questions } from './priority-queue';
import { deque_questions } from './deque';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const queues_questions: AssessmentQuestion[] = [
  ...simple_queue_questions,
  ...circular_queue_questions,
  ...priority_queue_questions,
  ...deque_questions
];
