"use client";

import React, { useState } from "react";
import { Cpu, Plus, Search, Trash2, RotateCcw, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils/utils";

const BASE_ADDR = 0x1000;
const INT_BYTES = 4;

export function ArrayVisualizer() {
  const { language } = useI18n();
  const isAr = language === "ar";

  const [items, setItems] = useState<number[]>([14, 27, 42, 58, 71]);
  const [arrayInput, setArrayInput] = useState("14, 27, 42, 58, 71");
  const [indexInput, setIndexInput] = useState("2");
  const [valueInput, setValueInput] = useState("99");
  const [highlightIdx, setHighlightIdx] = useState<number | null>(2);
  const [scannedIndices, setScannedIndices] = useState<number[]>([]);
  const [status, setStatus] = useState<{ en: string; ar: string }>({
    en: "Contiguous memory allocated (5 ints x 4 bytes = 20 bytes). Direct lookup at index i uses base + i * 4 in O(1).",
    ar: "ذاكرة متصلة مخصصة (5 أعداد x 4 بايت = 20 بايت). الوصول الفوري للعنصر i يستخدم base + i * 4 بزمن O(1)."
  });

  const handleApplyArray = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = arrayInput
      .split(",")
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n))
      .slice(0, 10);
    if (parsed.length === 0) return;
    setItems(parsed);
    setHighlightIdx(0);
    setScannedIndices([]);
    setStatus({
      en: `Array updated (${parsed.length} contiguous elements, ${parsed.length * INT_BYTES} bytes).`,
      ar: `تم تحديث المصفوفة (${parsed.length} عناصر متجاورة، ${parsed.length * INT_BYTES} بايت).`
    });
  };

  const handleAccess = () => {
    const idx = parseInt(indexInput, 10);
    if (isNaN(idx) || idx < 0 || idx >= items.length) {
      setStatus({
        en: `IndexOutOfBounds: valid indices are 0..${Math.max(0, items.length - 1)}.`,
        ar: `خارج النطاق (IndexOutOfBounds): الفهارس المتاحة من 0 إلى ${Math.max(0, items.length - 1)}.`
      });
      return;
    }
    const addr = (BASE_ADDR + idx * INT_BYTES).toString(16).toUpperCase();
    setHighlightIdx(idx);
    setScannedIndices([]);
    setStatus({
      en: `O(1) Random Access: arr[${idx}] = ${items[idx]} at address 0x${addr} (0x1000 + ${idx} * 4).`,
      ar: `وصول عشوائي O(1): القيمة arr[${idx}] = ${items[idx]} في العنوان 0x${addr}.`
    });
  };

  const handleInsert = () => {
    if (items.length >= 10) {
      setStatus({
        en: "Fixed-buffer limit (10) reached in visualizer.",
        ar: "تم الوصول للحد الأقصى للمصفوفة (10) في المحاكي."
      });
      return;
    }
    const idx = Math.max(0, Math.min(items.length, parseInt(indexInput, 10) || 0));
    const val = parseInt(valueInput, 10) || 0;
    const shifted = items.length - idx;
    const next = [...items.slice(0, idx), val, ...items.slice(idx)];
    setItems(next);
    setArrayInput(next.join(", "));
    setHighlightIdx(idx);
    setScannedIndices(Array.from({ length: shifted }, (_, i) => idx + 1 + i));
    setStatus({
      en: `Inserted ${val} at index ${idx}. Shifted ${shifted} right-side element(s) -> O(n) cost.`,
      ar: `تم إدراج ${val} في الفهرس ${idx}. تم إزاحة ${shifted} عنصر لليمين -> التكلفة O(n).`
    });
  };

  const handleDelete = () => {
    if (items.length <= 1) return;
    const idx = Math.max(0, Math.min(items.length - 1, parseInt(indexInput, 10) || 0));
    const shifted = items.length - 1 - idx;
    const removed = items[idx];
    const next = items.filter((_, i) => i !== idx);
    setItems(next);
    setArrayInput(next.join(", "));
    setHighlightIdx(Math.min(idx, next.length - 1));
    setScannedIndices([]);
    setStatus({
      en: `Deleted ${removed} at index ${idx}. Shifted ${shifted} trailing element(s) left -> O(n).`,
      ar: `تم حذف ${removed} من الفهرس ${idx}. تم إزاحة ${shifted} عنصر لليسار -> O(n).`
    });
  };

  const handleLinearFind = () => {
    const val = parseInt(valueInput, 10);
    if (isNaN(val)) return;
    const visited: number[] = [];
    let foundAt = -1;
    for (let i = 0; i < items.length; i++) {
      visited.push(i);
      if (items[i] === val) {
        foundAt = i;
        break;
      }
    }
    setScannedIndices(visited);
    setHighlightIdx(foundAt >= 0 ? foundAt : null);
    setStatus({
      en:
        foundAt >= 0
          ? `Found ${val} at index ${foundAt} after scanning ${visited.length} slot(s) O(n).`
          : `Value ${val} not found after checking all ${items.length} slots O(n).`,
      ar:
        foundAt >= 0
          ? `تم العثور على ${val} في الفهرس ${foundAt} بعد فحص ${visited.length} مواقع O(n).`
          : `القيمة ${val} غير موجودة بعد فحص كل العناصر (${items.length}) O(n).`
    });
  };

  const handleReset = () => {
    const def = [14, 27, 42, 58, 71];
    setItems(def);
    setArrayInput(def.join(", "));
    setHighlightIdx(2);
    setScannedIndices([]);
    setStatus({
      en: "Reset array to default 5 contiguous integers.",
      ar: "تمت إعادة تعيين المصفوفة الافتراضية."
    });
  };

  return (
    <div
      className="w-full bg-neutral-900/75 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/15 text-indigo-400 border border-indigo-500/25">
              <Cpu className="w-4 h-4" />
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {isAr ? "محاكي المصفوفات وعنونة الذاكرة (Arrays)" : "Array Contiguous Memory & Shift Visualizer"}
            </h3>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            {isAr
              ? "جرّب الوصول العشوائي O(1) والإدراج والحذف O(n) مع حساب العناوين الفعلي."
              : "Inspect base + index * stride addressing, O(1) lookup, and O(n) element shifting."}
          </p>
        </div>

        <form onSubmit={handleApplyArray} className="flex flex-wrap items-center gap-2" dir="ltr">
          <input
            type="text"
            value={arrayInput}
            onChange={(e) => setArrayInput(e.target.value)}
            placeholder="14, 27, 42, 58"
            className="w-44 rounded-lg border border-white/10 bg-black/50 px-2.5 py-1.5 text-xs font-mono text-white"
          />
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 text-xs font-medium text-white transition-colors"
          >
            {isAr ? "تعيين" : "Load Array"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg bg-white/5 hover:bg-white/10 p-1.5 text-neutral-300 border border-white/10"
            title={isAr ? "إعادة تعيين" : "Reset"}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5" dir="ltr">
          <span className="text-xs text-neutral-400">idx:</span>
          <input
            type="number"
            value={indexInput}
            onChange={(e) => setIndexInput(e.target.value)}
            className="w-16 rounded-lg border border-white/10 bg-black/50 px-2 py-1.5 text-xs font-mono text-white text-center"
          />
        </div>
        <div className="flex items-center gap-1.5" dir="ltr">
          <span className="text-xs text-neutral-400">val:</span>
          <input
            type="number"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            className="w-16 rounded-lg border border-white/10 bg-black/50 px-2 py-1.5 text-xs font-mono text-white text-center"
          />
        </div>

        <button
          type="button"
          onClick={handleAccess}
          className="inline-flex items-center gap-1 rounded-lg bg-cyan-600/25 border border-cyan-500/40 px-3 py-1.5 text-xs font-medium text-cyan-200 hover:bg-cyan-600/40"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          {isAr ? "قراءة arr[idx] O(1)" : "Access arr[idx] O(1)"}
        </button>

        <button
          type="button"
          onClick={handleInsert}
          className="inline-flex items-center gap-1 rounded-lg bg-emerald-600/25 border border-emerald-500/40 px-3 py-1.5 text-xs font-medium text-emerald-200 hover:bg-emerald-600/40"
        >
          <Plus className="w-3.5 h-3.5" />
          {isAr ? "إدراج O(n)" : "Insert O(n)"}
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="inline-flex items-center gap-1 rounded-lg bg-rose-600/25 border border-rose-500/40 px-3 py-1.5 text-xs font-medium text-rose-200 hover:bg-rose-600/40"
        >
          <Trash2 className="w-3.5 h-3.5" />
          {isAr ? "حذف O(n)" : "Delete O(n)"}
        </button>

        <button
          type="button"
          onClick={handleLinearFind}
          className="inline-flex items-center gap-1 rounded-lg bg-amber-600/25 border border-amber-500/40 px-3 py-1.5 text-xs font-medium text-amber-200 hover:bg-amber-600/40"
        >
          <Search className="w-3.5 h-3.5" />
          {isAr ? "بحث عن val O(n)" : "Search val O(n)"}
        </button>
      </div>

      {/* Memory Strip */}
      <div className="overflow-x-auto rounded-2xl bg-black/45 border border-white/10 p-5" dir="ltr">
        <div className="flex items-stretch justify-center gap-2 min-w-fit">
          <AnimatePresence>
            {items.map((val, idx) => {
              const addr = `0x${(BASE_ADDR + idx * INT_BYTES).toString(16).toUpperCase()}`;
              const isSelected = highlightIdx === idx;
              const isScanned = scannedIndices.includes(idx) && !isSelected;
              return (
                <motion.div
                  key={`${idx}-${val}`}
                  layout
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "w-20 rounded-xl border p-2.5 text-center font-mono transition-colors",
                    isSelected
                      ? "border-cyan-400 bg-cyan-500/20 shadow-[0_0_18px_rgba(34,211,238,0.25)]"
                      : isScanned
                      ? "border-amber-400/60 bg-amber-500/15"
                      : "border-white/10 bg-neutral-900"
                  )}
                >
                  <div className="text-[10px] text-neutral-400">{addr}</div>
                  <div className="my-1.5 text-lg font-bold text-white">{val}</div>
                  <div className="text-[11px] text-indigo-300">[{idx}]</div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs md:text-sm text-slate-200">
        {isAr ? status.ar : status.en}
      </div>
    </div>
  );
}
