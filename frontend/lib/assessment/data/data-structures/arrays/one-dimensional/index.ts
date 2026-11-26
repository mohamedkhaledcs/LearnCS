import { AssessmentQuestion } from '@/lib/assessment/schema';

export const one_dimensional_questions: AssessmentQuestion[] = [
{
  "id": "DS-ARR-E-001",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Arrays",
  "subtopic": "Static Arrays",
  "specialization": "Memory Layout",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which of the following describes how standard Arrays are stored in memory?",
    "ar": "أي مما يلي يصف كيفية تخزين الـ Arrays القياسية في الذاكرة؟"
  },
  "options": [
    {
      "id": "scattered",
      "text": {
        "en": "Scattered across memory with pointers.",
        "ar": "موزعة عبر الذاكرة باستخدام الـ pointers."
      }
    },
    {
      "id": "disk",
      "text": {
        "en": "On the hard disk exclusively.",
        "ar": "على القرص الصلب فقط."
      }
    },
    {
      "id": "heap",
      "text": {
        "en": "Always in a tree structure in the heap.",
        "ar": "دائماً في هيكل Tree داخل الـ heap."
      }
    },
    {
      "id": "contiguous",
      "text": {
        "en": "In contiguous memory locations.",
        "ar": "في مواقع ذاكرة متجاورة (contiguous)."
      }
    }
  ],
  "correctAnswer": "contiguous",
  "explanation": {
    "en": "Arrays occupy a single contiguous block of virtual memory, which makes element address calculation O(1) via base + index * element_size.",
    "ar": "تشغل المصفوفات كتلة ذاكرة متجاورة متصلة، مما يجعل حساب عنوان أي عنصر يتم في O(1) عبر قاعدة البداية + الفهرس × حجم العنصر."
  }
} as AssessmentQuestion,
{
  "id": "DS-ARR-E-004",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Arrays",
  "subtopic": "Strings",
  "specialization": "Immutable Concat",
  "difficulty": "medium",
  "type": "complexity",
  "codeSnippet": "let out = \"\";\nfor (let i = 0; i < n; i++) out += chars[i];",
  "codeLanguage": "js",
  "question": {
    "en": "In languages with immutable strings (Java, C#, Python), why is joining `N` pieces via `StringBuilder` / `.join()` faster than `+=` in a loop?",
    "ar": "في اللغات التي تكون النصوص فيها غير قابلة للتعديل (Java, C#, Python)، لماذا يتفوق `StringBuilder` أو `join` على `+=` داخل حلقة؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Loop `+=` copies prefixes in O(N²); `StringBuilder`/`.join()` runs in O(N)",
        "ar": "ينسخ `+=` البادئة كل مرة في O(N²)؛ بينما مجمّع النصوص ينجزها في O(N)"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "`StringBuilder` bypasses UTF-8 encoding checks completely inside database network drivers",
        "ar": "يتجاوز `StringBuilder` فحوص ترميز UTF-8، بينما يتعطل `+=` بمجرد تجاوز 256 حرفاً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "In-place `.join()` allocates zero buffers executing character copies in O(1) independent of N",
        "ar": "تنفذ دالة `.join()` كتابة الأحرف كافة في زمن ثابت O(1) بغض النظر عن الطول N"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "`.join()` executes all character writes in O(1) ignoring length N",
        "ar": "لأن `join` يستغرق O(1) دائماً"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Immutable concatenation allocates a brand new growing buffer every step (`1+2+...+N`), whereas builders append into an amortized contiguous buffer cleanly.",
    "ar": "تعديل النص غير القابل للتعديل ينشئ نسخة متزايدة في كل دورة، بينما `StringBuilder` / `join` تجمّع الأجزاء بخطية `O(N)`."
  },
  "tags": [
    "strings",
    "complexity",
    "performance"
  ]
} as AssessmentQuestion
];
