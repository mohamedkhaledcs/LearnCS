import { paging_questions } from './paging';
import { segmentation_questions } from './segmentation';
import { virtual_memory_questions } from './virtual-memory';
import { page_replacement_questions } from './page-replacement';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const memory_management_questions: AssessmentQuestion[] = [
  ...paging_questions,
  ...segmentation_questions,
  ...virtual_memory_questions,
  ...page_replacement_questions
];
