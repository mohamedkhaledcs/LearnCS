import type { ExternalReference } from "E:/systems/LearnCS/frontend/lib/curriculum/schema/concept";

export const LAB_GUIDES: Record<string, { en: string; ar: string }> = {
  "cpu-cycle-visualizer": {
    en: "### Guided Lab: Fetch, Decode, Execute Cycle\nInspect how the Program Counter (PC), Instruction Register, Control Unit, ALU, and DRAM bus coordinate step by step.\n\n**Experiments to Run:**\n1. Step forward through `LOAD`, `ADD`, and `STORE` instructions while watching the PC increment.\n2. Notice how register reads operate in a single clock beat whereas RAM lookups stall longer.\n3. Compare Control Unit decoding against ALU arithmetic output.",
    ar: "### المعمل التفاعلي: دورة الجلب وفك التشفير والتنفيذ\nتتبّع تفاعل عداد البرنامج PC ووحدة التحكم ووحدة الحساب والمنطق ALU وذاكرة RAM خطوة بخطوة.\n\n**تجارب مقترحة:**\n1. انتقل عبر تعليمات الجلب والجمع والتخزين مع مراقبة تغير قيمة PC.\n2. لاحظ سرعة قراءة المسجلات مقارنة بتأخير الوصول إلى RAM.\n3. قارن بين فك التشفير المنطقي ونتيجة وحدة ALU."
  },
  "binary-converter-visualizer": {
    en: "### Guided Lab: 8-Bit Binary, Hex & ASCII Encoding\nExperiment directly with bit toggles to master base-2 positional weights (`128, 64, 32, 16, 8, 4, 2, 1`), nibble-to-hex grouping, and ASCII byte encoding.\n\n**Experiments to Run:**\n1. Toggle bits `6` and `0` (`64 + 1 = 65`) and verify uppercase `'A'` in ASCII (`0x41`).\n2. Turn on bit `5` (`+32 -> 97`) to witness how lowercase `'a'` (`0x61`) relates directly to `'A'`.\n3. Observe integer overflow wrap when passing `255` (`11111111`).",
    ar: "### المعمل التفاعلي: التحويل الثنائي والست عشري و ASCII\nجرّب تشغيل وإطفاء البتات لفهم أوزان النظام الثنائي وتجميع كل 4 بتات إلى Hex وترجمة ASCII.\n\n**تجارب مقترحة:**\n1. فعّل البت `6` والبت `0` (`64 + 1 = 65`) لمشاهدة الحرف `'A'` (`0x41`).\n2. أضف البت `5` (`+32`) لتلاحظ تحول `'A'` إلى `'a'` (`0x61`).\n3. اختبر أقصى قيمة لبايت واحد عند `255` (`11111111`)."
  },
  "truth-table-visualizer": {
    en: "### Guided Lab: Boolean Gates & Logical Predicates\nTest combinations of `P` and `Q` inputs across `AND`, `OR`, `XOR`, `NAND`, and `Implication (P -> Q)` truth rows.\n\n**Experiments to Run:**\n1. Verify that `P -> Q` is FALSE strictly when `P = true` and `Q = false`.\n2. Compare `!(P && Q)` vs `!P || !Q` (De Morgan's Law) across all 4 truth combinations.\n3. Note that `P XOR Q` outputs TRUE exclusively when inputs differ.",
    ar: "### المعمل التفاعلي: البوابات المنطقية وجداول الصواب\nاختبر مدخلات `P` و `Q` مع عمليات `AND` و `OR` و `XOR` و `Implication`.\n\n**تجارب مقترحة:**\n1. تحقق من أن العبارة الشرطية `P -> Q` تخطئ فقط عندما `P = true` و `Q = false`.\n2. قارن `!(P && Q)` مع `!P || !Q` لتأكيد قانون دي مورغان.\n3. لاحظ أن `XOR` تكون صائبة فقط عند اختلاف الطرفين."
  },
  "network-packet-visualizer": {
    en: "### Guided Lab: Packet Lifecycle (DNS -> TCP/TLS -> HTTP)\nFollow how application payloads wrap in TCP headers, IP headers, and link frames before routing across hops.\n\n**Experiments to Run:**\n1. Trigger a packet hop and inspect DNS resolution before the TCP 3-way handshake (`SYN`, `SYN-ACK`, `ACK`).\n2. Compare Connection Setup latency vs HTTP payload transfer.\n3. Observe encapsulation layers adding/stripping headers at sender and receiver.",
    ar: "### المعمل التفاعلي: رحلة الحزمة (DNS -> TCP -> HTTP)\nراقب كيف تغلّف بيانات الطلب بطبقات TCP و IP وتنتقل بين المضيف والخادم.\n\n**تجارب مقترحة:**\n1. راقب استعلام DNS قبل بدء مصافحة TCP الثلاثية (`SYN`, `SYN-ACK`, `ACK`).\n2. قارن تأخير تأسيس الاتصال بزمن نقل البيانات الفعلية.\n3. تتبّع إضافة وإزالة الرؤوس عند المرسل والمستقبل."
  },
  "variables-visualizer": {
    en: "### Guided Lab: Memory Slots, Primitive Types & Reassignment\nInspect how variable declarations reserve typed RAM cells and update values cleanly.\n\n**Experiments to Run:**\n1. Step through integer, boolean, and string declarations and watch type labels and addresses.\n2. Compare mutating a regular `let`/mutable variable against locking a `const` invariant.\n3. Watch division vs modulo update variable state step by step.",
    ar: "### المعمل التفاعلي: المتغيرات وأنواع البيانات في الذاكرة\nاستكشف حجز المتغيرات لخانات الذاكرة وتحديث قيمها وتتبع أنواعها.\n\n**تجارب مقترحة:**\n1. تتبّع تعريف الأعداد الصحيحة والقيم المنطقية والنصوص مع عناوينها.\n2. قارن تعديل متغير مرن مع ثبات `const`.\n3. راقب فرق القسمة الصحيحة عن باقي القسمة."
  },
  "loops-visualizer": {
    en: "### Guided Lab: Loop Counter, Break & Continue Execution\nTrace loop initialization, condition check, body step, and post-increment updates line by line.\n\n**Experiments to Run:**\n1. Step through `for` iterations checking when `i < n` stops (`off-by-one` guard).\n2. Compare skipping one pass with `continue` vs exiting early with `break`.\n3. Track accumulator invariants across every iteration.",
    ar: "### المعمل التفاعلي: تتبع الحلقات و break / continue\nتتبّع تهيئة العداد وفحص الشرط وتحديث القيمة خطوة بخطوة.\n\n**تجارب مقترحة:**\n1. راقب لحظة توقف الشرط `i < n` لتجنب أخطاء الحدود.\n2. قارن تخطي دورة واحدة عبر `continue` مع الإيقاف الفوري عبر `break`.\n3. تحقق من صحة المجمع في كل خطوة."
  },
  "array-visualizer": {
    en: "### Guided Lab: Contiguous Array Memory & O(n) Shifting\nLoad your own comma-separated numbers to test O(1) indexed address lookups vs O(n) middle insertions and deletions.\n\n**Experiments to Run:**\n1. Access any index `i` and confirm instant `base + i * 4` O(1) byte arithmetic.\n2. Insert a value at index `0` and watch all trailing elements shift right (`O(n)`).\n3. Run Linear Search on a missing target to observe full array traversal cost.",
    ar: "### المعمل التفاعلي: المصفوفات المتجاورة والإزاحة O(n)\nأدخل أرقامك لاختبار الوصول الفوري O(1) مقابل كلفة الإدراج والحذف O(n).\n\n**تجارب مقترحة:**\n1. اطلب فهرساً عشوائياً لمشاهدة حساب العنوان `base + i * 4` فوراً.\n2. أدرج عنصراً في الفهرس `0` لتلاحظ إزاحة العناصر اللاحقة.\n3. ابحث عن قيمة غير موجودة لملاحظة كلفة المسح الكامل."
  },
  "recursion-visualizer": {
    en: "### Guided Lab: Recursion Tree & Call Stack Frames\nStep forward through recursive invocations down to the Base Case, then watch stack frames unwind back to the caller.\n\n**Experiments to Run:**\n1. Set `n = 4` or `n = 5` and count active frames stacked before hitting `fact(1)`.\n2. Inspect how each popped frame resumes multiplying its return value.\n3. Connect stack depth to auxiliary space `O(n)`.",
    ar: "### المعمل التفاعلي: العودية ومكدس الاستدعاءات Call Stack\nتتبّع دفع إطارات الاستدعاء للأسفل حتى Base Case ثم تفريغ القيم صعوداً.\n\n**تجارب مقترحة:**\n1. جرّب `n = 4` أو `5` وأحصِ الإطارات النشطة عند الوصول لحالة الأساس.\n2. راقب كيف يستكمل كل إطار حسابه فور عودة الابن.\n3. اربط عمق المكدس بتعقيد الذاكرة المساعدة `O(n)`."
  },
  "memory-heap-visualizer": {
    en: "### Guided Lab: Stack Frames, Heap Blocks & Dangling Pointers\nAllocate objects dynamically on the Heap, dereference `*ptr` mutations directly, and witness dangling pointers after premature free.\n\n**Experiments to Run:**\n1. Click **Allocate Heap** to store a dynamic block address in a Stack pointer.\n2. Click **Mutate *ptr** to see indirect in-place Heap modification without copying.\n3. Click **Free Heap** and notice the warning when Stack pointers remain dangling.",
    ar: "### المعمل التفاعلي: مقارنة Stack و Heap والمؤشرات\nاحجز كتلاً ديناميكية في الـ Heap وعدّلها عبر المؤشر `*ptr` واكتشف خطر المؤشر المعلق.\n\n**تجارب مقترحة:**\n1. اضغط حجز Heap لملاحظة العنوان الجديد وتخزينه في Stack.\n2. عدّل القيمة عبر المؤشر لتشاهد التعديل المباشر في نفس العنوان.\n3. حرّر الكتلة ولاحظ تحذير Dangling Pointer."
  },
  "oop-dispatch-visualizer": {
    en: "### Guided Lab: Runtime Polymorphism & VTable Lookup\nInspect how base interfaces route virtual calls dynamically to the concrete subclass override via its virtual method table.\n\n**Experiments to Run:**\n1. Select different concrete subclass instances stored behind the base contract.\n2. Trace how calling `.render()` resolves through `vptr -> vtable` at runtime.\n3. Compare non-virtual static binding vs overridden dynamic binding.",
    ar: "### المعمل التفاعلي: تعدد الأشكال وجدول VTable\nاستكشف كيف يوجه البرنامج الاستدعاءات الافتراضية وقت التشغيل نحو الفئة الفعلية.\n\n**تجارب مقترحة:**\n1. اختر كائنات مشتقة مختلفة خلف واجهة الأساس.\n2. تتبّع مسار التنفيذ عبر مؤشر `vptr` نحو `vtable`.\n3. قارن الربط الثابت بالديناميكي."
  },
  "linked-list-visualizer": {
    en: "### Guided Lab: Non-Contiguous Nodes & Pointer Wiring\nInsert at head (`O(1)`), append at tail, and delete nodes while tracking exact `next` pointer updates across heap addresses.\n\n**Experiments to Run:**\n1. Insert a new node at `head` and confirm zero shifting of subsequent nodes.\n2. Traverse node by node to measure why random index access stays `O(n)`.\n3. Delete an interior node by rewiring `prev.next = target.next`.",
    ar: "### المعمل التفاعلي: القوائم المترابطة وتوجيه المؤشرات\nأضف عقداً في البداية أو الوسط واحذف عقداً مع متابعة تغير روابط `next`.\n\n**تجارب مقترحة:**\n1. أدرج عند الرأس O(1) ولاحظ عدم إزاحة أي عناصر.\n2. تتبّع السير من البداية لفهم سبب بطء البحث الفهرسي O(n).\n3. احذف عقدة وسطى بإعادة ربط المؤشر السابق بالتالي."
  },
  "stack-visualizer": {
    en: "### Guided Lab: LIFO Push, Pop, Peek & Overflow Checks\nPractice Last-In-First-Out discipline interactively with bounded capacity checks.\n\n**Experiments to Run:**\n1. Push multiple items and verify `Peek` only inspects top index `n - 1` (`O(1)`).\n2. Pop items back down until empty to verify Underflow protection.\n3. Push up to capacity to inspect Stack Overflow handling.",
    ar: "### المعمل التفاعلي: مكدس LIFO وعمليات الدفع والسحب\nجرّب عمليات Push و Pop و Peek في سعة محدودة.\n\n**تجارب مقترحة:**\n1. ادفع عناصر متعددة وافحص `Peek` في قمة المكدس.\n2. اسحب حتى يفرغ المكدس لملاحظة حماية Underflow.\n3. املا المكدس لمشاهدة تنبيه Overflow."
  },
  "queue-visualizer": {
    en: "### Guided Lab: FIFO Enqueue & Dequeue Discipline\nWatch items enter the tail and exit the front strictly in arrival order (`First-In, First-Out`).\n\n**Experiments to Run:**\n1. Enqueue 3 jobs and verify the oldest job stays at `front` until dequeued.\n2. Compare Queue FIFO ordering against Stack LIFO ordering for BFS vs DFS.",
    ar: "### المعمل التفاعلي: الرتل FIFO والجدولة بالوصول\nشاهد دخول العناصر من الخلف وخروجها بالترتيب من المقدمة.\n\n**تجارب مقترحة:**\n1. أضف 3 عناصر وتأكد من بقاء الأقدم في المقدمة.\n2. قارن ترتيب الرتل في BFS بترتيب المكدس في DFS."
  },
  "hash-table-visualizer": {
    en: "### Guided Lab: Hash Functions, Buckets & Collision Resolution\nInsert keys directly and inspect modular bucket indices, collision chains, and probing offsets.\n\n**Experiments to Run:**\n1. Insert keys that yield the same `(hash % capacity)` bucket to trigger a collision.\n2. Watch load factor climb as buckets fill.\n3. Trace O(1) average lookup path directly to the hashed bucket.",
    ar: "### المعمل التفاعلي: جداول التجزئة وحل التصادمات\nأدرج مفاتيح وراقب دالة التجزئة ومعالجة التصادم داخل الخانات.\n\n**تجارب مقترحة:**\n1. أضف مفتاحين يقعان بنفس الخانة لمشاهدة التصادم.\n2. راقب ارتفاع معامل التحميل Load Factor.\n3. تتبّع الوصول السريع عبر المفتاح."
  },
  "tree-bst-visualizer": {
    en: "### Guided Lab: Binary Search Tree Invariant & Traversals\nInsert keys dynamically and confirm every node maintains `left < node < right`.\n\n**Experiments to Run:**\n1. Insert balanced keys (e.g. `50, 30, 70, 20, 40`) and inspect search depth.\n2. Now insert ascending keys (`10, 20, 30, 40, 50`) to observe BST skew degradation toward `O(n)`.\n3. Run in-order output confirmation.",
    ar: "### المعمل التفاعلي: شجرة البحث الثنائية BST والتوازن\nأدرج قيماً واختبر شرط الشجرة `يسار < عقدة < يمين`.\n\n**تجارب مقترحة:**\n1. أدرج قيماً متوازنة لمشاهدة عمق البحث اللوغاريتمي.\n2. أدرج قيماً مرتبة تصاعدياً لتلاحظ انحراف الشجرة نحو O(n).\n3. تتبّع الاستعراض الوسطي Sorted Output."
  },
  "graph-traversal-visualizer": {
    en: "### Guided Lab: Comparing BFS Layer Waves vs DFS Depth Paths\nSwitch between Queue-driven Breadth-First Search and Stack/Recursive Depth-First Search on the same graph.\n\n**Experiments to Run:**\n1. Run BFS from root and verify level-by-level hop distances (unweighted shortest path).\n2. Run DFS and watch backtracking when a branch terminates.\n3. Compare visited order between BFS and DFS.",
    ar: "### المعمل التفاعلي: مقارنة البحث العرضي BFS والعمقي DFS\nبدّل بين BFS المعتمد على الرتل و DFS المعتمد على التعمق.\n\n**تجارب مقترحة:**\n1. شغّل BFS لمشاهدة مسح العقد طبقة بطبقة (أقصر مسار بالخطوات).\n2. شغّل DFS لملاحظة التعمق والتراجع عند المسارات المسدودة.\n3. قارن ترتيب الزيارة بينهما."
  },
  "binary-search-visualizer": {
    en: "### Guided Lab: Custom Sorted Array & Halving Probes\nEnter custom sorted arrays and search targets (present and missing) to verify O(log n) interval collapse.\n\n**Experiments to Run:**\n1. Set a custom sorted array like `3, 9, 14, 21, 35, 48, 72` and probe target `35`.\n2. Probe missing target `50` and observe `left > right` clean termination.\n3. Step forward comparing `arr[mid]` against target each beat.",
    ar: "### المعمل التفاعلي: البحث الثنائي بمصفوفات مخصصة\nأدخل مصفوفة مرتبة وقيمة هدف (موجودة أو مفقودة) لتتبع تقليص المجال.\n\n**تجارب مقترحة:**\n1. أدخل مصفوفة مخصصة وجرب البحث عن عنصر موجود.\n2. ابحث عن رقم غير موجود لمراقبة توقف الحلقة عندما `left > right`.\n3. قارن عدد الخطوات الفعلية بقيمة `log2(N)`."
  },
  "sorting-visualizer": {
    en: "### Guided Lab: Custom Arrays, Comparisons & Swap Counters\nLoad custom arrays (reverse-sorted, nearly-sorted, random) and benchmark Bubble Sort vs Selection Sort side by side.\n\n**Experiments to Run:**\n1. Enter a reverse array `90, 70, 50, 30, 10` and compare swap counts between Bubble and Selection Sort.\n2. Enter an already sorted array `10, 20, 30, 40, 50` and observe comparisons vs swaps.\n3. Randomize arrays and verify sorted suffix growth.",
    ar: "### المعمل التفاعلي: مقارنة خوارزميات الفرز بمصفوفات مخصصة\nجرّب مصفوفة معكوسة أو شبه مرتبة وقارن عدد المقارنات والتبديلات.\n\n**تجارب مقترحة:**\n1. أدخل مصفوفة معكوسة وقارن تبديلات Bubble Sort مقابل Selection Sort.\n2. أدخل مصفوفة مرتبة مسبقاً لمراقبة عدد التبديلات.\n3. استخدم التوليد العشوائي لتتبع نمو الجزء المرتب."
  },
  "two-pointers-visualizer": {
    en: "### Guided Lab: Opposite-End Two Pointers Trace\nAdjust target sums and watch `left` and `right` converge in strictly `O(n)` without nested loops.\n\n**Experiments to Run:**\n1. Pick an achievable target and watch `sum > target` move `right--` while `sum < target` moves `left++`.\n2. Pick an unachievable target to see clean termination when `left >= right`.",
    ar: "### المعمل التفاعلي: تقنية المؤشرين Two Pointers\nحرّك `left` و `right` لإيجاد مجموع هدف في زمن O(n) دون حلقات متداخلة.\n\n**تجارب مقترحة:**\n1. جرب هدفاً متاحاً ولاحظ انكماش المؤشرين تبعاً للمجموع.\n2. جرب هدفاً مستحيلاً لملاحظة انتهاء البحث بأمان."
  },
  "dp-table-visualizer": {
    en: "### Guided Lab: 0/1 Knapsack DP Table Construction\nInspect cell-by-cell state transitions `max(skip, take)` filling the bottom-up DP grid.\n\n**Experiments to Run:**\n1. Step forward and trace how `dp[i][w]` picks between inheriting above vs `val + dp[i-1][w - wt]`.\n2. Verify the final bottom-right cell stores the exact optimal profit.",
    ar: "### المعمل التفاعلي: بناء جدول البرمجة الديناميكية 0/1 Knapsack\nتتبّع حساب الخلايا خطوة بخطوة ومقارنة خيار الترك مع خيار الأخذ.\n\n**تجارب مقترحة:**\n1. شاهد قراءة الحالة السابقة عند احتساب `dp[i][w]`.\n2. تحقق من أن الخلية الأخيرة تحمل القيمة المثلى النهائية."
  },
  "sql-query-visualizer": {
    en: "### Guided Lab: Interactive SQL Filter, Join & Sort Execution\nUse the SQL Visualizer and the interactive SQL Query Sandbox above to experiment directly with `SELECT`, `WHERE`, `ORDER BY`, `JOIN`, and aggregates.\n\n**Experiments to Run:**\n1. Filter rows dynamically (`WHERE xp >= 1000`) and inspect surviving output rows.\n2. Switch sort order and compare result count before/after grouping or limiting.",
    ar: "### المعمل التفاعلي: تنفيذ استعلامات SQL وتصفيتها\nاستخدم المختبر لتجربة شروط `WHERE` والربط والترتيب ومشاهدة الصفوف الناتجة.\n\n**تجارب مقترحة:**\n1. جرب تصفية الصفوف بشرط رقمي وشاهد النتائج.\n2. قارن الترتيب والتجميع في الاستعلامات."
  },
  "os-scheduler-visualizer": {
    en: "### Guided Lab: CPU Scheduling Gantt Chart & Time Quantum\nCompare FCFS, SJF, and Round Robin time slices over process burst arrivals.\n\n**Experiments to Run:**\n1. Run FCFS with one giant process arriving ahead of short jobs to witness the Convoy Effect.\n2. Switch to Round Robin and vary quantum `q` to balance fairness vs context switching.",
    ar: "### المعمل التفاعلي: مجدول المعالج ومخطط Gantt\nقارن FCFS و SJF و Round Robin عبر شرائح زمنية مختلفة.\n\n**تجارب مقترحة:**\n1. شغّل FCFS مع مهمة طويلة أولاً لمشاهدة أثر القافلة.\n2. بدّل إلى Round Robin واختبر أثر تغيير الشريحة الزمنية."
  }
};

const REF = (
  title: string,
  url: string,
  type: ExternalReference["type"],
  source: string,
  category: string,
  enDesc: string,
  arDesc: string
): ExternalReference => ({
  title,
  url,
  type,
  source,
  category,
  language: "en",
  description: { en: enDesc, ar: arDesc }
});

export const EXTRA_REFS_BY_UNIT: Record<string, ExternalReference[]> = {
  "unit-computer-basics-foundations": [
    REF("MDN: How the Web & Operating Hardware Interact", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works", "documentation", "MDN", "Systems", "Client/server hardware execution overview.", "نظرة عامة على تنفيذ الطلبات والعتاد.")
  ],
  "unit-data-representation-foundations": [
    REF("MDN: Bitwise Representation & Operators", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators", "documentation", "MDN", "Encoding", "JavaScript number encoding and bitwise representation reference.", "مرجع تمثيل الأرقام والعمليات البتية.")
  ],
  "unit-binary-arithmetic-encoding": [
    REF("cppreference: Fundamental Types & Bit Representation", "https://en.cppreference.com/w/cpp/language/types", "documentation", "cppreference", "Integers", "Signed Two's Complement width guarantees in C++.", "مرجع تمثيل الأعداد الموقعة في C++."),
    REF("roadmap.sh: Computer Science Binary & Architecture", "https://roadmap.sh/computer-science", "roadmap", "roadmap.sh", "CS Foundations", "How binary arithmetic connects to ALU hardware and CS core.", "خارطة ربط المنطق الثنائي بمعمارية المعالج.")
  ],
  "unit-internet-web-basics": [
    REF("MDN: Overview of HTTP Messages & Headers", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview", "documentation", "MDN", "HTTP", "HTTP client-server communication architecture and stateless requests.", "مرجع بنية بروتوكول HTTP والطلبات.")
  ],
  "unit-programming-concepts-foundations": [
    REF("Harvard CS50: Introduction to Computer Science", "https://cs50.harvard.edu/x/", "article", "Harvard CS50", "Foundations", "World-class programming and compilation foundations.", "مقدمة هارفارد الشاملة لعلوم الحاسوب.")
  ],
  "unit-variables-foundations": [
    REF("MDN: Storing Information with Variables", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables", "documentation", "MDN", "Programming", "Variable naming, types, const correctness, and expressions.", "أساسيات المتغيرات والأنواع والثوابت.")
  ],
  "unit-conditions-foundations": [
    REF("Python Docs: Control Flow (`if/elif/else`)", "https://docs.python.org/3/tutorial/controlflow.html", "documentation", "Python Docs", "Control Flow", "Conditional branching and clean boolean predicate style.", "مرجع التفرع الشرطي والمنطق."),
    REF("LearnCpp: Operators & Precedence", "https://www.learncpp.com/cpp-tutorial/introduction-to-fundamental-data-types/", "documentation", "LearnCpp", "Language Core", "Precision rules and boolean conversion behaviors.", "دليل قواعد التحويل والعمليات الشرطية.")
  ],
  "unit-loops-foundations": [
    REF("Python Docs: Loop Control & Iteration Tools", "https://docs.python.org/3/tutorial/controlflow.html", "documentation", "Python Docs", "Loops", "Range iteration, break, continue, and loop clauses.", "توثيق حلقات التكرار والتحكم بها.")
  ],
  "unit-functions-foundations": [
    REF("MDN: Functions Reusable Code Blocks Guide", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions", "documentation", "MDN", "Functions", "Lexical scope, closures, parameters, and call stack.", "مرجع الدوال والنطاق وتمرير المعاملات."),
    REF("cppreference: Functions & Parameter Passing", "https://en.cppreference.com/w/cpp/language/functions", "documentation", "cppreference", "Functions", "Value vs reference parameters, signatures, and return semantics.", "مرجع التمرير بالقيمة والمرجع في C++.")
  ],
  "unit-memory-foundations": [
    REF("OSTEP: Address Spaces & Memory API", "https://pages.cs.wisc.edu/~remzi/OSTEP/", "documentation", "OSTEP", "Memory", "Stack vs Heap segments, malloc/free, and address isolation.", "فصول إدارة الذاكرة وتخصيص Heap و Stack."),
    REF("LearnCpp: Dynamic Memory & Pointers", "https://www.learncpp.com/cpp-tutorial/introduction-to-fundamental-data-types/", "documentation", "LearnCpp", "Systems", "Hands-on fundamentals avoiding dangling pointers and leaks.", "مبادئ تجنب أخطاء المؤشرات والتسرب.")
  ],
  "unit-arrays-foundations": [
    REF("Python Docs: Lists & Sequence Data Structures", "https://docs.python.org/3/tutorial/datastructures.html", "documentation", "Python Docs", "Data Structures", "List slicing, contiguous semantics, and mutation costs.", "توثيق القوائم والمصفوفات وتكلفة العمليات.")
  ],
  "unit-array-cp-patterns": [
    REF("USACO Guide: Prefix Sums & Range Queries", "https://usaco.guide/silver/prefix-sums", "article", "USACO Guide", "CP Patterns", "1D and 2D prefix sum templates and worked contest problems.", "دليل USACO للمجاميع التراكمية والتمارين."),
    REF("CSES Problem Set: Range & Subarray Benchmarks", "https://cses.fi/problemset/", "cp_platform", "CSES", "Practice", "Curated classic benchmark problems for prefix and difference arrays.", "مجموعة مسائل CSES القياسية للتدريب.")
  ],
  "unit-recursion-foundations": [
    REF("USACO Guide: Complete Search & Backtracking", "https://usaco.guide/bronze/intro-greedy", "article", "USACO Guide", "Algorithms", "State exploration, base cases, and pruning strategies.", "أساسيات البحث الكامل والتراجع."),
    REF("CP-Algorithms: Backtracking & Combinatorial Generation", "https://cp-algorithms.com/", "cp_platform", "CP-Algorithms", "Algorithms", "Mathematical recursion trees and state generation techniques.", "تقنيات العودية وبناء الحالات.")
  ],
  "unit-oop-classes-encapsulation": [
    REF("Refactoring Guru: Encapsulation & Clean Classes", "https://refactoring.guru/design-patterns", "article", "Refactoring Guru", "Architecture", "Modeling real invariants inside cohesive objects.", "مبادئ التغليف وتصميم الفئات المتماسكة."),
    REF("roadmap.sh: Software Architecture & Design", "https://roadmap.sh/software-architect", "roadmap", "roadmap.sh", "OOP & Design", "From class design up through domain-driven software layers.", "خارطة المعمارية وتصميم البرمجيات.")
  ],
  "unit-oop-inheritance-polymorphism": [
    REF("Refactoring Guru: Strategy & Factory Patterns", "https://refactoring.guru/design-patterns/factory-method", "article", "Refactoring Guru", "Design Patterns", "Applying runtime polymorphism safely without inheritance bloat.", "تطبيق تعدد الأشكال وأنماط المصنع بأمان."),
    REF("Microsoft Learn: Object-Oriented Fundamentals", "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/object-oriented/", "documentation", "Microsoft Learn", "OOP", "Interfaces, inheritance hierarchies, and composition tradeoffs.", "الواجهات والوراثة والتركيب في OOP.")
  ],
  "unit-dm-propositional-logic": [
    REF("MIT OCW: Logic & Proof Fundamentals", "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/", "documentation", "MIT OCW", "Discrete Math", "Complete MIT notes on propositions, quantifiers, and equivalence.", "ملاحظات MIT حول المنطق والمكممات والبراهين."),
    REF("MDN: Logical Operators & Truth Evaluation", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators", "documentation", "MDN", "Logic", "De Morgan simplification and short-circuit boolean truth rules.", "تبسيط العبارات المنطقية والتقييم المختصر.")
  ],
  "unit-dm-sets-relations-proofs": [
    REF("roadmap.sh: Discrete Mathematics Core", "https://roadmap.sh/computer-science", "roadmap", "roadmap.sh", "Discrete Math", "Sets, relations, graphs, and inductive proofs in CS.", "المجموعات والعلاقات والاستقراء الرياضي."),
    REF("CSES Problem Set: Proof-Driven Combinatorics", "https://cses.fi/problemset/", "cp_platform", "CSES", "Practice", "Algorithmic exercises built on bijections and induction.", "تمارين عملية تعتمد على البراهين والعلاقات.")
  ],
  "unit-dm-counting-recurrences": [
    REF("USACO Guide: Combinatorics & Modular Math", "https://usaco.guide/gold/divisibility", "article", "USACO Guide", "Combinatorics", "Counting combinations mod prime and solving recurrences cleanly.", "تطبيقات التوافيق والعلاقات التكرارية."),
    REF("MIT OCW: Counting Rules & Recurrences", "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/", "documentation", "MIT OCW", "Math", "Permutations, generating recurrences, and Master Theorem.", "التباديل والتوافيق ونظرية ماستر.")
  ],
  "unit-linked-lists-foundations": [
    REF("VisuAlgo: Linked List Interactive Visualizer", "https://visualgo.net/en/list", "practice_problem", "VisuAlgo", "Practice", "Interactive linked list node insertion, deletion, and pointer reversal labs.", "محاكي تفاعلي لإدراج وحذف العقد وعكس المؤشرات في القوائم المترابطة."),
    REF("VisuAlgo: Linked List, Stack & Queue Animations", "https://visualgo.net/en/sorting", "article", "VisuAlgo", "Visualizers", "Interactive data structure step visualizations.", "رسوم تفاعلية لهياكل البيانات.")
  ],
  "unit-stacks-queues-foundations": [
    REF("cppreference: std::stack Container Adapter", "https://en.cppreference.com/w/cpp/container/stack", "documentation", "cppreference", "STL", "LIFO push/pop guarantees and underlying deque container.", "مرجع المكدس std::stack القياسي.")
  ],
  "unit-hash-tables-foundations": [
    REF("cppreference: std::unordered_map Internals", "https://en.cppreference.com/w/cpp/container/unordered_map", "documentation", "cppreference", "Hash Maps", "Buckets, load factor, rehashing, and custom key hashes.", "تفاصيل الخانات ومعامل التحميل وإعادة التجزئة."),
    REF("cppreference: std::unordered_set Reference", "https://en.cppreference.com/w/cpp/container/unordered_set", "documentation", "cppreference", "Hash Sets", "O(1) expected set membership and collision tradeoffs.", "مرجع مجموعات التجزئة الفريدة.")
  ],
  "unit-trees-foundations": [
    REF("VisuAlgo: Binary Search Tree & AVL Rotations", "https://visualgo.net/en/bst", "article", "VisuAlgo", "Trees", "Step-by-step BST insert, delete, and AVL balancing rotations.", "تمثيل بصري لعمليات BST والتوازن."),
    REF("CP-Algorithms: Randomized Balanced Trees", "https://cp-algorithms.com/data_structures/treap.html", "cp_platform", "CP-Algorithms", "Trees", "Balanced tree invariants and logarithmic height bounds.", "خوارزميات الأشجار المتوازنة.")
  ],
  "unit-graphs-foundations": [
    REF("USACO Guide: Depth-First Search & Components", "https://usaco.guide/silver/dfs", "article", "USACO Guide", "Graphs", "Graph representations, connected components, and bipartiteness.", "تمثيل الرسوم البيانية والمكونات المترابطة."),
    REF("VisuAlgo: Graph Data Structures & Traversals", "https://visualgo.net/en/graphds", "article", "VisuAlgo", "Visualizers", "Adjacency matrix vs list interactive comparisons.", "مقارنة تفاعلية بين تمثيلات الرسم البياني.")
  ],
  "unit-complexity-foundations": [
    REF("CS50: Asymptotic Complexity Notes", "https://cs50.harvard.edu/x/", "article", "Harvard CS50", "Algorithms", "Comparing O(1), O(log n), O(n), O(n log n), and O(n^2).", "مقارنة مراتب التعقيد الزمني والمكاني."),
    REF("CP-Algorithms: Algorithmic Foundations", "https://cp-algorithms.com/", "cp_platform", "CP-Algorithms", "Algorithms", "Practical operation counting and constraint budgeting.", "تقدير التعقيد وتحديد قيود الإدخال.")
  ],
  "unit-linear-search-foundations": [
    REF("roadmap.sh: Searching & Data Structures Roadmap", "https://roadmap.sh/datastructures-and-algorithms", "roadmap", "roadmap.sh", "Algorithms", "Where linear scan fits before sorting or hashing.", "موقع البحث الخطي مقارنة بالفرز والتجزئة."),
    REF("MDN: Array Lookup & Iteration Semantics", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration", "documentation", "MDN", "Programming", "Clean iteration patterns with early loop exit.", "أنماط التكرار والخروج المبكر عند المطابقة.")
  ],
  "unit-binary-search-foundations": [
    REF("USACO Guide: Binary Search Variants", "https://usaco.guide/silver/binary-search", "article", "USACO Guide", "Binary Search", "Lower bound, monotonic predicates, and zero off-by-one bugs.", "متغيرات البحث الثنائي الخالية من الأخطاء.")
  ],
  "unit-binary-search-on-answer": [
    REF("CSES Problem Set: Factory Machines & Array Division", "https://cses.fi/problemset/", "cp_platform", "CSES", "Practice", "Canonical parametric binary search on answer tasks.", "مسائل تدريبية كلاسيكية على البحث على الإجابة.")
  ],
  "unit-sorting-foundations": [
    REF("VisuAlgo: Sorting Algorithms Animated Lab", "https://visualgo.net/en/sorting", "article", "VisuAlgo", "Sorting", "Compare Bubble, Selection, Insertion, Merge, Quick, and Radix.", "محاكاة مرئية لجميع خوارزميات الفرز."),
    REF("roadmap.sh: Divide & Conquer Sorting Track", "https://roadmap.sh/datastructures-and-algorithms", "roadmap", "roadmap.sh", "Algorithms", "Comparison lower bounds and stability tradeoffs.", "الحد الأدنى للمقارنات وثبات الفرز.")
  ],
  "unit-greedy-foundations": [
    REF("USACO Guide: Classical Greedy Algorithms", "https://usaco.guide/bronze/intro-greedy", "article", "USACO Guide", "Greedy", "Interval scheduling, sorting tricks, and counterexample checks.", "جدولة الفترات واختبار الجشع بالأمثلة المضادة."),
    REF("CSES Problem Set: Movie Festival & Tasks", "https://cses.fi/problemset/", "cp_platform", "CSES", "Practice", "Classic interval and deadline greedy tasks.", "مسائل كلاسيكية على الخوارزميات الجشعة.")
  ],
  "unit-dp-foundations": [
    REF("USACO Guide: Introduction to Dynamic Programming", "https://usaco.guide/gold/intro-dp", "article", "USACO Guide", "DP", "Transition formulation, memoization, and bottom-up loops.", "تصميم الحالة والانتقال في البرمجة الديناميكية."),
    REF("CP-Algorithms: Longest Increasing Subsequence & DP", "https://cp-algorithms.com/sequences/longest_increasing_subsequence.html", "cp_platform", "CP-Algorithms", "DP", "Classic sequence DP optimization cleanly derived.", "تطبيقات السلاسل في البرمجة الديناميكية.")
  ],
  "unit-graph-traversal-bfs-dfs": [
    REF("USACO Guide: Shortest Paths (Dijkstra / Bellman-Ford)", "https://usaco.guide/gold/shortest-paths", "article", "USACO Guide", "Graphs", "Priority-queue Dijkstra templates and edge relaxation.", "قوالب ديكسترا وأقصر مسار عملياً."),
    REF("CP-Algorithms: Kruskal Minimum Spanning Tree", "https://cp-algorithms.com/graph/mst_kruskal.html", "cp_platform", "CP-Algorithms", "MST", "Sorting edges with Disjoint Set Union cycles checks.", "خوارزمية كروسكال لبناء شجرة الامتداد الصغرى.")
  ],
  "unit-cp-introduction": [
    REF("CP-Algorithms: Asymptotics & Fast Techniques", "https://cp-algorithms.com/", "cp_platform", "CP-Algorithms", "CP", "Core competitive algorithms reference.", "المرجع الأشمل لخوارزميات المسابقات."),
    REF("CSES Problem Set: Introductory Track", "https://cses.fi/problemset/", "cp_platform", "CSES", "CP Practice", "Essential warmup problems checking fast I/O and bounds.", "مجموعة المسائل التمهيدية لاختبار السرعة والدقة.")
  ],
  "unit-two-pointers-foundations": [
    REF("USACO Guide: Two Pointers Patterns", "https://usaco.guide/silver/two-pointers", "article", "USACO Guide", "Two Pointers", "2-Sum, subarrays, and monotonic sliding window proofs.", "تطبيقات المؤشرين والنافذة المنزلقة."),
    REF("CSES Problem Set: Sum of Two Values & Subarrays", "https://cses.fi/problemset/", "cp_platform", "CSES", "Practice", "Canonical O(N) pointer benchmarks.", "مسائل تدريبية لتقنية المؤشرين.")
  ],
  "unit-cp-number-theory": [
    REF("CP-Algorithms: Euclidean Algorithm & Extended GCD", "https://cp-algorithms.com/algebra/euclid-algorithm.html", "cp_platform", "CP-Algorithms", "Number Theory", "GCD, Bezout coefficients, and modular inverses.", "خوارزمية إقليدس وحساب القاسم المشترك."),
    REF("CP-Algorithms: Binary Exponentiation", "https://cp-algorithms.com/algebra/binary-exp.html", "cp_platform", "CP-Algorithms", "Number Theory", "O(log b) modular power tricks.", "حساب الأس السريع مع باقي القسمة.")
  ],
  "unit-cp-range-queries-graphs": [
    REF("CP-Algorithms: Fenwick Binary Indexed Tree", "https://cp-algorithms.com/data_structures/fenwick.html", "cp_platform", "CP-Algorithms", "Range Queries", "Compact BIT prefix query/update templates.", "قوالب شجرة فينويك لاستعلامات النطاق."),
    REF("CP-Algorithms: Disjoint Set Union & KMP", "https://cp-algorithms.com/data_structures/disjoint_set_union.html", "cp_platform", "CP-Algorithms", "DSU", "Path compression and union by size/rank.", "هيكل المجموعات المنفصلة وضغط المسارات.")
  ],
  "unit-db-relational-foundations": [
    REF("PostgreSQL Docs: Table Expressions & Joins", "https://www.postgresql.org/docs/current/queries-table-expressions.html", "documentation", "PostgreSQL Docs", "Databases", "FROM clauses, table relations, and foreign keys.", "بنية الجداول والعلاقات في PostgreSQL."),
    REF("SQLBolt: Interactive Relational Table Lessons", "https://sqlbolt.com/", "article", "SQLBolt", "Interactive SQL", "Guided hands-on relational schema and query drills.", "دروس تفاعلية لتعلم قواعد البيانات.")
  ],
  "unit-sql-fundamentals": [
    REF("SQLBolt: Filtering, Grouping & Aggregations", "https://sqlbolt.com/", "article", "SQLBolt", "Interactive SQL", "Interactive exercises on WHERE, ORDER BY, COUNT, and HAVING.", "تمارين عملية على SELECT و WHERE و التجميع.")
  ],
  "unit-sql-joins-aggregations": [
    REF("PostgreSQL Docs: Joins Between Tables", "https://www.postgresql.org/docs/current/tutorial-join.html", "documentation", "PostgreSQL Docs", "SQL Joins", "INNER, LEFT, OUTER, and self-join examples clearly illustrated.", "شرح عملي لأنواع الربط بين الجداول."),
    REF("SQLBolt: Multi-Table Joins & Aggregates", "https://sqlbolt.com/", "article", "SQLBolt", "Practice", "Interactive join drills preventing unmatched drops and duplication.", "تمارين ربط الجداول المتعددة.")
  ],
  "unit-db-normalization-foundations": [
    REF("PostgreSQL Docs: Schema Constraints & Integrity", "https://www.postgresql.org/docs/current/ddl-constraints.html", "documentation", "PostgreSQL Docs", "Design", "Enforcing normalized data integrity cleanly via constraints.", "حماية سلامة البيانات المطبعة بالقيود."),
    REF("SQLBolt: Relational Modeling Foundations", "https://sqlbolt.com/", "article", "SQLBolt", "Databases", "Practical schema normalization and multi-table design.", "ممارسات تصميم المخططات العلائقية.")
  ],
  "unit-db-indexing-foundations": [
    REF("PostgreSQL Docs: Performance Tips & EXPLAIN", "https://www.postgresql.org/docs/current/performance-tips.html", "documentation", "PostgreSQL Docs", "Performance", "Reading EXPLAIN ANALYZE plans and avoiding sequential table scans.", "قراءة خطط الأداء EXPLAIN وتحسين الفهارس."),
    REF("roadmap.sh: PostgreSQL Indexing Deep Dive", "https://roadmap.sh/postgresql-dba", "roadmap", "roadmap.sh", "DBA", "B-Tree vs Hash vs GIN indexing tradeoffs.", "مقارنة أنواع الفهارس واختيار الأنسب.")
  ],
  "unit-db-acid-transactions": [
    REF("PostgreSQL Docs: Concurrency Control & Performance", "https://www.postgresql.org/docs/current/performance-tips.html", "documentation", "PostgreSQL Docs", "Transactions", "Keeping transactions short and avoiding lock contention.", "تقليل التنافس على الأقفال وقصر المعاملات."),
    REF("roadmap.sh: ACID & Transactions Roadmap", "https://roadmap.sh/postgresql-dba", "roadmap", "roadmap.sh", "Databases", "Atomicity, WAL durability, MVCC, and isolation tradeoffs.", "خارطة ACID ومستويات العزل و MVCC.")
  ],
  "unit-os-processes-threads": [
    REF("cppreference: Mutual Exclusion & Locks (std::mutex)", "https://en.cppreference.com/w/cpp/thread/mutex", "documentation", "cppreference", "Concurrency", "Scoped lock guards, data races, and deadlock avoidance.", "إدارة الأقفال ومنع السباق والتوقف المميت."),
    REF("roadmap.sh: Concurrency & Threads in CS", "https://roadmap.sh/computer-science", "roadmap", "roadmap.sh", "OS", "Process isolation vs thread shared heap concurrency.", "مقارنة العمليات والخيوط والتزامن.")
  ],
  "unit-os-cpu-scheduling": [
    REF("roadmap.sh: Operating Systems Scheduling Guide", "https://roadmap.sh/computer-science", "roadmap", "roadmap.sh", "OS", "Context switch cost, fairness, turnaround, and aging.", "تكلفة تبديل السياق والعدالة وتفادي الحرمان."),
    REF("CS50: Systems & Resource Scheduling Context", "https://cs50.harvard.edu/x/", "article", "Harvard CS50", "Systems", "How operating systems share limited CPU cores safely.", "توزيع أنوية المعالج بكفاءة وعدالة.")
  ],
  "unit-os-virtual-memory": [
    REF("roadmap.sh: Virtual Memory & File Systems", "https://roadmap.sh/computer-science", "roadmap", "roadmap.sh", "OS", "MMU translation, page replacement, and Unix inodes.", "ترجمة العناوين الافتراضية ونظم الملفات."),
    REF("CS50: Memory Layout & Systems Foundations", "https://cs50.harvard.edu/x/", "article", "Harvard CS50", "Systems", "Connecting pointers cleanly to virtual address translation.", "ربط المؤشرات بمفاهيم الذاكرة الافتراضية.")
  ],
  "unit-networking-protocols": [
    REF("Beej's Guide to Network Programming", "https://beej.us/guide/bgnet/", "documentation", "Beej's Guide", "Sockets & TCP/IP", "Legendary practical guide to TCP/UDP sockets and byte streams.", "المرجع العملي الأشهر لبرمجة الشبكات و TCP/UDP."),
    REF("MDN: How Networks Transport Web Traffic", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works", "documentation", "MDN", "Networking", "How TCP streams, IP packets, and DNS link clients and APIs.", "نقل حزم الشبكة واتصالات TCP و DNS.")
  ],
  "unit-networking-http-dns": [
    REF("MDN: HTTP Request Methods Guide", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods", "documentation", "MDN", "HTTP", "Idempotency and semantics across GET, POST, PUT, PATCH, DELETE.", "تفاصيل أفعال HTTP وخاصية Idempotency."),
    REF("MDN: HTTP Response Status Codes Reference", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status", "documentation", "MDN", "HTTP", "Official semantics for 2xx, 3xx, 401, 403, 404, and 5xx.", "مرجع رموز استجابة HTTP القياسية.")
  ],
  "unit-se-design-principles": [
    REF("Refactoring Guru: Strategy & SOLID Architecture", "https://refactoring.guru/design-patterns/strategy", "article", "Refactoring Guru", "Design Patterns", "Replacing brittle conditionals with clean interchangeable strategies.", "تطبيق نمط الاستراتيجية لتبسيط الكود."),
    REF("Refactoring Guru: Observer Design Pattern", "https://refactoring.guru/design-patterns/observer", "article", "Refactoring Guru", "Design Patterns", "Event-driven publish/subscribe decoupling cleanly explained.", "فصل المكونات باستخدام نمط Observer.")
  ],
  "unit-se-testing-methodologies": [
    REF("Martin Fowler: The Practical Test Pyramid", "https://martinfowler.com/articles/practical-test-pyramid.html", "article", "Martin Fowler", "Testing Architecture", "Balancing unit, integration, and end-to-end tests cleanly.", "موازنة هرم الاختبارات من الوحدات للتكامل."),
    REF("Learn Git Branching: Interactive Sandbox", "https://learngitbranching.js.org/", "article", "LearnGitBranching", "Interactive Git", "Visual interactive challenges mastering branches, rebase, and merges.", "مختبر تفاعلي لإتقان فروع ودمج Git.")
  ]
};
