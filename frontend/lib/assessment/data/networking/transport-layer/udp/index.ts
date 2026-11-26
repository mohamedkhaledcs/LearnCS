import { AssessmentQuestion } from '@/lib/assessment/schema';

export const udp_questions: AssessmentQuestion[] = [
{
  "id": "NW-UDP-E-001",
  "language": "both",
  "domain": "Networking",
  "topic": "Transport Layer",
  "subtopic": "UDP",
  "specialization": "Low-Latency Streaming",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Why do live video calls, fast-paced online games, and DNS queries generally prefer UDP over TCP?",
    "ar": "لماذا تفضل مكالمات الفيديو المباشرة وألعاب الفيديو واستعلامات DNS استخدام UDP بدلاً من TCP؟"
  },
  "options": [
    {
      "id": "lat",
      "text": {
        "en": "UDP skips handshakes and stall-inducing retransmissions to minimize latency",
        "ar": "يتجنب UDP المصافحة وتأخير إعادة إرسال الحزم القديمة لتقليل التأخير"
      }
    },
    {
      "id": "rel",
      "text": {
        "en": "UDP guarantees strictly 100% ordered packet arrival while encrypting streams in hardware NICs",
        "ar": "يضمن UDP وصول الحزم مرتبة بنسبة 100% مع التشفير التلقائي داخل بطاقة الشبكة مباشرة"
      }
    },
    {
      "id": "enc",
      "text": {
        "en": "UDP embeds built-in TLS handshake certificates inside every datagram header by default",
        "ar": "يشفر البيانات تلقائياً"
      }
    },
    {
      "id": "port",
      "text": {
        "en": "TCP cannot reach web servers",
        "ar": "بروتوكول TCP لا يستطيع الاتصال بخوادم الويب الحديثة أو فتح عدة منافذ متزامنة عليها"
      }
    }
  ],
  "correctAnswer": "lat",
  "explanation": {
    "en": "In live voice/video or 60fps game state updates, retransmitting stale 200ms-old frames would stall fresh packets: dropping occasional frames via UDP keeps live playback smooth.",
    "ar": "في البث الحي، وصول إطار قديم متأخر لا يفيد بل يجمّد البث؛ لذا نفضل سرعة UDP بلا انتظار."
  },
  "tags": [
    "networking",
    "tcp",
    "udp"
  ]
} as AssessmentQuestion
];
