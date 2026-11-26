"use client";

import React, { useState } from "react";
import { HardDrive, Plus, Link2, Trash2, RotateCcw } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils/utils";

interface StackVar {
  name: string;
  type: "value" | "pointer";
  value: string;
  pointsToAddr?: string;
}

interface HeapBlock {
  addr: string;
  label: string;
  value: number;
  freed: boolean;
}

export function MemoryHeapVisualizer() {
  const { language } = useI18n();
  const isAr = language === "ar";

  const [stackVars, setStackVars] = useState<StackVar[]>([
    { name: "int count", type: "value", value: "10" },
    { name: "int* ptr", type: "pointer", value: "0x6001A0", pointsToAddr: "0x6001A0" }
  ]);
  const [heapBlocks, setHeapBlocks] = useState<HeapBlock[]>([
    { addr: "0x6001A0", label: "Node.score", value: 42, freed: false }
  ]);
  const [note, setNote] = useState<{ en: string; ar: string }>({
    en: "Stack stores fixed-size frames & pointer addresses; Heap stores dynamically allocated blocks until freed.",
    ar: "الـ Stack يخزن الإطارات والعناوين؛ بينما الـ Heap يخزن الكائنات المخصصة ديناميكياً حتى تحريرها."
  });

  const allocateHeap = () => {
    if (heapBlocks.length >= 4) return;
    const nextIdx = heapBlocks.length;
    const addr = `0x${(0x6001a0 + nextIdx * 0x20).toString(16).toUpperCase()}`;
    const nextVal = 20 + nextIdx * 15;
    setHeapBlocks((prev) => [...prev, { addr, label: `Block #${nextIdx + 1}`, value: nextVal, freed: false }]);
    setStackVars((prev) => [
      ...prev,
      { name: `Node* ref${nextIdx}`, type: "pointer", value: addr, pointsToAddr: addr }
    ]);
    setNote({
      en: `Allocated 1 block on Heap at ${addr} and stored pointer ref${nextIdx} on Stack.`,
      ar: `تم حجز كتلة في الـ Heap عند العنوان ${addr} وتخزين المؤشر في الـ Stack.`
    });
  };

  const mutateViaPointer = () => {
    const firstValid = heapBlocks.find((b) => !b.freed);
    if (!firstValid) {
      setNote({
        en: "Use-After-Free hazard! No live Heap allocation exists to dereference.",
        ar: "خطر Use-After-Free! لا توجد كتلة حية في الـ Heap للوصول إليها."
      });
      return;
    }
    setHeapBlocks((prev) =>
      prev.map((b) => (b.addr === firstValid.addr ? { ...b, value: b.value + 10 } : b))
    );
    setNote({
      en: `Dereferenced *ptr (${firstValid.addr}): mutated Heap value to ${firstValid.value + 10} without copying the object.`,
      ar: `تم تعديل القيمة عبر المؤشر *ptr (${firstValid.addr}) لتصبح ${firstValid.value + 10} مباشرة في الـ Heap.`
    });
  };

  const freeHeapBlock = () => {
    const live = heapBlocks.find((b) => !b.freed);
    if (!live) return;
    setHeapBlocks((prev) =>
      prev.map((b) => (b.addr === live.addr ? { ...b, freed: true } : b))
    );
    setNote({
      en: `Freed Heap block ${live.addr}. Any Stack pointer still holding ${live.addr} is now a Dangling Pointer!`,
      ar: `تم تحرير الكتلة ${live.addr}. أي مؤشر لا يزال يحمل هذا العنوان أصبح Dangling Pointer!`
    });
  };

  const reset = () => {
    setStackVars([
      { name: "int count", type: "value", value: "10" },
      { name: "int* ptr", type: "pointer", value: "0x6001A0", pointsToAddr: "0x6001A0" }
    ]);
    setHeapBlocks([{ addr: "0x6001A0", label: "Node.score", value: 42, freed: false }]);
    setNote({
      en: "Memory snapshot reset.",
      ar: "تمت إعادة تهيئة نموذج الذاكرة."
    });
  };

  return (
    <div
      className="w-full bg-neutral-900/75 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/15 text-indigo-400 border border-indigo-500/25">
              <HardDrive className="w-4 h-4" />
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {isAr ? "محاكي الذاكرة: Stack مقابل Heap والمؤشرات" : "Stack vs Heap & Pointer Reference Visualizer"}
            </h3>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            {isAr
              ? "استكشف فرق التخصيص والمؤشرات والتحرير اليدوي للذاكرة."
              : "Allocate dynamic blocks on the Heap, dereference pointers, and inspect dangling references."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={allocateHeap}
            className="inline-flex items-center gap-1 rounded-lg bg-emerald-600/25 border border-emerald-500/40 px-3 py-1.5 text-xs font-medium text-emerald-200 hover:bg-emerald-600/40"
          >
            <Plus className="w-3.5 h-3.5" />
            {isAr ? "حجز Heap (new)" : "Allocate Heap"}
          </button>
          <button
            type="button"
            onClick={mutateViaPointer}
            className="inline-flex items-center gap-1 rounded-lg bg-cyan-600/25 border border-cyan-500/40 px-3 py-1.5 text-xs font-medium text-cyan-200 hover:bg-cyan-600/40"
          >
            <Link2 className="w-3.5 h-3.5" />
            {isAr ? "تعديل *ptr" : "Mutate *ptr"}
          </button>
          <button
            type="button"
            onClick={freeHeapBlock}
            className="inline-flex items-center gap-1 rounded-lg bg-rose-600/25 border border-rose-500/40 px-3 py-1.5 text-xs font-medium text-rose-200 hover:bg-rose-600/40"
          >
            <Trash2 className="w-3.5 h-3.5" />
            {isAr ? "تحرير delete/free" : "Free Heap"}
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-white/5 hover:bg-white/10 p-1.5 text-neutral-300 border border-white/10"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" dir="ltr">
        {/* Stack Column */}
        <div className="rounded-2xl bg-black/45 border border-indigo-500/25 p-4 space-y-2.5">
          <div className="text-xs font-mono uppercase tracking-wider text-indigo-300 font-semibold">
            Stack Frame (LIFO / Automatic)
          </div>
          {stackVars.map((v, idx) => {
            const targetBlock = v.pointsToAddr
              ? heapBlocks.find((h) => h.addr === v.pointsToAddr)
              : undefined;
            const isDangling = Boolean(v.pointsToAddr && targetBlock?.freed);
            return (
              <div
                key={idx}
                className={cn(
                  "flex items-center justify-between rounded-xl border px-3 py-2 font-mono text-xs",
                  isDangling
                    ? "border-rose-500/50 bg-rose-950/30 text-rose-200"
                    : "border-white/10 bg-neutral-900 text-slate-200"
                )}
              >
                <span>{v.name}</span>
                <span className={v.type === "pointer" ? "text-cyan-300" : "text-emerald-300"}>
                  {v.value} {isDangling ? "(Dangling!)" : ""}
                </span>
              </div>
            );
          })}
        </div>

        {/* Heap Column */}
        <div className="rounded-2xl bg-black/45 border border-emerald-500/25 p-4 space-y-2.5">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-semibold">
            Heap Memory (Dynamic Allocation)
          </div>
          {heapBlocks.map((b) => (
            <div
              key={b.addr}
              className={cn(
                "flex items-center justify-between rounded-xl border px-3 py-2 font-mono text-xs",
                b.freed
                  ? "border-dashed border-neutral-700 bg-neutral-950/60 text-neutral-500 line-through"
                  : "border-emerald-500/35 bg-emerald-950/25 text-emerald-100"
              )}
            >
              <span>
                {b.addr} ({b.label})
              </span>
              <span className="font-bold">{b.freed ? "FREED" : `val = ${b.value}`}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs md:text-sm text-slate-200">
        {isAr ? note.ar : note.en}
      </div>
    </div>
  );
}
