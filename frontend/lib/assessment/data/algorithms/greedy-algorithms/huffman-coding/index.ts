import { AssessmentQuestion } from '@/lib/assessment/schema';

export const huffman_coding_questions: AssessmentQuestion[] = [
{
  "id": "AL-HUFF-M-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Greedy Algorithms",
  "subtopic": "Huffman Coding",
  "specialization": "Prefix-Free Compression",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "What greedy invariant does Huffman Coding use to minimize total encoded message length?",
    "ar": "ما القاعدة الجشعة التي يعتمد عليها ترميز هوفمان (Huffman Coding) لتقليص طول الرسالة المشفرة؟"
  },
  "options": [
    {
      "id": "fixed",
      "text": {
        "en": "Assigns every character inside the document a uniform fixed 8-bit ASCII prefix",
        "ar": "يعطي كل حرف في الملف طولاً ثابتاً يساوي 8 بتات تماماً بصرف النظر عن تكراره"
      }
    },
    {
      "id": "high",
      "text": {
        "en": "Iteratively merges the two highest-frequency characters first near leaf bottom nodes",
        "ar": "يدمج دائماً الرمزين الأعلى تكراراً في البداية ليضعهما في أعمق أوراق الشجرة"
      }
    },
    {
      "id": "alpha",
      "text": {
        "en": "Sorts characters alphabetically and assigns sequential integers",
        "ar": "يرتب الحروف أبجدياً ويعطيها أرقاماً متسلسلة"
      }
    },
    {
      "id": "freq",
      "text": {
        "en": "Merges the two lowest-frequency nodes so common symbols get shorter codes",
        "ar": "يدمج أقل رمزين تكراراً لتنال الرموز الأكثر تكراراً أكواداً أقصر"
      }
    }
  ],
  "correctAnswer": "freq",
  "explanation": {
    "en": "Using a min-heap, Huffman assigns fewer bits to high-frequency symbols and guarantees a prefix-free binary code tree.",
    "ar": "باستخدام Min-Heap، توضع الرموز النادرة في عمق أكبر وتُمنح الرموز الشائعة أكواداً قصيرة خالية من البادئات المتعارضة (prefix-free)."
  },
  "tags": [
    "greedy",
    "huffman",
    "heaps"
  ]
} as AssessmentQuestion,
{
  "id": "AL-GRD-M-003",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Greedy Algorithms",
  "subtopic": "Huffman Coding",
  "specialization": "Prefix-Free Codes",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Why does Huffman lossless compression merge the two **LOWEST-frequency** characters first using a Min-Heap?",
    "ar": "لماذا يدمج ترميز هوفمان (Huffman Coding) الحرفين الأقل تردداً أولاً عبر Min-Heap؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Min-Heaps strictly sort character alphabets alphabetically before disk encoding starts",
        "ar": "تعمل كومة Min-Heap على فرز الحروف أبجدياً أولاً قبل بدء تشفير النص وضغطه"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Rare symbols sink to longer bit codes while frequent ones stay short near the root",
        "ar": "تأخذ الرموز النادرة أكواداً أطول وتبقى المتكررة قرب الجذر بأقصر البتات"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Pushing rare bytes lower permits lossless deletion of uncommon Unicode codepoints safely",
        "ar": "لتمكين حذف الرموز النادرة كلياً من الملف دون التأثير على قابلية فك الضغط لاحقاً"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "So every character encodes cleanly into fixed 8-bit ASCII bytes",
        "ar": "لتوحيد طول الكود في 8 بت"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Minimizing expected weighted path length guarantees prefix-free binary codes with minimum total compressed bits.",
    "ar": "إعطاء الحروف الشائعة بتات قصيرة جداً يحقق أقل حجم مضغوط بدون تعارض بادئات."
  },
  "tags": [
    "huffman",
    "greedy",
    "compression"
  ]
} as AssessmentQuestion
];
