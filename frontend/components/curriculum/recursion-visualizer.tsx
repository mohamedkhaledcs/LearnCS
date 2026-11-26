"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, GitFork, Pause, Play, RotateCcw } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils/utils";
import { VisualizerSpeedSelector, type VisualizerSpeed } from "./visualizer-speed";

interface Frame {
  label: string;
  n: number;
  depth: number;
  status: "active" | "base" | "returning";
  returnVal?: number;
}

interface TraceStep {
  stack: Frame[];
  messageEn: string;
  messageAr: string;
  phase: "call" | "base" | "return";
}

function buildFactorialSteps(n: number): TraceStep[] {
  const steps: TraceStep[] = [];
  const stack: Frame[] = [];

  function sim(k: number, depth: number): number {
    stack.push({ label: `fact(${k})`, n: k, depth, status: k <= 1 ? "base" : "active" });
    if (k <= 1) {
      steps.push({
        stack: stack.map((f) => ({ ...f })),
        phase: "base",
        messageEn: `Base case reached at fact(${k}): return 1 immediately without deeper calls.`,
        messageAr: `الوصول إلى Base Case عند fact(${k}): إرجاع 1 مباشرة دون استدعاءات إضافية.`
      });
      stack[stack.length - 1] = { ...stack[stack.length - 1], status: "returning", returnVal: 1 };
      steps.push({
        stack: stack.map((f) => ({ ...f })),
        phase: "return",
        messageEn: `Pop fact(${k}) returning 1 to caller.`,
        messageAr: `إرجاع 1 من fact(${k}) وإزالته من Call Stack.`
      });
      stack.pop();
      return 1;
    }

    steps.push({
      stack: stack.map((f) => ({ ...f })),
      phase: "call",
      messageEn: `Push frame fact(${k}) onto Call Stack -> needs ${k} * fact(${k - 1}).`,
      messageAr: `دفع الإطار fact(${k}) إلى Call Stack لحساب ${k} * fact(${k - 1}).`
    });

    const sub = sim(k - 1, depth + 1);
    const res = k * sub;
    stack[stack.length - 1] = { ...stack[stack.length - 1], status: "returning", returnVal: res };
    steps.push({
      stack: stack.map((f) => ({ ...f })),
      phase: "return",
      messageEn: `Resume fact(${k}): ${k} * ${sub} = ${res}. Unwind stack frame.`,
      messageAr: `استئناف fact(${k}): الناتج ${k} * ${sub} = ${res} ثم تفريغ الإطار.`
    });
    stack.pop();
    return res;
  }

  sim(n, 0);
  return steps;
}

export function RecursionVisualizer() {
  const { language } = useI18n();
  const isAr = language === "ar";

  const [nVal, setNVal] = useState(4);
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<VisualizerSpeed>(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const steps = useMemo(() => buildFactorialSteps(nVal), [nVal]);

  useEffect(() => {
    setStepIdx(0);
    setIsPlaying(false);
  }, [nVal]);

  useEffect(() => {
    if (!isPlaying) return;
    if (stepIdx >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }
    timerRef.current = setTimeout(() => setStepIdx((i) => i + 1), Math.round(900 / speed));
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, stepIdx, steps.length, speed]);

  const current = steps[stepIdx] || steps[0];

  return (
    <div
      className="w-full bg-neutral-900/75 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/15 text-indigo-400 border border-indigo-500/25">
              <GitFork className="w-4 h-4" />
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {isAr ? "محاكي التتبع العودي ومكدس الاستدعاء (Call Stack)" : "Recursion & Call Stack Visualizer"}
            </h3>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            {isAr
              ? "شاهد تراكم إطارات الدوال حتى Base Case ثم تفريغ النتائج."
              : "Watch stack frames push down to the Base Case and unwind return values back up."}
          </p>
        </div>

        <div className="flex items-center gap-2" dir="ltr">
          <span className="text-xs text-neutral-400">n =</span>
          {[2, 3, 4, 5, 6].map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setNVal(k)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-colors",
                nVal === k ? "bg-indigo-600 text-white" : "bg-white/5 text-neutral-300 hover:bg-white/10"
              )}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* Call Stack Area */}
      <div className="rounded-2xl bg-black/45 border border-white/10 p-5 min-h-[220px] flex flex-col justify-end gap-2" dir="ltr">
        {[...current.stack].reverse().map((frame, i) => (
          <div
            key={`${frame.label}-${i}`}
            className={cn(
              "flex items-center justify-between rounded-xl border px-4 py-2.5 font-mono text-xs transition-all",
              frame.status === "base"
                ? "border-amber-500/50 bg-amber-950/35 text-amber-200"
                : frame.status === "returning"
                ? "border-emerald-500/50 bg-emerald-950/35 text-emerald-200"
                : "border-indigo-500/40 bg-indigo-950/30 text-indigo-100"
            )}
          >
            <span className="font-bold">{frame.label}</span>
            <span>
              {frame.status === "base"
                ? "Base Case (n <= 1) -> 1"
                : frame.returnVal !== undefined
                ? `return ${frame.returnVal}`
                : `waiting on fact(${frame.n - 1})...`}
            </span>
          </div>
        ))}
      </div>

      {/* Explanation + Transport */}
      <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs md:text-sm text-slate-200">
        {isAr ? current.messageAr : current.messageEn}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2" dir="ltr">
          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setStepIdx((i) => Math.max(0, i - 1));
            }}
            disabled={stepIdx === 0}
            className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-40 text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isPlaying ? (isAr ? "إيقاف" : "Pause") : isAr ? "تشغيل" : "Play"}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setStepIdx((i) => Math.min(steps.length - 1, i + 1));
            }}
            disabled={stepIdx >= steps.length - 1}
            className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-40 text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setStepIdx(0);
            }}
            className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <VisualizerSpeedSelector speed={speed} onChange={setSpeed} isAr={isAr} />
      </div>
    </div>
  );
}
