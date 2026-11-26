import { AssessmentQuestion } from '@/lib/assessment/schema';

export const logical_equivalence_questions: AssessmentQuestion[] = [
{
  "id": "DM-EQUIV-M-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Logic",
  "subtopic": "Logical Equivalence",
  "specialization": "Contrapositive & Disjunction",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Which compound expression is logically equivalent to the implication `p -> q`?",
    "ar": "أي تعبير منطقي يكافئ العبارة الشرطية `p -> q` تماماً؟"
  },
  "options": [
    {
      "id": "qp",
      "text": {
        "en": "q -> p (Converse)",
        "ar": "q -> p (العكس)"
      }
    },
    {
      "id": "npnq",
      "text": {
        "en": "¬p -> ¬q (Inverse)",
        "ar": "¬p -> ¬q (المعكوس)"
      }
    },
    {
      "id": "pandq",
      "text": {
        "en": "p ∧ ¬q",
        "ar": "p ∧ ¬q"
      }
    },
    {
      "id": "npq",
      "text": {
        "en": "¬p ∨ q",
        "ar": "¬p ∨ q"
      }
    }
  ],
  "correctAnswer": "npq",
  "explanation": {
    "en": "`p -> q` is False iff `p=T, q=F`, which matches `¬p ∨ q` and its contrapositive `¬q -> ¬p`. Converse (`q -> p`) and inverse (`¬p -> ¬q`) are NOT equivalent to `p -> q`.",
    "ar": "العبارة `p -> q` تكافئ `¬p ∨ q` وتكافئ المعاكس الإيجابي `¬q -> ¬p`، لكنها لا تكافئ العكس `q -> p`."
  },
  "tags": [
    "discrete-math",
    "logic"
  ]
} as AssessmentQuestion,
{
  "id": "DM-LOG-H-005",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Logic",
  "subtopic": "Logical Equivalence",
  "specialization": "Converse Fallacy",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "Suppose statement S `'If graph G is a Tree, then G is Connected'` is True. Which statement is guaranteed ALWAYS True too?",
    "ar": "إذا صحّت العبارة: `'إذا كان الرسم شجرةً Tree فهو متصل Connected'`، فأي عبارة تبقى صادقة حتماً في كل الحالات؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "If G is Connected, then G must be a Tree",
        "ar": "إذا كان الرسم متصلاً فهو شجرة حتماً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "If G is NOT a Tree, then G is always Disconnected",
        "ar": "إذا لم يكن شجرة فهو غير متصل"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "If G is NOT Connected, then G cannot be a Tree",
        "ar": "إذا لم يكن الرسم متصلاً فهو ليس شجرة حتماً"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Connected cyclic graphs equal valid Trees cleanly",
        "ar": "الرسوم ذات الدورات أشجار صالحة"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Only Contrapositive (`!Q -> !P`) matches implication `P -> Q` cleanly; converse and inverse commit classic fallacies (cycles stay connected without being trees).",
    "ar": "المعكوس المضاد `!Q -> !P` وحده يكافئ الأصل، أما العكس فيكذب عند وجود رسم متصل يحوي دورة."
  },
  "tags": [
    "contrapositive",
    "logic",
    "proofs"
  ]
} as AssessmentQuestion
];
