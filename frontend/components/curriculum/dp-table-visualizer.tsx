"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Grid3X3, Pause, Play, SkipForward, RotateCcw } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils/utils";
import { VisualizerSpeedSelector, type VisualizerSpeed } from "./visualizer-speed";

const ITEMS = [
  { name: "Item 1", w: 1, v: 6 },
  { name: "Item 2", w: 2, v: 10 },
  { name: "Item 3", w: 3, v: 12 }
];
const CAPACITY = 5;

export function DpTableVisualizer() {
  const { language } = useI18n();
  const isAr = language === "ar";

  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<VisualizerSpeed>(1);

  const trace = useMemo(() => {
    const dp = Array.from({ length: ITEMS.length + 1 }, () => Array(CAPACITY + 1).fill(0));
    const steps: { r: number; c: number; table: number[][]; formula: string }[] = [
      { r: 0, c: 0, table: dp.map((row) => [...row]), formula: "Base case: dp[0][w] = 0 for 0 items." }
    ];
    for (let i = 1; i <= ITEMS.length; i++) {
      const { w, v } = ITEMS[i - 1];
      for (let cap = 0; cap <= CAPACITY; cap++) {
        if (w <= cap) {
          const take = v + dp[i - 1][cap - w];
          const skip = dp[i - 1][cap];
          dp[i][cap] = Math.max(skip, take);
          steps.push({
            r: i,
            c: cap,
            table: dp.map((row) => [...row]),
            formula: `dp[${i}][${cap}] = max(skip=${skip}, take=${v}+dp[${i - 1}][${cap - w}]=${take}) = ${dp[i][cap]}`
          });
        } else {
          dp[i][cap] = dp[i - 1][cap];
          steps.push({
            r: i,
            c: cap,
            table: dp.map((row) => [...row]),
            formula: `dp[${i}][${cap}] = dp[${i - 1}][${cap}] = ${dp[i][cap]} (weight ${w} > cap ${cap})`
          });
        }
      }
    }
    return steps;
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    if (stepIdx >= trace.length - 1) {
      setIsPlaying(false);
      return;
    }
    const timer = setTimeout(() => {
      setStepIdx((s) => Math.min(trace.length - 1, s + 1));
    }, Math.round(650 / speed));
    return () => clearTimeout(timer);
  }, [isPlaying, stepIdx, trace.length, speed]);

  const current = trace[Math.min(stepIdx, trace.length - 1)];

  return (
    <div
      className="p-6 md:p-8 rounded-3xl bg-neutral-900/90 border border-white/10 shadow-2xl space-y-6"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
            <Grid3X3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {isAr ? "جدول Dynamic Programming (0/1 Knapsack Tabulation)" : "Dynamic Programming Table Lab (0/1 Knapsack)"}
            </h3>
            <p className="text-xs text-neutral-400 font-mono" dir="ltr">{current.formula}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <VisualizerSpeedSelector speed={speed} onChange={setSpeed} isAr={isAr} />
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            disabled={stepIdx >= trace.length - 1}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isPlaying ? (isAr ? "إيقاف" : "Pause") : isAr ? "تشغيل" : "Play"}
          </button>
          <button
            type="button"
            onClick={() => { setIsPlaying(false); setStepIdx((s) => Math.min(trace.length - 1, s + 1)); }}
            disabled={stepIdx >= trace.length - 1 || isPlaying}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            <SkipForward className="w-3.5 h-3.5 rtl:rotate-180" /> {isAr ? "خلية" : "Cell"} ({stepIdx + 1}/{trace.length})
          </button>
          <button
            type="button"
            onClick={() => { setIsPlaying(false); setStepIdx(trace.length - 1); }}
            className="px-3 py-1.5 rounded-xl bg-emerald-600/80 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer"
          >
            {isAr ? "ملء الكل" : "Fill All"}
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

      <div className="flex flex-wrap gap-2 text-xs font-mono" dir="ltr">
        {ITEMS.map((it, i) => (
          <span key={i} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-neutral-300">
            {it.name}: w={it.w}, val={it.v}
          </span>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10" dir="ltr">
        <table className="w-full text-center font-mono text-sm">
          <thead className="bg-white/5 text-neutral-400 text-xs">
            <tr>
              <th className="py-2.5 px-3 text-left">i \ cap</th>
              {[0, 1, 2, 3, 4, 5].map((cap) => (
                <th key={cap} className="py-2.5 px-3">w={cap}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {current.table.map((row, r) => (
              <tr key={r} className="border-t border-white/5">
                <td className="py-2.5 px-3 text-left text-xs text-neutral-400">
                  {r === 0 ? "0 items" : `${ITEMS[r - 1].name} (w=${ITEMS[r - 1].w})`}
                </td>
                {row.map((cell, c) => {
                  const isActive = r === current.r && c === current.c;
                  return (
                    <td
                      key={c}
                      className={cn(
                        "py-2.5 px-3 font-bold transition",
                        isActive ? "bg-indigo-600/35 text-white ring-1 ring-indigo-400" : "bg-black/30 text-neutral-300"
                      )}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
