import { tcp_questions } from './tcp';
import { udp_questions } from './udp';
import { ports_questions } from './ports';
import { congestion_control_questions } from './congestion-control';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const transport_layer_questions: AssessmentQuestion[] = [
  ...tcp_questions,
  ...udp_questions,
  ...ports_questions,
  ...congestion_control_questions
];
