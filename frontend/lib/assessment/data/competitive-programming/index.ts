import { techniques_questions } from './techniques';
import { graph_techniques_questions } from './graph-techniques';
import { range_queries_questions } from './range-queries';
import { strings_questions } from './strings';
import { math_and_number_theory_questions } from './math-and-number-theory';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const competitive_programming_questions: AssessmentQuestion[] = [
  ...techniques_questions,
  ...graph_techniques_questions,
  ...range_queries_questions,
  ...strings_questions,
  ...math_and_number_theory_questions
];
