import { AssessmentQuestion } from '@/lib/assessment/schema';

export const constructors_questions: AssessmentQuestion[] = [
{
  "id": "OOP-CTOR-E-001",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "Fundamentals",
  "subtopic": "Constructors",
  "specialization": "Invariant Initialization",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What is the primary responsibility of a Class Constructor?",
    "ar": "ما هي الوظيفة الأساسية لدالة البناء (Constructor) في الـ Class؟"
  },
  "options": [
    {
      "id": "del",
      "text": {
        "en": "Release object memory pointers automatically right as the program closes",
        "ar": "تحرير مؤشرات الكائن تلقائياً وحذفها من الذاكرة عند انتهاء البرنامج وإغلاقه"
      }
    },
    {
      "id": "stat",
      "text": {
        "en": "Serialize instance properties automatically into an HTTP 200 status payload",
        "ar": "إرسال استجابة شبكة HTTP 200 OK تلقائياً بمجرد قراءة أي خاصية من الكائن"
      }
    },
    {
      "id": "dup",
      "text": {
        "en": "Disable inheritance",
        "ar": "تعطيل الوراثة"
      }
    },
    {
      "id": "init",
      "text": {
        "en": "Initialize object fields to a valid state upon creation",
        "ar": "تهيئة خصائص الكائن بقيم صالحة تلقائياً لحظة إنشائه"
      }
    }
  ],
  "correctAnswer": "init",
  "explanation": {
    "en": "Constructors run right when an instance is allocated, guaranteeing required fields start valid and enforcing domain invariants.",
    "ar": "تُستدعى دالة البناء فوراً عند إنشاء الكائن لضمان تهيئته بحالة متسقة وصالحة."
  },
  "tags": [
    "oop",
    "constructors"
  ]
} as AssessmentQuestion,
{
  "id": "OOP-ENC-M-003",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "OOP Fundamentals",
  "subtopic": "Constructors",
  "specialization": "Invariant Creation",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Why do domain models mark entity constructors `private` behind static factories like `Create(email, tier)`?",
    "ar": "لماذا تخفي المعماريات المتقدمة مشيّد الكائن `private constructor` وتوفر دالة مصنع مثل `Create(email, tier)`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "To allow raw external code to bypass private field setters directly",
        "ar": "للسماح بتعديل الحقول الخاصة من الخارج"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "To prevent PostgreSQL foreign key mappings from referencing entity primary keys",
        "ar": "لمنع ربط الكيان بمفتاح أجنبي"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "To centralize invariant validation and reject invalid objects cleanly before allocation",
        "ar": "لتوحيد التحقق من الشروط ومنع ولادة أي كائن بحالة منقوصة أو مخالفة للقواعد"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Because compilers refuse constructors accepting more than one string parameter",
        "ar": "لأن المترجم يمنع تعدد المعاملات في البناء"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Named factory constructors verify invariants cleanly, make creation intent explicit, and prevent half-constructed invalid records.",
    "ar": "دوال الإنشاء المسماة تتحقق من القواعد قبل السماح بوجود الكائن وتوضّح سبب الإنشاء."
  },
  "tags": [
    "oop",
    "constructors",
    "domain-driven-design"
  ]
} as AssessmentQuestion,
{
  "id": "OOP-ENC-H-006",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "OOP Fundamentals",
  "subtopic": "Constructors",
  "specialization": "Deep vs Shallow Copy",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "When copying an object containing a pointer to a dynamic array, what hazard hits with default memberwise Shallow Copy?",
    "ar": "عند نسخ كائن يملك مؤشراً لمصفوفة ديناميكية عبر النسخ السطحي (Shallow Copy)، ما الخطورة المباشرة؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Memberwise copy doubles every numeric integer inside the copied heap buffer",
        "ar": "تتضاعف جميع أرقام المصفوفة وتتحول الحقول الرقمية تلقائياً إلى null عند النسخ"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Both objects alias one heap pointer, triggering Double-Free crashes on destroy",
        "ar": "يتشارك الكائنان المؤشر نفسه فيقع تداخل تعديلات وخطأ Double Free عند الهدم"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Shallow memberwise copying resets private pointer fields back to zero automatically",
        "ar": "يرفض المترجم عملية النسخ السطحي التلقائي بين الكائنات إلا بوجود مشيد خاص"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Compilers reject memberwise assignment across private constructors",
        "ar": "يرفض المترجم النسخ بين المشيدات"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Classes owning raw pointers need custom Copy Constructors / Assignment Operators (Rule of 3/5) or smart RAII containers like `std::vector`.",
    "ar": "النسخ السطحي ينسخ العنوان فقط، فيتشارك الكائنان نفس الذاكرة؛ لذا نستخدم هياكل قياسية مثل `vector` أو نسخاً عميقاً."
  },
  "tags": [
    "shallow-copy",
    "deep-copy",
    "cpp"
  ]
} as AssessmentQuestion
];
