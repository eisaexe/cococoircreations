// src/NatureBackground.jsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

function FloatingLeaf({ position, color }) {
  const mesh = useRef();
  
  // Random rotation speed
  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * 0.2;
    mesh.current.rotation.y += delta * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={mesh} position={position} rotation={[Math.random(), Math.random(), 0]}>
        {/* Simple leaf shape using a thin tetrahedron */}
        <tetrahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color={color} transparent opacity={0.6} />
      </mesh>
    </Float>
  );
}

export default function NatureBackground() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: 'linear-gradient(to bottom, #f0fdf4, #dcfce7)' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <FloatingLeaf position={[-2, 3, 0]} color="#4ade80" />
        <FloatingLeaf position={[3, -2, -2]} color="#22c55e" />
        <FloatingLeaf position={[-3, -4, -1]} color="#86efac" />
        <FloatingLeaf position={[2, 4, -3]} color="#16a34a" />
        <FloatingLeaf position={[0, 0, -5]} color="#15803d" />
      </Canvas>
    </div>
  );
}