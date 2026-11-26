export type CareerPath = {
  id: string;
  title: string;
  description: string;
  languages: string[];
  frameworks: string[];
  tools: string[];
  databases: string[];
  concepts: string[];
  progression: string[];
  nextSteps?: string[];
};

export type CareerTrack = {
  id: string;
  index: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  visualTheme: string;
  color: string;
  bg: string;
  iconName: string;
  keySkills: string[];
  paths: CareerPath[];
};

export const careerTracks: CareerTrack[] = [
  {
    id: "frontend",
    index: "01",
    title: "Frontend Development",
    shortDesc: "Build the interfaces and experiences people interact with every day.",
    longDesc: "Frontend developers are responsible for the visual and interactive elements of web applications. They bridge the gap between design and engineering, ensuring performance, accessibility, and a flawless user experience.",
    visualTheme: "ui",
    color: "text-emerald-400",
    bg: "bg-emerald-950/80 border-emerald-500/30",
    iconName: "Terminal",
    keySkills: ["React/Next.js", "Web Performance", "Accessibility", "UI Architecture"],
    paths: [
      {
        id: "react",
        title: "React / Next.js",
        description: "The dominant ecosystem for building scalable web applications.",
        languages: ["JavaScript", "TypeScript", "HTML", "CSS"],
        frameworks: ["React", "Next.js", "Tailwind"],
        tools: ["React Query", "Git", "Browser APIs"],
        databases: [],
        concepts: ["State Management", "Accessibility", "Web Performance", "Testing", "REST APIs"],
        progression: ["Web Fundamentals", "JavaScript Deep Dive", "React Components", "State Management", "Next.js App Router", "Full Stack Features"],
        nextSteps: ["Full Stack Development", "UI/UX Design"]
      },
      {
        id: "vue",
        title: "Vue / Nuxt",
        description: "An approachable, performant, and versatile framework for web interfaces.",
        languages: ["JavaScript", "TypeScript", "HTML", "CSS"],
        frameworks: ["Vue", "Nuxt", "Tailwind"],
        tools: ["Pinia", "Git"],
        databases: [],
        concepts: ["Reactivity", "Component Lifecycle", "State Management"],
        progression: ["Web Fundamentals", "Vue Basics", "Component Design", "Pinia State", "Nuxt SSR"],
      },
      {
        id: "angular",
        title: "Angular",
        description: "A platform for building mobile and desktop web applications.",
        languages: ["TypeScript", "HTML", "CSS"],
        frameworks: ["Angular", "RxJS"],
        tools: ["Angular CLI", "Git"],
        databases: [],
        concepts: ["Dependency Injection", "Observables", "Directives", "Routing"],
        progression: ["TS Deep Dive", "Components", "Services", "RxJS", "Routing", "Forms"],
      }
    ]
  },
  {
    id: "backend",
    index: "02",
    title: "Backend Development",
    shortDesc: "Architect the logic, databases, and APIs that power modern applications.",
    longDesc: "Backend engineering is about data structures, system design, and algorithms. You build the robust, scalable engines that manage data securely and efficiently.",
    visualTheme: "server",
    color: "text-blue-400",
    bg: "bg-blue-950/80 border-blue-500/30",
    iconName: "Server",
    keySkills: ["APIs", "Databases", "Authentication", "Scalability"],
    paths: [
      {
        id: "dotnet",
        title: ".NET",
        description: "Enterprise-grade backend development using Microsoft's powerful ecosystem.",
        languages: ["C#", "SQL"],
        frameworks: [".NET", "ASP.NET Core", "Entity Framework Core", "LINQ"],
        tools: ["Docker"],
        databases: ["SQL Server", "PostgreSQL", "Redis"],
        concepts: ["REST APIs", "Authentication", "Authorization", "Dependency Injection", "Middleware", "Validation", "Caching", "Testing", "Logging", "Clean Architecture"],
        progression: ["C# Fundamentals", "SQL", "ASP.NET Web APIs", "EF Core & LINQ", "Authentication", "Microservices"],
        nextSteps: ["Cloud & DevOps", "Software Architecture"]
      },
      {
        id: "node",
        title: "Node.js",
        description: "High-performance JavaScript on the server for real-time applications.",
        languages: ["JavaScript", "TypeScript"],
        frameworks: ["Express", "NestJS"],
        tools: ["Docker"],
        databases: ["PostgreSQL", "MongoDB", "Redis"],
        concepts: ["REST APIs", "WebSockets", "Authentication", "Authorization", "Validation", "Testing", "Caching", "Queues"],
        progression: ["JS/TS Deep Dive", "Node Runtime", "Express APIs", "Databases", "NestJS Architecture"],
      },
      {
        id: "python_backend",
        title: "Python Backend",
        description: "Rapid development and data-heavy backends.",
        languages: ["Python"],
        frameworks: ["Django", "Django REST Framework", "FastAPI"],
        tools: ["Docker", "Celery"],
        databases: ["PostgreSQL", "Redis"],
        concepts: ["REST APIs", "Authentication", "Testing"],
        progression: ["Python Basics", "SQL", "FastAPI / Django", "Database Modeling", "Deployment"],
      },
      {
        id: "java",
        title: "Java / Spring Boot",
        description: "Robust, high-performance enterprise backend architecture.",
        languages: ["Java", "SQL"],
        frameworks: ["Spring Boot", "Hibernate / JPA"],
        tools: ["Maven", "Gradle", "Docker", "Kafka"],
        databases: ["PostgreSQL", "MySQL", "MongoDB"],
        concepts: ["OOP", "Dependency Injection", "Microservices", "Concurrency", "Security"],
        progression: ["Java Fundamentals", "SQL", "Spring Core", "REST with Spring Boot", "JPA/Hibernate", "Microservices"],
      },
      {
        id: "php",
        title: "PHP / Laravel",
        description: "The elegant and rapid ecosystem powering much of the web.",
        languages: ["PHP", "SQL"],
        frameworks: ["Laravel", "Symfony"],
        tools: ["Composer", "Docker"],
        databases: ["MySQL", "PostgreSQL", "Redis"],
        concepts: ["MVC", "ActiveRecord", "Routing", "Authentication", "Queues"],
        progression: ["PHP Basics", "OOP in PHP", "SQL", "Laravel Routing", "Eloquent ORM", "API Development"],
      }
    ]
  },
  {
    id: "mobile",
    index: "03",
    title: "Mobile Development",
    shortDesc: "Create native and cross-platform applications for iOS and Android.",
    longDesc: "Mobile development requires managing constrained resources, complex state, and diverse hardware APIs to deliver smooth, tactile user experiences on smartphones and tablets.",
    visualTheme: "mobile",
    color: "text-amber-400",
    bg: "bg-amber-950/80 border-amber-500/30",
    iconName: "Smartphone",
    keySkills: ["Mobile Architecture", "State Management", "Device APIs", "Deployment"],
    paths: [
      {
        id: "android",
        title: "Android Native",
        description: "Build high-performance native apps for the Android ecosystem.",
        languages: ["Kotlin", "Java"],
        frameworks: ["Android SDK", "Jetpack", "Jetpack Compose", "Retrofit"],
        tools: ["Android Studio"],
        databases: ["Room"],
        concepts: ["Android Architecture"],
        progression: ["Kotlin Basics", "Android UI", "Jetpack Compose", "Networking", "Local Storage", "Play Store Deployment"]
      },
      {
        id: "ios",
        title: "iOS Native",
        description: "Build premium experiences for iPhones and iPads.",
        languages: ["Swift"],
        frameworks: ["SwiftUI", "UIKit"],
        tools: ["Xcode"],
        databases: ["Core Data"],
        concepts: ["iOS Architecture", "Networking"],
        progression: ["Swift Fundamentals", "SwiftUI", "Networking", "Core Data", "App Store Deployment"]
      },
      {
        id: "flutter",
        title: "Flutter",
        description: "Build for multiple platforms from a single codebase.",
        languages: ["Dart"],
        frameworks: ["Flutter"],
        tools: ["Firebase", "Supabase"],
        databases: ["Local Storage"],
        concepts: ["Widgets", "State Management", "Navigation", "REST APIs"],
        progression: ["Language Basics", "UI Components", "Navigation", "APIs", "State Management", "Production App"]
      },
      {
        id: "react_native",
        title: "React Native",
        description: "Cross-platform mobile apps with React.",
        languages: ["JavaScript", "TypeScript"],
        frameworks: ["React Native", "Expo"],
        tools: ["Native Modules"],
        databases: [],
        concepts: ["APIs", "State Management"],
        progression: ["JS/TS Basics", "React Native UI", "Navigation", "Native Modules", "App Deployment"]
      }
    ]
  },
  {
    id: "data_analysis",
    index: "04",
    title: "Data Analysis",
    shortDesc: "Extract insights and tell stories from raw data.",
    longDesc: "Data Analysts bridge the gap between business and technology. They clean, query, and visualize data to answer critical questions and guide organizational strategy.",
    visualTheme: "data",
    color: "text-orange-400",
    bg: "bg-orange-950/80 border-orange-500/30",
    iconName: "LineChart",
    keySkills: ["SQL", "Data Visualization", "Statistics", "Python"],
    paths: [
      {
        id: "python_analysis",
        title: "Data Analysis",
        description: "Use code to wrangle and analyze large datasets.",
        languages: ["Python", "SQL"],
        frameworks: ["NumPy", "Pandas", "Matplotlib", "Seaborn"],
        tools: ["Jupyter", "Excel", "Power BI", "Tableau"],
        databases: [],
        concepts: ["Data Cleaning", "EDA", "Statistics", "Visualization", "Data Modeling", "KPIs", "Business Analysis", "Data Storytelling"],
        progression: ["Python Basics", "SQL", "Pandas Data Wrangling", "Data Visualization", "Statistical Analysis"],
        nextSteps: ["Data Science", "Machine Learning", "Analytics Engineering"]
      }
    ]
  },
  {
    id: "data_science",
    index: "05",
    title: "Data Science",
    shortDesc: "Build predictive models and uncover deep patterns in data.",
    longDesc: "Data Science combines programming, mathematics, and domain knowledge to train models that can predict outcomes, classify information, and automate complex decisions.",
    visualTheme: "ai",
    color: "text-purple-400",
    bg: "bg-purple-950/80 border-purple-500/30",
    iconName: "BrainCircuit",
    keySkills: ["Python", "Machine Learning", "Mathematics", "Model Training"],
    paths: [
      {
        id: "machine_learning",
        title: "Data Science & Machine Learning",
        description: "Train models using structured data for prediction and classification.",
        languages: ["Python"],
        frameworks: ["NumPy", "Pandas", "Scikit-learn", "Matplotlib"],
        tools: [],
        databases: [],
        concepts: ["Statistics", "Probability", "Linear Algebra", "Feature Engineering", "Model Evaluation", "Machine Learning"],
        progression: ["Python/Math Fundamentals", "Data Prep", "Regression", "Classification", "Clustering", "Model Evaluation"]
      }
    ]
  },
  {
    id: "ai_engineering",
    index: "06",
    title: "AI Engineering",
    shortDesc: "Integrate large language models and modern AI into real software.",
    longDesc: "AI Engineers don't necessarily train models from scratch; they architect complex systems that use existing foundation models (LLMs) to solve real-world problems using techniques like RAG and agents.",
    visualTheme: "ai",
    color: "text-indigo-400",
    bg: "bg-indigo-950/80 border-indigo-500/30",
    iconName: "Network",
    keySkills: ["LLMs", "Python", "RAG", "Prompt Engineering", "Vector Databases"],
    paths: [
      {
        id: "gen_ai",
        title: "AI Engineering",
        description: "Build software powered by LLMs and context-aware systems.",
        languages: ["Python"],
        frameworks: ["PyTorch", "Transformers"],
        tools: ["LLM APIs"],
        databases: ["Vector Databases"],
        concepts: ["Embeddings", "RAG", "Agents", "Model Serving", "APIs", "Evaluation", "Monitoring"],
        progression: ["Python APIs", "Embeddings & Vector Search", "RAG Systems", "AI Agents", "Production Deployment"]
      }
    ]
  },
  {
    id: "embedded",
    index: "07",
    title: "Embedded Systems",
    shortDesc: "Write software that runs on hardware, microcontrollers, and IoT devices.",
    longDesc: "Embedded systems sit at the intersection of hardware and software. You write highly optimized, resource-constrained code that directly controls physical devices, from smartwatches to space shuttles.",
    visualTheme: "embedded",
    color: "text-lime-400",
    bg: "bg-lime-950/80 border-lime-500/30",
    iconName: "Cpu",
    keySkills: ["C/C++", "Microcontrollers", "Hardware Interfaces", "Memory Management"],
    paths: [
      {
        id: "embedded_c",
        title: "Embedded C / Microcontrollers",
        description: "Bare-metal programming for microcontrollers.",
        languages: ["C", "C++"],
        frameworks: [],
        tools: ["Arduino", "STM32", "ESP32"],
        databases: [],
        concepts: ["Microcontrollers", "GPIO", "UART", "SPI", "I2C", "Interrupts", "Timers", "RTOS", "Embedded Linux"],
        progression: ["C Programming", "Pointers & Memory", "Microcontroller Architecture", "Hardware Interfaces", "RTOS", "IoT Integration"]
      }
    ]
  },
  {
    id: "cloud_devops",
    index: "08",
    title: "Cloud & DevOps",
    shortDesc: "Bridge development and operations with scalable cloud infrastructure.",
    longDesc: "DevOps engineers automate software delivery, manage cloud architectures, and ensure systems are reliable, secure, and scalable under massive loads.",
    visualTheme: "cloud",
    color: "text-cyan-400",
    bg: "bg-cyan-950/80 border-cyan-500/30",
    iconName: "Cloud",
    keySkills: ["AWS/GCP/Azure", "Docker/K8s", "CI/CD", "Infrastructure as Code"],
    paths: [
      {
        id: "cloud_engineering",
        title: "Cloud & DevOps",
        description: "Architect and manage infrastructure on major cloud providers.",
        languages: ["Linux", "Networking"],
        frameworks: [],
        tools: ["Git", "Docker", "Kubernetes", "AWS / Azure / GCP", "Terraform"],
        databases: [],
        concepts: ["CI/CD", "Monitoring", "Logging", "Observability", "Security", "Infrastructure"],
        progression: ["Linux Basics", "Networking", "Cloud Fundamentals", "Docker & K8s", "CI/CD Pipelines", "Architecture Design"]
      }
    ]
  },
  {
    id: "cybersecurity",
    index: "09",
    title: "Cybersecurity",
    shortDesc: "Protect systems, networks, and data from malicious attacks.",
    longDesc: "Cybersecurity professionals hunt for vulnerabilities, secure architectures, and respond to breaches. They must understand systems as deeply as the engineers who built them.",
    visualTheme: "security",
    color: "text-red-400",
    bg: "bg-red-950/80 border-red-500/30",
    iconName: "ShieldAlert",
    keySkills: ["Network Security", "Cryptography", "Ethical Hacking", "Incident Response"],
    paths: [
      {
        id: "security",
        title: "Cybersecurity",
        description: "Find vulnerabilities and secure systems across the entire stack.",
        languages: ["Networking", "Linux", "Operating Systems"],
        frameworks: [],
        tools: [],
        databases: [],
        concepts: ["Cryptography", "Authentication", "Authorization", "OWASP", "Web Security", "Network Security", "Threat Modeling", "SIEM concepts", "Incident Response", "Secure Coding"],
        progression: ["Networking Basics", "Linux & OS", "Common Vulnerabilities", "Penetration Testing", "Secure Coding", "Incident Response"]
      }
    ]
  },
  {
    id: "game_dev",
    index: "10",
    title: "Game Development",
    shortDesc: "Create interactive virtual worlds and entertainment experiences.",
    longDesc: "Game development combines art, sound, mathematics, and high-performance programming to create immersive interactive experiences using powerful game engines.",
    visualTheme: "games",
    color: "text-fuchsia-400",
    bg: "bg-fuchsia-950/80 border-fuchsia-500/30",
    iconName: "Gamepad2",
    keySkills: ["C# / C++", "Physics", "3D Math", "Game Engines"],
    paths: [
      {
        id: "unity",
        title: "Unity",
        description: "Build 2D and 3D games with the world's most popular engine.",
        languages: ["C#"],
        frameworks: ["Unity"],
        tools: [],
        databases: [],
        concepts: ["Physics", "Animation", "Input", "Game Architecture"],
        progression: ["C# Basics", "Unity Editor", "Game Physics", "UI & Audio", "Publishing"]
      },
      {
        id: "unreal",
        title: "Unreal Engine",
        description: "Create AAA-quality games with stunning graphics.",
        languages: ["C++"],
        frameworks: ["Unreal Engine", "Blueprints"],
        tools: [],
        databases: [],
        concepts: ["Physics", "Rendering"],
        progression: ["Engine Basics", "Blueprints", "C++ for Unreal", "Materials & Lighting"]
      }
    ]
  },
  {
    id: "ui_ux",
    index: "11",
    title: "UI/UX Design",
    shortDesc: "Design intuitive, beautiful, and accessible user experiences.",
    longDesc: "UI/UX designers focus on the human side of software. They conduct research, create prototypes, and build design systems that guide the engineering implementation.",
    visualTheme: "ui",
    color: "text-pink-400",
    bg: "bg-pink-950/80 border-pink-500/30",
    iconName: "PenTool",
    keySkills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    paths: [
      {
        id: "product_design",
        title: "UI/UX Design",
        description: "End-to-end design from research to final interface.",
        languages: [],
        frameworks: [],
        tools: ["Figma"],
        databases: [],
        concepts: ["User Research", "UX", "UI", "Wireframing", "Prototyping", "Design Systems", "Accessibility", "Interaction Design", "Usability Testing"],
        progression: ["Design Principles", "Figma Basics", "UX Research", "UI Design", "Prototyping", "Design Handoff"]
      }
    ]
  },
  {
    id: "qa_automation",
    index: "12",
    title: "QA & Test Automation",
    shortDesc: "Ensure software quality through automated testing pipelines.",
    longDesc: "Quality Assurance engineers write code to test code. They build automated frameworks that catch bugs before they reach production, ensuring software reliability at scale.",
    visualTheme: "server",
    color: "text-slate-400",
    bg: "bg-slate-950/80 border-slate-500/30",
    iconName: "CheckCircle",
    keySkills: ["Test Automation", "CI/CD", "Playwright/Cypress", "Quality Engineering"],
    paths: [
      {
        id: "qa",
        title: "QA Automation",
        description: "Automate browser interactions to test applications end-to-end.",
        languages: [],
        frameworks: ["Playwright", "Cypress", "Selenium"],
        tools: ["Postman"],
        databases: [],
        concepts: ["Testing Fundamentals", "Test Cases", "Unit Testing", "Integration Testing", "E2E Testing", "API Testing", "CI/CD", "Quality Engineering"],
        progression: ["QA Fundamentals", "Test Cases", "API Testing", "E2E Frameworks", "CI/CD Pipelines"]
      }
    ]
  },
  {
    id: "systems_programming",
    index: "13",
    title: "Systems / Low-Level",
    shortDesc: "Build the foundational software that other software runs on.",
    longDesc: "Systems programmers build operating systems, databases, compilers, and network protocols. They squeeze maximum performance out of hardware using memory-safe or highly manual low-level languages.",
    visualTheme: "embedded",
    color: "text-zinc-400",
    bg: "bg-zinc-950/80 border-zinc-500/30",
    iconName: "Cpu",
    keySkills: ["C/C++", "Memory Management", "Concurrency", "Linux"],
    paths: [
      {
        id: "systems",
        title: "Systems Programming",
        description: "Write blazingly fast and low-level software.",
        languages: ["C", "C++"],
        frameworks: [],
        tools: ["Linux"],
        databases: [],
        concepts: ["Operating Systems", "Memory", "Pointers", "Processes", "Threads", "Concurrency", "Networking", "Computer Architecture", "Compilers", "Performance"],
        progression: ["C/C++ Fundamentals", "Memory Management", "Concurrency Models", "OS Concepts", "Network Programming", "Performance Profiling"]
      }
    ]
  }
];
