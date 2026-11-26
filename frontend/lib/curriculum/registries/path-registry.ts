import { LearningPath } from "../schema/path";

export const PATH_CATEGORIES: Record<string, string> = {
  "pre-programming": "Foundations",
  "programming-fundamentals": "Foundations",
  "object-oriented-programming": "Core Computer Science",
  "discrete-mathematics": "Core Computer Science",
  "data-structures": "Core Computer Science",
  "algorithms": "Core Computer Science",
  "competitive-programming": "Applied Specializations",
  "databases": "Applied Specializations",
  "systems-and-engineering": "Applied Specializations"
};

export const LEARNING_PATHS: Record<string, LearningPath> = {
  "pre-programming": {
    "id": "pre-programming",
    "title": {
      "en": "Pre-Programming Foundations",
      "ar": "أساسيات ما قبل البرمجة"
    },
    "description": {
      "en": "Understand computer hardware, binary data encoding, how the internet operates, and how source code executes before writing code.",
      "ar": "افهم مكونات الحاسوب، تمثيل البيانات الثنائية، كيف يعمل الإنترنت، وكيف يتحول الكود المصدري إلى تعليمات ينفذها المعالج."
    },
    "targetAudience": {
      "en": "Absolute beginners starting from zero technical background",
      "ar": "المبتدئون تماماً بدون أي خلفية تقنية مسبقة"
    },
    "prerequisites": [],
    "recommendedNextPaths": [
      "programming-fundamentals",
      "discrete-mathematics"
    ],
    "modules": [
      {
        "id": "module-pre-hardware",
        "title": {
          "en": "Computer Hardware & Architecture",
          "ar": "عتاد الحاسوب والمعمارية"
        },
        "description": {
          "en": "CPU instruction pipeline, volatile RAM vs SSD, I/O devices, and Operating Systems.",
          "ar": "دورة عمل المعالج، الذاكرة العشوائية RAM مقابل التخزين، وحدات الإدخال والإخراج، ونظام التشغيل."
        },
        "units": [
          {
            "unitId": "unit-computer-basics-foundations"
          }
        ]
      },
      {
        "id": "module-pre-data",
        "title": {
          "en": "Binary, Data Representation & Boolean Logic",
          "ar": "النظام الثنائي وتمثيل البيانات والمنطق"
        },
        "description": {
          "en": "Bits, bytes, number systems conversion, ASCII/Unicode encoding, and digital logic gates.",
          "ar": "البتات والبايتات، أنظمة العد، ترميز الحروف ASCII و Unicode، والبوابات المنطقية."
        },
        "units": [
          {
            "unitId": "unit-data-representation-foundations"
          },
          {
            "unitId": "unit-binary-arithmetic-encoding"
          }
        ]
      },
      {
        "id": "module-pre-programming",
        "title": {
          "en": "The Internet & How Code Executes",
          "ar": "الإنترنت وآلية تنفيذ البرامج"
        },
        "description": {
          "en": "Client-Server model, DNS/HTTP basics, compilers vs interpreters, and machine code.",
          "ar": "نموذج العميل والخادم، أساسيات DNS و HTTP، المترجمات والمفسرات، وكود الآلة."
        },
        "units": [
          {
            "unitId": "unit-internet-web-basics"
          },
          {
            "unitId": "unit-programming-concepts-foundations"
          }
        ]
      }
    ]
  },
  "programming-fundamentals": {
    "id": "programming-fundamentals",
    "title": {
      "en": "Programming Fundamentals",
      "ar": "أساسيات البرمجة"
    },
    "description": {
      "en": "Build fluent problem-solving skills with variables, types, conditions, loops, modular functions, recursion, arrays, and memory layout.",
      "ar": "أتقن اللبنات الأساسية لكتابة البرمجيات: المتغيرات والأنواع، الشروط، الحلقات، الدوال، العودية، المصفوفات، وإدارة الذاكرة."
    },
    "targetAudience": {
      "en": "Aspiring engineers learning core programming constructs",
      "ar": "الطلاب الطامحون لإتقان أساسيات البرمجة وحل المشكلات"
    },
    "prerequisites": [
      {
        "enforcement": "recommended",
        "logicalOperator": "all",
        "conditions": [
          {
            "type": "path",
            "targetId": "pre-programming"
          }
        ]
      }
    ],
    "recommendedNextPaths": [
      "object-oriented-programming",
      "data-structures",
      "algorithms",
      "databases"
    ],
    "modules": [
      {
        "id": "module-pf-core-syntax",
        "title": {
          "en": "Variables, Types & Decision Logic",
          "ar": "المتغيرات والأنواع واتخاذ القرار"
        },
        "description": {
          "en": "Data types, type casting, operators, conditions, and short-circuit logic.",
          "ar": "أنواع البيانات، التحويل، العوامل، العبارات الشرطية، والتقييم المختصر."
        },
        "units": [
          {
            "unitId": "unit-variables-foundations"
          },
          {
            "unitId": "unit-conditions-foundations"
          }
        ]
      },
      {
        "id": "module-pf-iteration",
        "title": {
          "en": "Repetition, Functions & Scope",
          "ar": "التكرار والدوال والنطاق"
        },
        "description": {
          "en": "Loops, iteration invariants, modular functions, parameters, and stack frames.",
          "ar": "حلقات التكرار، ثوابت الحلقات، الدوال المعيارية، المعلمات، وإطارات المكدس."
        },
        "units": [
          {
            "unitId": "unit-loops-foundations"
          },
          {
            "unitId": "unit-functions-foundations"
          }
        ]
      },
      {
        "id": "module-pf-memory-data",
        "title": {
          "en": "Memory, Recursion & Contiguous Arrays",
          "ar": "الذاكرة والعودية والمصفوفات"
        },
        "description": {
          "en": "Stack vs Heap allocation, base-case recursion, and shared Array/String foundations.",
          "ar": "المكدس مقابل الكومة، أساسيات العودية، والمصفوفات المشتركة."
        },
        "units": [
          {
            "unitId": "unit-memory-foundations"
          },
          {
            "unitId": "unit-recursion-foundations"
          },
          {
            "unitId": "unit-arrays-foundations"
          }
        ]
      }
    ]
  },
  "object-oriented-programming": {
    "id": "object-oriented-programming",
    "title": {
      "en": "Object-Oriented Programming & Design",
      "ar": "البرمجة كائنية التوجه والتصميم"
    },
    "description": {
      "en": "Design scalable software systems with encapsulation, inheritance, dynamic polymorphism, interfaces, and SOLID architecture.",
      "ar": "صمّم أنظمة برمجية نظيفة وقابلة للتوسع عبر التغليف، الوراثة، تعدد الأشكال، الواجهات، ومبادئ SOLID."
    },
    "targetAudience": {
      "en": "Learners advancing from procedural functions to modular OOP architecture",
      "ar": "المبرمجون المنتقلون من البرمجة الإجرائية إلى بناء الأنظمة الكائنية"
    },
    "prerequisites": [
      {
        "enforcement": "hard_lock",
        "logicalOperator": "all",
        "conditions": [
          {
            "type": "path",
            "targetId": "programming-fundamentals"
          }
        ]
      }
    ],
    "recommendedNextPaths": [
      "data-structures",
      "systems-and-engineering"
    ],
    "modules": [
      {
        "id": "module-oop-basics",
        "title": {
          "en": "Classes, Objects & Encapsulation",
          "ar": "الفئات والكائنات والتغليف"
        },
        "description": {
          "en": "Blueprints, constructors, access modifiers, and invariant protection.",
          "ar": "القوالب، دوال البناء، محددات الوصول، وحماية حالة الكائن."
        },
        "units": [
          {
            "unitId": "unit-oop-classes-encapsulation"
          }
        ]
      },
      {
        "id": "module-oop-polymorphism",
        "title": {
          "en": "Inheritance, Abstraction & Dynamic Dispatch",
          "ar": "الوراثة والتجريد وتعدد الأشكال"
        },
        "description": {
          "en": "Is-a hierarchies, abstract classes, interfaces, method overriding, and vtables.",
          "ar": "شجرة الوراثة، الفئات المجردة، الواجهات، إعادة تعريف الدوال، وربط وقت التشغيل."
        },
        "units": [
          {
            "unitId": "unit-oop-inheritance-polymorphism"
          }
        ]
      },
      {
        "id": "module-oop-architecture",
        "title": {
          "en": "SOLID Principles & Design Patterns",
          "ar": "مبادئ SOLID وأنماط التصميم"
        },
        "description": {
          "en": "Shared architectural craft across OOP and Software Engineering.",
          "ar": "مبادئ الهندسة النظيفة المشتركة بين OOP وهندسة البرمجيات."
        },
        "units": [
          {
            "unitId": "unit-se-design-principles"
          }
        ]
      }
    ]
  },
  "discrete-mathematics": {
    "id": "discrete-mathematics",
    "title": {
      "en": "Discrete Mathematics for CS",
      "ar": "الرياضيات المتقطعة لعلوم الحاسوب"
    },
    "description": {
      "en": "Master formal logic, proofs, sets, functions, combinatorics, recurrences, and mathematical graph foundations powering algorithms.",
      "ar": "أتقن المنطق الرياضي، البراهين، المجموعات، التباديل والتوافيق، العلاقات التكرارية، ونظرية الرسوم البيانية الأساسية للخوارزميات."
    },
    "targetAudience": {
      "en": "CS students strengthening mathematical reasoning behind code",
      "ar": "طلاب علوم الحاسوب الساعون لبناء الأساس الرياضي المتين"
    },
    "prerequisites": [
      {
        "enforcement": "recommended",
        "logicalOperator": "all",
        "conditions": [
          {
            "type": "path",
            "targetId": "pre-programming"
          }
        ]
      }
    ],
    "recommendedNextPaths": [
      "algorithms",
      "competitive-programming",
      "databases"
    ],
    "modules": [
      {
        "id": "module-dm-logic",
        "title": {
          "en": "Propositional Logic, Predicates & Boolean Algebra",
          "ar": "المنطق القضوي والمحمولات والجبر البوليني"
        },
        "description": {
          "en": "Truth tables, De Morgan's laws, quantifiers ∀/∃, and rules of inference.",
          "ar": "جداول الصدق، قوانين دي مورغان، المكممات، وقواعد الاستدلال."
        },
        "units": [
          {
            "unitId": "unit-dm-propositional-logic"
          }
        ]
      },
      {
        "id": "module-dm-sets-proofs",
        "title": {
          "en": "Sets, Relations, Functions & Mathematical Proofs",
          "ar": "المجموعات والعلاقات والدوال والبراهين الرياضية"
        },
        "description": {
          "en": "Power sets, equivalence/partial orders, bijections, contradiction, and induction.",
          "ar": "مجموعات القوى، علاقات التكافؤ والترتيب، التقابل، التناقض، والاستقراء الرياضي."
        },
        "units": [
          {
            "unitId": "unit-dm-sets-relations-proofs"
          }
        ]
      },
      {
        "id": "module-dm-counting-graphs",
        "title": {
          "en": "Counting, Recurrences & Discrete Graph Theory",
          "ar": "العدّ والتوافيق والعلاقات التكرارية والرسوم"
        },
        "description": {
          "en": "Permutations, combinations, Pigeonhole principle, Master Theorem intuition, and graphs.",
          "ar": "التباديل والتوافيق، مبدأ برج الحمام، تحليل العلاقات التكرارية، وأساسيات الرسوم."
        },
        "units": [
          {
            "unitId": "unit-dm-counting-recurrences"
          },
          {
            "unitId": "unit-graphs-foundations"
          }
        ]
      }
    ]
  },
  "data-structures": {
    "id": "data-structures",
    "title": {
      "en": "Data Structures",
      "ar": "هياكل البيانات"
    },
    "description": {
      "en": "Organize, index, and retrieve data efficiently using arrays, linked lists, stacks, queues, hash tables, balanced trees, heaps, and graphs.",
      "ar": "نظّم البيانات وخزنها بكفاءة فائقة باستخدام المصفوفات، القوائم المترابطة، المكادس والطوابير، جداول التجزئة، الأشجار، والرسوم البيانية."
    },
    "targetAudience": {
      "en": "Developers building algorithmic engineering speed and interviews",
      "ar": "المطورون الساعون لإتقان هياكل البيانات والمقابلات التقنية"
    },
    "prerequisites": [
      {
        "enforcement": "hard_lock",
        "logicalOperator": "all",
        "conditions": [
          {
            "type": "path",
            "targetId": "programming-fundamentals"
          }
        ]
      }
    ],
    "recommendedNextPaths": [
      "algorithms",
      "databases",
      "competitive-programming"
    ],
    "modules": [
      {
        "id": "module-ds-linear",
        "title": {
          "en": "Linear Data Structures",
          "ar": "هياكل البيانات الخطية"
        },
        "description": {
          "en": "Shared Array foundations alongside singly and doubly Linked Lists.",
          "ar": "المصفوفات المتجاورة المشتركة والقوائم المترابطة بمؤشراتها."
        },
        "units": [
          {
            "unitId": "unit-arrays-foundations"
          },
          {
            "unitId": "unit-linked-lists-foundations"
          }
        ]
      },
      {
        "id": "module-ds-constrained",
        "title": {
          "en": "Stacks, Queues & Hash Tables",
          "ar": "المكادس والطوابير وجداول التجزئة"
        },
        "description": {
          "en": "LIFO stacks, FIFO/circular queues, and O(1) amortized associative hash lookups.",
          "ar": "المكدس LIFO، الطوابير الدائرية FIFO، وجداول التجزئة Hash Tables."
        },
        "units": [
          {
            "unitId": "unit-stacks-queues-foundations"
          },
          {
            "unitId": "unit-hash-tables-foundations"
          }
        ]
      },
      {
        "id": "module-ds-hierarchical",
        "title": {
          "en": "Trees, Heaps, Tries & Graphs",
          "ar": "الأشجار والكومات والتراي والرسوم البيانية"
        },
        "description": {
          "en": "BST invariants, AVL rotations, heaps, prefix tries, and shared graph models.",
          "ar": "شجرة البحث الثنائية، الكومات Heaps، التراي Tries، وتمثيل الرسوم البيانية."
        },
        "units": [
          {
            "unitId": "unit-trees-foundations"
          },
          {
            "unitId": "unit-graphs-foundations"
          }
        ]
      }
    ]
  },
  "algorithms": {
    "id": "algorithms",
    "title": {
      "en": "Algorithms",
      "ar": "الخوارزميات"
    },
    "description": {
      "en": "Analyze complexity with Big-O and master Searching, Sorting, Recursion, Greedy algorithms, Dynamic Programming, and Graph traversals/shortest paths.",
      "ar": "حلّل تعقيد الخوارزميات وأتقن البحث والفرز والعودية والخوارزميات الجشعة والبرمجة الديناميكية وخوارزميات الرسوم البيانية."
    },
    "targetAudience": {
      "en": "Engineers preparing for technical interviews and high-efficiency computation",
      "ar": "المهندسون المستعدون للمقابلات التقنية وتحسين أداء الأنظمة"
    },
    "prerequisites": [
      {
        "enforcement": "hard_lock",
        "logicalOperator": "all",
        "conditions": [
          {
            "type": "path",
            "targetId": "programming-fundamentals"
          }
        ]
      }
    ],
    "recommendedNextPaths": [
      "competitive-programming",
      "systems-and-engineering"
    ],
    "modules": [
      {
        "id": "module-algo-complexity",
        "title": {
          "en": "Asymptotic Complexity & Analysis",
          "ar": "التحليل المقارب وتعقيد الوقت والمساحة"
        },
        "description": {
          "en": "Shared Big-O time/space complexity fundamentals.",
          "ar": "تحليل O الكبير ومفاضلات الوقت والذاكرة."
        },
        "units": [
          {
            "unitId": "unit-complexity-foundations"
          }
        ]
      },
      {
        "id": "module-algo-search-sort",
        "title": {
          "en": "Searching & Sorting Algorithms",
          "ar": "خوارزميات البحث والفرز"
        },
        "description": {
          "en": "Linear scan, shared Binary Search foundations, and comparison/linear sorts.",
          "ar": "البحث الخطي، البحث الثنائي الأساسي، وخوارزميات الفرز السريعة."
        },
        "units": [
          {
            "unitId": "unit-linear-search-foundations"
          },
          {
            "unitId": "unit-binary-search-foundations"
          },
          {
            "unitId": "unit-sorting-foundations"
          }
        ]
      },
      {
        "id": "module-algo-paradigms",
        "title": {
          "en": "Recursion, Greedy & Dynamic Programming",
          "ar": "العودية والخوارزميات الجشعة والبرمجة الديناميكية"
        },
        "description": {
          "en": "Shared recursion/backtracking, optimal greedy choices, and DP memoization/tabulation.",
          "ar": "العودية والتراجع، الاختيار الجشع، والبرمجة الديناميكية."
        },
        "units": [
          {
            "unitId": "unit-recursion-foundations"
          },
          {
            "unitId": "unit-greedy-foundations"
          },
          {
            "unitId": "unit-dp-foundations"
          }
        ]
      },
      {
        "id": "module-algo-graphs",
        "title": {
          "en": "Graph Traversals & Shortest Paths",
          "ar": "عبور الرسوم البيانية وأقصر المسارات"
        },
        "description": {
          "en": "Shared graph foundations plus BFS, DFS, Dijkstra, Bellman-Ford, and MSTs.",
          "ar": "أساسيات الرسوم المشتركة مع BFS و DFS وخوارزميات أقصر مسار."
        },
        "units": [
          {
            "unitId": "unit-graphs-foundations"
          },
          {
            "unitId": "unit-graph-traversal-bfs-dfs"
          }
        ]
      }
    ]
  },
  "competitive-programming": {
    "id": "competitive-programming",
    "title": {
      "en": "Competitive Programming",
      "ar": "البرمجة التنافسية"
    },
    "description": {
      "en": "High-speed contest problem solving (Codeforces/AtCoder/ICPC) extending foundational units with Two Pointers, Prefix Sums, Binary Search on Answer, Number Theory, Segment Trees & DSU.",
      "ar": "احتراف مسابقات البرمجة بامتداد طبيعي للأساسيات عبر المؤشرين ومجاميع السوابق والبحث على الإجابة ونظرية الأعداد وأشجار المقاطع و DSU."
    },
    "targetAudience": {
      "en": "Contest competitors and advanced algorithmic problem solvers",
      "ar": "المتسابقون في ICPC و Codeforces ومحبو حل المسائل المتقدمة"
    },
    "prerequisites": [
      {
        "enforcement": "hard_lock",
        "logicalOperator": "all",
        "conditions": [
          {
            "type": "path",
            "targetId": "algorithms"
          }
        ]
      }
    ],
    "recommendedNextPaths": [
      "systems-and-engineering"
    ],
    "modules": [
      {
        "id": "module-cp-foundations",
        "title": {
          "en": "Contest Strategy, Complexity & Counting",
          "ar": "استراتيجية المسابقات والتعقيد والعدّ"
        },
        "description": {
          "en": "Reuses shared Complexity & Counting foundations plus CP contest operations rules.",
          "ar": "يبني على وحدات التعقيد والعدّ المشتركة مع قواعد زمن المسابقات."
        },
        "units": [
          {
            "unitId": "unit-complexity-foundations"
          },
          {
            "unitId": "unit-cp-introduction"
          },
          {
            "unitId": "unit-dm-counting-recurrences"
          }
        ]
      },
      {
        "id": "module-cp-pointers-ranges",
        "title": {
          "en": "Two Pointers, Range Patterns & Monotonic Search",
          "ar": "المؤشرين وأنماط المصفوفات والبحث على الإجابة"
        },
        "description": {
          "en": "Reuses Binary Search foundations alongside Two Pointers, Prefix/Diff arrays, and Search on Answer.",
          "ar": "يوحد أساسيات البحث الثنائي المشتركة ثم يتوسع إلى البحث على الإجابة والمؤشرين."
        },
        "units": [
          {
            "unitId": "unit-two-pointers-foundations"
          },
          {
            "unitId": "unit-array-cp-patterns"
          },
          {
            "unitId": "unit-binary-search-foundations"
          },
          {
            "unitId": "unit-binary-search-on-answer"
          }
        ]
      },
      {
        "id": "module-cp-advanced",
        "title": {
          "en": "Number Theory, Segment Trees, DSU & Strings",
          "ar": "نظرية الأعداد وأشجار المقاطع و DSU والنصوص"
        },
        "description": {
          "en": "Modular inverses, Sieve primes, Fenwick/Segment trees, DSU, LCA, and KMP/Tries.",
          "ar": "المعكوس الضربي وغربال الأعداد الأولية وأشجار Fenwick و Segment و DSU و KMP."
        },
        "units": [
          {
            "unitId": "unit-cp-number-theory"
          },
          {
            "unitId": "unit-cp-range-queries-graphs"
          }
        ]
      }
    ]
  },
  "databases": {
    "id": "databases",
    "title": {
      "en": "Databases & SQL Engineering",
      "ar": "قواعد البيانات وهندسة SQL"
    },
    "description": {
      "en": "Relational data modeling, declarative SQL querying, joins, 1NF-BCNF normalization, B-Tree indexing, and ACID transaction isolation.",
      "ar": "النمذجة العلائقية، احتراف استعلامات SQL وعمليات الربط، تسوية البيانات، الفهارس B-Tree، ومعاملات ACID."
    },
    "targetAudience": {
      "en": "Backend engineers and data systems architects",
      "ar": "مهندسو الواجهات الخلفية ومطورو أنظمة البيانات"
    },
    "prerequisites": [
      {
        "enforcement": "recommended",
        "logicalOperator": "all",
        "conditions": [
          {
            "type": "path",
            "targetId": "programming-fundamentals"
          }
        ]
      }
    ],
    "recommendedNextPaths": [
      "systems-and-engineering"
    ],
    "modules": [
      {
        "id": "module-db-relational",
        "title": {
          "en": "Relational Modeling & ER Design",
          "ar": "النمذجة العلائقية وتصميم الجداول"
        },
        "description": {
          "en": "Tables, primary/foreign keys, M:N junction schemas, and integrity.",
          "ar": "الجداول والمفاتيح الأساسية والأجنبية ونمذجة العلاقات."
        },
        "units": [
          {
            "unitId": "unit-db-relational-foundations"
          }
        ]
      },
      {
        "id": "module-db-sql-queries",
        "title": {
          "en": "Declarative SQL & Joins Mastery",
          "ar": "احتراف استعلامات SQL والربط"
        },
        "description": {
          "en": "SELECT/WHERE/GROUP BY/HAVING filters, JOIN variants, and interactive query lab.",
          "ar": "أوامر الاختيار والتصفية والتجميع وأنواع الربط JOIN مع مختبر SQL."
        },
        "units": [
          {
            "unitId": "unit-sql-fundamentals"
          },
          {
            "unitId": "unit-sql-joins-aggregations"
          }
        ]
      },
      {
        "id": "module-db-architecture",
        "title": {
          "en": "Normalization, B-Tree Indexes & ACID",
          "ar": "التسوية والفهارس ومعاملات ACID"
        },
        "description": {
          "en": "1NF-BCNF schema design, SARGable indexing, MVCC, and isolation levels.",
          "ar": "التسوية 1NF-BCNF وفهارس B-Tree وضمانات ACID."
        },
        "units": [
          {
            "unitId": "unit-db-normalization-foundations"
          },
          {
            "unitId": "unit-db-indexing-foundations"
          },
          {
            "unitId": "unit-db-acid-transactions"
          }
        ]
      }
    ]
  },
  "systems-and-engineering": {
    "id": "systems-and-engineering",
    "title": {
      "en": "OS, Networking & Software Engineering",
      "ar": "أنظمة التشغيل والشبكات وهندسة البرمجيات"
    },
    "description": {
      "en": "Understand kernel processes, threads, CPU scheduling, virtual memory, TCP/IP networking, DNS/HTTP, clean SOLID architecture, Git, and automated testing.",
      "ar": "أتقن أعماق أنظمة التشغيل والخيوط والجدولة والذاكرة الافتراضية وبروتوكولات الشبكات والإنترنت ومبادئ الهندسة النظيفة و Git والاختبارات."
    },
    "targetAudience": {
      "en": "Backend and full-stack engineers mastering systems & software craft",
      "ar": "مهندسو البرمجيات الساعون لفهم الأنظمة العميقة والهندسة النظيفة"
    },
    "prerequisites": [
      {
        "enforcement": "hard_lock",
        "logicalOperator": "all",
        "conditions": [
          {
            "type": "path",
            "targetId": "programming-fundamentals"
          }
        ]
      }
    ],
    "recommendedNextPaths": [],
    "modules": [
      {
        "id": "module-sys-os",
        "title": {
          "en": "Operating Systems Internals",
          "ar": "أعماق أنظمة التشغيل"
        },
        "description": {
          "en": "Processes, threads, synchronization, CPU scheduling lab, paging, and filesystems.",
          "ar": "العمليات والخيوط والتزامن ومحاكي جدولة المعالج والذاكرة الافتراضية."
        },
        "units": [
          {
            "unitId": "unit-os-processes-threads"
          },
          {
            "unitId": "unit-os-cpu-scheduling"
          },
          {
            "unitId": "unit-os-virtual-memory"
          }
        ]
      },
      {
        "id": "module-sys-networking",
        "title": {
          "en": "Computer Networking & Web Protocols",
          "ar": "شبكات الحاسوب وبروتوكولات الويب"
        },
        "description": {
          "en": "OSI/TCP-IP layers, ARP/IP/TCP/UDP, TLS/HTTPS, and packet lifecycle lab.",
          "ar": "نموذجا OSI و TCP/IP والتوجيه وبروتوكولات الويب مع مختبر الحزم."
        },
        "units": [
          {
            "unitId": "unit-networking-protocols"
          },
          {
            "unitId": "unit-networking-http-dns"
          }
        ]
      },
      {
        "id": "module-sys-software-craft",
        "title": {
          "en": "Architecture, Design Patterns, Git & Testing",
          "ar": "المعمارية النظيفة وأنماط التصميم و Git والاختبار"
        },
        "description": {
          "en": "Shared SOLID & Design Patterns alongside SDLC, Git branching, and the Testing Pyramid.",
          "ar": "مبادئ SOLID وأنماط التصميم مع دورة حياة البرمجيات و Git وهرم الاختبارات."
        },
        "units": [
          {
            "unitId": "unit-se-design-principles"
          },
          {
            "unitId": "unit-se-testing-methodologies"
          }
        ]
      }
    ]
  }
};

export function getLearningPath(id: string): LearningPath | undefined {
  return LEARNING_PATHS[id];
}
