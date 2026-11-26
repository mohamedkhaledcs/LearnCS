import { AssessmentQuestion } from '@/lib/assessment/schema';

export const ocp_questions: AssessmentQuestion[] = [
{
  "id": "OOP-OCP-M-001",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "SOLID Principles",
  "subtopic": "Open/Closed (OCP)",
  "specialization": "Extension Without Modification",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "What does the Open/Closed Principle (OCP) state?",
    "ar": "ماذا ينص مبدأ الفتح والإغلاق (Open/Closed Principle - OCP)؟"
  },
  "options": [
    {
      "id": "file",
      "text": {
        "en": "Every file handle opened inside a class method must auto-close strictly before exiting scope",
        "ar": "يجب إغلاق جميع مؤشرات الملفات وقواعد البيانات تلقائياً بمجرد الخروج من نطاق الفئة المفتوحة"
      }
    },
    {
      "id": "pub",
      "text": {
        "en": "Every class must be marked `final/sealed`",
        "ar": "جعل كل الفئات sealed"
      }
    },
    {
      "id": "ocp",
      "text": {
        "en": "Open for extension via abstractions, closed for modifying existing code",
        "ar": "الكيانات مفتوحة للتوسع بالتجريد ومغلقة أمام تعديل الشيفرة المستقرة"
      }
    },
    {
      "id": "if",
      "text": {
        "en": "New business rules should append extra `else if` branches inside every core handler function",
        "ar": "ينبغي تعديل جمل `switch` الأساسية وإضافة فرع `else if` مباشر داخل كل دالة عند التوسع"
      }
    }
  ],
  "correctAnswer": "ocp",
  "explanation": {
    "en": "Introducing an `IPaymentStrategy` or `IDiscountRule` interface lets you add new payment providers by creating a new class instead of editing fragile `if/switch` logic.",
    "ar": "استخدام الواجهات يمكّننا من إضافة سلوك جديد بإنشاء فئة جديدة دون لمس الكود القائم وتعريضه للأخطاء."
  },
  "tags": [
    "solid",
    "architecture",
    "oop"
  ]
} as AssessmentQuestion,
{
  "id": "SE-DES-M-003",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "SOLID Principles",
  "subtopic": "OCP",
  "specialization": "Strategy Extension",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Adding a new payment gateway (`Stripe`, `Paymob`, `ApplePay`) cleanly by implementing `IPaymentStrategy` instead of editing a huge `if/else` block demonstrates:",
    "ar": "إضافة بوابة دفع جديدة عبر تطبيق واجهة `IPaymentStrategy` بدلاً من تعديل سلسلة `if/else` ضخمة قائمة يحقق مبدأ:"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Tight Structural Coupling across shared payment database entities",
        "ar": "الاقتران الوثيق بين وحدات بوابة الدفع وطبقة التوجيه الرئيسية في المشروع"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Leaky Abstraction Inheritance coupling domain controllers to concrete drivers",
        "ar": "التسرب التجريدي في الوراثة بربط طبقة العرض مباشرة بسائقي قاعدة البيانات"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Premature Micro-sharding",
        "ar": "التجزئة المبكرة"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Open/Closed Principle (OCP)",
        "ar": "مبدأ الفتح والإغلاق (Open/Closed)"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Strategy interfaces keep existing tested checkout orchestration untouched while plugging in new providers seamlessly.",
    "ar": "الواجهات والـ Strategy تسمح بإضافة مزودات جديدة دون المخاطرة بكسر كود الدفع المجرب."
  },
  "tags": [
    "ocp",
    "strategy-pattern",
    "solid"
  ]
} as AssessmentQuestion
];
