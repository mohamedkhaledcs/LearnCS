import { buildExpandedQuestion, type CompactQuestionSpec } from "./helpers";
import type { AssessmentQuestion } from "@/lib/assessment/schema";

const SPECS: { unitId: string; item: CompactQuestionSpec }[] = [
  // 1. unit-computer-basics-foundations (+5)
  {
    unitId: "unit-computer-basics-foundations",
    item: {
      id: "EXP-CPU-101", domain: "Operating Systems", topic: "Hardware", subtopic: "Memory Hierarchy", difficulty: "easy", type: "concept", slotIndex: 0,
      question: { en: "Which CPU storage tier sits directly inside processor cores for single-cycle access?", ar: "أي طبقة تخزين تقع مباشرة داخل أنوية المعالج للوصول خلال دورة ساعة واحدة؟" },
      correct: { en: "CPU Registers", ar: "المسجلات Registers" },
      distractors: [{ en: "NVMe SSD Storage", ar: "أقراص التخزين الدائمة NVMe SSD" }, { en: "DDR5 Main RAM", ar: "ذاكرة الوصول العشوائي الرئيسية DDR5 RAM" }, { en: "External USB Flash", ar: "وحدة تخزين USB الخارجية القابلة للإزالة" }],
      explanation: { en: "Registers are flip-flop circuits inside the CPU core itself, faster than L1 cache and RAM.", ar: "المسجلات دوائر داخل نواة المعالج وهي الأسرع على الإطلاق." }
    }
  },
  {
    unitId: "unit-computer-basics-foundations",
    item: {
      id: "EXP-CPU-102", domain: "Operating Systems", topic: "Hardware", subtopic: "Von Neumann", difficulty: "medium", type: "concept", slotIndex: 1,
      question: { en: "During the Fetch-Decode-Execute cycle, what holds the memory address of the next instruction?", ar: "أثناء دورة الجلب والتنفيذ، ما الذي يحتفظ بعنوان التعليمة التالية؟" },
      correct: { en: "The Program Counter (PC) register", ar: "مسجل عداد البرنامج PC" },
      distractors: [{ en: "The Arithmetic Logic Unit (ALU)", ar: "وحدة الحساب والمنطق ALU المسؤولة عن العمليات" }, { en: "The SSD sector controller block", ar: "وحدة تحكم قطاعات القرص الصلب والتخزين" }, { en: "The graphics frame buffer chip", ar: "ذاكرة إطار العرض الرسومي للشاشة" }],
      explanation: { en: "The Control Unit reads the instruction pointed to by the Program Counter and increments PC afterward.", ar: "وحدة التحكم تجلب التعليمة من العنوان المخزن في عداد البرنامج ثم تحدث قيمته." }
    }
  },
  {
    unitId: "unit-computer-basics-foundations",
    item: {
      id: "EXP-CPU-103", domain: "Operating Systems", topic: "Hardware", subtopic: "Kernel Mode", difficulty: "medium", type: "scenario", slotIndex: 2,
      question: { en: "Why does an application invoke a System Call instead of touching disk hardware ports directly?", ar: "لماذا يستدعي التطبيق System Call بدلاً من مخاطبة منافذ القرص الصلب مباشرة؟" },
      correct: { en: "User Mode lacks hardware privilege", ar: "وضع المستخدم مقيد الصلاحية" },
      distractors: [{ en: "RAM forbids read operations in User Mode", ar: "ذاكرة RAM تمنع القراءة في وضع المستخدم نهائياً" }, { en: "Disks require an active web browser", ar: "الأقراص تتطلب تشغيل متصفح ويب أولاً" }, { en: "Compilers remove all I/O statements", ar: "المترجم يحذف أوامر الإدخال والإخراج تلقائياً" }],
      explanation: { en: "Unprivileged User Mode traps into Kernel Mode via a System Call so the OS enforces permissions safely.", ar: "وضع المستخدم مقيد، لذا ينتقل عبر System Call إلى النواة لإدارة العتاد بأمان." }
    }
  },
  {
    unitId: "unit-computer-basics-foundations",
    item: {
      id: "EXP-CPU-104", domain: "Operating Systems", topic: "Hardware", subtopic: "Cache Locality", difficulty: "hard", type: "code-trace", slotIndex: 3,
      question: { en: "Why is scanning array elements sequentially much faster than hopping randomly across giant heaps?", ar: "لماذا يكون مسح عناصر المصفوفة تسلسلياً أسرع بكثير من القفز العشوائي بالذاكرة؟" },
      correct: { en: "Spatial locality keeps cache lines warm", ar: "التقارب المكاني يحفظ خطوط Cache" },
      distractors: [{ en: "Random pointers double integer bit width", ar: "المؤشرات العشوائية تضاعف حجم الأعداد بالذاكرة" }, { en: "Sequential scans bypass all ALU circuits", ar: "المسح التسلسلي يتجاوز وحدة ALU الحسابية دائماً" }, { en: "Cache lines only work for text files", ar: "خطوط Cache مخصصة للنصوص البرمجية فقط" }],
      explanation: { en: "RAM loads 64-byte cache lines into L1/L2 cache; sequential traversal hits adjacent bytes already cached.", ar: "المعالج يجلب 64 بايت متجاورة إلى Cache، لذا المسح المتتابع يحقق أعلى نسبة إصابة." }
    }
  },
  {
    unitId: "unit-computer-basics-foundations",
    item: {
      id: "EXP-CPU-105", domain: "Operating Systems", topic: "Hardware", subtopic: "RAM vs Storage", difficulty: "easy", type: "concept", slotIndex: 0,
      question: { en: "What happens to active program data held in DRAM when a workstation unexpectedly loses power?", ar: "ماذا يحدث لبيانات البرامج النشطة في ذاكرة DRAM عند انقطاع الكهرباء فجأة؟" },
      correct: { en: "Volatile contents clear immediately", ar: "تُمحى المحتويات المتطايرة فوراً" },
      distractors: [{ en: "DRAM auto-flushes itself to GitHub", ar: "تُحفظ البيانات تلقائياً إلى الشبكة الخارجية" }, { en: "Values stay frozen inside L1 cache forever", ar: "تبقى القيم ثابتة للأبد داخل ذاكرة المعالج L1" }, { en: "The OS moves registers to BIOS permanently", ar: "ينقل نظام التشغيل المسجلات إلى BIOS للأبد" }],
      explanation: { en: "DRAM capacitors rely on constant electrical refresh; only non-volatile SSD/HDD media retain state unpowered.", ar: "ذاكرة DRAM متطايرة تفقد شحنتها فوراً بعكس وسائط التخزين الدائمة مثل SSD." }
    }
  },

  // 2. unit-data-representation-foundations (+5)
  {
    unitId: "unit-data-representation-foundations",
    item: {
      id: "EXP-REP-101", domain: "Programming Fundamentals", topic: "Encoding", subtopic: "Binary & Hex", difficulty: "easy", type: "code-output", slotIndex: 1,
      question: { en: "What is the hexadecimal equivalent of the binary byte `10110110`?", ar: "ما هو المكافئ بالنظام الست عشري (Hex) للبايت الثنائي `10110110`؟" },
      correct: { en: "0xB6", ar: "0xB6" },
      distractors: [{ en: "0xA5", ar: "القيمة 0xA5" }, { en: "0xC4", ar: "القيمة 0xC4" }, { en: "0xD8", ar: "القيمة 0xD8" }],
      explanation: { en: "Splitting into 4-bit nibbles gives `1011` (11 = B) and `0110` (6), resulting in `0xB6`.", ar: "بتقسيم البايت إلى 4 بتات نحصل على `1011` (= B) و `0110` (= 6) أي `0xB6`." }
    }
  },
  {
    unitId: "unit-data-representation-foundations",
    item: {
      id: "EXP-REP-102", domain: "Programming Fundamentals", topic: "Encoding", subtopic: "Integers", difficulty: "medium", type: "concept", slotIndex: 2,
      question: { en: "How many distinct values can an unsigned 1-byte (8-bit) integer represent?", ar: "كم عدداً من القيم المختلفة يمكن تمثيلها في عدد صحيح غير موقع بحجم 1 بايت (8-bit)؟" },
      correct: { en: "256 values (0..255)", ar: "256 قيمة" },
      distractors: [{ en: "128 values (0..127)", ar: "128 قيمة تبدأ من 0 إلى 127" }, { en: "255 values (1..255)", ar: "255 قيمة موجبة فقط دون صفر" }, { en: "512 values (0..511)", ar: "512 قيمة كاملة مضاعفة" }],
      explanation: { en: "With 8 bits there are `2^8 = 256` unique bit patterns covering integers from 0 up to 255 inclusive.", ar: "وجود 8 بتات يعطي `2^8 = 256` احتمالاً فريداً تبدأ من 0 وتنتهي عند 255." }
    }
  },
  {
    unitId: "unit-data-representation-foundations",
    item: {
      id: "EXP-REP-103", domain: "Programming Fundamentals", topic: "Encoding", subtopic: "UTF-8", difficulty: "medium", type: "concept", slotIndex: 3,
      question: { en: "Why is UTF-8 the dominant encoding on the modern web instead of fixed 32-bit UTF-32?", ar: "لماذا يهيمن ترميز UTF-8 على الويب الحديث بدلاً من UTF-32 ثابت الحجم؟" },
      correct: { en: "Variable length keeps ASCII 1-byte", ar: "طول متغير يحافظ على بايت ASCII" },
      distractors: [{ en: "UTF-8 ignores non-Latin script sets", ar: "لأن UTF-8 يتجاهل الحروف غير اللاتينية تماماً" }, { en: "UTF-32 fails to encode English letters", ar: "لأن UTF-32 يعجز عن تمثيل الحروف الإنجليزية" }, { en: "UTF-8 compresses PNG images inline", ar: "لأن UTF-8 يضغط ملفات الصور والوسائط تلقائياً" }],
      explanation: { en: "UTF-8 stays backward-compatible with 1-byte ASCII while encoding all Unicode symbols in 1 to 4 bytes.", ar: "يجمع UTF-8 بين التوافق مع ASCII ببايت واحد ودعم جميع لغات العالم حتى 4 بايت." }
    }
  },
  {
    unitId: "unit-data-representation-foundations",
    item: {
      id: "EXP-REP-104", domain: "Programming Fundamentals", topic: "Encoding", subtopic: "Floating Point", difficulty: "hard", type: "debugging", slotIndex: 0,
      codeSnippet: `const a = 0.1 + 0.2;\nconsole.log(a === 0.3);`,
      codeLanguage: "javascript",
      question: { en: "What does this IEEE-754 floating-point equality check print to the console?", ar: "ماذا يطبع اختبار المساواة التالي للأعداد العشرية بنظام IEEE-754؟" },
      correct: { en: "false", ar: "false" },
      distractors: [{ en: "true", ar: "القيمة المنطقية true" }, { en: "NaN", ar: "القيمة غير الرقمية NaN" }, { en: "SyntaxError", ar: "خطأ الصياغة SyntaxError" }],
      explanation: { en: "0.1 and 0.2 are repeating fractions in base-2, leaving `0.30000000000000004`, so exact `=== 0.3` returns false.", ar: "الأعداد 0.1 و 0.2 لا تُحفظ بدقة تامة في النظام الثنائي مما يجعل المجموع يختلف بهامش ضئيل جداً." }
    }
  },
  {
    unitId: "unit-data-representation-foundations",
    item: {
      id: "EXP-REP-105", domain: "Programming Fundamentals", topic: "Encoding", subtopic: "ASCII", difficulty: "easy", type: "concept", slotIndex: 1,
      question: { en: "Which decimal ASCII code represents uppercase character `'A'`?", ar: "ما الرمز العشري الممثل للحرف الكبير `'A'` في جدول ASCII؟" },
      correct: { en: "65", ar: "65" },
      distractors: [{ en: "97", ar: "الرمز العشري 97" }, { en: "48", ar: "الرمز العشري 48" }, { en: "32", ar: "الرمز العشري 32" }],
      explanation: { en: "In ASCII, `'0'` starts at 48, `'A'` starts at 65, and lowercase `'a'` starts at 97.", ar: "في ASCII يبدأ `'0'` عند 48 و `'A'` عند 65 و `'a'` عند 97." }
    }
  },

  // 3. unit-binary-arithmetic-encoding (+5)
  {
    unitId: "unit-binary-arithmetic-encoding",
    item: {
      id: "EXP-BIT-101", domain: "Programming Fundamentals", topic: "Bitwise", subtopic: "XOR", difficulty: "easy", type: "code-output", slotIndex: 2,
      codeSnippet: `int x = 5;\nint y = 5;\ncout << (x ^ y);`,
      question: { en: "What is printed by the XOR operation `5 ^ 5`?", ar: "ما ناتج تنفيذ العملية المنطقية `5 ^ 5` بالـ XOR؟" },
      correct: { en: "0", ar: "0" },
      distractors: [{ en: "5", ar: "العدد 5" }, { en: "10", ar: "العدد 10" }, { en: "25", ar: "العدد 25" }],
      explanation: { en: "Any integer XORed with itself yields 0 because matching bit positions cancel out.", ar: "عملية XOR على أي قيمة مع نفسها تعطي دائماً 0 لأن البتات المتطابقة تلغي بعضها." }
    }
  },
  {
    unitId: "unit-binary-arithmetic-encoding",
    item: {
      id: "EXP-BIT-102", domain: "Programming Fundamentals", topic: "Bitwise", subtopic: "Bit Masks", difficulty: "medium", type: "code-output", slotIndex: 3,
      question: { en: "Which expression tests whether bit `k` (0-indexed from LSB) is set in non-negative integer `n`?", ar: "أي تعبير يتحقق من أن البت رقم `k` مفعّل (يساوي 1) في العدد `n`؟" },
      correct: { en: "(n & (1 << k)) != 0", ar: "(n & (1 << k)) != 0" },
      distractors: [{ en: "(n | (1 << k)) == 0", ar: "التعبير (n | (1 << k)) == 0" }, { en: "(n ^ (1 << k)) == 1", ar: "التعبير (n ^ (1 << k)) == 1" }, { en: "(n + (1 << k)) == k", ar: "التعبير (n + (1 << k)) == k" }],
      explanation: { en: "Shifting `1 << k` creates a mask with only bit `k` set; bitwise AND preserves bit `k` alone.", ar: "إزاحة الواحد `k` خانة ثم تطبيق `&` يعزل البت المطلوب فقط دون بقية البتات." }
    }
  },
  {
    unitId: "unit-binary-arithmetic-encoding",
    item: {
      id: "EXP-BIT-103", domain: "Programming Fundamentals", topic: "Bitwise", subtopic: "Two's Complement", difficulty: "medium", type: "concept", slotIndex: 0,
      question: { en: "How do you compute the Two's Complement negation (`-x`) from the binary pattern of `x`?", ar: "كيف نحسب سالب العدد (`-x`) باستخدام تمثيل Two's Complement؟" },
      correct: { en: "Invert all bits and add 1", ar: "عكس البتات وإضافة 1" },
      distractors: [{ en: "Flip only the middle nibble bit", ar: "عكس البتات الوسطى من العدد فقط دون جمع" }, { en: "Multiply every bit by two", ar: "ضرب كل خانة ثنائية في العدد اثنين" }, { en: "Shift all bits two slots left", ar: "إزاحة جميع البتات لليسار مرتين متتاليتين" }],
      explanation: { en: "In Two's Complement arithmetic, `~x + 1` equals `-x`, giving a single unique zero representation.", ar: "القاعدة القياسية لـ Two's Complement هي عكس البتات `~x` ثم جمع `1`." }
    }
  },
  {
    unitId: "unit-binary-arithmetic-encoding",
    item: {
      id: "EXP-BIT-104", domain: "Programming Fundamentals", topic: "Bitwise", subtopic: "Shift Operators", difficulty: "easy", type: "code-output", slotIndex: 1,
      question: { en: "For non-negative integer `x = 12`, what does `x >> 2` compute?", ar: "للعدد الصحيح `x = 12`، ما قيمة `x >> 2`؟" },
      correct: { en: "3", ar: "3" },
      distractors: [{ en: "6", ar: "الناتج 6" }, { en: "24", ar: "الناتج 24" }, { en: "48", ar: "الناتج 48" }],
      explanation: { en: "Right-shifting an unsigned integer by 2 bits performs integer floor division by `2^2 = 4`, so `12 / 4 = 3`.", ar: "الإزاحة لليمين بمقدار 2 تقسم العدد صحيحاً على `2^2 = 4` لتنتج `3`." }
    }
  },
  {
    unitId: "unit-binary-arithmetic-encoding",
    item: {
      id: "EXP-BIT-105", domain: "Programming Fundamentals", topic: "Bitwise", subtopic: "Logic Gates", difficulty: "medium", type: "concept", slotIndex: 2,
      question: { en: "Which basic logic gate outputs `1` ONLY when both inputs equal `1`?", ar: "أي بوابة منطقية تعطي ناتج `1` فقط عندما يكون كلا المدخلين `1`؟" },
      correct: { en: "AND Gate", ar: "بوابة AND" },
      distractors: [{ en: "OR Gate", ar: "بوابة OR المنطقية" }, { en: "XOR Gate", ar: "بوابة XOR المنطقية" }, { en: "NAND Gate", ar: "بوابة NAND المنطقية" }],
      explanation: { en: "An AND gate outputs 1 exclusively when all inputs are high (1).", ar: "بوابة AND تعطي 1 فقط عند تحقق جميع المدخلات معاً." }
    }
  },

  // 4. unit-internet-web-basics (+5)
  {
    unitId: "unit-internet-web-basics",
    item: {
      id: "EXP-WEB-101", domain: "Networking", topic: "Web Foundations", subtopic: "DNS", difficulty: "easy", type: "concept", slotIndex: 3,
      question: { en: "What is the primary job of DNS when a browser requests `https://learncs.dev`?", ar: "ما الدور الرئيسي لنظام DNS عند طلب المتصفح لعنوان مثل `https://learncs.dev`؟" },
      correct: { en: "Resolves domain names into IP addresses", ar: "تحويل اسم النطاق إلى IP" },
      distractors: [{ en: "Compiles React components into C++ code", ar: "ترجمة مكونات الواجهة React إلى لغة C++" }, { en: "Allocates extra DRAM inside the server", ar: "تخصيص ذاكرة RAM إضافية على الخادم البعيد" }, { en: "Signs PostgreSQL database rows locally", ar: "توقيع صفوف قاعدة بيانات PostgreSQL محلياً" }],
      explanation: { en: "DNS acts like the internet's distributed directory, translating hostnames into routable IP addresses.", ar: "يترجم DNS اسم الموقع المفهوم بشرياً إلى عنوان IP لتتمكن حزم الشبكة من الوصول للخادم." }
    }
  },
  {
    unitId: "unit-internet-web-basics",
    item: {
      id: "EXP-WEB-102", domain: "Networking", topic: "Web Foundations", subtopic: "HTTP Status", difficulty: "easy", type: "scenario", slotIndex: 0,
      question: { en: "When an API rejects a request because the user's JWT token is missing or invalid, which status code is standard?", ar: "عندما يرفض الـ API طلباً بسبب غياب أو عدم صلاحية JWT token، ما رمز الحالة القياسي؟" },
      correct: { en: "401 Unauthorized", ar: "401 Unauthorized" },
      distractors: [{ en: "201 Created", ar: "الرمز 201 Created" }, { en: "304 Not Modified", ar: "الرمز 304 Not Modified" }, { en: "502 Bad Gateway", ar: "الرمز 502 Bad Gateway" }],
      explanation: { en: "HTTP 401 indicates missing or invalid authentication credentials, while 403 means authenticated but forbidden.", ar: "الرمز 401 يعني نقص بيانات المصادقة، بينما 403 يعني أنه مصادق عليه لكنه لا يملك الصلاحية." }
    }
  },
  {
    unitId: "unit-internet-web-basics",
    item: {
      id: "EXP-WEB-103", domain: "Networking", topic: "Web Foundations", subtopic: "TLS/HTTPS", difficulty: "medium", type: "concept", slotIndex: 1,
      question: { en: "What crucial security protection does HTTPS add over plain HTTP traffic?", ar: "ما الحماية الجوهرية التي يضيفها HTTPS فوق بروتوكول HTTP العادي؟" },
      correct: { en: "TLS encryption and server identity checks", ar: "تشفير TLS والتحقق من الخادم" },
      distractors: [{ en: "Unencrypted plain text query strings", ar: "إرسال كلمات المرور كنص واضح تماماً دون تشفير" }, { en: "Automatic bypassing of DNS resolution", ar: "تجاوز البحث عن العنوان في DNS تماماً" }, { en: "Removing all TCP packet headers", ar: "حذف جميع رؤوس حزم TCP بالكامل في الشبكة" }],
      explanation: { en: "HTTPS wraps HTTP inside TLS to ensure confidentiality, integrity against tampering, and server certificate verification.", ar: "يستخدم HTTPS طبقة TLS لتشفير الاتصال ومنع التلاعب وضمان موثوقية الخادم." }
    }
  },
  {
    unitId: "unit-internet-web-basics",
    item: {
      id: "EXP-WEB-104", domain: "Networking", topic: "Web Foundations", subtopic: "Browser Rendering", difficulty: "medium", type: "concept", slotIndex: 2,
      question: { en: "In a browser rendering pipeline, what tree combines DOM structure and CSS styles before layout?", ar: "في متصفح الويب، ما الشجرة التي تدمج بنية DOM مع تنسيقات CSS قبل حساب المواضع؟" },
      correct: { en: "The Render Tree", ar: "شجرة العرض Render Tree" },
      distractors: [{ en: "The Binary Segment Tree", ar: "شجرة القطع الثنائية للبيانات" }, { en: "The SQL Foreign Key Tree", ar: "شجرة المفاتيح الأجنبية لقواعد البيانات" }, { en: "The Process PCB Tree", ar: "شجرة كتل العمليات في النظام" }],
      explanation: { en: "The browser builds DOM + CSSOM into the Render Tree, then performs Layout and Paint.", ar: "يدمج المتصفح DOM و CSSOM لتكوين Render Tree قبل مرحلتي Layout والرسم." }
    }
  },
  {
    unitId: "unit-internet-web-basics",
    item: {
      id: "EXP-WEB-105", domain: "Networking", topic: "Web Foundations", subtopic: "HTTP Verbs", difficulty: "easy", type: "concept", slotIndex: 3,
      question: { en: "Which HTTP method is designed to retrieve an existing resource without modifying server state?", ar: "أي طريقة HTTP مخصصة لقراءة مورد موجود دون إحداث تغيير في حالة الخادم؟" },
      correct: { en: "GET", ar: "GET" },
      distractors: [{ en: "POST", ar: "الطريقة POST" }, { en: "DELETE", ar: "الطريقة DELETE" }, { en: "PATCH", ar: "الطريقة PATCH" }],
      explanation: { en: "GET requests must be safe and idempotent read operations.", ar: "الطلب GET مصمم لعمليات القراءة الآمنة التي لا تغير حالة الخادم." }
    }
  },

  // 5. unit-programming-concepts-foundations (+5)
  {
    unitId: "unit-programming-concepts-foundations",
    item: {
      id: "EXP-PRG-101", domain: "Programming Fundamentals", topic: "Execution Model", subtopic: "Compilers vs Interpreters", difficulty: "easy", type: "concept", slotIndex: 0,
      question: { en: "What is the key difference between ahead-of-time compilation (e.g. C++) and direct interpretation?", ar: "ما الفرق الجوهري بين الترجمة المسبقة (Compiler) والتفسير الفوري (Interpreter)؟" },
      correct: { en: "Compilers translate the full binary upfront", ar: "يبني المترجم ملفاً تنفيذياً مسبقاً" },
      distractors: [{ en: "Compilers forbid loops and functions", ar: "المترجم يمنع استخدام الحلقات والدوال البرمجية" }, { en: "Interpreters always run offline without OS", ar: "المفسر يعمل دائماً دون الحاجة لنظام تشغيل" }, { en: "Interpreted files need manual assembly", ar: "الملفات المفسرة تتطلب كتابة كود أسمبلي يدوياً" }],
      explanation: { en: "Ahead-of-time compilers produce optimized native machine code before launch; interpreters execute step-by-step at runtime.", ar: "ينتج المترجم كود آلة جاهزاً قبل التشغيل بينما ينفذ المفسر التعليمات سطراً بسطر أثناء التشغيل." }
    }
  },
  {
    unitId: "unit-programming-concepts-foundations",
    item: {
      id: "EXP-PRG-102", domain: "Programming Fundamentals", topic: "Execution Model", subtopic: "Error Types", difficulty: "easy", type: "debugging", slotIndex: 1,
      question: { en: "A program compiles cleanly and runs without crashing, yet prints `sum = 0` instead of `42`. What error category is this?", ar: "برنامج يُترجم بنجاح ويعمل دون أعطال لكنه يطبع `0` بدلاً من `42`. ما نوع هذا الخطأ؟" },
      correct: { en: "A Logic Error", ar: "خطأ منطقي (Logic Error)" },
      distractors: [{ en: "A Syntax Error", ar: "خطأ نحوي في صياغة اللغة (Syntax)" }, { en: "A Linker Header Error", ar: "خطأ ربط المكتبات (Linker Error)" }, { en: "A DNS Timeout Error", ar: "خطأ انتهاء مهلة الشبكة (DNS Error)" }],
      explanation: { en: "Syntax is valid, so compilation passes, but flawed algorithm/business logic produces the wrong output.", ar: "بنية اللغة صحيحة تماماً لكن منطق الخوارزمية أخرج نتيجة غير صحيحة." }
    }
  },
  {
    unitId: "unit-programming-concepts-foundations",
    item: {
      id: "EXP-PRG-103", domain: "Programming Fundamentals", topic: "Execution Model", subtopic: "Bytecode & JIT", difficulty: "medium", type: "concept", slotIndex: 2,
      question: { en: "How do runtimes like C#/.NET CLR and Java JVM combine portability with near-native speed?", ar: "كيف تجمع بيئات مثل CLR (.NET) و JVM بين قابلية النقل والسرعة القريبة من كود الآلة؟" },
      correct: { en: "They use intermediate IL plus a JIT compiler", ar: "تستخدم كوداً وسيطاً ومترجم JIT" },
      distractors: [{ en: "They rewrite apps into HTML spreadsheets", ar: "تعيد كتابة التطبيق بالكامل في جداول HTML" }, { en: "They send every instruction across HTTP", ar: "ترسل كل تعليمة برمجية عبر HTTP للخادم" }, { en: "They store source code inside printer ROM", ar: "تخزن الكود المصدري داخل ذاكرة الطابعة" }],
      explanation: { en: "Source compiles to portable IL/bytecode once, then the JIT compiler lowers hot paths into host machine instructions.", ar: "يُترجم الكود إلى تمثيل وسيط ثم يحوله مترجم JIT إلى تعليمات المعالج الفعلي بكفاءة عالية." }
    }
  },
  {
    unitId: "unit-programming-concepts-foundations",
    item: {
      id: "EXP-PRG-104", domain: "Programming Fundamentals", topic: "Execution Model", subtopic: "Toolchain", difficulty: "medium", type: "concept", slotIndex: 3,
      question: { en: "What is the role of the Linker after individual C++ `.cpp` files compile into `.obj`/`.o` object files?", ar: "ما دور الرابط (Linker) بعد ترجمة ملفات C++ إلى ملفات كائنية (`.obj`/`.o`)؟" },
      correct: { en: "Resolves cross-file symbols into one executable", ar: "يربط الملفات لبناء برنامج تنفيذي" },
      distractors: [{ en: "Renders browser Tailwind CSS classes", ar: "يقوم بتحليل تنسيقات CSS داخل المتصفح" }, { en: "Seeds starter users into PostgreSQL", ar: "ينشئ بيانات المستخدمين في قاعدة PostgreSQL" }, { en: "Formats comments in dark theme", ar: "يلون التعليقات والمفاتيح في محرر الأكواد" }],
      explanation: { en: "The Linker stitches separately compiled object units and external libraries while resolving function addresses.", ar: "يربط الـ Linker الملفات المترجمة منفصلة مع المكتبات ويحل عناوين الدوال المشتركة." }
    }
  },
  {
    unitId: "unit-programming-concepts-foundations",
    item: {
      id: "EXP-PRG-105", domain: "Programming Fundamentals", topic: "Execution Model", subtopic: "Warnings", difficulty: "easy", type: "concept", slotIndex: 0,
      question: { en: "Why do production engineering teams treat compiler warnings cleanly rather than ignoring them?", ar: "لماذا تحرص فرق الهندسة على معالجة تحذيرات المترجم (Warnings) بدلاً من تجاهلها؟" },
      correct: { en: "Warnings reveal dangerous bugs early", ar: "تكشف أخطاء خفية مبكراً" },
      distractors: [{ en: "Warnings add runtime encryption keys", ar: "التحذيرات تضيف مفاتيح تشفير زائدة للبرنامج" }, { en: "Warnings slow browsers to 1 FPS", ar: "التحذيرات تبطئ سرعة الشاشة أثناء العرض" }, { en: "Ignoring warnings deletes `.git` history", ar: "تجاهلها يمسح تاريخ Git من المستودع" }],
      explanation: { en: "Uninitialized reads, narrowing conversions, and unreachable branches surface as warnings long before crashes occur.", ar: "تظهر أخطاء التهيئة والتحويلات الفاقدة للدقة كتحذيرات قبل تحولها إلى أعطال." }
    }
  },

  // 6. unit-variables-foundations (+5)
  {
    unitId: "unit-variables-foundations",
    item: {
      id: "EXP-VAR-101", domain: "Programming Fundamentals", topic: "Variables", subtopic: "Modulo & Div", difficulty: "easy", type: "code-output", slotIndex: 1,
      codeSnippet: `int a = 17, b = 5;\ncout << (a / b) << ":" << (a % b);`,
      question: { en: "What exact output does this integer division and modulo snippet print?", ar: "ما الناتج الدقيق الذي يطبعه كود القسمة الصحيحة وباقي القسمة؟" },
      correct: { en: "3:2", ar: "3:2" },
      distractors: [{ en: "3.4:2", ar: "3.4:2" }, { en: "2:3", ar: "الناتج 2:3" }, { en: "3:5", ar: "الناتج 3:5" }],
      explanation: { en: "Integer `17 / 5` truncates to `3` and remainder `17 % 5` equals `2`.", ar: "القسمة الصحيحة تعطي `3` والباقي هو `2`، فتُطبع النتيجة `3:2`." }
    }
  },
  {
    unitId: "unit-variables-foundations",
    item: {
      id: "EXP-VAR-102", domain: "Programming Fundamentals", topic: "Variables", subtopic: "Overflow", difficulty: "medium", type: "debugging", slotIndex: 2,
      codeSnippet: `int a = 100000;\nint b = 100000;\nlong long prod = a * b;`,
      question: { en: "Why can `prod` hold a wrong negative value on a 32-bit `int` system even though `prod` is `long long`?", ar: "لماذا قد يخزن `prod` قيمة خاطئة أو سالبة رغم تعريفه كـ `long long`؟" },
      correct: { en: "`a * b` multiplies in 32-bit `int` before assignment", ar: "يحدث ضرب 32-bit قبل الإسناد" },
      distractors: [{ en: "`long long` cannot store numbers over 1 million", ar: "نوع `long long` لا يقبل أرقاماً تتعدى مليون" }, { en: "The `*` operator adds instead of multiplying", ar: "عامل الضرب يقوم بالجمع بدلاً من الضرب الحقيقي" }, { en: "Variables lose bytes unless marked `static`", ar: "المتغيرات تفقد قيمتها ما لم تُعرّف بـ `static`" }],
      explanation: { en: "In C++, `a * b` evaluates using the types of operands (`int`) and overflows `10^10` before widening. Cast `(long long)a * b`.", ar: "الضرب يتم بنوع `int` ذي الـ 32 بت ويحدث فيضان قبل النقل إلى `long long`." }
    }
  },
  {
    unitId: "unit-variables-foundations",
    item: {
      id: "EXP-VAR-103", domain: "Programming Fundamentals", topic: "Variables", subtopic: "Constants", difficulty: "easy", type: "concept", slotIndex: 3,
      question: { en: "What is the main guarantee of declaring a variable `const` (C++/JS) or `readonly` (TypeScript)?", ar: "ما الضمان الأساسي عند تعريف متغير باستخدام `const`؟" },
      correct: { en: "Prevents accidental variable reassignment", ar: "يمنع إعادة إسناد قيمة جديدة" },
      distractors: [{ en: "Stores the number onto external SSD", ar: "يخزن القيمة على القرص SSD بدلاً من الذاكرة" }, { en: "Doubles floating point bit accuracy", ar: "يضاعف دقة الأعداد العشرية في المعالج" }, { en: "Forces asynchronous execution automatically", ar: "يجعل التنفيذ غير متزامن بشكل تلقائي" }],
      explanation: { en: "`const` binds the identifier once so the compiler/runtime rejects reassignment mistakes.", ar: "يمنع `const` تغيير مرجع المتغير بعد تهيئته ويحمي ثبات الإعدادات." }
    }
  },
  {
    unitId: "unit-variables-foundations",
    item: {
      id: "EXP-VAR-104", domain: "Programming Fundamentals", topic: "Variables", subtopic: "Static vs Dynamic", difficulty: "medium", type: "concept", slotIndex: 0,
      question: { en: "When do statically typed languages (like TypeScript/C#) catch type mismatches like `\"42\" * true`?", ar: "متى تكتشف اللغات ذات التحقق الثابت للأنواع (Static Typing) أخطاء مثل `\"42\" * true`؟" },
      correct: { en: "At compile time before running", ar: "أثناء وقت الترجمة قبل تشغيل البرنامج" },
      distractors: [{ en: "Only after deploying into RAM cache", ar: "بعد تشغيل البرنامج وامتلاء الذاكرة تماماً فقط" }, { en: "Never; compilers skip operator types", ar: "لا تكتشفها أبداً لأن المترجم يتجاهلها كلياً" }, { en: "During DNS HTTP packet lookup", ar: "أثناء البحث في DNS على الشبكة البعيدة" }],
      explanation: { en: "Static type checkers verify expression contracts during compilation prior to execution.", ar: "تتحقق اللغات الثابتة الأنواع من توافق البيانات أثناء الترجمة وقبل التشغيل." }
    }
  },
  {
    unitId: "unit-variables-foundations",
    item: {
      id: "EXP-VAR-105", domain: "Programming Fundamentals", topic: "Variables", subtopic: "Type Casting", difficulty: "easy", type: "code-output", slotIndex: 1,
      codeSnippet: `int score = 7, total = 2;\ndouble ratio = (double)score / total;`,
      question: { en: "What value is stored in `ratio` after this explicit cast?", ar: "ما القيمة المخزنة في `ratio` بعد التحويل الصريح `(double)`؟" },
      correct: { en: "3.5", ar: "3.5" },
      distractors: [{ en: "3.0", ar: "القيمة 3.0" }, { en: "4.0", ar: "القيمة 4.0" }, { en: "1.0", ar: "القيمة 1.0" }],
      explanation: { en: "Casting `score` to `double` promotes the division to floating-point arithmetic (`7.0 / 2 = 3.5`).", ar: "تحويل أحد الطرفين إلى `double` يحول القسمة إلى عشرية فتكون النتيجة `3.5`." }
    }
  },

  // 7. unit-conditions-foundations (+5)
  {
    unitId: "unit-conditions-foundations",
    item: {
      id: "EXP-CND-101", domain: "Programming Fundamentals", topic: "Control Flow", subtopic: "Short-Circuit", difficulty: "medium", type: "code-trace", slotIndex: 2,
      codeSnippet: `if (idx < vec.size() && vec[idx] == 10) {\n  // process\n}`,
      question: { en: "What prevents `vec[idx]` from crashing out-of-bounds when `idx == vec.size()`?", ar: "ما الذي يمنع `vec[idx]` من التسبب بانهيار خارج الحدود عندما يكون `idx == vec.size()`؟" },
      correct: { en: "`&&` skips RHS if LHS is false", ar: "يتوقف `&&` عند فشل الطرف الأول" },
      distractors: [{ en: "The OS allocates extra indices at runtime", ar: "نظام التشغيل يزيد حجم المصفوفة تلقائياً عند الطلب" }, { en: "Arrays wrap index back around cleanly", ar: "المصفوفة تعيد الترقيم تلقائياً إلى الصفر دوماً" }, { en: "Brackets swap evaluation to right-to-left", ar: "الأقواس تعكس التقييم ليبدأ من الجهة اليمنى" }],
      explanation: { en: "Logical AND short-circuits as soon as the left guard evaluates false, avoiding invalid index lookup.", ar: "التقييم المختصر في `&&` يتوقف فوراً عند فشل الشرط الأول قبل قراءة المصفوفة." }
    }
  },
  {
    unitId: "unit-conditions-foundations",
    item: {
      id: "EXP-CND-102", domain: "Programming Fundamentals", topic: "Control Flow", subtopic: "Equality Bug", difficulty: "easy", type: "debugging", slotIndex: 3,
      codeSnippet: `let isAdmin = false;\nif (isAdmin = true) {\n  console.log("Granted");\n}`,
      codeLanguage: "javascript",
      question: { en: "What subtle bug causes this condition to print `Granted` even though `isAdmin` started false?", ar: "ما الخطأ الذي يجعل الشرط يطبع `Granted` رغم أن `isAdmin` بدأ بقيمة `false`؟" },
      correct: { en: "Uses assignment `=` instead of `===`", ar: "استخدم `=` بدلاً من `===`" },
      distractors: [{ en: "Semicolon is missing after console", ar: "الفاصلة المنقوطة مفقودة بعد جملة الطباعة" }, { en: "Boolean literals cannot enter `if`", ar: "القيم المنطقية الصريحة لا تصلح مع `if`" }, { en: "Variable `isAdmin` is globally immutable", ar: "المتغير محجوز وثابت في اللغة" }],
      explanation: { en: "Single `=` assigns `true` to `isAdmin` and evaluates the assignment expression to `true`.", ar: "علامة `=` المفردة تسند قيمة جديدة ولا تختبر التساوي كما تفعل `===` أو `==`." }
    }
  },
  {
    unitId: "unit-conditions-foundations",
    item: {
      id: "EXP-CND-103", domain: "Programming Fundamentals", topic: "Control Flow", subtopic: "Guard Clauses", difficulty: "medium", type: "concept", slotIndex: 0,
      question: { en: "Why are early-return guard clauses preferred over 5 deeply nested `if/else` blocks?", ar: "لماذا تُفضل جمل الحماية ذات الإرجاع المبكر (Early Return) على تداخل الشروط العميق؟" },
      correct: { en: "Reduces indentation and cognitive load", ar: "تخفض التداخل وتوضح الحالات" },
      distractors: [{ en: "Early returns execute code on GPU cores", ar: "تنفذ الكود على معالج الرسوميات بدلاً من المعالج" }, { en: "Nested `if` limits stack memory to 4 bytes", ar: "تحد شروط `if` المكدس بأربعة بايتات فقط" }, { en: "Guards remove return types from functions", ar: "تحذف نوع الإرجاع من الدوال تلقائياً" }],
      explanation: { en: "Validating preconditions upfront and returning early keeps the happy path flat and easy to reason about.", ar: "التحقق من الأخطاء وإرجاعها مبكراً يبقي المسار الأساسي واضحاً وسهل الصيانة." }
    }
  },
  {
    unitId: "unit-conditions-foundations",
    item: {
      id: "EXP-CND-104", domain: "Programming Fundamentals", topic: "Control Flow", subtopic: "Switch", difficulty: "easy", type: "code-output", slotIndex: 1,
      codeSnippet: `int k = 2;\nswitch(k) {\n  case 1: cout << "A"; break;\n  case 2: cout << "B";\n  case 3: cout << "C"; break;\n}`,
      question: { en: "Notice the missing `break` in `case 2`. What does this C++ `switch` print?", ar: "لاحظ غياب `break` في الحالة 2. ماذا يطبع هذا الـ `switch`؟" },
      correct: { en: "BC", ar: "BC" },
      distractors: [{ en: "B", ar: "الحرف B" }, { en: "ABC", ar: "ABC" }, { en: "C", ar: "الحرف C" }],
      explanation: { en: "Execution jumps to `case 2` printing `B`, falls straight through into `case 3` printing `C`, then breaks.", ar: "يتطابق `case 2` ويطبع `B` ثم يواصل التنفيذ نحو `case 3` بسبب غياب `break` فيطبع `BC`." }
    }
  },
  {
    unitId: "unit-conditions-foundations",
    item: {
      id: "EXP-CND-105", domain: "Programming Fundamentals", topic: "Control Flow", subtopic: "Else-If Order", difficulty: "easy", type: "debugging", slotIndex: 2,
      codeSnippet: `if (score >= 50) grade = "Pass";\nelse if (score >= 90) grade = "Honor";`,
      question: { en: "Why does a student with `score = 96` receive `Pass` instead of `Honor`?", ar: "لماذا يحصل طالب درجته `96` على `Pass` بدلاً من `Honor`؟" },
      correct: { en: "Broader branch `>= 50` catches it first", ar: "الشرط الأوسع يلتقطه أولاً" },
      distractors: [{ en: "The `>=` operator checks equality only", ar: "المعامل `>=` يختبر المساواة التامة فقط" }, { en: "String `Honor` exceeds char bit width", ar: "النص `Honor` أطول من الحد المسموح به" }, { en: "CPU executes `else if` blocks backward", ar: "المعالج يقرأ جمل `else if` من الأسفل" }],
      explanation: { en: "`else if` chains evaluate top-to-bottom and stop on the first match, so tight bounds (`>= 90`) must come first.", ar: "الشروط تُختبر بالترتيب وتكتفي بأول شرط متحقق، لذا يجب وضع الشرط الأضيق `>= 90` أولاً." }
    }
  },

  // 8. unit-loops-foundations (+5)
  {
    unitId: "unit-loops-foundations",
    item: {
      id: "EXP-LOP-101", domain: "Programming Fundamentals", topic: "Loops", subtopic: "Loop Trace", difficulty: "easy", type: "code-output", slotIndex: 3,
      codeSnippet: `int sum = 0;\nfor (int i = 1; i <= 5; i++) {\n  if (i == 3) continue;\n  sum += i;\n}\ncout << sum;`,
      question: { en: "What final value of `sum` is printed by this loop?", ar: "ما القيمة النهائية للمتغير `sum` بعد انتهاء الحلقة؟" },
      correct: { en: "12", ar: "12" },
      distractors: [{ en: "15", ar: "المجموع 15" }, { en: "3", ar: "المجموع 3" }, { en: "6", ar: "المجموع 6" }],
      explanation: { en: "`continue` skips `i == 3`, so `sum` adds `1 + 2 + 4 + 5 = 12`.", ar: "الأمر `continue` يتخطى `i = 3` فقط ويجمع `1 + 2 + 4 + 5 = 12`." }
    }
  },
  {
    unitId: "unit-loops-foundations",
    item: {
      id: "EXP-LOP-102", domain: "Programming Fundamentals", topic: "Loops", subtopic: "Do-While", difficulty: "easy", type: "concept", slotIndex: 0,
      question: { en: "How many times does the body of a `do { ... } while (false);` loop execute?", ar: "كم مرة يتنفذ جسم حلقة `do { ... } while (false);`؟" },
      correct: { en: "Exactly 1 time", ar: "مرة واحدة بالضبط" },
      distractors: [{ en: "0 times because condition is false", ar: "صفر لأن الشرط خاطئ من البداية" }, { en: "2 times before exit check", ar: "مرتين متتاليتين قبل اختبار الشرط" }, { en: "Infinitely until manually aborted", ar: "لا نهائياً حتى إيقاف البرنامج يدوياً" }],
      explanation: { en: "A `do-while` loop tests its continuation predicate AFTER running its body once.", ar: "حلقة `do-while` تنفذ جسم الحلقة مرة واحدة أولاً قبل فحص الشرط." }
    }
  },
  {
    unitId: "unit-loops-foundations",
    item: {
      id: "EXP-LOP-103", domain: "Programming Fundamentals", topic: "Loops", subtopic: "Nested Complexity", difficulty: "medium", type: "complexity", slotIndex: 1,
      codeSnippet: `for (int i = 0; i < n; i++)\n  for (int j = 0; j < n; j++)\n    ops++;`,
      question: { en: "What is the time complexity of `ops` increments as `n` grows?", ar: "ما التعقيد الزمني لعدد زيادات `ops` مع ازدياد `n`؟" },
      correct: { en: "O(n^2)", ar: "O(n^2)" },
      distractors: [{ en: "O(n)", ar: "تعقيد O(n)" }, { en: "O(n log n)", ar: "تعقيد O(n log n)" }, { en: "O(2^n)", ar: "تعقيد O(2^n)" }],
      explanation: { en: "For each of the `n` outer iterations, the inner loop runs `n` times (`n * n = n^2`).", ar: "لكل دورة من دورات `i` الـ `n` تتكرر الحلقة الداخلية `n` مرة ليكون الإجمالي `O(n^2)`." }
    }
  },
  {
    unitId: "unit-loops-foundations",
    item: {
      id: "EXP-LOP-104", domain: "Programming Fundamentals", topic: "Loops", subtopic: "Off-by-One", difficulty: "medium", type: "debugging", slotIndex: 2,
      codeSnippet: `int n = nums.size();\nfor (int i = 0; i <= n; i++) total += nums[i];`,
      question: { en: "Why does this summation loop cause out-of-bounds undefined behavior?", ar: "لماذا تسبب حلقة الجمع هذه وصولاً خاطئاً خارج حدود المصفوفة؟" },
      correct: { en: "Valid indices end at `n - 1`, not `n`", ar: "الحد الأخير `n - 1`" },
      distractors: [{ en: "`i = 0` skips the first element", ar: "البدء من `i = 0` يتجاوز العنصر الأول بالمصفوفة" }, { en: "`+=` subtracts instead of adding", ar: "المعامل `+=` يطرح القيم بدلاً من جمعها" }, { en: "Loops cannot read `.size()` properties", ar: "الحلقات لا تقبل قراءة الخاصية `.size()`" }],
      explanation: { en: "Zero-indexed arrays of size `n` occupy slots `0..n-1`; using `i <= n` reads slot `n`.", ar: "المصفوفة ذات الحجم `n` تبدأ من `0` وتنتهي عند `n - 1`، لذا `<=` يقرأ فهرساً غير موجود." }
    }
  },
  {
    unitId: "unit-loops-foundations",
    item: {
      id: "EXP-LOP-105", domain: "Programming Fundamentals", topic: "Loops", subtopic: "Break", difficulty: "easy", type: "code-output", slotIndex: 3,
      codeSnippet: `int x = 0;\nfor (int i = 0; i < 6; i++) {\n  if (i == 4) break;\n  x++;\n}\ncout << x;`,
      question: { en: "What number does `cout << x;` print?", ar: "ما الرقم الذي تطبعه تعليمة `cout << x;`؟" },
      correct: { en: "4", ar: "4" },
      distractors: [{ en: "6", ar: "القيمة 6" }, { en: "5", ar: "القيمة 5" }, { en: "3", ar: "القيمة 3" }],
      explanation: { en: "`x` increments for `i = 0, 1, 2, 3`, and immediately exits when `i == 4`.", ar: "يزيد `x` في القيم `0..3` ثم يتوقف `break` فوراً عند `i == 4` فتكون النتيجة `4`." }
    }
  },

  // 9. unit-functions-foundations (+5)
  {
    unitId: "unit-functions-foundations",
    item: {
      id: "EXP-FNC-101", domain: "Programming Fundamentals", topic: "Functions", subtopic: "Pass by Value", difficulty: "easy", type: "code-output", slotIndex: 0,
      codeSnippet: `void bump(int x) { x += 10; }\nint main() {\n  int a = 5;\n  bump(a);\n  cout << a;\n}`,
      question: { en: "What does `main` print after `bump(a)` runs?", ar: "ماذا تطبع `main` بعد استدعاء `bump(a)`؟" },
      correct: { en: "5", ar: "5" },
      distractors: [{ en: "15", ar: "العدد 15" }, { en: "10", ar: "العدد 10" }, { en: "0", ar: "العدد 0" }],
      explanation: { en: "Pass-by-value copies `5` into local parameter `x`; mutating `x` leaves caller `a` unchanged.", ar: "التمرير بالقيمة ينسخ القيمة للمعامل المحلي `x` ولا يعدل المتغير الأصلي `a`." }
    }
  },
  {
    unitId: "unit-functions-foundations",
    item: {
      id: "EXP-FNC-102", domain: "Programming Fundamentals", topic: "Functions", subtopic: "Pass by Reference", difficulty: "medium", type: "code-output", slotIndex: 1,
      codeSnippet: `void scale(int& x) { x *= 3; }\nint main() {\n  int v = 4;\n  scale(v);\n  cout << v;\n}`,
      question: { en: "With reference parameter `int& x`, what value does `cout << v` display?", ar: "مع المعامل المرجعي `int& x`، ما القيمة المطبوعة لـ `v`؟" },
      correct: { en: "12", ar: "12" },
      distractors: [{ en: "4", ar: "العدد 4" }, { en: "3", ar: "العدد 3" }, { en: "7", ar: "العدد 7" }],
      explanation: { en: "A reference binds `x` directly to `v`'s memory location without copying, updating `v` in place.", ar: "المرجع `int&` يربط `x` بنفس عنوان `v` في الذاكرة فتتعدل القيمة الأصلية إلى `12`." }
    }
  },
  {
    unitId: "unit-functions-foundations",
    item: {
      id: "EXP-FNC-103", domain: "Programming Fundamentals", topic: "Functions", subtopic: "Pure Functions", difficulty: "medium", type: "concept", slotIndex: 2,
      question: { en: "Which property strictly defines a Pure Function?", ar: "ما الخاصية التي تميز الدالة النقية (Pure Function)؟" },
      correct: { en: "Deterministic output without side effects", ar: "مخرجات ثابتة بلا آثار جانبية" },
      distractors: [{ en: "Uses at least three global variables inside", ar: "تعتمد على ثلاثة متغيرات عامة مشتركة بالخارج" }, { en: "Takes zero arguments and writes to disk", ar: "تعمل بلا مدخلات وتكتب النتائج مباشرة للقرص" }, { en: "Always skips its `return` statement", ar: "تتجاهل دائماً جملة الإرجاع في نهايتها" }],
      explanation: { en: "Pure functions depend exclusively on their parameters and never mutate external globals, files, or states.", ar: "الدالة النقية لا تغير حالة خارجية وتعتمد كلياً على مدخلاتها مما يسهل اختبارها." }
    }
  },
  {
    unitId: "unit-functions-foundations",
    item: {
      id: "EXP-FNC-104", domain: "Programming Fundamentals", topic: "Functions", subtopic: "Scope", difficulty: "easy", type: "concept", slotIndex: 3,
      question: { en: "What happens to a function's local stack variables once the function returns?", ar: "ماذا يحدث للمتغيرات المحلية لدالة بعد عودتها (`return`)؟" },
      correct: { en: "Its stack frame is popped and released", ar: "يُحذف إطار المكدس وتُحرر الذاكرة" },
      distractors: [{ en: "They persist inside CPU BIOS permanently", ar: "تبقى محفوظة للأبد داخل ذاكرة BIOS الثابتة" }, { en: "They are emailed automatically via API", ar: "يتم إرسالها تلقائياً عبر شبكة الإنترنت" }, { en: "All variables become global constants", ar: "تتحول تلقائياً إلى ثوابت عامة للنظام" }],
      explanation: { en: "Each function invocation allocates a local Call Stack frame that pops immediately on function return.", ar: "لكل استدعاء إطار في Call Stack يُحذف مباشرة عند انتهاء الدالة وعودتها." }
    }
  },
  {
    unitId: "unit-functions-foundations",
    item: {
      id: "EXP-FNC-105", domain: "Programming Fundamentals", topic: "Functions", subtopic: "Shadowing", difficulty: "medium", type: "code-output", slotIndex: 0,
      codeSnippet: `int x = 50;\nvoid test() { int x = 9; cout << x; }\nint main() { test(); cout << ":" << x; }`,
      question: { en: "What output is printed by calling `test()` followed by printing outer `x`?", ar: "ما الناتج المطبوع عند استدعاء `test()` ثم طباعة `x` الخارجية؟" },
      correct: { en: "9:50", ar: "9:50" },
      distractors: [{ en: "9:9", ar: "القيمة 9:9" }, { en: "50:50", ar: "50:50" }, { en: "50:9", ar: "القيمة 50:9" }],
      explanation: { en: "Local `int x = 9` shadows global `x` inside `test()`, leaving outer `x = 50` untouched.", ar: "المتغير المحلي يحجب المتغير الخارجي مؤقتاً داخل `test()` بينما يظل الخارجي `50`." }
    }
  },

  // 10. unit-memory-foundations (+5)
  {
    unitId: "unit-memory-foundations",
    item: {
      id: "EXP-MEM-101", domain: "Programming Fundamentals", topic: "Memory Management", subtopic: "Stack vs Heap", difficulty: "easy", type: "concept", slotIndex: 1,
      question: { en: "Compared to Heap allocation, why is Stack variable allocation effectively instantaneous?", ar: "مقارنة بتخصيص الـ Heap، لماذا يُعد تخصيص المتغيرات في الـ Stack سريعاً جداً؟" },
      correct: { en: "Just adjusts the stack pointer register", ar: "يحرك مؤشر المكدس خطوة فقط" },
      distractors: [{ en: "Stack scans the whole SSD for free sectors", ar: "الـ Stack يبحث في كل القرص أولاً عن فراغ" }, { en: "Stack executes queries on SQL tables", ar: "الـ Stack يشغل استعلامات SQL داخل النظام" }, { en: "Heap runs exclusively on 8-bit CPUs", ar: "الـ Heap يعمل على معالجات 8 بت القديمة فقط" }],
      explanation: { en: "Allocating on the Stack only shifts one register pointer, whereas Heap allocators search free-lists safely.", ar: "الحجز على الـ Stack مجرد تحريك لمؤشر المكدس عكس الـ Heap الذي يدير الكتل الحرة." }
    }
  },
  {
    unitId: "unit-memory-foundations",
    item: {
      id: "EXP-MEM-102", domain: "Programming Fundamentals", topic: "Memory Management", subtopic: "Dangling Pointers", difficulty: "hard", type: "debugging", slotIndex: 2,
      codeSnippet: `int* makeBug() {\n  int localVal = 42;\n  return &localVal;\n}`,
      question: { en: "What critical memory bug is created by returning `&localVal` from this function?", ar: "ما الخطأ الخطير الذي ينتج عن إرجاع عنوان المتغير المحلي `&localVal`؟" },
      correct: { en: "Dangling pointer to popped frame", ar: "مؤشر معلق لإطار محذوف" },
      distractors: [{ en: "SQL Cartesian join multiplication", ar: "تضاعف صفوف ربط الجداول في SQL" }, { en: "Binary Search integer mid overflow", ar: "فيضان منتصف البحث الثنائي الرياضي" }, { en: "HTTP 404 resource redirect loop", ar: "حلقة إعادة توجيه في بروتوكول HTTP" }],
      explanation: { en: "`localVal` lives on the stack frame that disappears upon return, leaving the returned address invalid.", ar: "المتغير المحلي يزول بمجرد خروج الدالة، فيصبح العنوان الراجع مؤشراً معلقاً خطيراً." }
    }
  },
  {
    unitId: "unit-memory-foundations",
    item: {
      id: "EXP-MEM-103", domain: "Programming Fundamentals", topic: "Memory Management", subtopic: "Smart Pointers", difficulty: "medium", type: "concept", slotIndex: 3,
      question: { en: "What key ownership advantage does `std::unique_ptr` provide over raw `new`/`delete` pointers?", ar: "ما الميزة الجوهرية للمؤشر الذكي `std::unique_ptr` مقارنة بـ `new`/`delete` اليدوية؟" },
      correct: { en: "Automatic RAII cleanup at scope exit", ar: "تحرير تلقائي عند نهاية النطاق" },
      distractors: [{ en: "Stores bytes unallocated inside CSS", ar: "يخزن البايتات داخل تنسيقات CSS بالمتصفح" }, { en: "Lets multiple owners share raw writes unsafely", ar: "يتيح مشاركة الكتابة بلا أي قيود تزامن" }, { en: "Bypasses all compiler type rules", ar: "يلغي فحص الأنواع عند ترجمة المشروع" }],
      explanation: { en: "`unique_ptr` owns one Heap object exclusively and deletes it deterministically via its destructor (RAII).", ar: "يضمن `unique_ptr` ملكية وحيدة ويحرر الكائن تلقائياً عند انتهاء النطاق دون تسريب." }
    }
  },
  {
    unitId: "unit-memory-foundations",
    item: {
      id: "EXP-MEM-104", domain: "Programming Fundamentals", topic: "Memory Management", subtopic: "Memory Leaks", difficulty: "medium", type: "concept", slotIndex: 0,
      question: { en: "What defines a classic Memory Leak in long-running backend processes?", ar: "ما الذي يصف تسرب الذاكرة (Memory Leak) في البرامج طويلة التشغيل؟" },
      correct: { en: "Unreachable heap blocks never freed", ar: "كتل محجوزة لم تعد قابلة للتحرير" },
      distractors: [{ en: "Closing a network TCP socket safely", ar: "إغلاق اتصال شبكة TCP بأمان عند الانتهاء" }, { en: "Stack frames popping upon return", ar: "تفريغ إطارات المكدس تلقائياً عند العودة" }, { en: "Garbage collection freeing dead objects", ar: "تحرير الكائنات الميتة تلقائياً في الخلفية" }],
      explanation: { en: "Losing every pointer reference to Heap-allocated memory without freeing it gradually exhausts available RAM.", ar: "ضياع المرجع دون تحرير الكتلة يتركها عالقة في Heap ويستنزف الذاكرة مع الوقت." }
    }
  },
  {
    unitId: "unit-memory-foundations",
    item: {
      id: "EXP-MEM-105", domain: "Programming Fundamentals", topic: "Memory Management", subtopic: "Sanitizers", difficulty: "medium", type: "scenario", slotIndex: 1,
      question: { en: "Which compiler runtime tool reliably detects use-after-free and heap buffer overflows during C++ tests?", ar: "ما الأداة الفعالة لكشف أخطاء تجاوز المخزن المؤقت و Use-After-Free أثناء اختبارات C++؟" },
      correct: { en: "AddressSanitizer (-fsanitize=address)", ar: "أداة AddressSanitizer" },
      distractors: [{ en: "Tailwind CSS Autoprefixer", ar: "أداة Tailwind CSS للمتصفحات" }, { en: "SQL `EXPLAIN ANALYZE` command", ar: "أمر `EXPLAIN ANALYZE` للاستعلامات" }, { en: "DNS Recursive Resolver", ar: "محلل أسماء النطاقات العودي DNS" }],
      explanation: { en: "AddressSanitizer instruments memory reads/writes with shadow memory to fail loudly on invalid accesses.", ar: "تفحص أداة ASan الوصول للذاكرة أثناء الاختبارات وتوقف البرنامج فوراً عند أي تعدٍ." }
    }
  },

  // 11. unit-oop-classes-encapsulation (+5)
  {
    unitId: "unit-oop-classes-encapsulation",
    item: {
      id: "EXP-OOP-101", domain: "Object-Oriented Programming", topic: "Encapsulation", subtopic: "Access Control", difficulty: "easy", type: "concept", slotIndex: 2,
      question: { en: "Why keep domain entity fields `private` instead of exposing all fields `public`?", ar: "لماذا نُبقي حقول الكائنات `private` بدلاً من كشفها مباشرة كـ `public`؟" },
      correct: { en: "Forces state changes through validated methods", ar: "يفرض التحقق قبل تعديل الحالة" },
      distractors: [{ en: "Public fields consume 10x more RAM", ar: "الحقول العامة تستهلك ذاكرة أكبر بعشر مرات بالنظام" }, { en: "Private fields skip constructors completely", ar: "الحقول الخاصة تلغي الحاجة لوجود دالة الباني" }, { en: "Public fields fail to compile inside classes", ar: "الحقول العامة ممنوعة نهائياً داخل الفئات" }],
      explanation: { en: "Private state protected by behavior methods prevents external code from setting invalid values like `balance = -500`.", ar: "التغليف يحمي ثوابت الكائن (Invariants) ويمنع إفساد البيانات بقيم غير صالحة من الخارج." }
    }
  },
  {
    unitId: "unit-oop-classes-encapsulation",
    item: {
      id: "EXP-OOP-102", domain: "Object-Oriented Programming", topic: "Encapsulation", subtopic: "Constructors", difficulty: "easy", type: "concept", slotIndex: 3,
      question: { en: "When is a class's constructor automatically invoked?", ar: "متى يتم استدعاء دالة الباني (Constructor) تلقائياً؟" },
      correct: { en: "Immediately when instantiating a new object", ar: "لحظة إنشاء كائن جديد" },
      distractors: [{ en: "Only when shutting down the operating system", ar: "عند إغلاق نظام التشغيل وإيقاف الحاسوب فقط" }, { en: "After deleting every reference manually", ar: "بعد حذف كافة المراجع المتصلة به يدوياً" }, { en: "Before writing the source file", ar: "قبل حفظ ملف الكود المصدري بالمحرر" }],
      explanation: { en: "Constructors run on instantiation to ensure every newly created object begins in a valid state.", ar: "يعمل الباني فور إنشاء الكائن لضمان تهيئته بحالة صالحة من اللحظة الأولى." }
    }
  },
  {
    unitId: "unit-oop-classes-encapsulation",
    item: {
      id: "EXP-OOP-103", domain: "Object-Oriented Programming", topic: "Encapsulation", subtopic: "Invariant Violation", difficulty: "medium", type: "debugging", slotIndex: 0,
      question: { en: "Why is returning a direct mutable `List` reference from a getter dangerous for encapsulation?", ar: "لماذا يُعد إرجاع مرجع مباشر لقائمة قابلة للتعديل من Getter خطراً على التغليف؟" },
      correct: { en: "Callers can mutate internal state directly", ar: "يسمح بتعديل القائمة مباشرة" },
      distractors: [{ en: "Getters crash unless returning booleans", ar: "دوال Getter تفشل إلا مع القيم المنطقية" }, { en: "Lists serialize into raw SQL tables", ar: "القوائم تتحول تلقائياً لجداول SQL" }, { en: "Mutable getters triple CPU clock cycles", ar: "تضاعف دورات المعالج ثلاث مرات باستمرار" }],
      explanation: { en: "Returning an `IReadOnlyList` or defensive copy prevents callers from bypassing class validation rules.", ar: "إرجاع نسخة قراءة فقط يحمي العناصر الداخلية من الإضافة أو الحذف المباشر خارج الفئة." }
    }
  },
  {
    unitId: "unit-oop-classes-encapsulation",
    item: {
      id: "EXP-OOP-104", domain: "Object-Oriented Programming", topic: "Encapsulation", subtopic: "This Keyword", difficulty: "easy", type: "concept", slotIndex: 1,
      question: { en: "Inside an instance method, what does `this` refer to?", ar: "داخل دالة تابعة لكائن، إلى ماذا يشير `this`؟" },
      correct: { en: "The current object instance invoked on", ar: "نسخة الكائن الحالية المستدعى عليها" },
      distractors: [{ en: "The static parent module file path", ar: "مسار ملف الوحدة البرمجية الثابت على القرص" }, { en: "The global database connection pool", ar: "مجمع اتصالات قاعدة البيانات المشترك" }, { en: "The compiler binary optimizer flag", ar: "خيار التحسين الثنائي في المترجم" }],
      explanation: { en: "`this` holds the pointer/reference to the receiver instance whose method is executing.", ar: "يمثل `this` المرجع الذاتي للكائن الذي تُنفذ عليه الدالة الحالية." }
    }
  },
  {
    unitId: "unit-oop-classes-encapsulation",
    item: {
      id: "EXP-OOP-105", domain: "Object-Oriented Programming", topic: "Encapsulation", subtopic: "Static Members", difficulty: "medium", type: "concept", slotIndex: 2,
      question: { en: "Where does a `static` field belong in object-oriented classes?", ar: "إلى أين ينتمي الحقل المعرّف بـ `static` في البرمجة كائنية التوجه؟" },
      correct: { en: "Shared once on the class itself", ar: "مشترك على مستوى الفئة" },
      distractors: [{ en: "Cloned separately inside each heap object", ar: "يُنسخ منفصلاً داخل كل كائن جديد" }, { en: "Cleared on every local loop pass", ar: "يُمحى بعد كل دورة في الحلقة التكرارية" }, { en: "Accessible exclusively inside SQL views", ar: "يُقرأ فقط داخل جداول SQL Views" }],
      explanation: { en: "Static members belong to the class type once rather than duplicating per object instance.", ar: "المتغير الساكن يتبع الفئة نفسها ويكون مشتركاً بين كافة كائناتها." }
    }
  },

  // 12. unit-oop-inheritance-polymorphism (+4)
  {
    unitId: "unit-oop-inheritance-polymorphism",
    item: {
      id: "EXP-OOP-106", domain: "Object-Oriented Programming", topic: "Polymorphism", subtopic: "VTable Dispatch", difficulty: "medium", type: "concept", slotIndex: 3,
      question: { en: "How do C++/C#/Java resolve an overridden `virtual` method call through a base pointer at runtime?", ar: "كيف يحدد البرنامج أي نسخة من دالة `virtual` سيشغلها عبر مؤشر الأب وقت التشغيل؟" },
      correct: { en: "Dynamic dispatch via the virtual table", ar: "الربط عبر جدول VTable" },
      distractors: [{ en: "Hashing source comments chronologically", ar: "ترتيب التعليقات زمنياً بالملف المصدري" }, { en: "Scanning disk directories alphabetically", ar: "فحص مجلدات القرص أبجدياً عند التشغيل" }, { en: "Selecting whichever file was saved last", ar: "اختيار أحدث ملف تم حفظه في المشروع" }],
      explanation: { en: "Objects of polymorphic classes carry a `vptr` referencing their class's `vtable` of concrete overrides.", ar: "كل كائن يمتلك مؤشراً لجدول VTable يوجّه الاستدعاء للدالة المناسبة لنوعه الفعلي." }
    }
  },
  {
    unitId: "unit-oop-inheritance-polymorphism",
    item: {
      id: "EXP-OOP-107", domain: "Object-Oriented Programming", topic: "Polymorphism", subtopic: "Interfaces", difficulty: "easy", type: "concept", slotIndex: 0,
      question: { en: "Why favor Interfaces + Composition over deep multi-level inheritance chains?", ar: "لماذا نفضل الواجهات والتركيب (Composition) على الوراثة متعددة المستويات؟" },
      correct: { en: "Avoids rigid hierarchy coupling cleanly", ar: "يفصل السلوك ويسهّل التبديل" },
      distractors: [{ en: "Interfaces execute faster by skipping RAM", ar: "الواجهات تعمل بسرعة فائقة دون استخدام RAM" }, { en: "Composition disables unit testing entirely", ar: "التركيب يمنع كتابة اختبارات الوحدات تماماً" }, { en: "Inheritance deletes constructors at compile", ar: "الوراثة تحذف دوال الباني عند الترجمة" }],
      explanation: { en: "Composition lets classes swap behavior capabilities at runtime without fragile base-class breakage.", ar: "التركيب يفصل السلوكيات في وحدات مستقلة قابلة للاستبدال والاختبار بسهولة." }
    }
  },
  {
    unitId: "unit-oop-inheritance-polymorphism",
    item: {
      id: "EXP-OOP-108", domain: "Object-Oriented Programming", topic: "Polymorphism", subtopic: "Virtual Destructor", difficulty: "hard", type: "debugging", slotIndex: 1,
      question: { en: "In C++, what fails if you `delete basePtr` pointing to a `Derived` object when Base lacks a `virtual` destructor?", ar: "في C++، ماذا يحدث عند تنفيذ `delete basePtr` لكائن مشتق إذا لم يكن هادم الأب `virtual`؟" },
      correct: { en: "Derived destructor never runs (resource leak)", ar: "يهمل هادم الابن فتتسرب موارده" },
      distractors: [{ en: "Both objects duplicate on the Stack", ar: "يتضاعف الكائنان تلقائياً داخل المكدس" }, { en: "Derived classes inherit private fields twice", ar: "تُورّث الحقول الخاصة للابن مرتين كاملتين" }, { en: "Virtual table converts integers to floats", ar: "يتحول الجدول إلى أعداد عشرية مضاعفة" }],
      explanation: { en: "Without a `virtual` destructor, `delete basePtr` runs only Base's destructor and skips Derived cleanup.", ar: "دون `virtual ~Base()` يتجاهل المعالج هادم الفئة الابنة مما يسرب ذاكرتها أو مواردها." }
    }
  },
  {
    unitId: "unit-oop-inheritance-polymorphism",
    item: {
      id: "EXP-OOP-109", domain: "Object-Oriented Programming", topic: "Polymorphism", subtopic: "Abstract Classes", difficulty: "easy", type: "concept", slotIndex: 2,
      question: { en: "Can an `abstract` class with an unimplemented abstract method be instantiated directly with `new`?", ar: "هل يمكن إنشاء كائن مباشر باستخدام `new` من فئة مجردة (`abstract`) بها دالة غير منفذة؟" },
      correct: { en: "No; a concrete subclass must implement it", ar: "لا، بل تُورث لفئة تكملها" },
      distractors: [{ en: "Yes, abstract methods return null defaults", ar: "نعم، وترجع الدوال قيماً افتراضية تلقائياً" }, { en: "Only if marked static and private together", ar: "فقط عند وضع static و private معاً بالرأس" }, { en: "Yes, in Release compiler mode only", ar: "نعم، في وضع Release النهائي بالمشروع فقط" }],
      explanation: { en: "Abstract classes define partial contracts and cannot be directly instantiated until subclasses implement missing members.", ar: "الفئات المجردة عقود ناقصة لا تُنشأ منها كائنات مباشرة بل عبر فئات مشتقة تكمل تنفيذها." }
    }
  },

  // 13. unit-dm-propositional-logic (+3)
  {
    unitId: "unit-dm-propositional-logic",
    item: {
      id: "EXP-DML-101", domain: "Discrete Mathematics", topic: "Logic", subtopic: "Contrapositive", difficulty: "medium", type: "concept", slotIndex: 3,
      question: { en: "Which statement is always logically equivalent to implication `p -> q`?", ar: "أي عبارة تكافئ منطقياً دائماً العبارة الشرطية `p -> q`؟" },
      correct: { en: "!q -> !p (the Contrapositive)", ar: "المعكوس !q -> !p" },
      distractors: [{ en: "q -> p (the Converse)", ar: "العكس المباشر q -> p" }, { en: "!p -> !q (the Inverse)", ar: "المعكوس الأولي !p -> !q" }, { en: "p AND !q", ar: "عبارة الوصل المنطقي p AND !q" }],
      explanation: { en: "Every implication shares the exact same truth table as its contrapositive `!q -> !p`.", ar: "المعكوس الإيجابي `!q -> !p` يطابق جدول الصواب للعبارة الأصلية في كل الحالات." }
    }
  },
  {
    unitId: "unit-dm-propositional-logic",
    item: {
      id: "EXP-DML-102", domain: "Discrete Mathematics", topic: "Logic", subtopic: "De Morgan", difficulty: "easy", type: "code-output", slotIndex: 0,
      question: { en: "By De Morgan's Law, what simplifies `!(isExpired || isLocked)`?", ar: "وفقاً لقانون دي مورغان، ما تبسيط `!(isExpired || isLocked)`؟" },
      correct: { en: "!isExpired && !isLocked", ar: "!isExpired && !isLocked" },
      distractors: [{ en: "!isExpired || !isLocked", ar: "الصيغة !isExpired || !isLocked" }, { en: "isExpired && isLocked", ar: "الصيغة isExpired && isLocked" }, { en: "isExpired || !isLocked", ar: "الصيغة isExpired || !isLocked" }],
      explanation: { en: "Negating a disjunction flips `||` to `&&` and negates each operand.", ar: "نفي علاقة `||` يقلبها إلى `&&` مع نفي كل طرف داخل القوسين." }
    }
  },
  {
    unitId: "unit-dm-propositional-logic",
    item: {
      id: "EXP-DML-103", domain: "Discrete Mathematics", topic: "Logic", subtopic: "Quantifiers", difficulty: "medium", type: "concept", slotIndex: 1,
      question: { en: "What is the correct negation of `For all x in S, P(x)`?", ar: "ما النفي الصحيح للعبارة الكلية `لكل x في S، يتحقق P(x)`؟" },
      correct: { en: "There exists x in S such that !P(x)", ar: "يوجد x حيث !P(x)" },
      distractors: [{ en: "For all x in S, P(x) stays true", ar: "لكل x في S يبقى الشرط P(x) صحيحاً دائماً" }, { en: "Every element outside S must satisfy P(x)", ar: "كل عنصر خارج المجموعة يحقق P(x)" }, { en: "At most half of S fails P(x)", ar: "على الأكثر نصف عناصر المجموعة يفشل بالشرط" }],
      explanation: { en: "Negating a universal quantifier requires only one counterexample where `P(x)` is false.", ar: "لنقض عبارة تعميم يكفي وجود مثال مضاد واحد يكسر الشرط." }
    }
  }
];

export const PART1_QUESTIONS: AssessmentQuestion[] = SPECS.map((s) => buildExpandedQuestion(s.item));

export const PART1_UNIT_MAP: Record<string, string[]> = SPECS.reduce((acc, s) => {
  (acc[s.unitId] = acc[s.unitId] || []).push(s.item.id);
  return acc;
}, {} as Record<string, string[]>);
