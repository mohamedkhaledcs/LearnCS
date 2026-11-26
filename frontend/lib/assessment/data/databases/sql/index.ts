import { select_questions } from './select';
import { filtering_questions } from './filtering';
import { joins_questions } from './joins';
import { grouping_questions } from './grouping';
import { subqueries_questions } from './subqueries';
import { set_operations_questions } from './set-operations';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const sql_questions: AssessmentQuestion[] = [
  ...select_questions,
  ...filtering_questions,
  ...joins_questions,
  ...grouping_questions,
  ...subqueries_questions,
  ...set_operations_questions
];
