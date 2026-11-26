import { AssessmentQuestion } from '@/lib/assessment/schema';

export const isp_questions: AssessmentQuestion[] = [
{
  "id": "OOP-ISP-M-001",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "SOLID Principles",
  "subtopic": "Interface Segregation (ISP)",
  "specialization": "Role Interfaces",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "How does Interface Segregation Principle (ISP) solve 'fat interfaces'?",
    "ar": "كيف يعالج مبدأ فصل الواجهات (ISP) مشكلة الواجهات المتضخمة؟"
  },
  "options": [
    {
      "id": "split",
      "text": {
        "en": "Split fat interfaces into small role-specific contracts",
        "ar": "تقسيم الواجهات الضخمة إلى واجهات صغيرة متخصصة لكل دور"
      }
    },
    {
      "id": "one",
      "text": {
        "en": "Consolidate every service contract in the project into one single global `IPlatform` interface",
        "ar": "دمج جميع واجهات النظام في واجهة عامة واحدة ضخمة `IPlatform` لسهولة الاستدعاء المباشر"
      }
    },
    {
      "id": "throw",
      "text": {
        "en": "Keep fat interfaces unchanged and throw `NotImplementedException` inside all unused methods",
        "ar": "إبقاء الواجهات كما هي مع الاكتفاء برمي استثناء `NotImplementedException` داخل الدوال الفارغة"
      }
    },
    {
      "id": "abs",
      "text": {
        "en": "Replace all interfaces with static classes",
        "ar": "استبدال الواجهات بدوال ساكنة"
      }
    }
  ],
  "correctAnswer": "split",
  "explanation": {
    "en": "Breaking `IMachine` (`print`, `scan`, `fax`) into `IPrinter`, `IScanner`, `IFax` ensures a simple printer doesn't implement empty/throwing `fax()` stubs.",
    "ar": "تقسيم الواجهة المتخمة يمنع وجود دوال ميتة أو استثناءات NotImplemented في الأصناف البسيطة."
  },
  "tags": [
    "solid",
    "architecture",
    "oop"
  ]
} as AssessmentQuestion,
{
  "id": "SE-DES-M-004",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "SOLID Principles",
  "subtopic": "ISP",
  "specialization": "Cohesive Interfaces",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Forcing a read-only Report Printer class to implement a fat `IWorker` interface containing `Scan()`, `Fax()`, and `WriteDb()` methods throwing `NotImplementedException` breaks:",
    "ar": "إجبار فئة طباعة بسيطة على تطبيق واجهة ضخمة تحوي دوال `Fax()` و`Scan()` ورمي `NotImplementedException` ينتهك مبدأ:"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Interface Segregation Principle (ISP)",
        "ar": "مبدأ عزل الواجهات (ISP)"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Write-Ahead Logging Crash Atomicity across SQL schema writers",
        "ar": "مبدأ ذرية سجل الكتابة المسبق Write-Ahead Log عند حفظ المعاملات"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "First Normal Form atomic column separation inside relational entities",
        "ar": "شرط التطبيع الأول لإزالة التكرار من الواجهات المطبوعة وجداول القاعدة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Singleton Resource Caching cleanly",
        "ar": "التخزين المفرد"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Splitting fat interfaces (`IPrinter`, `IScanner`) guarantees clients depend strictly on methods they actually support.",
    "ar": "الواجهات المتخصصة تمنع إجبار الفئات على دوال لا تحتاجها."
  },
  "tags": [
    "isp",
    "solid",
    "interfaces"
  ]
} as AssessmentQuestion
];
