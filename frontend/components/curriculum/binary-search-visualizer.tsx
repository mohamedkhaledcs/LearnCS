"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/utils";
import { useI18n } from "@/lib/i18n/i18n-context";
import { VisualizerSpeedSelector, type VisualizerSpeed } from "./visualizer-speed";

interface BinarySearchStep {
  stepIndex: number;
  left: number;
  right: number;
  mid: number;
  midValue: number;
  status: "comparing" | "found" | "eliminate_left" | "eliminate_right" | "not_found";
  explanation: {
    en: string;
    ar: string;
  };
}

const DEFAULT_ARRAY = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91];

export function BinarySearchVisualizer({ initialTarget = 23 }: { initialTarget?: number }) {
  const { language } = useI18n();
  const isAr = language === "ar";

  const [array, setArray] = useState<number[]>(DEFAULT_ARRAY);
  const [arrayInput, setArrayInput] = useState<string>(DEFAULT_ARRAY.join(", "));
  const [target, setTarget] = useState<number>(initialTarget);
  const [targetInput, setTargetInput] = useState<string>(initialTarget.toString());
  const [steps, setSteps] = useState<BinarySearchStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<VisualizerSpeed>(1);
  const playTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Pre-calculate all binary search steps for the current target
  useEffect(() => {
    const computedSteps: BinarySearchStep[] = [];
    let l = 0;
    let r = array.length - 1;
    let stepNum = 0;

    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      const val = array[mid];

      if (val === target) {
        computedSteps.push({
          stepIndex: stepNum++,
          left: l,
          right: r,
          mid,
          midValue: val,
          status: "found",
          explanation: {
            en: `Target ${target} found at index ${mid}! array[${mid}] === ${target}.`,
            ar: `تم العثور على الرقم ${target} في الفهرس ${mid}! array[${mid}] === ${target}.`,
          },
        });
        break;
      } else if (val < target) {
        computedSteps.push({
          stepIndex: stepNum++,
          left: l,
          right: r,
          mid,
          midValue: val,
          status: "eliminate_left",
          explanation: {
            en: `array[${mid}] (${val}) < ${target}. Eliminate left half [${l}..${mid}]. Move left = mid + 1 (${mid + 1}).`,
            ar: `القيمة array[${mid}] (${val}) أصغر من ${target}. نستبعد النصف الأيسر [${l}..${mid}] ونحرّك left = ${mid + 1}.`,
          },
        });
        l = mid + 1;
      } else {
        computedSteps.push({
          stepIndex: stepNum++,
          left: l,
          right: r,
          mid,
          midValue: val,
          status: "eliminate_right",
          explanation: {
            en: `array[${mid}] (${val}) > ${target}. Eliminate right half [${mid}..${r}]. Move right = mid - 1 (${mid - 1}).`,
            ar: `القيمة array[${mid}] (${val}) أكبر من ${target}. نستبعد النصف الأيمن [${mid}..${r}] ونحرّك right = ${mid - 1}.`,
          },
        });
        r = mid - 1;
      }
    }

    if (l > r) {
      computedSteps.push({
        stepIndex: stepNum++,
        left: l,
        right: r,
        mid: -1,
        midValue: -1,
        status: "not_found",
        explanation: {
          en: `Search space exhausted (left > right). Target ${target} is not in the array.`,
          ar: `انتهت مساحة البحث (left > right). الرقم ${target} غير موجود بالمصفوفة.`,
        },
      });
    }

    setSteps(computedSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [array, target]);

  // Handle auto-play with adjustable speed
  useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = setTimeout(() => {
        if (currentStepIndex < steps.length - 1) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, Math.round(1300 / speed));
    }
    return () => {
      if (playTimerRef.current) clearTimeout(playTimerRef.current);
    };
  }, [isPlaying, currentStepIndex, steps.length, speed]);

  const handleApplyTarget = (newVal: number) => {
    setTarget(newVal);
    setTargetInput(newVal.toString());
  };

  const handleApplyArray = (raw: string) => {
    const parsed = raw
      .split(",")
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n))
      .slice(0, 14)
      .sort((a, b) => a - b);
    if (parsed.length > 0) {
      setArray(parsed);
      setArrayInput(parsed.join(", "));
    }
  };

  const currentStep: BinarySearchStep | undefined = steps[currentStepIndex];

  return (
    <div
      className="w-full bg-neutral-900/70 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Header & Target Selector */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Zap className="w-4 h-4" />
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {isAr ? "محاكي البحث الثنائي (Binary Search)" : "Binary Search Visualizer"}
            </h3>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            {isAr
              ? "شاهد كيف يقلّص البحث الثنائي مساحة البحث إلى النصف في كل خطوة بزمن O(log N)."
              : "Observe O(log N) logarithmic reduction dividing the search space by half at each step."}
          </p>
        </div>

        {/* Target input */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-neutral-400">
            {isAr ? "الهدف:" : "Target:"}
          </span>
          <div className="flex items-center gap-1.5" dir="ltr">
            {[8, 23, 56, 99].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => handleApplyTarget(val)}
                className={cn(
                  "px-2.5 py-1 text-xs rounded-lg font-mono font-medium transition-all",
                  target === val
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                    : "bg-white/5 hover:bg-white/10 text-neutral-300"
                )}
              >
                {val}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleApplyArray(arrayInput);
            }}
            className="flex items-center gap-1"
            dir="ltr"
          >
            <input
              type="text"
              value={arrayInput}
              onChange={(e) => setArrayInput(e.target.value)}
              aria-label="Custom sorted array"
              className="w-40 px-2 py-1 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-2 py-1 bg-white/10 hover:bg-white/20 text-xs text-white rounded-lg transition-colors"
            >
              {isAr ? "مصفوفة" : "Array"}
            </button>
          </form>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const num = parseInt(targetInput, 10);
              if (!isNaN(num)) handleApplyTarget(num);
            }}
            className="flex items-center gap-1 ms-1"
          >
            <input
              type="number"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              dir="ltr"
              className="w-16 px-2 py-1 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-white text-center focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-xs text-white rounded-lg transition-colors"
            >
              {isAr ? "تعيين" : "Set"}
            </button>
          </form>
        </div>
      </div>

      {/* Visual Array Canvas (Always LTR so index 0..N reads left-to-right mathematically) */}
      <div className="py-8 overflow-x-auto" dir="ltr">
        <div className="min-w-[620px] flex flex-col items-center justify-center">
          {/* Top Pointer Row (Mid) */}
          <div className="grid grid-flow-col auto-cols-fr gap-2 w-full max-w-2xl h-8 mb-2">
            {array.map((_, idx) => (
              <div key={`ptr-top-${idx}`} className="flex flex-col items-center justify-end">
                {currentStep && currentStep.mid === idx && (
                  <motion.div
                    layoutId="mid-pointer"
                    className="flex flex-col items-center"
                    initial={{ y: -5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    <span className="text-[10px] font-black tracking-widest text-indigo-400 uppercase">MID</span>
                    <div className="w-1.5 h-1.5 rotate-45 bg-indigo-400" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Array Elements */}
          <div className="grid grid-flow-col auto-cols-fr gap-2 w-full max-w-2xl">
            {array.map((val, idx) => {
              const isMid = currentStep && currentStep.mid === idx;
              const isFound = currentStep && currentStep.status === "found" && currentStep.mid === idx;
              const isInRange = currentStep && idx >= currentStep.left && idx <= currentStep.right;
              const isEliminated = currentStep && !isInRange;

              return (
                <div key={`elem-${idx}`} className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: isFound ? 1.08 : isMid ? 1.04 : 1,
                      opacity: isEliminated ? 0.25 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={cn(
                      "w-12 h-14 md:w-14 md:h-16 rounded-xl flex flex-col items-center justify-center border font-mono font-bold transition-colors relative shadow-lg",
                      isFound
                        ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                        : isMid
                        ? "bg-indigo-600/30 border-indigo-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] ring-2 ring-indigo-500/50"
                        : isInRange
                        ? "bg-neutral-800/80 border-white/20 text-neutral-200"
                        : "bg-neutral-950/60 border-white/5 text-neutral-600"
                    )}
                  >
                    <span className="text-sm md:text-base font-bold">{val}</span>
                    <span className="text-[9px] text-neutral-500 font-sans mt-0.5">[{idx}]</span>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Bottom Pointer Row (L & R) */}
          <div className="grid grid-flow-col auto-cols-fr gap-2 w-full max-w-2xl h-8 mt-2">
            {array.map((_, idx) => {
              const isLeft = currentStep && currentStep.left === idx;
              const isRight = currentStep && currentStep.right === idx;

              return (
                <div key={`ptr-bot-${idx}`} className="flex flex-col items-center justify-start">
                  {isLeft && isRight ? (
                    <span className="text-[10px] font-black text-amber-400 uppercase tracking-tighter">L=R</span>
                  ) : isLeft ? (
                    <span className="text-[10px] font-black text-cyan-400 uppercase">LEFT</span>
                  ) : isRight ? (
                    <span className="text-[10px] font-black text-rose-400 uppercase">RIGHT</span>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step Explanation Card */}
      <div className="mt-4 p-4 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-4">
        <div className="mt-0.5 shrink-0">
          {currentStep?.status === "found" ? (
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          ) : currentStep?.status === "not_found" ? (
            <div className="p-2 rounded-xl bg-red-500/20 text-red-400">
              <XCircle className="w-5 h-5" />
            </div>
          ) : (
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 font-mono text-xs font-bold">
              #{currentStepIndex + 1}
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              {isAr
                ? `الخطوة ${currentStepIndex + 1} من ${steps.length}`
                : `Step ${currentStepIndex + 1} of ${steps.length}`}
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-300" dir="ltr">
              {currentStep && currentStep.left <= currentStep.right
                ? `Range: [${currentStep.left}..${currentStep.right}] (Size: ${currentStep.right - currentStep.left + 1})`
                : isAr ? "النطاق: فارغ" : "Range: Empty"}
            </span>
          </div>
          <p className="text-sm font-medium text-neutral-100 mt-1 leading-relaxed">
            {isAr ? currentStep?.explanation.ar : currentStep?.explanation.en}
          </p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-white/10">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIndex(0);
            }}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
            title={isAr ? "إعادة ضبط" : "Reset"}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIndex((prev) => Math.max(0, prev - 1));
            }}
            disabled={currentStepIndex === 0}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 disabled:opacity-30 disabled:hover:bg-white/5 transition-colors"
            title={isAr ? "الخطوة السابقة" : "Previous Step"}
          >
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => setIsPlaying((prev) => !prev)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center gap-2 transition-all shadow-md shadow-indigo-600/30"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? (isAr ? "إيقاف" : "Pause") : isAr ? "تشغيل" : "Play"}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
            }}
            disabled={currentStepIndex === steps.length - 1}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 disabled:opacity-30 disabled:hover:bg-white/5 transition-colors"
            title={isAr ? "الخطوة التالية" : "Next Step"}
          >
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>

          <VisualizerSpeedSelector speed={speed} onChange={setSpeed} isAr={isAr} />
        </div>

        {/* Metric stats */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
          <div>
            {isAr ? "المقارنات:" : "Comparisons:"}{" "}
            <span className="text-white font-bold">{currentStepIndex + 1}</span>
          </div>
          <div>
            {isAr ? "الحد الأقصى O(log N):" : "Max Log2(N):"}{" "}
            <span className="text-indigo-400 font-bold">{isAr ? "4 خطوات" : "4 steps"}</span>
          </div>
          <div>
            {isAr ? "البحث الخطي:" : "Linear Search:"}{" "}
            <span className="text-rose-400 font-bold">
              {target > 0 && array.indexOf(target) !== -1 ? array.indexOf(target) + 1 : array.length}{" "}
              {isAr ? "خطوات" : "steps"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
