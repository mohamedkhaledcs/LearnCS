import { sets_questions } from './sets';
import { set_operations_questions } from './set-operations';
import { subsets_questions } from './subsets';
import { power_sets_questions } from './power-sets';
import { cartesian_products_questions } from './cartesian-products';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const set_theory_questions: AssessmentQuestion[] = [
  ...sets_questions,
  ...set_operations_questions,
  ...subsets_questions,
  ...power_sets_questions,
  ...cartesian_products_questions
];
