"use client";

import React, { useState } from "react";
import { ToggleLeft, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils/utils";

type OperatorKey = "AND" | "OR" | "XOR" | "IMPLIES" | "IFF" | "DEMORGAN_AND";

const OPERATORS: { key: OperatorKey; symbol: string; en: string; ar: string; evalFn: (p: boolean, q: boolean) => boolean }[] = [
  { key: "AND", symbol: "P ∧ Q", en: "Conjunction (AND): True only when both P and Q are True.", ar: "الاقتران (AND): يكون صحيحاً فقط عندما يكون P و Q كلاهما True.", evalFn: (p, q) => p && q },
  { key: "OR", symbol: "P ∨ Q", en: "Disjunction (OR): True if at least one of P or Q is True.", ar: "الفصل (OR): يكون صحيحاً إذا كان أحد القيمتين على الأقل True.", evalFn: (p, q) => p || q },
  { key: "XOR", symbol: "P ⊕ Q", en: "Exclusive OR (XOR): True when P and Q have different truth values.", ar: "الاختيار الحصري (XOR): صحيح عندما يختلف P عن Q.", evalFn: (p, q) => p !== q },
  { key: "IMPLIES", symbol: "P → Q", en: "Implication (P → Q): False ONLY when P is True and Q is False.", ar: "الاستلزام (P → Q): يكون False فقط عندما يكون P صحيحاً وQ خاطئاً.", evalFn: (p, q) => !p || q },
  { key: "IFF", symbol: "P ↔ Q", en: "Biconditional (P ↔ Q): True when P and Q share the same truth value.", ar: "التكافؤ (P ↔ Q): صحيح عندما تتطابق قيمة P و Q.", evalFn: (p, q) => p === q },
  { key: "DEMORGAN_AND", symbol: "¬(P ∧ Q) ≡ ¬P ∨ ¬Q", en: "De Morgan's Law: Negating AND flips it into OR of negations.", ar: "قانون دي مورغان: نفي AND يتحول إلى OR لقيم النفي.", evalFn: (p, q) => !(p && q) }
];

export function TruthTableVisualizer() {
  const { language } = useI18n();
  const isAr = language === "ar";

  const [pVal, setPVal] = useState(true);
  const [qVal, setQVal] = useState(false);
  const [opKey, setOpKey] = useState<OperatorKey>("IMPLIES");

  const activeOp = OPERATORS.find((o) => o.key === opKey) ?? OPERATORS[0];
  const currentResult = activeOp.evalFn(pVal, qVal);

  const combinations: [boolean, boolean][] = [
    [true, true],
    [true, false],
    [false, true],
    [false, false]
  ];

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-neutral-900/90 border border-white/10 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400">
            <ToggleLeft className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {isAr ? "مختبر المنطق وجداول الصواب (Truth Tables & Boolean Gates)" : "Interactive Logic & Truth Table Lab"}
            </h3>
            <p className="text-xs text-neutral-400">
              {isAr ? activeOp.ar : activeOp.en}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2" dir="ltr">
          <button
            type="button"
            onClick={() => setPVal(!pVal)}
            className={cn(
              "px-4 py-2 rounded-xl border font-mono text-xs font-bold transition cursor-pointer",
              pVal ? "bg-emerald-500/20 border-emerald-400 text-emerald-300" : "bg-rose-500/15 border-rose-400/50 text-rose-300"
            )}
          >
            P = {pVal ? "T (1)" : "F (0)"}
          </button>
          <button
            type="button"
            onClick={() => setQVal(!qVal)}
            className={cn(
              "px-4 py-2 rounded-xl border font-mono text-xs font-bold transition cursor-pointer",
              qVal ? "bg-emerald-500/20 border-emerald-400 text-emerald-300" : "bg-rose-500/15 border-rose-400/50 text-rose-300"
            )}
          >
            Q = {qVal ? "T (1)" : "F (0)"}
          </button>
        </div>
      </div>

      {/* Operator Selector */}
      <div className="flex flex-wrap gap-2" dir="ltr">
        {OPERATORS.map((op) => (
          <button
            key={op.key}
            type="button"
            onClick={() => setOpKey(op.key)}
            className={cn(
              "px-3.5 py-2 rounded-xl border font-mono text-xs font-semibold transition cursor-pointer",
              opKey === op.key
                ? "bg-indigo-600 border-indigo-400 text-white shadow-md"
                : "bg-black/40 border-white/10 text-neutral-300 hover:border-white/25"
            )}
          >
            {op.symbol}
          </button>
        ))}
      </div>

      {/* Highlighted Evaluation Result */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-black/50 border border-white/10" dir="ltr">
        <div className="font-mono text-sm text-neutral-300">
          Evaluated: <span className="text-white font-bold">{activeOp.symbol}</span> with P={String(pVal).toUpperCase()}, Q={String(qVal).toUpperCase()}
        </div>
        <div
          className={cn(
            "px-4 py-1.5 rounded-full font-mono text-sm font-bold flex items-center gap-1.5",
            currentResult ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40" : "bg-rose-500/20 text-rose-300 border border-rose-400/40"
          )}
        >
          <CheckCircle2 className="w-4 h-4" />
          {currentResult ? "TRUE (1)" : "FALSE (0)"}
        </div>
      </div>

      {/* Full Truth Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10" dir="ltr">
        <table className="w-full text-sm font-mono text-center">
          <thead className="bg-white/5 text-neutral-300">
            <tr>
              <th className="py-2.5">P</th>
              <th className="py-2.5">Q</th>
              <th className="py-2.5">{activeOp.symbol}</th>
            </tr>
          </thead>
          <tbody>
            {combinations.map(([p, q], i) => {
              const res = activeOp.evalFn(p, q);
              const isSelected = p === pVal && q === qVal;
              return (
                <tr
                  key={i}
                  onClick={() => { setPVal(p); setQVal(q); }}
                  className={cn(
                    "border-t border-white/5 cursor-pointer transition",
                    isSelected ? "bg-indigo-500/20 text-white font-bold" : "bg-black/30 text-neutral-400 hover:bg-white/5"
                  )}
                >
                  <td className="py-2.5">{p ? "T" : "F"}</td>
                  <td className="py-2.5">{q ? "T" : "F"}</td>
                  <td className={cn("py-2.5 font-bold", res ? "text-emerald-400" : "text-rose-400")}>
                    {res ? "TRUE" : "FALSE"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
