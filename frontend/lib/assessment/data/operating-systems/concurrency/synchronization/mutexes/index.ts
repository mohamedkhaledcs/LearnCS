import { AssessmentQuestion } from '@/lib/assessment/schema';

export const mutexes_questions: AssessmentQuestion[] = [
{
  "id": "OS-SYNC-M-001",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "Concurrency",
  "subtopic": "Synchronization",
  "specialization": "Deadlock",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Which of the following is NOT one of the four Coffman conditions necessary for a Deadlock to occur?",
    "ar": "أي مما يلي ليس واحداً من شروط Coffman الأربعة اللازمة لحدوث Deadlock؟"
  },
  "options": [
    {
      "id": "mutual",
      "text": {
        "en": "Mutual Exclusion",
        "ar": "Mutual Exclusion"
      }
    },
    {
      "id": "hold",
      "text": {
        "en": "Hold and Wait",
        "ar": "Hold and Wait"
      }
    },
    {
      "id": "preemption",
      "text": {
        "en": "No Preemption",
        "ar": "No Preemption"
      }
    },
    {
      "id": "starvation",
      "text": {
        "en": "Starvation",
        "ar": "Starvation"
      }
    }
  ],
  "correctAnswer": "starvation",
  "explanation": {
    "en": "The four Coffman deadlock conditions are Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. Starvation is indefinite postponement, not a Coffman condition.",
    "ar": "شروط Coffman الأربعة للجمود (Deadlock) هي: Mutual Exclusion و Hold and Wait و No Preemption و Circular Wait؛ أما Starvation فمشكلة مختلفة."
  }
} as AssessmentQuestion,
{
  "id": "OS-PRC-M-004",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "Concurrency",
  "subtopic": "Synchronization",
  "specialization": "Mutex vs Semaphore",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "What clean semantic difference separates a binary **Mutex** from a counting **Semaphore** (`count = K`)?",
    "ar": "ما الفرق الدقيق بين **Mutex** وبين **العدّاد Semaphore** (`count = K`)؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Counting Semaphores cannot suspend waiting threads inside Linux kernel schedulers",
        "ar": "لا تستطيع إشارات Semaphore تعليق الخيوط المنتظرة في جدولة نواة لينكس الحديثة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Standard Mutex locks allow any unrelated thread to unlock another thread's critical lock",
        "ar": "تسمح أقفال Mutex لأي خيط خارجي عشوائي بفتح قفل حجزه خيط آخر دون أخطاء"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Semaphores eliminate all CPU scheduling overhead strictly to zero",
        "ar": "Semaphore يلغي عمل المجدول"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Mutex enforces single-thread ownership; Semaphore counts up to K permits",
        "ar": "Mutex قفل ملكية لخيط واحد؛ Semaphore يضبط حتى K تصاريح متزامنة"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "A Mutex is owned (the locking thread must unlock it), while Semaphores act as `K`-slot permits (ideal for DB connection pools or Producer-Consumer signaling).",
    "ar": "يُفتح قفل الـ Mutex من الخيط المالك نفسه حصراً، بينما يدير Semaphore رصيد تصاريح مثل تجمع اتصالات القاعدة."
  },
  "tags": [
    "mutex",
    "semaphore",
    "concurrency"
  ]
} as AssessmentQuestion
];
