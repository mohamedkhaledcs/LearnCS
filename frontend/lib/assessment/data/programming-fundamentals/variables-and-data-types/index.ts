import { primitive_types_questions } from './primitive-types';
import { type_conversion_questions } from './type-conversion';
import { constants_questions } from './constants';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const variables_and_data_types_questions: AssessmentQuestion[] = [
  ...primitive_types_questions,
  ...type_conversion_questions,
  ...constants_questions
];
