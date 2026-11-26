import { ipv4_questions } from './ipv4';
import { ipv6_questions } from './ipv6';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const ip_addressing_questions: AssessmentQuestion[] = [
  ...ipv4_questions,
  ...ipv6_questions
];
