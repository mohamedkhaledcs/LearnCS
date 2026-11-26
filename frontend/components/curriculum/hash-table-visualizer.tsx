"use client";

import React, { useState } from "react";
import { Hash, Plus, RotateCcw } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils/utils";

const TABLE_SIZE = 7;

export function HashTableVisualizer() {
  const { language } = useI18n();
  const isAr = language === "ar";

  const [mode, setMode] = useState<"chaining" | "linear">("chaining");
  const [buckets, setBuckets] = useState<number[][]>([[14], [22], [], [10], [18, 25], [], [20]]);
  const [keyInput, setKeyInput] = useState("32");
  const [highlightedBucket, setHighlightedBucket] = useState<number | null>(null);
  const [note, setNote] = useState<{ en: string; ar: string }>({
    en: "Hash function: index = key % 7. Switch between Separate Chaining and Linear Probing.",
    ar: "دالة التجزئة: index = key % 7. بدّل بين Separate Chaining وLinear Probing لمشاهدة حل التصادم."
  });

  const insertKey = () => {
    const k = Math.max(0, Math.floor(Number(keyInput) || 0));
    const baseIdx = k % TABLE_SIZE;

    if (mode === "chaining") {
      const next = buckets.map((b, i) => (i === baseIdx && !b.includes(k) ? [...b, k] : b));
      setBuckets(next);
      setHighlightedBucket(baseIdx);
      setNote({
        en: `hash(${k}) = ${k} % 7 = ${baseIdx}. Placed in bucket ${baseIdx}${buckets[baseIdx].length > 0 ? " (collision chained cleanly!)" : "."}`,
        ar: `hash(${k}) = ${k} % 7 = ${baseIdx}. وُضعت في الحاوية ${baseIdx}${buckets[baseIdx].length > 0 ? " (تم حل التصادم بالسلسلة)." : "."}`
      });
    } else {
      const flat = buckets.map((b) => (b.length > 0 ? [b[0]] : []));
      let idx = baseIdx;
      let probes = 0;
      while (flat[idx].length > 0 && probes < TABLE_SIZE) {
        if (flat[idx][0] === k) break;
        idx = (idx + 1) % TABLE_SIZE;
        probes++;
      }
      if (probes >= TABLE_SIZE) {
        setNote({ en: "Hash table is full! Rehashing required.", ar: "الجدول ممتلئ! يلزم إعادة التوسيع (Rehashing)." });
        return;
      }
      flat[idx] = [k];
      setBuckets(flat);
      setHighlightedBucket(idx);
      setNote({
        en: `hash(${k}) = ${baseIdx}. Linear probing resolved slot at index ${idx} after ${probes} probe(s).`,
        ar: `hash(${k}) = ${baseIdx}. استقر العنصر في الفهرس ${idx} بعد ${probes} خطوات بحث خطي.`
      });
    }
  };

  const reset = (targetMode: "chaining" | "linear") => {
    setMode(targetMode);
    setBuckets(targetMode === "chaining" ? [[14], [22], [], [10], [18, 25], [], [20]] : [[14], [22], [], [10], [18], [25], [20]]);
    setHighlightedBucket(null);
  };

  const totalKeys = buckets.reduce((acc, b) => acc + b.length, 0);
  const loadFactor = (totalKeys / TABLE_SIZE).toFixed(2);

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-neutral-900/90 border border-white/10 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400">
            <Hash className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {isAr ? "مختبر Hash Table ومعالجة التصادمات (Collisions)" : "Hash Table & Collision Resolution Lab"}
            </h3>
            <p className="text-xs text-neutral-400">{isAr ? note.ar : note.en}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2" dir="ltr">
          <button
            type="button"
            onClick={() => reset("chaining")}
            className={cn("px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer", mode === "chaining" ? "bg-indigo-600 border-indigo-400 text-white" : "bg-black/40 border-white/10 text-neutral-400")}
          >
            Chaining
          </button>
          <button
            type="button"
            onClick={() => reset("linear")}
            className={cn("px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer", mode === "linear" ? "bg-indigo-600 border-indigo-400 text-white" : "bg-black/40 border-white/10 text-neutral-400")}
          >
            Linear Probing
          </button>
          <input
            type="number"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            className="w-20 px-2.5 py-1.5 rounded-xl bg-black/50 border border-white/15 text-white font-mono text-sm text-center"
          />
          <button
            type="button"
            onClick={insertKey}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Insert
          </button>
          <button type="button" onClick={() => reset(mode)} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 cursor-pointer">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="space-y-2" dir="ltr">
        {buckets.map((bucket, idx) => (
          <div
            key={idx}
            className={cn(
              "flex items-center gap-3 p-3 rounded-2xl border transition",
              highlightedBucket === idx ? "bg-indigo-500/15 border-indigo-400" : "bg-black/40 border-white/10"
            )}
          >
            <div className="w-16 text-xs font-mono font-bold text-neutral-400">[{idx}]</div>
            <div className="flex flex-wrap gap-2">
              {bucket.length === 0 ? (
                <span className="text-xs font-mono text-neutral-600">empty</span>
              ) : (
                bucket.map((val, j) => (
                  <span key={j} className="px-3 py-1 rounded-xl bg-white/10 border border-white/15 font-mono text-sm font-bold text-white">
                    {val}
                  </span>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs font-mono text-neutral-400 px-1" dir="ltr">
        <span>Capacity: {TABLE_SIZE} buckets</span>
        <span>Load Factor (α = n / m): <span className="text-amber-400 font-bold">{loadFactor}</span></span>
      </div>
    </div>
  );
}
