import { propositions_questions } from './propositions';
import { logical_operators_questions } from './logical-operators';
import { truth_tables_questions } from './truth-tables';
import { logical_equivalence_questions } from './logical-equivalence';
import { predicates_questions } from './predicates';
import { quantifiers_questions } from './quantifiers';
import { rules_of_inference_questions } from './rules-of-inference';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const logic_questions: AssessmentQuestion[] = [
  ...propositions_questions,
  ...logical_operators_questions,
  ...truth_tables_questions,
  ...logical_equivalence_questions,
  ...predicates_questions,
  ...quantifiers_questions,
  ...rules_of_inference_questions
];
