import { git_fundamentals_questions } from './git-fundamentals';
import { branching_questions } from './branching';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const version_control_questions: AssessmentQuestion[] = [
  ...git_fundamentals_questions,
  ...branching_questions
];
