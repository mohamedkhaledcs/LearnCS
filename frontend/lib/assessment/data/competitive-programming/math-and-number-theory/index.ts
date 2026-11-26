import { mod_arithmetic_questions } from './mod-arithmetic';
import { primes_sieve_questions } from './primes-sieve';
import { gcd_lcm_questions } from './gcd-lcm';
import { combinatorics_questions } from './combinatorics';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const math_and_number_theory_questions: AssessmentQuestion[] = [
  ...mod_arithmetic_questions,
  ...primes_sieve_questions,
  ...gcd_lcm_questions,
  ...combinatorics_questions
];
