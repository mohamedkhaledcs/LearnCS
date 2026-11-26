"use client";

import React from "react";
import { BinarySearchVisualizer } from "./binary-search-visualizer";
import { TwoPointersVisualizer } from "./two-pointers-visualizer";
import { SortingVisualizer } from "./sorting-visualizer";
import { StackVisualizer } from "./stack-visualizer";
import { VariablesVisualizer } from "./variables-visualizer";
import { LoopsVisualizer } from "./loops-visualizer";
import { QueueVisualizer } from "./queue-visualizer";
import { BinaryConverterVisualizer } from "./binary-converter-visualizer";
import { CpuCycleVisualizer } from "./cpu-cycle-visualizer";
import { TruthTableVisualizer } from "./truth-table-visualizer";
import { OopDispatchVisualizer } from "./oop-dispatch-visualizer";
import { LinkedListVisualizer } from "./linked-list-visualizer";
import { HashTableVisualizer } from "./hash-table-visualizer";
import { TreeBstVisualizer } from "./tree-bst-visualizer";
import { GraphTraversalVisualizer } from "./graph-traversal-visualizer";
import { DpTableVisualizer } from "./dp-table-visualizer";
import { SqlQueryVisualizer } from "./sql-query-visualizer";
import { OsSchedulerVisualizer } from "./os-scheduler-visualizer";
import { NetworkPacketVisualizer } from "./network-packet-visualizer";
import { ArrayVisualizer } from "./array-visualizer";
import { RecursionVisualizer } from "./recursion-visualizer";
import { MemoryHeapVisualizer } from "./memory-heap-visualizer";
import { BrainCircuit } from "lucide-react";

interface InteractiveRegistryProps {
  moduleId?: string;
  unitId?: string;
  title?: string;
  description?: string;
}

const RECOGNIZED_MODULES = new Set([
  "binary-search-visualizer",
  "two-pointers-visualizer",
  "sorting-visualizer",
  "stack-visualizer",
  "variables-visualizer",
  "loops-visualizer",
  "queue-visualizer",
  "fifo-queue",
  "binary-converter-visualizer",
  "cpu-cycle-visualizer",
  "truth-table-visualizer",
  "oop-dispatch-visualizer",
  "linked-list-visualizer",
  "hash-table-visualizer",
  "tree-bst-visualizer",
  "graph-traversal-visualizer",
  "dp-table-visualizer",
  "sql-query-visualizer",
  "os-scheduler-visualizer",
  "network-packet-visualizer",
  "array-visualizer",
  "recursion-visualizer",
  "memory-heap-visualizer"
]);

const UNIT_TO_VISUALIZER: Record<string, string> = {
  "unit-computer-basics-foundations": "cpu-cycle-visualizer",
  "unit-os-architecture-intro": "cpu-cycle-visualizer",
  "unit-data-representation-foundations": "binary-converter-visualizer",
  "unit-binary-arithmetic-encoding": "truth-table-visualizer",
  "unit-internet-web-basics": "network-packet-visualizer",
  "unit-variables-foundations": "variables-visualizer",
  "unit-conditions-foundations": "truth-table-visualizer",
  "unit-loops-foundations": "loops-visualizer",
  "unit-memory-foundations": "memory-heap-visualizer",
  "unit-arrays-foundations": "array-visualizer",
  "unit-array-cp-patterns": "array-visualizer",
  "unit-recursion-foundations": "recursion-visualizer",
  "unit-oop-inheritance-polymorphism": "oop-dispatch-visualizer",
  "unit-dm-propositional-logic": "truth-table-visualizer",
  "unit-linked-lists-foundations": "linked-list-visualizer",
  "unit-stacks-queues-foundations": "stack-visualizer",
  "unit-hash-tables-foundations": "hash-table-visualizer",
  "unit-trees-foundations": "tree-bst-visualizer",
  "unit-graphs-foundations": "graph-traversal-visualizer",
  "unit-graph-traversal-bfs-dfs": "graph-traversal-visualizer",
  "unit-binary-search-foundations": "binary-search-visualizer",
  "unit-binary-search-on-answer": "binary-search-visualizer",
  "unit-two-pointers-foundations": "two-pointers-visualizer",
  "unit-sorting-foundations": "sorting-visualizer",
  "unit-dp-foundations": "dp-table-visualizer",
  "unit-sql-fundamentals": "sql-query-visualizer",
  "unit-sql-joins-aggregations": "sql-query-visualizer",
  "unit-db-normalization-foundations": "sql-query-visualizer",
  "unit-db-indexing-foundations": "sql-query-visualizer",
  "unit-os-cpu-scheduling": "os-scheduler-visualizer",
  "unit-os-virtual-memory": "memory-heap-visualizer",
  "unit-networking-protocols": "network-packet-visualizer",
  "unit-networking-http-dns": "network-packet-visualizer"
};

export function hasInteractiveVisualizer(moduleId?: string, unitId?: string): boolean {
  return Boolean(
    (moduleId && RECOGNIZED_MODULES.has(moduleId)) ||
    (unitId && Boolean(UNIT_TO_VISUALIZER[unitId]))
  );
}

export function InteractiveRegistry({
  moduleId,
  unitId,
  title,
  description
}: InteractiveRegistryProps) {
  const effectiveId =
    (moduleId && RECOGNIZED_MODULES.has(moduleId) ? moduleId : undefined) ||
    (unitId ? UNIT_TO_VISUALIZER[unitId] : undefined) ||
    moduleId;

  switch (effectiveId) {
    case "binary-search-visualizer":
      return <BinarySearchVisualizer />;
    case "two-pointers-visualizer":
      return <TwoPointersVisualizer />;
    case "sorting-visualizer":
      return <SortingVisualizer />;
    case "stack-visualizer":
      return <StackVisualizer />;
    case "queue-visualizer":
    case "fifo-queue":
      return <QueueVisualizer />;
    case "variables-visualizer":
      return <VariablesVisualizer />;
    case "loops-visualizer":
      return <LoopsVisualizer />;
    case "binary-converter-visualizer":
      return <BinaryConverterVisualizer />;
    case "cpu-cycle-visualizer":
      return <CpuCycleVisualizer />;
    case "truth-table-visualizer":
      return <TruthTableVisualizer />;
    case "oop-dispatch-visualizer":
      return <OopDispatchVisualizer />;
    case "linked-list-visualizer":
      return <LinkedListVisualizer />;
    case "hash-table-visualizer":
      return <HashTableVisualizer />;
    case "tree-bst-visualizer":
      return <TreeBstVisualizer />;
    case "graph-traversal-visualizer":
      return <GraphTraversalVisualizer />;
    case "dp-table-visualizer":
      return <DpTableVisualizer />;
    case "sql-query-visualizer":
      return <SqlQueryVisualizer />;
    case "os-scheduler-visualizer":
      return <OsSchedulerVisualizer />;
    case "network-packet-visualizer":
      return <NetworkPacketVisualizer />;
    case "array-visualizer":
      return <ArrayVisualizer />;
    case "recursion-visualizer":
      return <RecursionVisualizer />;
    case "memory-heap-visualizer":
      return <MemoryHeapVisualizer />;
    default:
      return (
        <div className="p-8 rounded-3xl bg-neutral-900/70 border border-white/10 text-center shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/25 text-indigo-400 flex items-center justify-center mx-auto mb-3">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-bold text-white mb-1">{title || "Interactive Simulation Lab"}</h4>
          <p className="text-neutral-400 text-sm max-w-lg mx-auto">
            {description || "Applied interactive walkthrough mapped to this learning unit."}
          </p>
        </div>
      );
  }
}
