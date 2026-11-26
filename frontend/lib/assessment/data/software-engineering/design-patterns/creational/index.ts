import { AssessmentQuestion } from '@/lib/assessment/schema';

export const creational_questions: AssessmentQuestion[] = [
{
  "id": "SE-DPCR-M-001",
  "language": "both",
  "domain": "Software Engineering",
  "topic": "Design Patterns",
  "subtopic": "Creational Patterns",
  "specialization": "Factory Method",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Which Creational Design Pattern provides an interface for creating objects in a superclass while letting subclasses or registries decide WHICH concrete type to instantiate?",
    "ar": "أي نمط تصميم إنشائي (Creational Design Pattern) يوفر واجهة لإنشاء الكائنات مع ترك تحديد الفئة الملموسة المراد إنشاؤها للفئات الفرعية أو المصنع؟"
  },
  "options": [
    {
      "id": "obs",
      "text": {
        "en": "Observer Pattern (Behavioral)",
        "ar": "نمط المراقب Observer"
      }
    },
    {
      "id": "fact",
      "text": {
        "en": "Factory Method",
        "ar": "نمط المصنع"
      }
    },
    {
      "id": "adap",
      "text": {
        "en": "Adapter Pattern (Structural)",
        "ar": "نمط المحول Adapter"
      }
    },
    {
      "id": "dec",
      "text": {
        "en": "Decorator Pattern (Structural)",
        "ar": "نمط المزخرف Decorator"
      }
    }
  ],
  "correctAnswer": "fact",
  "explanation": {
    "en": "Factory Method decouples client code from `new ConcreteProduct()`, supporting OCP when adding new product variants.",
    "ar": "يفصل Factory Method كود العميل عن تفاصيل الإنشاء المباشر بـ new، ويدعم مبدأ الفتح والإغلاق OCP."
  },
  "tags": [
    "design-patterns",
    "oop"
  ]
} as AssessmentQuestion,
{
  "id": "SE-DES-E-006",
  "language": "both",
  "domain": "Software Engineering",
  "topic": "Design Patterns",
  "subtopic": "Creational",
  "specialization": "DRY Helper Extraction",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "How does applying **DRY (Don't Repeat Yourself)** help when localization formatting logic sits copied in 8 UI files?",
    "ar": "كيف يفيد تطبيق مبدأ **DRY (لا تكرر نفسك)** عندما نجد دالة تنسيق أو حساب منسوخة في 8 ملفات واجهة مختلفة؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Duplicating small utility helpers inside every component accelerates JS boot times",
        "ar": "نسخ الدالة نفسها داخل كل مكون React مستقل يسرّع إقلاع المتصفح ويوفر الذاكرة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "DRY prevents decomposing UI controls into smaller composable visual components",
        "ar": "يمنع DRY تقسيم مكونات الواجهة الكبيرة إلى أزرار وعناصر صغيرة قابلة لإعادة الاستخدام"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "One shared helper ensures edge-case fixes propagate across all 8 screens",
        "ar": "دالة مشتركة واحدة تعمم أي إصلاح على الشاشات الثماني كلها معاً"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Repeating constants protects against PostgreSQL deadlocks cleanly",
        "ar": "التكرار يحمي القاعدة"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "One canonical source of truth avoids bug-fix drift across forgotten duplicated snippets.",
    "ar": "توحيد المنطق في مصدر واحد يقضي على أخطاء التفاوت عندما يُصلح جزء وتُنسى بقية النسخ."
  },
  "tags": [
    "dry",
    "refactoring",
    "clean-code"
  ]
} as AssessmentQuestion
];
