"use client";

import React, { useState } from "react";
import { GitFork, Plus, Search, RotateCcw } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils/utils";

interface BstNode {
  val: number;
  left: BstNode | null;
  right: BstNode | null;
}

function insertBst(root: BstNode | null, val: number): BstNode {
  if (!root) return { val, left: null, right: null };
  if (val < root.val) return { ...root, left: insertBst(root.left, val) };
  if (val > root.val) return { ...root, right: insertBst(root.right, val) };
  return root;
}

function buildInitialTree(): BstNode {
  let root: BstNode | null = null;
  for (const v of [50, 30, 70, 20, 40, 60, 80]) {
    root = insertBst(root, v);
  }
  return root!;
}

interface PositionedNode {
  val: number;
  x: number;
  y: number;
  px?: number;
  py?: number;
}

function layoutTree(node: BstNode | null, x = 250, y = 36, dx = 110, px?: number, py?: number, acc: PositionedNode[] = []): PositionedNode[] {
  if (!node) return acc;
  acc.push({ val: node.val, x, y, px, py });
  layoutTree(node.left, x - dx, y + 66, Math.max(38, dx / 2), x, y, acc);
  layoutTree(node.right, x + dx, y + 66, Math.max(38, dx / 2), x, y, acc);
  return acc;
}

function traverse(node: BstNode | null, mode: "inorder" | "preorder" | "postorder"): number[] {
  if (!node) return [];
  if (mode === "inorder") return [...traverse(node.left, mode), node.val, ...traverse(node.right, mode)];
  if (mode === "preorder") return [node.val, ...traverse(node.left, mode), ...traverse(node.right, mode)];
  return [...traverse(node.left, mode), ...traverse(node.right, mode), node.val];
}

export function TreeBstVisualizer() {
  const { language } = useI18n();
  const isAr = language === "ar";

  const [root, setRoot] = useState<BstNode>(() => buildInitialTree());
  const [inputVal, setInputVal] = useState("55");
  const [highlighted, setHighlighted] = useState<number[]>([]);
  const [traversalMode, setTraversalMode] = useState<"inorder" | "preorder" | "postorder">("inorder");
  const [note, setNote] = useState<{ en: string; ar: string }>({
    en: "Binary Search Tree: left < node < right. Try searching, inserting, or switching traversals.",
    ar: "شجرة Binary Search Tree: اليسار أصغر واليمين أكبر. جرّب البحث أو الإدخال أو عرض الترتيب."
  });

  const nodes = layoutTree(root);
  const orderList = traverse(root, traversalMode);

  const handleInsert = () => {
    const v = Math.floor(Number(inputVal));
    if (Number.isNaN(v)) return;
    setRoot((prev) => insertBst(prev, v));
    setHighlighted([v]);
    setNote({
      en: `Inserted ${v} by comparing against root and descending left/right in O(h) time.`,
      ar: `تم إدراج ${v} بمقارنته مع العقد والنزول يساراً أو يميناً بزمن O(h).`
    });
  };

  const handleSearch = () => {
    const v = Math.floor(Number(inputVal));
    if (Number.isNaN(v)) return;
    const path: number[] = [];
    let cur: BstNode | null = root;
    let found = false;
    while (cur) {
      path.push(cur.val);
      if (cur.val === v) { found = true; break; }
      cur = v < cur.val ? cur.left : cur.right;
    }
    setHighlighted(path);
    setNote(
      found
        ? { en: `Found ${v}! Path visited: ${path.join(" → ")}.`, ar: `تم العثور على ${v}! المسار: ${path.join(" → ")}.` }
        : { en: `${v} not found. Search stopped cleanly after: ${path.join(" → ")}.`, ar: `لم يتم العثور على ${v}. توقف البحث بعد: ${path.join(" → ")}.` }
    );
  };

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-neutral-900/90 border border-white/10 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            <GitFork className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {isAr ? "مختبر الـ Binary Search Tree وعمليات الـ Traversal" : "Binary Search Tree & Traversals Visualizer"}
            </h3>
            <p className="text-xs text-neutral-400">{isAr ? note.ar : note.en}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2" dir="ltr">
          <input
            type="number"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-20 px-2.5 py-1.5 rounded-xl bg-black/50 border border-white/15 text-white font-mono text-sm text-center"
          />
          <button type="button" onClick={handleInsert} className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer">
            <Plus className="w-3.5 h-3.5" /> Insert
          </button>
          <button type="button" onClick={handleSearch} className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer">
            <Search className="w-3.5 h-3.5" /> Search Path
          </button>
          <button type="button" onClick={() => { setRoot(buildInitialTree()); setHighlighted([]); }} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 cursor-pointer">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SVG Tree Diagram */}
      <div className="rounded-2xl bg-black/50 border border-white/10 p-3 overflow-x-auto" dir="ltr">
        <svg viewBox="0 0 500 260" className="w-full max-w-xl mx-auto h-56">
          {nodes.map((n, i) =>
            n.px !== undefined && n.py !== undefined ? (
              <line key={`edge-${i}`} x1={n.px} y1={n.py} x2={n.x} y2={n.y} stroke="rgba(148,163,184,0.4)" strokeWidth="2" />
            ) : null
          )}
          {nodes.map((n) => {
            const isActive = highlighted.includes(n.val);
            return (
              <g key={`node-${n.val}`}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="19"
                  fill={isActive ? "#10b981" : "#1e1b4b"}
                  stroke={isActive ? "#6ee7b7" : "#6366f1"}
                  strokeWidth="2.5"
                />
                <text x={n.x} y={n.y + 5} textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold" fontFamily="monospace">
                  {n.val}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Traversal Modes */}
      <div className="space-y-3" dir="ltr">
        <div className="flex flex-wrap gap-2">
          {(["inorder", "preorder", "postorder"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setTraversalMode(m);
                setHighlighted(traverse(root, m));
              }}
              className={cn(
                "px-3.5 py-1.5 rounded-xl border text-xs font-mono font-semibold uppercase cursor-pointer transition",
                traversalMode === m ? "bg-indigo-600 border-indigo-400 text-white" : "bg-black/40 border-white/10 text-neutral-400"
              )}
            >
              {m}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-black/40 border border-white/10 font-mono text-xs">
          <span className="text-neutral-400 mr-2 uppercase">{traversalMode} Output:</span>
          {orderList.map((v, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded-lg bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 font-bold">
              {v}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
