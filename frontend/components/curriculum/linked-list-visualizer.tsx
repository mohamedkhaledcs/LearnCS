"use client";

import React, { useState } from "react";
import { GitCommitHorizontal, Plus, Trash2, Search, RotateCcw, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils/utils";

interface ListNode {
  id: string;
  value: number;
  addr: string;
}

const INITIAL_NODES: ListNode[] = [
  { id: "n1", value: 12, addr: "0x1A" },
  { id: "n2", value: 27, addr: "0x4F" },
  { id: "n3", value: 45, addr: "0x8C" }
];

export function LinkedListVisualizer() {
  const { language } = useI18n();
  const isAr = language === "ar";

  const [nodes, setNodes] = useState<ListNode[]>(INITIAL_NODES);
  const [inputVal, setInputVal] = useState("60");
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [log, setLog] = useState<{ en: string; ar: string }>({
    en: "Linked List ready. Each node stores a value and a `next` memory pointer.",
    ar: "الـ Linked List جاهزة. كل عقدة تخزن قيمة ومؤشر `next` يشير إلى العنوان التالي."
  });

  const makeAddr = () => "0x" + Math.floor(Math.random() * 200 + 30).toString(16).toUpperCase();

  const insertHead = () => {
    if (nodes.length >= 7) return;
    const v = Number(inputVal) || Math.floor(Math.random() * 90 + 10);
    const n: ListNode = { id: Math.random().toString(36).slice(2), value: v, addr: makeAddr() };
    setNodes([n, ...nodes]);
    setActiveIdx(0);
    setLog({
      en: `Inserted ${v} at HEAD in O(1): new node (${n.addr}) points to old head.`,
      ar: `تمت إضافة ${v} في HEAD بزمن O(1): العقدة الجديدة (${n.addr}) تشير الآن إلى الرأس السابق.`
    });
  };

  const insertTail = () => {
    if (nodes.length >= 7) return;
    const v = Number(inputVal) || Math.floor(Math.random() * 90 + 10);
    const n: ListNode = { id: Math.random().toString(36).slice(2), value: v, addr: makeAddr() };
    setNodes([...nodes, n]);
    setActiveIdx(nodes.length);
    setLog({
      en: `Appended ${v} at TAIL (${n.addr}). Without a tail pointer this requires O(n) traversal.`,
      ar: `تمت إضافة ${v} في النهاية (${n.addr}). بدون مؤشر tail يتطلب ذلك المرور بزمن O(n).`
    });
  };

  const deleteByValue = () => {
    const v = Number(inputVal);
    const idx = nodes.findIndex((n) => n.value === v);
    if (idx === -1) {
      setLog({
        en: `Value ${v} was not found in the linked list.`,
        ar: `القيمة ${v} غير موجودة في القائمة المترابطة.`
      });
      return;
    }
    setNodes(nodes.filter((_, i) => i !== idx));
    setActiveIdx(null);
    setLog({
      en: `Deleted node with value ${v} and re-linked previous->next pointer in O(n).`,
      ar: `تم حذف العقدة ذات القيمة ${v} وإعادة ربط مؤشر العقدة السابقة بالعقدة التالية.`
    });
  };

  const searchValue = () => {
    const v = Number(inputVal);
    const idx = nodes.findIndex((n) => n.value === v);
    setActiveIdx(idx >= 0 ? idx : null);
    setLog(
      idx >= 0
        ? { en: `Found ${v} at hop ${idx} (${nodes[idx].addr}) after O(${idx + 1}) pointer dereferences.`, ar: `تم العثور على ${v} عند الخطوة ${idx} (${nodes[idx].addr}).` }
        : { en: `Reached NULL after traversing all ${nodes.length} nodes; ${v} not found.`, ar: `تم الوصول إلى NULL بعد فحص ${nodes.length} عقد؛ القيمة ${v} غير موجودة.` }
    );
  };

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-neutral-900/90 border border-white/10 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400">
            <GitCommitHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {isAr ? "تمثيل الـ Linked List ومؤشرات الذاكرة" : "Linked List & Pointer Rewiring Visualizer"}
            </h3>
            <p className="text-xs text-neutral-400">{isAr ? log.ar : log.en}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2" dir="ltr">
          <input
            type="number"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-20 px-3 py-1.5 rounded-xl bg-black/50 border border-white/15 text-white font-mono text-sm text-center"
          />
          <button type="button" onClick={insertHead} className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer">
            <Plus className="w-3.5 h-3.5" /> Head
          </button>
          <button type="button" onClick={insertTail} className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer">
            <Plus className="w-3.5 h-3.5" /> Tail
          </button>
          <button type="button" onClick={searchValue} className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer">
            <Search className="w-3.5 h-3.5" /> Search
          </button>
          <button type="button" onClick={deleteByValue} className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-1 cursor-pointer">
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
          <button type="button" onClick={() => { setNodes(INITIAL_NODES); setActiveIdx(null); }} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 cursor-pointer">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Node Chain */}
      <div className="flex flex-wrap items-center gap-3 p-5 rounded-2xl bg-black/50 border border-white/10 overflow-x-auto" dir="ltr">
        <div className="px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold">
          HEAD
        </div>
        <ArrowRight className="w-4 h-4 text-neutral-500 shrink-0" />
        {nodes.map((node, idx) => (
          <React.Fragment key={node.id}>
            <div
              className={cn(
                "flex items-center rounded-2xl border overflow-hidden transition-all shrink-0",
                activeIdx === idx
                  ? "border-emerald-400 shadow-lg shadow-emerald-500/20 scale-105"
                  : "border-white/15"
              )}
            >
              <div className="px-4 py-3 bg-indigo-500/20 text-center">
                <div className="text-[10px] font-mono text-neutral-400">{node.addr}</div>
                <div className="text-lg font-bold font-mono text-white">{node.value}</div>
              </div>
              <div className="px-3 py-3 bg-white/5 border-l border-white/10 font-mono text-[11px] text-sky-300">
                next → {nodes[idx + 1]?.addr ?? "NULL"}
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-sky-400 shrink-0" />
          </React.Fragment>
        ))}
        <div className="px-3 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 font-mono text-xs font-bold">
          NULL
        </div>
      </div>
    </div>
  );
}
