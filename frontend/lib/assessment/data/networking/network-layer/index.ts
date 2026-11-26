import { ip_addressing_questions } from './ip-addressing';
import { subnetting_questions } from './subnetting';
import { routing_questions } from './routing';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const network_layer_questions: AssessmentQuestion[] = [
  ...ip_addressing_questions,
  ...subnetting_questions,
  ...routing_questions
];
