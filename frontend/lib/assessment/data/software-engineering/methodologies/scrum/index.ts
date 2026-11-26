import { AssessmentQuestion } from '@/lib/assessment/schema';

export const scrum_questions: AssessmentQuestion[] = [
{
  "id": "SE-SCRUM-E-001",
  "language": "both",
  "domain": "Software Engineering",
  "topic": "Methodologies",
  "subtopic": "Scrum",
  "specialization": "Retrospective",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What is the purpose of the Sprint Retrospective held at the end of a Scrum Sprint?",
    "ar": "ما الهدف من جلسة مراجعة العمليات (Sprint Retrospective) في نهاية كل سبرنت بـ Scrum؟"
  },
  "options": [
    {
      "id": "demo",
      "text": {
        "en": "Demonstrate finished product features directly to external stakeholders and gather product feedback",
        "ar": "عرض الميزات المكتملة في نهاية السبرنت أمام المستثمرين والعملاء وأخذ ملاحظاتهم حول المنتج"
      }
    },
    {
      "id": "imp",
      "text": {
        "en": "Reflect on team workflow and adopt process improvements for the next Sprint",
        "ar": "مراجعة آلية عمل الفريق واعتماد تحسينات عملية للسبرنت القادم"
      }
    },
    {
      "id": "hire",
      "text": {
        "en": "Estimate annual corporate payroll taxes and finalize client billing invoices for management",
        "ar": "حساب الضرائب المالية الشهرية وإغلاق فواتير الاشتراكات الإدارية قبل بدء الدورة التالية"
      }
    },
    {
      "id": "deploy",
      "text": {
        "en": "Delete git branches randomly",
        "ar": "حذف الفروع"
      }
    }
  ],
  "correctAnswer": "imp",
  "explanation": {
    "en": "Sprint Review inspects the *Product Increment* with stakeholders; Sprint Retrospective inspects *how the team worked together*.",
    "ar": "يركز Sprint Review على المنتج نفسه مع أصحاب المصلحة، بينما يركز Retrospective على تحسين أسلوب عمل الفريق."
  },
  "tags": [
    "sdlc",
    "agile"
  ]
} as AssessmentQuestion
];
