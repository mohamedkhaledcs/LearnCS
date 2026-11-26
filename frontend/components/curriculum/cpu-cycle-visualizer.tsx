"use client";

import React, { useEffect, useState } from "react";
import { Cpu, Pause, Play, SkipForward, RotateCcw } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils/utils";
import { VisualizerSpeedSelector, type VisualizerSpeed } from "./visualizer-speed";

interface Instruction {
  addr: string;
  op: string;
  arg: string;
  descEn: string;
  descAr: string;
}

const PROGRAM: Instruction[] = [
  { addr: "0x00", op: "LOAD", arg: "#10", descEn: "Load literal 10 into Accumulator (ACC).", descAr: "تحميل القيمة 10 إلى سجل التراكم (ACC)." },
  { addr: "0x01", op: "ADD", arg: "#25", descEn: "ALU adds 25 to ACC -> ACC becomes 35.", descAr: "تقوم وحدة ALU بجمع 25 مع ACC فتصبح النتيجة 35." },
  { addr: "0x02", op: "STORE", arg: "[0x10]", descEn: "Write ACC (35) to RAM address 0x10.", descAr: "حفظ قيمة ACC (35) في عنوان الـ RAM رقم 0x10." },
  { addr: "0x03", op: "HALT", arg: "-", descEn: "Execution complete. Program halts cleanly.", descAr: "اكتمل تنفيذ البرنامج وتوقف الـ CPU." }
];

type Phase = "FETCH" | "DECODE" | "EXECUTE";
const PHASES: Phase[] = ["FETCH", "DECODE", "EXECUTE"];

export function CpuCycleVisualizer() {
  const { language } = useI18n();
  const isAr = language === "ar";

  const [pc, setPc] = useState(0);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [acc, setAcc] = useState(0);
  const [ram, setRam] = useState<Record<string, number>>({ "0x10": 0, "0x11": 0 });
  const [halted, setHalted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<VisualizerSpeed>(1);

  const curInstr = PROGRAM[pc];
  const curPhase = PHASES[phaseIdx];

  const stepForward = React.useCallback(() => {
    if (halted) return;
    if (phaseIdx < 2) {
      setPhaseIdx(phaseIdx + 1);
      if (phaseIdx === 1) {
        if (curInstr.op === "LOAD") setAcc(10);
        else if (curInstr.op === "ADD") setAcc((a) => a + 25);
        else if (curInstr.op === "STORE") setRam((prev) => ({ ...prev, "0x10": acc }));
        else if (curInstr.op === "HALT") {
          setHalted(true);
          setIsPlaying(false);
        }
      }
      return;
    }

    if (pc < PROGRAM.length - 1 && !halted) {
      setPc(pc + 1);
      setPhaseIdx(0);
    } else {
      setHalted(true);
      setIsPlaying(false);
    }
  }, [halted, phaseIdx, curInstr.op, acc, pc]);

  useEffect(() => {
    if (!isPlaying || halted) return;
    const timer = setTimeout(stepForward, Math.round(900 / speed));
    return () => clearTimeout(timer);
  }, [isPlaying, halted, speed, stepForward]);

  const reset = () => {
    setPc(0);
    setPhaseIdx(0);
    setAcc(0);
    setRam({ "0x10": 0, "0x11": 0 });
    setHalted(false);
    setIsPlaying(false);
  };

  return (
    <div
      className="p-6 md:p-8 rounded-3xl bg-neutral-900/90 border border-white/10 shadow-2xl space-y-6"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {isAr ? "محاكي دورة الـ CPU (Fetch - Decode - Execute)" : "CPU Fetch-Decode-Execute Cycle Simulator"}
            </h3>
            <p className="text-xs text-neutral-400">
              {isAr
                ? "تتبّع حركة التعليمات من RAM إلى السجلات (PC, IR, ACC) خطوة بخطوة."
                : "Step through every clock cycle to observe Program Counter (PC), Instruction Register (IR), ALU, and RAM."}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <VisualizerSpeedSelector speed={speed} onChange={setSpeed} isAr={isAr} />
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            disabled={halted}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold transition cursor-pointer"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? (isAr ? "إيقاف" : "Pause") : isAr ? "تشغيل" : "Play"}
          </button>
          <button
            type="button"
            onClick={stepForward}
            disabled={halted || isPlaying}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white text-xs font-semibold transition cursor-pointer"
          >
            <SkipForward className="w-4 h-4 rtl:rotate-180" />
            {isAr ? "الخطوة التالية" : "Next Step"}
          </button>
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 text-xs transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {isAr ? "إعادة" : "Reset"}
          </button>
        </div>
      </div>

      {/* Phase Pills */}
      <div className="grid grid-cols-3 gap-3" dir="ltr">
        {PHASES.map((ph, idx) => (
          <div
            key={ph}
            className={cn(
              "px-4 py-3 rounded-2xl border text-center font-mono text-sm font-bold transition",
              phaseIdx === idx
                ? "bg-indigo-500/20 border-indigo-400 text-indigo-300 shadow-lg shadow-indigo-500/10"
                : "bg-black/40 border-white/10 text-neutral-500"
            )}
          >
            {idx + 1}. {ph}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CPU Registers */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            {isAr ? "سجلات المعالج (CPU Registers)" : "CPU Registers"}
          </div>
          <div className="grid grid-cols-3 gap-2 font-mono text-xs" dir="ltr">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="text-neutral-400 mb-1">PC</div>
              <div className="text-base font-bold text-amber-400">{curInstr.addr}</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="text-neutral-400 mb-1">IR</div>
              <div className="text-sm font-bold text-sky-400">{curInstr.op} {curInstr.arg}</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="text-neutral-400 mb-1">ACC</div>
              <div className="text-base font-bold text-emerald-400">{acc}</div>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 text-xs text-neutral-300 leading-relaxed">
            <span className="font-semibold text-indigo-400">{curPhase}:</span>{" "}
            {curPhase === "FETCH" && (isAr ? `جلب التعليمة من العنوان ${curInstr.addr} في الـ RAM.` : `Fetching instruction at ${curInstr.addr} from RAM into IR.`)}
            {curPhase === "DECODE" && (isAr ? `فك تشفير التعليمة (${curInstr.op} ${curInstr.arg}) بواسطة Control Unit.` : `Control Unit decodes opcode ${curInstr.op} (${curInstr.arg}).`)}
            {curPhase === "EXECUTE" && (isAr ? curInstr.descAr : curInstr.descEn)}
          </div>
        </div>

        {/* RAM Instructions & Data */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3" dir="ltr">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            RAM (Instructions & Data Memory)
          </div>
          <div className="space-y-1.5 font-mono text-xs">
            {PROGRAM.map((ins, i) => (
              <div
                key={ins.addr}
                className={cn(
                  "flex items-center justify-between px-3 py-1.5 rounded-lg border",
                  pc === i
                    ? "bg-indigo-500/20 border-indigo-400 text-white font-bold"
                    : "bg-white/5 border-white/5 text-neutral-400"
                )}
              >
                <span>{ins.addr}</span>
                <span>{ins.op} {ins.arg}</span>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-white/10 flex gap-3 font-mono text-xs">
            {Object.entries(ram).map(([k, v]) => (
              <div key={k} className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                RAM[{k}] = <span className="font-bold">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
