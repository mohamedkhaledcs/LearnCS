import { sum_rule_questions } from './sum-rule';
import { product_rule_questions } from './product-rule';
import { permutations_questions } from './permutations';
import { combinations_questions } from './combinations';
import { pigeonhole_principle_questions } from './pigeonhole-principle';
import { inclusion_exclusion_questions } from './inclusion-exclusion';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const counting_questions: AssessmentQuestion[] = [
  ...sum_rule_questions,
  ...product_rule_questions,
  ...permutations_questions,
  ...combinations_questions,
  ...pigeonhole_principle_questions,
  ...inclusion_exclusion_questions
];
