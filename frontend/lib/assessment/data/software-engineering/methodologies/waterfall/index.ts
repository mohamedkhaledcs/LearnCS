import { AssessmentQuestion } from '@/lib/assessment/schema';

export const waterfall_questions: AssessmentQuestion[] = [
{
  "id": "SE-WF-E-001",
  "language": "both",
  "domain": "Software Engineering",
  "topic": "Methodologies",
  "subtopic": "Waterfall",
  "specialization": "Sequential Phases",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "When can the traditional sequential Waterfall model work best despite Agile's popularity?",
    "ar": "متى قد يكون نموذج الشلال التسلسلي (Waterfall) مناسباً رغم انتشار Agile؟"
  },
  "options": [
    {
      "id": "exp",
      "text": {
        "en": "Early-stage startups pivoting weekly based on live consumer A/B experiment metrics",
        "ar": "الشركات الناشئة سريعة التغير التي تعيد تشكيل منتجها أسبوعياً حسب آراء المستخدمين"
      }
    },
    {
      "id": "nocode",
      "text": {
        "en": "Projects without testing phases",
        "ar": "مشاريع بدون اختبارات"
      }
    },
    {
      "id": "ui",
      "text": {
        "en": "Experimental consumer social apps whose layout requirements shift continuously every sprint",
        "ar": "تطبيقات التواصل التجريبية التي تتبدل ميزاتها وواجهاتها باستمرار مع كل إصدار أسبوعي"
      }
    },
    {
      "id": "fixed",
      "text": {
        "en": "Stable projects with fixed, strictly regulated upfront requirements",
        "ar": "المشاريع ذات المتطلبات الثابتة الموثقة مسبقاً تحت ضوابط تنظيمية صارمة"
      }
    }
  ],
  "correctAnswer": "fixed",
  "explanation": {
    "en": "Waterfall commits heavily to sequential phases (Requirements -> Design -> Implementation -> Verification) where late discovery of changing needs is expensive.",
    "ar": "يناسب Waterfall العقود الواضحة المحددة مسبقاً، أما البيئات المتغيرة فتستفيد من التكرارية السريعة في Agile."
  },
  "tags": [
    "sdlc"
  ]
} as AssessmentQuestion
];
