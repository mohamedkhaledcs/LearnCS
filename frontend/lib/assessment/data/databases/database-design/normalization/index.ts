import { _1nf_questions } from './1nf';
import { _2nf_questions } from './2nf';
import { _3nf_questions } from './3nf';
import { bcnf_questions } from './bcnf';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const normalization_questions: AssessmentQuestion[] = [
  ..._1nf_questions,
  ..._2nf_questions,
  ..._3nf_questions,
  ...bcnf_questions
];
