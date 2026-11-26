"use client";

import React, { useEffect, useState } from "react";
import { Play, Pause, RotateCcw, ArrowRight, Repeat, Terminal } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils/utils";
import { VisualizerSpeedSelector, type VisualizerSpeed } from "./visualizer-speed";

const PRESET_ARRAYS: Record<string, number[]> = {
  default: [10, 25, 42, 58, 99],
  powers: [2, 4, 8, 16, 32],
  descending: [90, 75, 50, 25, 10]
};

export function LoopsVisualizer() {
  const { language } = useI18n();
  const isAr = language === "ar";

  const [presetKey, setPresetKey] = useState<string>("default");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState<VisualizerSpeed>(1);
  const [logs, setLogs] = useState<{ en: string; ar: string }[]>([
    { en: "Loop initialized: int i = 0;", ar: "تمت تهيئة الحلقة: int i = 0;" }
  ]);

  const items = PRESET_ARRAYS[presetKey] || PRESET_ARRAYS.default;
  const maxIterations = items.length;
  const isCompleted = currentIndex >= maxIterations;

  const advanceOneStep = React.useCallback(() => {
    setCurrentIndex((prevIdx) => {
      if (prevIdx < maxIterations) {
        const val = items[prevIdx];
        setLogs((prevLogs) => [
          ...prevLogs,
          {
            en: `Iteration ${prevIdx}: (i < ${maxIterations}) TRUE -> processed item[${prevIdx}] = ${val}`,
            ar: `الدورة ${prevIdx}: الشرط (i < ${maxIterations}) صحيح -> معالجة item[${prevIdx}] = ${val}`
          }
        ]);
        const nextIdx = prevIdx + 1;
        if (nextIdx >= maxIterations) {
          setIsRunning(false);
          setLogs((prevLogs) => [
            ...prevLogs,
            {
              en: `Loop Terminated cleanly: Condition (${nextIdx} < ${maxIterations}) is FALSE.`,
              ar: `انتهت الحلقة بأمان: أصبح الشرط (${nextIdx} < ${maxIterations}) غير محقق.`
            }
          ]);
        }
        return nextIdx;
      }
      setIsRunning(false);
      return prevIdx;
    });
  }, [items, maxIterations]);

  useEffect(() => {
    if (!isRunning || isCompleted) return;
    const delay = Math.round(900 / speed);
    const timer = setTimeout(advanceOneStep, delay);
    return () => clearTimeout(timer);
  }, [isRunning, isCompleted, speed, currentIndex, advanceOneStep]);

  const handleReset = (newKey?: string) => {
    if (newKey) setPresetKey(newKey);
    setCurrentIndex(0);
    setIsRunning(false);
    setLogs([{ en: "Loop initialized: int i = 0;", ar: "تمت تهيئة الحلقة: int i = 0;" }]);
  };

  return (
    <div
      className="rounded-3xl border border-white/10 bg-neutral-900/60 p-6 md:p-8 backdrop-blur-xl shadow-2xl"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 mb-6 border-b border-white/10 gap-3">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Repeat className="w-5 h-5" />
          </span>
          <div>
            <h4 className="text-lg font-bold text-white">
              {isAr ? "محاكي تكرار الحلقات والمرور على المصفوفات" : "Loop Iteration & Traversal Visualizer"}
            </h4>
            <span className="text-xs text-neutral-400 font-mono" dir="ltr">
              for (int i = 0; i &lt; n; i++)
            </span>
          </div>
        </div>

        {/* Action & Speed Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-black/40 p-1">
            {Object.keys(PRESET_ARRAYS).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => handleReset(k)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors capitalize",
                  presetKey === k
                    ? "bg-indigo-600/80 text-white"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                {k === "default" ? (isAr ? "افتراضي" : "Default") : k === "powers" ? (isAr ? "قوى 2" : "Powers") : isAr ? "تنازلي" : "Desc"}
              </button>
            ))}
          </div>

          <VisualizerSpeedSelector speed={speed} onChange={setSpeed} isAr={isAr} />

          <button
            type="button"
            onClick={() => setIsRunning((r) => !r)}
            disabled={isCompleted}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/30"
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? (isAr ? "إيقاف" : "Pause") : isAr ? "تشغيل" : "Play"}</span>
          </button>

          <button
            type="button"
            onClick={advanceOneStep}
            disabled={isRunning || isCompleted}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white font-semibold text-xs flex items-center gap-1.5 transition-all border border-white/10"
          >
            <span>{isAr ? "الخطوة التالية" : "Next Step"}</span>
            <ArrowRight className="w-3 h-3 rtl:rotate-180" />
          </button>

          <button
            type="button"
            onClick={() => handleReset()}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors border border-white/5"
            title={isAr ? "إعادة ضبط" : "Reset"}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Array Elements Visualization */}
      <div className="mb-8">
        <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
          {isAr
            ? `عناصر المصفوفة ومؤشر الحلقة (i = ${currentIndex}):`
            : `Array Elements & Pointer Index (i = ${currentIndex}):`}
        </div>
        <div className="grid grid-cols-5 gap-3" dir="ltr">
          {items.map((val, idx) => {
            const isCurrentPointer = idx === currentIndex;
            const isProcessed = idx < currentIndex;

            return (
              <div
                key={idx}
                className={cn(
                  "p-4 rounded-2xl border text-center transition-all duration-300 relative",
                  isCurrentPointer
                    ? "bg-indigo-600/25 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.3)] scale-105"
                    : isProcessed
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                    : "bg-black/40 border-white/10 text-neutral-400"
                )}
              >
                <div className="text-[10px] font-mono text-neutral-500 mb-1">Index [{idx}]</div>
                <div className="text-2xl font-black font-mono">{val}</div>
                {isCurrentPointer && (
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-indigo-400 font-bold">
                    ↑ i
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Execution Terminal Output Log */}
      <div className="mt-8 rounded-2xl bg-black/80 border border-white/10 p-4 font-mono text-xs">
        <div className="flex items-center gap-2 pb-2 mb-3 border-b border-white/10 text-neutral-400">
          <Terminal className="w-3.5 h-3.5 text-indigo-400" />
          <span>{isAr ? "سجل تنفيذ الحلقة:" : "Execution Log Output"}</span>
        </div>
        <div className="space-y-1.5 max-h-36 overflow-y-auto text-neutral-300">
          {logs.map((log, idx) => (
            <div key={idx} className="leading-relaxed">
              <span className="text-emerald-400 me-2">›</span>
              {isAr ? log.ar : log.en}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
