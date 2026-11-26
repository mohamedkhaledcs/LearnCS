"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useMotion } from "@/components/providers/motion-provider";
import * as THREE from "three";

interface KnowledgeOrbProps {
  color?: string;
  wireframeColor?: string;
}

export default function KnowledgeOrb({
  color = "#4f46e5", // Indigo 600
  wireframeColor = "#818cf8", // Indigo 400
}: KnowledgeOrbProps) {
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  
  const { isReducedMotion } = useMotion();

  useFrame((state, delta) => {
    if (isReducedMotion) return;
    
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.2;
      coreRef.current.rotation.x += delta * 0.1;
    }
    
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.3;
      ring1Ref.current.rotation.y += delta * 0.4;
    }
    
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x -= delta * 0.2;
      ring2Ref.current.rotation.z += delta * 0.5;
    }
    
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y -= delta * 0.5;
      ring3Ref.current.rotation.z -= delta * 0.1;
    }
  });

  return (
    <group>
      {/* Ambient and directional light */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      
      {/* Glowing Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
          wireframe={false}
        />
      </mesh>

      {/* Outer Wireframe Core */}
      <mesh scale={1.1}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={wireframeColor} wireframe opacity={0.3} transparent />
      </mesh>

      {/* Orbit Rings */}
      <mesh ref={ring1Ref} scale={1.8}>
        <torusGeometry args={[1, 0.01, 16, 100]} />
        <meshBasicMaterial color={wireframeColor} opacity={0.4} transparent />
      </mesh>
      
      <mesh ref={ring2Ref} scale={2.2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1, 0.01, 16, 100]} />
        <meshBasicMaterial color={wireframeColor} opacity={0.2} transparent />
      </mesh>
      
      <mesh ref={ring3Ref} scale={2.6} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[1, 0.01, 16, 100]} />
        <meshBasicMaterial color={wireframeColor} opacity={0.1} transparent />
      </mesh>
    </group>
  );
}
