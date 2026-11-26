import { LEARNING_PATHS } from "./registries/path-registry";
import { CONCEPTS, getLearningUnit } from "./registries/concept-registry";
import { LearningUnitProgress } from "./schema/progress";
import { PrerequisiteRule } from "./schema/prerequisites";
import { apiClient, getStoredAuth } from "@/lib/api/client";

/**
 * Local storage key for persisting progress on the frontend
 * and syncing with the ASP.NET Core backend.
 */
const PROGRESS_KEY = "learncs_unit_progress";

export type UnitState = "locked" | "available" | "completed";

export const CurriculumService = {
  
  // --- Read API ---

  getLearningPath: (id: string) => {
    return LEARNING_PATHS[id];
  },

  getAllLearningPaths: () => {
    return Object.values(LEARNING_PATHS);
  },

  getLearningUnit: (unitId: string) => {
    return getLearningUnit(unitId);
  },

  // --- Progress & Graph API (Simulated) ---

  getAllProgress: (): Record<string, LearningUnitProgress> => {
    if (typeof window === "undefined") return {};
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  },

  getUnitProgress: (unitId: string): LearningUnitProgress | null => {
    const all = CurriculumService.getAllProgress();
    return all[unitId] || null;
  },

  isUnitCompleted: (unitId: string): boolean => {
    const p = CurriculumService.getUnitProgress(unitId);
    return p?.status === "completed" || p?.status === "mastered";
  },

  evaluatePrerequisites: (rules?: PrerequisiteRule[]): { isMet: boolean; missing: string[] } => {
    if (!rules || rules.length === 0) return { isMet: true, missing: [] };

    const missing: string[] = [];
    let allMet = true;

    for (const rule of rules) {
      if (rule.enforcement !== "hard_lock") continue;

      let ruleMet = rule.logicalOperator === "all" ? true : false;
      
      for (const cond of rule.conditions) {
        let condMet = false;
        
        if (cond.type === "unit") {
          condMet = CurriculumService.isUnitCompleted(cond.targetId);
          if (!condMet) missing.push(cond.targetId);
        } else if (cond.type === "path") {
          const p = CurriculumService.getPathProgress(cond.targetId);
          condMet = p.percent === 100;
          if (!condMet) missing.push(cond.targetId);
        }
        
        if (rule.logicalOperator === "all") {
          ruleMet = ruleMet && condMet;
        } else {
          ruleMet = ruleMet || condMet;
        }
      }
      
      if (!ruleMet) allMet = false;
    }

    return { isMet: allMet, missing };
  },

  getUnitState: (unitId: string, bypassLocks: boolean = false): { state: UnitState; missingPrereqs: string[] } => {
    if (CurriculumService.isUnitCompleted(unitId)) {
      return { state: "completed", missingPrereqs: [] };
    }

    if (bypassLocks) {
      return { state: "available", missingPrereqs: [] };
    }
    
    const unitData = CurriculumService.getLearningUnit(unitId);
    if (!unitData || !unitData.unit.prerequisites) {
      return { state: "available", missingPrereqs: [] };
    }

    const evaluation = CurriculumService.evaluatePrerequisites(unitData.unit.prerequisites);
    if (evaluation.isMet) {
      return { state: "available", missingPrereqs: [] };
    }

    return { state: "locked", missingPrereqs: evaluation.missing };
  },

  getModuleProgress: (pathId: string, moduleId: string): { completed: number; total: number; percent: number } => {
    const path = LEARNING_PATHS[pathId];
    if (!path) return { completed: 0, total: 0, percent: 0 };
    
    const mod = path.modules.find(m => m.id === moduleId);
    if (!mod) return { completed: 0, total: 0, percent: 0 };

    // Deduplicate units in case they appear multiple times (shouldn't happen, but safe)
    const uniqueUnits = Array.from(new Set(mod.units.map(u => u.unitId)));
    const total = uniqueUnits.length;
    const completed = uniqueUnits.filter(id => CurriculumService.isUnitCompleted(id)).length;

    return { completed, total, percent: total === 0 ? 0 : Math.round((completed / total) * 100) };
  },

  getPathProgress: (pathId: string): { completed: number; total: number; percent: number } => {
    const path = LEARNING_PATHS[pathId];
    if (!path) return { completed: 0, total: 0, percent: 0 };

    const uniqueUnits = new Set<string>();
    path.modules.forEach(m => {
      m.units.forEach(u => uniqueUnits.add(u.unitId));
    });

    const total = uniqueUnits.size;
    let completed = 0;
    uniqueUnits.forEach(id => {
      if (CurriculumService.isUnitCompleted(id)) completed++;
    });

    return { completed, total, percent: total === 0 ? 0 : Math.round((completed / total) * 100) };
  },

  markUnitCompleted: (unitId: string, userId: string = "local-user") => {
    if (typeof window === "undefined") return;
    const all = CurriculumService.getAllProgress();
    
    all[unitId] = {
      unitId,
      userId,
      status: "completed",
      completedAt: new Date().toISOString()
    };
    
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));

    // Asynchronously sync with the backend database
    CurriculumService.syncUnitCompletion(unitId);
  },

  syncUnitCompletion: async (unitId: string): Promise<boolean> => {
    if (typeof window === "undefined") return false;
    try {
      const auth = getStoredAuth();
      if (!auth?.accessToken) return false;
      await apiClient.post("/api/progress/units/complete", { unitId });
      return true;
    } catch (err) {
      console.warn("Failed to sync unit completion to backend:", err);
      return false;
    }
  },

  loadRemoteProgress: async (): Promise<void> => {
    if (typeof window === "undefined") return;
    try {
      const auth = getStoredAuth();
      if (!auth?.accessToken) return;
      const res = await apiClient.get<string[]>("/api/progress/units");
      if (res.data && Array.isArray(res.data)) {
        const all = CurriculumService.getAllProgress();
        let changed = false;
        for (const unitId of res.data) {
          if (!all[unitId]) {
            all[unitId] = {
              unitId,
              userId: auth.userId || "user",
              status: "completed",
              completedAt: new Date().toISOString()
            };
            changed = true;
          }
        }
        if (changed) {
          localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
        }
      }
    } catch (err) {
      console.warn("Could not load remote progress from backend:", err);
    }
  },

  getNextUnit: (currentUnitId: string, pathId?: string): { pathId: string; unitId: string; title: string } | null => {
    const paths = pathId ? [LEARNING_PATHS[pathId]] : Object.values(LEARNING_PATHS);
    for (const p of paths) {
      if (!p) continue;
      const allUnitsInPath: string[] = [];
      p.modules.forEach(m => m.units.forEach(u => allUnitsInPath.push(u.unitId)));
      const idx = allUnitsInPath.indexOf(currentUnitId);
      if (idx !== -1 && idx < allUnitsInPath.length - 1) {
        const nextId = allUnitsInPath[idx + 1];
        const nextData = getLearningUnit(nextId);
        return {
          pathId: p.id,
          unitId: nextId,
          title: nextData?.unit.title.en || nextId
        };
      }
    }
    return null;
  },

  resetProgress: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(PROGRESS_KEY);
  }
};

