import { AssessmentQuestion } from '@/lib/assessment/schema';

export const kmp_questions: AssessmentQuestion[] = [
{
  "id": "CP-KMP-H-001",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Strings",
  "subtopic": "KMP Algorithm",
  "specialization": "Prefix Function π",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "In the Knuth-Morris-Pratt (KMP) prefix function π[i], what does π[i] store and what is the total matching complexity on text T (len N) and pattern P (len M)?",
    "ar": "في خوارزمية KMP، ماذا تخزن دالة البادئة π[i]، وما التعقيد الزمني للبحث عن نمط طوله M داخل نص طوله N؟"
  },
  "options": [
    {
      "id": "nm",
      "text": {
        "en": "First mismatch index in text T requiring full naive quadratic O(N · M) matching",
        "ar": "فهرس أول تعارض في النص الكامل مما يتطلب تشغيل البحث الساذج بزمن O(N · M)"
      }
    },
    {
      "id": "pi",
      "text": {
        "en": "Length of longest proper prefix of P[0..i] matching a suffix; O(N + M)",
        "ar": "طول أطول بادئة فعلية لـ P[0..i] تطابق لاحقته؛ والزمن O(N + M)"
      }
    },
    {
      "id": "hash",
      "text": {
        "en": "Cumulative ASCII character sum of P[0..i] taking sorted O(N log M) lookup time",
        "ar": "مجموع رموز ASCII التراكمي للنمط P[0..i] بزمن مطابقة يبلغ O(N log M)"
      }
    },
    {
      "id": "sort",
      "text": {
        "en": "Lexicographical rank; O(M² + N)",
        "ar": "الترتيب المعجمي بزمن O(M² + N)"
      }
    }
  ],
  "correctAnswer": "pi",
  "explanation": {
    "en": "The prefix function π jumps directly to the best reusable border upon a mismatch without moving backwards in text T, guaranteeing linear O(N + M) runtime.",
    "ar": "تسمح دالة البادئة π بالتراجع الذكي لمؤشر النمط فقط دون العودة للخلف في النص الأصلي، محققة O(N + M) خطياً."
  },
  "tags": [
    "cp",
    "strings",
    "kmp"
  ]
} as AssessmentQuestion,
{
  "id": "CP-RNG-H-005",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "String Algorithms",
  "subtopic": "KMP",
  "specialization": "Prefix Function pi",
  "difficulty": "hard",
  "type": "complexity",
  "question": {
    "en": "What exact guarantee lets **Knuth-Morris-Pratt (KMP)** match pattern `P` (len `M`) inside text `T` (len `N`) in `O(N + M)` without ever backtracking `T`'s index?",
    "ar": "كيف تجد خوارزمية **KMP** تطابق نمط طوله `M` داخل نص طوله `N` في زمن خطي `O(N + M)` دون تراجع مؤشر النص للخلف أبداً؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Hashes adjacent 64-bit sliding characters cleanly with zero possibility of collisions",
        "ar": "يقوم بتجزئة الأحرف المتجاورة برقم 64 بت بدون أي احتمال نظري للتصادم في النص"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "`pi[]` jumps straight to the longest prefix-suffix overlap without moving `i` back",
        "ar": "يعيد `pi[]` محاذاة النمط لأطول بادئة-لاحقة متطابقة دون إرجاع مؤشر النص"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Sorts all repeating text substrings inside balanced search trees before scanning",
        "ar": "يفرز جميع حروف النمط أبجدياً داخل مصفوفة بحجم O(M) قبل مطابقة أي حرف من النص"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Sorting pattern characters lexicographically inside O(M) arrays",
        "ar": "بفرز حروف النمط أبجدياً"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "When `T[i] != P[j]`, `j = pi[j - 1]` jumps seamlessly without restarting `i` backwards (defeating adversarial `aaaa...b` inputs!).",
    "ar": "جدول الفشل `pi[]` يجنب إعادة مطابقة الأحرف المتطابقة سابقاً ويضمن زمناً خطياً في أسوأ الحالات."
  },
  "tags": [
    "kmp",
    "string-algorithms",
    "complexity"
  ]
} as AssessmentQuestion
];
