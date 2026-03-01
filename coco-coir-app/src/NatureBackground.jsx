// src/NatureBackground.jsx
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Soft organic leaf shape
function SoftLeaf({ position, rotation, scale, color }) {
  const group = useRef();
  
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.x += delta * 0.08;
      group.current.rotation.y += delta * 0.05;
      group.current.rotation.z += Math.sin(state.clock.elapsedTime * 0.4 + position[0]) * 0.015;
    }
  });

  // Create soft curved leaf shape
  const leafShape = useMemo(() => {
    const shape = new THREE.Shape();
    // Draw a soft almond/leaf shape
    shape.moveTo(0, 0.4);
    shape.bezierCurveTo(0.25, 0.35, 0.3, 0.1, 0, -0.4);
    shape.bezierCurveTo(-0.3, 0.1, -0.25, 0.35, 0, 0.4);
    return shape;
  }, []);

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <group ref={group} position={position} rotation={rotation} scale={scale}>
        <mesh>
          <shapeGeometry args={[leafShape]} />
          <meshStandardMaterial 
            color={color} 
            side={THREE.DoubleSide}
            roughness={0.4}
            metalness={0.05}
            transparent
            opacity={0.9}
          />
        </mesh>
        {/* Soft inner gradient effect */}
        <mesh scale={0.7}>
          <shapeGeometry args={[leafShape]} />
          <meshStandardMaterial 
            color={color}
            side={THREE.DoubleSide}
            roughness={0.5}
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Tiny soft particle leaf
function TinyLeaf({ position, color }) {
  const mesh = useRef();
  
  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * 0.15;
    mesh.current.rotation.y += delta * 0.1;
    mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0] * 3) * 0.08;
  });

  const tinyLeafShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.15);
    shape.bezierCurveTo(0.08, 0.12, 0.1, 0.03, 0, -0.15);
    shape.bezierCurveTo(-0.1, 0.03, -0.08, 0.12, 0, 0.15);
    return shape;
  }, []);

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={mesh} position={position}>
        <shapeGeometry args={[tinyLeafShape]} />
        <meshStandardMaterial 
          color={color} 
          side={THREE.DoubleSide}
          roughness={0.4}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

// Soft blurred circle for atmosphere
function AmbientParticle({ position, color }) {
  const mesh = useRef();
  
  useFrame((state) => {
    mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
  });

  return (
    <mesh ref={mesh} position={position}>
      <circleGeometry args={[0.15, 16]} />
      <meshBasicMaterial 
        color={color} 
        transparent
        opacity={0.25}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function NatureBackground() {
  // Soft green palette
  const leafColors = ['#86efac', '#4ade80', '#22c55e', '#16a34a', '#6ee7b7', '#a7f3d0', '#34d399'];
  const softColors = ['#d1fae5', '#a7f3d0', '#6ee7b7', '#a8e6cf'];

  // Medium soft leaves
  const leafPositions = useMemo(() => [
    { pos: [-2.5, 2, -2], rot: [0.3, 0.2, 0.1], scale: [0.7, 0.7, 0.7], color: leafColors[0] },
    { pos: [2, 0.5, -3], rot: [0.2, 0.4, -0.2], scale: [0.6, 0.6, 0.6], color: leafColors[1] },
    { pos: [-1, -2, -2.5], rot: [0.4, 0.1, 0.15], scale: [0.75, 0.75, 0.75], color: leafColors[2] },
    { pos: [3, -1.5, -3], rot: [0.15, 0.35, -0.1], scale: [0.55, 0.55, 0.55], color: leafColors[3] },
    { pos: [-3, 0, -2.5], rot: [0.25, 0.25, 0.2], scale: [0.65, 0.65, 0.65], color: leafColors[4] },
    { pos: [1, 2.5, -3], rot: [0.35, 0.15, -0.15], scale: [0.6, 0.6, 0.6], color: leafColors[5] },
    { pos: [0, -0.5, -4], rot: [0.2, 0.3, 0.1], scale: [0.5, 0.5, 0.5], color: leafColors[6] },
    { pos: [-1.5, 1, -3.5], rot: [0.3, 0.2, -0.1], scale: [0.55, 0.55, 0.55], color: leafColors[0] },
  ], []);

  // Tiny floating leaves
  const tinyLeafPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 40; i++) {
      positions.push({
        pos: [
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 10,
          -Math.random() * 4 - 1
        ],
        color: leafColors[Math.floor(Math.random() * leafColors.length)]
      });
    }
    return positions;
  }, []);

  // Ambient particles for softness
  const ambientPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 20; i++) {
      positions.push({
        pos: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          -Math.random() * 3 - 2
        ],
        color: softColors[Math.floor(Math.random() * softColors.length)]
      });
    }
    return positions;
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: 'linear-gradient(to bottom, #f0fdf4, #dcfce7)' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.6} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#86efac" />
        
        {/* Soft medium leaves */}
        {leafPositions.map((leaf, i) => (
          <SoftLeaf 
            key={`leaf-${i}`}
            position={leaf.pos}
            rotation={leaf.rot}
            scale={leaf.scale}
            color={leaf.color}
          />
        ))}
        
        {/* Tiny floating leaves */}
        {tinyLeafPositions.map((tinyLeaf, i) => (
          <TinyLeaf 
            key={`tiny-${i}`}
            position={tinyLeaf.pos}
            color={tinyLeaf.color}
          />
        ))}
        
        {/* Ambient soft particles */}
        {ambientPositions.map((ambient, i) => (
          <AmbientParticle 
            key={`ambient-${i}`}
            position={ambient.pos}
            color={ambient.color}
          />
        ))}
      </Canvas>
    </div>
  );
}
