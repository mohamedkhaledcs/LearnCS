"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode } from "react";
import { Canvas } from "@react-three/fiber";

// Dynamically import the Canvas content so Three.js is not loaded during SSR
const DynamicOrb = dynamic(() => import("./knowledge-orb"), { ssr: false });
const DynamicParticles = dynamic(() => import("./particle-field"), { ssr: false });

interface ThreeWrapperProps {
  type: "orb" | "particles";
  className?: string;
  fallback?: ReactNode;
}

export function ThreeWrapper({ type, className, fallback }: ThreeWrapperProps) {
  const FallbackUI = fallback || <Skeleton className={`w-full h-full rounded-full ${className}`} />;

  // Dynamic import of the actual R3F Canvas to ensure it only runs on client
  // We wrap it in a div to control sizing without Canvas taking over globally
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]} // Cap pixel ratio for performance
      >
        {type === "orb" && <DynamicOrb />}
        {type === "particles" && <DynamicParticles count={150} />}
      </Canvas>
    </div>
  );
}
