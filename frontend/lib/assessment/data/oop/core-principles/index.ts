import { encapsulation_questions } from './encapsulation';
import { inheritance_questions } from './inheritance';
import { polymorphism_questions } from './polymorphism';
import { abstraction_questions } from './abstraction';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const core_principles_questions: AssessmentQuestion[] = [
  ...encapsulation_questions,
  ...inheritance_questions,
  ...polymorphism_questions,
  ...abstraction_questions
];
