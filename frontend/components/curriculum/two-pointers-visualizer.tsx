"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, CheckCircle2, ArrowRightLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils/utils";
import { VisualizerSpeedSelector, type VisualizerSpeed } from "./visualizer-speed";

interface TwoPointersStep {
  stepIndex: number;
  left: number;
  right: number;
  currentSum: number;
  status: "comparing" | "found" | "advance_left" | "advance_right" | "not_found";
  explanation: {
    en: string;
    ar: string;
  };
}

const DEFAULT_ARRAY = [1, 3, 5, 8, 11, 14, 18, 22];

export function TwoPointersVisualizer({ initialTarget = 19 }: { initialTarget?: number }) {
  const { language } = useI18n();
  const isAr = language === "ar";

  const [array] = useState<number[]>(DEFAULT_ARRAY);
  const [target, setTarget] = useState<number>(initialTarget);
  const [steps, setSteps] = useState<TwoPointersStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<VisualizerSpeed>(1);
  const playTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Compute steps
  useEffect(() => {
    const computedSteps: TwoPointersStep[] = [];
    let l = 0;
    let r = array.length - 1;
    let step = 0;

    while (l < r) {
      const sum = array[l] + array[r];
      if (sum === target) {
        computedSteps.push({
          stepIndex: step++,
          left: l,
          right: r,
          currentSum: sum,
          status: "found",
          explanation: {
            en: `Pair found! array[${l}] (${array[l]}) + array[${r}] (${array[r]}) === ${target}.`,
            ar: `تم إيجاد الزوج! array[${l}] (${array[l]}) + array[${r}] (${array[r]}) === ${target}.`,
          },
        });
        break;
      } else if (sum < target) {
        computedSteps.push({
          stepIndex: step++,
          left: l,
          right: r,
          currentSum: sum,
          status: "advance_left",
          explanation: {
            en: `Sum ${sum} < ${target}. To increase the sum, increment left pointer (L -> ${l + 1}).`,
            ar: `المجموع ${sum} < ${target}. لزيادة المجموع، نحرك المؤشر الأيسر خطوة للأمام (L -> ${l + 1}).`,
          },
        });
        l++;
      } else {
        computedSteps.push({
          stepIndex: step++,
          left: l,
          right: r,
          currentSum: sum,
          status: "advance_right",
          explanation: {
            en: `Sum ${sum} > ${target}. To decrease the sum, decrement right pointer (<- R at ${r - 1}).`,
            ar: `المجموع ${sum} > ${target}. لتقليل المجموع، نحرك المؤشر الأيمن خطوة للوراء (<- R عند ${r - 1}).`,
          },
        });
        r--;
      }
    }

    if (l >= r && computedSteps[computedSteps.length - 1]?.status !== "found") {
      computedSteps.push({
        stepIndex: step++,
        left: l,
        right: r,
        currentSum: 0,
        status: "not_found",
        explanation: {
          en: `Pointers met (L >= R). No pair sums up to ${target}.`,
          ar: `التقى المؤشران (L >= R). لا يوجد زوج يساوي مجموعه ${target}.`,
        },
      });
    }

    setSteps(computedSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [array, target]);

  // Handle auto-play
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

  const currentStep = steps[currentStepIndex];

  return (
    <div
      className="w-full bg-neutral-900/70 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ArrowRightLeft className="w-4 h-4" />
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {isAr ? "أسلوب المؤشرين (Two Pointers - مجموع الزوج)" : "Two Pointers Technique (Pair Sum)"}
            </h3>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            {isAr
              ? "اكتشف زوجاً يساوي الهدف داخل مصفوفة مرتبة بزمن خطي O(N) ومساحة إضافية O(1)."
              : "Solve the 2-Sum problem on a sorted array in linear O(N) time with zero extra space."}
          </p>
        </div>

        {/* Target Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-neutral-400">
            {isAr ? "المجموع المطلوب:" : "Target Sum:"}
          </span>
          <div className="flex items-center gap-1.5" dir="ltr">
            {[13, 19, 27, 40].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setTarget(val)}
                className={cn(
                  "px-2.5 py-1 text-xs rounded-lg font-mono font-medium transition-all",
                  target === val
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/30"
                    : "bg-white/5 hover:bg-white/10 text-neutral-300"
                )}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Canvas */}
      <div className="py-8 overflow-x-auto" dir="ltr">
        <div className="min-w-[560px] flex flex-col items-center justify-center">
          <div className="grid grid-flow-col auto-cols-fr gap-2 w-full max-w-xl h-8 mb-2">
            {array.map((_, idx) => {
              const isLeft = currentStep && currentStep.left === idx;
              const isRight = currentStep && currentStep.right === idx;

              return (
                <div key={`top-${idx}`} className="flex flex-col items-center justify-end">
                  {isLeft && (
                    <motion.span
                      layoutId="ptr-left"
                      className="text-[10px] font-black text-cyan-400 uppercase tracking-wider"
                    >
                      L -&gt;
                    </motion.span>
                  )}
                  {isRight && (
                    <motion.span
                      layoutId="ptr-right"
                      className="text-[10px] font-black text-rose-400 uppercase tracking-wider"
                    >
                      &lt;- R
                    </motion.span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="grid grid-flow-col auto-cols-fr gap-2 w-full max-w-xl">
            {array.map((val, idx) => {
              const isLeft = currentStep && currentStep.left === idx;
              const isRight = currentStep && currentStep.right === idx;
              const isFoundPair = currentStep?.status === "found" && (isLeft || isRight);

              return (
                <motion.div
                  key={`val-${idx}`}
                  animate={{
                    scale: isFoundPair ? 1.08 : isLeft || isRight ? 1.04 : 1,
                  }}
                  className={cn(
                    "w-12 h-14 md:w-14 md:h-16 rounded-xl flex flex-col items-center justify-center border font-mono font-bold transition-all shadow-lg",
                    isFoundPair
                      ? "bg-emerald-500/25 border-emerald-400 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.5)] ring-2 ring-emerald-500"
                      : isLeft
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-200 ring-2 ring-cyan-500/40"
                      : isRight
                      ? "bg-rose-500/20 border-rose-400 text-rose-200 ring-2 ring-rose-500/40"
                      : "bg-neutral-800/80 border-white/10 text-neutral-300"
                  )}
                >
                  <span className="text-sm md:text-base font-bold">{val}</span>
                  <span className="text-[9px] text-neutral-500 font-sans mt-0.5">[{idx}]</span>
                </motion.div>
              );
            })}
          </div>

          {currentStep && currentStep.left < array.length && currentStep.right >= 0 && (
            <div className="mt-4 px-4 py-1.5 rounded-full bg-neutral-800/90 border border-white/10 text-xs font-mono flex items-center gap-3">
              <span className="text-cyan-400">array[{currentStep.left}] = {array[currentStep.left]}</span>
              <span className="text-neutral-500">+</span>
              <span className="text-rose-400">array[{currentStep.right}] = {array[currentStep.right]}</span>
              <span className="text-neutral-500">=</span>
              <span
                className={cn(
                  "font-bold px-2 py-0.5 rounded",
                  currentStep.currentSum === target ? "bg-emerald-500/20 text-emerald-300" : "text-white"
                )}
              >
                {currentStep.currentSum}
              </span>
              <span className="text-neutral-400 text-[10px]">
                ({isAr ? `الهدف: ${target}` : `Target: ${target}`})
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Step Explanation */}
      <div className="mt-2 p-4 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-4">
        <div className="mt-0.5 shrink-0">
          {currentStep?.status === "found" ? (
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          ) : (
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
              #{currentStepIndex + 1}
            </div>
          )}
        </div>
        <div className="flex-1">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            {isAr
              ? `الخطوة ${currentStepIndex + 1} من ${steps.length}`
              : `Step ${currentStepIndex + 1} of ${steps.length}`}
          </span>
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
            title={isAr ? "إعادة" : "Reset"}
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
          >
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => setIsPlaying((prev) => !prev)}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center gap-2 transition-all shadow-md shadow-emerald-600/30"
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
          >
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>

          <VisualizerSpeedSelector speed={speed} onChange={setSpeed} isAr={isAr} />
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-neutral-400" dir="ltr">
          <span>{isAr ? "الزمن:" : "Time:"} <strong className="text-emerald-400">O(N)</strong></span>
          <span>{isAr ? "المساحة:" : "Space:"} <strong className="text-emerald-400">O(1)</strong></span>
        </div>
      </div>
    </div>
  );
}
