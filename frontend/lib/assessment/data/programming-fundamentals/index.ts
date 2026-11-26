import { variables_and_data_types_questions } from './variables-and-data-types';
import { operators_and_expressions_questions } from './operators-and-expressions';
import { control_structures_questions } from './control-structures';
import { functions_questions } from './functions';
import { memory_fundamentals_questions } from './memory-fundamentals';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const programming_fundamentals_questions: AssessmentQuestion[] = [
  ...variables_and_data_types_questions,
  ...operators_and_expressions_questions,
  ...control_structures_questions,
  ...functions_questions,
  ...memory_fundamentals_questions
];
