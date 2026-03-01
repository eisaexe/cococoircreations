// src/NatureBackground.jsx
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Highlighted flying leaf with more visibility
function FlyingLeaf({ startPos, color, size, speed, delay }) {
  const mesh = useRef();
  const initialX = startPos[0];
  const initialY = startPos[1];
  const initialZ = startPos[2];
  
  useFrame((state) => {
    const time = state.clock.elapsedTime + delay;
    
    // More prominent horizontal drift
    const x = initialX + Math.sin(time * speed * 0.4) * 3;
    // More vertical movement
    const y = initialY + Math.cos(time * speed * 0.6) * 0.8;
    // Depth variation
    const z = initialZ + Math.sin(time * speed * 0.3) * 0.5;
    
    mesh.current.position.set(x, y, z);
    
    // More rotation for visibility
    mesh.current.rotation.x = Math.sin(time * speed) * 0.8;
    mesh.current.rotation.y = time * speed * 0.5;
    mesh.current.rotation.z = Math.cos(time * speed * 0.8) * 0.5;
  });

  return (
    <mesh ref={mesh} position={startPos}>
      {/* Slightly larger plane for more visibility */}
      <planeGeometry args={[size, size * 0.6, 1, 1]} />
      <meshStandardMaterial 
        color={color} 
        side={THREE.DoubleSide}
        transparent
        opacity={0.8}
        roughness={0.4}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

export default function NatureBackground() {
  // More vibrant leaf colors for highlighting
  const leafColors = [
    '#32CD32', '#228B22', '#3CB371', '#00FA9A', '#00FF7F',
    '#7CFC00', '#ADFF2F', '#9ACD32', '#6B8E23', '#556B2F'
  ];
  
  // More leaves for better visibility
  const leaves = useMemo(() => {
    const leafData = [];
    for (let i = 0; i < 50; i++) {
      leafData.push({
        pos: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 16,
          -Math.random() * 4 - 0.5
        ],
        color: leafColors[Math.floor(Math.random() * leafColors.length)],
        size: 0.15 + Math.random() * 0.15,
        speed: 0.3 + Math.random() * 0.4,
        delay: Math.random() * 10
      });
    }
    return leafData;
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: 'linear-gradient(to bottom, #f0fdf4, #dcfce7)' }}>
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#90EE90" />
        
        {/* Render highlighted flying leaves */}
        {leaves.map((leaf, i) => (
          <FlyingLeaf 
            key={`leaf-${i}`}
            startPos={leaf.pos}
            color={leaf.color}
            size={leaf.size}
            speed={leaf.speed}
            delay={leaf.delay}
          />
        ))}
      </Canvas>
    </div>
  );
}
