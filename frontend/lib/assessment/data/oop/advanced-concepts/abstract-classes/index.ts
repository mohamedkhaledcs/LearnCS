import { AssessmentQuestion } from '@/lib/assessment/schema';

export const abstract_classes_questions: AssessmentQuestion[] = [
{
  "id": "OOP-ABCLS-M-001",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "Advanced Concepts",
  "subtopic": "Abstract Classes",
  "specialization": "Shared State + Abstract Contract",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Which statement is true about an Abstract Class in C++, C#, or Java?",
    "ar": "أي عبارة صحيحة بشأن الفئة المجردة (Abstract Class) في لغات مثل Java و C# و C++؟"
  },
  "options": [
    {
      "id": "noinst",
      "text": {
        "en": "Cannot be instantiated directly; may mix shared code with abstract methods",
        "ar": "لا تُنشأ ككائن مباشر، وتجمع بين دوال منفذة وأخرى مجردة"
      }
    },
    {
      "id": "onlyabs",
      "text": {
        "en": "Languages strictly forbid abstract classes from declaring constructors or instance fields",
        "ar": "تمنع لغات البرمجة وجود أي حقول بيانات أو دوال بناء داخل الفئة المجردة كلياً"
      }
    },
    {
      "id": "multi",
      "text": {
        "en": "Java and C# classes may freely inherit multiple concrete and abstract base classes at once",
        "ar": "تسمح Java و C# للفئة الواحدة بوراثة عدة فئات مجردة وفئات ملموسة في الوقت نفسه"
      }
    },
    {
      "id": "priv",
      "text": {
        "en": "Subclasses cannot override its abstract methods",
        "ar": "لا يجوز تعديل دوالها"
      }
    }
  ],
  "correctAnswer": "noinst",
  "explanation": {
    "en": "Abstract classes serve as partial base implementations providing shared state and template methods while forcing subclasses to implement abstract hooks.",
    "ar": "الفئة المجردة توفر كوداً مشتركاً للورثة مع فرض دوال إلزامية للتنفيذ دون السماح بإنشاء كائن مباشر منها."
  },
  "tags": [
    "oop",
    "abstract-classes",
    "polymorphism"
  ]
} as AssessmentQuestion,
{
  "id": "OOP-PLY-H-006",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "Advanced Concepts",
  "subtopic": "Abstract Classes",
  "specialization": "Virtual Destructor",
  "difficulty": "hard",
  "type": "debugging",
  "codeSnippet": "Base* obj = new DerivedWithHeapBuffer();\ndelete obj; // Base lacks ~Base() virtual!",
  "codeLanguage": "cpp",
  "question": {
    "en": "Why must any C++ polymorphic base class (`virtual` methods) also declare `virtual ~Base() = default;`?",
    "ar": "لماذا يلزم التصريح عن مدمّر افتراضي `virtual ~Base()` لأي فئة أب متعددة الأشكال في C++؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "To allow multiple stack arrays inside derived constructors cleanly",
        "ar": "للسماح بتعريف مصفوفات في البناء"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Because compilers forbid heap `new` allocation without at least two destructors",
        "ar": "لأن الحجز بـ new يتطلب مدمّرين"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "So `delete basePtr` dispatches cleanly to the derived destructor first",
        "ar": "لكي يُستدعى مدمّر الفئة الابنة أولاً عند الحذف عبر مؤشر الأب دون تسريب مواردها"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "To turn abstract interfaces into static structs",
        "ar": "لتحويل الواجهة إلى struct"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Deleting a derived object through a base pointer with a non-virtual destructor invokes Undefined Behavior and skips derived cleanup.",
    "ar": "الحذف عبر مؤشر أب بدون مدمّر افتراضي يتجاهل هدم أجزاء الابن ويسبب تسريباً أو سلوكاً غير معرّف."
  },
  "tags": [
    "virtual-destructor",
    "cpp",
    "memory"
  ]
} as AssessmentQuestion
];
