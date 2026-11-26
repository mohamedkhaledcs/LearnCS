import { mutexes_questions } from './mutexes';
import { semaphores_questions } from './semaphores';
import { monitors_questions } from './monitors';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const synchronization_questions: AssessmentQuestion[] = [
  ...mutexes_questions,
  ...semaphores_questions,
  ...monitors_questions
];
