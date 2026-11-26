import { http_questions } from './http';
import { https_questions } from './https';
import { dns_questions } from './dns';
import { smtp_questions } from './smtp';
import { ftp_questions } from './ftp';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const application_layer_questions: AssessmentQuestion[] = [
  ...http_questions,
  ...https_questions,
  ...dns_questions,
  ...smtp_questions,
  ...ftp_questions
];
