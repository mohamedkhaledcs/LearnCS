import type { Metadata } from "next";
import { Sidebar } from "@/components/platform/sidebar";
import { AuthGuard } from "@/components/providers/auth-guard";

export const metadata: Metadata = {
  title: "Platform | LearnCS",
  description: "LearnCS Learning Platform",
};

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-neutral-950">
        <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden relative">
        {/* Subtle background glow for the platform area */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none z-0" />
        
        {/* Faint dot texture */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 opacity-20"
          style={{ 
             backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
             backgroundSize: '24px 24px',
             maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
          }} 
        />
        
        <main className="flex-1 overflow-y-auto p-8 relative z-10">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
    </AuthGuard>
  );
}
