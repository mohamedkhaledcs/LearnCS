"use client";

import React, { useState, useMemo } from "react";
import { Binary, RotateCcw, ArrowRightLeft, Cpu } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils/utils";

export function BinaryConverterVisualizer() {
  const { language } = useI18n();
  const isAr = language === "ar";

  const [value, setValue] = useState<number>(42);
  const [bitsWidth, setBitsWidth] = useState<8>(8);

  const clamped = Math.max(0, Math.min(255, Number.isNaN(value) ? 0 : value));
  const binaryStr = clamped.toString(2).padStart(bitsWidth, "0");
  const octStr = clamped.toString(8);
  const hexStr = "0x" + clamped.toString(16).toUpperCase().padStart(2, "0");
  const asciiChar = clamped >= 32 && clamped <= 126 ? String.fromCharCode(clamped) : (isAr ? "غير قابل للطباعة" : "Control char");

  const divisionSteps = useMemo(() => {
    const steps: { dividend: number; quotient: number; remainder: number }[] = [];
    let cur = clamped;
    if (cur === 0) {
      return [{ dividend: 0, quotient: 0, remainder: 0 }];
    }
    while (cur > 0) {
      steps.push({ dividend: cur, quotient: Math.floor(cur / 2), remainder: cur % 2 });
      cur = Math.floor(cur / 2);
    }
    return steps;
  }, [clamped]);

  const toggleBit = (indexFromLeft: number) => {
    const bitPos = bitsWidth - 1 - indexFromLeft;
    setValue((prev) => prev ^ (1 << bitPos));
  };

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-neutral-900/90 border border-white/10 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400">
            <Binary className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {isAr ? "مختبر تمثيل البيانات (Binary & Number Systems)" : "Data Representation & Binary Lab"}
            </h3>
            <p className="text-xs text-neutral-400">
              {isAr
                ? "اضغط على أي Bit لتشغيله (1) أو إطفائه (0) وشاهد التحويل الفوري بين Decimal وBinary وHex وASCII."
                : "Click any bit below or type a decimal value (0 to 255) to inspect Binary, Octal, Hex, and ASCII in real time."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            max={255}
            value={clamped}
            onChange={(e) => setValue(Math.max(0, Math.min(255, Number(e.target.value) || 0)))}
            className="w-24 px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white font-mono text-sm text-center"
            dir="ltr"
          />
          <button
            type="button"
            onClick={() => setValue(Math.min(255, clamped << 1))}
            className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-indigo-300 transition"
          >
            &lt;&lt; 1
          </button>
          <button
            type="button"
            onClick={() => setValue(clamped >> 1)}
            className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-indigo-300 transition"
          >
            &gt;&gt; 1
          </button>
          <button
            type="button"
            onClick={() => setValue(65)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 transition"
            title={isAr ? "إعادة ضبط إلى 'A' (65)" : "Reset to 'A' (65)"}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 8 Interactive Bits */}
      <div dir="ltr" className="grid grid-cols-8 gap-2">
        {binaryStr.split("").map((bit, idx) => {
          const weight = 1 << (bitsWidth - 1 - idx);
          const isOn = bit === "1";
          return (
            <button
              key={idx}
              type="button"
              onClick={() => toggleBit(idx)}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer",
                isOn
                  ? "bg-indigo-500/20 border-indigo-400/60 text-white shadow-lg shadow-indigo-500/15"
                  : "bg-black/40 border-white/10 text-neutral-500 hover:border-white/25"
              )}
            >
              <span className="text-[10px] font-mono text-neutral-400 mb-1">2^{bitsWidth - 1 - idx} ({weight})</span>
              <span className="text-xl font-bold font-mono">{bit}</span>
            </button>
          );
        })}
      </div>

      {/* Radix Conversions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3" dir="ltr">
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
          <div className="text-xs text-neutral-400 mb-1">Decimal (Base 10)</div>
          <div className="text-2xl font-bold font-mono text-emerald-400">{clamped}</div>
        </div>
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
          <div className="text-xs text-neutral-400 mb-1">Octal (Base 8)</div>
          <div className="text-2xl font-bold font-mono text-sky-400">{octStr}</div>
        </div>
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
          <div className="text-xs text-neutral-400 mb-1">Hexadecimal (Base 16)</div>
          <div className="text-2xl font-bold font-mono text-purple-400">{hexStr}</div>
        </div>
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
          <div className="text-xs text-neutral-400 mb-1">ASCII / UTF-8</div>
          <div className="text-xl font-bold font-mono text-amber-400 truncate">
            {clamped >= 32 && clamped <= 126 ? `'${asciiChar}'` : asciiChar}
          </div>
        </div>
      </div>

      {/* Division-by-2 Step Trace */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300">
          <ArrowRightLeft className="w-4 h-4 text-indigo-400" />
          <span>{isAr ? "خطوات التحويل بالقسمة المتكررة على 2 (يُقرأ الباقي من الأسفل للأعلى):" : "Repeated Division-by-2 Trace (read remainders bottom-to-top):"}</span>
        </div>
        <div className="flex flex-wrap gap-2" dir="ltr">
          {divisionSteps.map((s, i) => (
            <div key={i} className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 font-mono text-xs text-neutral-300">
              {s.dividend} ÷ 2 = <span className="text-sky-400">{s.quotient}</span> | rem <span className="text-emerald-400 font-bold">{s.remainder}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
