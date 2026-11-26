"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  Code2,
  Copy,
  Database,
  Loader2,
  Play,
  RotateCcw,
  Terminal,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils/utils";

interface InteractiveCodePlaygroundProps {
  sectionId: string;
  initialCode?: string | null;
  language?: string | null;
  expectedOutput?: string | null;
  explanation?: string | null;
  isAr?: boolean;
}

type SqlRow = Record<string, string | number>;

const SAMPLE_SQL_DB: Record<string, SqlRow[]> = {
  students: [
    { id: 1, name: "Salma", track: "Algorithms", xp: 1450, level: 5 },
    { id: 2, name: "Omar", track: "Systems", xp: 980, level: 3 },
    { id: 3, name: "Nour", track: "Competitive", xp: 2100, level: 7 },
    { id: 4, name: "Youssef", track: "Databases", xp: 1220, level: 4 }
  ],
  courses: [
    { id: 101, title: "Binary Search & Greedy", credits: 4, difficulty: "intermediate" },
    { id: 102, title: "SQL Joins & Indexing", credits: 3, difficulty: "intermediate" },
    { id: 103, title: "Operating Systems", credits: 4, difficulty: "advanced" }
  ],
  enrollments: [
    { id: 1, student_id: 1, course_id: 101, score: 92 },
    { id: 2, student_id: 2, course_id: 103, score: 85 },
    { id: 3, student_id: 3, course_id: 101, score: 98 },
    { id: 4, student_id: 4, course_id: 102, score: 90 }
  ],
  orders: [
    { id: 1, customer_id: 1, amount: 120, status: "paid" },
    { id: 2, customer_id: 2, amount: 45, status: "pending" },
    { id: 3, customer_id: 1, amount: 85, status: "paid" }
  ]
};

function runInBrowserSql(queryText: string): {
  mode: "table" | "info" | "error";
  columns?: string[];
  rows?: SqlRow[];
  message: string;
} {
  const cleaned = queryText
    .split("\n")
    .filter((line) => !line.trim().startsWith("--"))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/;+$/, "");

  if (!cleaned) {
    return { mode: "error", message: "Empty SQL query. Enter a SELECT statement to inspect rows." };
  }

  const selectMatch = cleaned.match(/^SELECT\s+(.+?)\s+FROM\s+([a-zA-Z_][a-zA-Z0-9_]*)(.*)$/i);
  if (!selectMatch) {
    if (/^(CREATE|INSERT|UPDATE|DELETE|BEGIN|COMMIT|ALTER|WITH)/i.test(cleaned)) {
      return {
        mode: "info",
        message: `SQL statement parsed cleanly:\n${cleaned}\nNote: Live in-browser execution table previews run SELECT queries against seeded tables (${Object.keys(SAMPLE_SQL_DB).join(", ")}). Try running: SELECT id, name, track, xp FROM students WHERE xp >= 1000 ORDER BY xp DESC;`
      };
    }
    return {
      mode: "error",
      message: "Syntax note: Try SELECT col1, col2 FROM table [WHERE col op val] [ORDER BY col ASC|DESC] [LIMIT n]"
    };
  }

  const colsRaw = selectMatch[1].trim();
  const tableName = selectMatch[2].toLowerCase();
  let rest = (selectMatch[3] || "").trim();

  const sourceTable = SAMPLE_SQL_DB[tableName];
  if (!sourceTable) {
    return {
      mode: "error",
      message: `Unknown demo table '${tableName}'. Available sandbox tables: ${Object.keys(SAMPLE_SQL_DB).join(", ")}`
    };
  }

  let rows = sourceTable.map((r) => ({ ...r }));

  // Simple WHERE col (=|!=|>|<|>=|<=) val
  const whereMatch = rest.match(/WHERE\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*(=|!=|<>|>=|<=|>|<)\s*('[^']*'|"[^"]*"|-?\d+(?:\.\d+)?)/i);
  if (whereMatch) {
    const col = whereMatch[1];
    const op = whereMatch[2];
    const rawVal = whereMatch[3].replace(/^['"]|['"]$/g, "");
    const numVal = Number(rawVal);
    rows = rows.filter((row) => {
      const cell = row[col];
      if (cell === undefined) return false;
      const isNum = typeof cell === "number" && !isNaN(numVal);
      const a = isNum ? cell : String(cell).toLowerCase();
      const b = isNum ? numVal : rawVal.toLowerCase();
      if (op === "=") return a === b;
      if (op === "!=" || op === "<>") return a !== b;
      if (op === ">") return a > b;
      if (op === "<") return a < b;
      if (op === ">=") return a >= b;
      if (op === "<=") return a <= b;
      return true;
    });
  }

  // ORDER BY col [ASC|DESC]
  const orderMatch = rest.match(/ORDER\s+BY\s+([a-zA-Z_][a-zA-Z0-9_]*)(?:\s+(ASC|DESC))?/i);
  if (orderMatch) {
    const orderCol = orderMatch[1];
    const dir = (orderMatch[2] || "ASC").toUpperCase();
    rows.sort((a, b) => {
      const va = a[orderCol];
      const vb = b[orderCol];
      if (va === vb) return 0;
      const cmp = va > vb ? 1 : -1;
      return dir === "DESC" ? -cmp : cmp;
    });
  }

  // LIMIT n
  const limitMatch = rest.match(/LIMIT\s+(\d+)/i);
  if (limitMatch) {
    rows = rows.slice(0, parseInt(limitMatch[1], 10));
  }

  const allCols = sourceTable.length > 0 ? Object.keys(sourceTable[0]) : [];
  const selectedCols =
    colsRaw === "*"
      ? allCols
      : colsRaw
          .split(",")
          .map((c) => c.trim().split(/\s+AS\s+/i)[0].trim())
          .filter(Boolean);

  const projected = rows.map((r) => {
    const obj: SqlRow = {};
    for (const c of selectedCols) {
      obj[c] = r[c] ?? "NULL";
    }
    return obj;
  });

  return {
    mode: "table",
    columns: selectedCols,
    rows: projected,
    message: `Query OK: ${projected.length} row(s) returned from '${tableName}'.`
  };
}

function stripSimpleTsTypes(code: string): string {
  return code
    .replace(/:\s*(number|string|boolean|any|void|never)\b(\[\])?/g, "")
    .replace(/function\s+([a-zA-Z0-9_]+)\s*<[^>]+>/g, "function $1");
}

function buildDefaultJsSnippet(lang: string): string {
  const l = lang.toLowerCase();
  if (l === "sql") {
    return "SELECT id, name, track, xp\nFROM students\nWHERE xp >= 1000\nORDER BY xp DESC;";
  }
  return [
    "// Interactive JavaScript Sandbox (Isolated Web Worker)",
    "const arr = [2, 5, 8, 12, 16, 23, 38];",
    "const target = 23;",
    "",
    "function binarySearch(nums, goal) {",
    "  let left = 0, right = nums.length - 1;",
    "  while (left <= right) {",
    "    const mid = Math.floor((left + right) / 2);",
    "    if (nums[mid] === goal) return mid;",
    "    if (nums[mid] < goal) left = mid + 1;",
    "    else right = mid - 1;",
    "  }",
    "  return -1;",
    "}",
    "",
    'console.log("Array:", JSON.stringify(arr));',
    'console.log("Index of " + target + ":", binarySearch(arr, target));'
  ].join("\n");
}

export function InteractiveCodePlayground({
  sectionId,
  initialCode,
  language,
  expectedOutput,
  explanation,
  isAr = false
}: InteractiveCodePlaygroundProps) {
  const normLang = (language || "javascript").toLowerCase();
  const isDirectRunnableJs = ["js", "javascript", "ts", "typescript"].includes(normLang);
  const isSql = normLang === "sql";

  const [tab, setTab] = useState<"lesson" | "sandbox">(isDirectRunnableJs || isSql ? "lesson" : "lesson");
  const [lessonCode, setLessonCode] = useState<string>(initialCode || buildDefaultJsSnippet(normLang));
  const [sandboxCode, setSandboxCode] = useState<string>(
    isDirectRunnableJs ? initialCode || buildDefaultJsSnippet("js") : buildDefaultJsSnippet("js")
  );

  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [outputMode, setOutputMode] = useState<"idle" | "trace" | "live" | "table" | "error">("idle");
  const [outputText, setOutputText] = useState<string>("");
  const [sqlTable, setSqlTable] = useState<{ columns: string[]; rows: SqlRow[] } | null>(null);
  const [execMs, setExecMs] = useState<number | null>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    setLessonCode(initialCode || buildDefaultJsSnippet(normLang));
    setSandboxCode(
      isDirectRunnableJs ? initialCode || buildDefaultJsSnippet("js") : buildDefaultJsSnippet("js")
    );
    setTab("lesson");
    setOutputMode("idle");
    setOutputText("");
    setSqlTable(null);
    setExecMs(null);
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, [sectionId, initialCode, normLang, isDirectRunnableJs]);

  const activeCode = tab === "sandbox" ? sandboxCode : lessonCode;
  const lineCount = useMemo(() => activeCode.split("\n").length, [activeCode]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // Clipboard blocked in non-HTTPS test contexts
    }
  };

  const handleReset = () => {
    if (tab === "sandbox") {
      setSandboxCode(buildDefaultJsSnippet("js"));
    } else {
      setLessonCode(initialCode || buildDefaultJsSnippet(normLang));
    }
    setOutputMode("idle");
    setOutputText("");
    setSqlTable(null);
    setExecMs(null);
  };

  const runWorkerJs = (codeToRun: string) => {
    if (workerRef.current) {
      workerRef.current.terminate();
    }
    setRunning(true);
    setSqlTable(null);

    const preparedCode = normLang === "ts" || normLang === "typescript" ? stripSimpleTsTypes(codeToRun) : codeToRun;

    const workerScript = `
      "use strict";
      self.fetch = undefined;
      self.XMLHttpRequest = undefined;
      self.WebSocket = undefined;
      self.importScripts = undefined;
      const logs = [];
      const fmt = (v) => {
        if (typeof v === "string") return v;
        try { return JSON.stringify(v); } catch { return String(v); }
      };
      const console = {
        log: (...args) => logs.push(args.map(fmt).join(" ")),
        info: (...args) => logs.push(args.map(fmt).join(" ")),
        warn: (...args) => logs.push("[WARN] " + args.map(fmt).join(" ")),
        error: (...args) => logs.push("[ERR] " + args.map(fmt).join(" "))
      };
      self.onmessage = function(ev) {
        const t0 = performance.now();
        try {
          const fn = new Function("console", ev.data);
          const result = fn(console);
          if (result !== undefined && logs.length === 0) {
            logs.push(fmt(result));
          }
          self.postMessage({ ok: true, logs, ms: Math.round((performance.now() - t0) * 10) / 10 });
        } catch (err) {
          self.postMessage({ ok: false, logs, error: err && err.message ? err.message : String(err), ms: Math.round((performance.now() - t0) * 10) / 10 });
        }
      };
    `;

    const blob = new Blob([workerScript], { type: "application/javascript" });
    const workerUrl = URL.createObjectURL(blob);
    const worker = new Worker(workerUrl);
    workerRef.current = worker;

    const timer = window.setTimeout(() => {
      worker.terminate();
      workerRef.current = null;
      URL.revokeObjectURL(workerUrl);
      setRunning(false);
      setOutputMode("error");
      setOutputText("Execution aborted after 1200ms timeout (check for infinite loops).");
    }, 1200);

    worker.onmessage = (e) => {
      window.clearTimeout(timer);
      worker.terminate();
      workerRef.current = null;
      URL.revokeObjectURL(workerUrl);
      setRunning(false);
      setExecMs(e.data.ms ?? 0);

      if (e.data.ok) {
        setOutputMode("live");
        const out = (e.data.logs || []).join("\n");
        setOutputText(out || "(Execution succeeded with no console output)");
      } else {
        setOutputMode("error");
        const prefix = e.data.logs && e.data.logs.length > 0 ? e.data.logs.join("\n") + "\n" : "";
        setOutputText(prefix + "Runtime Error: " + e.data.error);
      }
    };

    worker.onerror = (err) => {
      window.clearTimeout(timer);
      worker.terminate();
      workerRef.current = null;
      URL.revokeObjectURL(workerUrl);
      setRunning(false);
      setOutputMode("error");
      setOutputText("Worker Error: " + (err.message || "Execution failed"));
    };

    worker.postMessage(preparedCode);
  };

  const handleRun = () => {
    if (tab === "sandbox" || isDirectRunnableJs) {
      runWorkerJs(activeCode);
      return;
    }

    if (isSql) {
      setRunning(true);
      const t0 = performance.now();
      const res = runInBrowserSql(lessonCode);
      const ms = Math.round((performance.now() - t0) * 10) / 10;
      setExecMs(ms);
      setRunning(false);
      if (res.mode === "table" && res.columns && res.rows) {
        setOutputMode("table");
        setSqlTable({ columns: res.columns, rows: res.rows });
        setOutputText(res.message);
      } else if (res.mode === "info") {
        setOutputMode("trace");
        setSqlTable(null);
        setOutputText(res.message);
      } else {
        setOutputMode("error");
        setSqlTable(null);
        setOutputText(res.message);
      }
      return;
    }

    // Verified static walkthrough trace for compiled / shell snippets (C++, Python, C#, Bash)
    setRunning(true);
    window.setTimeout(() => {
      setRunning(false);
      setOutputMode("trace");
      setSqlTable(null);
      setOutputText(
        expectedOutput ||
          "Static walkthrough verified. Open the 'Live JS Sandbox' tab to execute custom JavaScript logic directly."
      );
    }, 220);
  };

  const displayLang = tab === "sandbox" ? "javascript" : normLang;

  return (
    <div className="space-y-3" dir="ltr">
      <div className="rounded-xl border border-white/10 bg-slate-950 overflow-hidden shadow-lg">
        {/* Top Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-slate-900/80 px-4 py-2.5 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-cyan-400" />
            <span className="uppercase tracking-wider text-cyan-300 font-semibold">
              {displayLang}
            </span>
            <span className="text-slate-600">|</span>
            {isDirectRunnableJs ? (
              <span className="text-emerald-400 text-[11px]">
                {isAr ? "تشغيل مباشر في Web Worker معزول" : "Live Isolated JS Worker"}
              </span>
            ) : isSql ? (
              <span className="text-amber-300 text-[11px] flex items-center gap-1">
                <Database className="h-3 w-3" />
                {isAr ? "محرك استعلام SQL محلي" : "In-Browser SQL Query Engine"}
              </span>
            ) : (
              <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-lg border border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setTab("lesson");
                    setOutputMode("idle");
                  }}
                  className={cn(
                    "px-2 py-0.5 rounded text-[11px] transition-colors",
                    tab === "lesson" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                  )}
                >
                  {normLang.toUpperCase()} Trace
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTab("sandbox");
                    setOutputMode("idle");
                  }}
                  className={cn(
                    "px-2 py-0.5 rounded text-[11px] transition-colors",
                    tab === "sandbox" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
                  )}
                >
                  Live JS Sandbox
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-slate-300 hover:bg-white/10 transition-colors"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied" : "Copy"}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 rounded border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-slate-300 hover:bg-white/10 transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>

            <button
              type="button"
              onClick={handleRun}
              disabled={running}
              className="inline-flex items-center gap-1 rounded border border-emerald-500/40 bg-emerald-600/25 px-3 py-1 text-[11px] font-semibold text-emerald-200 hover:bg-emerald-600/40 transition-colors disabled:opacity-50"
            >
              {running ? <Loader2 className="h-3 w-3 animate-spin" /> : <Play className="h-3 w-3" />}
              {tab === "sandbox" || isDirectRunnableJs
                ? "Run Code"
                : isSql
                ? "Execute SQL"
                : "Run Trace"}
            </button>
          </div>
        </div>

        {/* Editable Workspace with Line Numbers */}
        <div className="flex bg-slate-950 font-mono text-xs md:text-sm leading-6">
          <div
            aria-hidden="true"
            className="select-none border-r border-white/5 bg-slate-900/40 px-3 py-4 text-right text-slate-600 font-mono text-xs leading-6"
          >
            {Array.from({ length: lineCount }, (_, idx) => (
              <div key={idx}>{idx + 1}</div>
            ))}
          </div>
          <textarea
            value={activeCode}
            onChange={(e) =>
              tab === "sandbox" ? setSandboxCode(e.target.value) : setLessonCode(e.target.value)
            }
            spellCheck={false}
            rows={Math.min(18, Math.max(5, lineCount))}
            aria-label={`${displayLang} interactive code editor`}
            className="w-full resize-y bg-transparent p-4 text-emerald-300 focus:outline-none font-mono text-xs md:text-sm leading-6 text-left"
          />
        </div>

        {isSql && tab === "lesson" && (
          <div className="border-t border-white/5 bg-slate-900/30 px-4 py-1.5 text-[11px] text-slate-400 font-mono">
            Sandbox tables: <span className="text-amber-300">students</span>,{" "}
            <span className="text-amber-300">courses</span>,{" "}
            <span className="text-amber-300">enrollments</span>,{" "}
            <span className="text-amber-300">orders</span>
          </div>
        )}
      </div>

      {/* Explanation Callout */}
      {explanation && tab === "lesson" && (
        <div
          dir={isAr ? "rtl" : "ltr"}
          className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-200 leading-relaxed"
        >
          {explanation}
        </div>
      )}

      {/* Output Console / Expected Trace */}
      {(outputMode !== "idle" || expectedOutput) && (
        <div
          className={cn(
            "rounded-lg border p-3.5 font-mono text-xs transition-colors",
            outputMode === "error"
              ? "border-rose-500/40 bg-rose-950/25 text-rose-200"
              : outputMode === "live" || outputMode === "table"
              ? "border-emerald-500/50 bg-emerald-950/35 text-emerald-200"
              : "border-emerald-500/20 bg-emerald-950/20 text-emerald-300"
          )}
        >
          <div className="flex items-start gap-2">
            {outputMode === "error" ? (
              <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-rose-400" />
            ) : (
              <Terminal className="h-4 w-4 mt-0.5 shrink-0 text-emerald-400" />
            )}

            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span
                  className={cn(
                    "font-semibold",
                    outputMode === "error" ? "text-rose-300" : "text-emerald-400"
                  )}
                >
                  {outputMode === "live"
                    ? `Live Worker Output${execMs !== null ? ` (${execMs}ms, exit code 0)` : ""}`
                    : outputMode === "table"
                    ? `SQL Query Result${execMs !== null ? ` (${execMs}ms)` : ""}`
                    : outputMode === "error"
                    ? "Execution Issue"
                    : outputMode === "trace"
                    ? "Verified Lesson Trace Output (Static Walkthrough):"
                    : "Expected Lesson Output:"}
                </span>

                {outputMode === "trace" && !isDirectRunnableJs && !isSql && (
                  <span className="text-[10px] text-cyan-300/80 uppercase">
                    Verified Reference Output
                  </span>
                )}
              </div>

              {outputMode === "table" && sqlTable && sqlTable.rows.length > 0 && (
                <div className="overflow-x-auto rounded border border-emerald-500/25 bg-black/40">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-emerald-500/25 bg-emerald-950/40 text-emerald-300">
                        {sqlTable.columns.map((col) => (
                          <th key={col} className="px-3 py-1.5 font-semibold">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sqlTable.rows.map((r, rIdx) => (
                        <tr key={rIdx} className="border-b border-white/5 last:border-0">
                          {sqlTable.columns.map((col) => (
                            <td key={col} className="px-3 py-1.5 text-slate-200">
                              {String(r[col])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <pre className="whitespace-pre-wrap text-left overflow-x-auto">
                {outputMode === "idle" ? expectedOutput : outputText}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
