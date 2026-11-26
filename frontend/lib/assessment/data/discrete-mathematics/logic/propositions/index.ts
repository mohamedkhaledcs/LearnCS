import { AssessmentQuestion } from '@/lib/assessment/schema';

export const propositions_questions: AssessmentQuestion[] = [
{
  "id": "DM-PROP-E-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Logic",
  "subtopic": "Propositions",
  "specialization": "Definition",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which of the following sentences qualifies as a logical Proposition?",
    "ar": "أي من الجمل التالية تُعد قضية منطقية (Proposition) صالحة؟"
  },
  "options": [
    {
      "id": "prime",
      "text": {
        "en": "\"17 is an even integer.\"",
        "ar": "\"العدد 17 عدد زوجي.\""
      }
    },
    {
      "id": "cmd",
      "text": {
        "en": "\"Close the compiler immediately!\"",
        "ar": "\"أغلق المترجم فوراً!\""
      }
    },
    {
      "id": "q",
      "text": {
        "en": "\"What time is it?\"",
        "ar": "\"كم الساعة الآن؟\""
      }
    },
    {
      "id": "open",
      "text": {
        "en": "\"x + 5 = 9\" (with unbound variable x)",
        "ar": "\"x + 5 = 9\" دون تحديد قيمة x"
      }
    }
  ],
  "correctAnswer": "prime",
  "explanation": {
    "en": "A proposition is a declarative statement that is either definitively true or definitively false (here, false). Questions, commands, and open equations with unbound variables are not propositions.",
    "ar": "القضية المنطقية جملة خبرية ذات قيمة صدق محددة (صائب أو خاطئ)؛ الأسئلة والأوامر والمعادلات ذات المتغيرات الحرة ليست قضايا."
  },
  "tags": [
    "discrete-math",
    "logic",
    "propositions"
  ]
} as AssessmentQuestion,
{
  "id": "DM-LOG-E-002",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Logic",
  "subtopic": "Propositions",
  "specialization": "Logical Operators",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "For a disjunction `(P OR Q)`, under what exact inputs does the whole expression evaluate to `False`?",
    "ar": "في العبارة المنطقية `(P OR Q)`، متى يكون الناتج الإجمالي `False`؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Whenever P is True and Q is False",
        "ar": "عندما تكون P صائبة و Q خاطئة"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Whenever both P and Q differ in truth value",
        "ar": "عند اختلاف قيمتيهما فقط"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Whenever P is False regardless of Q",
        "ar": "عندما تكذب P مهما كانت Q"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Only when BOTH P and Q are simultaneously False",
        "ar": "فقط عندما تكون P و Q خاطئتين معاً"
      }
    }
  ],
  "correctAnswer": "c",
  "explanation": {
    "en": "Inclusive `OR` evaluates true whenever at least one operand is true; only `False OR False` returns false.",
    "ar": "رابط `OR` يصدق بصدق أحد الطرفين على الأقل ولا يكذب إلا عند كذبهما معاً."
  },
  "tags": [
    "logic",
    "truth-table",
    "disjunction"
  ]
} as AssessmentQuestion
];
