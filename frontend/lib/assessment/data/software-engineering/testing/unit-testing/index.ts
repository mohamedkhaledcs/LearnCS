import { AssessmentQuestion } from '@/lib/assessment/schema';

export const unit_testing_questions: AssessmentQuestion[] = [
{
  "id": "SE-UNIT-E-001",
  "language": "both",
  "domain": "Software Engineering",
  "topic": "Testing",
  "subtopic": "Unit Testing",
  "specialization": "Isolation & Speed",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which property differentiates a true Unit Test from an Integration/End-to-End Test?",
    "ar": "ما الخاصية التي تميز اختبار الوحدة (Unit Test) عن اختبارات التكامل أو النظام الشاملة؟"
  },
  "options": [
    {
      "id": "iso",
      "text": {
        "en": "Tests an isolated unit fast in memory without real DB or network calls",
        "ar": "يفحص وحدة معزولة في الذاكرة دون قاعدة بيانات أو شبكة حقيقية"
      }
    },
    {
      "id": "ui",
      "text": {
        "en": "Always launches a live headless Chromium browser hitting staging database tables",
        "ar": "يفتح دائماً متصفحاً حياً كاملاً ويتفاعل مع قاعدة البيانات الفعلية عبر الإنترنت"
      }
    },
    {
      "id": "man",
      "text": {
        "en": "Must be executed manually by clicking buttons and typing payloads in QA staging",
        "ar": "يجب تنفيذه يدوياً عبر نقر مهندس الجودة لكل زر والتحقق من الشاشة بالعين المجردة"
      }
    },
    {
      "id": "slow",
      "text": {
        "en": "Requires 10 minutes per run",
        "ar": "يستغرق 10 دقائق"
      }
    }
  ],
  "correctAnswer": "iso",
  "explanation": {
    "en": "Unit tests form the broad fast base of the Testing Pyramid, catching logic regressions in milliseconds.",
    "ar": "اختبارات الوحدات سريعة ومحددة النطاق وتشكل قاعدة هرم الاختبارات لكشف أخطاء المنطق فوراً."
  },
  "tags": [
    "testing",
    "qa",
    "tdd"
  ]
} as AssessmentQuestion,
{
  "id": "PRE-PRG-E-004",
  "language": "both",
  "domain": "Software Engineering",
  "topic": "Testing",
  "subtopic": "Problem Solving",
  "specialization": "Edge Cases",
  "difficulty": "easy",
  "type": "scenario",
  "question": {
    "en": "Before claiming a new sorting or searching function works completely, which inputs MUST you test beyond normal arrays?",
    "ar": "قبل الجزم بسلامة دالة فرز أو بحث جديدة، ما المدخلات الواجب اختبارها إضافةً للمصفوفات الاعتيادية؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Only arrays containing 5 consecutive even numbers",
        "ar": "مصفوفات تحتوي 5 أعداد زوجية فقط"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Only pre-sorted 10-element arrays already ending cleanly",
        "ar": "المصفوفات المرتبة مسبقاً من 10 عناصر"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Empty arrays, single-element arrays, duplicates, and boundary values",
        "ar": "المصفوفة الفارغة، ذات العنصر الواحد، العناصر المكررة، وحدود النطاق"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Variable comments without running executable tests",
        "ar": "مراجعة التعليقات دون تشغيل الاختبارات"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Most indexing bugs hide precisely at length 0, length 1, duplicates, and extreme bounds.",
    "ar": "أغلب أخطاء الفهارس تظهر تحديداً عند الطول صفر و1 والقيم المتطابقة أو الحدية."
  },
  "tags": [
    "edge-cases",
    "testing",
    "fundamentals"
  ]
} as AssessmentQuestion,
{
  "id": "SE-TST-E-002",
  "language": "both",
  "domain": "Software Engineering",
  "topic": "Testing",
  "subtopic": "Unit Testing",
  "specialization": "AAA Structure",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What do the three standard phases **Arrange, Act, Assert** organize inside clean Unit Tests?",
    "ar": "ماذا تنظّم المراحل القياسية الثلاث **Arrange وAct وAssert (AAA)** داخل اختبارات الوحدات؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Compile production SQL schemas -> Deploy cloud containers -> Email release notes",
        "ar": "تجميع مخططات SQL أولاً -> نشر الحاويات السحابية -> إرسال تقارير السجل بالبريد"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Drop local databases -> Run CSS minifiers -> Reboot headless browser daemons",
        "ar": "فرز ملفات الاختبار أبجدياً -> تخطي عبارات التأكيد -> فرض الدمج المباشر على الفرع الرئيسي"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Sort test files -> Skip assertions -> Merge main force",
        "ar": "تخطي التأكيدات ثم الدمج"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Setup test state -> Run single unit behavior -> Verify assertions",
        "ar": "تهيئة المدخلات -> تنفيذ السلوك المطلوب -> التحقق من المخرجات"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Consistent Arrange -> Act -> Assert structure makes failing tests trivial to read and diagnose immediately.",
    "ar": "فصل التهيئة عن الفعل عن التأكيد يجعل كل اختبار واضح القصد وسريع التشخيص."
  },
  "tags": [
    "aaa-pattern",
    "unit-testing",
    "qa"
  ]
} as AssessmentQuestion
];
