import { Container, Section } from "@/components/layout/container";
import { H1, H2, H3, P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { ThreeWrapper } from "@/components/three/three-wrapper";
import { ArrowRight, Code2, Cpu, Network } from "lucide-react";

export const metadata = {
  title: "LearnCS | Intelligent Computer Science Learning",
};

export default function MotionShowcasePage() {
  return (
    <div className="relative min-h-screen bg-neutral-950 overflow-hidden selection:bg-indigo-500/30">
      
      {/* Deep Atmospheric Background Gradients */}
      <div className="fixed inset-0 -z-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-neutral-950/80 to-neutral-950" />
      <div className="fixed top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent -z-10" />

      {/* Hero 3D Integration */}
      {/* 
        The Knowledge Orb is now absolutely positioned behind the hero text, 
        scaled massively to act as a cosmic/computational core, fading softly into the edges.
      */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] max-w-[1200px] max-h-[1200px] -z-10 pointer-events-none opacity-40 [mask-image:radial-gradient(circle_at_center,black_30%,transparent_70%)]">
        <ThreeWrapper type="orb" className="w-full h-full" />
      </div>

      <Container className="relative pt-32 pb-24 lg:pt-48 lg:pb-32">
        <Section className="py-0">
          
          {/* Cinematic Hero Section */}
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
            <Reveal direction="down" blur duration={1.2}>
              <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-300 backdrop-blur-sm mb-4">
                <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
                Next Generation Learning OS
              </div>
            </Reveal>

            <Reveal direction="up" blur scale delay={0.2} duration={1.2}>
              <H1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-sm">
                Master Computer Science.
              </H1>
            </Reveal>

            <Reveal direction="up" blur delay={0.4} duration={1}>
              <P className="text-xl md:text-2xl text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
                An adaptive, premium intelligence platform designed to build your foundational engineering knowledge from the ground up.
              </P>
            </Reveal>

            <Reveal direction="up" blur delay={0.6} duration={1}>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8 w-full sm:w-auto">
                <Button size="lg" className="h-12 px-8 text-base shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] transition-all hover:shadow-[0_0_60px_-15px_rgba(99,102,241,0.7)] group">
                  Start Learning
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-colors">
                  Explore Curriculum
                </Button>
              </div>
            </Reveal>
          </div>
        </Section>
      </Container>

      {/* Feature Matrix / Scroll Choreography */}
      <Container className="py-24 relative z-10">
        <Reveal blur scale>
          <div className="text-center mb-16">
            <H2 className="text-3xl md:text-5xl font-bold tracking-tight text-white/90 border-0">
              The Architecture of Knowledge
            </H2>
            <P className="text-neutral-400 mt-4 text-lg">Designed for depth, speed, and absolute clarity.</P>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          <Reveal direction="up" blur scale delay={0.1}>
            <Card className="h-full bg-neutral-900/40 backdrop-blur-xl border-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:bg-neutral-900/60 hover:border-indigo-500/30 group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                  <Code2 className="h-6 w-6 text-indigo-400" />
                </div>
                <CardTitle className="text-xl">Data Structures</CardTitle>
                <CardDescription className="text-neutral-400">O(1) Access & Memory Allocation</CardDescription>
              </CardHeader>
              <CardContent className="text-neutral-300">
                Master the fundamental building blocks of software. From raw pointers and contiguous arrays to complex graph representations.
              </CardContent>
            </Card>
          </Reveal>
          
          <Reveal direction="up" blur scale delay={0.2}>
            <Card className="h-full bg-neutral-900/40 backdrop-blur-xl border-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:bg-neutral-900/60 hover:border-indigo-500/30 group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                  <Cpu className="h-6 w-6 text-emerald-400" />
                </div>
                <CardTitle className="text-xl">Algorithms</CardTitle>
                <CardDescription className="text-neutral-400">O(n log n) Computational Limits</CardDescription>
              </CardHeader>
              <CardContent className="text-neutral-300">
                Understand algorithmic complexity, dynamic programming, and advanced traversal techniques to solve complex problems efficiently.
              </CardContent>
            </Card>
          </Reveal>

          <Reveal direction="up" blur scale delay={0.3}>
            <Card className="h-full bg-neutral-900/40 backdrop-blur-xl border-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:bg-neutral-900/60 hover:border-indigo-500/30 group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                  <Network className="h-6 w-6 text-amber-400" />
                </div>
                <CardTitle className="text-xl">System Design</CardTitle>
                <CardDescription className="text-neutral-400">Horizontal Scaling & Architecture</CardDescription>
              </CardHeader>
              <CardContent className="text-neutral-300">
                Learn how to architect distributed systems capable of handling millions of concurrent users with high availability.
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </Container>

      {/* Deep Parallax Section */}
      <Reveal blur>
        <div className="relative w-full h-[600px] mt-24 border-y border-white/5 overflow-hidden bg-black flex items-center justify-center">
          {/* Ambient Particles in background */}
          <div className="absolute inset-0 opacity-50">
             <ThreeWrapper type="particles" className="w-full h-full" />
          </div>
          
          <Parallax speed={0.7} className="absolute inset-0 flex items-center justify-center">
             <H1 className="text-[10vw] font-black text-white/[0.03] whitespace-nowrap select-none">
               INTELLIGENCE
             </H1>
          </Parallax>
          
          <Parallax speed={1.1} className="relative z-10 text-center max-w-2xl px-6">
            <H3 className="text-3xl font-bold text-white mb-6">Learn at the speed of thought.</H3>
            <P className="text-neutral-400 text-lg">
              Our proprietary engine tracks your cognitive mastery in real-time, adapting the curriculum to ensure you never waste time on what you already know, and never skip what you don't.
            </P>
          </Parallax>
        </div>
      </Reveal>

      {/* Footer spacing */}
      <div className="h-32" />
    </div>
  );
}
