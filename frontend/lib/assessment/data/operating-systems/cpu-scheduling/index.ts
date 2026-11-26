import { fcfs_questions } from './fcfs';
import { sjf_questions } from './sjf';
import { round_robin_questions } from './round-robin';
import { priority_questions } from './priority';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const cpu_scheduling_questions: AssessmentQuestion[] = [
  ...fcfs_questions,
  ...sjf_questions,
  ...round_robin_questions,
  ...priority_questions
];
