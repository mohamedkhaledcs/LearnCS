import { agile_questions } from './agile';
import { scrum_questions } from './scrum';
import { kanban_questions } from './kanban';
import { waterfall_questions } from './waterfall';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const methodologies_questions: AssessmentQuestion[] = [
  ...agile_questions,
  ...scrum_questions,
  ...kanban_questions,
  ...waterfall_questions
];
