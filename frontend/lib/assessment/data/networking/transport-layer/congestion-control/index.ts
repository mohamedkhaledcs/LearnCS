import { AssessmentQuestion } from '@/lib/assessment/schema';

export const congestion_control_questions: AssessmentQuestion[] = [
{
  "id": "NW-CC-H-001",
  "language": "both",
  "domain": "Networking",
  "topic": "Transport Layer",
  "subtopic": "TCP Congestion Control",
  "specialization": "AIMD & Slow Start",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "How does TCP react during Slow Start and after detecting packet loss (congestion) via its congestion window (`cwnd`)?",
    "ar": "كيف يتصرف بروتوكول TCP أثناء مرحلة البدء البطيء (Slow Start) وعند اكتشاف فقدان حزم بسبب الازدحام في نافذة الازدحام `cwnd`؟"
  },
  "options": [
    {
      "id": "send",
      "text": {
        "en": "Accelerates packet burst rate unconditionally forever regardless of timeout or loss signals",
        "ar": "يزيد معدل الإرسال إلى ما لا نهاية دون التوقف أو المبالاة بإشارات الضياع وتكرار ACK"
      }
    },
    {
      "id": "udp",
      "text": {
        "en": "Automatically switches active connections cleanly from TCP streams onto stateless UDP datagrams",
        "ar": "يحوّل الاتصال تلقائياً من TCP الموثوق إلى بروتوكول UDP غير المتصل فور حدوث ازدحام"
      }
    },
    {
      "id": "aimd",
      "text": {
        "en": "Grows exponentially up to ssthresh, then linearly, cutting cwnd upon packet loss",
        "ar": "يتضاعف `cwnd` أسياً حتى ssthresh ثم خطياً، وينخفض حاداً عند فقدان الحزم"
      }
    },
    {
      "id": "zero",
      "text": {
        "en": "Closes the browser",
        "ar": "يغلق الاتصال فوراً"
      }
    }
  ],
  "correctAnswer": "aimd",
  "explanation": {
    "en": "Additive Increase / Multiplicative Decrease (AIMD) + Slow Start probes available bandwidth quickly while backing off gracefully when buffers fill.",
    "ar": "يوازن TCP بين استغلال السعة القصوى وتخفيف الضغط عند امتلاء الموجهات عبر مضاعفة ثم زيادة خطية وتقليص حاد عند الفقدان."
  },
  "tags": [
    "networking",
    "tcp"
  ]
} as AssessmentQuestion
];
