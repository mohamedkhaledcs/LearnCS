"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Pause, Play, Share2, SkipForward, RotateCcw } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils/utils";
import { VisualizerSpeedSelector, type VisualizerSpeed } from "./visualizer-speed";

interface GraphNode { id: string; x: number; y: number }
interface GraphEdge { from: string; to: string; w: number }

const NODES: GraphNode[] = [
  { id: "A", x: 90, y: 120 },
  { id: "B", x: 200, y: 55 },
  { id: "C", x: 200, y: 185 },
  { id: "D", x: 330, y: 55 },
  { id: "E", x: 330, y: 185 },
  { id: "F", x: 430, y: 120 }
];

const EDGES: GraphEdge[] = [
  { from: "A", to: "B", w: 2 },
  { from: "A", to: "C", w: 5 },
  { from: "B", to: "D", w: 4 },
  { from: "B", to: "C", w: 1 },
  { from: "C", to: "E", w: 3 },
  { from: "D", to: "F", w: 2 },
  { from: "E", to: "F", w: 1 }
];

const ADJ: Record<string, string[]> = {
  A: ["B", "C"],
  B: ["A", "C", "D"],
  C: ["A", "B", "E"],
  D: ["B", "F"],
  E: ["C", "F"],
  F: ["D", "E"]
};

export function GraphTraversalVisualizer() {
  const { language } = useI18n();
  const isAr = language === "ar";

  const [mode, setMode] = useState<"BFS" | "DFS">("BFS");
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<VisualizerSpeed>(1);

  const steps = useMemo(() => {
    const frames: { current: string | null; visited: string[]; frontier: string[]; descEn: string; descAr: string }[] = [];
    const visited = new Set<string>();

    if (mode === "BFS") {
      const queue = ["A"];
      frames.push({ current: null, visited: [], frontier: [...queue], descEn: "Initialize Queue with start node A.", descAr: "تهيئة الـ Queue بالعقدة الابتدائية A." });
      while (queue.length > 0) {
        const cur = queue.shift()!;
        if (visited.has(cur)) continue;
        visited.add(cur);
        for (const nb of ADJ[cur]) {
          if (!visited.has(nb) && !queue.includes(nb)) queue.push(nb);
        }
        frames.push({
          current: cur,
          visited: Array.from(visited),
          frontier: [...queue],
          descEn: `Popped ${cur} from Queue, marked visited, pushed unvisited neighbors.`,
          descAr: `سحب ${cur} من الـ Queue وتحديدها كـ Visited وإضافة الجيران غير المزارين.`
        });
      }
    } else {
      const stack = ["A"];
      frames.push({ current: null, visited: [], frontier: [...stack], descEn: "Initialize Stack with start node A.", descAr: "تهيئة الـ Stack بالعقدة الابتدائية A." });
      while (stack.length > 0) {
        const cur = stack.pop()!;
        if (visited.has(cur)) continue;
        visited.add(cur);
        for (const nb of [...ADJ[cur]].reverse()) {
          if (!visited.has(nb)) stack.push(nb);
        }
        frames.push({
          current: cur,
          visited: Array.from(visited),
          frontier: [...stack],
          descEn: `Popped ${cur} from Stack and explored deeper along neighbors.`,
          descAr: `سحب ${cur} من الـ Stack والتعمق نحو العقد المجاورة.`
        });
      }
    }
    return frames;
  }, [mode]);

  useEffect(() => {
    if (!isPlaying) return;
    if (stepIdx >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }
    const t = setTimeout(() => {
      setStepIdx((s) => Math.min(steps.length - 1, s + 1));
    }, Math.round(1100 / speed));
    return () => clearTimeout(t);
  }, [isPlaying, stepIdx, steps.length, speed]);

  const frame = steps[Math.min(stepIdx, steps.length - 1)];

  return (
    <div
      className="p-6 md:p-8 rounded-3xl bg-neutral-900/90 border border-white/10 shadow-2xl space-y-6"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-violet-500/15 border border-violet-500/30 text-violet-400">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {isAr ? "مختبر استكشاف الـ Graph (BFS Queue مقابل DFS Stack)" : "Graph Traversal Visualizer (BFS vs DFS)"}
            </h3>
            <p className="text-xs text-neutral-400">{isAr ? frame.descAr : frame.descEn}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => { setIsPlaying(false); setMode("BFS"); setStepIdx(0); }}
            className={cn("px-3 py-1.5 rounded-xl border text-xs font-mono font-bold cursor-pointer", mode === "BFS" ? "bg-indigo-600 border-indigo-400 text-white" : "bg-black/40 border-white/10 text-neutral-400")}
          >
            BFS (Queue)
          </button>
          <button
            type="button"
            onClick={() => { setIsPlaying(false); setMode("DFS"); setStepIdx(0); }}
            className={cn("px-3 py-1.5 rounded-xl border text-xs font-mono font-bold cursor-pointer", mode === "DFS" ? "bg-indigo-600 border-indigo-400 text-white" : "bg-black/40 border-white/10 text-neutral-400")}
          >
            DFS (Stack)
          </button>
          <VisualizerSpeedSelector speed={speed} onChange={setSpeed} isAr={isAr} />
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            disabled={stepIdx >= steps.length - 1}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isPlaying ? (isAr ? "إيقاف" : "Pause") : isAr ? "تشغيل" : "Play"}
          </button>
          <button
            type="button"
            onClick={() => { setIsPlaying(false); setStepIdx((s) => Math.min(steps.length - 1, s + 1)); }}
            disabled={stepIdx >= steps.length - 1 || isPlaying}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            <SkipForward className="w-3.5 h-3.5 rtl:rotate-180" /> {isAr ? "خطوة" : "Step"} ({stepIdx + 1}/{steps.length})
          </button>
          <button
            type="button"
            onClick={() => { setIsPlaying(false); setStepIdx(0); }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-black/50 border border-white/10 p-3 overflow-x-auto" dir="ltr">
        <svg viewBox="0 0 520 240" className="w-full max-w-xl mx-auto h-52">
          {EDGES.map((e, i) => {
            const a = NODES.find((n) => n.id === e.from)!;
            const b = NODES.find((n) => n.id === e.to)!;
            return (
              <g key={i}>
                <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(148,163,184,0.35)" strokeWidth="2.5" />
                <text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 6} fill="#94a3b8" fontSize="11" fontFamily="monospace">{e.w}</text>
              </g>
            );
          })}
          {NODES.map((n) => {
            const isCurrent = frame.current === n.id;
            const isVisited = frame.visited.includes(n.id);
            const inFrontier = frame.frontier.includes(n.id);
            return (
              <g key={n.id}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="20"
                  fill={isCurrent ? "#f59e0b" : isVisited ? "#10b981" : inFrontier ? "#4f46e5" : "#111827"}
                  stroke={isCurrent ? "#fde68a" : isVisited ? "#6ee7b7" : inFrontier ? "#a5b4fc" : "#475569"}
                  strokeWidth="2.5"
                />
                <text x={n.x} y={n.y + 5} textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold" fontFamily="monospace">
                  {n.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs" dir="ltr">
        <div className="p-3 rounded-xl bg-black/40 border border-white/10">
          <span className="text-neutral-400">Visited Order: </span>
          <span className="text-emerald-300 font-bold">{frame.visited.join(" -> ") || "none"}</span>
        </div>
        <div className="p-3 rounded-xl bg-black/40 border border-white/10">
          <span className="text-neutral-400">{mode === "BFS" ? "Queue" : "Stack"} Frontier: </span>
          <span className="text-indigo-300 font-bold">[{frame.frontier.join(", ")}]</span>
        </div>
      </div>
    </div>
  );
}
