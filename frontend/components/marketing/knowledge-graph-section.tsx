"use client";

import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { useMotion } from "@/components/providers/motion-provider";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/motion/gsap-config";
import { X, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";

// ─── DATA ──────────────────────────────────────────────────────────────────────

type NodeGroup = "foundation" | "core" | "swe" | "specialty";

type GraphNode = {
  id: string;
  label: string;
  row: number;     // row index (0-based) for vertical positioning
  col: number;     // column position within row (fractional: 0=left, 1=right)
  group: NodeGroup;
  prereqs: string[];
  topics: string[];
  careerRelevance: string[];
};

type GraphEdge = { from: string; to: string };

// Row-based layout: each row has a fixed Y position.
// Col is a fraction from 0 to 1 within the container.
const NODES: GraphNode[] = [
  // Row 0: Mathematics
  { id: "math", label: "Discrete Mathematics", row: 0, col: 0.5, group: "core",
    prereqs: [], topics: ["Logic", "Sets", "Relations", "Functions", "Combinatorics", "Graph Theory", "Probability"],
    careerRelevance: ["Algorithms", "Data Science", "Cryptography"] },

  // Row 1: Programming Foundation
  { id: "prog", label: "Programming Fundamentals", row: 1, col: 0.5, group: "foundation",
    prereqs: [], topics: ["Variables", "Data Types", "Loops", "Functions", "Scope", "Arrays", "Strings"],
    careerRelevance: ["All Computing Careers"] },

  // Row 2: Three pillars
  { id: "oop", label: "OOP", row: 2, col: 0.22, group: "foundation",
    prereqs: ["Programming Fundamentals"], topics: ["Classes", "Objects", "Encapsulation", "Inheritance", "Polymorphism", "Interfaces"],
    careerRelevance: ["Backend", "Game Development", "Software Engineering"] },
  { id: "ds", label: "Data Structures", row: 2, col: 0.5, group: "foundation",
    prereqs: ["Programming Fundamentals"], topics: ["Arrays", "Linked Lists", "Stacks", "Queues", "Hash Maps", "Trees", "Graphs"],
    careerRelevance: ["Algorithms", "Backend", "Systems"] },
  { id: "algo", label: "Algorithms", row: 2, col: 0.78, group: "foundation",
    prereqs: ["Programming Fundamentals"], topics: ["Searching", "Sorting", "Two Pointers", "Recursion", "Dynamic Programming", "Graph Algorithms"],
    careerRelevance: ["Data Science", "AI", "Problem Solving"] },

  // Row 3: Problem Solving
  { id: "ps", label: "Problem Solving", row: 3, col: 0.5, group: "foundation",
    prereqs: ["Data Structures", "Algorithms"], topics: ["Decomposition", "Pattern Recognition", "Optimization", "Complexity Analysis"],
    careerRelevance: ["Competitive Programming", "Software Engineering"] },

  // Row 4: Competitive / Specialty
  { id: "cp", label: "Competitive Programming", row: 4, col: 0.5, group: "specialty",
    prereqs: ["Problem Solving"], topics: ["C++ STL", "Advanced DP", "Math", "Implementation", "Contest Strategy"],
    careerRelevance: ["Contest Ready", "Top-Tier Tech Interviews"] },

  // Row 5: Core CS, spread horizontally
  { id: "os", label: "Operating Systems", row: 5, col: 0.14, group: "core",
    prereqs: ["Computer Architecture"], topics: ["Processes", "Threads", "Scheduling", "Memory Management", "Virtual Memory", "File Systems"],
    careerRelevance: ["Systems", "Cybersecurity", "Embedded"] },
  { id: "net", label: "Computer Networks", row: 5, col: 0.38, group: "core",
    prereqs: ["Programming Fundamentals"], topics: ["OSI / TCP-IP", "HTTP / HTTPS", "TCP / UDP", "DNS", "Routing"],
    careerRelevance: ["Backend", "Cloud", "Cybersecurity"] },
  { id: "db", label: "Database Systems", row: 5, col: 0.62, group: "core",
    prereqs: ["Data Structures"], topics: ["SQL", "Relational Modeling", "Normalization", "Indexing", "Transactions", "ACID"],
    careerRelevance: ["Backend", "Data Engineering", "Data Analysis"] },
  { id: "arch", label: "Computer Architecture", row: 5, col: 0.86, group: "core",
    prereqs: ["Programming Fundamentals"], topics: ["CPU", "Memory", "Cache", "Instructions", "I/O", "Performance"],
    careerRelevance: ["Embedded", "Systems", "OS"] },

  // Row 6: Software Engineering root
  { id: "swe", label: "Software Engineering", row: 6, col: 0.5, group: "swe",
    prereqs: ["Programming Fundamentals"], topics: ["SDLC", "Git", "Code Review", "Documentation"],
    careerRelevance: ["Production Engineer"] },

  // Row 7: SWE branches
  { id: "solid", label: "SOLID Principles", row: 7, col: 0.15, group: "swe",
    prereqs: ["OOP", "Software Engineering"], topics: ["SRP", "OCP", "LSP", "ISP", "DIP"],
    careerRelevance: ["Software Architecture"] },
  { id: "design", label: "Design Patterns", row: 7, col: 0.38, group: "swe",
    prereqs: ["OOP", "Software Engineering"], topics: ["Creational", "Structural", "Behavioral"],
    careerRelevance: ["Backend", "Architecture"] },
  { id: "testing", label: "Testing & QA", row: 7, col: 0.62, group: "swe",
    prereqs: ["Software Engineering"], topics: ["Unit Testing", "Integration Testing", "E2E Testing"],
    careerRelevance: ["QA Automation", "Backend"] },
  { id: "agile", label: "Git & CI/CD", row: 7, col: 0.85, group: "swe",
    prereqs: ["Software Engineering"], topics: ["Scrum", "Git", "CI/CD", "Project Management"],
    careerRelevance: ["DevOps", "Product Management"] },

  // Row 8: Advanced SWE
  { id: "arch_swe", label: "Software Architecture", row: 8, col: 0.28, group: "swe",
    prereqs: ["Design Patterns", "SOLID Principles"], topics: ["Layered", "Clean Architecture", "Hexagonal", "Microservices"],
    careerRelevance: ["Software Architect"] },
  { id: "sys", label: "System Design", row: 8, col: 0.72, group: "swe",
    prereqs: ["Software Architecture", "Computer Networks", "Database Systems"],
    topics: ["Scalability", "Caching", "Load Balancing", "Message Queues"],
    careerRelevance: ["Senior Engineer", "Cloud / DevOps"] },
];

const EDGES: GraphEdge[] = [
  // Mathematics → Foundations
  { from: "math", to: "prog" },
  // Programming → Pillars
  { from: "prog", to: "oop" },
  { from: "prog", to: "ds" },
  { from: "prog", to: "algo" },
  // Pillars → Problem Solving
  { from: "ds", to: "ps" },
  { from: "algo", to: "ps" },
  // Problem Solving → Competitive
  { from: "ps", to: "cp" },
  // Foundations → Core CS
  { from: "prog", to: "net" },
  { from: "prog", to: "arch" },
  { from: "ds", to: "db" },
  { from: "arch", to: "os" },
  // Foundations → SWE
  { from: "prog", to: "swe" },
  { from: "oop", to: "solid" },
  { from: "oop", to: "design" },
  // SWE branches
  { from: "swe", to: "solid" },
  { from: "swe", to: "design" },
  { from: "swe", to: "testing" },
  { from: "swe", to: "agile" },
  // Advanced SWE
  { from: "solid", to: "arch_swe" },
  { from: "design", to: "arch_swe" },
  { from: "arch_swe", to: "sys" },
  // Cross-domain → System Design
  { from: "net", to: "sys" },
  { from: "db", to: "sys" },
];

// ─── VISUAL THEME ──────────────────────────────────────────────────────────────

const GROUP_COLORS: Record<NodeGroup, string> = {
  foundation: "rgba(99, 102, 241, 1)",   // Indigo
  core: "rgba(16, 185, 129, 1)",          // Emerald
  specialty: "rgba(245, 158, 11, 1)",     // Amber
  swe: "rgba(168, 85, 247, 1)",           // Purple
};

const GROUP_STYLES: Record<NodeGroup, { pill: string; glow: string }> = {
  foundation: {
    pill: "bg-indigo-950/80 border-indigo-500/40 hover:border-indigo-400/70",
    glow: "shadow-[0_0_15px_rgba(99,102,241,0.25)]",
  },
  core: {
    pill: "bg-emerald-950/80 border-emerald-500/40 hover:border-emerald-400/70",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.25)]",
  },
  specialty: {
    pill: "bg-amber-950/80 border-amber-500/40 hover:border-amber-400/70",
    glow: "shadow-[0_0_15px_rgba(245,158,11,0.25)]",
  },
  swe: {
    pill: "bg-purple-950/80 border-purple-500/40 hover:border-purple-400/70",
    glow: "shadow-[0_0_15px_rgba(168,85,247,0.25)]",
  },
};

// ─── LAYOUT CONSTANTS ──────────────────────────────────────────────────────────

const ROW_POSITIONS = [
  6,   // Row 0: Discrete Math
  17,  // Row 1: Programming
  28,  // Row 2: OOP / DS / Algo
  39,  // Row 3: Problem Solving
  50,  // Row 4: Competitive
  61,  // Row 5: Core CS
  72,  // Row 6: Software Engineering
  83,  // Row 7: SWE branches
  94,  // Row 8: Advanced SWE
];

function getNodePosition(node: GraphNode): { x: number; y: number } {
  return {
    x: node.col * 100,
    y: ROW_POSITIONS[node.row],
  };
}

// ─── COMPONENT ─────────────────────────────────────────────────────────────────

export function KnowledgeGraphSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef<HTMLDivElement>(null);
  const { isReducedMotion } = useMotion();
  const { t, isRtl } = useI18n();

  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [activeNode, setActiveNode] = useState<GraphNode | null>(null);

  // Panning state
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startPanRef = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('.knode')) return;
    
    setIsDragging(true);
    startPanRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - startPanRef.current.x,
      y: e.clientY - startPanRef.current.y
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeNode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeNode]);

  // Precompute node positions
  const nodePositions = useMemo(() => {
    const map: Record<string, { x: number; y: number }> = {};
    NODES.forEach((n) => {
      map[n.id] = getNodePosition(n);
    });
    return map;
  }, []);

  // Hover helpers
  const getConnectedIds = useCallback(
    (nodeId: string): Set<string> => {
      const connected = new Set<string>();
      EDGES.forEach((e) => {
        if (e.from === nodeId) connected.add(e.to);
        if (e.to === nodeId) connected.add(e.from);
      });
      return connected;
    },
    []
  );

  // Reveal animation
  useGSAP(
    () => {
      if (!sectionRef.current || !pinRef.current) return;

      const q = gsap.utils.selector(pinRef);

      if (isReducedMotion) {
        gsap.set([titleRef.current, graphRef.current, readyRef.current], { autoAlpha: 1 });
        gsap.set(q(".knode"), { autoAlpha: 1, scale: 1 });
        gsap.set(q(".kedge"), { autoAlpha: 1 });
        return;
      }

      // Initial states
      gsap.set(q(".knode"), { autoAlpha: 0, scale: 0.5 });
      gsap.set(q(".kedge"), { autoAlpha: 0 });
      gsap.set(graphRef.current, { autoAlpha: 0, scale: 1.05 });
      gsap.set(titleRef.current, { autoAlpha: 0, y: -30 });
      gsap.set(readyRef.current, { autoAlpha: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          pin: pinRef.current,
          pinSpacing: false,
          anticipatePin: 1,
          onToggle: (self) => {
            if (self.isActive) {
              window.dispatchEvent(new CustomEvent("update-wayfinding", { detail: "knowledge-graph" }));
            }
          },
        },
      });

      // Phase 1: Title + graph container enter
      tl.to(titleRef.current, { autoAlpha: 1, y: 0, duration: 1.5 }, 0);
      tl.to(graphRef.current, { autoAlpha: 1, duration: 1 }, 0.5);

      // Phase 2: Zoom out graph while revealing nodes
      tl.to(graphRef.current, { scale: 1, duration: 8, ease: "power1.inOut" }, 1);

      // Progressive reveal by row
      const rowDelay = [1.5, 2.5, 3.5, 5, 6, 7.5, 9, 10.5, 12];
      NODES.forEach((node) => {
        const t = rowDelay[node.row] || 1.5;
        tl.to(q(`.knode-${node.id}`), {
          autoAlpha: 1, scale: 1, duration: 1.2, ease: "back.out(1.3)",
        }, t);
      });

      // Edges reveal slightly after their source row
      EDGES.forEach((edge) => {
        const fromNode = NODES.find((n) => n.id === edge.from);
        if (!fromNode) return;
        const t = (rowDelay[fromNode.row] || 1.5) + 0.8;
        tl.to(q(`.kedge-${edge.from}-${edge.to}`), {
          autoAlpha: 1, duration: 1.5, ease: "power2.out",
        }, t);
      });

      // Phase 3: Title fades, transition text appears
      tl.to(titleRef.current, { autoAlpha: 0, y: -20, duration: 1 }, 13);
      tl.to(readyRef.current, { autoAlpha: 1, y: 0, duration: 1.2 }, 14);
      tl.to({}, { duration: 2 }, 15); // Hold at end
    },
    { scope: sectionRef }
  );

  // Determine hover state for each node/edge
  const connectedToHovered = hoveredNodeId ? getConnectedIds(hoveredNodeId) : new Set<string>();

  return (
    <section
      ref={sectionRef}
      id="knowledge-graph"
      className="relative bg-neutral-950 w-full"
      style={{ height: "600vh" }}
    >
      {/* Pinned viewport */}
      <div
        ref={pinRef}
        className="w-full h-screen flex flex-col items-center justify-between overflow-hidden pt-12 pb-12 relative"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.04)_0,rgba(0,0,0,0)_100%)] pointer-events-none" />

        {/* Layer A: Title */}
        <div
          ref={titleRef}
          className="relative z-40 text-center w-full px-4 shrink-0 invisible h-24"
        >
          <div className="inline-flex items-center rounded-full border border-indigo-800/50 bg-indigo-950/80 backdrop-blur-md px-3 py-1 text-xs font-medium text-indigo-300 mb-4 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
            {t.knowledgeGraph.badge}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight drop-shadow-2xl">
            {t.knowledgeGraph.heading}
          </h2>
        </div>

        {/* Layer B: Graph Stage */}
        <div
          ref={graphRef}
          className="relative w-full max-w-[1200px] flex-1 my-6 mx-auto invisible"
        >
          {/* Graph container: uses 100% of flex-1 height */}
          <div className="absolute inset-0 w-full left-1/2 -translate-x-1/2 h-full">
            <div 
              className="absolute inset-0 transition-transform duration-75 touch-none"
              style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* SVG Edges */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <filter id="edge-glow" x="-10%" y="-10%" width="120%" height="120%">
                    <feGaussianBlur stdDeviation="0.3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                {EDGES.map((edge) => {
                  const from = nodePositions[edge.from];
                  const to = nodePositions[edge.to];
                  if (!from || !to) return null;

                  const fromNode = NODES.find((n) => n.id === edge.from)!;
                  const toNode = NODES.find((n) => n.id === edge.to)!;
                  const isRelated =
                    hoveredNodeId === edge.from ||
                    hoveredNodeId === edge.to;
                  const isDimmed = hoveredNodeId && !isRelated;

                  return (
                    <line
                      key={`${edge.from}-${edge.to}`}
                      className={`kedge kedge-${edge.from}-${edge.to} transition-all duration-300`}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke={GROUP_COLORS[toNode.group]}
                      strokeWidth={isRelated ? 0.5 : 0.25}
                      strokeOpacity={isDimmed ? 0.1 : isRelated ? 0.9 : 0.4}
                      strokeDasharray={isRelated ? "none" : "1 1"}
                      filter="url(#edge-glow)"
                    />
                  );
                })}
              </svg>

              {/* Nodes */}
              {NODES.map((node) => {
                const pos = nodePositions[node.id];
                const isHovered = hoveredNodeId === node.id;
                const isConnected = connectedToHovered.has(node.id);
                const isDimmed = hoveredNodeId && !isHovered && !isConnected;
                const style = GROUP_STYLES[node.group];

                return (
                  <div
                    key={node.id}
                    className={`knode knode-${node.id} absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                      isDimmed ? "opacity-20 scale-90" : "opacity-100 scale-100"
                    } ${isHovered ? "scale-110 z-20" : ""}`}
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    onClick={() => setActiveNode(node)}
                  >
                    <div
                      className={`px-3 py-1.5 md:px-5 md:py-2.5 rounded-full backdrop-blur-xl border transition-all duration-300 ${style.pill} ${
                        isHovered ? style.glow : ""
                      }`}
                    >
                      <span className="text-xs md:text-sm font-bold text-white whitespace-nowrap tracking-wide">
                        {t.knowledgeGraph.nodes[node.id as keyof typeof t.knowledgeGraph.nodes] || node.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Layer C: Transition text */}
        <div
          ref={readyRef}
          className="relative z-40 text-center w-full px-4 shrink-0 invisible h-20"
        >
          <h3 className="text-2xl md:text-3xl font-light text-neutral-300 tracking-tight">
            {t.knowledgeGraph.readyLine1}<br />
            <span className="text-white font-bold mt-2 inline-block">
              {t.knowledgeGraph.readyLine2}
            </span>
          </h3>
        </div>
      </div>

      {/* Node Detail Modal */}
      {activeNode && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" dir={isRtl ? "rtl" : "ltr"}>
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            onClick={() => setActiveNode(null)}
          />
          <div className="relative w-full max-w-xl bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl z-10 flex flex-col overflow-hidden">
            <div className="h-2 w-full" style={{ backgroundColor: GROUP_COLORS[activeNode.group] }} />

            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-1">
                    {t.knowledgeGraph.modal.badge}
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {t.knowledgeGraph.nodes[activeNode.id as keyof typeof t.knowledgeGraph.nodes] || activeNode.label}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveNode(null)}
                  className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {activeNode.prereqs.length > 0 && (
                  <div>
                    <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">
                      {t.knowledgeGraph.modal.prerequisites}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeNode.prereqs.map((p) => (
                        <span
                          key={p}
                          className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-sm text-neutral-300"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">
                    {t.knowledgeGraph.modal.youWillLearn}
                  </h4>
                  <ul className="grid grid-cols-2 gap-2" dir="ltr">
                    {activeNode.topics.map((topicItem) => (
                      <li key={topicItem} className="flex items-center text-sm text-neutral-200">
                        <div
                          className="w-1.5 h-1.5 rounded-full mr-2 shrink-0"
                          style={{ backgroundColor: GROUP_COLORS[activeNode.group] }}
                        />
                        {topicItem}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">
                    {t.knowledgeGraph.modal.careerRelevance}
                  </h4>
                  <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20">
                    <p className="text-sm text-neutral-300 mb-3">
                      {t.knowledgeGraph.modal.careerDesc}
                    </p>
                    <div className="flex flex-wrap gap-2" dir="ltr">
                      {activeNode.careerRelevance.map((c) => (
                        <span
                          key={c}
                          className="flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white shadow-sm"
                        >
                          {c} <ArrowRight className="w-3 h-3 ml-1.5 text-neutral-400" />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
