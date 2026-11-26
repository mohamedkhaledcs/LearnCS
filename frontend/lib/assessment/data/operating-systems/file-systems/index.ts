import { files_and_directories_questions } from './files-and-directories';
import { permissions_questions } from './permissions';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const file_systems_questions: AssessmentQuestion[] = [
  ...files_and_directories_questions,
  ...permissions_questions
];
