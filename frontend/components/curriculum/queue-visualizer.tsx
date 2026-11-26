"use client";

import React, { useState } from "react";
import { Plus, Minus, RotateCcw, Layers, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils/utils";

export function QueueVisualizer() {
  const { language } = useI18n();
  const isAr = language === "ar";

  const [queue, setQueue] = useState<number[]>([15, 30, 45]);
  const [inputValue, setInputValue] = useState<string>("60");
  const [message, setMessage] = useState<{ en: string; ar: string }>({
    en: "Queue initialized with 3 elements (FIFO: First-In First-Out).",
    ar: "تمت تهيئة الرتل بـ 3 عناصر وفق مبدأ FIFO (الداخل أولاً يخرج أولاً)."
  });
  const [isError, setIsError] = useState(false);

  const MAX_CAPACITY = 6;

  const handleEnqueue = () => {
    const val = parseInt(inputValue, 10);
    if (isNaN(val)) return;

    if (queue.length >= MAX_CAPACITY) {
      setIsError(true);
      setMessage({
        en: "Queue Overflow! Maximum demo capacity (6) reached.",
        ar: "امتلأ الرتل (Overflow)! تم الوصول للسعة القصوى 6 عناصر."
      });
      return;
    }

    setIsError(false);
    setQueue((prev) => [...prev, val]);
    setMessage({
      en: `Enqueued ${val} at the REAR of the queue.`,
      ar: `تم إدخال القيمة ${val} في نهاية الرتل (REAR).`
    });
    setInputValue(String(val + 15));
  };

  const handleDequeue = () => {
    if (queue.length === 0) {
      setIsError(true);
      setMessage({
        en: "Queue Underflow! Cannot dequeue from an empty queue.",
        ar: "الرتل فارغ (Underflow)! لا توجد عناصر لإخراجها."
      });
      return;
    }

    const removed = queue[0];
    setIsError(false);
    setQueue((prev) => prev.slice(1));
    setMessage({
      en: `Dequeued ${removed} from the FRONT of the queue.`,
      ar: `تم إخراج القيمة ${removed} من مقدمة الرتل (FRONT).`
    });
  };

  const handleReset = () => {
    setQueue([15, 30, 45]);
    setInputValue("60");
    setIsError(false);
    setMessage({
      en: "Queue reset to initial state [15, 30, 45].",
      ar: "تمت إعادة الرتل إلى الحالة الابتدائية [15, 30, 45]."
    });
  };

  return (
    <div
      className="rounded-3xl border border-white/10 bg-neutral-900/60 p-6 md:p-8 backdrop-blur-xl shadow-2xl"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-white/10 gap-3">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Layers className="w-5 h-5" />
          </span>
          <div>
            <h4 className="text-lg font-bold text-white">
              {isAr ? "محاكي الرتل Queue (FIFO)" : "Queue Visualizer (FIFO)"}
            </h4>
            <span className="text-xs text-neutral-400 font-mono">
              {isAr ? "أول عنصر يدخل هو أول عنصر يخرج O(1)" : "First-In First-Out Linear Structure O(1)"}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            dir="ltr"
            className="w-20 px-3 py-1.5 bg-black/60 border border-white/10 rounded-xl text-xs font-mono text-white text-center focus:outline-none focus:border-indigo-500"
          />
          <button
            type="button"
            onClick={handleEnqueue}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/30"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isAr ? "إدراج Enqueue" : "Enqueue"}</span>
          </button>
          <button
            type="button"
            onClick={handleDequeue}
            className="px-3.5 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 font-bold text-xs flex items-center gap-1.5 transition-all border border-rose-500/30"
          >
            <Minus className="w-3.5 h-3.5" />
            <span>{isAr ? "إخراج Dequeue" : "Dequeue"}</span>
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

      {/* Status Notice */}
      <div
        className={cn(
          "p-4 rounded-2xl text-xs leading-relaxed mb-8 flex items-center gap-2.5 border",
          isError
            ? "bg-rose-950/40 border-rose-500/30 text-rose-300"
            : "bg-indigo-950/40 border-indigo-500/30 text-indigo-200"
        )}
      >
        {isError && <AlertCircle className="w-4 h-4 shrink-0" />}
        <span>{isAr ? message.ar : message.en}</span>
      </div>

      {/* Queue Horizontal Tube Display */}
      <div
        className="relative p-6 rounded-3xl bg-black/50 border border-white/10 overflow-hidden min-h-[160px] flex items-center justify-between"
        dir="ltr"
      >
        <div className="flex flex-col items-center text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
          <span>FRONT</span>
          <span className="text-[10px] text-neutral-500">
            {isAr ? "(مخرج العناصر)" : "(Leaves here)"}
          </span>
        </div>

        <div className="flex items-center gap-3 px-4 flex-1 justify-center overflow-x-auto py-2">
          <AnimatePresence>
            {queue.map((item, index) => (
              <motion.div
                key={`${item}-${index}`}
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -20 }}
                transition={{ duration: 0.25 }}
                className={cn(
                  "w-16 h-16 rounded-2xl border flex flex-col items-center justify-center font-mono font-black text-lg shadow-xl shrink-0",
                  index === 0
                    ? "bg-emerald-600/20 border-emerald-500/50 text-emerald-300 shadow-emerald-500/10"
                    : index === queue.length - 1
                    ? "bg-indigo-600/20 border-indigo-500/50 text-indigo-300 shadow-indigo-500/10"
                    : "bg-white/5 border-white/10 text-white"
                )}
              >
                <span>{item}</span>
                <span className="text-[9px] text-neutral-500 font-normal">[{index}]</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {queue.length === 0 && (
            <div className="text-neutral-500 text-xs font-mono py-6">
              {isAr ? "الرتل فارغ حالياً" : "Queue is empty"}
            </div>
          )}
        </div>

        <div className="flex flex-col items-center text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
          <span>REAR</span>
          <span className="text-[10px] text-neutral-500">
            {isAr ? "(مدخل العناصر)" : "(Enters here)"}
          </span>
        </div>
      </div>
    </div>
  );
}
