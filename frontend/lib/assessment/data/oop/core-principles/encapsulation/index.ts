import { AssessmentQuestion } from '@/lib/assessment/schema';

export const encapsulation_questions: AssessmentQuestion[] = [
{
  "id": "OOP-ENCAP-E-001",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "Core Principles",
  "subtopic": "Encapsulation",
  "specialization": "Concept",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which OOP principle involves hiding the internal state of an Object and requiring all interaction to be performed through an Object's methods?",
    "ar": "أي مبدأ من مبادئ الـ OOP يتضمن إخفاء الحالة الداخلية للـ Object واشتراط أن يتم التفاعل معه عبر دوال الـ Object (methods) فقط؟"
  },
  "options": [
    {
      "id": "encapsulation",
      "text": {
        "en": "Encapsulation",
        "ar": "Encapsulation (التغليف)"
      }
    },
    {
      "id": "inheritance",
      "text": {
        "en": "Inheritance",
        "ar": "Inheritance (الوراثة)"
      }
    },
    {
      "id": "polymorphism",
      "text": {
        "en": "Polymorphism",
        "ar": "Polymorphism (تعدد الأشكال)"
      }
    },
    {
      "id": "abstraction",
      "text": {
        "en": "Abstraction",
        "ar": "Abstraction (التجريد)"
      }
    }
  ],
  "correctAnswer": "encapsulation",
  "explanation": {
    "en": "Encapsulation bundles data and methods in a class while restricting direct external mutation (e.g., private fields exposed through validated public methods/properties).",
    "ar": "يجمع التغليف (Encapsulation) البيانات والدوال داخل الكائن مع تقييد الوصول المباشر للحالة الداخلية وحمايتها عبر دوال عامة."
  }
} as AssessmentQuestion,
{
  "id": "OOP-ENC-M-004",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "Core Principles",
  "subtopic": "Encapsulation",
  "specialization": "Mutable Return Leak",
  "difficulty": "medium",
  "type": "debugging",
  "codeSnippet": "class Team {\n  private List<Member> _members = new();\n  public List<Member> GetMembers() => _members;\n}",
  "codeLanguage": "cs",
  "question": {
    "en": "How does `GetMembers()` break encapsulation silently even though `_members` is marked `private`?",
    "ar": "كيف يكسر التابع `GetMembers()` مبدأ التغليف (Encapsulation) بصمت رغم أن الحقل `_members` معلن `private`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Private list properties serialize automatically to blank strings across modules",
        "ar": "القوائم الخاصة تتحول لنصوص فارغة تلقائياً ما لم تُنسخ داخل دوال ساكنة مخصصة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Returning readonly list interfaces allocates O(N²) stack scratch arrays automatically",
        "ar": "قراءة القائمة دون نسخها تستهلك ذاكرة مكدس مربعة O(N²) وتُفرغ العناصر عند العودة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Readonly return values allocate O(N^2) stack buffers cleanly",
        "ar": "قراءة القائمة تستهلك O(N^2)"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Exposing a mutable `List` reference lets callers clear/mutate items unvalidated",
        "ar": "إرجاع القائمة القابلة للتعديل يسمح للمستدعي بتغيير عناصرها متجاوزاً الفحص"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Returning `_members.AsReadOnly()` or a defensive copy protects internal invariants cleanly.",
    "ar": "يجب إرجاع واجهة للقراءة فقط `IReadOnlyList` أو نسخة جديدة لحماية القائمة الداخلية."
  },
  "tags": [
    "encapsulation",
    "defensive-copy",
    "csharp"
  ]
} as AssessmentQuestion,
{
  "id": "OOP-ENC-E-005",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "Core Principles",
  "subtopic": "Encapsulation",
  "specialization": "Tell Don't Ask",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Instead of calling `if (acc.GetBalance() >= x) acc.SetBalance(acc.GetBalance() - x);` everywhere, what cleaner OOP method belongs on `Account`?",
    "ar": "بدلاً من فحص وتعديل الرصيد في كل مكان بـ `SetBalance`، ما الطريقة الأصح حسب التغليف في OOP؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Adding a domain method `acc.Withdraw(x)` encapsulating checks and deduction",
        "ar": "إضافة دالة سلوك `acc.Withdraw(x)` تتحقق وتنفذ السحب في مكان واحد"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Making `balance` public global float",
        "ar": "جعل الرصيد عاماً للجميع"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Removing constructors and creating structs with zero methods",
        "ar": "حذف الدوال والاعتماد على بنية بلا سلوك"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Reading account balances straight via HTTP GET query strings",
        "ar": "قراءة الرصيد من الرابط مباشرة"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Rich domain behavior (`Tell, Don't Ask`) keeps business rules inside the owning class rather than scattered across callers.",
    "ar": "إسناد السلوك لنفس الكائن يمنع تكرار الشروط ويحفظ سلامة المنطق من أي استدعاء."
  },
  "tags": [
    "oop",
    "tell-dont-ask",
    "encapsulation"
  ]
} as AssessmentQuestion
];
