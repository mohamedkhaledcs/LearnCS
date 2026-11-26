import Link from "next/link";
import { Container } from "@/components/layout/container";
import { H1, P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LayoutDashboard, Network } from "lucide-react";
import { ThreeWrapper } from "@/components/three/three-wrapper";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-neutral-950 flex flex-col overflow-hidden selection:bg-indigo-500/30">
      
      {/* Background Particles for visual depth */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <ThreeWrapper type="particles" className="w-full h-full opacity-60" />
      </div>
      
      {/* Deep gradient background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-neutral-950/80 to-neutral-950" />

      <Container className="flex-1 flex flex-col items-center justify-center text-center py-24 relative z-10">
        
        {/* Subtle glowing 404 text in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-white/[0.02] select-none pointer-events-none z-[-1]">
          404
        </div>

        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-300 backdrop-blur-sm mb-2">
            System Error
          </div>
          
          <H1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500">
            Node Disconnected
          </H1>
          
          <P className="text-xl text-neutral-400 font-light max-w-lg mx-auto">
            The path you are trying to access does not exist in the knowledge graph. It may have been moved or you might have taken a wrong turn.
          </P>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button asChild size="lg" className="w-full sm:w-auto h-12 shadow-[0_0_30px_-10px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.6)] transition-all">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto h-12 bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-colors">
              <Link href="/dashboard">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Go to Dashboard
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto h-12 bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-colors">
              <Link href="/discovery">
                <Network className="mr-2 h-4 w-4" />
                Explore Map
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
