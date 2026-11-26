export const publicTranslations = {
  en: {
    wayfinding: {
      hero: "Intro",
      problem: "Problem",
      adaptiveEngine: "Adapt",
      knowledgeGraph: "Knowledge",
      featureShowcase: "Platform",
      career: "Career",
      startJourney: "Start"
    },
    heroSection: {
      badge: "The Adaptive Learning OS",
      stats: [
        { value: "9", label: "Core Paths" },
        { value: "48", label: "Canonical Units" },
        { value: "19", label: "Interactive Labs" },
        { value: "24/7", label: "AI Mentor Support" }
      ]
    },
    problem: {
      badge: "The Problem",
      heading: "Traditional learning is broken.",
      visuals: {
        rigidPath: "Rigid Path",
        advanced: "Advanced",
        prereqA: "Prereq A",
        prereqB: "Prereq B",
        scoreLow: "Score: 35%",
        scoreHigh: "Score: 98%",
        nextModule: "-> Next Module"
      },
      items: [
        {
          title: "One-size-fits-all roadmaps",
          desc: "Traditional roadmaps assume everyone starts at the exact same point, has the same foundational weaknesses, and learns at the exact same pace. It forces a rigid path that ignores your unique context."
        },
        {
          title: "No gap detection",
          desc: "A static course cannot tell if you are missing a critical prerequisite. You might struggle for hours on an advanced topic simply because a foundational concept was never properly explained or assessed."
        },
        {
          title: "No prerequisite awareness",
          desc: "Jumping directly into advanced Trees when your basic Recursion skills are weak guarantees frustration. Without a system that understands these dependencies, learning becomes chaotic and inefficient."
        },
        {
          title: "No adaptation",
          desc: "Whether you score 30% or 95% on a practice problem, traditional courses just move you to the next video anyway. Your performance has zero impact on what you learn next."
        }
      ]
    },
    adaptiveEngine: {
      badge: "The Engine",
      headingLine1: "An Adaptive Pipeline",
      headingLine2: "that works for you.",
      subtitle: "A continuous cycle that makes you better every day. Not another static roadmap.",
      steps: [
        { title: "Assess", desc: "Measure your current level across every CS domain." },
        { title: "Understand", desc: "Identify strengths, weaknesses, and prerequisite gaps." },
        { title: "Recommend", desc: "Generate a personalized path based on your unique profile." },
        { title: "Learn & Adapt", desc: "Study, practice, and re-assess. The path evolves with you." }
      ]
    },
    knowledgeGraph: {
      badge: "The Architecture",
      heading: "Interactive Knowledge Graph",
      subtitle: "Every Computer Science topic is connected. Click any node to explore prerequisites and career relevance.",
      clickHint: "Click nodes to inspect dependencies",
      dragHint: "Click any node to inspect details",
      readyLine1: "You have seen the map.",
      readyLine2: "Now let us explore where it leads.",
      modal: {
        badge: "Knowledge Node",
        prerequisites: "Prerequisites",
        youWillLearn: "You will learn",
        careerRelevance: "Career Relevance",
        careerDesc: "Mastering this foundation directly unlocks paths in:"
      },
      groups: {
        foundation: "Foundations",
        core: "Core CS",
        specialty: "Mastery",
        swe: "Software Engineering"
      },
      nodes: {
        math: "Discrete Mathematics",
        prog: "Programming Fundamentals",
        oop: "OOP",
        ds: "Data Structures",
        algo: "Algorithms",
        ps: "Problem Solving",
        cp: "Competitive Programming",
        os: "Operating Systems",
        net: "Computer Networks",
        db: "Database Systems",
        arch: "Computer Architecture",
        swe: "Software Engineering",
        solid: "SOLID Principles",
        design: "Design Patterns",
        testing: "Testing & QA",
        agile: "Git & CI/CD",
        arch_swe: "Software Architecture",
        sys: "System Design"
      }
    },
    featureShowcase: {
      badge: "Product Capabilities",
      heading: "Tools that accelerate your learning.",
      aiPrompt: "Why is my Binary Search failing on edge cases?",
      aiReply: "Check your `right` boundary initialization and loop condition (`left <= right`). Remember mid = left + (right - left) / 2.",
      testsPassed: "Tests Passed: 4/4",
      items: [
        {
          title: "AI Mentor",
          desc: "Not a generic chatbot. Your AI Mentor understands your learning context, recent mistakes, and roadmap goals to give specific guidance right when you are stuck."
        },
        {
          title: "Interactive Practice",
          desc: "Apply concepts immediately with integrated simulations and step-by-step code labs. Watch memory state, pointers, and execution trace live."
        },
        {
          title: "Progress Analytics",
          desc: "Move beyond simple checkboxes. Track real mastery across canonical concepts, quiz scores, XP, streaks, and domains over time."
        },
        {
          title: "Adaptive Roadmaps",
          desc: "Shared foundations mean completing Arrays or Binary Search once grants automatic credit across Algorithms and Competitive Programming."
        }
      ]
    },
    careerSection: {
      badge: "Career Discovery",
      heading: "Discover where you fit in Computer Science.",
      introTitleLine1: "Do not guess your path.",
      introTitleLine2: "Discover it.",
      introDesc: "We do not ask you to pick a career before writing your first line of code. First, build your foundation. Then explore where those skills take you.",
      coreSkills: "Core Skills",
      availablePaths: "Available Paths",
      clickToExplore: "Click to explore",
      modal: {
        coreLanguages: "Core Languages",
        frameworks: "Frameworks",
        tools: "Tools",
        databases: "Databases & Storage",
        coreConcepts: "Core Concepts",
        progression: "Suggested Progression"
      }
    },
    finalCta: {
      heading: "Ready to build your foundation, master Computer Science, and become a strong software engineer?",
      subtitle: "Stop guessing what to learn next. Start your adaptive diagnostic assessment and let LearnCS build your tailored roadmap.",
      ctaPrimary: "Start Your Journey",
      ctaSecondary: "Maybe Later"
    },
    footer: {
      tagline: "The adaptive learning operating system for Computer Science.",
      colProduct: "Platform",
      colExplore: "Explore",
      colAccount: "Account",
      links: {
        features: "How It Works",
        roadmap: "Learning Roadmap",
        assessment: "Diagnostic Test",
        plans: "Subscription Plans",
        career: "Career Explorer",
        discovery: "Learning Discovery",
        help: "Help Center",
        login: "Log In",
        signup: "Sign Up",
        dashboard: "Dashboard"
      },
      rights: "All rights reserved.",
      status: "Status: All systems operational"
    },
    auth: {
      loginTitle: "Welcome Back",
      loginSubtitle: "Log in to continue your learning journey.",
      signupTitle: "Create Account",
      signupSubtitle: "Save your roadmap and track your progress.",
      forgotTitle: "Password Recovery",
      forgotSubtitle: "How to reset or update your LearnCS account password.",
      emailLabel: "Email or Username",
      emailOnlyLabel: "Email",
      nameLabel: "Username or Full Name",
      passwordLabel: "Password",
      forgotLink: "Forgot password?",
      loginBtn: "Log In",
      signupBtn: "Sign Up",
      noAccount: "Do not have an account?",
      hasAccount: "Already have an account?",
      rememberPassword: "Remember your password?",
      returnToLogin: "Return to Login",
      loginError: "Invalid email or password. Please try again.",
      signupError: "Registration failed. Please check your details and try again.",
      forgotNoticeTitle: "Account Password Assistance",
      forgotNoticeBody: "Self-service email reset delivery is currently disabled on local environments without an active mail server. If you are signed in, update your password anytime from Settings. Otherwise, contact a platform administrator to reset your credentials securely.",
      forgotGoSettings: "Open Account Settings",
      forgotGoHelp: "Open Help Center"
    },
    onboarding: {
      badge: "Onboarding",
      titleLine1: "Let us build your",
      titleLine2: "learning profile.",
      subtitle: "Tell us about your background, goals, and current CS knowledge so we can tailor your starting roadmap.",
      cardText: "Complete a quick discovery profile or jump straight into your diagnostic assessment and curriculum roadmap.",
      startDiscovery: "Start Discovery Flow",
      continueDashboard: "Continue to Dashboard",
      backHome: "Back to Home"
    },
    roadmapPreview: {
      loadingMessages: [
        "Analyzing Discovery Profile...",
        "Evaluating Assessment Strengths...",
        "Structuring Core Dependencies...",
        "Generating Personalized Path..."
      ],
      badge: "Path Preview Ready",
      title: "Your Personalized Roadmap Preview",
      subtitle: "Based on your diagnostic and discovery goals, here is how LearnCS sequences your progression from foundations to specialization.",
      phases: [
        {
          tag: "Phase 01",
          title: "Core Foundations",
          highScoreDesc: "Focused review of data structures and memory layout to verify mastery before advancing.",
          lowScoreDesc: "Structured step-by-step mastery of programming fundamentals, memory, and core syntax.",
          items: ["Variables & Memory", "OOP Principles", "Core Data Structures"]
        },
        {
          tag: "Phase 02",
          title: "Algorithms & Systems",
          desc: "Strengthen algorithmic problem-solving, recursion, operating systems, and computer networking.",
          items: ["Complexity & Binary Search", "Operating Systems Core", "Networking Protocols"]
        },
        {
          tag: "Phase 03",
          title: "Databases & Architecture",
          desc: "Apply SQL, relational modeling, SOLID design, and automated testing in production-grade systems.",
          items: ["Relational SQL & ACID", "SOLID & Clean Design", "Testing & Quality Assurance"]
        }
      ],
      saveTitle: "Save Your Learning Path",
      saveDesc: "Create a free account or sign in to save your roadmap, track XP, and unlock interactive lessons.",
      createAccount: "Create Account",
      openRoadmap: "Open Full Roadmap"
    },
    aiPage: {
      emptyTitle: "Your AI CS Mentor",
      emptyDesc: "Stuck on a concept or debugging an algorithm? Start a contextual study session with your AI mentor.",
      startBtn: "Start Conversation",
      headerTitle: "AI Mentor",
      onlineStatus: "Online and Ready to Help",
      newChat: "New Chat",
      placeholder: "Ask about Big-O, pointers, SQL joins, or your current lesson...",
      connectionError: "Connection Error: Could not reach the AI Mentor service right now. Please try again shortly."
    },
    careerPage: {
      badge: "Intelligent Curriculum Guidance",
      title: "Career Exploration & Pathways",
      subtitle: "Discover how your technical interests map to software engineering tracks and recommended curriculum paths.",
      questionProgress: "Question {current} of {total}",
      completedSuffix: "Completed",
      previous: "Previous",
      nextQuestion: "Next Question",
      reportTitle: "Your Career Match Report",
      reportSubtitle: "Based on your engineering preferences, here are your strongest career alignments.",
      topMatch: "Top Alignment",
      recommendedPaths: "Recommended Curriculum Paths",
      retake: "Retake Career Discovery",
      startPath: "Explore Learning Path"
    }
  },
  ar: {
    wayfinding: {
      hero: "البداية",
      problem: "المشكلة",
      adaptiveEngine: "المحرك",
      knowledgeGraph: "الخريطة",
      featureShowcase: "المنصة",
      career: "المهن",
      startJourney: "انطلق"
    },
    heroSection: {
      badge: "نظام التعلم التكيفي لعلوم الحاسوب",
      stats: [
        { value: "9", label: "مسارات تعليمية" },
        { value: "48", label: "وحدة معيارية" },
        { value: "19", label: "مختبراً تفاعلياً" },
        { value: "24/7", label: "دعم المرشد الذكي" }
      ]
    },
    problem: {
      badge: "التحدي",
      heading: "طرق التعلم التقليدية لم تعد كافية.",
      visuals: {
        rigidPath: "مسار جامد موحد",
        advanced: "موضوع متقدم",
        prereqA: "متطلب أ",
        prereqB: "متطلب ب",
        scoreLow: "الدرجة: 35%",
        scoreHigh: "الدرجة: 98%",
        nextModule: "-> الوحدة التالية"
      },
      items: [
        {
          title: "مسارات موحدة تتجاهل الفروق الفردية",
          desc: "تفترض الدورات التقليدية أن جميع المتعلمين يبدؤون من نفس النقطة، ولديهم نفس نقاط الضعف، ويتعلمون بنفس الوتيرة، مما يفرض مساراً جامداً يتجاهل مستواك الفعلي."
        },
        {
          title: "غياب اكتشاف الفجوات المعرفية",
          desc: "المحتوى الثابت لا ينبهك إذا كان ينقصك متطلب أساسي مهم. قد تقضي ساعات في موضوع متقدم فقط لأن مفهوماً تأسيسياً لم يُشرح أو يُختبر بشكل صحيح."
        },
        {
          title: "تجاهل الاعتماديات والمتطلبات السابقة",
          desc: "الانتقال مباشرة إلى Trees قبل إتقان Recursion يسبب إحباطاً سريعاً. دون نظام يفهم ترابط المفاهيم، يصبح التعلم عشوائياً وغير فعال."
        },
        {
          title: "انعدام التكيف مع أدائك",
          desc: "سواء حصلت على 30% أو 95% في التدريب، تدفعك المنصات التقليدية للفيديو التالي بنفس الترتيب. نتيجتك لا تؤثر مطلقاً على خطوتك القادمة."
        }
      ]
    },
    adaptiveEngine: {
      badge: "المحرك الذكي",
      headingLine1: "منظومة تعلم تكيفية",
      headingLine2: "تتطور مع مستواك.",
      subtitle: "دورة تعلم مستمرة تبني فهمك يوماً بعد يوم، وليست مجرد قائمة روابط ثابتة.",
      steps: [
        { title: "تقييم دقيق", desc: "قياس مستواك الحالي عبر مجالات علوم الحاسوب المختلفة." },
        { title: "تحليل الفهم", desc: "تحديد نقاط القوة والضعف والفجوات في المتطلبات السابقة." },
        { title: "توصية مخصصة", desc: "بناء مسار تعلم مناسب لخلفيتك وأهدافك المهنية." },
        { title: "تعلم وتكيف", desc: "تدرّب وطبق وأعد التقييم ليتحدث مسارك باستمرار." }
      ]
    },
    knowledgeGraph: {
      badge: "البنية المعرفية",
      heading: "خريطة المعرفة التفاعلية",
      subtitle: "كل موضوع في علوم الحاسوب مرتبط بما قبله وبعده. اضغط على أي عقدة لاستكشاف المتطلبات والفرص المهنية.",
      clickHint: "اضغط على العقد لاستكشاف الاعتماديات",
      dragHint: "اضغط على أي عقدة لعرض التفاصيل",
      readyLine1: "لقد شاهدت الخريطة الكاملة.",
      readyLine2: "الآن لنكتشف إلى أين تقودك.",
      modal: {
        badge: "عقدة معرفية",
        prerequisites: "المتطلبات السابقة",
        youWillLearn: "ما ستتعلمه هنا",
        careerRelevance: "الارتباط المهني",
        careerDesc: "إتقان هذا الأساس يفتح لك مباشرة مجالات العمل في:"
      },
      groups: {
        foundation: "الأساسيات",
        core: "علوم الحاسوب الأساسية",
        specialty: "الإتقان",
        swe: "هندسة البرمجيات"
      },
      nodes: {
        math: "Discrete Mathematics",
        prog: "Programming Fundamentals",
        oop: "OOP",
        ds: "Data Structures",
        algo: "Algorithms",
        ps: "Problem Solving",
        cp: "Competitive Programming",
        os: "Operating Systems",
        net: "Computer Networks",
        db: "Database Systems",
        arch: "Computer Architecture",
        swe: "Software Engineering",
        solid: "SOLID Principles",
        design: "Design Patterns",
        testing: "Testing & QA",
        agile: "Git & CI/CD",
        arch_swe: "Software Architecture",
        sys: "System Design"
      }
    },
    featureShowcase: {
      badge: "قدرات المنصة",
      heading: "أدوات عملية تسرّع إتقانك.",
      aiPrompt: "لماذا يفشل Binary Search في الحالات الحدية؟",
      aiReply: "تحقق من تهيئة الحد `right` وشرط الحلقة (`left <= right`)، واستخدم حساب المنتصف الآمن لتجنب overflow.",
      testsPassed: "Tests Passed: 4/4",
      items: [
        {
          title: "المرشد الذكي AI Mentor",
          desc: "ليس مجرد روبوت محادثة عام، بل مرشد يفهم سياق تعلمك وأهدافك لمساعدتك عندما تتعثر في مفهوم أو كود."
        },
        {
          title: "مختبرات وتطبيق تفاعلي",
          desc: "طبّق المفاهيم فورياً عبر محاكيات بصرية وأمثلة كود تفاعلية تريك تغيرات الذاكرة والمؤشرات خطوة بخطوة."
        },
        {
          title: "تحليلات التقدم الحقيقية",
          desc: "تجاوز مجرد علامات الإكمال الشكلية. تابع إتقانك الفعلي ونتائج الاختبارات ونقاط XP وسلاسل الدراسة عبر الزمن."
        },
        {
          title: "مسارات متصلة بدون تكرار",
          desc: "الوحدات المشتركة مثل Arrays و Binary Search تُحسب لك تلقائياً عبر Algorithms و Competitive Programming."
        }
      ]
    },
    careerSection: {
      badge: "استكشاف المسارات المهنية",
      heading: "اكتشف التخصص الأنسب لك في علوم الحاسوب.",
      introTitleLine1: "لا تخمن مسارك.",
      introTitleLine2: "اكتشفه بوعي.",
      introDesc: "لا نطلب منك اختيار مسار وظيفي قبل أن تكتب أول سطر كود. ابنِ أساسك أولاً، ثم اكتشف أين تأخذك مهاراتك.",
      coreSkills: "المهارات الأساسية",
      availablePaths: "المسارات المتاحة",
      clickToExplore: "اضغط للاستكشاف",
      modal: {
        coreLanguages: "اللغات الأساسية",
        frameworks: "أطر العمل",
        tools: "الأدوات",
        databases: "قواعد البيانات والتخزين",
        coreConcepts: "المفاهيم الجوهرية",
        progression: "التدرج المقترح"
      }
    },
    finalCta: {
      heading: "هل أنت مستعد لبناء أساس متين وإتقان علوم الحاسوب لتصبح مهندس برمجيات محترفاً؟",
      subtitle: "توقف عن التخمين بشأن الخطوة التالية. ابدأ التقييم التشخيصي الآن ودع LearnCS تبني لك مسارك الأمثل.",
      ctaPrimary: "ابدأ رحلتك الآن",
      ctaSecondary: "ربما لاحقاً"
    },
    footer: {
      tagline: "نظام التشغيل التعليمي المتكيف لإتقان علوم الحاسوب.",
      colProduct: "المنصة",
      colExplore: "استكشف",
      colAccount: "الحساب",
      links: {
        features: "كيف تعمل المنصة",
        roadmap: "خارطة المسارات",
        assessment: "التقييم التشخيصي",
        plans: "خطط الاشتراك",
        career: "المسارات المهنية",
        discovery: "استكشاف التعلم",
        help: "مركز المساعدة",
        login: "تسجيل الدخول",
        signup: "إنشاء حساب",
        dashboard: "لوحة المتابعة"
      },
      rights: "جميع الحقوق محفوظة.",
      status: "الحالة: جميع الأنظمة تعمل بكفاءة"
    },
    auth: {
      loginTitle: "أهلاً بعودتك",
      loginSubtitle: "سجّل الدخول لمتابعة رحلتك التعليمية.",
      signupTitle: "إنشاء حساب جديد",
      signupSubtitle: "احفظ مسارك التعليمي وتابع تقدمك ونتائجك.",
      forgotTitle: "استعادة كلمة المرور",
      forgotSubtitle: "كيفية تحديث أو استعادة كلمة مرور حسابك في LearnCS.",
      emailLabel: "البريد الإلكتروني أو اسم المستخدم",
      emailOnlyLabel: "البريد الإلكتروني",
      nameLabel: "اسم المستخدم أو الاسم الكامل",
      passwordLabel: "كلمة المرور",
      forgotLink: "نسيت كلمة المرور؟",
      loginBtn: "تسجيل الدخول",
      signupBtn: "إنشاء الحساب",
      noAccount: "ليس لديك حساب؟",
      hasAccount: "لديك حساب بالفعل؟",
      rememberPassword: "تذكرت كلمة المرور؟",
      returnToLogin: "العودة لتسجيل الدخول",
      loginError: "البريد الإلكتروني أو كلمة المرور غير صحيحة. حاول مرة أخرى.",
      signupError: "تعذر إنشاء الحساب. تحقق من البيانات وحاول مجدداً.",
      forgotNoticeTitle: "مساعدة استعادة كلمة المرور",
      forgotNoticeBody: "إرسال رسائل الاستعادة عبر البريد غير مفعل حالياً في بيئات التشغيل المحلية دون خادم بريد. إذا كنت مسجل الدخول يمكنك تغيير كلمة المرور مباشرة من الإعدادات، أو التواصل مع مسؤول المنصة لإعادة تعيين الحساب بأمان.",
      forgotGoSettings: "الذهاب إلى الإعدادات",
      forgotGoHelp: "فتح مركز المساعدة"
    },
    onboarding: {
      badge: "البداية والتهيئة",
      titleLine1: "لنقم ببناء",
      titleLine2: "ملفك التعليمي.",
      subtitle: "أخبرنا عن خلفيتك وأهدافك ومستواك الحالي لنجهز لك نقطة البداية المناسبة.",
      cardText: "أكمل استبيان التعرف السريع أو انتقل مباشرة إلى التقييم التشخيصي ولوحة التعلم.",
      startDiscovery: "ابدأ استبيان الاكتشاف",
      continueDashboard: "الانتقال إلى لوحة التحكم",
      backHome: "العودة للرئيسية"
    },
    roadmapPreview: {
      loadingMessages: [
        "تحليل ملف التعلم والأهداف...",
        "تقييم نقاط القوة في الاختبار...",
        "ترتيب الاعتماديات والمتطلبات...",
        "بناء معاينة المسار المخصص..."
      ],
      badge: "معاينة المسار جاهزة",
      title: "معاينة مسارك التعليمي المخصص",
      subtitle: "بناءً على نتائجك وأهدافك، هكذا ترتب LearnCS رحلتك من التأسيس إلى التخصص الهندسي.",
      phases: [
        {
          tag: "المرحلة 01",
          title: "الأساسيات الجوهرية",
          highScoreDesc: "مراجعة مركزة لهياكل البيانات وتخطيط الذاكرة لضمان الإتقان التام قبل التقدم.",
          lowScoreDesc: "بناء متدرج لأساسيات البرمجة وإدارة الذاكرة وكتابة الكود بثقة.",
          items: ["Variables & Memory", "OOP Principles", "Core Data Structures"]
        },
        {
          tag: "المرحلة 02",
          title: "الخوارزميات والأنظمة",
          desc: "تطوير مهارات التفكير الخوارزمي والعودية وأنظمة التشغيل وشبكات الحاسوب.",
          items: ["Complexity & Binary Search", "Operating Systems Core", "Networking Protocols"]
        },
        {
          tag: "المرحلة 03",
          title: "قواعد البيانات والمعمارية",
          desc: "تطبيق SQL والنمذجة العلائقية ومبادئ SOLID والاختبارات الآلية في مشاريع حقيقية.",
          items: ["Relational SQL & ACID", "SOLID & Clean Design", "Testing & Quality Assurance"]
        }
      ],
      saveTitle: "احفظ مسارك التعليمي",
      saveDesc: "أنشئ حساباً مجانياً أو سجل الدخول لحفظ هذا المسار وتتبع نقاط XP والدروس التفاعلية.",
      createAccount: "إنشاء حساب",
      openRoadmap: "استكشاف المسارات الكاملة"
    },
    aiPage: {
      emptyTitle: "مرشدك الذكي لعلوم الحاسوب",
      emptyDesc: "هل واجهت صعوبة في مفهوم أو مسألة برمجية؟ ابدأ جلسة تفاعلية مع المرشد الذكي للحصول على شرح دقيق.",
      startBtn: "بدء محادثة جديدة",
      headerTitle: "المرشد الذكي",
      onlineStatus: "متصل وجاهز للمساعدة",
      newChat: "محادثة جديدة",
      placeholder: "اسأل عن Big-O أو Pointers أو SQL Joins أو درسك الحالي...",
      connectionError: "خطأ اتصال: تعذر الوصول لخدمة المرشد الذكي حالياً. يرجى المحاولة بعد قليل."
    },
    careerPage: {
      badge: "التوجيه الذكي للمسارات المهنية",
      title: "استكشاف المسارات المهنية",
      subtitle: "اكتشف كيف ترتبط ميولك الهندسية بالتخصصات البرمجية والمسارات التعليمية المناسبة لها.",
      questionProgress: "السؤال {current} من {total}",
      completedSuffix: "مكتمل",
      previous: "السابق",
      nextQuestion: "السؤال التالي",
      reportTitle: "تقرير التوافق المهني الخاص بك",
      reportSubtitle: "بناءً على اختياراتك وتفضيلاتك الهندسية، هذه هي المسارات الأقرب لك.",
      topMatch: "أعلى توافق",
      recommendedPaths: "المسارات التعليمية المقترحة",
      retake: "إعادة استبيان التوافق المهني",
      startPath: "ابدأ المسار التعليمي"
    }
  }
};
