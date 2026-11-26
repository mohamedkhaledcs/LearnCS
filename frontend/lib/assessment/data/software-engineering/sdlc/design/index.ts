import { AssessmentQuestion } from '@/lib/assessment/schema';

export const design_questions: AssessmentQuestion[] = [
{
  "id": "SE-DES-M-001",
  "language": "both",
  "domain": "Software Engineering",
  "topic": "SDLC",
  "subtopic": "Software Architecture",
  "specialization": "Cohesion & Coupling",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "What combination of Coupling and Cohesion produces the cleanest, most maintainable software modules?",
    "ar": "أي مزيج من الاقتران (Coupling) والتماسك (Cohesion) ينتج أنظف معمارية برمجية وأسهلها في الصيانة؟"
  },
  "options": [
    {
      "id": "hclch",
      "text": {
        "en": "High Structural Coupling across callers + Low Internal Cohesion inside modules",
        "ar": "اقتران مرتفع متشابك بين كل الطبقات + تماسك ضعيف يخلط مسؤوليات غير مترابطة معاً"
      }
    },
    {
      "id": "hchc",
      "text": {
        "en": "High Coupling + High Cohesion",
        "ar": "اقتران عالٍ وتماسك عالٍ"
      }
    },
    {
      "id": "zero",
      "text": {
        "en": "Zero module separation: keeping the entire 20,000-line codebase inside one static file",
        "ar": "إلغاء تقسيم الوحدات نهائياً ووضع الشيفرة كلها في ملف نصي واحد يسهل تعديله"
      }
    },
    {
      "id": "lchc",
      "text": {
        "en": "Loose Coupling across modules + High Cohesion inside each module",
        "ar": "اقتران منخفض بين الوحدات + تماسك عالٍ داخل كل وحدة"
      }
    }
  ],
  "correctAnswer": "lchc",
  "explanation": {
    "en": "Low coupling keeps changes localized without cascading breakage; high cohesion ensures every module has a clear, focused purpose.",
    "ar": "الاقتران المنخفض يمنع انهيار النظام عند تعديل وحدة، والتماسك العالي يجعل كل وحدة متخصصة وواضحة."
  },
  "tags": [
    "architecture",
    "solid"
  ]
} as AssessmentQuestion,
{
  "id": "PRE-PRG-H-006",
  "language": "both",
  "domain": "Software Engineering",
  "topic": "SDLC",
  "subtopic": "Logic Errors",
  "specialization": "Spec vs Implementation",
  "difficulty": "hard",
  "type": "debugging",
  "codeSnippet": "// Goal: apply 15% discount if total > 100\nfunction finalPrice(total) {\n  if (total > 100) return total * 0.15;\n  return total;\n}",
  "codeLanguage": "js",
  "question": {
    "en": "Spot the Logic Error in `finalPrice(200)`: the function runs without errors yet bills the wrong amount. Why?",
    "ar": "اكتشف الخطأ المنطقي في `finalPrice(200)`؛ الدالة تعمل بلا انهيار لكنها تصدر فاتورة خاطئة. لماذا؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "`return total * 0.15` returns ONLY the discount amount ($30) instead of subtracting it",
        "ar": "`total * 0.15` يعيد قيمة الخصم فقط (30) بدلاً من السعر بعد الخصم"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "JavaScript cannot multiply floating-point decimals inside `if` branches cleanly",
        "ar": "لأن JavaScript تمنع الضرب العشري داخل `if`"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Missing `else` keyword triggers syntax fallback returning undefined",
        "ar": "لأن غياب `else` يرجع undefined"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Integer 200 fails `>` check against decimal literal 100",
        "ar": "لأن 200 لا تحقق شرط `> 100`"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "A 15% discount leaves `1 - 0.15 = 85%` of total (`total * 0.85`); returning `total * 0.15` charges the customer the discount itself!",
    "ar": "الخصم بنسبة 15% يعني أن يدفع العميل 85% من الإجمالي (`total * 0.85`) وليس 15%."
  },
  "tags": [
    "logic-error",
    "debugging",
    "javascript"
  ]
} as AssessmentQuestion
];
