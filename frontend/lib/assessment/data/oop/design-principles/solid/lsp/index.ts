import { AssessmentQuestion } from '@/lib/assessment/schema';

export const lsp_questions: AssessmentQuestion[] = [
{
  "id": "OOP-LSP-H-001",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "SOLID Principles",
  "subtopic": "Liskov Substitution (LSP)",
  "specialization": "Behavioral Subtyping",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "Why is making `Square` inherit from mutable `Rectangle` (where `setWidth()` silently alters `height` too) a classic LSP violation?",
    "ar": "لماذا تُعد وراثة `Square` من `Rectangle` قابل للتعديل (بحيث يغير `setWidth` الطول أيضاً تلقائياً) خرقاً كلاسيكياً لمبدأ ليسكوف (LSP)؟"
  },
  "options": [
    {
      "id": "math",
      "text": {
        "en": "In Euclidean geometry, a mathematical square does not satisfy rectangle angle constraints",
        "ar": "المربع في الهندسة الرياضية ليس حالة خاصة من المستطيل ولا يمتلك زوايا قائمة مماثلة"
      }
    },
    {
      "id": "priv",
      "text": {
        "en": "Compiled OOP languages strictly forbid derived constructors that accept a single side integer",
        "ar": "اللغات الكائنية تمنع تماماً كتابة دالة بناء في الفئة المشتقة تقبل معاملاً رقمياً واحداً"
      }
    },
    {
      "id": "gc",
      "text": {
        "en": "Garbage collector deletes squares prematurely",
        "ar": "الذاكرة تحذف المربع"
      }
    },
    {
      "id": "sub",
      "text": {
        "en": "Callers expect `Rectangle` width changes not to mutate height",
        "ar": "كسر توقع المستدعي بثبات الارتفاع عند تعديل عرض المستطيل فقط"
      }
    }
  ],
  "correctAnswer": "sub",
  "explanation": {
    "en": "Liskov Substitution requires subtypes to preserve the behavioral contracts (pre/postconditions/invariants) promised by the base type.",
    "ar": "يشترط مبدأ LSP أن تحترم الفئة الفرعية جميع وعود وعقود الفئة الأساسية دون مفاجآت للمستدعي."
  },
  "tags": [
    "solid",
    "architecture",
    "oop"
  ]
} as AssessmentQuestion
];
