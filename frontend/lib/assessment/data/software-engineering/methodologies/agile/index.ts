import { AssessmentQuestion } from '@/lib/assessment/schema';

export const agile_questions: AssessmentQuestion[] = [
{
  "id": "SE-AGILE-E-001",
  "language": "both",
  "domain": "Software Engineering",
  "topic": "Methodologies",
  "subtopic": "Agile",
  "specialization": "Scrum",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "In the Scrum framework, what is the purpose of the Daily Standup (Daily Scrum)?",
    "ar": "في إطار عمل Scrum، ما هو الغرض من الاجتماع اليومي (Daily Standup)؟"
  },
  "options": [
    {
      "id": "sync",
      "text": {
        "en": "To synchronize activities and create a plan for the next 24 hours.",
        "ar": "مزامنة الأنشطة ووضع خطة للـ 24 ساعة القادمة."
      }
    },
    {
      "id": "planning",
      "text": {
        "en": "To plan the entire project timeline.",
        "ar": "تخطيط الجدول الزمني للمشروع بالكامل."
      }
    },
    {
      "id": "review",
      "text": {
        "en": "To demonstrate the final product to the client.",
        "ar": "عرض المنتج النهائي للعميل."
      }
    },
    {
      "id": "code",
      "text": {
        "en": "To write code collaboratively.",
        "ar": "كتابة الكود بشكل تعاوني."
      }
    }
  ],
  "correctAnswer": "sync",
  "explanation": {
    "en": "The Daily Standup is a focused <=15-minute team sync to inspect sprint progress toward the Sprint Goal and align work for the next 24 hours.",
    "ar": "الاجتماع اليومي (Daily Scrum) هو لقاء سريع (15 دقيقة) لمزامنة الفريق وكشف المعوقات وتنظيم عمل الـ 24 ساعة القادمة."
  }
} as AssessmentQuestion,
{
  "id": "SE-TST-H-005",
  "language": "both",
  "domain": "Software Engineering",
  "topic": "Methodologies",
  "subtopic": "Verification",
  "specialization": "End-to-End Check",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "What risk occurs when engineering teams stop testing purely after `npm run build` / `dotnet build` compiles cleanly without running live API + DB checks?",
    "ar": "ما المخاطرة عند الاكتفاء بنجاح الترجمة (`build`) كدليل على جاهزية المنصة دون اختبار الخادم الفعلي وقاعدة البيانات؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "TypeScript compilation statically validates all PostgreSQL unique partial index rules cleanly",
        "ar": "تقوم أدوات الترجمة بفحص قيود قاعدة البيانات الفريدة وتصحيح مسارات الـ API تلقائياً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Frontend CSS minifiers verify backend authorization gates into 200 OK responses",
        "ar": "يتحقق المتصفح تلقائياً أثناء البناء من كافة استجابات الخادم ويصلح أخطاء 401"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Broken migrations, stale JSON seeds, bad routes, or auth/CORS errors ship live",
        "ar": "أعطال الهجرات والبيانات والـ CORS والمصادقة قد تفشل في التشغيل رغم نجاح البناء"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Build tools rewrite failing controller authorization gates into 200 OK automatically",
        "ar": "أدوات البناء تصلح 401 تلقائياً"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Clean compilation proves syntax/type validity, NEVER live HTTP wiring, DB migrations, or end-to-end persistence!",
    "ar": "نجاح الترجمة يثبت صحة الأنواع فقط، بينما يضمن الاختبار التكاملي والحي سلامة المنظومة المتصلة."
  },
  "tags": [
    "e2e-testing",
    "qa",
    "verification"
  ]
} as AssessmentQuestion
];
