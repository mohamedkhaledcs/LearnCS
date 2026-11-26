"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/utils";
import { ChevronLeft, ChevronRight, Home, LogOut, Map, Settings, Trophy, User, CreditCard, Bot, Compass, Shield, HelpCircle, Languages } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { useI18n } from "@/lib/i18n/i18n-context";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { language, setLanguage, t } = useI18n();

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("learncs_sidebar_collapsed");
    if (saved === "true") {
      setIsCollapsed(true);
    }
  }, []);

  const { logout, user } = useAuth();
  const isAdmin = user?.roles?.some((r) => r === "Admin" || r === "SuperAdmin");
  
  const toggleCollapse = () => {
    setIsCollapsed(prev => {
      const next = !prev;
      localStorage.setItem("learncs_sidebar_collapsed", String(next));
      return next;
    });
  };

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "ar" : "en";
    setLanguage(nextLang);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navItems = [
    { name: t.nav.home, href: "/dashboard", icon: Home },
    { name: t.nav.learningPath, href: "/roadmap", icon: Map },
    { name: t.nav.careerTracks, href: "/career", icon: Compass },
    { name: t.nav.achievements, href: "/achievements", icon: Trophy },
    { name: t.nav.aiMentor, href: "/ai", icon: Bot },
    { name: t.nav.profile, href: "/profile", icon: User },
    { name: t.nav.plans, href: "/plans", icon: CreditCard },
    { name: t.nav.help, href: "/help", icon: HelpCircle },
    ...(isAdmin ? [{ name: t.nav.adminPortal, href: "/admin", icon: Shield, isAdmin: true }] : []),
  ];

  if (!mounted) return <aside className="w-64 flex-shrink-0 border-r border-white/10 bg-neutral-950/80 backdrop-blur-xl flex flex-col justify-between" />;

  return (
    <aside 
      className={cn(
        "flex-shrink-0 border-e border-white/10 bg-neutral-950/80 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 relative",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Toggle Button */}
      <button 
        onClick={toggleCollapse}
        className="absolute end-2 top-4 bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 p-1.5 rounded-lg z-50 transition-all hover:border-indigo-500/30"
        title={isCollapsed ? (language === "ar" ? "توسيع القائمة" : "Expand Sidebar") : (language === "ar" ? "طي القائمة" : "Collapse Sidebar")}
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4 rtl:rotate-180" /> : <ChevronLeft className="w-4 h-4 rtl:rotate-180" />}
      </button>

      <div className="p-4 md:p-6">
        <div className={cn("mb-10 flex items-center", isCollapsed ? "justify-center" : "justify-start")}>
          <Link href="/dashboard" className="text-xl font-black text-white hover:text-indigo-400 transition-colors tracking-tight flex items-center">
            {isCollapsed ? (
              <span className="text-2xl font-mono text-indigo-500">&lt;/&gt;</span>
            ) : (
              "LearnCS"
            )}
          </Link>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                title={isCollapsed ? item.name : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl text-sm font-medium transition-all group overflow-hidden",
                  isCollapsed ? "justify-center p-3" : "px-4 py-3",
                  isActive 
                    ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.05)]" 
                    : "text-neutral-400 hover:bg-white/5 hover:text-white border border-transparent"
                )}
              >
                <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-indigo-400" : "text-neutral-500 group-hover:text-neutral-300")} />
                {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 md:p-6 border-t border-white/5 space-y-2">
        <Link 
          href="/settings"
          title={isCollapsed ? t.nav.settings : undefined}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl text-sm font-medium text-neutral-400 hover:bg-white/5 hover:text-white transition-all border border-transparent group overflow-hidden",
            isCollapsed ? "justify-center p-3" : "px-4 py-3",
            pathname === "/settings" ? "bg-indigo-600/10 text-indigo-400 border-indigo-500/20" : ""
          )}
        >
          <Settings className={cn("w-5 h-5 shrink-0", pathname === "/settings" ? "text-indigo-400" : "text-neutral-500 group-hover:text-neutral-300")} />
          {!isCollapsed && <span className="whitespace-nowrap">{t.nav.settings}</span>}
        </Link>
        <button
          onClick={toggleLanguage}
          title={isCollapsed ? (language === "en" ? "Switch to Arabic [L]" : "Switch to English [L]") : undefined}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl text-sm font-medium text-neutral-300 hover:bg-white/5 hover:text-white transition-all border border-transparent group overflow-hidden",
            isCollapsed ? "justify-center p-3" : "px-4 py-3"
          )}
        >
          <Languages className="w-5 h-5 shrink-0 text-indigo-400" />
          {!isCollapsed && (
            <div className="flex items-center justify-between w-full">
              <span className="whitespace-nowrap font-sans">{language === "en" ? "العربية" : "English"}</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-white/10 rounded font-mono text-neutral-400 border border-white/10">L</kbd>
            </div>
          )}
        </button>
        <button 
          onClick={handleLogout}
          title={isCollapsed ? t.nav.logout : undefined}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl text-sm font-medium text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-all border border-transparent group overflow-hidden",
            isCollapsed ? "justify-center p-3" : "px-4 py-3"
          )}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span className="whitespace-nowrap">{t.nav.logout}</span>}
        </button>
      </div>
    </aside>
  );
}
