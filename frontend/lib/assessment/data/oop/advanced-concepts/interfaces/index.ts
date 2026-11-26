import { AssessmentQuestion } from '@/lib/assessment/schema';

export const interfaces_questions: AssessmentQuestion[] = [
{
  "id": "OOP-INTF-M-001",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "Advanced Concepts",
  "subtopic": "Interfaces",
  "specialization": "Behavioral Contracts",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Why do languages like Java and C# allow a class to implement MULTIPLE Interfaces while restricting single Class inheritance?",
    "ar": "لماذا تسمح لغات مثل Java و C# للفئة بتطبيق عدة واجهات (Interfaces) مع قصر الوراثة على فئة أب واحدة فقط؟"
  },
  "options": [
    {
      "id": "slow",
      "text": {
        "en": "Interfaces bypass CPU execution instructions and skip runtime method dispatch overhead",
        "ar": "تنفذ الواجهات الدوال بشكل أسرع في العتاد متجاوزةً معالجة المؤشرات والمكدس تماماً"
      }
    },
    {
      "id": "private",
      "text": {
        "en": "Implementing interfaces automatically forces all public class methods to remain private",
        "ar": "تُجبر الواجهات جميع الدوال المنفذة بداخلها على البقاء خاصة Private لا يراها الخارج"
      }
    },
    {
      "id": "no_poly",
      "text": {
        "en": "Interfaces disallow polymorphism",
        "ar": "تمنع تعدد الأشكال"
      }
    },
    {
      "id": "diam",
      "text": {
        "en": "Interfaces specify behavioral contracts without state, avoiding the Diamond Problem",
        "ar": "الواجهات تفرض عقوداً سلوكية بلا حالة، فتتجنب مشكلة الماسة"
      }
    }
  ],
  "correctAnswer": "diam",
  "explanation": {
    "en": "Multiple class inheritance introduces ambiguous duplicate fields and superclass constructor diamond conflicts; pure interfaces compose capabilities cleanly.",
    "ar": "تتيح الواجهات تركيب عدة قدرات (مثل Printable و Serializable) بأمان دون تعارض وراثة البيانات."
  },
  "tags": [
    "oop",
    "interfaces",
    "solid"
  ]
} as AssessmentQuestion,
{
  "id": "OOP-PLY-M-003",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "Advanced Concepts",
  "subtopic": "Interfaces",
  "specialization": "Interface vs Inheritance",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Why should a C# or TypeScript entity implement multiple focused Interfaces (`IPayable`, `IAuditable`) instead of deep multi-class inheritance?",
    "ar": "لماذا يفضّل تطبيق عدة واجهات محددة (`IPayable`, `IAuditable`) بدلاً من سلسلة وراثة فئات عميقة؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Interfaces bypass call stack frame pointers making integer arithmetic run faster",
        "ar": "تتخطى الواجهات إطارات مكدس الدوال وتنشئ جداول قاعدة البيانات تلقائياً بلا ترحيل"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Concrete abstract classes strictly forbid inheriting default methods from `object`",
        "ar": "تمنع الفئات المجردة وراثة أي خصائص افتراضية من الفئة الأم وتُجمد تنفيذ الدوال"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Abstract classes forbid inheriting from `object` cleanly",
        "ar": "لأن الفئات المجردة تمنع الكائنات"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Defines clean role capabilities without fragile inherited base state",
        "ar": "تعرف عقود قدرات واضحة دون وراثة حالة داخلية هشة أو ارتباط وثيق"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Multiple capability contracts avoid diamond inheritance ambiguity and adhere cleanly to Interface Segregation (ISP).",
    "ar": "تطبيق الواجهات المتخصصة يدعم التركيب والمرونة وتجنب تعقيدات الوراثة المتعددة."
  },
  "tags": [
    "interfaces",
    "composition",
    "oop"
  ]
} as AssessmentQuestion
];
