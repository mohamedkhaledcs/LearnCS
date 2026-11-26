import { processes_questions } from './processes';
import { threads_questions } from './threads';
import { context_switching_questions } from './context-switching';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const processes_and_threads_questions: AssessmentQuestion[] = [
  ...processes_questions,
  ...threads_questions,
  ...context_switching_questions
];
