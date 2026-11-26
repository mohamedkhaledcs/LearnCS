"use client";

import React, { useState } from "react";
import { Layers, ArrowDown, ArrowUp, Eye, Trash2, AlertTriangle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils/utils";

interface StackItem {
  id: string;
  value: number | string;
}

const MAX_CAPACITY = 6;

export function StackVisualizer() {
  const { language } = useI18n();
  const isAr = language === "ar";

  const [items, setItems] = useState<StackItem[]>([
    { id: "1", value: 15 },
    { id: "2", value: 42 },
    { id: "3", value: 88 }
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [message, setMessage] = useState<{ en: string; ar: string; type: "info" | "warning" | "success" }>({
    en: "Stack initialized with 3 elements. LIFO (Last-In-First-Out) active.",
    ar: "تمت تهيئة المكدس بـ 3 عناصر. مبدأ LIFO نشط.",
    type: "info"
  });
  const [isPeeking, setIsPeeking] = useState<boolean>(false);

  const pushItem = () => {
    if (items.length >= MAX_CAPACITY) {
      setMessage({
        en: "Stack Overflow! Cannot push into a full stack.",
        ar: "فيض المكدس (Stack Overflow)! لا يمكن إضافة عناصر لمكدس ممتلئ.",
        type: "warning"
      });
      return;
    }

    const val = inputValue.trim() || Math.floor(Math.random() * 90 + 10).toString();
    const newItem: StackItem = {
      id: Math.random().toString(36).substring(2, 9),
      value: val
    };

    setItems((prev) => [...prev, newItem]);
    setInputValue("");
    setIsPeeking(false);
    setMessage({
      en: `Pushed '${val}' onto top of stack (Index ${items.length}).`,
      ar: `تم دفع '${val}' إلى قمة المكدس (الفهرس ${items.length}).`,
      type: "success"
    });
  };

  const popItem = () => {
    if (items.length === 0) {
      setMessage({
        en: "Stack Underflow! Cannot pop from an empty stack.",
        ar: "نقص المكدس (Stack Underflow)! لا يمكن السحب من مكدس فارغ.",
        type: "warning"
      });
      return;
    }

    const popped = items[items.length - 1];
    setItems((prev) => prev.slice(0, -1));
    setIsPeeking(false);
    setMessage({
      en: `Popped '${popped.value}' from the top of the stack.`,
      ar: `تم سحب العنصر '${popped.value}' من قمة المكدس.`,
      type: "info"
    });
  };

  const peekItem = () => {
    if (items.length === 0) {
      setMessage({
        en: "Stack is empty. Nothing to peek.",
        ar: "المكدس فارغ. لا يوجد عنصر للمعاينة.",
        type: "warning"
      });
      return;
    }

    setIsPeeking(true);
    const top = items[items.length - 1];
    setMessage({
      en: `Peeking: Top element is '${top.value}' at index ${items.length - 1}.`,
      ar: `معاينة: العنصر في القمة هو '${top.value}' في الفهرس ${items.length - 1}.`,
      type: "info"
    });
    setTimeout(() => setIsPeeking(false), 2000);
  };

  const clearStack = () => {
    setItems([]);
    setIsPeeking(false);
    setMessage({
      en: "Stack cleared completely.",
      ar: "تم تفريغ المكدس بالكامل.",
      type: "info"
    });
  };

  return (
    <div
      className="bg-neutral-900/80 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Layers className="w-4 h-4" />
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {isAr ? "محاكي المكدس التفاعلي (LIFO Stack)" : "Interactive LIFO Stack Visualizer"}
            </h3>
          </div>
          <p className="text-xs text-neutral-400">
            {isAr
              ? "جرّب عمليات Push وPop وPeek وشاهد مبدأ الداخل أخيراً يخرج أولاً."
              : "Observe the Last-In-First-Out mechanism with Push, Pop, and Peek operations."}
          </p>
        </div>

        {/* Capacity Indicator */}
        <div className="flex items-center gap-3">
          <div className="text-end">
            <span className="text-[10px] text-neutral-500 uppercase font-mono tracking-wider block">
              {isAr ? "السعة" : "Capacity"}
            </span>
            <span className="text-sm font-mono font-bold text-neutral-300" dir="ltr">
              {items.length} / {MAX_CAPACITY}
            </span>
          </div>
          <button
            type="button"
            onClick={clearStack}
            className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 border border-white/10 transition-colors"
            title={isAr ? "تفريغ المكدس" : "Clear Stack"}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
        {/* Controls Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder={isAr ? "القيمة (مثل 99)" : "Value (e.g. 99)"}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && pushItem()}
              dir="ltr"
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button
              type="button"
              onClick={pushItem}
              disabled={items.length >= MAX_CAPACITY}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all"
            >
              <ArrowDown className="w-4 h-4" />
              {isAr ? "إدخال Push" : "Push"}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={popItem}
              disabled={items.length === 0}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 disabled:opacity-30 disabled:cursor-not-allowed text-rose-300 border border-rose-500/30 text-xs font-bold transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
              {isAr ? "سحب القمة Pop" : "Pop (Remove Top)"}
            </button>

            <button
              type="button"
              onClick={peekItem}
              disabled={items.length === 0}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 disabled:opacity-30 disabled:cursor-not-allowed text-amber-300 border border-amber-500/30 text-xs font-bold transition-colors"
            >
              <Eye className="w-4 h-4" />
              {isAr ? "معاينة Peek" : "Peek (Top Item)"}
            </button>
          </div>

          {/* Theoretical Note */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2 text-xs text-neutral-400">
            <div className="flex items-center gap-1.5 text-indigo-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? "ضمانات التعقيد الزمني" : "Complexity Guarantees"}</span>
            </div>
            <p>
              {isAr ? (
                <>
                  تعمل كل من <code className="text-white font-mono">push()</code> و{" "}
                  <code className="text-white font-mono">pop()</code> و{" "}
                  <code className="text-white font-mono">peek()</code> في زمن ثابت{" "}
                  <span className="text-emerald-400 font-mono font-bold">O(1)</span> لأن التعامل ينحصر في القمة فقط.
                </>
              ) : (
                <>
                  Both <code className="text-white font-mono">push()</code> and{" "}
                  <code className="text-white font-mono">pop()</code> operate in strict{" "}
                  <span className="text-emerald-400 font-mono font-bold">O(1)</span> constant time because access is
                  restricted strictly to the top of the stack.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Stack Physical Representation Column */}
        <div className="flex flex-col items-center" dir="ltr">
          <div className="w-64 min-h-[260px] bg-black/50 border-x-2 border-b-2 border-neutral-700 rounded-b-2xl p-4 flex flex-col-reverse gap-2 relative shadow-inner">
            {items.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-600">
                <AlertTriangle className="w-8 h-8 mb-2 opacity-50" />
                <span className="text-xs font-mono uppercase tracking-widest">
                  {isAr ? "المكدس فارغ" : "Stack Empty"}
                </span>
              </div>
            ) : (
              <AnimatePresence>
                {items.map((item, idx) => {
                  const isTop = idx === items.length - 1;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: -40, scale: 0.9 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: isPeeking && isTop ? 1.05 : 1
                      }}
                      exit={{ opacity: 0, y: -40, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className={cn(
                        "w-full py-2.5 px-4 rounded-xl border flex items-center justify-between text-sm font-mono font-bold transition-all shadow-md",
                        isTop
                          ? isPeeking
                            ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                            : "bg-indigo-600/30 border-indigo-400 text-indigo-200 shadow-[0_0_15px_rgba(99,102,241,0.25)]"
                          : "bg-neutral-800/80 border-neutral-700 text-neutral-300"
                      )}
                    >
                      <span className="text-xs text-neutral-500 font-normal">[{idx}]</span>
                      <span className="text-base">{item.value}</span>
                      {isTop && (
                        <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
                          TOP
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
          </div>
          <span className="text-[11px] font-mono text-neutral-500 mt-2">
            {isAr ? "قاعدة المكدس (الفهرس 0)" : "Bottom of Stack (Index 0)"}
          </span>
        </div>
      </div>

      {/* Dynamic Feedback Message */}
      <div
        className={cn(
          "rounded-2xl p-4 border transition-colors",
          message.type === "warning"
            ? "bg-rose-950/30 border-rose-500/30 text-rose-200"
            : message.type === "success"
            ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-200"
            : "bg-neutral-950/80 border-white/10 text-neutral-200"
        )}
      >
        <p className="text-sm font-medium leading-relaxed">{isAr ? message.ar : message.en}</p>
      </div>
    </div>
  );
}
