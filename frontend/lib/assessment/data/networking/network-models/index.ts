import { osi_model_questions } from './osi-model';
import { tcp_ip_model_questions } from './tcp-ip-model';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const network_models_questions: AssessmentQuestion[] = [
  ...osi_model_questions,
  ...tcp_ip_model_questions
];
