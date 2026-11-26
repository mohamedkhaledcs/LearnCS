import { AssessmentQuestion } from '@/lib/assessment/schema';

export const system_testing_questions: AssessmentQuestion[] = [
{
  "id": "SE-SYS-M-001",
  "language": "both",
  "domain": "Software Engineering",
  "topic": "Testing",
  "subtopic": "System & E2E Testing",
  "specialization": "End-to-End Verification",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Why does the Testing Pyramid keep End-to-End (System) tests smaller in number at the apex than Unit Tests?",
    "ar": "لماذا يُبقي هرم الاختبارات عدد الاختبارات الشاملة (End-to-End) أصغر عند القمة مقارنة باختبارات الوحدات؟"
  },
  "options": [
    {
      "id": "bad",
      "text": {
        "en": "Modern headless browsers cannot click DOM buttons or submit authentication forms reliably",
        "ar": "المتصفحات الآلية لا تستطيع اختبار النقر على الأزرار أو نماذج تسجيل الدخول بالمتصفح"
      }
    },
    {
      "id": "sec",
      "text": {
        "en": "Fast in-memory unit tests already render full CSS pixels and verify live database queries",
        "ar": "اختبارات الوحدات السريعة ترسم واجهات CSS وتتحقق من استعلامات قاعدة البيانات الحقيقية"
      }
    },
    {
      "id": "cost",
      "text": {
        "en": "E2E tests validate real flows, but are slower and more brittle than unit tests",
        "ar": "اختبارات E2E أبطأ وأكثر هشاشة في الصيانة مقارنة باختبارات الوحدات"
      }
    },
    {
      "id": "ci",
      "text": {
        "en": "CI servers cannot run databases",
        "ar": "لا تقبل الخوادم قواعد بيانات"
      }
    }
  ],
  "correctAnswer": "cost",
  "explanation": {
    "en": "Test logic edge cases fast via unit tests, API contracts via integration tests, and critical user journeys end-to-end via system tests.",
    "ar": "نختبر الحالات الدقيقة باختبارات الوحدات السريعة، ونختبر المسارات الحرجة المتكاملة بالكامل بـ E2E."
  },
  "tags": [
    "testing",
    "qa"
  ]
} as AssessmentQuestion,
{
  "id": "SE-TST-E-006",
  "language": "both",
  "domain": "Software Engineering",
  "topic": "Testing",
  "subtopic": "Test Isolation",
  "specialization": "No Shared State",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Test B passes ONLY when Test A runs immediately beforehand, and fails cleanly when run alone! What best practice was violated?",
    "ar": "ينجح الاختبار B فقط عندما يعمل الاختبار A قبله مباشرة، ويفشل إذا شُغِّل بمفرده! أي قاعدة جودة اختبارات كُسرت؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Polymorphic Inheritance Override leakage across service tests",
        "ar": "تجاوز الوراثة المتعددة للأشكال داخل دوال التحقق المشتركة بين الاختبارات"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Binary Search Midpoint Overflow across asynchronous mock databases",
        "ar": "فيضان فهرس البحث الثنائي ونقاط التجاوب العرضية داخل متصفح الاختبار الآلي"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Tailwind Responsive Breakpoints",
        "ar": "نقاط الاستجابة"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Test Isolation",
        "ar": "عزل الاختبارات (Test Isolation)"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Order-dependent tests create flaky CI suites; allocate clean per-test databases (`Guid.NewGuid()`) or fixtures every time.",
    "ar": "الاعتماد المتبادل يولد اختبارات متقلبة (Flaky Tests)؛ كل اختبار ينشئ حالته النظيفة الخاصة."
  },
  "tags": [
    "test-isolation",
    "unit-testing",
    "qa"
  ]
} as AssessmentQuestion
];
