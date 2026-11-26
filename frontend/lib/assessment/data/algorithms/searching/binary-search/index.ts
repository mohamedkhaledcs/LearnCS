import { fundamentals_questions } from './fundamentals';
import { variants_questions } from './variants';
import { search_on_answer_questions } from './search-on-answer';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const binary_search_questions: AssessmentQuestion[] = [
  ...fundamentals_questions,
  ...variants_questions,
  ...search_on_answer_questions
];
