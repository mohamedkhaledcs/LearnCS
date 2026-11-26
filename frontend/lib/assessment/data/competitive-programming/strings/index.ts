import { pattern_matching_questions } from './pattern-matching';
import { hashing_questions } from './hashing';
import { trie_questions } from './trie';

import { AssessmentQuestion } from '@/lib/assessment/schema';

export const strings_questions: AssessmentQuestion[] = [
  ...pattern_matching_questions,
  ...hashing_questions,
  ...trie_questions
];
