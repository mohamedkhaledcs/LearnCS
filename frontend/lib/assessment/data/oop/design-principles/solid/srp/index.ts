import { AssessmentQuestion } from '@/lib/assessment/schema';

export const srp_questions: AssessmentQuestion[] = [
{
  "id": "OOP-SRP-E-001",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "SOLID Principles",
  "subtopic": "Single Responsibility (SRP)",
  "specialization": "Cohesion",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "According to the Single Responsibility Principle (SRP), why shouldn't an `Invoice` class compute totals AND send SMTP emails AND print PDFs?",
    "ar": "وفق مبدأ المسؤولية الفردية (SRP)، لماذا لا ينبغي لفئة `Invoice` أن تحسب المبالغ وتُرسل إيميلات وتنشئ PDF في نفس الوقت؟"
  },
  "options": [
    {
      "id": "ram",
      "text": {
        "en": "OOP languages strictly cap any concrete class to declaring a single public method",
        "ar": "تفرض اللغات الكائنية حداً أقصى لا يتجاوز دالة واحدة فقط داخل كل فئة في المشروع"
      }
    },
    {
      "id": "reason",
      "text": {
        "en": "A class should hold just one clear responsibility and reason to change",
        "ar": "يجب أن يكون للفئة مسؤولية واحدة وسبب واحد فقط للتغيير"
      }
    },
    {
      "id": "speed",
      "text": {
        "en": "Splitting responsibilities cleanly doubles hardware CPU clock speed during object dispatch",
        "ar": "تقسيم الفئات يضاعف تردد ساعة المعالج عتادياً ويُلغي الحاجة لإدارة الذاكرة تماماً"
      }
    },
    {
      "id": "sec",
      "text": {
        "en": "Private fields cannot access SMTP",
        "ar": "الحقول الخاصة تمنع البريد"
      }
    }
  ],
  "correctAnswer": "reason",
  "explanation": {
    "en": "Separating `InvoiceCalculator`, `EmailNotifier`, and `PdfExporter` keeps each module cohesive, focused, and independently testable.",
    "ar": "فصل المسؤوليات يقلص تأثير أي تعديل مستقبلي ويسهل اختبارات الوحدات."
  },
  "tags": [
    "solid",
    "architecture",
    "oop"
  ]
} as AssessmentQuestion,
{
  "id": "SE-DES-E-002",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "SOLID Principles",
  "subtopic": "SRP",
  "specialization": "Separation of Concerns",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "A single 800-line class parses CSV invoices, computes discounts, renders HTML emails, AND writes SQL queries directly. Which SOLID principle does this directly breach?",
    "ar": "فئة واحدة من 800 سطر تحلل الفواتير، وتحسب الضرائب، وتنسق رسائل HTML، وتنفذ استعلامات SQL معاً. أي مبدأ في SOLID يُكسر هنا؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Liskov Substitution Principle across derived database payment providers",
        "ar": "مبدأ استبدال ليسكوف (Liskov Substitution) بين الفئات الموروثة في الطباعة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Amortized Dynamic Array Growth across batch invoice allocations",
        "ar": "مبدأ ترتيب رتل الانتظار FIFO عند معالجة طلبات البريد وقواعد البيانات معاً"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Single Responsibility Principle (SRP)",
        "ar": "مبدأ المسؤولية الواحدة (SRP)"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Amortized Array Doubling cleanly",
        "ar": "مضاعفة المصفوفات"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "SRP separates billing math, persistence, and email formatting cleanly so formatting changes never risk corrupting payment calculations.",
    "ar": "فصل المسؤوليات يحمي المنطق المالي من أعطال تغيير التصميم أو استعلامات القاعدة."
  },
  "tags": [
    "solid",
    "srp",
    "clean-code"
  ]
} as AssessmentQuestion
];
