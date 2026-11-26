"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { Shield, Users, BookOpen, CreditCard, LayoutDashboard, ArrowLeft, Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  const isAdmin = user?.roles?.some((r) => r === "Admin" || r === "SuperAdmin" || r === "ContentManager");

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 rounded-3xl bg-neutral-900/60 border border-red-500/20 text-center shadow-2xl backdrop-blur-xl">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
        <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
          The Admin Portal is restricted to platform administrators. Your account does not have sufficient administrative privileges.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Learner Dashboard
        </button>
      </div>
    );
  }

  const adminTabs = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Users & Accounts", href: "/admin/users", icon: Users },
    { name: "Curriculum Graph", href: "/admin/curriculum", icon: BookOpen },
    { name: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4" />
            LearnCS Admin & Governance Portal
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Platform Administration</h1>
          <p className="text-sm text-neutral-400 mt-1">
            Logged in as <span className="text-white font-medium">{user?.username}</span> ({user?.email}) •{" "}
            <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
              {user?.roles?.join(", ") || "Admin"}
            </span>
          </p>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-sm font-medium transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" /> Exit to App
        </Link>
      </div>

      {/* Admin Sub-navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/5">
        {adminTabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shrink-0",
                isActive
                  ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                  : "text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-indigo-400" : "text-neutral-500")} />
              {tab.name}
            </Link>
          );
        })}
      </div>

      {/* Main Admin Page Content */}
      <div>{children}</div>
    </div>
  );
}
