"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMotion } from "@/components/providers/motion-provider";

interface ParticleFieldProps {
  count?: number;
  color?: string;
}

export default function ParticleField({ count = 200, color = "#a5b4fc" }: ParticleFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { isReducedMotion } = useMotion();

  // Generate random positions and phases
  const { positions, phases } = useMemo(() => {
    // Cap count to 200 for performance safety
    const safeCount = Math.min(count, 300);
    const pos = new Float32Array(safeCount * 3);
    const phs = new Float32Array(safeCount);
    
    for (let i = 0; i < safeCount; i++) {
      // Scatter over a large area
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
      
      phs[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, phases: phs, count: safeCount };
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!meshRef.current || isReducedMotion) return;

    const time = state.clock.getElapsedTime();

    for (let i = 0; i < positions.length / 3; i++) {
      const x = positions[i * 3];
      // Subtle float up and down
      const y = positions[i * 3 + 1] + Math.sin(time * 0.2 + phases[i]) * 0.5;
      const z = positions[i * 3 + 2];

      dummy.position.set(x, y, z);
      // Gentle rotation
      dummy.rotation.x = time * 0.1 + phases[i];
      dummy.rotation.y = time * 0.1 + phases[i];
      
      // Scale pulse
      const scale = 0.5 + Math.sin(time * 0.5 + phases[i]) * 0.5;
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, positions.length / 3]}>
      <octahedronGeometry args={[0.05, 0]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </instancedMesh>
  );
}
