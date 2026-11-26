import { AssessmentQuestion } from '@/lib/assessment/schema';

export const search_on_answer_questions: AssessmentQuestion[] = [
{
  "id": "AL-SEARCH-H-003",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Searching",
  "subtopic": "Binary Search",
  "specialization": "Implementation Details",
  "difficulty": "hard",
  "type": "debugging",
  "codeLanguage": "c",
  "codeSnippet": "int binarySearch(int arr[], int l, int r, int x) {\n    while (l <= r) {\n        int m = (l + r) / 2;\n        if (arr[m] == x) return m;\n        if (arr[m] < x) l = m + 1;\n        else r = m - 1;\n    }\n    return -1;\n}",
  "question": {
    "en": "This standard binary search implementation has a well-known bug that can occur with very large arrays. What is it?",
    "ar": "هذا الكود الكلاسيكي للـ Binary Search يحتوي على خطأ برمجي معروف يمكن أن يحدث مع الـ Arrays الكبيرة جداً. ما هو؟"
  },
  "options": [
    {
      "id": "overflow",
      "text": {
        "en": "The expression (l + r) / 2 can cause integer overflow.",
        "ar": "المعادلة (l + r) / 2 يمكن أن تسبب integer overflow."
      }
    },
    {
      "id": "infinite",
      "text": {
        "en": "The while loop condition 'l <= r' causes an infinite loop if the element doesn't exist.",
        "ar": "شرط 'l <= r' يسبب حلقة لا نهائية إذا كان العنصر غير موجود."
      }
    },
    {
      "id": "missing_return",
      "text": {
        "en": "It doesn't return the correct index if there are duplicates.",
        "ar": "لا يُرجع الـ index الصحيح في حال وجود عناصر متكررة."
      }
    },
    {
      "id": "syntax",
      "text": {
        "en": "There is a syntax error in the C code.",
        "ar": "يوجد خطأ Syntax في كود الـ C."
      }
    }
  ],
  "correctAnswer": "overflow",
  "explanation": {
    "en": "For very large indices near INT_MAX, computing l + r before dividing by 2 can exceed the maximum 32-bit signed integer and overflow; using l + (r - l) / 2 safely avoids this.",
    "ar": "عند الفهارس الكبيرة جداً قرب INT_MAX، جمع l + r قبل القسمة قد يتسبب في فيض للأعداد الصحيحة (integer overflow)؛ الصيغة l + (r - l) / 2 تمنع ذلك بأمان."
  }
} as AssessmentQuestion
];
