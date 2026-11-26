import { fundamentals_questions } from './fundamentals';
import { processes_and_threads_questions } from './processes-and-threads';
import { cpu_scheduling_questions } from './cpu-scheduling';
import { concurrency_questions } from './concurrency';
import { deadlocks_questions } from './deadlocks';
import { memory_management_questions } from './memory-management';
import { file_systems_questions } from './file-systems';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const operating_systems_questions: AssessmentQuestion[] = [
  ...fundamentals_questions,
  ...processes_and_threads_questions,
  ...cpu_scheduling_questions,
  ...concurrency_questions,
  ...deadlocks_questions,
  ...memory_management_questions,
  ...file_systems_questions
];
