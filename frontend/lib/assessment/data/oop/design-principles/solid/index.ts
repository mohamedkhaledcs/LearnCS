import { srp_questions } from './srp';
import { ocp_questions } from './ocp';
import { lsp_questions } from './lsp';
import { isp_questions } from './isp';
import { dip_questions } from './dip';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const solid_questions: AssessmentQuestion[] = [
  ...srp_questions,
  ...ocp_questions,
  ...lsp_questions,
  ...isp_questions,
  ...dip_questions
];
