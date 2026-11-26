import { AssessmentQuestion } from '@/lib/assessment/schema';

export const boolean_expressions_questions: AssessmentQuestion[] = [
{
  "id": "DM-BOOL-E-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Boolean Algebra",
  "subtopic": "Boolean Expressions",
  "specialization": "Operator Precedence",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What is the value of the Boolean expression `(1 · 0) + (¬0 · 1)` where `·` is AND, `+` is OR, and `¬` is NOT?",
    "ar": "ما قيمة التعبير البوليني `(1 · 0) + (¬0 · 1)` حيث `·` تعني AND و `+` تعني OR و `¬` تعني NOT؟"
  },
  "options": [
    {
      "id": "one",
      "text": {
        "en": "1 (True)",
        "ar": "1 (صائب)"
      }
    },
    {
      "id": "zero",
      "text": {
        "en": "0 (False)",
        "ar": "0 (خاطئ)"
      }
    },
    {
      "id": "two",
      "text": {
        "en": "2",
        "ar": "2"
      }
    },
    {
      "id": "undef",
      "text": {
        "en": "Undefined",
        "ar": "غير معرف"
      }
    }
  ],
  "correctAnswer": "one",
  "explanation": {
    "en": "1·0 evaluates to 0; ¬0 = 1 and 1·1 = 1; finally 0 + 1 = 1.",
    "ar": "الطرف الأيسر 1·0 = 0، والطرف الأيمن ¬0 = 1 و 1·1 = 1، ومنه 0 OR 1 = 1."
  },
  "tags": [
    "discrete-math",
    "boolean-algebra",
    "logic"
  ]
} as AssessmentQuestion,
{
  "id": "PRE-BIT-E-005",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Boolean Algebra",
  "subtopic": "Logic Gates",
  "specialization": "XOR Truth Table",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "When does an Exclusive-OR (XOR) logic gate output `1` (True)?",
    "ar": "متى يعطي منطق بوابة XOR الناتج `1` (True)؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Only when both inputs are simultaneously `1`",
        "ar": "عندما يكون كلا المدخلين 1 معاً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Exactly when its two binary inputs differ",
        "ar": "فقط عندما يختلف المدخلان"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Whenever at least one input equals `0`",
        "ar": "عندما يساوي أحد المدخلين صفر"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Only when both inputs match (`0,0` or `1,1`)",
        "ar": "فقط عند تطابق المدخلين معاً"
      }
    }
  ],
  "correctAnswer": "c",
  "explanation": {
    "en": "XOR yields 1 strictly on differing bits (`0^1 = 1`, `1^0 = 1`) and 0 on identical bits (`0^0 = 0`, `1^1 = 0`).",
    "ar": "بوابة XOR تخرج 1 عند اختلاف البتين وصفر عند تشابههما."
  },
  "tags": [
    "xor",
    "logic-gates",
    "boolean"
  ]
} as AssessmentQuestion
];
