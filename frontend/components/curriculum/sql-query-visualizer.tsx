"use client";

import React, { useState } from "react";
import { Database, Play } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils/utils";

const STUDENTS = [
  { id: 1, name: "Omar", track: "Algorithms" },
  { id: 2, name: "Salma", track: "Databases" },
  { id: 3, name: "Youssef", track: "Algorithms" },
  { id: 4, name: "Nour", track: "Networks" }
];

const SCORES = [
  { student_id: 1, exam: "Quiz 1", score: 92 },
  { student_id: 2, exam: "Quiz 1", score: 88 },
  { student_id: 3, exam: "Quiz 1", score: 74 }
];

type QueryPreset = "where" | "inner_join" | "left_join" | "group_by";

export function SqlQueryVisualizer() {
  const { language } = useI18n();
  const isAr = language === "ar";
  const [preset, setPreset] = useState<QueryPreset>("inner_join");

  const sqlText: Record<QueryPreset, string> = {
    where: "SELECT name, track\nFROM students\nWHERE track = 'Algorithms';",
    inner_join: "SELECT s.name, sc.score\nFROM students s\nINNER JOIN scores sc ON s.id = sc.student_id\nWHERE sc.score >= 80;",
    left_join: "SELECT s.name, COALESCE(sc.score, NULL) AS score\nFROM students s\nLEFT JOIN scores sc ON s.id = sc.student_id;",
    group_by: "SELECT track, COUNT(*) AS learners\nFROM students\nGROUP BY track\nHAVING COUNT(*) >= 1;"
  };

  const renderResults = () => {
    if (preset === "where") {
      return STUDENTS.filter((s) => s.track === "Algorithms").map((s) => ({ name: s.name, track: s.track }));
    }
    if (preset === "inner_join") {
      return STUDENTS.flatMap((s) => {
        const sc = SCORES.find((x) => x.student_id === s.id && x.score >= 80);
        return sc ? [{ name: s.name, score: sc.score }] : [];
      });
    }
    if (preset === "left_join") {
      return STUDENTS.map((s) => {
        const sc = SCORES.find((x) => x.student_id === s.id);
        return { name: s.name, score: sc ? sc.score : "NULL" };
      });
    }
    const counts = new Map<string, number>();
    STUDENTS.forEach((s) => counts.set(s.track, (counts.get(s.track) ?? 0) + 1));
    return Array.from(counts.entries()).map(([track, learners]) => ({ track, learners }));
  };

  const rows = renderResults();
  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-neutral-900/90 border border-white/10 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {isAr ? "مختبر تنفيذ استعلامات SQL التفاعلي" : "Interactive SQL Query & Join Execution Lab"}
            </h3>
            <p className="text-xs text-neutral-400">
              {isAr
                ? "اختر استعلاماً وشاهد كيف يربط المحرك جدولَي students وscores لإنتاج النتيجة."
                : "Select a SQL operation to inspect execution flow across relational tables (`students` & `scores`)."}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2" dir="ltr">
          {(
            [
              ["where", "WHERE Filter"],
              ["inner_join", "INNER JOIN"],
              ["left_join", "LEFT JOIN"],
              ["group_by", "GROUP BY"]
            ] as [QueryPreset, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setPreset(id)}
              className={cn(
                "px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold flex items-center gap-1 cursor-pointer transition",
                preset === id ? "bg-sky-600 border-sky-400 text-white" : "bg-black/40 border-white/10 text-neutral-400"
              )}
            >
              <Play className="w-3 h-3" /> {label}
            </button>
          ))}
        </div>
      </div>

      <pre dir="ltr" className="p-4 rounded-2xl bg-black/70 border border-white/10 font-mono text-xs md:text-sm text-sky-300 overflow-x-auto text-left">
        {sqlText[preset]}
      </pre>

      <div className="overflow-x-auto rounded-2xl border border-white/10" dir="ltr">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-white/5 text-neutral-300 uppercase">
            <tr>
              {columns.map((c) => (
                <th key={c} className="px-4 py-2.5">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-white/5 bg-black/30 text-emerald-300">
                {columns.map((c) => (
                  <td key={c} className="px-4 py-2.5">{String((r as any)[c])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
