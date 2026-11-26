import { interfaces_questions } from './interfaces';
import { abstract_classes_questions } from './abstract-classes';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const advanced_concepts_questions: AssessmentQuestion[] = [
  ...interfaces_questions,
  ...abstract_classes_questions
];
