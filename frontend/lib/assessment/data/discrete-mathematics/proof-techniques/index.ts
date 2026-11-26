import { direct_proof_questions } from './direct-proof';
import { proof_by_contradiction_questions } from './proof-by-contradiction';
import { proof_by_contrapositive_questions } from './proof-by-contrapositive';
import { mathematical_induction_questions } from './mathematical-induction';
import { strong_induction_questions } from './strong-induction';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const proof_techniques_questions: AssessmentQuestion[] = [
  ...direct_proof_questions,
  ...proof_by_contradiction_questions,
  ...proof_by_contrapositive_questions,
  ...mathematical_induction_questions,
  ...strong_induction_questions
];
