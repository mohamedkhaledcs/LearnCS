import { discrete_mathematics_questions } from './discrete-mathematics';
import { competitive_programming_questions } from './competitive-programming';
import { algorithms_questions } from './algorithms';
import { data_structures_questions } from './data-structures';
import { databases_questions } from './databases';
import { networking_questions } from './networking';
import { operating_systems_questions } from './operating-systems';
import { programming_fundamentals_questions } from './programming-fundamentals';
import { oop_questions } from './oop';
import { software_engineering_questions } from './software-engineering';

import { AssessmentQuestion } from '../schema';

export const QUESTION_BANK: AssessmentQuestion[] = [
  ...discrete_mathematics_questions,
  ...competitive_programming_questions,
  ...algorithms_questions,
  ...data_structures_questions,
  ...databases_questions,
  ...networking_questions,
  ...operating_systems_questions,
  ...programming_fundamentals_questions,
  ...oop_questions,
  ...software_engineering_questions
];
