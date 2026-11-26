export type RoadmapModule = {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  lessons: { id: string; title: string; displayOrder: number }[];
};

export type RoadmapTrack = {
  id: string;
  title: string;
  modules: RoadmapModule[];
};

export type Roadmap = {
  id: string;
  title: string;
  description: string;
  tracks: RoadmapTrack[];
};

export const softwareEngineeringRoadmap: Roadmap = {
  id: "software-engineering",
  title: "Software Engineering",
  description: "A comprehensive roadmap to becoming a professional software engineer.",
  tracks: [
    {
      id: "core-foundations",
      title: "Core Foundations",
      modules: [
        {
          id: "intro-programming",
          title: "Introduction to Programming",
          description: "Learn the basics of programming including variables, control flow, and functions.",
          estimatedMinutes: 120,
          lessons: [
            { id: "var", title: "Variables & Data Types", displayOrder: 1 },
            { id: "ctrl", title: "Control Flow", displayOrder: 2 },
          ]
        },
        {
          id: "data-structures-basic",
          title: "Basic Data Structures",
          description: "Understand arrays, lists, and basic memory allocation.",
          estimatedMinutes: 150,
          lessons: [
            { id: "arr", title: "Arrays & Strings", displayOrder: 1 },
            { id: "ll", title: "Linked Lists", displayOrder: 2 },
          ]
        },
        {
          id: "discrete-math",
          title: "Discrete Mathematics",
          description: "Essential mathematics for computer science: logic, set theory, combinatorics, and graph theory.",
          estimatedMinutes: 240,
          lessons: [
            { id: "logic", title: "Propositional Logic & Proofs", displayOrder: 1 },
            { id: "sets", title: "Set Theory & Functions", displayOrder: 2 },
            { id: "combo", title: "Combinatorics & Probability", displayOrder: 3 },
            { id: "graphs", title: "Graph Theory Basics", displayOrder: 4 },
          ]
        },
        {
          id: "dsa-advanced",
          title: "Advanced Data Structures & Algorithms",
          description: "Deep dive into trees, graphs, dynamic programming, and complexity analysis.",
          estimatedMinutes: 300,
          lessons: [
            { id: "trees", title: "Trees & BSTs", displayOrder: 1 },
            { id: "graphs-algos", title: "Graph Algorithms", displayOrder: 2 },
            { id: "dp", title: "Dynamic Programming", displayOrder: 3 },
            { id: "complexity", title: "Time & Space Complexity", displayOrder: 4 },
          ]
        },
        {
          id: "os-networking",
          title: "Operating Systems & Networking",
          description: "How software interacts with hardware and communicates across networks.",
          estimatedMinutes: 240,
          lessons: [
            { id: "os-processes", title: "Processes & Threads", displayOrder: 1 },
            { id: "memory-mgmt", title: "Memory Management", displayOrder: 2 },
            { id: "osi-model", title: "The OSI Model & TCP/IP", displayOrder: 3 },
            { id: "http", title: "HTTP & Web Protocols", displayOrder: 4 },
          ]
        },
        {
          id: "databases",
          title: "Databases & Data Modeling",
          description: "Design and interact with relational and NoSQL databases.",
          estimatedMinutes: 200,
          lessons: [
            { id: "sql", title: "SQL Fundamentals", displayOrder: 1 },
            { id: "relational-design", title: "Relational Database Design", displayOrder: 2 },
            { id: "nosql", title: "NoSQL Concepts", displayOrder: 3 },
          ]
        },
        {
          id: "software-architecture",
          title: "Software Architecture & Patterns",
          description: "Design scalable and maintainable software architectures.",
          estimatedMinutes: 180,
          lessons: [
            { id: "design-patterns", title: "Design Patterns", displayOrder: 1 },
            { id: "solid", title: "SOLID Principles", displayOrder: 2 },
            { id: "microservices", title: "Monoliths vs Microservices", displayOrder: 3 },
          ]
        },
        {
          id: "devops-cicd",
          title: "DevOps, Testing & CI/CD",
          description: "Automate testing and deployment pipelines.",
          estimatedMinutes: 160,
          lessons: [
            { id: "testing", title: "Unit & Integration Testing", displayOrder: 1 },
            { id: "docker", title: "Containerization with Docker", displayOrder: 2 },
            { id: "cicd", title: "Continuous Integration & Deployment", displayOrder: 3 },
          ]
        },
        {
          id: "system-design",
          title: "System Design",
          description: "Designing large-scale distributed systems and handling high throughput.",
          estimatedMinutes: 300,
          lessons: [
            { id: "scaling", title: "Horizontal vs Vertical Scaling", displayOrder: 1 },
            { id: "load-balancing", title: "Load Balancing & Caching", displayOrder: 2 },
            { id: "db-scaling", title: "Database Sharding & Replication", displayOrder: 3 },
            { id: "system-design-interview", title: "Approaching System Design Interviews", displayOrder: 4 },
          ]
        }
      ]
    }
  ]
};
