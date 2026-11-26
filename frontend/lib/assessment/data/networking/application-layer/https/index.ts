import { AssessmentQuestion } from '@/lib/assessment/schema';

export const https_questions: AssessmentQuestion[] = [
{
  "id": "NW-HTTPS-M-001",
  "language": "both",
  "domain": "Networking",
  "topic": "Application Layer",
  "subtopic": "HTTPS & TLS",
  "specialization": "Asymmetric + Symmetric Encryption",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Why does HTTPS/TLS use asymmetric (public-key) cryptography during the handshake, then switch to symmetric cryptography (AES/ChaCha20) for data transfer?",
    "ar": "لماذا يستخدم HTTPS/TLS التشفير غير المتماثل (المفتاح العام) أثناء المصافحة ثم يتحول للتشفير المتماثل لنقل البيانات؟"
  },
  "options": [
    {
      "id": "plain",
      "text": {
        "en": "Symmetric AES ciphers are mathematically unable to encrypt plain UTF-8 HTTP text payloads",
        "ar": "خوارزميات التشفير المتماثل تعجز رياضياً عن تشفير النصوص والصفحات عبر شبكة HTTP"
      }
    },
    {
      "id": "dns",
      "text": {
        "en": "TLS runs inside DNS queries",
        "ar": "يعمل داخل DNS"
      }
    },
    {
      "id": "cert",
      "text": {
        "en": "HTTPS sends login credentials and JSON bodies in unencrypted plaintext once handshake ends",
        "ar": "يرسل HTTPS كلمات المرور وبيانات JSON كنص مكشوف بمجرد انتهاء مصافحة البداية"
      }
    },
    {
      "id": "hyb",
      "text": {
        "en": "Asymmetric auth exchanges a session key; fast symmetric crypto encrypts data",
        "ar": "غير المتماثل يثبت الهوية ويتبادل المفتاح، ثم يشفر المتماثل البيانات بسرعة"
      }
    }
  ],
  "correctAnswer": "hyb",
  "explanation": {
    "en": "Hybrid cryptography gets the authentication & key-exchange safety of RSA/ECDHE without paying asymmetric math cost per kilobyte.",
    "ar": "التشفير الهجين يجمع أمان تبادل المفاتيح والتحقق من الهوية مع سرعة التشفير المتماثل لنقل البيانات."
  },
  "tags": [
    "networking",
    "http",
    "web"
  ]
} as AssessmentQuestion,
{
  "id": "PRE-WEB-M-003",
  "language": "both",
  "domain": "Networking",
  "topic": "Application Layer",
  "subtopic": "HTTP Status",
  "specialization": "Client vs Server Errors",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "An authenticated learner calls an Admin endpoint and gets `403`. What does `403 Forbidden` specifically signify?",
    "ar": "طالب مسجل الدخول حاول استدعاء مسار إداري فحصل على `403 Forbidden`. ماذا يعني هذا الرمز تحديداً؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Caller identity is authenticated, yet their role lacks permission for the action",
        "ar": "تم التعرف على هوية المستخدم لكن دوره لا يملك الصلاحية لهذا الإجراء"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "DNS resolution timed out before connecting to the server host",
        "ar": "فشل اتصال DNS قبل الوصول للخادم"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "The database table returned zero matching curriculum rows cleanly",
        "ar": "الجدول أرجع صفر نتائج بنجاح"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "The browser failed HTML parsing inside a client script block",
        "ar": "المتصفح فشل في قراءة HTML"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "401 asks for login credentials, whereas 403 rejects an authenticated user whose role/claims fail authorization checks.",
    "ar": "الرمز 401 يطلب تسجيل الدخول أما 403 فيعني نقص الصلاحيات رغم ثبوت الهوية."
  },
  "tags": [
    "http",
    "security",
    "rbac"
  ]
} as AssessmentQuestion,
{
  "id": "PRE-WEB-M-004",
  "language": "both",
  "domain": "Networking",
  "topic": "Application Layer",
  "subtopic": "Frontend vs Backend",
  "specialization": "Trust Boundary",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Why must subscription pricing, quiz grading, and admin checks always be enforced on the Backend API even when validated in React?",
    "ar": "لماذا يجب فرض حساب الدرجات وصلاحيات الاشتراك والإدارة على الخادم الخلفي دائماً حتى لو فُحصت في واجهة React؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "React JavaScript bundles lack hardware precision to run basic numeric comparisons locally",
        "ar": "تفتقر مكونات React في المتصفح إلى القدرة على إجراء مقارنات منطقية وحسابية محلية"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Browser clients run on untrusted machines where checks are easily bypassed",
        "ar": "بيئة المتصفح تحت سيطرة المستخدم ويمكن تزوير طلباتها وتجاوز فحوص الواجهة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "PostgreSQL query indexes function solely when SQL requests originate from curl scripts",
        "ar": "فهارس قاعدة البيانات لا تعمل إلا مع الطلبات القادمة من سطر الأوامر curl مباشرة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "PostgreSQL indexes only function when requests originate from curl",
        "ar": "لأن فهارس القاعدة لا تعمل مع المتصفح"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Clients own zero trust guarantees; backend endpoints act as the single authoritative gate for data integrity and RBAC.",
    "ar": "التحقق في الواجهة يخدم تجربة المستخدم فقط، أما الأمان الحقيقي وقواعد العمل فتُفرض في الخادم وقاعدة البيانات."
  },
  "tags": [
    "web-security",
    "architecture",
    "api"
  ]
} as AssessmentQuestion,
{
  "id": "PRE-WEB-E-005",
  "language": "both",
  "domain": "Networking",
  "topic": "Application Layer",
  "subtopic": "HTTP Verbs",
  "specialization": "GET vs POST",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which HTTP verb is standard for submitting form data to create or mutate a server resource?",
    "ar": "أي فعل HTTP يُعد المعيار القياسي لإرسال بيانات نموذج لإنشاء سجل أو تعديل حالة في الخادم؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "HEAD (metadata check)",
        "ar": "HEAD (فحص الترويسات فقط)"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "OPTIONS (CORS preflight)",
        "ar": "OPTIONS (استعلام المسموحات)"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "POST (body mutation)",
        "ar": "POST"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "TRACE (loopback echo)",
        "ar": "TRACE (إرجاع صدى المسار)"
      }
    }
  ],
  "correctAnswer": "c",
  "explanation": {
    "en": "`GET` reads without side effects, while `POST` carries JSON/form payloads to create state changes cleanly.",
    "ar": "يُخصَّص `GET` للقراءة الآمنة بينما ينقل `POST` البيانات لتنفيذ الإدراج أو التغيير في الخادم."
  },
  "tags": [
    "http",
    "rest",
    "web"
  ]
} as AssessmentQuestion,
{
  "id": "PRE-WEB-H-006",
  "language": "both",
  "domain": "Networking",
  "topic": "Application Layer",
  "subtopic": "Next.js Rendering",
  "specialization": "CORS & Proxies",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "Why might a web frontend route API calls through a local server proxy (`/api/*`) toward the backend origin?",
    "ar": "لماذا توجّه كثير من تطبيقات الويب طلبات `/api/*` عبر وكيل خادم الواجهة نحو الخادم الخلفي؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "To convert JSON payloads back into uncompressed BMP images automatically",
        "ar": "لتحويل استجابات JSON إلى صور تلقائياً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Because PostgreSQL disables TCP access across localhost interfaces",
        "ar": "لأن القاعدة تمنع الاتصال المحلي"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Because browsers refuse TLS certificates on domains exceeding 10 letters",
        "ar": "لأن المتصفح يرفض النطاقات الطويلة"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "To avoid cross-origin browser CORS friction and share clean same-origin routing",
        "ar": "لتوحيد النطاق (Same-Origin) وتفادي تعارضات CORS مع مرونة ترحيل الترويسات"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Same-origin `/api/*` proxying streamlines cookies, headers, and avoids multi-port CORS preflight latency in browser apps.",
    "ar": "الوكيل يحافظ على نفس الأصل Same-Origin للواجهة والـ API مما يسهل إدارة الترويسات والكوكيز ويمنع عوائق CORS."
  },
  "tags": [
    "cors",
    "proxy",
    "architecture"
  ]
} as AssessmentQuestion,
{
  "id": "NW-APP-E-002",
  "language": "both",
  "domain": "Networking",
  "topic": "Application Layer",
  "subtopic": "HTTP Semantics",
  "specialization": "Idempotency",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Why are `GET`, `PUT`, and `DELETE` designed to be **Idempotent**, unlike plain `POST` resource creation?",
    "ar": "لماذا تُصمَّم طلبات `GET` و`PUT` و`DELETE` لتكون **غير مضرة بالتكرار (Idempotent)** مقارنةً بـ `POST`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Standard HTTP strictly prohibits attaching JSON payloads inside PUT or DELETE bodies",
        "ar": "يمنع معيار HTTP تماماً إرسال أي جسم بيانات JSON مع طلبات PUT أو DELETE"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Repeating the same `PUT` or `DELETE` leaves the exact same final server state",
        "ar": "تكرار طلب `PUT` أو `DELETE` نفسه يبقي الحالة النهائية للمورد مطابقة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Client POST requests cannot traverse encrypted TLS/HTTPS network connections cleanly",
        "ar": "لا تستطيع طلبات POST المرور عبر اتصالات TLS/HTTPS المشفرة من المتصفحات الحديثة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Browsers execute PUT calls directly inside local JavaScript timers",
        "ar": "المتصفح ينفذ PUT محلياً"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Calling `PUT /profile {name:'Ali'}` five times produces the exact same profile state as calling once, making retries safe!",
    "ar": "تكرار طلب `PUT` يعطي الحالة النهائية نفسها، بخلاف `POST` الذي قد يكرر الإدراج ما لم نحمِه بقيد فريد."
  },
  "tags": [
    "idempotency",
    "http",
    "rest"
  ]
} as AssessmentQuestion,
{
  "id": "NW-APP-M-004",
  "language": "both",
  "domain": "Networking",
  "topic": "Application Layer",
  "subtopic": "Cookies & Security",
  "specialization": "HttpOnly Cookies",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Why should sensitive authentication session/refresh cookies carry the `HttpOnly` flag?",
    "ar": "لماذا تُضبط الكوكيز الحساسة للجلسات والمصادقة بسمة الأمان `HttpOnly`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Disables symmetric TLS transport encryption across public authentication endpoints",
        "ar": "يعطّل تشفير TLS بين العميل والخادم لتسريع تبادل رموز التوثيق عبر المتصفح"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Permits unencrypted HTTP POST packets to traverse internal server firewall ports cleanly",
        "ar": "يضغط حقول JWT تلقائياً للنصف ويسمح بمرور الاتصال غير المشفر عبر الجدران النارية"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Compresses JWT JSON claims automatically to half size",
        "ar": "لتقليص حجم JSON"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Blocks browser JS (`document.cookie`) from reading tokens during XSS attacks",
        "ar": "يمنع سكريبتات المتصفح (`document.cookie`) من قراءة الكوكي أو سرقته في XSS"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "`HttpOnly` sends cookies strictly along HTTP/HTTPS browser requests while hiding them completely from JavaScript scripts.",
    "ar": "يمنع `HttpOnly` وصول أي نص برمجي مشبوه في الصفحة إلى رمز الجلسة الحساس."
  },
  "tags": [
    "cookies",
    "xss",
    "security"
  ]
} as AssessmentQuestion,
{
  "id": "NW-APP-H-005",
  "language": "both",
  "domain": "Networking",
  "topic": "Application Layer",
  "subtopic": "HTTPS / TLS",
  "specialization": "Handshake Keys",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "Why does HTTPS TLS handshake use **Asymmetric RSA/ECDSA** during connection setup and then switch cleanly to **Symmetric AES** for bulk data transfer?",
    "ar": "لماذا تبدأ مصافحة TLS بـ **التشفير غير المتماثل** (مفتاح عام/خاص) ثم تنتقل فوراً إلى **التشفير المتماثل AES** لنقل بقية البيانات؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Asymmetric verifies identity and shares a key; symmetric encrypts bulk data fast",
        "ar": "غير المتماثل يثبت الهوية ويتبادل المفتاح، والمتماثل يشفر البيانات بسرعة"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Modern browsers mathematically forbid encrypting UTF-8 JSON responses via public RSA keys",
        "ar": "ترفض المتصفحات تشفير نصوص JSON بمفاتيح RSA العامة وتلزمها بالعمل على المنفذ 53 فقط"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Symmetric AES ciphers require publishing secret session keys inside public DNS TXT logs",
        "ar": "خوارزميات التشفير المتماثل تفتقر للمفاتيح السرية وتعتمد كلياً على بث البيانات عبر UDP"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Symmetric algorithms work exclusively over UDP port 53 traffic",
        "ar": "المتماثل يعمل على DNS فقط"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Combining asymmetric key agreement with hardware-accelerated symmetric session encryption gives both zero-prior-trust authentication and multi-gigabit speed!",
    "ar": "الجمع بين الأسلوبين يضمن تبادلاً آمناً دون اتفاق مسبق مع أداء فائق لتشفير كامل الحركة."
  },
  "tags": [
    "tls",
    "https",
    "cryptography"
  ]
} as AssessmentQuestion
];
