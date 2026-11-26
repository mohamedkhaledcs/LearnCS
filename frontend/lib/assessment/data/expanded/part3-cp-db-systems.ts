import { buildExpandedQuestion, type CompactQuestionSpec } from "./helpers";
import type { AssessmentQuestion } from "@/lib/assessment/schema";

const SPECS: { unitId: string; item: CompactQuestionSpec }[] = [
  // 29. unit-cp-introduction (+5)
  {
    unitId: "unit-cp-introduction",
    item: {
      id: "EXP-CPI-101", domain: "Competitive Programming", topic: "Contest Strategy", subtopic: "Constraint Analysis", difficulty: "easy", type: "complexity", slotIndex: 3,
      question: { en: "Given time limit 1s (`~10^8` ops) and constraint `n <= 200,000`, which time complexity easily passes?", ar: "بمهلة ثانية واحدة (`~10^8` عملية) وحد إدخال `n <= 200,000`، أي تعقيد زمني سينجح بأمان؟" },
      correct: { en: "O(n log n)", ar: "O(n log n)" },
      distractors: [{ en: "O(n^2)", ar: "O(n^2)" }, { en: "O(n^3)", ar: "O(n^3)" }, { en: "O(2^n)", ar: "O(2^n)" }],
      explanation: { en: "`2e5 * log2(2e5) ~= 3.5e6` ops, comfortably under `10^8`, while `n^2 = 4e10` TLEs.", ar: "القيمة `2e5 log(2e5)` نحو 3.5 مليون عملية فقط بينما `n^2` تبلغ 40 مليار عملية (TLE)." }
    }
  },
  {
    unitId: "unit-cp-introduction",
    item: {
      id: "EXP-CPI-102", domain: "Competitive Programming", topic: "Contest Strategy", subtopic: "Fast I/O", difficulty: "medium", type: "debugging", slotIndex: 0,
      question: { en: "Why does printing `endl` instead of `'\\n'` inside a loop of 300,000 lines cause Time Limit Exceeded (TLE)?", ar: "لماذا تسبب طباعة `endl` بدلاً من `'\\n'` في 300,000 سطر انتهاء الوقت (TLE)؟" },
      correct: { en: "`endl` forces an OS output flush per line", ar: "تفرض `endl` تفريغاً بكل سطر" },
      distractors: [{ en: "`endl` allocates extra 64-bit heap matrices", ar: "`endl` تحجز مصفوفات 64-bit إضافية بالذاكرة" }, { en: "`'\\n'` compiles down to O(log n) bytes", ar: "`'\\n'` تُترجم إلى بايتات لوغاريتمية الحجم" }, { en: "`endl` clears all variables on the stack", ar: "`endl` تمحو جميع متغيرات مكدس الدوال" }],
      explanation: { en: "Flushing output on every line triggers hundreds of thousands of expensive kernel write calls; `'\\n'` buffers efficiently.", ar: "التفريغ الفوري بكل سطر يطلق مئات آلاف استدعاءات النظام البطيئة بعكس `'\\n'`." }
    }
  },
  {
    unitId: "unit-cp-introduction",
    item: {
      id: "EXP-CPI-103", domain: "Competitive Programming", topic: "Contest Strategy", subtopic: "Modular Subtraction", difficulty: "hard", type: "code-output", slotIndex: 1,
      question: { en: "In C++/Java/C#, if `a % MOD` could be less than `b % MOD`, how do you safely compute `(a - b) mod MOD` non-negatively?", ar: "في C++ إذا كانت نتيجة `a % MOD` أقل من `b % MOD`، كيف نحسب `(a - b) mod MOD` موجبة بأمان؟" },
      correct: { en: "((a - b) % MOD + MOD) % MOD", ar: "((a - b) % MOD + MOD) % MOD" },
      distractors: [{ en: "(a - b) % MOD directly", ar: "العبارة (a - b) % MOD مباشرة" }, { en: "(a % MOD - b % MOD) only", ar: "العبارة (a % MOD - b % MOD) فقط" }, { en: "abs(a - b) % MOD always", ar: "العبارة abs(a - b) % MOD دائماً" }],
      explanation: { en: "Adding `MOD` shifts negative remainders back into `[0..MOD-1]` before taking the outer `% MOD`.", ar: "باقي طرح الأعداد السالبة يبقى سالباً في C++؛ نضيف `MOD` ثم نأخذ `% MOD` لضمان النتيجة الموجبة." }
    }
  },
  {
    unitId: "unit-cp-introduction",
    item: {
      id: "EXP-CPI-104", domain: "Competitive Programming", topic: "Contest Strategy", subtopic: "Constraints N <= 20", difficulty: "medium", type: "scenario", slotIndex: 2,
      question: { en: "A problem specifies tiny `n <= 18` constraints. Which algorithmic family immediately fits?", ar: "مسألة تضع قيد إدخال صغيراً جداً `n <= 18`. ما النهج الخوارزمي الملائم غالباً؟" },
      correct: { en: "Bitmask DP / Backtracking O(2^n)", ar: "التراجع أو Bitmask O(2^n)" },
      distractors: [{ en: "Segment Tree lazy propagation", ar: "شجرة القطع بالتأجيل Lazy Propagation" }, { en: "Suffix Automaton text matcher", ar: "أوتوماتون اللاحقات النصي للمطابقة" }, { en: "Kruskal MST on 18 disjoint graphs", ar: "كروسكال على 18 رسماً منفصلاً معاً" }],
      explanation: { en: "`2^18 = 262,144`, small enough for subset enumeration, backtracking, or bitmask DP.", ar: "عندما يكون الحد نحو 18-20 فهذا تلميح واضح لإمكانية فحص كافة المجموعات الفرعية `2^n`." }
    }
  },
  {
    unitId: "unit-cp-introduction",
    item: {
      id: "EXP-CPI-105", domain: "Competitive Programming", topic: "Contest Strategy", subtopic: "Judge Verdicts", difficulty: "easy", type: "concept", slotIndex: 3,
      question: { en: "What does a `Runtime Error (RE / SIGSEGV)` verdict typically signify in C++ contest submissions?", ar: "علامَ يدل حكم `Runtime Error` غالباً في تسليمات المسابقات بلغة C++؟" },
      correct: { en: "Invalid memory access or division by 0", ar: "تجاوز حدود أو قسمة على صفر" },
      distractors: [{ en: "Code failed C++ syntax compilation checks", ar: "فشل الكود في قواعد الكتابة والترجمة الكاملة" }, { en: "Printed wrong numeric sum with exit 0", ar: "طبع إجابة رقمية خاطئة مع خروج سليم 0" }, { en: "Used `long long` instead of short `int`", ar: "استخدم النوع `long long` بدلاً من `int`" }],
      explanation: { en: "Out-of-bounds array dereference, null pointer read, or zero division triggers an OS crash signal (`SIGSEGV`/`SIGFPE`).", ar: "القراءة خارج المصفوفة أو القسمة على صفر توقف البرنامج فوراً من نظام التشغيل." }
    }
  },

  // 30. unit-two-pointers-foundations (+4)
  {
    unitId: "unit-two-pointers-foundations",
    item: {
      id: "EXP-TWP-101", domain: "Competitive Programming", topic: "Two Pointers", subtopic: "Opposite Ends", difficulty: "easy", type: "concept", slotIndex: 0,
      question: { en: "In a sorted array finding two items summing to `target`, what do you do if `a[l] + a[r] > target`?", ar: "في مصفوفة مرتبة للبحث عن زوج مجموعهما `target`، ماذا تفعل إذا كان `a[l] + a[r] > target`؟" },
      correct: { en: "Decrement right pointer (`r--`)", ar: "إنقاص المؤشر الأيمن (`r--`)" },
      distractors: [{ en: "Increment left pointer (`l++`)", ar: "زيادة المؤشر الأيسر (`l++`)" }, { en: "Move both pointers right together", ar: "تحريك المؤشرين لليمين معاً بنفس الوقت" }, { en: "Resort the array descending first", ar: "إعادة فرز المصفوفة تنازلياً من البداية" }],
      explanation: { en: "Since `a` is sorted, only lowering the larger end `r--` strictly reduces the sum.", ar: "لتقليل المجموع في مصفوفة مرتبة تصاعدياً نحرك المؤشر الأيمن لليسار `r--`." }
    }
  },
  {
    unitId: "unit-two-pointers-foundations",
    item: {
      id: "EXP-TWP-102", domain: "Competitive Programming", topic: "Two Pointers", subtopic: "Negative Values Bug", difficulty: "hard", type: "debugging", slotIndex: 1,
      question: { en: "Why does shrinking a variable sliding window when `sum > K` fail if the array includes negative numbers?", ar: "لماذا تفشل نافذة المؤشرين المتغيرة عندما `sum > K` إذا احتوت المصفوفة على أعداد سالبة؟" },
      correct: { en: "Growing right might lower `sum` later", ar: "التوسع يميناً قد يخفض المجموع" },
      distractors: [{ en: "Negative integers double stack frame size", ar: "الأعداد السالبة تضاعف إطار المكدس فوراً" }, { en: "Pointers skip indices below zero bytes", ar: "المؤشرات تتخطى الفهارس السالبة تلقائياً" }, { en: "Prefix sums break on negative inputs", ar: "المجاميع التراكمية تفشل مع الأعداد السالبة" }],
      explanation: { en: "With negatives, expanding `r` can reduce window sum, destroying monotonicity; use Prefix Sums + HashMap instead.", ar: "مع السوالب تنكسر الرتابة لأن إضافة عناصر جديدة قد تقلص المجموع لاحقاً؛ تُحل بالـ Prefix Sum + Map." }
    }
  },
  {
    unitId: "unit-two-pointers-foundations",
    item: {
      id: "EXP-TWP-103", domain: "Competitive Programming", topic: "Two Pointers", subtopic: "Complexity", difficulty: "easy", type: "complexity", slotIndex: 2,
      question: { en: "What is the time complexity of scanning with non-decreasing `l` and `r` pointers across `n` elements?", ar: "ما التعقيد الزمني لخوارزمية مؤشرين يتحرك فيها `l` و `r` للأمام فقط عبر `n` عنصر؟" },
      correct: { en: "O(n)", ar: "O(n)" },
      distractors: [{ en: "O(n^2)", ar: "O(n^2)" }, { en: "O(log n)", ar: "O(log n)" }, { en: "O(n log n)", ar: "O(n log n)" }],
      explanation: { en: "Each pointer shifts forward at most `n` times total across the whole run (`<= 2n` moves).", ar: "لا يتجاوز مجموع حركات كلا المؤشرين معاً `2n` خطوة لأن أياً منهما لا يعود للخلف." }
    }
  },
  {
    unitId: "unit-two-pointers-foundations",
    item: {
      id: "EXP-TWP-104", domain: "Competitive Programming", topic: "Two Pointers", subtopic: "Fixed Window", difficulty: "medium", type: "code-output", slotIndex: 3,
      codeSnippet: `// Find max sum of any contiguous k=3 subarray in [4, 2, 1, 7, 8, 1, 2, 8]`,
      question: { en: "Using a fixed sliding window of width `k = 3` on `[4, 2, 1, 7, 8, 1, 2, 8]`, what maximum sum occurs?", ar: "بنافذة ثابتة طولها `k = 3` على `[4, 2, 1, 7, 8, 1, 2, 8]`، ما أكبر مجموع؟" },
      correct: { en: "16", ar: "16" },
      distractors: [{ en: "14", ar: "المجموع 14" }, { en: "18", ar: "المجموع 18" }, { en: "11", ar: "المجموع 11" }],
      explanation: { en: "Subarray `[1, 7, 8]` and `[7, 8, 1]` sum to `16` (`1 + 7 + 8 = 16`).", ar: "النافذة `[1, 7, 8]` أو `[7, 8, 1]` تعطي أعلى مجموع وهو `16`." }
    }
  },

  // 31. unit-cp-number-theory (+5)
  {
    unitId: "unit-cp-number-theory",
    item: {
      id: "EXP-NTH-101", domain: "Competitive Programming", topic: "Number Theory", subtopic: "Sieve Complexity", difficulty: "medium", type: "complexity", slotIndex: 0,
      question: { en: "What is the time complexity of the classic Sieve of Eratosthenes marking primes up to `n`?", ar: "ما التعقيد الزمني لغربال إراتوستينس لإيجاد كل الأعداد الأولية حتى `n`؟" },
      correct: { en: "O(n log log n)", ar: "O(n log log n)" },
      distractors: [{ en: "O(n^2)", ar: "التعقيد O(n^2)" }, { en: "O(n sqrt(n))", ar: "O(n sqrt(n))" }, { en: "O(log n)", ar: "التعقيد O(log n)" }],
      explanation: { en: "The sum of reciprocals of primes up to `n` grows as `log log n`, giving nearly linear runtime.", ar: "مجموع مقلوبات الأعداد الأولية حتى `n` ينمو بمعدل `log log n` مما يجعله شبه خطي." }
    }
  },
  {
    unitId: "unit-cp-number-theory",
    item: {
      id: "EXP-NTH-102", domain: "Competitive Programming", topic: "Number Theory", subtopic: "Euclidean GCD", difficulty: "easy", type: "code-output", slotIndex: 1,
      codeSnippet: `int gcd(int a, int b) {\n  return b == 0 ? a : gcd(b, a % b);\n}\ncout << gcd(48, 18);`,
      question: { en: "What does `gcd(48, 18)` return?", ar: "ماذا ترجع الدالة `gcd(48, 18)`؟" },
      correct: { en: "6", ar: "6" },
      distractors: [{ en: "18", ar: "18" }, { en: "12", ar: "12" }, { en: "3", ar: "3" }],
      explanation: { en: "`gcd(48, 18) -> gcd(18, 12) -> gcd(12, 6) -> gcd(6, 0) = 6`.", ar: "`48 % 18 = 12` ثم `18 % 12 = 6` ثم `12 % 6 = 0` ليكون القاسم المشترك الأكبر `6`." }
    }
  },
  {
    unitId: "unit-cp-number-theory",
    item: {
      id: "EXP-NTH-103", domain: "Competitive Programming", topic: "Number Theory", subtopic: "LCM Overflow", difficulty: "medium", type: "debugging", slotIndex: 2,
      question: { en: "When computing `lcm(a, b)` for `10^9`-scale integers, why write `a / gcd(a, b) * b` instead of `(a * b) / gcd(a, b)`?", ar: "عند حساب `lcm(a, b)` لأعداد بنطاق `10^9`، لماذا نكتب `a / gcd(a, b) * b` بدلاً من الضرب أولاً؟" },
      correct: { en: "Dividing first avoids `a * b` intermediate overflow", ar: "القسمة أولاً تمنع فيضان `a * b`" },
      distractors: [{ en: "Division produces non-integer remainders cleanly", ar: "القسمة تعطي أعداداً عشرية دقيقة في النتائج" }, { en: "Multiplication alters prime factorizations", ar: "الضرب يغير التحليل إلى العوامل الأولية تماماً" }, { en: "Order doesn't change bit size at all", ar: "الترتيب لا يغير عدد البتات المطلوب إطلاقاً" }],
      explanation: { en: "`a` is guaranteed divisible by `gcd(a, b)`, so dividing before multiplying keeps intermediate values smaller.", ar: "لأن `gcd` يقسم `a` تماماً، فالقسمة أولاً تمنع تضخم الناتج الوسيط وتجنبك Overflow." }
    }
  },
  {
    unitId: "unit-cp-number-theory",
    item: {
      id: "EXP-NTH-104", domain: "Competitive Programming", topic: "Number Theory", subtopic: "Modular Inverse", difficulty: "hard", type: "concept", slotIndex: 3,
      question: { en: "When `P` is a prime number and `gcd(a, P) = 1`, what equals the modular inverse of `a` mod `P` by Fermat's Little Theorem?", ar: "إذا كان `P` عدداً أولياً و `gcd(a, P) = 1`، ما المعكوس الضربي لـ `a mod P` وفق مبرهنة فيرما الصغرى؟" },
      correct: { en: "a^(P - 2) mod P", ar: "a^(P - 2) mod P" },
      distractors: [{ en: "a^(P - 1) mod P", ar: "a^(P - 1) mod P" }, { en: "(P / a) mod P", ar: "العبارة (P / a) mod P" }, { en: "a^2 mod P", ar: "العبارة a^2 mod P" }],
      explanation: { en: "Fermat gives `a^(P-1) = 1 (mod P)`, so multiplying by `a^-1` shows `a^(P-2) = a^-1 (mod P)`.", ar: "بما أن `a^(P-1) = 1 (mod P)` فإن المعكوس الضربي هو `a^(P-2) mod P` ونحسبه بالأس الثنائي." }
    }
  },
  {
    unitId: "unit-cp-number-theory",
    item: {
      id: "EXP-NTH-105", domain: "Competitive Programming", topic: "Number Theory", subtopic: "Binary Exponentiation", difficulty: "easy", type: "complexity", slotIndex: 0,
      question: { en: "How many modular multiplications does Binary Exponentiation need at most to compute `a^b mod M`?", ar: "كم عملية ضرب يستهلكها الأس السريع (Binary Exponentiation) تقريباً لحساب `a^b mod M`؟" },
      correct: { en: "O(log b)", ar: "O(log b)" },
      distractors: [{ en: "O(b)", ar: "O(b)" }, { en: "O(sqrt(b))", ar: "O(sqrt(b))" }, { en: "O(b log b)", ar: "O(b log b)" }],
      explanation: { en: "Repeatedly squaring and inspecting each bit of `b` reduces `b` by half every iteration (`~log2(b)` steps).", ar: "تربيع الأساس وتفحص بتات الأس يقلص الخطوات من `b` إلى `log2(b)` فقط." }
    }
  },

  // 32. unit-db-relational-foundations (+5)
  {
    unitId: "unit-db-relational-foundations",
    item: {
      id: "EXP-REL-101", domain: "Databases", topic: "Relational Design", subtopic: "Primary Key", difficulty: "easy", type: "concept", slotIndex: 1,
      question: { en: "Which two strict rules must every relational Primary Key satisfy?", ar: "ما القاعدتان الصارمتان اللتان يجب أن يحققهما كل مفتاح أساسي (Primary Key)؟" },
      correct: { en: "Unique values and strictly NOT NULL", ar: "فريد و NOT NULL" },
      distractors: [{ en: "Floating decimal numbers and ascending text", ar: "أعداد عشرية متغيرة ونصوص مرتبة أبجدياً" }, { en: "Null defaults and mutable cascade keys", ar: "قيم فارغة افتراضياً مع السماح بالتكرار" }, { en: "Encrypted JWT tokens only", ar: "توكنات مصادقة مشفرة JWT tokens فقط" }],
      explanation: { en: "A Primary Key uniquely identifies every row in a relation and cannot be NULL.", ar: "المفتاح الأساسي يعرّف كل صف بصورة قاطعة، فلا يجوز تكراره أو تركه فارغاً." }
    }
  },
  {
    unitId: "unit-db-relational-foundations",
    item: {
      id: "EXP-REL-102", domain: "Databases", topic: "Relational Design", subtopic: "Many-to-Many", difficulty: "medium", type: "concept", slotIndex: 2,
      question: { en: "How is a Many-to-Many (`M:N`) relationship (e.g., Students <-> Courses) modeled in SQL tables?", ar: "كيف نُمثّل علاقة متعدد-إلى-متعدد (`M:N`) مثل الطلاب والمقررات في الجداول العلائقية؟" },
      correct: { en: "A junction table holding two Foreign Keys", ar: "جدول وسيط بمفتاحين أجنبيين" },
      distractors: [{ en: "Comma-separated course IDs inside a text column", ar: "تخزين الأرقام مفصولة بفواصل داخل نص واحد" }, { en: "Repeating course1..course20 columns directly", ar: "إضافة أعمدة مكررة course1..course20 مباشرة" }, { en: "Merging everything into a single global string", ar: "دمج كل الجداول في عمود نصي وحيد شامل" }],
      explanation: { en: "Junction/bridge tables preserve 1NF and enforce valid referential foreign keys on both endpoints.", ar: "الجدول الوسيط يحقق النموذج الأول ويفرض قيود المفاتيح الأجنبية على الطرفين." }
    }
  },
  {
    unitId: "unit-db-relational-foundations",
    item: {
      id: "EXP-REL-103", domain: "Databases", topic: "Relational Design", subtopic: "Foreign Key Constraint", difficulty: "easy", type: "scenario", slotIndex: 3,
      question: { en: "What does a Foreign Key `RESTRICT` / `NO ACTION` constraint prevent if child `Orders` still point to a `Customer`?", ar: "ماذا يمنع قيد المفتاح الأجنبي إذا حاولنا حذف عميل لا يزال لديه طلبات مرتبطة في جدول `Orders`؟" },
      correct: { en: "Deletes leaving orphaned child references", ar: "الحذف المؤدي لصفوف يتيمة" },
      distractors: [{ en: "Select queries sorting by `customer_id`", ar: "يمنع استعلامات القراءة والترتيب التصاعدي" }, { en: "Database read replication backups", ar: "يمنع نسخ قاعدة البيانات الاحتياطي المنتظم" }, { en: "Adding B-Tree indexes onto columns", ar: "يمنع إنشاء الفهارس الإضافية على الأعمدة" }],
      explanation: { en: "Referential integrity rejects deleting referenced parent rows unless cascading or re-assigning children.", ar: "تحافظ السلامة المرجعية على تناسق الجداول وتمنع الإشارة إلى سجل محذوف." }
    }
  },
  {
    unitId: "unit-db-relational-foundations",
    item: {
      id: "EXP-REL-104", domain: "Databases", topic: "Relational Design", subtopic: "CHECK Constraint", difficulty: "medium", type: "concept", slotIndex: 0,
      question: { en: "What is the role of `CHECK (percentage BETWEEN 0 AND 100)` inside table DDL?", ar: "ما فائدة القيد `CHECK (percentage BETWEEN 0 AND 100)` داخل تعريف الجدول؟" },
      correct: { en: "Rejects out-of-range writes at DB level", ar: "يرفض القيم خارج النطاق بالقاعدة" },
      distractors: [{ en: "Automatically doubles score columns silently", ar: "يضاعف جميع الدرجات تلقائياً عند الكتابة" }, { en: "Creates a clustered HTTP JSON endpoint", ar: "ينشئ مسار HTTP JSON تلقائياً للواجهة" }, { en: "Disables NULL values across other tables", ar: "يعطل قيم NULL في كافة الجداول الأخرى" }],
      explanation: { en: "Database constraints enforce invariants consistently regardless of which app client inserts/updates rows.", ar: "تفرض القيود صحة البيانات داخل القاعدة نفسها لحمايتها من أخطاء التطبيقات." }
    }
  },
  {
    unitId: "unit-db-relational-foundations",
    item: {
      id: "EXP-REL-105", domain: "Databases", topic: "Relational Design", subtopic: "Entity vs Attribute", difficulty: "easy", type: "concept", slotIndex: 1,
      question: { en: "In Entity-Relationship (ER) modeling, an `OrderDate` timestamp on an `Order` entity corresponds to what SQL element?", ar: "في نمذجة الكيانات والعلاقات (ER)، يترجم التاريخ `OrderDate` لكيان `Order` إلى ماذا في SQL؟" },
      correct: { en: "A Column (Attribute) on table `orders`", ar: "عمود في جدول `orders`" },
      distractors: [{ en: "A standalone operating system process", ar: "عملية مستقلة داخل نظام التشغيل الحديث" }, { en: "A client-side React CSS hook", ar: "دالة تنسيق CSS في واجهة المستخدم" }, { en: "A DNS AAAA IPv6 address record", ar: "سجل DNS لعنوان IPv6 بالشبكة الخارجية" }],
      explanation: { en: "Entities map to tables, entity instances map to rows, and entity attributes map to typed columns.", ar: "الكيان يتحول لجدول، وكل صف يمثل نسخة، وكل خاصية مثل التاريخ تصبح عموداً." }
    }
  },

  // 33. unit-sql-fundamentals (+5)
  {
    unitId: "unit-sql-fundamentals",
    item: {
      id: "EXP-SQL-101", domain: "Databases", topic: "SQL", subtopic: "Execution Order", difficulty: "medium", type: "concept", slotIndex: 2,
      question: { en: "In SQL logical query processing, which clause filters individual rows BEFORE `GROUP BY` runs?", ar: "في الترتيب المنطقي لتنفيذ SQL، أي جملة تصفي الصفوف المفردة قبل عمل `GROUP BY`؟" },
      correct: { en: "WHERE", ar: "WHERE" },
      distractors: [{ en: "HAVING", ar: "HAVING" }, { en: "ORDER BY", ar: "ORDER BY" }, { en: "LIMIT", ar: "LIMIT" }],
      explanation: { en: "Evaluation runs `FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT`.", ar: "التنفيذ المنطقي يبدأ بتصفية `WHERE` أولاً ثم التجميع `GROUP BY` وبعده `HAVING` للمجموعات." }
    }
  },
  {
    unitId: "unit-sql-fundamentals",
    item: {
      id: "EXP-SQL-102", domain: "Databases", topic: "SQL", subtopic: "NULL Logic Bug", difficulty: "easy", type: "debugging", slotIndex: 3,
      codeSnippet: `SELECT name FROM users WHERE mentor_id = NULL;`,
      codeLanguage: "sql",
      question: { en: "Why does `WHERE mentor_id = NULL` return 0 rows even when users have `NULL` values?", ar: "لماذا يعيد الشرط `WHERE mentor_id = NULL` صفراً من الصفوف حتى مع وجود قيم فارغة؟" },
      correct: { en: "`= NULL` yields UNKNOWN; use `IS NULL`", ar: "`= NULL` مجهول؛ استخدم `IS NULL`" },
      distractors: [{ en: "SQL converts `NULL` automatically to zero", ar: "تحول SQL قيمة `NULL` إلى صفر تلقائياً دائماً" }, { en: "Strings reject `NULL` comparisons altogether", ar: "النصوص تمنع مقارنات `NULL` داخل أي استعلام" }, { en: "`SELECT name` requires sorting by `LIMIT 1`", ar: "`SELECT name` تتطلب وضع `LIMIT 1` دائماً" }],
      explanation: { en: "Under three-valued SQL logic, anything `= NULL` evaluates to `UNKNOWN`, never `TRUE`.", ar: "في المنطق ثلاثي القيم بـ SQL أي مساواة مع `NULL` تكون UNKNOWN ولا تمرر الصفوف." }
    }
  },
  {
    unitId: "unit-sql-fundamentals",
    item: {
      id: "EXP-SQL-103", domain: "Databases", topic: "SQL", subtopic: "WHERE vs HAVING", difficulty: "medium", type: "concept", slotIndex: 0,
      question: { en: "Why must aggregate predicates like `COUNT(*) >= 5` live in `HAVING` rather than `WHERE`?", ar: "لماذا توضع شروط دوال التجميع مثل `COUNT(*) >= 5` في `HAVING` بدلاً من `WHERE`؟" },
      correct: { en: "Aggregates exist only after `GROUP BY`", ar: "التجميع يتكوّن بعد `GROUP BY`" },
      distractors: [{ en: "`WHERE` sorts groups descending only", ar: "`WHERE` يفرز المجموعات تنازلياً فقط دون تصفية" }, { en: "`HAVING` executes before `FROM` scans", ar: "`HAVING` يعمل قبل قراءة الجدول `FROM` أصلاً" }, { en: "Integers cannot compare inside `WHERE`", ar: "الأعداد الصحيحة ممنوعة المقارنة في `WHERE`" }],
      explanation: { en: "`WHERE` runs per raw row prior to grouping; `HAVING` runs on formed groups afterward.", ar: "`WHERE` يفحص كل صف منفرد قبل التجميع، أما `HAVING` فيفحص نتائج التجميع النهائية." }
    }
  },
  {
    unitId: "unit-sql-fundamentals",
    item: {
      id: "EXP-SQL-104", domain: "Databases", topic: "SQL", subtopic: "COUNT(*) vs COUNT(col)", difficulty: "hard", type: "concept", slotIndex: 1,
      question: { en: "Given 10 rows where `email` is `NULL` on 3 rows, what do `COUNT(*)` and `COUNT(email)` return respectively?", ar: "في جدول به 10 صفوف منها 3 صفوف فيها `email` يساوي `NULL`، ما ناتج `COUNT(*)` و `COUNT(email)` بالترتيب؟" },
      correct: { en: "10 and 7", ar: "10 و 7" },
      distractors: [{ en: "10 and 10", ar: "10 و 10" }, { en: "7 and 7", ar: "النتيجة 7 و 7" }, { en: "7 and 3", ar: "النتيجة 7 و 3" }],
      explanation: { en: "`COUNT(*)` counts all rows including NULL columns, while `COUNT(col)` skips NULL values.", ar: "`COUNT(*)` تحسب كافة الصفوف بينما `COUNT(col)` تتجاهل القيم الفارغة `NULL`." }
    }
  },
  {
    unitId: "unit-sql-fundamentals",
    item: {
      id: "EXP-SQL-105", domain: "Databases", topic: "SQL", subtopic: "SELECT *", difficulty: "easy", type: "concept", slotIndex: 2,
      question: { en: "Why avoid `SELECT *` inside high-traffic production API queries?", ar: "لماذا يُتجنب `SELECT *` في استعلامات الـ API الإنتاجية عالية الضغط؟" },
      correct: { en: "Wastes I/O and prevents covering index scans", ar: "يهدر I/O ويمنع تغطية الفهرس" },
      distractors: [{ en: "`SELECT *` corrupts primary keys permanently", ar: "يفسد المفاتيح الأساسية بالجدول بصورة دائمة" }, { en: "Databases forbid selecting over 2 columns", ar: "تمنع القاعدة اختيار أكثر من عمودين معاً" }, { en: "`*` disables SQL `ORDER BY` clauses", ar: "يعطل استخدام جملة الترتيب `ORDER BY` تماماً" }],
      explanation: { en: "Listing exact needed columns lowers network payload and enables fast index-only scans when applicable.", ar: "تحديد الأعمدة المطلوبة يقلل حجم البيانات المنقولة ويدعم Index-Only Scans." }
    }
  },

  // 34. unit-sql-joins-aggregations (+5)
  {
    unitId: "unit-sql-joins-aggregations",
    item: {
      id: "EXP-JNS-101", domain: "Databases", topic: "SQL Joins", subtopic: "INNER vs LEFT JOIN", difficulty: "easy", type: "concept", slotIndex: 3,
      question: { en: "In `students s LEFT JOIN enrollments e ON e.student_id = s.id`, what happens to students with zero enrollments?", ar: "في `students LEFT JOIN enrollments`، ماذا يحدث للطلاب الذين ليس لديهم أي تسجيل بعد؟" },
      correct: { en: "Kept with `NULL` values for right columns", ar: "يبقون مع قيم `NULL` للأيمن" },
      distractors: [{ en: "Dropped silently from the result set", ar: "يُحذفون كلياً من نتائج الاستعلام بلا أثر" }, { en: "Throws foreign key deletion error", ar: "يرمي خطأ قيد مفتاح أجنبي على الفور" }, { en: "Duplicated once per available course", ar: "يتكرر الطالب لكل مقرر دراسي متاح بالجدول" }],
      explanation: { en: "LEFT JOIN preserves every left-table row, filling unmatched right-side columns with `NULL`.", ar: "يحفظ LEFT JOIN جميع صفوف الجدول الأيسر ويعبئ حقول الأيمن غير المطابقة بـ NULL." }
    }
  },
  {
    unitId: "unit-sql-joins-aggregations",
    item: {
      id: "EXP-JNS-102", domain: "Databases", topic: "SQL Joins", subtopic: "LEFT JOIN Bug", difficulty: "hard", type: "debugging", slotIndex: 0,
      codeSnippet: `SELECT s.id, s.name\nFROM students s\nLEFT JOIN payments p ON p.student_id = s.id\nWHERE p.status = 'paid';`,
      codeLanguage: "sql",
      question: { en: "Why does `WHERE p.status = 'paid'` silently turn this `LEFT JOIN` into an `INNER JOIN`?", ar: "لماذا يحول الشرط `WHERE p.status = 'paid'` الربط اليساري `LEFT JOIN` إلى `INNER JOIN` عملياً؟" },
      correct: { en: "Filters out NULL right-side rows afterward", ar: "يستبعد صفوف NULL لاحقاً" },
      distractors: [{ en: "SQL optimizers forbid `LEFT JOIN` on strings", ar: "محرك القاعدة يمنع الربط مع الأعمدة النصية" }, { en: "`p.student_id` reverses table join order", ar: "يعكس ترتيب الجداول في الربط الداخلي" }, { en: "Single quotes trigger SQL Cartesian cross join", ar: "الأقواس المفردة تسبب ضرباً ديكارتياً مباشراً" }],
      explanation: { en: "For unmatched students, `p.status` is `NULL`, which fails `p.status = 'paid'`; put `p.status = 'paid'` inside the `ON` clause instead.", ar: "وضع شرط الجدول الأيمن في `WHERE` يستبعد صفوف `NULL`؛ الحل وضعه داخل `ON`." }
    }
  },
  {
    unitId: "unit-sql-joins-aggregations",
    item: {
      id: "EXP-JNS-103", domain: "Databases", topic: "SQL Joins", subtopic: "CTEs", difficulty: "medium", type: "concept", slotIndex: 1,
      question: { en: "What key readability/engineering benefit does a CTE (`WITH summary AS (...)`) provide over deep nested subqueries?", ar: "ما الميزة الهندسية الرئيسية لاستخدام CTE (`WITH ... AS (...)`) بدلاً من الاستعلامات الفرعية المتداخلة؟" },
      correct: { en: "Names staged query steps top-to-bottom cleanly", ar: "ينظم الاستعلام بمراحل مسماة" },
      distractors: [{ en: "Stores permanent tables onto SSD disk", ar: "يحفظ جداول دائمة على القرص الصلب SSD" }, { en: "Skips SQL transaction locks completely", ar: "يتجاوز أقفال المعاملات في القاعدة كلياً" }, { en: "Replaces all Primary Keys with UUIDs", ar: "يستبدل جميع المفاتيح الأساسية تلقائياً" }],
      explanation: { en: "CTEs break complex relational pipelines into readable named intermediate steps.", ar: "تفصل CTEs الاستعلامات المعقدة إلى مراحل مسماة سهلة القراءة والمراجعة." }
    }
  },
  {
    unitId: "unit-sql-joins-aggregations",
    item: {
      id: "EXP-JNS-104", domain: "Databases", topic: "SQL Joins", subtopic: "UNION vs UNION ALL", difficulty: "medium", type: "concept", slotIndex: 2,
      question: { en: "Why is `UNION ALL` typically faster than `UNION` when duplicate elimination is unnecessary?", ar: "لماذا يكون `UNION ALL` أسرع عادةً من `UNION` عندما لا نحتاج حذف التكرار؟" },
      correct: { en: "Avoids extra sorting or hashing deduplication", ar: "يتجنب فرز وحذف التكرار" },
      distractors: [{ en: "`UNION ALL` deletes older rows automatically", ar: "`UNION ALL` تحذف الصفوف القديمة تلقائياً" }, { en: "`UNION` runs queries across external APIs", ar: "`UNION` تشغل طلبات عبر الشبكة الخارجية" }, { en: "`UNION ALL` ignores column count rules", ar: "`UNION ALL` تتجاهل تطابق عدد الأعمدة" }],
      explanation: { en: "`UNION` deduplicates rows across combined sets using sort/hash, whereas `UNION ALL` appends streams directly.", ar: "يزيل `UNION` التكرار بالفرز أو التجزئة بينما يدمج `UNION ALL` النتائج فوراً." }
    }
  },
  {
    unitId: "unit-sql-joins-aggregations",
    item: {
      id: "EXP-JNS-105", domain: "Databases", topic: "SQL Joins", subtopic: "Row Multiplication", difficulty: "hard", type: "debugging", slotIndex: 3,
      question: { en: "Joining `Users -> Orders` and `Users -> Refunds` simultaneously in one query before `SUM()` causes what error?", ar: "ربط `Users` مع `Orders` و `Refunds` بآنٍ واحد قبل `SUM()` يسبب أي خلل؟" },
      correct: { en: "Row fan-out over-multiplies summed amounts", ar: "تضاعف الصفوف يكرر الجمع" },
      distractors: [{ en: "Zero rows return due to NULL collision", ar: "يعيد صفراً من الصفوف لتصادم قيم NULL" }, { en: "Database automatically drops foreign keys", ar: "يحذف محرك القاعدة مفاتيح الربط تلقائياً" }, { en: "`SUM` rounds every decimal downward", ar: "تقرّب الدالة `SUM` كل الكسور للأسفل" }],
      explanation: { en: "Two independent 1:N joins form `O x R` row combinations per user, counting sums multiple times; aggregate separately first in CTEs.", ar: "الربط المتزامن لعلاقتي 1:N يضرب عدد الصفوف فيتكرر المبلغ؛ لذا اجمع كل جدول بـ CTE قبل الربط." }
    }
  },

  // 35. unit-db-normalization-foundations (+5)
  {
    unitId: "unit-db-normalization-foundations",
    item: {
      id: "EXP-NRM-101", domain: "Databases", topic: "Normalization", subtopic: "1NF", difficulty: "easy", type: "concept", slotIndex: 0,
      question: { en: "Why does storing comma-separated strings like `\"c++,sql,oop\"` inside one `tags` column violate 1NF?", ar: "لماذا يخالف تخزين قيم مثل `\"c++,sql,oop\"` في عمود واحد الشكل النظامي الأول (1NF)؟" },
      correct: { en: "Attributes must hold single atomic values", ar: "القيم يجب أن تكون ذرية منفردة" },
      distractors: [{ en: "Commas break UTF-8 hex encoding always", ar: "الفواصل تفسد ترميز UTF-8 في القاعدة دوماً" }, { en: "1NF allows arrays inside every column", ar: "الشكل الأول يشترط مصفوفات داخل كل عمود" }, { en: "PostgreSQL truncates strings at 8 bytes", ar: "PostgreSQL يقص جميع النصوص عند 8 بايت" }],
      explanation: { en: "First Normal Form requires scalar atomic values per cell with no repeating groups.", ar: "الشكل الأول 1NF يشترط أن يحمل كل حقل قيمة ذرية واحدة لا مجموعة متكررة." }
    }
  },
  {
    unitId: "unit-db-normalization-foundations",
    item: {
      id: "EXP-NRM-102", domain: "Databases", topic: "Normalization", subtopic: "2NF", difficulty: "medium", type: "concept", slotIndex: 1,
      question: { en: "Second Normal Form (2NF) specifically eliminates partial dependencies on what kind of Primary Key?", ar: "يزيل الشكل النظامي الثاني (2NF) التبعية الجزئية (Partial Dependency) المرتبطة بأي نوع من المفاتيح الأساسية؟" },
      correct: { en: "Composite multi-column Primary Keys", ar: "المفتاح الأساسي المركب" },
      distractors: [{ en: "Single auto-increment integer IDs", ar: "المفتاح المفرد ذو الزيادة التلقائية البسيط" }, { en: "Foreign keys pointing to views", ar: "المفاتيح الأجنبية المشيرة للواجهات" }, { en: "Nullable boolean status columns", ar: "أعمدة الحالة المنطقية القابلة للفراغ" }],
      explanation: { en: "If an attribute depends on only PART of a composite key (e.g. `course_title` on `course_id` inside `(student_id, course_id)`), it violates 2NF.", ar: "في المفتاح المركب `(student_id, course_id)`، اعتماد عمود على جزء واحد من المفتاح يكسر 2NF." }
    }
  },
  {
    unitId: "unit-db-normalization-foundations",
    item: {
      id: "EXP-NRM-103", domain: "Databases", topic: "Normalization", subtopic: "3NF", difficulty: "medium", type: "concept", slotIndex: 2,
      question: { en: "If table `Users(id, dept_id, dept_name)` determines `id -> dept_id -> dept_name`, which Normal Form is violated?", ar: "إذا حدّد `id -> dept_id -> dept_name` في جدول `Users(id, dept_id, dept_name)`، فأي شكل نظامي مخترَق؟" },
      correct: { en: "3NF (Transitive dependency)", ar: "3NF (تبعية متعدية)" },
      distractors: [{ en: "1NF only", ar: "الشكل النظامي الأول 1NF فقط" }, { en: "0NF JSON", ar: "تخزين بيانات JSON غير المطبعة" }, { en: "ACID Isolation", ar: "مستوى عزل المعاملات ACID" }],
      explanation: { en: "`dept_name` depends on non-key attribute `dept_id`, creating update anomalies; extract `Departments(dept_id, dept_name)`.", ar: "اعتماد عمود غير مفتاحي على عمود غير مفتاحي آخر يخلق تبعية متعدية تناقض 3NF." }
    }
  },
  {
    unitId: "unit-db-normalization-foundations",
    item: {
      id: "EXP-NRM-104", domain: "Databases", topic: "Normalization", subtopic: "Denormalization", difficulty: "medium", type: "scenario", slotIndex: 3,
      question: { en: "Why SHOULD an invoice line item copy `unit_price_at_purchase` instead of always joining live `products.price`?", ar: "لماذا ينبغي حفظ `unit_price_at_purchase` داخل سطر الفاتورة بدلاً من قراءة سعر المنتج الحالي دائماً؟" },
      correct: { en: "Preserves historical snapshot if price rises", ar: "يحفظ السعر التاريخي وقت الشراء" },
      distractors: [{ en: "Because SQL prohibits joining `products`", ar: "لأن SQL يمنع الربط بجدول المنتجات نهائياً" }, { en: "To reduce Primary Keys down to 0 bytes", ar: "لتقليص حجم المفاتيح الأساسية إلى صفر بايت" }, { en: "To create intentional update anomalies", ar: "لإحداث شذوذ تحديث متعمد بالقاعدة" }],
      explanation: { en: "Invoices require point-in-time historical snapshots so changing catalog prices today never alters past bills.", ar: "نسخ السعر وقت الشراء يمنع تغيير قيمة الفواتير التاريخية عند تحديث سعر المنتج مستقبلاً." }
    }
  },
  {
    unitId: "unit-db-normalization-foundations",
    item: {
      id: "EXP-NRM-105", domain: "Databases", topic: "Normalization", subtopic: "Anomalies", difficulty: "easy", type: "concept", slotIndex: 0,
      question: { en: "What happens in an unnormalized table if deleting the only student enrolled in a course also erases the course's title?", ar: "ماذا يُسمى هذا الخطأ في جدول غير مطبع عندما يؤدي حذف الطالب الوحيد بمقرر إلى ضياع اسم المقرر؟" },
      correct: { en: "A Deletion Anomaly", ar: "شذوذ الحذف Deletion Anomaly" },
      distractors: [{ en: "A Page Replacement Thrash", ar: "تزاحم استبدال صفحات الذاكرة الافتراضية" }, { en: "A Deadlock Circular Wait", ar: "حالة الانتظار الدائري المقفل بالنظام" }, { en: "A TLB Cache Flush", ar: "تفريغ ذاكرة الترجمة السريعة TLB" }],
      explanation: { en: "Mixing independent entities in one table causes loss of course facts when the last student record is deleted.", ar: "خلط بيانات كيانين بجدول واحد يسبب فقدان معلومات كيان عند حذف آخر سجل مرتبط به." }
    }
  },

  // 36. unit-db-indexing-foundations (+5)
  {
    unitId: "unit-db-indexing-foundations",
    item: {
      id: "EXP-IDX-101", domain: "Databases", topic: "Indexing", subtopic: "B-Tree Lookup", difficulty: "easy", type: "complexity", slotIndex: 1,
      question: { en: "What is the time complexity of searching a single key in a balanced database B-Tree index over `n` rows?", ar: "ما التعقيد الزمني للبحث عن مفتاح مفرد في فهرس B-Tree متوازن يحوي `n` صف؟" },
      correct: { en: "O(log n)", ar: "O(log n)" },
      distractors: [{ en: "O(n^2)", ar: "تربيعي O(n^2)" }, { en: "O(n)", ar: "خطي O(n)" }, { en: "O(2^n)", ar: "أسي O(2^n)" }],
      explanation: { en: "High-fanout B-Tree/B+Tree structures locate keys across millions of rows in ~3-5 disk page hops (`O(log n)`).", ar: "شجرة B-Tree عالية التفرع تصل للبيانات عبر مستويات لوغاريتمية قليلة جداً O(log n)." }
    }
  },
  {
    unitId: "unit-db-indexing-foundations",
    item: {
      id: "EXP-IDX-102", domain: "Databases", topic: "Indexing", subtopic: "SARGable Bug", difficulty: "hard", type: "debugging", slotIndex: 2,
      codeSnippet: `SELECT id FROM users WHERE LOWER(email) = 'a@b.com'; -- standard index on (email)`,
      codeLanguage: "sql",
      question: { en: "Why does `WHERE LOWER(email) = ...` bypass a standard B-Tree index defined on raw `email`?", ar: "لماذا يتجاهل المخطط الفهرس العادي على `email` في شرط `WHERE LOWER(email) = ...`؟" },
      correct: { en: "Function wrap prevents direct index ordering", ar: "الدالة تكسر ترتيب الفهرس" },
      distractors: [{ en: "Single quotes trigger sequential disk reads", ar: "علامات الاقتباس تفرض مسح القرص بالكامل" }, { en: "Emails cannot fit into 4KB B-Tree pages", ar: "البريد الإلكتروني لا يتسع بصفحات 4KB" }, { en: "`SELECT id` lacks an aggregate group", ar: "جملة SELECT id تفتقد دالة التجميع" }],
      explanation: { en: "The index is ordered by raw `email`, not `LOWER(email)`, forcing a full scan unless an expression index exists.", ar: "القيم بالفهرس مرتبة وفق النص الأصلي لا ناتج الدالة؛ يلزم استعلام السير المباشر أو Expression Index." }
    }
  },
  {
    unitId: "unit-db-indexing-foundations",
    item: {
      id: "EXP-IDX-103", domain: "Databases", topic: "Indexing", subtopic: "Composite Prefix Rule", difficulty: "medium", type: "scenario", slotIndex: 3,
      question: { en: "Given composite B-Tree index `(tenant_id, created_at)`, which filter CANNOT use that index cleanly on its own?", ar: "بفهرس مركب على `(tenant_id, created_at)`، أي استعلام لا يستفيد من هذا الفهرس بكفاءة؟" },
      correct: { en: "`WHERE created_at >= '2026-01-01'` only", ar: "`WHERE created_at >= '2026-01-01'`" },
      distractors: [{ en: "`WHERE tenant_id = 7` only", ar: "`WHERE tenant_id = 7` وحده معاً" }, { en: "`WHERE tenant_id = 7 AND created_at > ...`", ar: "`WHERE tenant_id = 7 AND created_at > ...`" }, { en: "`WHERE tenant_id = 7 ORDER BY created_at`", ar: "`WHERE tenant_id = 7 ORDER BY created_at`" }],
      explanation: { en: "B-Tree keys sort primarily by the leftmost column (`tenant_id`), so filtering solely by the second column skips index ordering.", ar: "يُرتّب الفهرس المركب بالعمود الأيسر أولاً (`tenant_id`)؛ لذا تخطيه يضيع ترتيب البداية." }
    }
  },
  {
    unitId: "unit-db-indexing-foundations",
    item: {
      id: "EXP-IDX-104", domain: "Databases", topic: "Indexing", subtopic: "Write Tradeoff", difficulty: "easy", type: "concept", slotIndex: 0,
      question: { en: "Why don't engineers create B-Tree indexes on EVERY single column of a write-heavy table?", ar: "لماذا لا ينشئ المهندسون فهارس B-Tree على كل أعمدة جدول كثير التعديلات والكتابة؟" },
      correct: { en: "Writes slow down updating every index tree", ar: "الكتابة تتباطأ بتحديث الفهارس" },
      distractors: [{ en: "Tables limit maximum total index count to 2", ar: "الجداول تمنع تعريف أكثر من فهرسين معاً" }, { en: "Extra indexes break primary keys", ar: "الفهارس الإضافية تفسد المفاتيح الأساسية" }, { en: "Indexes hide rows from `SELECT` scans", ar: "الفهارس تخفي الصفوف عن استعلامات القراءة" }],
      explanation: { en: "Every INSERT, UPDATE, and DELETE must update every attached index B-Tree plus extra disk storage.", ar: "كل إدراج أو حذف يجب أن يحدث كافة الفهارس المعرّفة على الجدول، مما يزيد كلفة الكتابة." }
    }
  },
  {
    unitId: "unit-db-indexing-foundations",
    item: {
      id: "EXP-IDX-105", domain: "Databases", topic: "Indexing", subtopic: "Hash vs B-Tree", difficulty: "medium", type: "concept", slotIndex: 1,
      question: { en: "Why do B-Tree indexes dominate Hash indexes for general SQL queries?", ar: "لماذا يغلب استخدام فهرس B-Tree على Hash Index في معظم استعلامات SQL؟" },
      correct: { en: "Supports range queries (`>`, `<`, `BETWEEN`) & sorting", ar: "يدعم النطاق (`>`, `BETWEEN`) والفرز" },
      distractors: [{ en: "B-Tree forbids duplicate keys cleanly", ar: "فهرس B-Tree يمنع المفاتيح المكررة بالجدول" }, { en: "Hash indexes cannot compute equality `=`", ar: "فهارس Hash لا تدعم مقارنات التساوي `=`" }, { en: "Hash consumes 1000x more disk bits", ar: "فهارس Hash تستهلك مساحة أكبر بألف ضعف" }],
      explanation: { en: "Hash buckets scatter sorted keys unpredictably, helping only exact `=` lookups, while B-Trees preserve order for ranges.", ar: "دالة التجزئة تشتت الترتيب فتفيد `=` فقط، بينما يحفظ B-Tree الترتيب لاستعلامات النطاق والفرز." }
    }
  },

  // 37. unit-db-acid-transactions (+5)
  {
    unitId: "unit-db-acid-transactions",
    item: {
      id: "EXP-ACD-101", domain: "Databases", topic: "Transactions", subtopic: "Atomicity", difficulty: "easy", type: "concept", slotIndex: 2,
      question: { en: "In a bank transfer debiting A and crediting B, the DB crashes right after debiting A before crediting B. Which ACID property guarantees A is NOT debited?", ar: "عند تعطل القاعدة بين خصم المبلغ من A وإضافته إلى B، أي خاصية ACID تضمن استعادة رصيد A دون خصم؟" },
      correct: { en: "Atomicity (all-or-nothing rollback)", ar: "الذرية Atomicity (الكل أو لا شيء)" },
      distractors: [{ en: "Isolation levels alone", ar: "مستويات العزل المتزامنة وحدها" }, { en: "Schema normalization", ar: "تطبيع هيكل الجداول العلائقية" }, { en: "Index compression", ar: "ضغط صفحات الفهارس المتوازنة" }],
      explanation: { en: "Atomicity treats the entire transaction as an indivisible unit, rolling back partial changes via WAL/undo logs.", ar: "تضمن الذرية إما نجاح جميع خطوات المعاملة أو التراجع عنها كلها وكأن شيئاً لم يكن." }
    }
  },
  {
    unitId: "unit-db-acid-transactions",
    item: {
      id: "EXP-ACD-102", domain: "Databases", topic: "Transactions", subtopic: "WAL & Durability", difficulty: "medium", type: "concept", slotIndex: 3,
      question: { en: "How does a database guarantee `Durability` cleanly immediately upon `COMMIT` without flushing every random heap page first?", ar: "كيف تضمن القاعدة خاصية الديمومة (`Durability`) فور `COMMIT` بسرعة دون كتابة كل الصفحات عشوائياً؟" },
      correct: { en: "Appends sequential Write-Ahead Log (WAL) to disk", ar: "يكتب سجل WAL تسلسلياً أولاً" },
      distractors: [{ en: "Holds committed records purely inside CPU L1", ar: "يبقيها فقط داخل ذاكرة L1 بالمعالج المركزي" }, { en: "Sends unencrypted JSON via client cookies", ar: "يرسلها عبر ملفات تعريف الارتباط بالمتصفح" }, { en: "Drops all indexes after every commit", ar: "يحذف كل الفهارس الملحقة بعد كل عملية حفظ" }],
      explanation: { en: "Sequential writes to the Write-Ahead Log sync cleanly to stable storage so crashes replay committed transactions safely.", ar: "الكتابة التسلسلية في WAL أسرع بكثير من تعديل عشوائي للصفحات وتسمح بالاستعادة بعد الانقطاع." }
    }
  },
  {
    unitId: "unit-db-acid-transactions",
    item: {
      id: "EXP-ACD-103", domain: "Databases", topic: "Transactions", subtopic: "MVCC", difficulty: "medium", type: "concept", slotIndex: 0,
      question: { en: "What core concurrency win does MVCC (Multi-Version Concurrency Control) achieve in PostgreSQL?", ar: "ما الميزة الأساسية التي يحققها نظام MVCC للتزامن في قواعد مثل PostgreSQL؟" },
      correct: { en: "Readers never block writers and vice versa", ar: "القراءة والكتابة لا تعطل إحداهما الأخرى" },
      distractors: [{ en: "Runs only one user query per minute globally", ar: "تسمح بتنفيذ استعلام واحد فقط بالدقيقة" }, { en: "Stores backups inside browser localStorage", ar: "تحفظ نسخ القاعدة داخل ذاكرة المتصفح المحلي" }, { en: "Forces all reads into exclusive locks", ar: "تفرض أقفالاً حصرية صارمة على كل القراءات" }],
      explanation: { en: "MVCC gives readers snapshot visibility of row versions without waiting for concurrent write locks.", ar: "يحتفظ MVCC بنسخ متزامنة للصفوف ليرى كل استعلام لقطة متسقة دون انتظار الأقفال." }
    }
  },
  {
    unitId: "unit-db-acid-transactions",
    item: {
      id: "EXP-ACD-104", domain: "Databases", topic: "Transactions", subtopic: "Dirty Read", difficulty: "easy", type: "concept", slotIndex: 1,
      question: { en: "What anomaly happens when Transaction T2 reads an uncommitted row written by T1 that T1 later rolls back?", ar: "ماذا تسمى المشكلة عندما تقرأ المعاملة T2 تعديلاً غير مؤكد (Uncommitted) لـ T1 ثم تتراجع T1؟" },
      correct: { en: "Dirty Read", ar: "قراءة متسخة Dirty Read" },
      distractors: [{ en: "Index Fan-out", ar: "تفرع شجرة الفهرس المتوازن" }, { en: "Stack Overflow", ar: "فيض مكدس الاستدعاءات بالنظام" }, { en: "Two-Sum Hash", ar: "تجزئة المجموع الثنائي بالمصفوفة" }],
      explanation: { en: "Reading uncommitted ephemeral changes exposes phantom state that never officially committed.", ar: "قراءة بيانات لم تثبت بعد بالـ COMMIT ثم التراجع عنها تجعل T2 تعتمد على حقيقة غير موجودة." }
    }
  },
  {
    unitId: "unit-db-acid-transactions",
    item: {
      id: "EXP-ACD-105", domain: "Databases", topic: "Transactions", subtopic: "Long Lock Anti-Pattern", difficulty: "hard", type: "debugging", slotIndex: 2,
      question: { en: "Why must a backend NEVER call a slow external payment HTTP webhook while holding an open DB row lock inside a transaction?", ar: "لماذا يمنع هندسياً إرسال طلب HTTP خارجي بطيء أثناء فتح معاملة وقفل صفوف بالقاعدة؟" },
      correct: { en: "Exhausts DB connection pool & blocks others", ar: "يستنفد الاتصالات ويحجز الصفوف" },
      distractors: [{ en: "HTTP webhooks wipe WAL transaction headers", ar: "طلبات HTTP تمحو سجلات WAL من القرص" }, { en: "SQL fails whenever TLS ports are open", ar: "SQL يفشل مع وجود منفذ TLS مفتوح" }, { en: "External calls automatically commit unverified transactions", ar: "الطلبات الخارجية تثبت المعاملة تلقائياً" }],
      explanation: { en: "Holding database locks across unpredictable 2-second network calls stalls concurrent writers and starves the pool.", ar: "ربط زمن قفل قاعدة البيانات بزمن استجابة شبكة خارجي يسبب اختناقاً وتكدساً شديداً للاتصالات." }
    }
  },

  // 38. unit-os-processes-threads (+2)
  {
    unitId: "unit-os-processes-threads",
    item: {
      id: "EXP-PRC-101", domain: "Operating Systems", topic: "Concurrency", subtopic: "Race Condition", difficulty: "medium", type: "debugging", slotIndex: 3,
      codeSnippet: `// Two threads run simultaneously without mutex:\ncounter = counter + 1;`,
      question: { en: "If two threads each run `counter++` 1,000 times unsynchronized on `counter = 0`, why can final output be `< 2000`?", ar: "إذا نفذ خيطان `counter++` ألف مرة دون قفل على `0`، لماذا قد يكون الناتج النهائي `< 2000`؟" },
      correct: { en: "Non-atomic load-add-store interleaves updates", ar: "تداخل الخطوات يضيع التحديث" },
      distractors: [{ en: "CPU discards odd integers cleanly", ar: "المعالج يحذف الأعداد الفردية أثناء التنفيذ" }, { en: "Threads maintain private global heaps", ar: "لكل خيط ذاكرة عامة منفصلة تماماً عن الآخر" }, { en: "Registers cap integers at 1,024 bits", ar: "المسجلات تحد القيمة الصحيحة عند 1024" }],
      explanation: { en: "`counter++` breaks into Load -> Add -> Store; overlapping threads read stale values and overwrite each other.", ar: "العملية غير ذرية بل ثلاث خطوات؛ يقرأ كلاهما نفس القيمة القديمة فيضيع التحديث الأول." }
    }
  },
  {
    unitId: "unit-os-processes-threads",
    item: {
      id: "EXP-PRC-102", domain: "Operating Systems", topic: "Concurrency", subtopic: "Deadlock Ordering", difficulty: "hard", type: "concept", slotIndex: 0,
      question: { en: "How does acquiring mutexes in a strict global lock order prevent Deadlock?", ar: "كيف يمنع اكتساب الأقفال (Mutexes) بترتيب عالمي موحد حدوث التوقف التام (Deadlock)؟" },
      correct: { en: "Breaks the Circular Wait Coffman condition", ar: "يكسر شرط الانتظار الدائري" },
      distractors: [{ en: "Eliminates Mutual Exclusion completely", ar: "يلغي الاستبعاد المتبادل تماماً من النظام" }, { en: "Forces processes into User-Mode HTTP calls", ar: "يحول العمليات لطلبات HTTP خارجية فقط" }, { en: "Prevents CPU cores from context switching", ar: "يمنع المعالج من تبديل السياق بين المهام" }],
      explanation: { en: "Lock hierarchy prevents Thread A holding L1 waiting for L2 while Thread B holds L2 waiting for L1.", ar: "فرض ترتيب ثابت مثل L1 قبل L2 دائماً يجعل تكوين حلقة انتظار مستحيلاً." }
    }
  },

  // 39. unit-os-cpu-scheduling (+5)
  {
    unitId: "unit-os-cpu-scheduling",
    item: {
      id: "EXP-SCH-101", domain: "Operating Systems", topic: "CPU Scheduling", subtopic: "Round Robin", difficulty: "easy", type: "concept", slotIndex: 1,
      question: { en: "What is the main risk of choosing a Round Robin time quantum `q` that is FAR too small (e.g. microseconds)?", ar: "ما الخطر الأساسي من جعل الشريحة الزمنية `q` في Round Robin صغيرة جداً أكثر من اللازم؟" },
      correct: { en: "Excessive context-switch overhead wastes CPU", ar: "كثرة التبديل تهدر المعالج" },
      distractors: [{ en: "Degrades identically into infinite FIFO", ar: "يتحول إلى جدول FCFS غير قابل للمقاطعة" }, { en: "Permanent starvation for every short I/O task", ar: "حرمان دائم للمهام التفاعلية القصيرة جداً" }, { en: "Prevents virtual memory pages from mapping", ar: "يمنع ترجمة صفحات الذاكرة الافتراضية" }],
      explanation: { en: "Tiny quantums spend huge percentages of CPU cycles saving/restoring registers instead of doing real work.", ar: "الشريحة متناهية الصغر تقضي وقتاً طويلاً في حفظ واستعادة السجلات بدلاً من تنفيذ البرامج." }
    }
  },
  {
    unitId: "unit-os-cpu-scheduling",
    item: {
      id: "EXP-SCH-102", domain: "Operating Systems", topic: "CPU Scheduling", subtopic: "Convoy Effect", difficulty: "medium", type: "concept", slotIndex: 2,
      question: { en: "Which scheduling algorithm suffers heavily from the 'Convoy Effect' when one giant CPU-bound process arrives first?", ar: "أي خوارزمية جدولة تعاني من أثر القافلة (Convoy Effect) عند وصول مهمة ثقيلة طويلة أولاً؟" },
      correct: { en: "FCFS (First-Come, First-Served)", ar: "الأول وصولاً يُخدم أولاً (FCFS)" },
      distractors: [{ en: "Shortest Remaining Time First (SRTF)", ar: "أقصر وقت متبقٍ أولاً (SRTF)" }, { en: "Balanced Round Robin", ar: "خوارزمية التناوب الدوري Round Robin" }, { en: "Multi-Level Feedback Queue", ar: "صف التغذية الراجعة متعدد المستويات" }],
      explanation: { en: "Under non-preemptive FCFS, dozens of fast interactive jobs sit idle queued behind one long CPU hog.", ar: "في FCFS تنتظر كافة المهام القصيرة خلف مهمة طويلة واحدة قبلها فيرتفع متوسط الانتظار." }
    }
  },
  {
    unitId: "unit-os-cpu-scheduling",
    item: {
      id: "EXP-SCH-103", domain: "Operating Systems", topic: "CPU Scheduling", subtopic: "Aging", difficulty: "medium", type: "concept", slotIndex: 3,
      question: { en: "What problem does Priority 'Aging' solve in OS schedulers?", ar: "أي مشكلة يعالجها أسلوب التعتيق (Aging) في مجدولات الأولوية؟" },
      correct: { en: "Starvation of low-priority waiting processes", ar: "حرمان العمليات منخفضة الأولوية" },
      distractors: [{ en: "Integer overflow in timer interrupts", ar: "فيضان العداد في مقاطعات الساعة الزمنية" }, { en: "TLB invalidation across CPU cores", ar: "إلغاء صلاحية ذاكرة TLB بين الأنوية" }, { en: "Duplicate process PID allocations", ar: "تكرار تخصيص معرفات العمليات PID" }],
      explanation: { en: "Gradually boosting priority of waiting tasks guarantees even low-priority processes eventually earn CPU time.", ar: "رفع أولوية المهمة المنتظرة تدريجياً مع الزمن يضمن عدم حجبها للأبد." }
    }
  },
  {
    unitId: "unit-os-cpu-scheduling",
    item: {
      id: "EXP-SCH-104", domain: "Operating Systems", topic: "CPU Scheduling", subtopic: "Turnaround vs Waiting", difficulty: "medium", type: "code-output", slotIndex: 0,
      question: { en: "A single process arrives at `t=2`, waits until `t=5`, and runs for `4ms` finishing at `t=9`. What is its Turnaround Time?", ar: "وصلت عملية عند `t=2`، بدأت التنفيذ عند `t=5` واستغرقت `4ms` لتنتهي عند `t=9`. ما زمن الإتمام الكلي (Turnaround)؟" },
      correct: { en: "7ms (`Completion - Arrival`)", ar: "7ms (`الانتهاء - الوصول`)" },
      distractors: [{ en: "9ms total clock time", ar: "الوقت الإجمالي 9ms على الساعة" }, { en: "3ms waiting delay only", ar: "زمن الانتظار 3ms وحده فقط" }, { en: "4ms CPU burst length", ar: "مدة التنفيذ الفعلي 4ms بالمعالج" }],
      explanation: { en: "`Turnaround Time = Completion Time - Arrival Time = 9 - 2 = 7ms` (waiting 3ms + running 4ms).", ar: "زمن الإتمام الكلي = لحظة الانتهاء ناقص لحظة الوصول (`9 - 2 = 7ms`)." }
    }
  },
  {
    unitId: "unit-os-cpu-scheduling",
    item: {
      id: "EXP-SCH-105", domain: "Operating Systems", topic: "CPU Scheduling", subtopic: "MLFQ", difficulty: "hard", type: "concept", slotIndex: 1,
      question: { en: "How does a Multi-Level Feedback Queue (MLFQ) estimate interactivity without oracle knowledge of future CPU bursts?", ar: "كيف يميز مجدول MLFQ بين المهام التفاعلية والمكثفة للمعالج دون معرفة مسبقة بطولها؟" },
      correct: { en: "Promotes/demotes queues from observed burst behavior", ar: "يعدّل الأولوية بناءً على السلوك" },
      distractors: [{ en: "Reads user source comments line by line", ar: "يقرأ تعليقات المبرمج سطراً بسطر مسبقاً" }, { en: "Runs tasks backward in negative quantums", ar: "ينفذ المهام بعكس الزمن في شرائح سالبة" }, { en: "Asks remote HTTP DNS servers first", ar: "يستعلم من خوادم DNS البعيدة قبل البدء" }],
      explanation: { en: "Tasks yielding quickly for I/O keep high priority; tasks burning full quantums get demoted to lower queues.", ar: "المهمة التي تنتظر I/O قبل نفاد الشريحة تبقى عالية الأولوية، أما المستهلكة فتُنقل لرتل أدنى." }
    }
  },

  // 40. unit-os-virtual-memory (+4)
  {
    unitId: "unit-os-virtual-memory",
    item: {
      id: "EXP-VM-101", domain: "Operating Systems", topic: "Virtual Memory", subtopic: "TLB Cache", difficulty: "medium", type: "concept", slotIndex: 2,
      question: { en: "What is the specific hardware role of the TLB (Translation Lookaside Buffer)?", ar: "ما الوظيفة العتادية الدقيقة لذاكرة TLB في المعالج؟" },
      correct: { en: "Caches recent virtual-to-physical page translations", ar: "تخزن أحدث ترجمات الصفحات" },
      distractors: [{ en: "Stores long-term filesystem logs onto SSD", ar: "تحفظ سجل الملفات الدائم على قرص SSD" }, { en: "Validates HTTPS TLS certificates cleanly", ar: "تتحقق من شهادات التشفير الرقمية TLS" }, { en: "Holds pending SQL transaction queries", ar: "تحفظ معاملات SQL المعلقة بقاعدة البيانات" }],
      explanation: { en: "The TLB caches recent page-table mappings inside the MMU so address translation finishes in 1 cycle instead of multi-level RAM lookups.", ar: "تُسرّع TLB ترجمة العناوين بتخزين آخر المطابقات لتفادي قراءة جداول الصفحات من RAM كل مرة." }
    }
  },
  {
    unitId: "unit-os-virtual-memory",
    item: {
      id: "EXP-VM-102", domain: "Operating Systems", topic: "Virtual Memory", subtopic: "Thrashing", difficulty: "hard", type: "scenario", slotIndex: 3,
      question: { en: "When active processes' combined working sets exceed physical RAM and the OS swaps pages continuously, what strikes?", ar: "عندما تتجاوز مجموعات العمل النشطة سعة الذاكرة الحقيقية وينشغل النظام بنقل الصفحات من القرص باستمرار، ماذا يُسمى ذلك؟" },
      correct: { en: "Thrashing (near-zero useful CPU throughput)", ar: "التزاحم Thrashing (انهيار الأداء)" },
      distractors: [{ en: "SARGable Index Optimization", ar: "تحسين فهارس قواعد البيانات SARGable" }, { en: "Tail Call Optimization", ar: "تحسين الاستدعاء الذيل بالخوارزميات" }, { en: "Two-Pointer Shrinking", ar: "تقليص نافذة المؤشرين بالمصفوفات" }],
      explanation: { en: "The OS spends nearly all its time handling page faults and disk swap I/O instead of executing instructions.", ar: "يستنزف النظام وقته في تبديل الصفحات مع القرص فتتوقف الإنتاجية الفعلية تقريباً." }
    }
  },
  {
    unitId: "unit-os-virtual-memory",
    item: {
      id: "EXP-VM-103", domain: "Operating Systems", topic: "Virtual Memory", subtopic: "Page Fault", difficulty: "easy", type: "concept", slotIndex: 0,
      question: { en: "Does every Page Fault mean a program crashed with a segmentation error?", ar: "هل يعني كل Page Fault انهيار البرنامج بخطأ وصول غير صالح؟" },
      correct: { en: "No; demand paging loads valid pages cleanly", ar: "لا، قد يكون تحميل صفحة طبيعياً" },
      distractors: [{ en: "Yes; every page fault kills the kernel", ar: "نعم، كل خطأ صفحة يطفئ النظام كلياً" }, { en: "Yes; RAM allocates only 1 byte per process", ar: "نعم، تحجز RAM بايت واحداً لكل عملية" }, { en: "No; page faults format NVMe SSD partitions", ar: "لا، إنه يعيد تهيئة القرص الصلب فقط" }],
      explanation: { en: "Soft/major page faults normally trigger the OS to bring lazy-loaded pages into RAM seamlessly; invalid addresses trigger segfaults.", ar: "في التحميل عند الطلب، يجلب النظام الصفحة المفقودة من القرص ويستأنف البرنامج طبيعياً." }
    }
  },
  {
    unitId: "unit-os-virtual-memory",
    item: {
      id: "EXP-VM-104", domain: "Operating Systems", topic: "Virtual Memory", subtopic: "Chmod Permissions", difficulty: "easy", type: "code-output", slotIndex: 1,
      question: { en: "In Unix permissions `chmod 750 script.sh`, what rights does the file `owner` (`7`) receive?", ar: "في صلاحيات Unix `chmod 750 script.sh`، ما الصلاحيات الممنوحة للمالك (`7`)؟" },
      correct: { en: "Read + Write + Execute (`4 + 2 + 1`)", ar: "قراءة + كتابة + تنفيذ (7)" },
      distractors: [{ en: "Read and Write only (`6`)", ar: "قراءة وكتابة فقط بدون تنفيذ (6)" }, { en: "Execute only (`1`)", ar: "تنفيذ فقط دون قراءة أو كتابة (1)" }, { en: "Zero permissions (`0`)", ar: "لا صلاحيات ممنوحة للمالك إطلاقاً (0)" }],
      explanation: { en: "Octal `7 = 111b` sets Read (4), Write (2), and Execute (1) bits.", ar: "الرقم الثماني `7` هو `4+2+1` فيمنح الصلاحيات الثلاث كاملة." }
    }
  },

  // 41. unit-networking-http-dns (+3)
  {
    unitId: "unit-networking-http-dns",
    item: {
      id: "EXP-NW-101", domain: "Networking", topic: "Application Layer", subtopic: "Idempotent Methods", difficulty: "medium", type: "concept", slotIndex: 2,
      question: { en: "Which HTTP request method is defined as `Idempotent` (repeating the identical call leaves resource state the same)?", ar: "أي طريقة HTTP تُعد Idempotent (تكرار الطلب نفسه يترك الحالة كما هي بعد المرة الأولى)؟" },
      correct: { en: "PUT (full replacement) and DELETE", ar: "PUT و DELETE" },
      distractors: [{ en: "POST creating fresh records every submit", ar: "POST المنشئة لسجل جديد بكل مرة" }, { en: "Non-cached dynamic random generator", ar: "مولد الأرقام العشوائية غير المخزن" }, { en: "WebSocket arbitrary stream frames", ar: "إطارات بث WebSocket المفتوحة دوماً" }],
      explanation: { en: "Repeating an identical `PUT /users/5` overwrites the same state safely, whereas repeating `POST /orders` duplicates orders.", ar: "تكرار `PUT` يستبدل نفس المورد دون مضاعفة، عكس `POST` التي قد تنشئ نسخاً جديدة." }
    }
  },
  {
    unitId: "unit-networking-http-dns",
    item: {
      id: "EXP-NW-102", domain: "Networking", topic: "Application Layer", subtopic: "JWT Verification", difficulty: "hard", type: "debugging", slotIndex: 3,
      question: { en: "Why is merely Base64-decoding a JWT payload without validating its cryptographic signature a critical security flaw?", ar: "لماذا يمثل مجرد فك تشفير Base64 لـ JWT دون التحقق من التوقيع ثغرة أمنية خطيرة؟" },
      correct: { en: "Attackers can forge roles like `SuperAdmin`", ar: "يستطيع المهاجم تزوير الأدوار بسهولة" },
      distractors: [{ en: "Base64 removes JSON quotation commas", ar: "لأن Base64 تحذف فواصل JSON من الكائن" }, { en: "Signatures automatically compress images", ar: "لأن التوقيع يضغط الصور داخل الواجهة" }, { en: "Browsers strip signatures unless Base32", ar: "لأن المتصفحات تحذف التوقيعات إلا في Base32" }],
      explanation: { en: "JWT headers and payloads are plain Base64Url encoded, not encrypted; only signature verification proves integrity.", ar: "الجزء الأوسط من JWT مقروء بسهولة عبر Base64؛ التحقق من التوقيع السري وحده يثبت عدم تزويره." }
    }
  },
  {
    unitId: "unit-networking-http-dns",
    item: {
      id: "EXP-NW-103", domain: "Networking", topic: "Application Layer", subtopic: "Status 403 vs 401", difficulty: "easy", type: "scenario", slotIndex: 0,
      question: { en: "A logged-in `Learner` tries accessing `/api/admin/roles`. What HTTP status must the server return?", ar: "يحاول متعلم مسجل الدخول الوصول إلى `/api/admin/roles`. ما رمز الحالة الواجب إرجاعه من الخادم؟" },
      correct: { en: "403 Forbidden", ar: "403 Forbidden" },
      distractors: [{ en: "200 OK", ar: "الرمز 200 OK" }, { en: "404 Page Saved", ar: "الرمز 404 Page Saved" }, { en: "301 Redirect Admin", ar: "الرمز 301 Redirect" }],
      explanation: { en: "The user's identity is known (authenticated), yet lacks admin role authorization -> 403 Forbidden.", ar: "المستخدم معروف الهوية لكنه يفتقر لصلاحية الدور الإداري، لذا يرجع 403 Forbidden." }
    }
  },

  // 42. unit-se-design-principles (+2)
  {
    unitId: "unit-se-design-principles",
    item: {
      id: "EXP-SE-101", domain: "Software Engineering", topic: "Design Principles", subtopic: "DIP", difficulty: "medium", type: "concept", slotIndex: 1,
      question: { en: "What does the Dependency Inversion Principle (the 'D' in SOLID) recommend between Application services and Infrastructure?", ar: "بماذا ينصح مبدأ عكس الاعتمادية (DIP في SOLID) بين طبقة التطبيق وطبقة البنية التحتية؟" },
      correct: { en: "Both depend on abstract interfaces cleanly", ar: "الاعتماد على واجهات مجردة" },
      distractors: [{ en: "Services instantiate raw SQL sockets inline", ar: "إنشاء اتصالات SQL مباشرة داخل الخدمة" }, { en: "Infrastructure inherits all UI components", ar: "وراثة البنية التحتية لمكونات الواجهة كلها" }, { en: "Controllers call static global memory", ar: "استدعاء المتحكمات لمتغيرات عامة ساكنة" }],
      explanation: { en: "Defining contracts (`IUserRepository`) in Application lets tests swap databases cleanly without altering business logic.", ar: "وجود واجهة بالمنطق التجاري يفصل التطبيق عن قاعدة البيانات الفعلية ويسهّل الاختبار." }
    }
  },
  {
    unitId: "unit-se-design-principles",
    item: {
      id: "EXP-SE-102", domain: "Software Engineering", topic: "Design Principles", subtopic: "DRY vs Premature", difficulty: "easy", type: "concept", slotIndex: 2,
      question: { en: "When extracting duplicated logic into one shared helper (DRY), why must callers preserve exact edge-case behavior?", ar: "عند دمج منطق مكرر في دالة مساعدة مشتركة (DRY)، لماذا نتحقق من الحالات الحدية؟" },
      correct: { en: "So unification introduces zero behavior bugs", ar: "لضمان ثبات سلوك المستدعين" },
      distractors: [{ en: "So every helper runs in O(2^n) recursion", ar: "لتعمل الدالة بتعقيد أسي O(2^n) دوماً" }, { en: "Because compilers refuse helpers under 50 lines", ar: "لأن المترجم يرفض الدوال القصيرة بالمشروع" }, { en: "So tests skip checking validation errors", ar: "لتجاوز اختبارات التحقق من الأخطاء المتوقعة" }],
      explanation: { en: "Shared helpers eliminate copy-paste drift cleanly as long as input parameters and edge-case guards stay exact.", ar: "الدالة المشتركة تمنع تضارب النسخ لاحقاً مع الحفاظ التام على شروط كل حالة." }
    }
  }
];

export const PART3_QUESTIONS: AssessmentQuestion[] = SPECS.map((s) => buildExpandedQuestion(s.item));

export const PART3_UNIT_MAP: Record<string, string[]> = SPECS.reduce((acc, s) => {
  (acc[s.unitId] = acc[s.unitId] || []).push(s.item.id);
  return acc;
}, {} as Record<string, string[]>);
