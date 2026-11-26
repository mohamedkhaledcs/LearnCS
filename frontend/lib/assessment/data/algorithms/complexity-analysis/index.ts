import { big_o_questions } from './big-o';
import { time_complexity_questions } from './time-complexity';
import { space_complexity_questions } from './space-complexity';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const complexity_analysis_questions: AssessmentQuestion[] = [
  ...big_o_questions,
  ...time_complexity_questions,
  ...space_complexity_questions
];
