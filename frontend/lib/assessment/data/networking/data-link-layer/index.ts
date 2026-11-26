import { mac_addressing_questions } from './mac-addressing';
import { ethernet_questions } from './ethernet';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const data_link_layer_questions: AssessmentQuestion[] = [
  ...mac_addressing_questions,
  ...ethernet_questions
];
