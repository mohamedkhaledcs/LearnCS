"use client";

import React, { useState } from "react";
import { Network, SkipForward, RotateCcw } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils/utils";

const STEPS = [
  {
    stage: "DNS Lookup",
    layer: "Application (UDP :53)",
    packet: "[UDP] Question: A record for learncs.dev → 203.0.113.42",
    en: "Client resolves human-readable hostname `learncs.dev` to its Server IP via DNS.",
    ar: "يقوم المتصفح بترجمة الاسم `learncs.dev` إلى عنوان IP الخاص بالخادم عبر DNS."
  },
  {
    stage: "TCP SYN → SYN-ACK → ACK",
    layer: "Transport (TCP :443)",
    packet: "[TCP Header | SrcPort:51420 DstPort:443 | Seq=100 Ack=201 | Flags=ACK]",
    en: "3-Way Handshake establishes a reliable ordered byte stream between Client and Server.",
    ar: "تُنشئ المصافحة الثلاثية (3-Way Handshake) اتصالاً موثوقاً ومرتباً عبر TCP."
  },
  {
    stage: "IP + Ethernet Encapsulation",
    layer: "Network & Data Link (L3/L2)",
    packet: "[Eth MAC Frame | [IPv4 Src:192.168.1.5 Dst:203.0.113.42 | [TCP | HTTP GET]]]",
    en: "Routers forward packets using IP addresses; local switches deliver frames via MAC addresses.",
    ar: "تقوم الموجّهات (Routers) بتمرير الحزم عبر IP بينما توصلها المحولات محلياً عبر MAC."
  },
  {
    stage: "HTTP Request & 200 OK",
    layer: "Application (HTTP/HTTPS)",
    packet: "GET /api/curriculum/paths HTTP/1.1  ==>  HTTP/1.1 200 OK (application/json)",
    en: "Server processes the request over the established socket and streams back the response payload.",
    ar: "يعالج الخادم الطلب ويرسل الاستجابة بصيغة JSON عبر الاتصال المفتوح."
  }
];

export function NetworkPacketVisualizer() {
  const { language } = useI18n();
  const isAr = language === "ar";
  const [idx, setIdx] = useState(0);

  const cur = STEPS[idx];

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-neutral-900/90 border border-white/10 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {isAr ? "رحلة حزمة البيانات (DNS → TCP → IP → HTTP)" : "Network Packet & HTTP Lifecycle Visualizer"}
            </h3>
            <p className="text-xs text-neutral-400">{isAr ? cur.ar : cur.en}</p>
          </div>
        </div>

        <div className="flex items-center gap-2" dir="ltr">
          <button
            type="button"
            onClick={() => setIdx((i) => Math.min(STEPS.length - 1, i + 1))}
            disabled={idx >= STEPS.length - 1}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            <SkipForward className="w-3.5 h-3.5" /> Next Stage ({idx + 1}/{STEPS.length})
          </button>
          <button type="button" onClick={() => setIdx(0)} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 cursor-pointer">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2" dir="ltr">
        {STEPS.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIdx(i)}
            className={cn(
              "p-3 rounded-2xl border text-left transition cursor-pointer",
              idx === i ? "bg-cyan-500/20 border-cyan-400 text-white" : "bg-black/40 border-white/10 text-neutral-400 hover:border-white/25"
            )}
          >
            <div className="text-[10px] font-mono text-cyan-300">{s.layer}</div>
            <div className="text-xs font-bold mt-1">{s.stage}</div>
          </button>
        ))}
      </div>

      <div dir="ltr" className="p-4 rounded-2xl bg-black/70 border border-white/10 font-mono text-xs text-emerald-300 break-words">
        {cur.packet}
      </div>
    </div>
  );
}
