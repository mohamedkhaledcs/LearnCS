import { AssessmentQuestion } from '@/lib/assessment/schema';

export const open_addressing_questions: AssessmentQuestion[] = [
{
  "id": "DS-OPENA-H-001",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Hash Tables",
  "subtopic": "Open Addressing",
  "specialization": "Primary Clustering & Tombstones",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "In a Hash Table using Linear Probing (Open Addressing), why can deletion NOT simply set an occupied slot back to EMPTY?",
    "ar": "في جدول التجزئة باستخدام Linear Probing، لماذا لا يجوز عند حذف عنصر إعادة الخانة إلى EMPTY مباشرة؟"
  },
  "options": [
    {
      "id": "leak",
      "text": {
        "en": "Marking a hash bucket empty immediately triggers an unmanaged kernel heap memory leak",
        "ar": "إفراغ الخانة مباشرة يسبب تسرباً فورياً في الذاكرة الدائمة دون تحرير الكائن"
      }
    },
    {
      "id": "div0",
      "text": {
        "en": "Leaving an empty slot causes modular index hashing to divide by zero directly",
        "ar": "الخانة الفارغة تُرجع صفراً فتؤدي إلى خطأ القسمة على صفر داخل دالة التجزئة"
      }
    },
    {
      "id": "chain",
      "text": {
        "en": "Setting EMPTY breaks probe chains; use a Tombstone marker instead",
        "ar": "تعيين خانة فارغة يقطع سلسلة البحث؛ نستخدم علامة Tombstone"
      }
    },
    {
      "id": "dup",
      "text": {
        "en": "Empty slots allow duplicate keys",
        "ar": "الخانات الفارغة تسمح بالتكرار"
      }
    }
  ],
  "correctAnswer": "chain",
  "explanation": {
    "en": "Lookup stops when hitting an EMPTY slot. If an intermediate slot along a probe chain becomes EMPTY, keys placed later along that probe become unreachable; a DELETED (tombstone) marker lets search continue while allowing inserts to reuse the slot.",
    "ar": "يتوقف البحث عند أول خانة فارغة EMPTY؛ فإذا حُذفت خانة في منتصف سلسلة الفحص ضاع ما بعدها، لذا نضع وسم محذوف (Tombstone) ليكمل البحث السير."
  },
  "tags": [
    "hash-tables",
    "hashing"
  ]
} as AssessmentQuestion
];
