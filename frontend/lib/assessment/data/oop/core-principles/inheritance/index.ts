import { AssessmentQuestion } from '@/lib/assessment/schema';

export const inheritance_questions: AssessmentQuestion[] = [
{
  "id": "OOP-INHERIT-M-001",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "Core Principles",
  "subtopic": "Inheritance",
  "specialization": "Composition vs Inheritance",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Which design principle suggests that you should build complex behavior by combining simple objects rather than inheriting from a large base class?",
    "ar": "أي مبدأ تصميم يقترح أنه يجب بناء سلوك معقد عن طريق دمج كائنات بسيطة (combining objects) بدلاً من الوراثة من فئة أساسية (base class) ضخمة؟"
  },
  "options": [
    {
      "id": "encapsulation",
      "text": {
        "en": "Encapsulation",
        "ar": "Encapsulation"
      }
    },
    {
      "id": "composition",
      "text": {
        "en": "Composition over Inheritance",
        "ar": "Composition over Inheritance"
      }
    },
    {
      "id": "solid",
      "text": {
        "en": "Liskov Substitution Principle",
        "ar": "Liskov Substitution Principle"
      }
    },
    {
      "id": "abstraction",
      "text": {
        "en": "Abstraction",
        "ar": "Abstraction"
      }
    }
  ],
  "correctAnswer": "composition",
  "explanation": {
    "en": "Composition over Inheritance favors assembling objects that hold references to small collaborating components ('has-a') rather than fragile deep inheritance hierarchies ('is-a').",
    "ar": "يفضل مبدأ التركيب على الوراثة (Composition over Inheritance) بناء الكائنات عبر تجميع مكونات صغيرة مرنة بدلاً من شجرة وراثة عميقة ومعقدة."
  }
} as AssessmentQuestion,
{
  "id": "OOP-PLY-M-004",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "Core Principles",
  "subtopic": "Inheritance",
  "specialization": "Override Safety",
  "difficulty": "medium",
  "type": "code-trace",
  "codeSnippet": "class Base {\npublic:\n  virtual void render(int x) const { ... }\n};\nclass Child : public Base {\npublic:\n  void render(double x) const override { ... }\n};",
  "codeLanguage": "cpp",
  "question": {
    "en": "How does placing the `override` keyword on `Child::render` catch the parameter typo (`double` vs `int`) cleanly?",
    "ar": "كيف تساعد الكلمة المفتاحية `override` في اكتشاف خطأ اختلاف المعامل (`double` مقابل `int`) في `Child::render`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Compile-time error triggers immediately when no matching Base signature exists",
        "ar": "يُظهر المترجم خطأ فوراً لعدم تطابق التوقيع مع أي دالة virtual في الأب"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Runtime automatically casts mismatched `double` parameters downward into `Base::render(int)`",
        "ar": "يحوّل وقت التشغيل معامل `double` الخاطئ تلقائياً نحو دالة الأب `Base::render(int)`"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Removes virtual dispatch vtable headers cleanly from all child class memory layouts",
        "ar": "يزيل مؤشر جدول الدوال الافتراضية vtable من الفئة الابنة ويعطّل التحميل الزائد"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "It disables overload resolution across every file",
        "ar": "يعطل التحميل الزائد"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Without `override`, changing `int` to `double` creates an unrelated hidden function instead of overriding `Base::render`!",
    "ar": "بدون `override` تصبح الدالة مجرد تعريف جديد منفصل ولا تستدعى تعددياً؛ و`override` تضمن صحة التوقيع وقت الترجمة."
  },
  "tags": [
    "override",
    "cpp",
    "polymorphism"
  ]
} as AssessmentQuestion
];
