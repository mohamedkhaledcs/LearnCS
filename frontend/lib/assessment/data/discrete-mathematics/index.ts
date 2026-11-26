import { logic_questions } from './logic';
import { set_theory_questions } from './set-theory';
import { relations_questions } from './relations';
import { functions_questions } from './functions';
import { proof_techniques_questions } from './proof-techniques';
import { counting_questions } from './counting';
import { recurrence_relations_questions } from './recurrence-relations';
import { graph_theory_fundamentals_questions } from './graph-theory-fundamentals';
import { boolean_algebra_questions } from './boolean-algebra';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const discrete_mathematics_questions: AssessmentQuestion[] = [
  ...logic_questions,
  ...set_theory_questions,
  ...relations_questions,
  ...functions_questions,
  ...proof_techniques_questions,
  ...counting_questions,
  ...recurrence_relations_questions,
  ...graph_theory_fundamentals_questions,
  ...boolean_algebra_questions
];
