"use client";

import React, { useState, useMemo } from "react";
import { Activity } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils/utils";

interface Proc {
  pid: string;
  burst: number;
  color: string;
}

const PROCESSES: Proc[] = [
  { pid: "P1", burst: 6, color: "bg-indigo-500" },
  { pid: "P2", burst: 2, color: "bg-emerald-500" },
  { pid: "P3", burst: 4, color: "bg-amber-500" }
];

export function OsSchedulerVisualizer() {
  const { language } = useI18n();
  const isAr = language === "ar";

  const [algo, setAlgo] = useState<"FCFS" | "SJF" | "RR">("RR");
  const [quantum, setQuantum] = useState(2);

  const schedule = useMemo(() => {
    const slices: { pid: string; start: number; end: number; color: string }[] = [];
    const finishTime: Record<string, number> = {};
    let time = 0;

    if (algo === "FCFS" || algo === "SJF") {
      const order = algo === "SJF" ? [...PROCESSES].sort((a, b) => a.burst - b.burst) : PROCESSES;
      for (const p of order) {
        slices.push({ pid: p.pid, start: time, end: time + p.burst, color: p.color });
        time += p.burst;
        finishTime[p.pid] = time;
      }
    } else {
      const rem: Record<string, number> = Object.fromEntries(PROCESSES.map((p) => [p.pid, p.burst]));
      const q = [...PROCESSES];
      while (q.length > 0) {
        const cur = q.shift()!;
        const run = Math.min(quantum, rem[cur.pid]);
        slices.push({ pid: cur.pid, start: time, end: time + run, color: cur.color });
        time += run;
        rem[cur.pid] -= run;
        if (rem[cur.pid] > 0) q.push(cur);
        else finishTime[cur.pid] = time;
      }
    }

    const totalTime = time;
    const avgWait = (
      PROCESSES.reduce((acc, p) => acc + ((finishTime[p.pid] ?? 0) - p.burst), 0) / PROCESSES.length
    ).toFixed(2);
    return { slices, totalTime, avgWait };
  }, [algo, quantum]);

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-neutral-900/90 border border-white/10 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {isAr ? "محاكي جدولة الـ CPU في أنظمة التشغيل (OS Scheduling)" : "OS CPU Scheduler & Gantt Chart Lab"}
            </h3>
            <p className="text-xs text-neutral-400">
              {isAr ? "قارن بين FCFS وSJF وRound Robin وشاهد وقت الانتظار المتوسط." : "Compare FCFS, SJF, and Round Robin scheduling and inspect average wait time."}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2" dir="ltr">
          {(["FCFS", "SJF", "RR"] as const).map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAlgo(a)}
              className={cn(
                "px-3 py-1.5 rounded-xl border text-xs font-mono font-bold cursor-pointer",
                algo === a ? "bg-indigo-600 border-indigo-400 text-white" : "bg-black/40 border-white/10 text-neutral-400"
              )}
            >
              {a}
            </button>
          ))}
          {algo === "RR" && (
            <select
              value={quantum}
              onChange={(e) => setQuantum(Number(e.target.value))}
              className="px-2.5 py-1.5 rounded-xl bg-black/50 border border-white/15 text-xs font-mono text-white"
            >
              <option value={1}>q = 1</option>
              <option value={2}>q = 2</option>
              <option value={3}>q = 3</option>
            </select>
          )}
        </div>
      </div>

      {/* Gantt Chart */}
      <div className="space-y-2" dir="ltr">
        <div className="text-xs font-mono text-neutral-400">Gantt Chart Timeline (0 → {schedule.totalTime} ms)</div>
        <div className="flex h-12 rounded-2xl overflow-hidden border border-white/15 bg-black/50">
          {schedule.slices.map((s, idx) => (
            <div
              key={idx}
              style={{ width: `${((s.end - s.start) / schedule.totalTime) * 100}%` }}
              className={cn("flex items-center justify-center border-r border-black/40 text-xs font-mono font-bold text-white", s.color)}
              title={`${s.pid}: [${s.start}, ${s.end}]`}
            >
              {s.pid} ({s.start}-{s.end})
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-300" dir="ltr">
        <span>Processes: P1 (burst 6), P2 (burst 2), P3 (burst 4)</span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 font-bold">
          Avg Waiting Time = {schedule.avgWait} ms
        </span>
      </div>
    </div>
  );
}
