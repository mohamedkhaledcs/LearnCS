import { relation_properties_questions } from './relation-properties';
import { equivalence_relations_questions } from './equivalence-relations';
import { partial_orders_questions } from './partial-orders';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const relations_questions: AssessmentQuestion[] = [
  ...relation_properties_questions,
  ...equivalence_relations_questions,
  ...partial_orders_questions
];
