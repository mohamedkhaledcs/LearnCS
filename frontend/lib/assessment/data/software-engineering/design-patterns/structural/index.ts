import { AssessmentQuestion } from '@/lib/assessment/schema';

export const structural_questions: AssessmentQuestion[] = [
{
  "id": "SE-DPST-M-001",
  "language": "both",
  "domain": "Software Engineering",
  "topic": "Design Patterns",
  "subtopic": "Structural Patterns",
  "specialization": "Adapter vs Decorator",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "How does the Structural Adapter pattern allow incompatible interfaces to collaborate?",
    "ar": "كيف يمكّن النمط البنيوي المحوّل (Adapter Pattern) واجهتين غير متوافقتين من العمل معاً؟"
  },
  "options": [
    {
      "id": "sub",
      "text": {
        "en": "Directly edits and recompiles third-party library source files inside node_modules",
        "ar": "يفتح الشيفرة المصدرية للمكتبة الخارجية ويعدّل دوالها مباشرة لإجبارها على مطابقة الكود"
      }
    },
    {
      "id": "sing",
      "text": {
        "en": "Restricts runtime instantiation of an external gateway object strictly to one global instance",
        "ar": "يقصر إنشاء الكائن على نسخة عالمية واحدة فقط مشتركة بين جميع وحدات النظام المترابطة"
      }
    },
    {
      "id": "wrap",
      "text": {
        "en": "Wraps an existing class and translates target interface calls to its API",
        "ar": "يغلف الكائن الخارجي ويترجم استدعاءات الواجهة المطلوبة إلى دواله دون تعديله"
      }
    },
    {
      "id": "str",
      "text": {
        "en": "Swaps sorting algorithms",
        "ar": "يبدل خوارزميات الفرز"
      }
    }
  ],
  "correctAnswer": "wrap",
  "explanation": {
    "en": "Just like a travel power plug adapter, the Adapter pattern bridges two mismatched interfaces without rewriting existing code.",
    "ar": "تماماً كمحوّل الفيش الكهربائي، يعمل Adapter كجسر ترجمة بين واجهتين غير متوافقتين."
  },
  "tags": [
    "design-patterns",
    "oop"
  ]
} as AssessmentQuestion
];
