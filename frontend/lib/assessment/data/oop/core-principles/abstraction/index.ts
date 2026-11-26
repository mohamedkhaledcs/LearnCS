import { AssessmentQuestion } from '@/lib/assessment/schema';

export const abstraction_questions: AssessmentQuestion[] = [
{
  "id": "OOP-ABS-E-001",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "Core Principles",
  "subtopic": "Abstraction",
  "specialization": "Interface vs Implementation",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "How does Abstraction complement Encapsulation in large software architectures?",
    "ar": "كيف يكمّل مبدأ التجريد (Abstraction) مبدأ التغليف (Encapsulation) في بناء البرمجيات الكبيرة؟"
  },
  "options": [
    {
      "id": "pub",
      "text": {
        "en": "Exposes every private internal field as mutable public properties for direct access",
        "ar": "يجعل جميع الحقول الداخلية عامة وقابلة للتعديل المباشر من أي مكان في البرنامج"
      }
    },
    {
      "id": "dup",
      "text": {
        "en": "Duplicates identical business logic helpers across unrelated service module files",
        "ar": "ينسخ الشيفرة نفسها ويكرر دوال المعالجة في كل ملف ووحدة برمجية على حدة"
      }
    },
    {
      "id": "del",
      "text": {
        "en": "Removes all methods from a class",
        "ar": "يحذف الدوال"
      }
    },
    {
      "id": "what",
      "text": {
        "en": "Abstraction exposes WHAT an object does while hiding HOW it works",
        "ar": "يُبرز التجريد (ماذا يفعل الكائن) عبر واجهة واضحة ويخفي تفاصيل (كيف يعمل)"
      }
    }
  ],
  "correctAnswer": "what",
  "explanation": {
    "en": "Think of driving a car: steering wheel & pedals (Abstraction) expose controls without forcing you to manipulate fuel injection internals.",
    "ar": "التجريد يركز على السلوك الأساسي المتاح للمستخدم مع حجب التفاصيل الداخلية المتغيرة."
  },
  "tags": [
    "oop",
    "abstraction"
  ]
} as AssessmentQuestion,
{
  "id": "OOP-PLY-E-005",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "Core Principles",
  "subtopic": "Abstraction",
  "specialization": "Composition Over Inheritance",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What design relationship models a `Car` owning an interchangeable `IEngine` dependency rather than inheriting from `GasEngine`?",
    "ar": "ما العلاقة التصميمية التي تجعل `Car` يحتوي محركاً قابلاً للتبديل عبر واجهة `IEngine` بدلاً من أن يرث من `GasEngine`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Circular Inheritance",
        "ar": "الوراثة الدائرية"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Composition",
        "ar": "التركيب Composition"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Singleton Mutation",
        "ar": "نمط Singleton"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Bitmask Flagging",
        "ar": "أقنعة البتات"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Favoring `has-a` composition lets a `Car` swap `ElectricEngine` vs `HybridEngine` dynamically without rewriting class hierarchies.",
    "ar": "التركيب يحقن المحرك المطلوب عبر واجهة ويفصل الفئتين باعتمادية مرنة."
  },
  "tags": [
    "composition",
    "abstraction",
    "oop"
  ]
} as AssessmentQuestion
];
