import { AssessmentQuestion } from '@/lib/assessment/schema';

export const requirements_questions: AssessmentQuestion[] = [
{
  "id": "SE-REQ-E-001",
  "language": "both",
  "domain": "Software Engineering",
  "topic": "SDLC",
  "subtopic": "Requirements Engineering",
  "specialization": "Functional vs Non-Functional",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "In requirements analysis, \"The API must respond within 200ms at p95 under 1,000 concurrent users\" is an example of:",
    "ar": "في تحليل المتطلبات، تُصنف العبارة \"يجب أن يستجيب الـ API في أقل من 200ms لـ 1000 مستخدم متزامن\" على أنها:"
  },
  "options": [
    {
      "id": "fr",
      "text": {
        "en": "Functional Requirement",
        "ar": "متطلب وظيفي"
      }
    },
    {
      "id": "unit",
      "text": {
        "en": "Unit test fixture",
        "ar": "اختبار وحدة"
      }
    },
    {
      "id": "nfr",
      "text": {
        "en": "Non-Functional Requirement",
        "ar": "متطلب غير وظيفي Non-Functional Requirement"
      }
    },
    {
      "id": "css",
      "text": {
        "en": "UI color token",
        "ar": "تصميم واجهة"
      }
    }
  ],
  "correctAnswer": "nfr",
  "explanation": {
    "en": "Functional requirements state WHAT features the system performs (e.g., reset password); Non-Functional Requirements quantify HOW WELL it runs (latency, uptime, security, throughput).",
    "ar": "المتطلبات الوظيفية تصف الميزات (ماذا يفعل النظام)، أما غير الوظيفية فتحدد خصائص الجودة مثل السرعة والأمان والتوافر."
  },
  "tags": [
    "architecture",
    "sdlc"
  ]
} as AssessmentQuestion,
{
  "id": "PRE-PRG-E-002",
  "language": "both",
  "domain": "Software Engineering",
  "topic": "SDLC",
  "subtopic": "Compilation",
  "specialization": "Error Classification",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Dividing an integer by zero at runtime while computing an average is categorized as which error type?",
    "ar": "حدوث قسمة على الصفر أثناء تشغيل البرنامج وحساب المعدل يُصنَّف ضمن أي نوع من الأخطاء؟"
  },
  "options": [
    {
      "id": "c",
      "text": {
        "en": "Runtime Exception / Crash",
        "ar": "خطأ وقت التشغيل (Runtime Error)"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Syntax Error detected by parser",
        "ar": "خطأ نحوي يكشفه المترجم قبل البدء"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Linker Undefined Reference",
        "ar": "خطأ ربط المكتبات الخارجية"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "CSS Layout Overflow",
        "ar": "تجاوز تنسيق الواجهة"
      }
    }
  ],
  "correctAnswer": "c",
  "explanation": {
    "en": "The syntax is valid, yet an illegal runtime condition (`count == 0`) triggers an error mid-execution.",
    "ar": "صياغة الكود سليمة نحوياً لكن قيمة صفرية أثناء التنفيذ تسببت بانهيار التشغيل."
  },
  "tags": [
    "errors",
    "debugging",
    "fundamentals"
  ]
} as AssessmentQuestion
];
