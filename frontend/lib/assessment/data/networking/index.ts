import { fundamentals_questions } from './fundamentals';
import { network_models_questions } from './network-models';
import { application_layer_questions } from './application-layer';
import { transport_layer_questions } from './transport-layer';
import { network_layer_questions } from './network-layer';
import { data_link_layer_questions } from './data-link-layer';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const networking_questions: AssessmentQuestion[] = [
  ...fundamentals_questions,
  ...network_models_questions,
  ...application_layer_questions,
  ...transport_layer_questions,
  ...network_layer_questions,
  ...data_link_layer_questions
];
