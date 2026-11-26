import { AssessmentQuestion } from '@/lib/assessment/schema';

export const dip_questions: AssessmentQuestion[] = [
{
  "id": "OOP-DIP-M-001",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "SOLID Principles",
  "subtopic": "Dependency Inversion (DIP)",
  "specialization": "Decoupling & DI",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "According to the Dependency Inversion Principle (DIP), what should high-level business logic depend on?",
    "ar": "وفق مبدأ عكس التبعيات (Dependency Inversion - DIP)، على ماذا يجب أن يعتمد منطق الأعمال عالي المستوى؟"
  },
  "options": [
    {
      "id": "new",
      "text": {
        "en": "Instantiate concrete `new MySqlDatabase()` drivers directly inside core domain business classes",
        "ar": "إنشاء كائن قاعدة البيانات المحدد مباشرة بـ `new MySqlDatabase()` داخل خدمات المنطق"
      }
    },
    {
      "id": "abs",
      "text": {
        "en": "High-level policies and low-level details should both depend on abstractions",
        "ar": "المنطق العالي والتفاصيل يعتمدان معاً على التجريدات لا التنفيذ الملموس"
      }
    },
    {
      "id": "glob",
      "text": {
        "en": "Bind domain business rules tightly to static global helper singletons across files",
        "ar": "الاعتماد المباشر على دوال عامة ساكنة ومتغيرات مشتركة ثابتة في كل طبقة من التطبيق"
      }
    },
    {
      "id": "ui",
      "text": {
        "en": "Database entities should import UI components",
        "ar": "الجداول تعتمد على الواجهة"
      }
    }
  ],
  "correctAnswer": "abs",
  "explanation": {
    "en": "Depending on `IUserRepository` rather than concrete `PostgresUserRepository` enables clean Dependency Injection and effortless unit mocking.",
    "ar": "الاعتماد على الواجهة يتيح حقن التبعيات (Dependency Injection) وتبديل قواعد البيانات أو محاكاتها في الاختبارات بسهولة."
  },
  "tags": [
    "solid",
    "architecture",
    "oop"
  ]
} as AssessmentQuestion
];
