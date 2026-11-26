import { stack_vs_heap_questions } from './stack-vs-heap';
import { pointers_and_references_questions } from './pointers-and-references';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const memory_fundamentals_questions: AssessmentQuestion[] = [
  ...stack_vs_heap_questions,
  ...pointers_and_references_questions
];
