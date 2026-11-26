import { buildExpandedQuestion, type CompactQuestionSpec } from "./helpers";
import type { AssessmentQuestion } from "@/lib/assessment/schema";

const SPECS: { unitId: string; item: CompactQuestionSpec }[] = [
  // 14. unit-arrays-foundations (+5)
  {
    unitId: "unit-arrays-foundations",
    item: {
      id: "EXP-ARR-101", domain: "Data Structures", topic: "Arrays", subtopic: "Memory Addressing", difficulty: "easy", type: "concept", slotIndex: 2,
      question: { en: "Given 4-byte integers starting at `0x1000`, what address holds `arr[6]`?", ar: "إذا بدأ تخزين مصفوفة أعداد 4-بايت عند `0x1000`، ما عنوان `arr[6]` (العشري: 4096 + 24)؟" },
      correct: { en: "0x1018", ar: "0x1018" },
      distractors: [{ en: "0x1006", ar: "العنوان 0x1006" }, { en: "0x1014", ar: "العنوان 0x1014" }, { en: "0x1024", ar: "العنوان 0x1024" }],
      explanation: { en: "`6 * 4 = 24` decimal bytes (`0x18`), giving `0x1000 + 0x18 = 0x1018` in O(1).", ar: "نضرب الفهرس `6` في `4` بايت لنحصل على `24` (`0x18`) فيصبح العنوان `0x1018`." }
    }
  },
  {
    unitId: "unit-arrays-foundations",
    item: {
      id: "EXP-ARR-102", domain: "Data Structures", topic: "Arrays", subtopic: "Dynamic Array Growth", difficulty: "medium", type: "complexity", slotIndex: 3,
      question: { en: "Why is `vector.push_back()` O(1) amortized when doubling capacity upon resizing?", ar: "لماذا يكون تعقيد `push_back()` في المصفوفة الديناميكية O(1) متوسطاً (Amortized) عند مضاعفة السعة؟" },
      correct: { en: "Expensive copies happen after doubling gaps", ar: "النسخ يقع على فترات متباعدة" },
      distractors: [{ en: "Operating systems forbid dynamic arrays growing", ar: "نظام التشغيل يمنع توسع المصفوفات تلقائياً" }, { en: "Appending inserts at index 0 always", ar: "الإضافة تتم في الفهرس صفر دائماً بكل عملية" }, { en: "Doubling skips copying existing bytes cleanly", ar: "المضاعفة لا تنسخ العناصر القديمة نهائياً" }],
      explanation: { en: "Copying costs `1 + 2 + 4 + ... + n < 2n` over `n` pushes, averaging `< 2` copies per push.", ar: "مجموع عمليات النسخ لا يتجاوز `2n` عبر `n` إضافة فيصبح المتوسط O(1) لكل عملية." }
    }
  },
  {
    unitId: "unit-arrays-foundations",
    item: {
      id: "EXP-ARR-103", domain: "Data Structures", topic: "Arrays", subtopic: "Front Insertion", difficulty: "easy", type: "complexity", slotIndex: 0,
      question: { en: "What is the worst-case time complexity of inserting at index `0` of an n-element array?", ar: "ما التعقيد الزمني في أسوأ حالة لإدراج عنصر في الفهرس `0` بمصفوفة طولها `n`؟" },
      correct: { en: "O(n)", ar: "O(n)" },
      distractors: [{ en: "O(1)", ar: "ثابت O(1)" }, { en: "O(log n)", ar: "لوغاريتمي O(log n)" }, { en: "O(n^2)", ar: "تربيعي O(n^2)" }],
      explanation: { en: "All `n` existing elements must shift one position right to free slot 0.", ar: "يلزم إزاحة كافة العناصر الـ `n` خانة واحدة لليمين لإفراغ الموقع الأول." }
    }
  },
  {
    unitId: "unit-arrays-foundations",
    item: {
      id: "EXP-ARR-104", domain: "Data Structures", topic: "Arrays", subtopic: "Strings", difficulty: "medium", type: "debugging", slotIndex: 1,
      codeSnippet: `let out = "";\nfor (let i = 0; i < n; i++) out += "x";`,
      codeLanguage: "javascript",
      question: { en: "In languages with immutable strings, why can repeated `+=` in a large loop degrade toward O(n^2)?", ar: "في اللغات ذات النصوص غير القابلة للتعديل، لماذا قد يتباطأ `+=` داخل حلقة نحو O(n^2)؟" },
      correct: { en: "Reallocates and copies prefixes each pass", ar: "يعيد نسخ النص بكل تكرار" },
      distractors: [{ en: "Strings only hold digits in RAM loops", ar: "النصوص تقبل الأرقام فقط داخل الحلقات" }, { en: "Compiler hashes strings onto HTTP packets", ar: "المترجم يحول النص لرزمة شبكة بكل دورة" }, { en: "`out +=` shifts integers 16 bits left", ar: "العامل `+=` يزيح الأعداد 16 بت يساراً" }],
      explanation: { en: "Concatenating immutable strings allocates fresh strings of length `1 + 2 + ... + n` unless buffered.", ar: "إنشاء نص جديد بكل تكرار ينسخ السلسلة التراكمية؛ يُنصح بتجميع القطع ثم `join()`." }
    }
  },
  {
    unitId: "unit-arrays-foundations",
    item: {
      id: "EXP-ARR-105", domain: "Data Structures", topic: "Arrays", subtopic: "2D Layout", difficulty: "medium", type: "concept", slotIndex: 2,
      question: { en: "Why is iterating `matrix[row][col]` row-by-row faster in C/C++ than scanning column-by-column?", ar: "لماذا يسرّع التنقل صفاً بصف `matrix[row][col]` مقارنة بالتنقل عموداً بعمود في C/C++؟" },
      correct: { en: "Matches contiguous row-major cache layout", ar: "يطابق تجاور الصفوف في Cache" },
      distractors: [{ en: "Columns skip 64-bit integer signs cleanly", ar: "الأعمدة تتجاوز إشارة الأعداد السالبة تلقائياً" }, { en: "Rows run on multi-threaded network ports", ar: "الصفوف تعمل على منافذ شبكة متعددة دوماً" }, { en: "Column access bypasses ALU registers", ar: "قراءة الأعمدة تتجاوز مسجلات المعالج تماماً" }],
      explanation: { en: "C/C++ arrays store rows sequentially in RAM, making consecutive column hops stride sequentially across cache lines.", ar: "المصفوفات ثنائية الأبعاد تُخزن صفاً تلو صف، لذا تتبع الصفوف يحقق أقصى استفادة من Cache." }
    }
  },

  // 15. unit-array-cp-patterns (+5)
  {
    unitId: "unit-array-cp-patterns",
    item: {
      id: "EXP-CPARR-101", domain: "Competitive Programming", topic: "Arrays", subtopic: "Prefix Sums", difficulty: "easy", type: "code-output", slotIndex: 3,
      codeSnippet: `// arr = [3, 1, 4, 1, 5], pref = [0, 3, 4, 8, 9, 14]\n// Query 0-based inclusive sum [l=1..r=3]`,
      question: { en: "Using 1-based prefix array `pref = [0, 3, 4, 8, 9, 14]`, what formula yields inclusive sum `a[1..3]`?", ar: "باستخدام مصفوفة المجاميع التراكمية `pref`، ما العبارة التي تحسب مجموع النطاق `[1..3]` (0-indexed)؟" },
      correct: { en: "pref[4] - pref[1] (equals 6)", ar: "pref[4] - pref[1] (= 6)" },
      distractors: [{ en: "pref[3] - pref[1] (equals 5)", ar: "طرح pref[3] - pref[1] (= 5)" }, { en: "pref[4] - pref[0] (equals 9)", ar: "طرح pref[4] - pref[0] (= 9)" }, { en: "pref[5] + pref[1] (equals 17)", ar: "جمع pref[5] + pref[1] (= 17)" }],
      explanation: { en: "Inclusive `[l..r]` equals `pref[r + 1] - pref[l]`, so `pref[4] - pref[1] = 9 - 3 = 6` (`1 + 4 + 1`).", ar: "الصيغة القياسية للمجموع الشامل هي `pref[r + 1] - pref[l]` وتعطي `9 - 3 = 6`." }
    }
  },
  {
    unitId: "unit-array-cp-patterns",
    item: {
      id: "EXP-CPARR-102", domain: "Competitive Programming", topic: "Arrays", subtopic: "Difference Array", difficulty: "medium", type: "code-output", slotIndex: 0,
      question: { en: "How do you apply `+v` to every element in inclusive range `[l..r]` using a difference array `diff` in O(1)?", ar: "كيف تضيف `+v` لكل عناصر النطاق `[l..r]` باستخدام مصفوفة الفروقات `diff` بزمن O(1)؟" },
      correct: { en: "diff[l] += v; diff[r + 1] -= v;", ar: "diff[l] += v; diff[r + 1] -= v;" },
      distractors: [{ en: "diff[l] += v; diff[r] -= v;", ar: "diff[l] += v; diff[r] -= v; فقط" }, { en: "diff[r] += v; diff[l - 1] += v;", ar: "diff[r] += v; diff[l - 1] += v; معاً" }, { en: "Loop i from l to r: diff[i] += v;", ar: "حلقة تكرار كاملة من l إلى r على diff" }],
      explanation: { en: "Adding `+v` at `l` propagates across the suffix when taking prefix sums; subtracting `v` at `r + 1` stops it.", ar: "إضافة `v` عند البداية ثم طرحها عند `r + 1` تلغي الأثر بعد نهاية النطاق." }
    }
  },
  {
    unitId: "unit-array-cp-patterns",
    item: {
      id: "EXP-CPARR-103", domain: "Competitive Programming", topic: "Arrays", subtopic: "Constraints", difficulty: "easy", type: "scenario", slotIndex: 1,
      question: { en: "When should you prefer a Segment Tree or BIT instead of static Prefix Sums?", ar: "متى تفضل شجرة القطع أو Fenwick BIT بدلاً من مصفوفة المجاميع التراكمية الثابتة؟" },
      correct: { en: "When updates interleave with queries", ar: "عند وجود تحديثات متداخلة" },
      distractors: [{ en: "When array length n is under 5 elements", ar: "عندما يقل حجم المصفوفة عن 5 عناصر" }, { en: "When input values are floating booleans", ar: "عندما تكون المدخلات قيماً منطقية فقط" }, { en: "When all queries ask for `a[0]` only", ar: "عندما تطلب جميع الأسئلة `a[0]` وحده" }],
      explanation: { en: "Static prefix sums need O(n) rebuild on every point change, whereas BIT/SegTree maintain O(log n) both ways.", ar: "المجاميع التراكمية تفيد فقط دون تحديثات متكررة أثناء الاستعلامات بعكس Fenwick و Segment Tree." }
    }
  },
  {
    unitId: "unit-array-cp-patterns",
    item: {
      id: "EXP-CPARR-104", domain: "Competitive Programming", topic: "Arrays", subtopic: "2D Prefix Sums", difficulty: "hard", type: "concept", slotIndex: 2,
      question: { en: "Why does 2D prefix query add back `P[r1-1][c1-1]` in inclusion-exclusion?", ar: "لماذا يُعاد جمع `P[r1-1][c1-1]` في معادلة استعلام المجموع ثنائي الأبعاد؟" },
      correct: { en: "Top-left overlap was subtracted twice", ar: "طُرح التقاطع العلوي مرتين" },
      distractors: [{ en: "To convert 2D sums into modulo primes", ar: "لتحويل المجموع إلى أعداد أولية دوماً" }, { en: "To prevent negative matrix determinants", ar: "لمنع القيم السالبة بالمصفوفة كلها" }, { en: "To pad boundary columns with zeroes", ar: "لإضافة أصفار حول جميع الحدود" }],
      explanation: { en: "Subtracting top strip `P[r1-1][c2]` and left strip `P[r2][c1-1]` removes their intersection twice.", ar: "طرح الجزء العلوي ثم الأيسر يزيل التقاطع المشترك مرتين، لذا يعاد جمعه مرة واحدة." }
    }
  },
  {
    unitId: "unit-array-cp-patterns",
    item: {
      id: "EXP-CPARR-105", domain: "Competitive Programming", topic: "Arrays", subtopic: "Overflow Bug", difficulty: "medium", type: "debugging", slotIndex: 3,
      question: { en: "An array has `n = 10^5` elements each up to `10^9`. What type must the prefix sum array use?", ar: "مصفوفة بها `10^5` عنصر قد يصل كل منها لـ `10^9`. ما النوع اللازم لمصفوفة Prefix Sum؟" },
      correct: { en: "64-bit integer (long long / int64)", ar: "عدد صحيح 64-bit (long long)" },
      distractors: [{ en: "32-bit signed integer (`int`)", ar: "عدد صحيح 32-bit موقع (`int`)" }, { en: "Single unsigned byte (`uint8`)", ar: "بايت واحد غير موقع (`uint8` فقط)" }, { en: "16-bit short integer (`short`)", ar: "عدد صحيح قصير 16-bit محدود" }],
      explanation: { en: "Maximum sum reaches `10^14`, far exceeding signed 32-bit max (`~2.14e9`).", ar: "أقصى مجموع يبلغ `10^14` وهو يتخطى سعة الـ 32 بت بكثير فيستلزم 64 بت." }
    }
  },

  // 16. unit-recursion-foundations (+4)
  {
    unitId: "unit-recursion-foundations",
    item: {
      id: "EXP-REC-101", domain: "Algorithms", topic: "Recursion", subtopic: "Base Case", difficulty: "easy", type: "debugging", slotIndex: 0,
      codeSnippet: `int f(int n) {\n  return n * f(n - 1);\n}`,
      question: { en: "What runtime failure occurs immediately when calling `f(5)`?", ar: "ما العطل الفوري الذي يحدث عند استدعاء `f(5)`؟" },
      correct: { en: "Stack Overflow from missing base case", ar: "فيض المكدس لغياب Base Case" },
      distractors: [{ en: "Returns exact 120 in O(1)", ar: "يرجع 120 فوراً بزمن O(1) ثابت" }, { en: "Prints only negative factorials", ar: "يطبع المضروب السالب فقط على الشاشة" }, { en: "Automatically converts to iterative loop", ar: "يتحول تلقائياً إلى حلقة تكرار عادية" }],
      explanation: { en: "Without a stopping base case (like `if (n <= 1) return 1;`), calls recurse into negative infinity until the call stack overflows.", ar: "دون شرط توقف يتعمق الاستدعاء للأبد حتى ينفد حجم مكدس الاستدعاء." }
    }
  },
  {
    unitId: "unit-recursion-foundations",
    item: {
      id: "EXP-REC-102", domain: "Algorithms", topic: "Recursion", subtopic: "Call Stack Trace", difficulty: "medium", type: "code-output", slotIndex: 1,
      codeSnippet: `void go(int n) {\n  if (n == 0) return;\n  go(n - 1);\n  cout << n;\n}`,
      question: { en: "What output does `go(3)` produce when printing AFTER the recursive call?", ar: "ماذا تطبع `go(3)` عند وجود أمر الطباعة بعد الاستدعاء العودي؟" },
      correct: { en: "123", ar: "123" },
      distractors: [{ en: "321", ar: "الناتج 321" }, { en: "0123", ar: "0123" }, { en: "333", ar: "الناتج 333" }],
      explanation: { en: "`go(3) -> go(2) -> go(1) -> go(0)` unwinds from deepest frame back up, printing 1, then 2, then 3.", ar: "تنفذ الطباعة أثناء العودة من أعمق إطار نحو الأعلى، فتُطبع الأرقام تصاعدياً `123`." }
    }
  },
  {
    unitId: "unit-recursion-foundations",
    item: {
      id: "EXP-REC-103", domain: "Algorithms", topic: "Recursion", subtopic: "Backtracking State", difficulty: "medium", type: "concept", slotIndex: 2,
      question: { en: "Why must a Backtracking DFS undo its last choice (e.g. `path.pop_back()`) after returning from recursion?", ar: "لماذا يجب في التراجع (Backtracking) إلغاء الاختيار الأخير (`pop_back()`) بعد العودة من الاستدعاء؟" },
      correct: { en: "Restores shared state cleanly for sibling branch", ar: "يعيد الحالة للتفرع التالي" },
      distractors: [{ en: "Deletes all prior subsets from output list", ar: "يمحو كل المجموعات الجزئية السابقة كلياً" }, { en: "Forces call stack into O(1) memory", ar: "يقلص مكدس النداءات إلى ذاكرة ثابتة" }, { en: "Prevents compiler from casting pointers", ar: "يمنع المترجم من تحويل المؤشرات بالذاكرة" }],
      explanation: { en: "Reusing one mutable `path` vector requires removing the element before exploring the next candidate branch.", ar: "عند تمرير قائمة مشتركة، يلزم التراجع عن الاختيار حتى لا يلوث المسارات البديلة." }
    }
  },
  {
    unitId: "unit-recursion-foundations",
    item: {
      id: "EXP-REC-104", domain: "Algorithms", topic: "Recursion", subtopic: "Naive Fibonacci", difficulty: "hard", type: "complexity", slotIndex: 3,
      question: { en: "What is the time complexity of naive recursive `fib(n) = fib(n-1) + fib(n-2)` without memoization?", ar: "ما التعقيد الزمني لدالة فيبوناتشي العودية الساذجة دون حفظ (Memoization)؟" },
      correct: { en: "O(2^n) exponential", ar: "O(2^n)" },
      distractors: [{ en: "O(n) linear", ar: "تعقيد خطي O(n)" }, { en: "O(n log n)", ar: "تعقيد O(n log n)" }, { en: "O(log n)", ar: "تعقيد O(log n)" }],
      explanation: { en: "Each state branches into two overlapping recursive calls, recomputing identical subtrees exponentially often.", ar: "يتفرع كل استدعاء لاثنين مع تكرار حساب نفس الحالات، ليصبح الزمن أسياً O(2^n)." }
    }
  },

  // 17. unit-linked-lists-foundations (+5)
  {
    unitId: "unit-linked-lists-foundations",
    item: {
      id: "EXP-LL-101", domain: "Data Structures", topic: "Linked Lists", subtopic: "Random Access vs Head Insert", difficulty: "easy", type: "complexity", slotIndex: 0,
      question: { en: "What is the time complexity to access the `k`-th node by index in a Singly Linked List?", ar: "ما التعقيد الزمني للوصول إلى العنصر رقم `k` في قائمة مترابطة مفردة (Singly Linked List)؟" },
      correct: { en: "O(k) (O(n) worst case)", ar: "O(k) (أسوأ حالة O(n))" },
      distractors: [{ en: "O(1) constant pointer math", ar: "زمن ثابت O(1) عبر حساب العنوان المباشر" }, { en: "O(log n) midpoint skip", ar: "زمن O(log n) عبر القفز الثنائي" }, { en: "O(n^2) relinking cost", ar: "زمن O(n^2) لإعادة الربط الكاملة" }],
      explanation: { en: "Linked list nodes are non-contiguous, so traversal must follow `.next` pointers sequentially from `head`.", ar: "العقد مبعثرة بالذاكرة؛ لا بد من تتبع الروابط خطوة بخطوة من البداية للوصول للخانة `k`." }
    }
  },
  {
    unitId: "unit-linked-lists-foundations",
    item: {
      id: "EXP-LL-102", domain: "Data Structures", topic: "Linked Lists", subtopic: "Cycle Detection", difficulty: "medium", type: "concept", slotIndex: 1,
      question: { en: "How does Floyd's Tortoise and Hare algorithm detect a cycle in O(1) auxiliary space?", ar: "كيف تكتشف خوارزمية السلحفاة والأرنب وجود حلقة في القائمة المترابطة بذاكرة إضافية O(1)؟" },
      correct: { en: "Fast (+2) catches slow (+1) pointer", ar: "يلتقي السريع (+2) بالبطيء (+1)" },
      distractors: [{ en: "Stores every visited node inside a HashSet", ar: "تحفظ جميع العقد داخل مجموعة HashSet" }, { en: "Deletes tail pointers until head becomes null", ar: "تحذف النهاية حتى تصبح البداية فارغة" }, { en: "Sorts node addresses in ascending array", ar: "ترتب عناوين العقد في مصفوفة مساعدة" }],
      explanation: { en: "Inside a cycle, the fast pointer closes the gap by 1 node per step and guarantees meeting slow without extra memory.", ar: "داخل الدورة يقترب السريع من البطيء بخطوة كل دورة حتى يتقاطعا تماماً دون جدول تجزئة." }
    }
  },
  {
    unitId: "unit-linked-lists-foundations",
    item: {
      id: "EXP-LL-103", domain: "Data Structures", topic: "Linked Lists", subtopic: "Dummy Node", difficulty: "medium", type: "concept", slotIndex: 2,
      question: { en: "Why use a sentinel `dummy` node before `head` when filtering or merging Linked Lists?", ar: "ما فائدة استخدام عقدة وهمية (`dummy node`) قبل البداية عند تصفية أو دمج القوائم المترابطة؟" },
      correct: { en: "Eliminates special-case head insertion checks", ar: "يوحّد معالجة الرأس والبقية" },
      distractors: [{ en: "Halves memory used by every integer field", ar: "يقلص حجم جميع الأعداد الصحيحة للنصف" }, { en: "Turns linked lists into contiguous arrays", ar: "يحول القائمة المترابطة لمصفوفة متجاورة" }, { en: "Enforces ascending binary tree sorting", ar: "يفرض ترتيب الشجرة الثنائية التصاعدي" }],
      explanation: { en: "With `dummy.next = head`, updating or deleting the first real node uses identical pointer wiring to any interior node.", ar: "توحّد العقدة الوهمية معالجة البداية مع باقي العقد وتقلل احتمالات الأخطاء الحدية." }
    }
  },
  {
    unitId: "unit-linked-lists-foundations",
    item: {
      id: "EXP-LL-104", domain: "Data Structures", topic: "Linked Lists", subtopic: "Reverse List Bug", difficulty: "medium", type: "debugging", slotIndex: 3,
      codeSnippet: `curr.next = prev;\nprev = curr;\ncurr = curr.next; // BUG`,
      question: { en: "What goes wrong in this in-place Linked List reversal loop?", ar: "ما الخطأ في حلقة عكس القائمة المترابطة التالية؟" },
      correct: { en: "Lost `curr.next` before advancing `curr`", ar: "فُقد رابط `curr.next` قبل التقدم" },
      distractors: [{ en: "Pointers need 64-bit bitwise XOR conversion", ar: "المؤشرات تحتاج عملية XOR ثنائية بالذاكرة" }, { en: "`prev` must start equal to tail index", ar: "يجب أن يبدأ `prev` من آخر عنصر بالقائمة" }, { en: "Linked lists forbid reversing in loops", ar: "القوائم تمنع العكس داخل حلقات التكرار" }],
      explanation: { en: "Once `curr.next` is overwritten with `prev`, `curr = curr.next` walks backward; save `nextTemp = curr.next` first.", ar: "تعديل `curr.next` يمسح العنوان التالي؛ لذا يجب حفظ `next = curr.next` قبل العكس." }
    }
  },
  {
    unitId: "unit-linked-lists-foundations",
    item: {
      id: "EXP-LL-105", domain: "Data Structures", topic: "Linked Lists", subtopic: "Doubly Linked List", difficulty: "easy", type: "concept", slotIndex: 0,
      question: { en: "Which extra operation becomes O(1) when holding a node pointer inside a Doubly Linked List vs Singly?", ar: "أي عملية تصبح O(1) عند امتلاك مرجع للعقدة في القائمة المترابطة المزدوجة مقارنة بالمفردة؟" },
      correct: { en: "Deleting the node without scanning from head", ar: "حذف العقدة دون مسح من الرأس" },
      distractors: [{ en: "Binary search lookup directly on middle index", ar: "البحث الثنائي في المنتصف مباشرة بسرعة" }, { en: "Indexing `list[i]` in constant time", ar: "الوصول المباشر عبر `list[i]` بزمن ثابت" }, { en: "Compressing pointer bytes down to zero", ar: "تقليص حجم المؤشرات في الذاكرة إلى صفر" }],
      explanation: { en: "Each doubly-linked node knows both `prev` and `next`, letting it splice itself out immediately.", ar: "امتلاك مؤشر `prev` يسمح بفصل العقدة مباشرة في O(1) دون التمرير من الرأس." }
    }
  },

  // 18. unit-stacks-queues-foundations (+5)
  {
    unitId: "unit-stacks-queues-foundations",
    item: {
      id: "EXP-SQ-101", domain: "Data Structures", topic: "Stacks & Queues", subtopic: "Stack Trace", difficulty: "easy", type: "code-output", slotIndex: 1,
      codeSnippet: `stack<int> st;\nst.push(4); st.push(9); st.pop(); st.push(2);\ncout << st.top();`,
      question: { en: "What top element does `st.top()` print after this push/pop sequence?", ar: "ما العنصر الأعلى الذي يطبعه `st.top()` بعد هذه العمليات؟" },
      correct: { en: "2", ar: "2" },
      distractors: [{ en: "9", ar: "9" }, { en: "4", ar: "4" }, { en: "Empty exception", ar: "استثناء مكدس فارغ" }],
      explanation: { en: "Push 4 -> [4]; Push 9 -> [4,9]; Pop -> [4]; Push 2 -> [4,2]. Top is 2.", ar: "تم سحب 9 ثم دفع 2 لقمة المكدس، فتكون القمة الحالية `2`." }
    }
  },
  {
    unitId: "unit-stacks-queues-foundations",
    item: {
      id: "EXP-SQ-102", domain: "Data Structures", topic: "Stacks & Queues", subtopic: "Queue Order", difficulty: "easy", type: "code-output", slotIndex: 2,
      codeSnippet: `queue<string> q;\nq.push("A"); q.push("B"); q.pop(); q.push("C");\ncout << q.front();`,
      question: { en: "What does `q.front()` print in this FIFO queue?", ar: "ماذا تطبع `q.front()` في هذا الرتل (Queue)؟" },
      correct: { en: "B", ar: "B" },
      distractors: [{ en: "A", ar: "A" }, { en: "C", ar: "C" }, { en: "BA", ar: "BA" }],
      explanation: { en: "FIFO pops `" + "A" + "` first, leaving `B` at the front ahead of `C`.", ar: "مبدأ الداخل أولاً يخرج أولاً يُخرج `" + "A" + "` ويُبقي `B` في المقدمة." }
    }
  },
  {
    unitId: "unit-stacks-queues-foundations",
    item: {
      id: "EXP-SQ-103", domain: "Data Structures", topic: "Stacks & Queues", subtopic: "Parentheses", difficulty: "medium", type: "scenario", slotIndex: 3,
      question: { en: "When validating balanced brackets `({[]})`, why does a Stack return false on `\"([)]\"`?", ar: "عند فحص توازن الأقواس `({[]})`, لماذا يرفض المكدس سلسلة `\"([)]\"`؟" },
      correct: { en: "Top `[` misses closing `)` order", ar: "القمة `[` لا تطابق `)`" },
      distractors: [{ en: "Stacks allow round parentheses only", ar: "المكدس يقبل الأقواس المستديرة وحدها فقط" }, { en: "Length 4 exceeds default stack capacity", ar: "الطول 4 يتجاوز السعة القياسية للمكدس" }, { en: "Characters must be sorted ASCII-first", ar: "الحروف يجب ترتيبها أبجدياً قبل الفحص" }],
      explanation: { en: "The most recently opened unclosed bracket `[` must match the next closing bracket; seeing `)` breaks LIFO nesting.", ar: "آخر قوس فُتح هو `[`، لكن القوس المغلق التالي هو `)` مما يناقض التداخل السليم." }
    }
  },
  {
    unitId: "unit-stacks-queues-foundations",
    item: {
      id: "EXP-SQ-104", domain: "Data Structures", topic: "Stacks & Queues", subtopic: "Monotonic Stack", difficulty: "hard", type: "concept", slotIndex: 0,
      question: { en: "What is the amortized complexity of Next Greater Element across an array of length `n` using a Monotonic Stack?", ar: "ما التعقيد الزمني المحسوب لإيجاد العنصر الأكبر التالي بمصفوفة طولها `n` باستخدام المكدس الرتيب؟" },
      correct: { en: "O(n) because elements push and pop once", ar: "O(n) (دفع وسحب مرة)" },
      distractors: [{ en: "O(n^2) due to inner while loops", ar: "تعقيد O(n^2) لوجود حلقة داخلية متكررة" }, { en: "O(n log n) after sorting values", ar: "تعقيد O(n log n) بعد فرز القيم" }, { en: "O(2^n) backtracking states", ar: "تعقيد O(2^n) لتشعب الحالات الممكنة" }],
      explanation: { en: "Even with an inner `while` loop, each index enters the stack once and leaves at most once, totaling `<= 2n` stack ops.", ar: "رغم وجود حلقة داخلية، يدخل كل عنصر المكدس مرة ويخرج مرة على الأكثر، فيظل المجموع O(n)." }
    }
  },
  {
    unitId: "unit-stacks-queues-foundations",
    item: {
      id: "EXP-SQ-105", domain: "Data Structures", topic: "Stacks & Queues", subtopic: "Circular Ring Buffer", difficulty: "medium", type: "concept", slotIndex: 1,
      question: { en: "How does an array-backed Ring Buffer achieve O(1) dequeue without shifting elements?", ar: "كيف يحقق المخزن الدائري (Ring Buffer) إزالة O(1) دون إزاحة العناصر؟" },
      correct: { en: "Wraps front index using modulo `(front + 1) % cap`", ar: "يلف المؤشر عبر باقي القسمة" },
      distractors: [{ en: "Doubles capacity on every single pop", ar: "يضاعف السعة المحجوزة مع كل عملية سحب" }, { en: "Shifts array items one step backward", ar: "يزيح العناصر جميعها خطوة لليسار دائماً" }, { en: "Converts indices to linked heap nodes", ar: "يحول الفهارس إلى عقد شجرية بالذاكرة" }],
      explanation: { en: "Incrementing `head = (head + 1) % capacity` reuses freed front slots circularly in O(1).", ar: "استخدام باقي القسمة يعيد استخدام الخانات المحررة بشكل دائري بزمن ثابت." }
    }
  },

  // 19. unit-hash-tables-foundations (+5)
  {
    unitId: "unit-hash-tables-foundations",
    item: {
      id: "EXP-HSH-101", domain: "Data Structures", topic: "Hash Tables", subtopic: "Average Lookup", difficulty: "easy", type: "complexity", slotIndex: 2,
      question: { en: "With a well-distributed hash function and bounded load factor, what is average Hash Table lookup time?", ar: "مع دالة تجزئة جيدة ومعامل تحميل منضبط، ما متوسط زمن البحث في جدول التجزئة؟" },
      correct: { en: "O(1)", ar: "O(1)" },
      distractors: [{ en: "O(log n)", ar: "O(log n)" }, { en: "O(n)", ar: "O(n)" }, { en: "O(n log n)", ar: "O(n log n)" }],
      explanation: { en: "Hashing computes the target bucket index directly in constant expected time.", ar: "تحسب دالة التجزئة موقع الدلو مباشرة لتصل للبيانات بزمن متوسط O(1)." }
    }
  },
  {
    unitId: "unit-hash-tables-foundations",
    item: {
      id: "EXP-HSH-102", domain: "Data Structures", topic: "Hash Tables", subtopic: "Collisions", difficulty: "medium", type: "concept", slotIndex: 3,
      question: { en: "How does Separate Chaining handle two distinct keys hashing to the same bucket index?", ar: "كيف تعالج طريقة الترابط المنفصل (Separate Chaining) تصادم مفتاحين في نفس الفهرس؟" },
      correct: { en: "Stores colliding pairs in a per-bucket list", ar: "تحفظهما في قائمة بالخانة" },
      distractors: [{ en: "Overwrites old entries silently without storing", ar: "تستبدل العنصر القديم وتمسحه نهائياً بالذاكرة" }, { en: "Halts insertion with a runtime error", ar: "ترفض الإدراج وترمي استثناءً برمجياً فوراً" }, { en: "Converts keys into sorted disk files", ar: "تحفظ المفاتيح بملفات مرتبة على القرص" }],
      explanation: { en: "Each bucket holds a linked list or small vector of entries sharing that hash bucket.", ar: "يمتلك كل دلو قائمة تربط المفاتيح التي آلت إليه بدلاً من الكتابة فوق بعضها." }
    }
  },
  {
    unitId: "unit-hash-tables-foundations",
    item: {
      id: "EXP-HSH-103", domain: "Data Structures", topic: "Hash Tables", subtopic: "Load Factor", difficulty: "medium", type: "concept", slotIndex: 0,
      question: { en: "What triggers a Hash Table to allocate a larger bucket array and rehash all existing keys?", ar: "ما الذي يدفع جدول التجزئة إلى توسيع المصفوفة وإعادة توزيع (Rehashing) المفاتيح؟" },
      correct: { en: "Load factor `items / buckets` exceeds threshold", ar: "تجاوز معامل التحميل للحد" },
      distractors: [{ en: "First lookup misses once", ar: "فشل أول عملية بحث لمرة واحدة بالبداية" }, { en: "Key string contains spaces or hyphens", ar: "احتواء المفتاح النصي على مسافة بيضاء" }, { en: "Exactly 10 deletions occurred consecutively", ar: "حدوث 10 عمليات حذف متتالية دون إدراج" }],
      explanation: { en: "Keeping load factor bounded (e.g. `<= 0.75`) preserves short chains and O(1) expected lookups.", ar: "عندما يتجاوز معامل التحميل نحو 0.75 يضاعف الجدول السعة ويعيد التوزيع للحفاظ على O(1)." }
    }
  },
  {
    unitId: "unit-hash-tables-foundations",
    item: {
      id: "EXP-HSH-104", domain: "Data Structures", topic: "Hash Tables", subtopic: "Mutable Keys Bug", difficulty: "hard", type: "debugging", slotIndex: 1,
      question: { en: "Why do languages forbid mutating an object's key fields after inserting it as a HashMap/Set key?", ar: "لماذا تمنع اللغات تغيير حقول كائن مستخدم كمفتاح بعد إدراجه في HashMap؟" },
      correct: { en: "Its hash code changes so lookups miss its bucket", ar: "تتغير تجزئته فيضيع موقعه" },
      distractors: [{ en: "Mutating keys turns integers into floats", ar: "تعديل المفتاح يحول الأعداد الصحيحة لعشرية" }, { en: "Hash maps freeze RAM clocks on writes", ar: "تجمّد الذاكرة عند كل عملية تعديل جديدة" }, { en: "Mutable keys become global constants", ar: "تتحول تلقائياً لثوابت عامة بالبرنامج" }],
      explanation: { en: "Lookup hashes the mutated key and checks a different bucket than where the entry still sits.", ar: "المفتاح يظل مخزناً وفق تجزئته القديمة بينما سيبحث النظام لاحقاً في موقع مختلف." }
    }
  },
  {
    unitId: "unit-hash-tables-foundations",
    item: {
      id: "EXP-HSH-105", domain: "Data Structures", topic: "Hash Tables", subtopic: "Worst Case Attack", difficulty: "medium", type: "complexity", slotIndex: 2,
      question: { en: "What is worst-case lookup complexity in a Hash Table if adversarial keys all collide on one bucket?", ar: "ما أسوأ تعقيد زمني للبحث في جدول تجزئة إذا تصادمت جميع المفاتيح في دلو واحد؟" },
      correct: { en: "O(n)", ar: "O(n)" },
      distractors: [{ en: "O(1)", ar: "O(1)" }, { en: "O(log log n)", ar: "O(log log n)" }, { en: "O(2^n)", ar: "O(2^n)" }],
      explanation: { en: "If all `n` entries collide into one bucket chain, searching traverses `O(n)` items linearly.", ar: "تراكم العناصر الـ `n` في خانة واحدة يحوّل البحث إلى بحث خطي O(n)." }
    }
  },

  // 20. unit-trees-foundations (+3)
  {
    unitId: "unit-trees-foundations",
    item: {
      id: "EXP-TRE-101", domain: "Data Structures", topic: "Trees", subtopic: "In-Order Traversal", difficulty: "easy", type: "concept", slotIndex: 3,
      question: { en: "Which Binary Search Tree (BST) traversal visits node values in strictly ascending sorted order?", ar: "أي مسار استعراض في شجرة البحث الثنائية (BST) يطبع القيم مرتبة تصاعدياً؟" },
      correct: { en: "In-order (Left -> Root -> Right)", ar: "الوسطي In-order (يسار -> جذر -> يمين)" },
      distractors: [{ en: "Pre-order (Root -> Left -> Right)", ar: "القبلي Pre-order (جذر -> يسار -> يمين)" }, { en: "Post-order (Left -> Right -> Root)", ar: "البعدي Post-order (يسار -> يمين -> جذر)" }, { en: "Level-order Breadth First", ar: "المستوى بالعرض Level-order عبر الرتل" }],
      explanation: { en: "Because all left subtree keys `< root < right`, visiting Left, Root, Right outputs sorted keys.", ar: "خصائص BST تجعل كل اليسار أصغر واليمين أكبر، لذا زيارة اليسار فالجذر فاليمين تنتج قيماً مرتبة." }
    }
  },
  {
    unitId: "unit-trees-foundations",
    item: {
      id: "EXP-TRE-102", domain: "Data Structures", topic: "Trees", subtopic: "Degenerate BST", difficulty: "medium", type: "debugging", slotIndex: 0,
      question: { en: "If you insert sorted keys `1, 2, 3, ..., n` into an unbalanced BST, what shape and search time emerge?", ar: "عند إدراج مفاتيح مرتبة `1..n` في شجرة بحث غير متوازنة، ما الشكل والتعقيد الناتج؟" },
      correct: { en: "Degenerate chain with O(n) search", ar: "سلسلة منحازة بزمن بحث O(n)" },
      distractors: [{ en: "Perfectly balanced tree with O(log n)", ar: "شجرة متوازنة تماماً بزمن O(log n)" }, { en: "Min-heap with O(1) arbitrary lookup", ar: "كومة صغرى بزمن بحث عشوائي O(1)" }, { en: "Direct O(1) hash table buckets", ar: "جدول تجزئة متوزع بزمن O(1)" }],
      explanation: { en: "Each larger key goes solely to the right child, forming a skew chain of height `n`.", ar: "يتجه كل مفتاح أكبر للابن الأيمن دوماً فتتحول الشجرة إلى ما يشبه قائمة مترابطة." }
    }
  },
  {
    unitId: "unit-trees-foundations",
    item: {
      id: "EXP-TRE-103", domain: "Data Structures", topic: "Trees", subtopic: "Binary Heap", difficulty: "medium", type: "concept", slotIndex: 1,
      question: { en: "What invariant distinguishes a Binary Min-Heap from a Binary Search Tree?", ar: "ما الشرط الذي يميز الكومة الصغرى (Min-Heap) عن شجرة البحث الثنائية (BST)؟" },
      correct: { en: "Parent <= children; no left/right order", ar: "الأب <= أبنائه دون ترتيب يمين/يسار" },
      distractors: [{ en: "Min-Heap sorts keys left < root < right", ar: "الكومة ترتب اليسار أصغر من اليمين في كل المستويات" }, { en: "Min-Heap stores edges in SQL tables only", ar: "الكومة تحفظ الحواف داخل جداول قاعدة بيانات فقط" }, { en: "Heaps forbid duplicate keys at any depth", ar: "تمنع الكومة تكرار القيم المتطابقة مطلقاً" }],
      explanation: { en: "A Min-Heap only guarantees each parent is smaller than its children, keeping the global minimum at root in O(1).", ar: "الكومة تضمن فقط أن الأب أصغر من أبنائه ليظل الأصغر في القمة O(1) بعكس BST." }
    }
  },

  // 21. unit-graphs-foundations (+4)
  {
    unitId: "unit-graphs-foundations",
    item: {
      id: "EXP-GRP-101", domain: "Data Structures", topic: "Graphs", subtopic: "Representation Space", difficulty: "medium", type: "complexity", slotIndex: 2,
      question: { en: "You have a sparse social graph with `V = 100,000` vertices and `E = 250,000` edges. Which representation fits memory best?", ar: "لديك رسم بياني متباعد فيه `V = 100,000` عقدة و `E = 250,000` حافة. أي تمثيل يناسب الذاكرة؟" },
      correct: { en: "Adjacency List taking O(V + E) memory", ar: "قائمة التجاور O(V + E)" },
      distractors: [{ en: "Adjacency Matrix (`V x V` ~10^10 cells)", ar: "مصفوفة التجاور (V x V ~ 10 مليار خانة)" }, { en: "Fixed 3D binary segment tree cube", ar: "مصفوفة شجرة قطع ثلاثية الأبعاد بالذاكرة" }, { en: "Static hash table per undirected cycle", ar: "جدول تجزئة مستقل لكل دورة منفصلة" }],
      explanation: { en: "A `10^5 x 10^5` matrix needs gigabytes of zeroes; adjacency lists store only actual edges in megabytes.", ar: "المصفوفة تتطلب `V^2` خانة هائلة، بينما قائمة التجاور تحفظ الرؤوس والحواف الموجودة فقط." }
    }
  },
  {
    unitId: "unit-graphs-foundations",
    item: {
      id: "EXP-GRP-102", domain: "Data Structures", topic: "Graphs", subtopic: "Degree Count", difficulty: "easy", type: "concept", slotIndex: 3,
      question: { en: "In any finite undirected graph without self-loops, what does the sum of all vertex degrees equal?", ar: "في أي رسم بياني غير موجه محدود دون حلقات ذاتية، ما مجموع درجات جميع الرؤوس؟" },
      correct: { en: "2 * |E| (twice the edges)", ar: "2 * |E|" },
      distractors: [{ en: "|E| (equal to edge count)", ar: "|E| (يساوي عدد الحواف فقط)" }, { en: "|V| * |E| product", ar: "حاصل ضرب |V| * |E| معاً" }, { en: "|V|^2 - |E| difference", ar: "الفرق الكلي |V|^2 - |E|" }],
      explanation: { en: "By the Handshaking Lemma, every undirected edge touches two endpoint vertices and contributes 2 to total degree.", ar: "كل حافة غير موجهة تصل بين طرفين، فتزيد مجموع الدرجات بمقدار 2." }
    }
  },
  {
    unitId: "unit-graphs-foundations",
    item: {
      id: "EXP-GRP-103", domain: "Data Structures", topic: "Graphs", subtopic: "DAG", difficulty: "medium", type: "concept", slotIndex: 0,
      question: { en: "Which property is strictly required for a Directed Graph to admit a valid Topological Ordering?", ar: "ما الشرط الصارم اللازم في الرسم الموجه لقبول ترتيب طوبولوجي (Topological Sort)؟" },
      correct: { en: "Must contain no directed cycles (DAG)", ar: "خلوه من الدورات الموجهة (DAG)" },
      distractors: [{ en: "Every vertex degree must be identical", ar: "تساوي درجات جميع الرؤوس داخل الرسم" }, { en: "All edge weights must be negative integers", ar: "أن تكون الأوزان كلها أعداداً سالبة" }, { en: "Graph must hold fewer than 10 edges", ar: "أن يقل عدد الحواف الإجمالي عن 10" }],
      explanation: { en: "If `A -> B -> A` exists, neither node can appear before the other; only Directed Acyclic Graphs sort topologically.", ar: "وجود دورة يمنع وضع عقدة قبل أخرى، لذا يقتصر الترتيب الطوبولوجي على الـ DAG." }
    }
  },
  {
    unitId: "unit-graphs-foundations",
    item: {
      id: "EXP-GRP-104", domain: "Data Structures", topic: "Graphs", subtopic: "Cycle Check Bug", difficulty: "medium", type: "debugging", slotIndex: 1,
      question: { en: "During DFS cycle detection on an UNDIRECTED graph, why skip neighbor `v` when `v == parent`?", ar: "أثناء فحص الدورات بـ DFS في رسم غير موجه، لماذا نتجاهل الجار `v` عندما يكون `v == parent`؟" },
      correct: { en: "Prevents mistaking arrival edge as a cycle", ar: "لتجنب اعتبار طريق المجيء دورة" },
      distractors: [{ en: "Removes duplicate nodes inside queue lists", ar: "لحذف العقد المكررة داخل رتل الانتظار" }, { en: "Prevents edges from carrying zero weight", ar: "لمنع الحواف ذات الوزن الصفري بالرسم" }, { en: "Converts graph edges into binary heaps", ar: "لتحويل الحواف إلى أكوام ثنائية مرتبة" }],
      explanation: { en: "Undirected edge `{u, v}` appears in both `adj[u]` and `adj[v]`; walking back to immediate `parent` is not a cycle.", ar: "في الرسم غير الموجه توجد الحافة بالاتجاهين؛ العودة المباشرة للأب ليست دورة حقيقية." }
    }
  },

  // 22. unit-complexity-foundations (+5)
  {
    unitId: "unit-complexity-foundations",
    item: {
      id: "EXP-CMP-101", domain: "Algorithms", topic: "Complexity Analysis", subtopic: "Simplification", difficulty: "easy", type: "complexity", slotIndex: 2,
      question: { en: "How does `3*n^2 + 500*n + 42` simplify in Big-O notation?", ar: "ما التبسيط الصحيح للتعبير `3*n^2 + 500*n + 42` بصيغة Big-O؟" },
      correct: { en: "O(n^2)", ar: "O(n^2)" },
      distractors: [{ en: "O(3n^2)", ar: "O(3n^2)" }, { en: "O(n^2 + n)", ar: "O(n^2 + n)" }, { en: "O(500n)", ar: "O(500n)" }],
      explanation: { en: "Big-O drops constant factors and lower-order terms, keeping the dominant growth term `n^2`.", ar: "تهمل Big-O الثوابت والحدود الأقل نمواً وتحتفظ بالحد المهيمن الأسرع نمواً `n^2`." }
    }
  },
  {
    unitId: "unit-complexity-foundations",
    item: {
      id: "EXP-CMP-102", domain: "Algorithms", topic: "Complexity Analysis", subtopic: "Logarithmic Halving", difficulty: "easy", type: "code-output", slotIndex: 3,
      codeSnippet: `for (int i = n; i >= 1; i /= 2) {\n  ops++;\n}`,
      question: { en: "What is the time complexity of halving `i /= 2` from `n` down to `1`?", ar: "ما التعقيد الزمني لحلقة تنصف المتغير `i /= 2` من `n` إلى `1`؟" },
      correct: { en: "O(log n)", ar: "O(log n)" },
      distractors: [{ en: "O(n)", ar: "O(n)" }, { en: "O(sqrt(n))", ar: "O(sqrt(n))" }, { en: "O(1)", ar: "O(1)" }],
      explanation: { en: "Each step halves `i`, reaching 1 in roughly `log2(n)` iterations.", ar: "تقسيم النطاق إلى النصف في كل خطوة يتطلب `log2(n)` دورة فقط." }
    }
  },
  {
    unitId: "unit-complexity-foundations",
    item: {
      id: "EXP-CMP-103", domain: "Algorithms", topic: "Complexity Analysis", subtopic: "Hidden Linear Work", difficulty: "hard", type: "debugging", slotIndex: 0,
      codeSnippet: `while (!vec.empty()) {\n  vec.erase(vec.begin());\n}`,
      question: { en: "What is the total time complexity of removing all `n` items from the front of a `std::vector` one by one?", ar: "ما التعقيد الزمني الكلي لحذف كافة عناصر `vector` بطول `n` واحداً تلو الآخر من بدايته؟" },
      correct: { en: "O(n^2)", ar: "O(n^2)" },
      distractors: [{ en: "O(n)", ar: "O(n)" }, { en: "O(log n)", ar: "O(log n)" }, { en: "O(n log n)", ar: "O(n log n)" }],
      explanation: { en: "Erasing index 0 shifts `n-1, n-2, ..., 1` remaining elements each step, summing to `O(n^2)`.", ar: "حذف العنصر الأول يزيح باقي المصفوفة في كل مرة فينتج مجموع حسابي قدره O(n^2)." }
    }
  },
  {
    unitId: "unit-complexity-foundations",
    item: {
      id: "EXP-CMP-104", domain: "Algorithms", topic: "Complexity Analysis", subtopic: "Space Complexity", difficulty: "medium", type: "complexity", slotIndex: 1,
      question: { en: "If an algorithm allocates no extra arrays yet recurses to depth `d` on the call stack, what is its auxiliary space?", ar: "إذا لم تحجز الخوارزمية مصفوفات إضافية لكنها تتعمق عودياً إلى عمق `d`، ما تعقيد المساحة المساعدة؟" },
      correct: { en: "O(d) stack frame space", ar: "O(d) لمكدس الاستدعاءات" },
      distractors: [{ en: "Strict O(1) zero extra bytes", ar: "O(1) دون أي مساحة إضافية إطلاقاً" }, { en: "Always O(2^d) auxiliary bytes", ar: "مساحة O(2^d) لإطارات النداء" }, { en: "O(1 / d) reciprocal heap", ar: "تعقيد عكسي O(1 / d) بالذاكرة" }],
      explanation: { en: "Every active recursive call pushes a frame onto the Call Stack until unwinding begins.", ar: "كل استدعاء عودي مفتوح يحتفظ بإطار في Call Stack فيستهلك مساحة قدرها O(d)." }
    }
  },
  {
    unitId: "unit-complexity-foundations",
    item: {
      id: "EXP-CMP-105", domain: "Algorithms", topic: "Complexity Analysis", subtopic: "Two Different Inputs", difficulty: "medium", type: "complexity", slotIndex: 2,
      codeSnippet: `for (int x : A) sum += x; // len(A) = n\nfor (int y : B) sum += y; // len(B) = m`,
      question: { en: "Given independent array lengths `n` and `m`, what is the precise Big-O time complexity?", ar: "بافتراض طولين مستقلين `n` للمصفوفة A و `m` للمصفوفة B، ما التعقيد الزمني الدقيق؟" },
      correct: { en: "O(n + m)", ar: "O(n + m)" },
      distractors: [{ en: "O(n * m)", ar: "O(n * m)" }, { en: "O(n^2)", ar: "O(n^2)" }, { en: "O(log(n + m))", ar: "O(log(n + m))" }],
      explanation: { en: "Sequential independent loops add complexities `O(n + m)` rather than multiplying them.", ar: "الحلقات المتتابعة غير المتداخلة تُجمع تعقيداتها معاً O(n + m) ولا تُضرب." }
    }
  },

  // 23. unit-linear-search-foundations (+5)
  {
    unitId: "unit-linear-search-foundations",
    item: {
      id: "EXP-LNS-101", domain: "Algorithms", topic: "Searching", subtopic: "Linear Search", difficulty: "easy", type: "concept", slotIndex: 3,
      question: { en: "When is Linear Search O(n) strictly better than Sorting O(n log n) + Binary Search O(log n)?", ar: "متى يكون البحث الخطي O(n) أفضل عملياً من الفرز O(n log n) ثم البحث الثنائي؟" },
      correct: { en: "Unsorted array queried once", ar: "مصفوفة غير مرتبة لبحث واحد" },
      distractors: [{ en: "Running 1,000,000 repeated lookups", ar: "إجراء مليون بحث متكرر على نفس القائمة" }, { en: "Elements already sorted cleanly", ar: "عندما تكون العناصر مرتبة تصاعدياً مسبقاً" }, { en: "Array stored in SQL B-Tree index", ar: "وجود فهرس B-Tree جاهز بقاعدة البيانات" }],
      explanation: { en: "Sorting first costs `O(n log n)` which outweighs a single `O(n)` scan.", ar: "لفحص وحيد على بيانات غير مرتبة، تكلفة الفرز أكبر من مسح البيانات خطياً لمرة واحدة." }
    }
  },
  {
    unitId: "unit-linear-search-foundations",
    item: {
      id: "EXP-LNS-102", domain: "Algorithms", topic: "Searching", subtopic: "Best Case", difficulty: "easy", type: "complexity", slotIndex: 0,
      question: { en: "What is the Best-Case time complexity of Linear Search?", ar: "ما التعقيد الزمني في أفضل حالة (Best Case) للبحث الخطي؟" },
      correct: { en: "O(1) when target sits at index 0", ar: "O(1) عند الفهرس 0" },
      distractors: [{ en: "O(n log n) every time", ar: "تعقيد O(n log n) في جميع الأحوال" }, { en: "O(n) even on index 0", ar: "تعقيد O(n) حتى عند الفهرس الأول 0" }, { en: "O(n^2) before checking bounds", ar: "تعقيد O(n^2) لفحص حدود المصفوفة" }],
      explanation: { en: "If the desired item is at the first slot checked and the loop returns immediately, only 1 comparison runs.", ar: "عند تطابق أول عنصر نعود فوراً خلال مقارنة واحدة فقط O(1)." }
    }
  },
  {
    unitId: "unit-linear-search-foundations",
    item: {
      id: "EXP-LNS-103", domain: "Algorithms", topic: "Searching", subtopic: "Early Return", difficulty: "medium", type: "debugging", slotIndex: 1,
      codeSnippet: `int idx = -1;\nfor (int i = 0; i < n; i++) {\n  if (a[i] == target) idx = i;\n}`,
      question: { en: "If `target` appears at indices `1` and `4` in `a`, what index does this loop return if it keeps scanning without `break`?", ar: "إذا ظهر الهدف في الفهرسين `1` و `4` ولم نضع `break`، أي فهرس سيبقى في `idx`؟" },
      correct: { en: "Last matching index `4`", ar: "الفهرس الأخير `4`" },
      distractors: [{ en: "First matching index `1`", ar: "الفهرس الأول `1`" }, { en: "Returns `-1` on duplicates", ar: "يرجع `-1` عند التكرار" }, { en: "Throws array duplicate error", ar: "يرمي خطأ تكرار مصفوفة" }],
      explanation: { en: "Continuing past match `1` overwrites `idx` with later occurrence `4`; add `return i;` or `break` for first occurrence.", ar: "الاستمرار بالحلقة يغطي القيمة السابقة ويحفظ الفهرس الأخير؛ يلزم `break` لأخذ الأول." }
    }
  },
  {
    unitId: "unit-linear-search-foundations",
    item: {
      id: "EXP-LNS-104", domain: "Algorithms", topic: "Searching", subtopic: "Missing Target", difficulty: "easy", type: "code-output", slotIndex: 2,
      question: { en: "Given `[7, 12, 3, 9, 5]`, how many element comparisons does Linear Search perform searching for missing value `100`?", ar: "في المصفوفة `[7, 12, 3, 9, 5]`، كم مقارنة يجريها البحث الخطي عند البحث عن `100` غير الموجود؟" },
      correct: { en: "5 comparisons", ar: "5 مقارنات" },
      distractors: [{ en: "3 comparisons", ar: "3 مقارنات" }, { en: "1 comparison", ar: "مقارنة واحدة" }, { en: "10 comparisons", ar: "10 مقارنات" }],
      explanation: { en: "Confirming absence in an unsorted array requires checking all `5` positions.", ar: "للتيقن من غياب عنصر في مصفوفة غير مرتبة يجب فحص كافة عناصرها الخمسة." }
    }
  },
  {
    unitId: "unit-linear-search-foundations",
    item: {
      id: "EXP-LNS-105", domain: "Algorithms", topic: "Searching", subtopic: "Sentinel Search", difficulty: "medium", type: "concept", slotIndex: 3,
      question: { en: "In classic Sentinel Linear Search, why place the target temporarily at the end of the buffer?", ar: "في البحث الخطي بالحارس (Sentinel)، لماذا نضع القيمة المطلوبة مؤقتاً بنهاية المصفوفة؟" },
      correct: { en: "Drops `i < n` check inside tight loop", ar: "لإزالة شرط الحدود `i < n`" },
      distractors: [{ en: "Guarantees O(log n) worst-case asymptotic speed", ar: "يضمن تسريع البحث ليصبح لوغاريتمياً O(log n)" }, { en: "Sorts negative entries automatically first", ar: "يرتب الأرقام السالبة تلقائياً بالبداية" }, { en: "Eliminates array memory bounds permanently", ar: "يلغي حدود المصفوفة نهائياً من الذاكرة" }],
      explanation: { en: "Guaranteeing a match lets the loop test only `a[i] != target`, cutting one branch per step (still O(n)).", ar: "ضمان العثور على القيمة يغني عن فحص نهاية المصفوفة بكل دورة لتخفيف تكلفة المقارنة." }
    }
  },

  // 24. unit-binary-search-foundations (+4)
  {
    unitId: "unit-binary-search-foundations",
    item: {
      id: "EXP-BSR-101", domain: "Algorithms", topic: "Searching", subtopic: "Binary Search Mid", difficulty: "medium", type: "debugging", slotIndex: 0,
      codeSnippet: `int mid = (left + right) / 2;`,
      question: { en: "Why do C++/Java/C# engineers prefer `left + (right - left) / 2` instead of `(left + right) / 2`?", ar: "لماذا يفضل المبرمجون كتابة `left + (right - left) / 2` بدلاً من `(left + right) / 2`؟" },
      correct: { en: "Avoids signed 32-bit `int` addition overflow", ar: "يتجنب فيضان جمع `int`" },
      distractors: [{ en: "Cuts binary search steps down to O(1)", ar: "يقلص عدد الخطوات إلى زمن ثابت O(1)" }, { en: "Works cleanly on unsorted input arrays", ar: "يعمل مع المصفوفات غير المرتبة تماماً" }, { en: "Forces floating-point index rounding up", ar: "يجبر القسمة على التقريب للأعلى دوماً" }],
      explanation: { en: "If `left` and `right` exceed `2^30`, `left + right` overflows `INT_MAX`, whereas `right - left` never overflows.", ar: "عندما يتخطى مجموع `left + right` سعة `int` يفيض إلى سالب؛ صيغة الطرح تمنع ذلك تماماً." }
    }
  },
  {
    unitId: "unit-binary-search-foundations",
    item: {
      id: "EXP-BSR-102", domain: "Algorithms", topic: "Searching", subtopic: "Lower Bound", difficulty: "medium", type: "code-output", slotIndex: 1,
      question: { en: "In `arr = [2, 5, 5, 5, 9]`, what index does `lower_bound(target = 5)` return?", ar: "في المصفوفة `[2, 5, 5, 5, 9]`، ما الفهرس الذي ترجعه `lower_bound(5)`؟" },
      correct: { en: "1 (first index >= 5)", ar: "1 (أول >= 5)" },
      distractors: [{ en: "2 (exact middle index)", ar: "الفهرس 2 (موقع المنتصف)" }, { en: "3 (last matching index)", ar: "الفهرس 3 (آخر ظهور)" }, { en: "4 (first index > 5)", ar: "الفهرس 4 (أول > 5)" }],
      explanation: { en: "`lower_bound` finds the leftmost index with `arr[i] >= target`, while `upper_bound` gives the first `> target` (4).", ar: "تعيد `lower_bound` أول موقع يحقق `>= 5` وهو 1، بينما `upper_bound` تعيد أول أكبر وهو 4." }
    }
  },
  {
    unitId: "unit-binary-search-foundations",
    item: {
      id: "EXP-BSR-103", domain: "Algorithms", topic: "Searching", subtopic: "2-Element Infinite Loop", difficulty: "hard", type: "debugging", slotIndex: 2,
      codeSnippet: `while (l < r) {\n  int mid = l + (r - l) / 2; // floors down!\n  if (can(mid)) l = mid;\n  else r = mid - 1;\n}`,
      question: { en: "When `l = 4, r = 5` and `can(4)` is true, what bug strikes this Binary Search?", ar: "عندما يصبح `l = 4, r = 5` وتكون `can(4)` صائبة، ما الخلل في هذا الكود؟" },
      correct: { en: "Infinite loop since `mid == l` stays 4", ar: "حلقة لا نهائية عند 4" },
      distractors: [{ en: "Division by zero inside `(r - l)`", ar: "قسمة على صفر في عبارة `(r - l)`" }, { en: "Automatically returns `5` on exit", ar: "يرجع القيمة `5` مباشرة دون تكرار" }, { en: "Negates `l` into array index `-4`", ar: "يحول المؤشر `l` إلى الفهرس `-4`" }],
      explanation: { en: "`mid` rounds down to `4`, keeping `[l..r]` stuck at `[4..5]`; updating `l = mid` needs ceiling mid `(l + r + 1) / 2`.", ar: "لأن `mid` يقرب للأسفل نحو `l`، إسناد `l = mid` يجمّد المجال؛ يلزم تقريب للأعلى أو حفظ `ans`." }
    }
  },
  {
    unitId: "unit-binary-search-foundations",
    item: {
      id: "EXP-BSR-104", domain: "Algorithms", topic: "Searching", subtopic: "Trace", difficulty: "easy", type: "code-trace", slotIndex: 3,
      question: { en: "On `arr = [10, 20, 30, 40, 50]` searching for `40` with `mid = floor((0+4)/2) = 2`, what becomes the next `[left..right]` range?", ar: "عند البحث عن `40` في `[10, 20, 30, 40, 50]` وأول `mid = 2` (`30`)، ما النطاق التالي؟" },
      correct: { en: "[3..4]", ar: "[3..4]" },
      distractors: [{ en: "[0..1]", ar: "النطاق [0..1]" }, { en: "[0..2]", ar: "النطاق [0..2]" }, { en: "[2..4]", ar: "النطاق [2..4]" }],
      explanation: { en: "`arr[2] = 30 < 40`, so elements `0..2` are eliminated cleanly and `left` advances to `mid + 1 = 3`.", ar: "لأن `30 < 40` يُستبعد النصف الأيسر كاملاً ويبدأ البحث الجديد من `mid + 1 = 3` حتى `4`." }
    }
  },

  // 25. unit-binary-search-on-answer (+5)
  {
    unitId: "unit-binary-search-on-answer",
    item: {
      id: "EXP-BOA-101", domain: "Algorithms", topic: "Searching", subtopic: "Binary Search on Answer", difficulty: "medium", type: "concept", slotIndex: 0,
      question: { en: "What property must predicate `ok(x)` satisfy to allow Binary Search on Answer?", ar: "ما الشرط الرياضي الذي يجب توفره في الدالة الاختبارية `ok(x)` لتطبيق البحث الثنائي على الإجابة؟" },
      correct: { en: "Monotonicity (FFF...TTT or TTT...FFF)", ar: "الرتابة (FFF...TTT)" },
      distractors: [{ en: "Oscillating alternating truth values", ar: "تذبذب متكرر عشوائي بين صائب وخاطئ" }, { en: "Strictly prime integer answers only", ar: "أعداد أولية حصرية لجميع الإجابات" }, { en: "Quadratic O(n^2) verification cost", ar: "كلفة تحقق تربيعية O(n^2) بكل مرة" }],
      explanation: { en: "Once all values above (or below) a threshold share one truth outcome, Binary Search isolates the exact boundary.", ar: "بمجرد وجود حد فاصل تبقى القيم بعده صائبة باستمرار، يمكننا تقليص المجال بحثاً عن أول قيمة." }
    }
  },
  {
    unitId: "unit-binary-search-on-answer",
    item: {
      id: "EXP-BOA-102", domain: "Algorithms", topic: "Searching", subtopic: "Search Range Bounds", difficulty: "medium", type: "debugging", slotIndex: 1,
      question: { en: "In minimizing truck capacity to ship boxes `[w_1..w_n]` within `D` days, what is the tightest valid lower bound `lo`?", ar: "لتصغير سعة الشاحنة لنقل صناديق `[w_1..w_n]` خلال `D` أيام، ما أضيق حد أدنى صحيح لـ `lo`؟" },
      correct: { en: "max(weights)", ar: "max(weights)" },
      distractors: [{ en: "0 weight capacity", ar: "سعة ابتدائية صفر كحد أدنى" }, { en: "sum(weights) total", ar: "مجموع الأوزان كلها sum(weights)" }, { en: "min(weights) only", ar: "أقل وزن بين الصناديق min(weights)" }],
      explanation: { en: "Since boxes cannot be split, capacity must fit at least the single heaviest box (`max(weights)`), up to `sum(weights)`.", ar: "يجب أن تتسع الشاحنة لأثقل صندوق دون تجزئته، لذا يبدأ النطاق من أكبر وزن." }
    }
  },
  {
    unitId: "unit-binary-search-on-answer",
    item: {
      id: "EXP-BOA-103", domain: "Algorithms", topic: "Searching", subtopic: "Real-Valued BS", difficulty: "hard", type: "concept", slotIndex: 2,
      question: { en: "Why run a fixed `for (int it = 0; it < 100; it++)` loop instead of `while (r - l > 1e-9)` on floats?", ar: "لماذا نفضل 100 تكرار ثابت على `while (r - l > 1e-9)` مع الأعداد العشرية (double)؟" },
      correct: { en: "Prevents infinite loops at double precision limit", ar: "يتجنب التوقف عند حد double" },
      distractors: [{ en: "Increases IEEE-754 mantissa beyond 128 bits", ar: "يزيد دقة Mantissa فوق 128 بت تلقائياً" }, { en: "Turns floating search into integer counting sort", ar: "يحول البحث العشري لفرز بالعد الفوري" }, { en: "Computes square roots faster than hardware ALU", ar: "أسرع من العتاد لحساب الجذور التربيعية" }],
      explanation: { en: "At extreme magnitudes like `10^9`, adjacent `double` values step by `> 1e-9`, so `r - l` never shrinks below epsilon.", ar: "عند الأرقام الكبيرة تتباعد أرقام `double` بأكبر من `1e-9` مما يُعلق `while`؛ الحل 80-100 دورة ثابتة." }
    }
  },
  {
    unitId: "unit-binary-search-on-answer",
    item: {
      id: "EXP-BOA-104", domain: "Algorithms", topic: "Searching", subtopic: "Complexity", difficulty: "easy", type: "complexity", slotIndex: 3,
      question: { en: "If checking `ok(x)` takes `O(n)` and answer values lie in `[0..M]`, what is total runtime?", ar: "إذا استغرق فحص `ok(x)` زمناً قدره `O(n)` ومجال الإجابة `[0..M]`، ما الزمن الكلي؟" },
      correct: { en: "O(n log M)", ar: "O(n log M)" },
      distractors: [{ en: "O(n * M)", ar: "O(n * M)" }, { en: "O(n + log M)", ar: "O(n + log M)" }, { en: "O(M log n)", ar: "O(M log n)" }],
      explanation: { en: "Binary search triggers `log2(M)` evaluations, and each evaluation runs in `O(n)`.", ar: "يتكرر اختبار O(n) بمعدل `log M` مرة ليصبح الناتج الكلي O(n log M)." }
    }
  },
  {
    unitId: "unit-binary-search-on-answer",
    item: {
      id: "EXP-BOA-105", domain: "Algorithms", topic: "Searching", subtopic: "Maximize Minimum", difficulty: "medium", type: "scenario", slotIndex: 0,
      question: { en: "When maximizing the minimum distance `d` between `K` placed cows in sorted stalls, which direction moves if placement succeeds?", ar: "عند تعظيم أصغر مسافة `d` لتوزيع `K` عناصر بأماكن مرتبة، كيف يتحرك البحث إذا نجح الاختبار عند `mid`؟" },
      correct: { en: "Save `mid` and try larger (`lo = mid + 1`)", ar: "احفظ `mid` وجرب `lo = mid + 1`" },
      distractors: [{ en: "Shrink search space lower (`hi = mid - 1`)", ar: "قلّص المجال نحو القيم الأقل `hi = mid - 1`" }, { en: "Return immediately on the very first try", ar: "أرجع النتيجة من المحاولة الأولى فوراً دون إكمال" }, { en: "Resort stalls descending per step", ar: "أعد ترتيب الأماكن تنازلياً بكل دورة" }],
      explanation: { en: "Since we want the MAXIMUM feasible `d`, if `mid` is achievable then anything larger might also work.", ar: "لأننا نطلب أكبر قيمة صالحة، نجاح `mid` يدفعنا للبحث في النصف الأعلى الأكبر." }
    }
  },

  // 26. unit-greedy-foundations (+5)
  {
    unitId: "unit-greedy-foundations",
    item: {
      id: "EXP-GRD-101", domain: "Algorithms", topic: "Greedy", subtopic: "Activity Selection", difficulty: "medium", type: "concept", slotIndex: 1,
      question: { en: "To schedule the maximum count of non-overlapping intervals, which key must you sort intervals by first?", ar: "لجدولة أكبر عدد ممكن من الفترات غير المتداخلة، بأي مفتاح يجب ترتيب الفترات أولاً؟" },
      correct: { en: "Earliest finish time ascending", ar: "وقت الانتهاء الأبكر تصاعدياً" },
      distractors: [{ en: "Longest interval duration descending", ar: "الأطول مدةً تنازلياً" }, { en: "Latest finish time descending", ar: "الأبعد انتهاءً تنازلياً" }, { en: "Earliest start time without tiebreaks", ar: "الأبكر بدايةً دون النظر للنهاية" }],
      explanation: { en: "Finishing earliest leaves maximum remaining room for subsequent intervals; an exchange argument proves optimality.", ar: "اختيار النشاط المنتهي أبكر يترك أكبر مساحة ممكنة لبقية الأنشطة." }
    }
  },
  {
    unitId: "unit-greedy-foundations",
    item: {
      id: "EXP-GRD-102", domain: "Algorithms", topic: "Greedy", subtopic: "Counterexample", difficulty: "medium", type: "debugging", slotIndex: 2,
      question: { en: "Why does choosing highest-coin-first fail for minimum coin count with denominations `[1, 3, 4]` and target `6`?", ar: "لماذا تفشل الخوارزمية الجشعة باختيار أكبر عملة عند حساب أقل عملات للمبلغ `6` بفئات `[1, 3, 4]`؟" },
      correct: { en: "Greedy picks `4+1+1` (3), missing `3+3` (2)", ar: "تأخذ `4+1+1` وتفوت `3+3`" },
      distractors: [{ en: "Greedy refuses odd denominations like 3", ar: "الخوارزمية الجشعة ترفض العملات الفردية مثل 3" }, { en: "Dynamic programming requires sorted primes", ar: "البرمجة الديناميكية تتطلب أعداداً أولية مرتبة" }, { en: "Sum `3 + 3` exceeds 6 in binary", ar: "المجموع `3 + 3` يتجاوز القيمة 6 ثنائياً" }],
      explanation: { en: "Arbitrary coin sets lack the greedy-choice property; DP computes the optimal 2-coin solution `3 + 3`.", ar: "أخذ 4 أولاً يترك 2 فتحتاج 3 عملات، بينما اختيار 3 مرتين يحقق الحل الأمثل بعملتين (تُحل بـ DP)." }
    }
  },
  {
    unitId: "unit-greedy-foundations",
    item: {
      id: "EXP-GRD-103", domain: "Algorithms", topic: "Greedy", subtopic: "Fractional Knapsack", difficulty: "easy", type: "concept", slotIndex: 3,
      question: { en: "Why does Greedy work optimally on Fractional Knapsack but fail on 0/1 Knapsack?", ar: "لماذا ينجح الحل الجشع في مسألة الحقيبة الكسرية (Fractional Knapsack) ويفشل في `0/1 Knapsack`؟" },
      correct: { en: "Splits fill remaining weight by best value/weight", ar: "التجزئة تملأ الوزن بأعلى نسبة" },
      distractors: [{ en: "Fractional allows infinite capacity weight", ar: "الكسرية تمنح سعة وزن لا نهائية دائماً" }, { en: "0/1 forbids positive item profits", ar: "حقيبة 0/1 تمنع القيم الربحية الموجبة" }, { en: "Greedy runs slower than O(2^n)", ar: "الخوارزمية الجشعة أبطأ من O(2^n) دائماً" }],
      explanation: { en: "When items can be cut arbitrarily, taking highest value-per-unit-weight continuously guarantees optimal fill.", ar: "إمكانية أخذ جزء من العنصر تمنع إهدار السعة المتبقية على عكس العناصر غير القابلة للتجزئة." }
    }
  },
  {
    unitId: "unit-greedy-foundations",
    item: {
      id: "EXP-GRD-104", domain: "Algorithms", topic: "Greedy", subtopic: "Huffman Coding", difficulty: "medium", type: "concept", slotIndex: 0,
      question: { en: "Which data structure efficiently repeatedly pops the two lowest-frequency trees in Huffman Coding?", ar: "ما هيكل البيانات الأمثل لاختيار الشجرتين الأقل تكراراً باستمرار في ترميز هوفمان؟" },
      correct: { en: "Min Priority Queue (Min-Heap)", ar: "رتل الأولوية الأصغر Min-Heap" },
      distractors: [{ en: "LIFO Array Stack only", ar: "مكدس المصفوفات الخطية LIFO فقط" }, { en: "Unordered Hash Table only", ar: "جدول التجزئة غير المرتب HashMap" }, { en: "Doubly Linked Ring Queue", ar: "الرتل الدائري المترابط المزدوج" }],
      explanation: { en: "A Min-Heap pulls the two smallest frequencies and inserts their merged parent in `O(log k)` per step.", ar: "تتيح Min-Heap استخراج أصغر تكرارين وإدراج دمجهما بزمن `O(log k)`." }
    }
  },
  {
    unitId: "unit-greedy-foundations",
    item: {
      id: "EXP-GRD-105", domain: "Algorithms", topic: "Greedy", subtopic: "Exchange Argument", difficulty: "hard", type: "concept", slotIndex: 1,
      question: { en: "What is the goal of an Exchange Argument proof for a greedy algorithm?", ar: "ما الهدف من برهان حجة الاستبدال (Exchange Argument) للخوارزميات الجشعة؟" },
      correct: { en: "Shows optimal solution transforms cleanly without loss", ar: "يثبت تحويل الحل الأمثل بلا خسارة" },
      distractors: [{ en: "Swaps variable pointers inside CPU L1", ar: "تبديل مؤشرات المتغيرات داخل ذاكرة L1" }, { en: "Checks if input is already hash-sorted", ar: "فحص ما إذا كانت المدخلات مرتبة بالتجزئة" }, { en: "Measures actual wall-clock milliseconds", ar: "قياس الزمن الفعلي للتنفيذ بالملي ثانية" }],
      explanation: { en: "By swapping the first differing choice in an assumed optimal schedule with the greedy choice without worsening cost, optimality follows.", ar: "إثبات أن استبدال أول خيار مختلف بخيار الجشع لا يفسد الأمثلية يضمن صحة الخوارزمية." }
    }
  },

  // 27. unit-dp-foundations (+2)
  {
    unitId: "unit-dp-foundations",
    item: {
      id: "EXP-DP-101", domain: "Algorithms", topic: "Dynamic Programming", subtopic: "0/1 Knapsack Loop", difficulty: "hard", type: "debugging", slotIndex: 2,
      codeSnippet: `for (int i = 0; i < n; i++)\n  for (int w = W; w >= wt[i]; w--)\n    dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);`,
      question: { en: "Why MUST the weight loop `w` run backward (`W` down to `wt[i]`) in 1D 0/1 Knapsack?", ar: "لماذا يجب أن تدور حلقة الوزن `w` تنازلياً في 1D 0/1 Knapsack؟" },
      correct: { en: "Prevents reusing item `i` multiple times", ar: "يمنع تكرار استخدام العنصر `i`" },
      distractors: [{ en: "Backward loops run twice faster in ALU", ar: "الحلقات التنازلية أسرع بمرتين بالمعالج دوماً" }, { en: "Prevents `dp` indices from reaching zero", ar: "يمنع وصول فهارس الجدول `dp` إلى الصفر" }, { en: "Turns 0/1 Knapsack into BFS graph walk", ar: "يحول مسألة الحقيبة إلى مسح عرضي BFS" }],
      explanation: { en: "Running forward reads already-updated `dp[w - wt[i]]` from the current item `i` (Unbounded Knapsack); backward reads prior row values cleanly.", ar: "الدوران التصاعدي يقرأ قيمة محدَّثة بنفس العنصر (تكرار لا نهائي)، بينما التنازلي يقرأ فقط قيم العناصر السابقة." }
    }
  },
  {
    unitId: "unit-dp-foundations",
    item: {
      id: "EXP-DP-102", domain: "Algorithms", topic: "Dynamic Programming", subtopic: "Core Properties", difficulty: "easy", type: "concept", slotIndex: 3,
      question: { en: "Which two structural properties make a problem solvable via Dynamic Programming?", ar: "ما الخاصيتان الهيكليتان اللتان تجعلان المسألة قابلة للحل بالبرمجة الديناميكية؟" },
      correct: { en: "Overlapping subproblems & optimal substructure", ar: "تداخل فرعي وأمثلية فرعية" },
      distractors: [{ en: "Random shuffling & global mutable state", ar: "الخلط العشوائي والمتغيرات العامة المتغيرة" }, { en: "Strict unweighted cycles & DFS trees", ar: "دورات غير موزونة مع أشجار DFS" }, { en: "Constant O(1) space & no recursion", ar: "مساحة ثابتة تماماً دون استدعاء عودي" }],
      explanation: { en: "Optimal answers build from optimal sub-answers, and caching repeated states collapses exponential trees into polynomial tables.", ar: "تتكرر نفس الحالات الفرعية مراراً ويبنى الحل الأمثل من حلول فرعية مثلى." }
    }
  },

  // 28. unit-graph-traversal-bfs-dfs (+3)
  {
    unitId: "unit-graph-traversal-bfs-dfs",
    item: {
      id: "EXP-GTR-101", domain: "Algorithms", topic: "Graph Algorithms", subtopic: "Algorithm Selection", difficulty: "easy", type: "scenario", slotIndex: 0,
      question: { en: "All graph edges have positive weights from `1` to `50`. Which single-source shortest-path algorithm fits best?", ar: "جميع حواف الرسم البياني لها أوزان موجبة من `1` إلى `50`. أي خوارزمية أقصر مسار هي الأنسب؟" },
      correct: { en: "Dijkstra with Min Priority Queue", ar: "ديكسترا (Dijkstra) مع Min-Heap" },
      distractors: [{ en: "Standard unweighted BFS queue alone", ar: "البحث العرضي BFS وحده دون مراعاة الأوزان" }, { en: "Floyd-Warshall O(V^3) on V = 10^5", ar: "فلويد وارشال O(V^3) لمئة ألف رأس دفعة واحدة" }, { en: "Binary search over unsorted edges", ar: "بحث ثنائي مباشر على حواف غير مرتبة" }],
      explanation: { en: "With strictly non-negative edge weights, Priority-Queue Dijkstra finds shortest distances in `O((V + E) log V)`.", ar: "مع عدم وجود أوزان سالبة، تحل ديكسترا المسألة بكفاءة `O((V + E) log V)`." }
    }
  },
  {
    unitId: "unit-graph-traversal-bfs-dfs",
    item: {
      id: "EXP-GTR-102", domain: "Algorithms", topic: "Graph Algorithms", subtopic: "Dijkstra Stale Entries", difficulty: "hard", type: "debugging", slotIndex: 1,
      codeSnippet: `auto [d, u] = pq.top(); pq.pop();\nif (d > dist[u]) continue;`,
      question: { en: "Why is the guard `if (d > dist[u]) continue;` critical in lazy-deletion Dijkstra?", ar: "لماذا يُعد الشرط `if (d > dist[u]) continue;` ضرورياً جداً في تنفيذ ديكسترا؟" },
      correct: { en: "Skips outdated worse distances cleanly", ar: "يتجاهل النسخ القديمة الأبطأ" },
      distractors: [{ en: "Allows negative edge cycles dynamically", ar: "يسمح بقبول دورات الأوزان السالبة بالرسم" }, { en: "Prevents `pq.top()` from popping strings", ar: "يمنع قراءة النصوص البرمجية من رتل الأولوية" }, { en: "Sorts edges by vertex index descending", ar: "يرتب الحواف تنازلياً حسب رقم العقدة دوماً" }],
      explanation: { en: "Because older entries aren't deleted from the heap upon relaxation, dropping stale entries guarantees each node expands once efficiently.", ar: "عندما نجد مساراً أقصر لـ `u` تظل النسخة القديمة بالـ Heap، لذا نتجاهلها عند خروجها لتفادي O(V*E)." }
    }
  },
  {
    unitId: "unit-graph-traversal-bfs-dfs",
    item: {
      id: "EXP-GTR-103", domain: "Algorithms", topic: "Graph Algorithms", subtopic: "Kruskal MST", difficulty: "medium", type: "concept", slotIndex: 2,
      question: { en: "In Kruskal's Minimum Spanning Tree algorithm, which structure detects in ~O(1) if adding sorted edge `(u, v)` creates a cycle?", ar: "في خوارزمية كروسكال لشجرة الامتداد الصغرى، ما الهيكل الذي يتحقق سريعاً إن كانت الحافة تصنع دورة؟" },
      correct: { en: "Disjoint Set Union (Union-Find)", ar: "المجموعات المنفصلة (DSU)" },
      distractors: [{ en: "Full BFS traversal per candidate edge", ar: "تشغيل بحث عرضي BFS كامل عند كل حافة" }, { en: "Adjacency matrix determinant check", ar: "حساب محدّد مصفوفة التجاور بالرياضيات" }, { en: "Two-pointer binary search window", ar: "نافذة المؤشرين والبحث الثنائي المتكرر" }],
      explanation: { en: "If `find(u) == find(v)` in DSU, `u` and `v` are already connected, so adding `(u, v)` forms a cycle and is skipped.", ar: "إذا كان `find(u) == find(v)` فالعقدتان متصلتان مسبقاً وإضافة الحافة ستصنع دورة." }
    }
  }
];

export const PART2_QUESTIONS: AssessmentQuestion[] = SPECS.map((s) => buildExpandedQuestion(s.item));

export const PART2_UNIT_MAP: Record<string, string[]> = SPECS.reduce((acc, s) => {
  (acc[s.unitId] = acc[s.unitId] || []).push(s.item.id);
  return acc;
}, {} as Record<string, string[]>);
