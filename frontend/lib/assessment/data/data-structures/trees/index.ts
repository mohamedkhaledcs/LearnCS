import { binary_trees_questions } from './binary-trees';
import { binary_search_trees_questions } from './binary-search-trees';
import { balanced_trees_questions } from './balanced-trees';
import { tree_traversals_questions } from './tree-traversals';
import { heaps_questions } from './heaps';
import { tries_questions } from './tries';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const trees_questions: AssessmentQuestion[] = [
  ...binary_trees_questions,
  ...binary_search_trees_questions,
  ...balanced_trees_questions,
  ...tree_traversals_questions,
  ...heaps_questions,
  ...tries_questions
];
