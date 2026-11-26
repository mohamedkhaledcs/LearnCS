import { AssessmentQuestion } from '@/lib/assessment/schema';

export const routing_questions: AssessmentQuestion[] = [
{
  "id": "NW-ROUT-M-001",
  "language": "both",
  "domain": "Networking",
  "topic": "Network Layer",
  "subtopic": "IP Routing",
  "specialization": "Longest Prefix Match & TTL",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "What protects the internet against packets looping forever when a routing table misconfiguration creates a loop?",
    "ar": "ما الذي يحمي الشبكة من دوران الحزم إلى الأبد في حال حدوث خطأ مسار (Routing Loop)؟"
  },
  "options": [
    {
      "id": "dns",
      "text": {
        "en": "Recursive DNS resolvers clear stale router paths automatically every 100 milliseconds",
        "ar": "تقوم خوادم DNS بمسح المسارات المكررة من جداول الموجهات تلقائياً كل مئة مللي ثانية"
      }
    },
    {
      "id": "port",
      "text": {
        "en": "TCP port 80 rewrites duplicate routing table entries before packets leave Ethernet switches",
        "ar": "منفذ 80"
      }
    },
    {
      "id": "ttl",
      "text": {
        "en": "IP TTL / Hop Limit decrements per router and drops at zero",
        "ar": "ينقص حقل TTL عند كل موجّه وتُسقط الحزمة عند وصوله للصفر"
      }
    },
    {
      "id": "mac",
      "text": {
        "en": "Permanent MAC tables",
        "ar": "تثبت جداول عناوين MAC الدائمة اتجاهاً واحداً لجميع الحزم وتمنع عودتها لنفس الموجه"
      }
    }
  ],
  "correctAnswer": "ttl",
  "explanation": {
    "en": "Each hop decrements TTL; if TTL hits 0, the router drops the packet and responds with ICMP Time Exceeded (which `traceroute` exploits!).",
    "ar": "عند نفاد TTL يُسقط الموجه الحزمة ويرسل رسالة ICMP Time Exceeded، وهي نفس الآلية التي يعتمد عليها أمر traceroute."
  },
  "tags": [
    "networking",
    "tcp"
  ]
} as AssessmentQuestion,
{
  "id": "NW-PRT-E-006",
  "language": "both",
  "domain": "Networking",
  "topic": "Network Layer",
  "subtopic": "NAT & DHCP",
  "specialization": "Home Router Roles",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Why can 15 laptops/phones inside one home Wi-Fi network access websites through ONE single public ISP IPv4 address?",
    "ar": "كيف يتمكن 15 جهازاً داخل شبكة منزلية من تصفح الإنترنت باستخدام عنوان IPv4 عام وحيد من مزود الخدمة؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "NAT maps internal `ip:port` pairs to the router's shared public IP+port",
        "ar": "تترجم تقنية NAT عناوين `ip:port` الخاصة إلى العنوان العام والمنافذ على الموجّه"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Wireless switches share identical hardware MAC numbers globally across all clients",
        "ar": "تشترك أجهزة التبديل اللاسلكية في عنوان MAC موحد عالمياً لجميع الهواتف والحواسيب"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Mobile web browsers bypass Layer-3 IP routing over local Wi-Fi connections completely",
        "ar": "تعطّل متصفحات الويب طبقة IP الثالثة كلياً عند الاتصال عبر شبكات Wi-Fi المحلية"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "DNS clones web servers directly onto household SSD drives",
        "ar": "ينسخ DNS المواقع محلياً"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "NAT maps `(private IP, local port) <-> (public IP, translated external port)`, saving scarce IPv4 addresses across millions of homes.",
    "ar": "يحفظ NAT جدول تطابق العناوين الخاصة مع المنافذ العامة لإتاحة تعدد الأجهزة خلف عنوان عام واحد."
  },
  "tags": [
    "nat",
    "ipv4",
    "dhcp"
  ]
} as AssessmentQuestion
];
