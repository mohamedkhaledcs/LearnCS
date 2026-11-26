import { AssessmentQuestion } from '@/lib/assessment/schema';

export const tcp_questions: AssessmentQuestion[] = [
{
  "id": "NW-TCP-M-001",
  "language": "both",
  "domain": "Networking",
  "topic": "Transport Layer",
  "subtopic": "TCP",
  "specialization": "Reliability",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Which of the following is a key difference between TCP and UDP?",
    "ar": "أي مما يلي هو اختلاف رئيسي بين TCP و UDP؟"
  },
  "options": [
    {
      "id": "tcp_faster",
      "text": {
        "en": "TCP is generally faster than UDP.",
        "ar": "الـ TCP بشكل عام أسرع من الـ UDP."
      }
    },
    {
      "id": "udp_reliable",
      "text": {
        "en": "UDP guarantees delivery while TCP does not.",
        "ar": "الـ UDP يضمن التوصيل بينما الـ TCP لا يضمن ذلك."
      }
    },
    {
      "id": "udp_web",
      "text": {
        "en": "UDP is exclusively used for viewing websites.",
        "ar": "الـ UDP يُستخدم حصرياً لتصفح المواقع."
      }
    },
    {
      "id": "tcp_reliable",
      "text": {
        "en": "TCP is connection-oriented and reliable, while UDP is connectionless.",
        "ar": "الـ TCP متصل وموثوق (reliable)، بينما الـ UDP غير متصل (connectionless)."
      }
    }
  ],
  "correctAnswer": "tcp_reliable",
  "explanation": {
    "en": "TCP establishes a connection (3-way handshake), orders segments, detects packet loss, and retransmits dropped data; UDP is lightweight, connectionless, and best-effort.",
    "ar": "ينشئ TCP اتصالاً موثوقاً ويضمن الترتيب وإعادة إرسال الحزم المفقودة، بينما يرسل UDP حزم datagrams بدون اتصال أو ضمان للترتيب."
  }
} as AssessmentQuestion,
{
  "id": "NW-PRT-E-002",
  "language": "both",
  "domain": "Networking",
  "topic": "Transport Layer",
  "subtopic": "TCP vs UDP",
  "specialization": "Protocol Fit",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Real-time multiplayer voice chat prefers **UDP** over **TCP**. Why does TCP hurt interactive audio/video despite zero packet loss?",
    "ar": "يفضّل بث الصوت والألعاب الحية استخدام **UDP** بدلاً من **TCP**؛ لماذا يضر TCP بالتطبيقات الزمنية الحساسة للتأخير؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Head-of-line blocking stalls fresh frames while retransmitting stale packets",
        "ar": "يؤخر TCP تسليم الإطارات الجديدة حتى يعيد إرسال حزمة قديمة فائتة"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "UDP natively ensures 100% lossless ordered encryption over wireless Wi-Fi sockets",
        "ar": "يضمن UDP توصيل كل حزمة صوتية بالترتيب نفسه دون أي فقدان على الشبكات اللاسلكية"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Transport TCP ports cannot process real-time audio packets larger than four bytes",
        "ar": "منافذ TCP ترفض نقل حزم الصوت والفيديو التي يتجاوز حجمها أربعة بايتات فقط"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "UDP automatically merges duplicate LAN IP packets cleanly",
        "ar": "UDP يدمج العناوين"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "In live audio/gaming, arriving late is worse than skipping 1 dropped frame; UDP eliminates handshake and ordered retransmission stalls.",
    "ar": "إعادة إرسال جزء صوتي فات موعده يجمّد المكالمة بأكملها، بينما يتجاوز UDP الفائت ليحافظ على الزمن الحقيقي."
  },
  "tags": [
    "udp",
    "tcp",
    "networking"
  ]
} as AssessmentQuestion,
{
  "id": "NW-PRT-H-005",
  "language": "both",
  "domain": "Networking",
  "topic": "Transport Layer",
  "subtopic": "TCP Congestion Control",
  "specialization": "Packet Drop Response",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "During TCP Congestion Control, how does the sender infer network congestion and adapt transmission rate?",
    "ar": "في التحكم بالازدحام (TCP Congestion Control)، كيف يستنتج المرسِل وجود اختناق في الشبكة وما استجابته؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Intermediate routers broadcast link congestion metrics down via DNS TXT lookups",
        "ar": "تقوم الموجهات بإذاعة سرعات الرابط عبر استعلامات DNS TXT ليقرأها المتصفح مباشرة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "TCP aggressively doubles window burst sizes upon receiving duplicate ACK retries",
        "ar": "يضاعف TCP حجم نافذة الإرسال فوراً عند فقدان الحزم لتعويض البايتات الضائعة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Switches reject SYN packets permanently for 10 minutes",
        "ar": "ترفض المحولات SYN لعشر دقائق"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Timeouts or 3 duplicate ACKs signal congestion, shrinking `cwnd`",
        "ar": "انتهاء المهلة أو تكرار 3 إشعارات ACK يعني ازدحاماً فيقلص `cwnd` تلقائياً"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Slow Start and Congestion Avoidance (`AIMD`) ramp `cwnd` upward smoothly until loss events halve/reset rate to stabilize shared Internet bandwidth.",
    "ar": "يضبط TCP معدل الضخ عبر مراقبة التأكيدات وضبط نافذة الازدحام `cwnd` لمنع انهيار الشبكة."
  },
  "tags": [
    "tcp",
    "congestion-control",
    "networking"
  ]
} as AssessmentQuestion
];
