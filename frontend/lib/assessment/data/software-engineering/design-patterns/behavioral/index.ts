import { AssessmentQuestion } from '@/lib/assessment/schema';

export const behavioral_questions: AssessmentQuestion[] = [
{
  "id": "SE-DPBH-M-001",
  "language": "both",
  "domain": "Software Engineering",
  "topic": "Design Patterns",
  "subtopic": "Behavioral Patterns",
  "specialization": "Strategy Pattern",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Which Behavioral Pattern lets you swap interchangeable algorithms (e.g., DiscountPricing vs HolidayPricing, or ShortestPath heuristics) at runtime without `if/else` chains?",
    "ar": "أي نمط سلوكي (Behavioral Pattern) يتيح تبديل الخوارزميات القابلة للاستبدال (مثل حساب الخصومات أو استراتيجيات الدفع) وقت التشغيل دون سلاسل if/else؟"
  },
  "options": [
    {
      "id": "sing",
      "text": {
        "en": "Singleton Pattern",
        "ar": "Singleton"
      }
    },
    {
      "id": "fac",
      "text": {
        "en": "Facade Pattern",
        "ar": "Facade"
      }
    },
    {
      "id": "build",
      "text": {
        "en": "Builder Pattern",
        "ar": "Builder"
      }
    },
    {
      "id": "strat",
      "text": {
        "en": "Strategy Pattern",
        "ar": "نمط الاستراتيجية"
      }
    }
  ],
  "correctAnswer": "strat",
  "explanation": {
    "en": "Strategy encapsulates a family of interchangeable behaviors behind an interface so context classes delegate work polymorphically at runtime.",
    "ar": "يعزل نمط Strategy عائلة من الخوارزميات خلف واجهة واحدة بحيث يُستبدل التنفيذ بمرونة تامة."
  },
  "tags": [
    "design-patterns",
    "oop",
    "solid"
  ]
} as AssessmentQuestion,
{
  "id": "SE-DES-H-005",
  "language": "both",
  "domain": "Software Engineering",
  "topic": "Design Patterns",
  "subtopic": "Behavioral",
  "specialization": "Observer vs Repository",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "When a learner completes a Quiz, the system unlocks achievements, records XP, AND updates analytics without coupling quiz grading directly to email/notification modules. Which pattern fits cleanly?",
    "ar": "عند اجتياز طالب لاختبار، يتم فتح إنجاز وإضافة نقاط XP وتحديث الإحصائيات دون ربط خدمة التصحيح مباشرة بكل تلك الوحدات. أي نمط يلائم ذلك؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Global Static Singleton Array Mutation shared across request handlers",
        "ar": "مصفوفة عامة ساكنة مشتركة تعدّل مباشرة داخل كل دوال تقييم الاختبار"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Observer / Domain Event Pub-Sub",
        "ar": "نمط المراقب / الأحداث (Observer / Pub-Sub)"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Recursive Depth-First Concrete Class Inheritance inside service controllers",
        "ar": "الوراثة المتعددة المتكررة بعمق بين خدمات التقييم ومحرك إشعارات البريد"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Cartesian SQL Self-Join",
        "ar": "ربط SQL ذاتي"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Publishing a clean `UnitMasteredEvent` allows independent handlers (gamification, stats, badges) to subscribe cleanly without bloating grading code.",
    "ar": "إطلاق حدث نطاق واضح يفصل تصحيح الاختبار عن بقية الآثار التفاعلية بسلاسة."
  },
  "tags": [
    "observer-pattern",
    "design-patterns",
    "architecture"
  ]
} as AssessmentQuestion
];
