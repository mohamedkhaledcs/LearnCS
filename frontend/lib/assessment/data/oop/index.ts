import { fundamentals_questions } from './fundamentals';
import { core_principles_questions } from './core-principles';
import { relationships_questions } from './relationships';
import { advanced_concepts_questions } from './advanced-concepts';
import { design_principles_questions } from './design-principles';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const oop_questions: AssessmentQuestion[] = [
  ...fundamentals_questions,
  ...core_principles_questions,
  ...relationships_questions,
  ...advanced_concepts_questions,
  ...design_principles_questions
];
