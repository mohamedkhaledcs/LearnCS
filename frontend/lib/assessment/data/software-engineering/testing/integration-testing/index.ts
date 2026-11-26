import { AssessmentQuestion } from '@/lib/assessment/schema';

export const integration_testing_questions: AssessmentQuestion[] = [
{
  "id": "SE-TEST-M-001",
  "language": "both",
  "domain": "Software Engineering",
  "topic": "Testing",
  "subtopic": "Integration Testing",
  "specialization": "Types",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Which type of software testing focuses on verifying that different modules or services work together correctly?",
    "ar": "أي نوع من اختبارات البرمجيات (Software testing) يركز على التحقق من أن الوحدات أو الخدمات المختلفة تعمل معاً بشكل صحيح؟"
  },
  "options": [
    {
      "id": "unit",
      "text": {
        "en": "Unit Testing",
        "ar": "Unit Testing"
      }
    },
    {
      "id": "integration",
      "text": {
        "en": "Integration Testing",
        "ar": "Integration Testing"
      }
    },
    {
      "id": "system",
      "text": {
        "en": "System Testing",
        "ar": "System Testing"
      }
    },
    {
      "id": "acceptance",
      "text": {
        "en": "Acceptance Testing",
        "ar": "Acceptance Testing"
      }
    }
  ],
  "correctAnswer": "integration",
  "explanation": {
    "en": "Unit tests isolate a single unit, while Integration Testing specifically verifies the interfaces, contracts, and data flow between collaborating modules or services.",
    "ar": "بينما تفحص اختبارات الوحدات (Unit) جزءاً معزولاً، تتحقق اختبارات التكامل (Integration) من عمل الوحدات والخدمات المتعددة معاً بشكل سليم."
  }
} as AssessmentQuestion,
{
  "id": "SE-TST-M-003",
  "language": "both",
  "domain": "Software Engineering",
  "topic": "Testing",
  "subtopic": "Integration Testing",
  "specialization": "Why Needed",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Even with 100 passing pure Unit Tests, why MUST Subscription and Quiz Grading endpoints run **Integration Tests** through EF Core / DB?",
    "ar": "رغم نجاح اختبارات الوحدات المعزولة، لماذا تحتاج مسارات الاشتراكات وتصحيح الاختبارات إلى **اختبارات تكامل Integration Tests** تمر بـ EF Core/القاعدة؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Verifies real LINQ queries, constraints, status updates, and DTO output together",
        "ar": "تفحص تفاعل LINQ والقيود وتحديث الحالة وتسلسل البيانات الحقيقي معاً"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Pure unit tests run slowly across external Chromium browser TCP sockets by default",
        "ar": "لأن اختبارات الوحدات بطيئة بطبيعتها وتعتمد على فتح اتصالات المتصفح الحقيقي دائماً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Integration suites automatically check visual CSS grid responsiveness without markup",
        "ar": "اختبارات التكامل تراجع تحركات الواجهة وتوافق CSS دون الحاجة لأي استعلامات حقيقية"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Because unit tests forbid checking integer equality assertions",
        "ar": "الوحدات تمنع فحص الأرقام"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Mocked units miss broken SQL filters, null navigation includes, and state overwrite bugs that real DbContext integration tests catch fast!",
    "ar": "تكشف اختبارات التكامل أخطاء الاستعلام الفعلي وضياع الحالة بين الطبقات."
  },
  "tags": [
    "integration-testing",
    "ef-core",
    "qa"
  ]
} as AssessmentQuestion
];
