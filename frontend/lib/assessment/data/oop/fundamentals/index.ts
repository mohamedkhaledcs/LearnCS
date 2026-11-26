import { classes_and_objects_questions } from './classes-and-objects';
import { constructors_questions } from './constructors';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const fundamentals_questions: AssessmentQuestion[] = [
  ...classes_and_objects_questions,
  ...constructors_questions
];
