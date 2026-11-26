import { AssessmentQuestion } from '@/lib/assessment/schema';

export const trie_questions: AssessmentQuestion[] = [
{
  "id": "CP-TRIE-M-001",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Strings",
  "subtopic": "Trie (Prefix Tree)",
  "specialization": "XOR & Dictionary",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Besides prefix auto-complete, why are Binary Bit-Tries frequently used in Competitive Programming?",
    "ar": "إلى جانب البحث بالبادئة النصية، لماذا تُستخدم شجرة التراي الثنائية (Bit-Trie) كثيراً في البرمجة التنافسية؟"
  },
  "options": [
    {
      "id": "xor",
      "text": {
        "en": "Find maximum or minimum XOR pair/subarray greedily in O(B) per number",
        "ar": "إيجاد أكبر أو أصغر ناتج XOR بتتبع البتات جشعاً في زمن O(B)"
      }
    },
    {
      "id": "sort",
      "text": {
        "en": "Multiply dense 1000-digit integer matrices in logarithmic time without carries",
        "ar": "ضرب المصفوفات الرقمية العملاقة من ألف خانة بأسلوب القسمة والدمج دون عمليات نقل"
      }
    },
    {
      "id": "mst",
      "text": {
        "en": "To replace Kruskal's algorithm",
        "ar": "كبديل لخوارزمية Kruskal"
      }
    },
    {
      "id": "scc",
      "text": {
        "en": "Decompose directed cyclic graphs cleanly into condensed Strongly Connected Components",
        "ar": "تحليل الرسوم البيانية الموجهة إلى مكونات مترابطة بقوة DAG بدون حاجة لتشغيل DFS"
      }
    }
  ],
  "correctAnswer": "xor",
  "explanation": {
    "en": "Storing 30-bit/60-bit binary representations MSB-first in a Trie lets a query pick the opposite bit whenever present, maximizing XOR greedily in O(bits).",
    "ar": "بتخزين البتات من اليسار لليمين في Trie ثنائي، يختار الاستعلام المسار المخالف للبت الحالي دائماً لتعظيم XOR بأمان وسرعة."
  },
  "tags": [
    "cp",
    "strings",
    "trie"
  ]
} as AssessmentQuestion
];
