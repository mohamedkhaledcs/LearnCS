"use client";

import React, { useEffect } from "react";
import { X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/utils";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  earned: boolean;
  earnedDate?: string;
  progress?: number; // 0 to 100
  requirement?: string;
}

interface AchievementModalProps {
  achievement: Achievement;
  onClose: () => void;
}

export function AchievementModal({ achievement, onClose }: AchievementModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />
      
      <div 
        className={cn(
          "relative w-full max-w-md bg-neutral-900 border rounded-3xl shadow-2xl z-10 flex flex-col p-6 animate-in fade-in zoom-in-95 duration-200",
          achievement.earned ? "border-indigo-500/30" : "border-neutral-800"
        )}
        role="dialog"
        aria-modal="true"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center mt-4">
          <div className={cn(
            "w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-xl",
            achievement.earned 
              ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30" 
              : "bg-neutral-800/50 text-neutral-600 border border-neutral-700/50"
          )}>
            <achievement.icon className={cn("w-12 h-12", achievement.earned ? "" : "opacity-50")} />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">{achievement.name}</h2>
          <p className="text-neutral-400 text-sm mb-6">{achievement.description}</p>
          
          {achievement.earned ? (
            <div className="w-full bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 flex flex-col items-center">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-1">Earned On</span>
              <span className="text-sm font-medium text-white">{achievement.earnedDate}</span>
            </div>
          ) : (
            <div className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 flex flex-col items-center">
              <div className="flex justify-between w-full mb-2 text-xs font-medium">
                <span className="text-neutral-400">Progress</span>
                <span className="text-white">{achievement.progress}%</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden mb-3">
                <div 
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${achievement.progress || 0}%` }}
                />
              </div>
              <span className="text-xs text-neutral-500">{achievement.requirement}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
