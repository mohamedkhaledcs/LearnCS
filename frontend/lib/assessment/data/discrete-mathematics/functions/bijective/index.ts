import { AssessmentQuestion } from '@/lib/assessment/schema';

export const bijective_questions: AssessmentQuestion[] = [
{
  "id": "DM-BIJ-M-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Functions",
  "subtopic": "Bijective Functions",
  "specialization": "Invertibility",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Which condition holds for ANY function f: A -> B on finite sets?",
    "ar": "ما العبارة الصحيحة لأي دالة f: A -> B بين مجموعتين منتهيتين؟"
  },
  "options": [
    {
      "id": "onlyi",
      "text": {
        "en": "Injective alone guarantees an inverse over all of B",
        "ar": "التباين وحده يكفي لإيجاد معكوس لكل B"
      }
    },
    {
      "id": "bij",
      "text": {
        "en": "f has a well-defined inverse function f⁻¹: B -> A if and only if f is Bijective",
        "ar": "للدالة معكوس تام f⁻¹ إذا وفقط إذا كانت تقابلاً"
      }
    },
    {
      "id": "onlys",
      "text": {
        "en": "Surjective alone guarantees an inverse",
        "ar": "الغمر وحده يكفي"
      }
    },
    {
      "id": "diff",
      "text": {
        "en": "Bijections require |A| > |B|",
        "ar": "التقابل يتطلب |A| > |B|"
      }
    }
  ],
  "correctAnswer": "bij",
  "explanation": {
    "en": "Surjectivity ensures every b ∈ B has a pre-image, and injectivity ensures that pre-image is unique, yielding a valid inverse bijection.",
    "ar": "الغمر يضمن وجود أصل لكل عنصر في B، والتباين يضمن تفرّده، فيتحقق وجود دالة عكسية f⁻¹ صحيحة."
  },
  "tags": [
    "discrete-math",
    "functions"
  ]
} as AssessmentQuestion,
{
  "id": "DM-SET-M-003",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Functions",
  "subtopic": "Bijective",
  "specialization": "Invertibility",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Which function mapping property MUST hold so a mathematical inverse function `f^-1` exists cleanly everywhere across codomain B?",
    "ar": "ما الشرط اللازم في الدالة `f: A -> B` لكي تملك دالة عكسية تامة ومحددة `f^-1: B -> A`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Constant zero mapping",
        "ar": "دالة ثابتة تعيد صفراً"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Bijective",
        "ar": "التقابل التام Bijection"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Strictly recursive over positive strings",
        "ar": "أن تكون عودية على النصوص"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Domain cardinality strictly smaller than 3",
        "ar": "أن يكون حجم المجال أقل من 3"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Injectivity guarantees each output traces back to at most 1 input; surjectivity ensures no codomain point is left unmapped.",
    "ar": "التباين يضمن عدم اشتراك عنصرين في ناتج واحد والشمول يضمن تغطية المجال المقابل بالكامل."
  },
  "tags": [
    "functions",
    "bijection",
    "discrete-math"
  ]
} as AssessmentQuestion
];
