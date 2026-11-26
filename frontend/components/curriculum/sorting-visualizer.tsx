"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Shuffle, ArrowUpDown } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils/utils";
import { VisualizerSpeedSelector, type VisualizerSpeed } from "./visualizer-speed";

interface SortStep {
  array: number[];
  comparingIndices: [number, number] | [];
  swappingIndices: [number, number] | [];
  sortedIndices: number[];
  description: {
    en: string;
    ar: string;
  };
  comparisons: number;
  swaps: number;
}

const DEFAULT_ARRAY = [45, 12, 85, 32, 89, 39, 69, 22, 54];

export function SortingVisualizer() {
  const { language } = useI18n();
  const isAr = language === "ar";

  const [initialArray, setInitialArray] = useState<number[]>(DEFAULT_ARRAY);
  const [algorithm, setAlgorithm] = useState<"bubble" | "selection">("bubble");
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<VisualizerSpeed>(1);
  const playTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate steps whenever initialArray or algorithm changes
  useEffect(() => {
    const computedSteps: SortStep[] = [];
    const arr = [...initialArray];
    let comparisons = 0;
    let swaps = 0;

    // Initial state
    computedSteps.push({
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [],
      description: {
        en: `Initial unsorted array ready. Algorithm: ${algorithm === "bubble" ? "Bubble Sort" : "Selection Sort"}.`,
        ar: `المصفوفة غير المرتبة جاهزة. الخوارزمية: ${algorithm === "bubble" ? "فرز الفقاعة" : "فرز الاختيار"}.`
      },
      comparisons: 0,
      swaps: 0
    });

    if (algorithm === "bubble") {
      const n = arr.length;
      const sorted: number[] = [];

      for (let i = 0; i < n - 1; i++) {
        let swappedInPass = false;
        for (let j = 0; j < n - i - 1; j++) {
          comparisons++;
          computedSteps.push({
            array: [...arr],
            comparingIndices: [j, j + 1],
            swappingIndices: [],
            sortedIndices: [...sorted],
            description: {
              en: `Compare arr[${j}] (${arr[j]}) with arr[${j + 1}] (${arr[j + 1]}).`,
              ar: `مقارنة arr[${j}] (${arr[j]}) مع arr[${j + 1}] (${arr[j + 1]}).`
            },
            comparisons,
            swaps
          });

          if (arr[j] > arr[j + 1]) {
            swaps++;
            swappedInPass = true;
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;

            computedSteps.push({
              array: [...arr],
              comparingIndices: [],
              swappingIndices: [j, j + 1],
              sortedIndices: [...sorted],
              description: {
                en: `${arr[j + 1]} > ${arr[j]}. Swap elements at indices ${j} and ${j + 1}.`,
                ar: `${arr[j + 1]} > ${arr[j]}. تبديل العنصرين في الفهرسين ${j} و ${j + 1}.`
              },
              comparisons,
              swaps
            });
          }
        }
        sorted.push(n - i - 1);
        if (!swappedInPass) {
          // Optimized bubble sort early exit
          for (let k = 0; k < n; k++) {
            if (!sorted.includes(k)) sorted.push(k);
          }
          break;
        }
      }
      for (let k = 0; k < n; k++) {
        if (!sorted.includes(k)) sorted.push(k);
      }
    } else {
      // Selection Sort
      const n = arr.length;
      const sorted: number[] = [];

      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
          comparisons++;
          computedSteps.push({
            array: [...arr],
            comparingIndices: [minIdx, j],
            swappingIndices: [],
            sortedIndices: [...sorted],
            description: {
              en: `Scanning for minimum: compare arr[${j}] (${arr[j]}) with current min arr[${minIdx}] (${arr[minIdx]}).`,
              ar: `البحث عن الأصغر: مقارنة arr[${j}] (${arr[j]}) مع الأصغر الحالي arr[${minIdx}] (${arr[minIdx]}).`
            },
            comparisons,
            swaps
          });

          if (arr[j] < arr[minIdx]) {
            minIdx = j;
          }
        }

        if (minIdx !== i) {
          swaps++;
          const temp = arr[i];
          arr[i] = arr[minIdx];
          arr[minIdx] = temp;

          computedSteps.push({
            array: [...arr],
            comparingIndices: [],
            swappingIndices: [i, minIdx],
            sortedIndices: [...sorted],
            description: {
              en: `Found minimum ${arr[i]} at index ${minIdx}. Swap with position ${i}.`,
              ar: `تم العثور على العنصر الأصغر ${arr[i]} في الفهرس ${minIdx}. تبديله مع الموضع ${i}.`
            },
            comparisons,
            swaps
          });
        }
        sorted.push(i);
      }
      sorted.push(n - 1);
    }

    // Final completed step
    const allSorted = arr.map((_, idx) => idx);
    computedSteps.push({
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: allSorted,
      description: {
        en: `Array is fully sorted! Completed with ${comparisons} comparisons and ${swaps} swaps.`,
        ar: `تم فرز المصفوفة بالكامل! اكتملت العملية بـ ${comparisons} مقارنة و ${swaps} عملية تبديل.`
      },
      comparisons,
      swaps
    });

    setSteps(computedSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [initialArray, algorithm]);

  // Autoplay loop
  useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, Math.round(700 / speed));
    } else if (playTimerRef.current) {
      clearInterval(playTimerRef.current);
    }

    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlaying, steps.length, speed]);

  const generateRandom = () => {
    const newArr = Array.from({ length: 9 }, () => Math.floor(Math.random() * 85) + 12);
    setInitialArray(newArr);
  };

  const currentStep = steps[currentStepIndex] || {
    array: initialArray,
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: [],
    description: { en: "Loading...", ar: "جاري التحميل..." },
    comparisons: 0,
    swaps: 0
  };

  const maxVal = Math.max(...initialArray, 90);

  return (
    <div
      className="bg-neutral-900/80 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Visualizer Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <ArrowUpDown className="w-4 h-4" />
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {isAr ? "محاكي خوارزميات الفرز التفاعلي" : "Interactive Sorting Visualizer"}
            </h3>
          </div>
          <p className="text-xs text-neutral-400">
            {isAr
              ? "تتبع المقارنات والتبديلات وحركة العناصر خطوة بخطوة في فرز الفقاعة وفرز الاختيار."
              : "Step through comparison-based sorting algorithms and witness element movement."}
          </p>
        </div>

        {/* Algorithm Selection */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setAlgorithm("bubble")}
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all",
              algorithm === "bubble"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
            )}
          >
            {isAr ? "فرز الفقاعة (Bubble)" : "Bubble Sort"}
          </button>
          <button
            type="button"
            onClick={() => setAlgorithm("selection")}
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all",
              algorithm === "selection"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
            )}
          >
            {isAr ? "فرز الاختيار (Selection)" : "Selection Sort"}
          </button>
          <button
            type="button"
            onClick={generateRandom}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-medium border border-white/10 transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5" />
            {isAr ? "مصفوفة عشوائية" : "Randomize"}
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-black/40 border border-white/5 rounded-2xl p-3 text-center">
          <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold block">
            {isAr ? "الخطوة" : "Step"}
          </span>
          <span className="text-lg font-mono font-bold text-white" dir="ltr">
            {currentStepIndex} / {Math.max(0, steps.length - 1)}
          </span>
        </div>
        <div className="bg-black/40 border border-white/5 rounded-2xl p-3 text-center">
          <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold block">
            {isAr ? "المقارنات" : "Comparisons"}
          </span>
          <span className="text-lg font-mono font-bold text-amber-400">{currentStep.comparisons}</span>
        </div>
        <div className="bg-black/40 border border-white/5 rounded-2xl p-3 text-center">
          <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold block">
            {isAr ? "التبديلات" : "Swaps"}
          </span>
          <span className="text-lg font-mono font-bold text-rose-400">{currentStep.swaps}</span>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div
        className="h-64 flex items-end justify-center gap-2 md:gap-4 px-4 pb-4 mb-6 bg-black/40 rounded-3xl border border-white/5 overflow-hidden"
        dir="ltr"
      >
        {currentStep.array.map((val, idx) => {
          const isComparing = (currentStep.comparingIndices as number[]).includes(idx);
          const isSwapping = (currentStep.swappingIndices as number[]).includes(idx);
          const isSorted = currentStep.sortedIndices.includes(idx);

          let barColor = "bg-neutral-700/80 border-neutral-600";
          let textColor = "text-neutral-400";

          if (isSorted) {
            barColor = "bg-emerald-500/80 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]";
            textColor = "text-emerald-300 font-bold";
          } else if (isSwapping) {
            barColor = "bg-rose-500 border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.4)]";
            textColor = "text-rose-300 font-bold";
          } else if (isComparing) {
            barColor = "bg-amber-500 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]";
            textColor = "text-amber-300 font-bold";
          }

          const heightPercent = Math.max(15, Math.round((val / maxVal) * 100));

          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 max-w-[50px] h-full justify-end">
              <span className={cn("text-xs font-mono transition-colors", textColor)}>{val}</span>
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                style={{ height: `${heightPercent}%` }}
                className={cn("w-full rounded-t-xl border-t border-x transition-colors duration-200", barColor)}
              />
              <span className="text-[10px] font-mono text-neutral-500">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-400 mb-6">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-neutral-700" />
          <span>{isAr ? "غير مرتب" : "Unsorted"}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <span>{isAr ? "مقارنة حالية" : "Comparing"}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <span>{isAr ? "تبديل" : "Swapping"}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span>{isAr ? "مرتب نهائياً" : "Sorted"}</span>
        </div>
      </div>

      {/* Step Explanation Banner */}
      <div className="bg-neutral-950/80 border border-white/10 rounded-2xl p-4 mb-6">
        <p className="text-sm text-neutral-200 font-medium leading-relaxed">
          {isAr ? currentStep.description.ar : currentStep.description.en}
        </p>
      </div>

      {/* Playback Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIndex(0);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-semibold border border-white/10 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {isAr ? "إعادة" : "Reset"}
          </button>

          <button
            type="button"
            disabled={currentStepIndex === 0}
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIndex((prev) => Math.max(0, prev - 1));
            }}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white border border-white/10 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          </button>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                {isAr ? "إيقاف" : "Pause"}
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                {isAr ? "تشغيل" : "Play"}
              </>
            )}
          </button>

          <button
            type="button"
            disabled={currentStepIndex >= steps.length - 1}
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
            }}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white border border-white/10 transition-colors"
          >
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>

          <VisualizerSpeedSelector speed={speed} onChange={setSpeed} isAr={isAr} />
        </div>

        <div className="text-xs font-mono text-neutral-500" dir="ltr">
          {algorithm === "bubble" ? "Bubble: O(N^2)" : "Selection: O(N^2)"}
        </div>
      </div>
    </div>
  );
}
