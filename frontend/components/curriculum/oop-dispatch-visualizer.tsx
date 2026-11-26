"use client";

import React, { useState } from "react";
import { Boxes, ArrowDownRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils/utils";

type SubtypeKey = "Circle" | "Rectangle" | "Triangle";

const SHAPES: Record<SubtypeKey, { areaFormula: string; sampleArea: string; vtableTarget: string; codeEn: string; codeAr: string }> = {
  Circle: {
    areaFormula: "π * r²  (r = 5)",
    sampleArea: "78.54",
    vtableTarget: "Circle::draw() & Circle::area()",
    codeEn: "Runtime checks object vptr → jumps to Circle's overridden vtable slot!",
    codeAr: "في وقت التشغيل يفحص vptr الكائن ويقفز مباشرة إلى تنفيذ Circle."
  },
  Rectangle: {
    areaFormula: "w * h  (4 × 6)",
    sampleArea: "24.00",
    vtableTarget: "Rectangle::draw() & Rectangle::area()",
    codeEn: "Same Base reference Shape* s invokes Rectangle::area() without if/else checks!",
    codeAr: "نفس المؤشر Shape* s يستدعي Rectangle::area() تلقائياً دون الحاجة لجمل if/else."
  },
  Triangle: {
    areaFormula: "0.5 * b * h  (6 × 5)",
    sampleArea: "15.00",
    vtableTarget: "Triangle::draw() & Triangle::area()",
    codeEn: "Open-Closed Principle satisfied: new subtypes plug into Shape::vtable cleanly.",
    codeAr: "يتحقق مبدأ Open-Closed: أي صنف فرعي جديد يندرج بسلاسة عبر vtable."
  }
};

export function OopDispatchVisualizer() {
  const { language } = useI18n();
  const isAr = language === "ar";
  const [selected, setSelected] = useState<SubtypeKey>("Circle");

  const active = SHAPES[selected];

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-neutral-900/90 border border-white/10 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-teal-500/15 border border-teal-500/30 text-teal-400">
            <Boxes className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {isAr ? "مختبر Polymorphism وتوجيه الـ vtable في OOP" : "OOP Polymorphism & Virtual Dispatch Lab"}
            </h3>
            <p className="text-xs text-neutral-400">
              {isAr
                ? "اختر الكائن الفعلي خلف المؤشر Shape* وشاهد كيف يتم توجيه الاستدعاء ديناميكياً."
                : "Assign different concrete subclass instances to a Shape* reference to observe dynamic dispatch."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2" dir="ltr">
          {(["Circle", "Rectangle", "Triangle"] as SubtypeKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelected(key)}
              className={cn(
                "px-3.5 py-2 rounded-xl border text-xs font-mono font-bold transition cursor-pointer",
                selected === key
                  ? "bg-teal-600 border-teal-400 text-white"
                  : "bg-black/40 border-white/10 text-neutral-300 hover:border-white/25"
              )}
            >
              new {key}()
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center" dir="ltr">
        {/* Static Reference */}
        <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2">
          <div className="text-[11px] uppercase tracking-wider text-neutral-400">Compile-Time Reference</div>
          <div className="font-mono text-sm font-bold text-indigo-300">Shape* ptr = new {selected}();</div>
          <div className="font-mono text-xs text-neutral-400">Call: <span className="text-white">ptr-&gt;area();</span></div>
        </div>

        {/* Arrow + vtable */}
        <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-400/30 space-y-1.5 text-center">
          <div className="text-[11px] font-mono text-indigo-300 flex items-center justify-center gap-1">
            <ArrowDownRight className="w-4 h-4" /> vptr lookup
          </div>
          <div className="font-mono text-xs font-bold text-white">{active.vtableTarget}</div>
        </div>

        {/* Runtime Output */}
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 space-y-1.5">
          <div className="text-[11px] uppercase tracking-wider text-emerald-300">Runtime Output</div>
          <div className="font-mono text-sm text-white">{active.areaFormula}</div>
          <div className="font-mono text-xl font-bold text-emerald-400">= {active.sampleArea}</div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-sm text-neutral-200">
        {isAr ? active.codeAr : active.codeEn}
      </div>
    </div>
  );
}
