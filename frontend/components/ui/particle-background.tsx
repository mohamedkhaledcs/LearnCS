"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const particleCount = 150;
  const maxDistance = 2.5;

  // Generate random positions
  const { basePositions, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10; // z

      // Subtle indigo/emerald tint
      const isEmerald = Math.random() > 0.5;
      col[i * 3] = isEmerald ? 0.06 : 0.2; // r
      col[i * 3 + 1] = isEmerald ? 0.7 : 0.2; // g
      col[i * 3 + 2] = isEmerald ? 0.5 : 0.8; // b
    }
    return { basePositions: pos, colors: col };
  }, [particleCount]);

  // Current active positions (start at base positions)
  const currentPositions = useMemo(() => new Float32Array(basePositions), [basePositions]);

  // We need a persistent array to update lines
  const linePositions = useMemo(() => new Float32Array(particleCount * particleCount * 3), [particleCount]);
  const lineColors = useMemo(() => new Float32Array(particleCount * particleCount * 3), [particleCount]);

  const lastPointerRef = useRef({ x: 0, y: 0 });
  const lastMoveTimeRef = useRef(0);
  const repelRadiusRef = useRef(4.0);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    // Detect mouse movement
    if (state.pointer.x !== lastPointerRef.current.x || state.pointer.y !== lastPointerRef.current.y) {
      lastMoveTimeRef.current = state.clock.elapsedTime;
      lastPointerRef.current.x = state.pointer.x;
      lastPointerRef.current.y = state.pointer.y;
    }

    // Determine idle state (e.g., 2 seconds of no movement)
    const isIdle = (state.clock.elapsedTime - lastMoveTimeRef.current) > 2.0;

    // Smoothly transition the repulsion radius
    const targetRadius = isIdle ? 0 : 4.0;
    repelRadiusRef.current += (targetRadius - repelRadiusRef.current) * 0.05;

    // Slowly rotate the entire network
    pointsRef.current.rotation.y += 0.0005;
    pointsRef.current.rotation.x += 0.0002;
    linesRef.current.rotation.y += 0.0005;
    linesRef.current.rotation.x += 0.0002;

    // We will use state.pointer but map it roughly to world space
    const mouseWorldX = state.pointer.x * 12;
    const mouseWorldY = state.pointer.y * 12;
    
    // Group follows mouse very slightly for parallax
    pointsRef.current.position.x += ((state.pointer.x * 2) - pointsRef.current.position.x) * 0.01;
    pointsRef.current.position.y += ((state.pointer.y * 2) - pointsRef.current.position.y) * 0.01;
    linesRef.current.position.x = pointsRef.current.position.x;
    linesRef.current.position.y = pointsRef.current.position.y;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    let lineIdx = 0;

    // First update particle positions based on mouse proximity
    for (let i = 0; i < particleCount; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      let px = currentPositions[ix];
      let py = currentPositions[iy];
      let pz = currentPositions[iz];

      const bx = basePositions[ix];
      const by = basePositions[iy];
      const bz = basePositions[iz];

      // Apply subtle rotation to base positions over time to keep them drifting
      const time = state.clock.elapsedTime * 0.2;
      const driftX = Math.sin(time + i) * 0.5;
      const driftY = Math.cos(time + i) * 0.5;

      const targetX = bx + driftX;
      const targetY = by + driftY;
      const targetZ = bz;

      // Mouse repulsion using the smoothed radius
      const dxMouse = px - mouseWorldX;
      const dyMouse = py - mouseWorldY;
      const distMouseSq = dxMouse * dxMouse + dyMouse * dyMouse;
      
      const currentRepelRadius = repelRadiusRef.current;
      if (currentRepelRadius > 0.1 && distMouseSq < currentRepelRadius * currentRepelRadius && distMouseSq > 0.01) {
        const force = (currentRepelRadius - Math.sqrt(distMouseSq)) / currentRepelRadius;
        const pushX = (dxMouse / Math.sqrt(distMouseSq)) * force * 0.5;
        const pushY = (dyMouse / Math.sqrt(distMouseSq)) * force * 0.5;
        
        px += pushX;
        py += pushY;
      }

      // Spring back to target
      px += (targetX - px) * 0.02;
      py += (targetY - py) * 0.02;
      pz += (targetZ - pz) * 0.02;

      currentPositions[ix] = px;
      currentPositions[iy] = py;
      currentPositions[iz] = pz;
      
      positions[ix] = px;
      positions[iy] = py;
      positions[iz] = pz;
    }

    // Calculate lines dynamically based on updated positions
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistance * maxDistance) {
          const alpha = 1.0 - (distSq / (maxDistance * maxDistance));
          
          linePositions[lineIdx * 3] = positions[i * 3];
          linePositions[lineIdx * 3 + 1] = positions[i * 3 + 1];
          linePositions[lineIdx * 3 + 2] = positions[i * 3 + 2];
          
          lineColors[lineIdx * 3] = 0.3 * alpha;
          lineColors[lineIdx * 3 + 1] = 0.3 * alpha;
          lineColors[lineIdx * 3 + 2] = 0.6 * alpha;
          lineIdx++;

          linePositions[lineIdx * 3] = positions[j * 3];
          linePositions[lineIdx * 3 + 1] = positions[j * 3 + 1];
          linePositions[lineIdx * 3 + 2] = positions[j * 3 + 2];
          
          lineColors[lineIdx * 3] = 0.3 * alpha;
          lineColors[lineIdx * 3 + 1] = 0.3 * alpha;
          lineColors[lineIdx * 3 + 2] = 0.6 * alpha;
          lineIdx++;
        }
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.setDrawRange(0, lineIdx);
    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            args={[currentPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} vertexColors transparent opacity={0.6} sizeAttenuation />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount * particleCount}
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount * particleCount}
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}

export function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} dpr={[1, 1.5]}>
        <fog attach="fog" args={["#0a0a0a", 10, 25]} />
        <ParticleNetwork />
      </Canvas>
    </div>
  );
}
