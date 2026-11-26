import { AssessmentQuestion } from '@/lib/assessment/schema';

export const tries_questions: AssessmentQuestion[] = [
{
  "id": "DS-TRIE-E-001",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Trees",
  "subtopic": "Tries",
  "specialization": "String Lookup",
  "difficulty": "easy",
  "type": "complexity",
  "question": {
    "en": "In a standard Trie containing D words over alphabet Σ, what is the time complexity to search for a word of length L?",
    "ar": "في شجرة Trie قياسية تحتوي على D كلمة، ما تعقيد البحث عن كلمة طولها L؟"
  },
  "options": [
    {
      "id": "dl",
      "text": {
        "en": "O(D · L) linearly scanning every stored dictionary entry sequentially character by character",
        "ar": "O(D · L) لأنه يمر على كل الكلمات المخزنة في القاموس لمقارنة كل حرف على حدة"
      }
    },
    {
      "id": "ol",
      "text": {
        "en": "O(L), depending only on word length L, not dictionary size D",
        "ar": "O(L) يعتمد على طول الكلمة L فقط لا عدد الكلمات D"
      }
    },
    {
      "id": "logd",
      "text": {
        "en": "O(D log D) sorting full word lists before matching character path prefixes",
        "ar": "O(D log D) بسبب إعادة فرز كلمات القاموس المعجمية قبل مطابقة الحرف الأول"
      }
    },
    {
      "id": "l2",
      "text": {
        "en": "O(L²)",
        "ar": "O(L²)"
      }
    }
  ],
  "correctAnswer": "ol",
  "explanation": {
    "en": "Searching descends at most L character edges from the root, giving O(L) lookup and prefix matching regardless of how many words are stored.",
    "ar": "يمشي البحث حرفاً بحرف من الجذر بحد أقصى L خطوة، لذا فهو O(L) بغض النظر عن ضخامة القاموس."
  },
  "tags": [
    "trees",
    "tries",
    "strings"
  ]
} as AssessmentQuestion,
{
  "id": "DS-TRE-H-005",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Trees",
  "subtopic": "Tries",
  "specialization": "Prefix Lookup",
  "difficulty": "hard",
  "type": "complexity",
  "question": {
    "en": "A Trie indexes 500,000 English dictionary strings. How fast does checking whether any word starts with a 6-character prefix `\"algori\"` run?",
    "ar": "تخزّن شجرة بادئات (Trie) نصف مليون كلمة إنجليزية. ما الزمن اللازم للتحقق من وجود كلمات تبدأ ببادئة طولها `L = 6` أحرف؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "O(L) descending strictly 6 character edges independent of N = 500,000",
        "ar": "O(L) عبر تتبع 6 حواف حروف فقط بغض النظر عن عدد كلمات القاموس N"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "O(N * L) scanning half a million words",
        "ar": "O(N * L) بفحص نصف مليون كلمة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "O(log^2 N) balanced rotation queries",
        "ar": "O(log^2 N)"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "O(N) prefix comparisons",
        "ar": "O(N)"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Trie prefix lookup steps once per prefix letter regardless of total dictionary size `N` (`O(|prefix|)`).",
    "ar": "زمن البحث في الـ Trie يعتمد على طول البادئة `L` فقط مما يجعله مثاليّاً للإكمال التلقائي."
  },
  "tags": [
    "trie",
    "prefix",
    "complexity"
  ]
} as AssessmentQuestion
];
