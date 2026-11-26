"use client";

import React, { useEffect, useState } from "react";
import { Pause, Play, RotateCcw, ArrowRight, Cpu, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils/utils";
import { VisualizerSpeedSelector, type VisualizerSpeed } from "./visualizer-speed";

interface VariableStep {
  code: string;
  explanationEn: string;
  explanationAr: string;
  vars: {
    name: string;
    type: string;
    address: string;
    value: string | number;
    highlighted?: boolean;
  }[];
}

const STEPS: VariableStep[] = [
  {
    code: "int score = 85;",
    explanationEn: "Declares integer variable 'score' and allocates 4 bytes on the Stack at 0x7fff10.",
    explanationAr: "يعرّف المتغير الصحيح score ويحجز له 4 بايت في الذاكرة عند العنوان 0x7fff10.",
    vars: [
      { name: "score", type: "int (4 bytes)", address: "0x7fff10", value: 85, highlighted: true },
      { name: "playerName", type: "string", address: "0x7fff14", value: '"Player1"', highlighted: false },
      { name: "isVerified", type: "bool (1 byte)", address: "0x7fff18", value: "false", highlighted: false }
    ]
  },
  {
    code: "score = score + 15; // Assignment",
    explanationEn: "CPU fetches value 85, computes 85 + 15 = 100 in ALU, and overwrites address 0x7fff10.",
    explanationAr: "يجلب المعالج القيمة 85، ويجمع 15 داخل وحدة ALU ليصبح الناتج 100، ثم يحدّث العنوان 0x7fff10.",
    vars: [
      { name: "score", type: "int (4 bytes)", address: "0x7fff10", value: 100, highlighted: true },
      { name: "playerName", type: "string", address: "0x7fff14", value: '"Player1"', highlighted: false },
      { name: "isVerified", type: "bool (1 byte)", address: "0x7fff18", value: "false", highlighted: false }
    ]
  },
  {
    code: 'playerName = "Alice";',
    explanationEn: "Updates string reference at 0x7fff14 to point to the new string literal.",
    explanationAr: "يحدّث مرجع النص عند 0x7fff14 ليشير إلى القيمة النصية الجديدة Alice.",
    vars: [
      { name: "score", type: "int (4 bytes)", address: "0x7fff10", value: 100, highlighted: false },
      { name: "playerName", type: "string", address: "0x7fff14", value: '"Alice"', highlighted: true },
      { name: "isVerified", type: "bool (1 byte)", address: "0x7fff18", value: "false", highlighted: false }
    ]
  },
  {
    code: "isVerified = (score >= 100);",
    explanationEn: "Evaluates condition (100 >= 100) -> true, storing boolean 1 at 0x7fff18.",
    explanationAr: "يفحص الشرط المنطقي (100 >= 100) ويعطي true ويخزنها في الخانة المنطقية 0x7fff18.",
    vars: [
      { name: "score", type: "int (4 bytes)", address: "0x7fff10", value: 100, highlighted: false },
      { name: "playerName", type: "string", address: "0x7fff14", value: '"Alice"', highlighted: false },
      { name: "isVerified", type: "bool (1 byte)", address: "0x7fff18", value: "true", highlighted: true }
    ]
  }
];

export function VariablesVisualizer() {
  const { language } = useI18n();
  const isAr = language === "ar";

  const [stepIndex, setStepIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState<VisualizerSpeed>(1);

  const currentStep = STEPS[stepIndex];
  const isDone = stepIndex >= STEPS.length - 1;

  useEffect(() => {
    if (!isRunning || isDone) return;
    const timer = setTimeout(() => {
      setStepIndex((prev) => {
        const next = prev + 1;
        if (next >= STEPS.length - 1) setIsRunning(false);
        return Math.min(STEPS.length - 1, next);
      });
    }, Math.round(1200 / speed));
    return () => clearTimeout(timer);
  }, [isRunning, isDone, speed, stepIndex]);

  const handleReset = () => {
    setStepIndex(0);
    setIsRunning(false);
  };

  return (
    <div
      className="rounded-3xl border border-white/10 bg-neutral-900/60 p-6 md:p-8 backdrop-blur-xl shadow-2xl"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-white/10 gap-3">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Cpu className="w-5 h-5" />
          </span>
          <div>
            <h4 className="text-lg font-bold text-white">
              {isAr ? "محاكي المتغيرات وتخصيص الذاكرة" : "Variables & Memory Allocation Visualizer"}
            </h4>
            <span className="text-xs text-neutral-400 font-mono">
              {isAr ? "خلايا المكدس وتغيير القيم خطوة بخطوة" : "Stack Memory Cells & Value Mutation"}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <VisualizerSpeedSelector speed={speed} onChange={setSpeed} isAr={isAr} />

          <button
            type="button"
            onClick={() => setIsRunning((r) => !r)}
            disabled={isDone}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/30"
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? (isAr ? "إيقاف" : "Pause") : isAr ? "تشغيل" : "Play"}</span>
          </button>

          <button
            type="button"
            onClick={() => setStepIndex((prev) => Math.min(STEPS.length - 1, prev + 1))}
            disabled={isRunning || isDone}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white font-semibold text-xs flex items-center gap-1.5 transition-all border border-white/10"
          >
            <span>{isAr ? "الخطوة التالية" : "Next Step"}</span>
            <ArrowRight className="w-3 h-3 rtl:rotate-180" />
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors border border-white/5"
            title={isAr ? "إعادة ضبط" : "Reset"}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Code Snippet Box */}
      <div
        className="mb-6 p-4 rounded-2xl bg-black/70 border border-white/10 font-mono text-sm flex flex-wrap items-center justify-between gap-2"
        dir="ltr"
      >
        <div className="text-indigo-300">
          <span className="text-neutral-500 me-3 select-none">Line {stepIndex + 1}:</span>
          <code>{currentStep.code}</code>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold font-mono">
          {isAr ? `الخطوة ${stepIndex + 1} / ${STEPS.length}` : `Step ${stepIndex + 1} of ${STEPS.length}`}
        </span>
      </div>

      {/* Explanation Banner */}
      <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 mb-8 leading-relaxed">
        <strong className="text-white block mb-1">
          {isAr ? "حركة المعالج والذاكرة:" : "CPU & Memory Action:"}
        </strong>
        {isAr ? currentStep.explanationAr : currentStep.explanationEn}
      </div>

      {/* Memory Boxes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" dir="ltr">
        {currentStep.vars.map((v) => (
          <div
            key={v.name}
            className={cn(
              "p-5 rounded-2xl border transition-all duration-300 relative",
              v.highlighted
                ? "bg-indigo-600/20 border-indigo-500/60 shadow-[0_0_20px_rgba(99,102,241,0.25)] scale-[1.02]"
                : "bg-black/40 border-white/10"
            )}
          >
            <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-2">
              <span>Addr: {v.address}</span>
              <span className="text-[10px] uppercase font-bold text-neutral-400">{v.type}</span>
            </div>

            <div className="flex items-center justify-between mt-3">
              <span className="font-bold text-white text-base font-mono">{v.name}</span>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 font-mono font-bold text-emerald-400 text-base">
                {v.value}
              </div>
            </div>

            {v.highlighted && (
              <div className="mt-3 text-[10px] font-mono text-indigo-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span>{isAr ? "تم تعديله في هذه الخطوة" : "Modified in this step"}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
