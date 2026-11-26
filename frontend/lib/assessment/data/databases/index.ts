import { fundamentals_questions } from './fundamentals';
import { database_design_questions } from './database-design';
import { sql_questions } from './sql';
import { transactions_questions } from './transactions';
import { indexing_questions } from './indexing';
import { query_optimization_questions } from './query-optimization';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const databases_questions: AssessmentQuestion[] = [
  ...fundamentals_questions,
  ...database_design_questions,
  ...sql_questions,
  ...transactions_questions,
  ...indexing_questions,
  ...query_optimization_questions
];
