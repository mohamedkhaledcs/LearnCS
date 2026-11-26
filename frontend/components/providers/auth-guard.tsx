"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { Loader2 } from "lucide-react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Not authenticated, redirect to login with the original destination
        const currentPath = encodeURIComponent(pathname || "/dashboard");
        router.push(`/login?redirect=${currentPath}`);
      } else {
        setIsReady(true);
      }
    }
  }, [isLoading, isAuthenticated, router, pathname]);

  if (isLoading || !isReady) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-neutral-950">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  return <>{children}</>;
}
