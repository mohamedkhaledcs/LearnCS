import { AssessmentQuestion } from '@/lib/assessment/schema';

export const polymorphism_questions: AssessmentQuestion[] = [
{
  "id": "OOP-POLY-M-001",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "Core Principles",
  "subtopic": "Polymorphism",
  "specialization": "Method Overriding",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Method overriding is an example of which type of Polymorphism?",
    "ar": "تعتبر إعادة كتابة الدالة (Method overriding) مثالاً على أي نوع من الـ Polymorphism؟"
  },
  "options": [
    {
      "id": "compile",
      "text": {
        "en": "Compile-time (Static) Polymorphism",
        "ar": "Compile-time (Static) Polymorphism"
      }
    },
    {
      "id": "parametric",
      "text": {
        "en": "Parametric Polymorphism",
        "ar": "Parametric Polymorphism"
      }
    },
    {
      "id": "runtime",
      "text": {
        "en": "Run-time (Dynamic) Polymorphism",
        "ar": "Run-time (Dynamic) Polymorphism"
      }
    },
    {
      "id": "ad_hoc",
      "text": {
        "en": "Ad-hoc Polymorphism",
        "ar": "Ad-hoc Polymorphism"
      }
    }
  ],
  "correctAnswer": "runtime",
  "explanation": {
    "en": "Method overriding resolves which subclass implementation to invoke using the runtime object's actual type (dynamic dispatch), which is Run-time Polymorphism.",
    "ar": "يعتمد إعادة كتابة الدالة (Method overriding) على نوع الكائن الفعلي وقت التشغيل (Dynamic Dispatch)، وهو ما يُعرف بـ Run-time Polymorphism."
  }
} as AssessmentQuestion,
{
  "id": "OOP-PLY-E-002",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "Core Principles",
  "subtopic": "Polymorphism",
  "specialization": "Dynamic Dispatch",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Holding heterogeneous `Circle`, `Rect`, and `Triangle` objects inside `vector<Shape*>` and calling `s->draw()` showcases:",
    "ar": "تخزين كائنات `Circle` و`Rect` في قائمة `Shape` واستدعاء `s->draw()` لكل عنصر دون `if` يمثّل مبدأ:"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Variable Shadowing",
        "ar": "حجب المتغيرات Shadowing"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Tail Call Recursion",
        "ar": "العودية الذيلية"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Runtime Polymorphism",
        "ar": "تعدد الأشكال"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "SQL Database Sharding",
        "ar": "تقسيم قواعد البيانات"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "One abstract `Shape` contract invokes each subclass's specialized behavior cleanly via runtime virtual dispatch.",
    "ar": "واجهة موحدة تنفذ السلوك المخصص لكل نوع فعلي وقت التشغيل."
  },
  "tags": [
    "polymorphism",
    "oop",
    "virtual"
  ]
} as AssessmentQuestion
];
