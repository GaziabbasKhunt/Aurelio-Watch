import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export function WatchModel({
  explodedProgress = 0,
  activeWatchId = 'a-01',
  autoRotate = true,
  focusedComponent = 'all',
  showLabels = false
}) {
  const groupRef = useRef();
  const gearsGroupRef = useRef();
  const balanceWheelRef = useRef();
  const tourbillonCageRef = useRef();
  const handsGroupRef = useRef();

  // Color Palette per variation
  const theme = useMemo(() => {
    switch (activeWatchId) {
      case 'a-02': // Aureum (18K Gold)
        return {
          caseColor: '#D4AF37',
          caseRoughness: 0.22,
          caseMetalness: 0.95,
          bridgeColor: '#E6CA65',
          gearColor: '#C5A028',
          handColor: '#FFF4CE',
          rubyColor: '#E6004C',
          dialRing: '#1C1917',
          accent: '#F59E0B'
        };
      case 'a-03': // Nero Ceramic
        return {
          caseColor: '#18181B',
          caseRoughness: 0.35,
          caseMetalness: 0.85,
          bridgeColor: '#27272A',
          gearColor: '#A1A1AA',
          handColor: '#FFFFFF',
          rubyColor: '#EF4444',
          dialRing: '#09090B',
          accent: '#38BDF8'
        };
      case 'a-01': // Obsidian Titanium
      default:
        return {
          caseColor: '#52525B',
          caseRoughness: 0.25,
          caseMetalness: 0.9,
          bridgeColor: '#3F3F46',
          gearColor: '#D4AF37',
          handColor: '#F4F4F5',
          rubyColor: '#DC2626',
          dialRing: '#0F1015',
          accent: '#D4AF37'
        };
    }
  }, [activeWatchId]);

  // Refined metallic materials
  const caseMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: theme.caseColor,
    metalness: theme.caseMetalness,
    roughness: theme.caseRoughness,
    envMapIntensity: 1.8
  }), [theme]);

  const bridgeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: theme.bridgeColor,
    metalness: 0.88,
    roughness: 0.3
  }), [theme]);

  const gearMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: theme.gearColor,
    metalness: 0.92,
    roughness: 0.18
  }), [theme]);

  const handMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: theme.handColor,
    metalness: 0.95,
    roughness: 0.1,
    emissive: theme.handColor,
    emissiveIntensity: 0.05
  }), [theme]);

  const rubyMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: theme.rubyColor,
    transmission: 0.7,
    opacity: 1,
    transparent: true,
    roughness: 0.05,
    ior: 1.76,
    thickness: 0.2
  }), [theme]);

  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    transmission: 0.95,
    opacity: 1,
    transparent: true,
    roughness: 0.02,
    ior: 1.5,
    reflectivity: 0.9,
    thickness: 0.15
  }), []);

  const screwMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#2563EB', // Flame blued steel screws
    metalness: 0.95,
    roughness: 0.15
  }), []);

  // Real-time smooth animations
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Subtle floating rotation when idle
    if (autoRotate && groupRef.current && explodedProgress < 0.1) {
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.12;
      groupRef.current.rotation.x = Math.cos(t * 0.2) * 0.06;
    }

    // Gear train rotations
    if (gearsGroupRef.current) {
      const c = gearsGroupRef.current.children;
      if (c[0]) c[0].rotation.z = t * 0.3;
      if (c[1]) c[1].rotation.z = -t * 0.6;
      if (c[2]) c[2].rotation.z = t * 1.2;
      if (c[3]) c[3].rotation.z = -t * 2.4;
    }

    // Balance wheel 4Hz oscillation
    if (balanceWheelRef.current) {
      balanceWheelRef.current.rotation.z = Math.sin(t * 22) * 0.4;
    }

    // Tourbillon cage rotation (60s rotation)
    if (tourbillonCageRef.current) {
      tourbillonCageRef.current.rotation.z = t * 0.4;
    }

    // Hands clock rotation
    if (handsGroupRef.current) {
      const c = handsGroupRef.current.children;
      if (c[0]) c[0].rotation.z = -t * 0.05; // Minute
      if (c[1]) c[1].rotation.z = -t * 0.005; // Hour
      if (c[2]) c[2].rotation.z = -t * 0.6; // Second
    }
  });

  // Balanced exploded progress Z distances (Max span = ~1.6 units)
  const p = Math.min(Math.max(explodedProgress, 0), 1);
  const zOffset = {
    crystal: p * 1.6,
    bezel: p * 1.2,
    hands: p * 0.8,
    dial: p * 0.4,
    bridges: p * 0.1,
    gears: -p * 0.2,
    balance: -p * 0.5,
    tourbillon: -p * 0.8,
    mainplate: -p * 1.1,
    caseback: -p * 1.4
  };

  return (
    <group ref={groupRef} dispose={null} scale={[1.2, 1.2, 1.2]}>
      
      {/* ============================================================ */}
      {/* 1. SAPPHIRE CRYSTAL LAYER */}
      {/* ============================================================ */}
      <group position={[0, 0, 0.35 + zOffset.crystal]}>
        <mesh material={glassMaterial}>
          <cylinderGeometry args={[1.85, 1.85, 0.05, 64]} />
        </mesh>
        {showLabels && p > 0.3 && (
          <Html position={[2.2, 0.4, 0]} center>
            <div className="label-tag">
              <span className="label-line" />
              <span className="label-text">SAPPHIRE CRYSTAL</span>
            </div>
          </Html>
        )}
      </group>

      {/* ============================================================ */}
      {/* 2. CUSHION BEZEL & CASE TOP */}
      {/* ============================================================ */}
      <group position={[0, 0, 0.22 + zOffset.bezel]}>
        {/* Outer Cushion Bezel Ring */}
        <mesh material={caseMaterial}>
          <cylinderGeometry args={[1.92, 2.05, 0.12, 8]} />
        </mesh>
        {/* Inner Bezel Chamfer Ring */}
        <mesh position={[0, 0, 0.04]} material={caseMaterial}>
          <torusGeometry args={[1.85, 0.05, 16, 64]} />
        </mesh>
        {/* 8 Hex Bezel Screws */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i * Math.PI) / 4;
          const r = 1.76;
          return (
            <mesh
              key={`screw-${i}`}
              position={[Math.cos(angle) * r, Math.sin(angle) * r, 0.07]}
              material={screwMaterial}
            >
              <cylinderGeometry args={[0.04, 0.04, 0.02, 12]} />
            </mesh>
          );
        })}
        {showLabels && p > 0.3 && (
          <Html position={[-2.3, 0.5, 0]} center>
            <div className="label-tag text-left">
              <span className="label-text">TITANIUM CUSHION BEZEL</span>
              <span className="label-line-left" />
            </div>
          </Html>
        )}
      </group>

      {/* ============================================================ */}
      {/* 3. DIAMOND-CUT SKELETON HANDS */}
      {/* ============================================================ */}
      <group ref={handsGroupRef} position={[0, 0, 0.15 + zOffset.hands]}>
        {/* Minute Hand */}
        <group position={[0, 0, 0.03]}>
          <mesh position={[0, 0.65, 0]} material={handMaterial}>
            <boxGeometry args={[0.06, 1.25, 0.02]} />
          </mesh>
          {/* Skeleton Cutout */}
          <mesh position={[0, 0.65, 0]}>
            <boxGeometry args={[0.03, 0.8, 0.025]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
        </group>

        {/* Hour Hand */}
        <group position={[0, 0, 0.015]}>
          <mesh position={[0, 0.42, 0]} material={handMaterial}>
            <boxGeometry args={[0.08, 0.8, 0.02]} />
          </mesh>
        </group>

        {/* Second Hand (Red-tipped needle) */}
        <group position={[0, 0, 0.045]}>
          <mesh position={[0, 0.68, 0]}>
            <boxGeometry args={[0.015, 1.35, 0.015]} />
            <meshStandardMaterial color="#EF4444" roughness={0.1} />
          </mesh>
          <mesh position={[0, 1.28, 0]}>
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshStandardMaterial color="#EF4444" />
          </mesh>
        </group>

        {/* Central Cannon Pinion Cap */}
        <mesh material={handMaterial} position={[0, 0, 0.03]}>
          <cylinderGeometry args={[0.09, 0.09, 0.06, 24]} />
        </mesh>
        {showLabels && p > 0.3 && (
          <Html position={[2.2, 0.1, 0]} center>
            <div className="label-tag">
              <span className="label-line" />
              <span className="label-text">DIAMOND-CUT HANDS</span>
            </div>
          </Html>
        )}
      </group>

      {/* ============================================================ */}
      {/* 4. SKELETON CHAPTER RING DIAL */}
      {/* ============================================================ */}
      <group position={[0, 0, 0.08 + zOffset.dial]}>
        {/* Outer Ring */}
        <mesh material={bridgeMaterial}>
          <ringGeometry args={[1.55, 1.82, 64]} />
        </mesh>
        {/* 12 Applied Faceted Hour Markers */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * Math.PI) / 6;
          const r = 1.68;
          const isMain = i % 3 === 0;
          return (
            <mesh
              key={`marker-${i}`}
              position={[Math.cos(angle) * r, Math.sin(angle) * r, 0.02]}
              rotation={[0, 0, angle + Math.PI / 2]}
              material={handMaterial}
            >
              <boxGeometry args={[isMain ? 0.06 : 0.035, isMain ? 0.18 : 0.12, 0.025]} />
            </mesh>
          );
        })}
        {/* Aurelio Branding Plate at 12 o'clock */}
        <mesh position={[0, 1.25, 0.02]} material={bridgeMaterial}>
          <boxGeometry args={[0.9, 0.22, 0.02]} />
        </mesh>
        {showLabels && p > 0.3 && (
          <Html position={[-2.2, -0.4, 0]} center>
            <div className="label-tag text-left">
              <span className="label-text">SKELETON CHAPTER RING</span>
              <span className="label-line-left" />
            </div>
          </Html>
        )}
      </group>

      {/* ============================================================ */}
      {/* 5. MOVEMENT SKELETON BRIDGES & RUBIES */}
      {/* ============================================================ */}
      <group position={[0, 0, 0 + zOffset.bridges]}>
        {/* Upper Curved Skeleton Bridge (Arc Ring Segment) */}
        <mesh position={[0, 0.4, 0]} material={bridgeMaterial}>
          <ringGeometry args={[0.7, 1.45, 32, 1, 0, Math.PI]} />
        </mesh>
        {/* Lower Skeleton Arm Left */}
        <mesh position={[-0.6, -0.4, 0]} rotation={[0, 0, 0.4]} material={bridgeMaterial}>
          <boxGeometry args={[0.7, 0.2, 0.04]} />
        </mesh>
        {/* Lower Skeleton Arm Right */}
        <mesh position={[0.6, -0.4, 0]} rotation={[0, 0, -0.4]} material={bridgeMaterial}>
          <boxGeometry args={[0.7, 0.2, 0.04]} />
        </mesh>
        {/* 3 Synthetic Ruby Jewel Bearings */}
        {[
          [-0.55, 0.45],
          [0, 0.75],
          [0.55, 0.45]
        ].map(([x, y], idx) => (
          <group key={`ruby-${idx}`} position={[x, y, 0.03]}>
            <mesh material={rubyMaterial}>
              <sphereGeometry args={[0.06, 16, 16]} />
            </mesh>
            <mesh material={gearMaterial}>
              <ringGeometry args={[0.06, 0.1, 24]} />
            </mesh>
          </group>
        ))}
        {showLabels && p > 0.3 && (
          <Html position={[2.3, 0.6, 0]} center>
            <div className="label-tag">
              <span className="label-line" />
              <span className="label-text">GRADE 5 TITANIUM BRIDGES</span>
            </div>
          </Html>
        )}
      </group>

      {/* ============================================================ */}
      {/* 6. INTERCONNECTED GEAR TRAIN */}
      {/* ============================================================ */}
      <group ref={gearsGroupRef} position={[0, 0, -0.12 + zOffset.gears]}>
        {/* Mainspring Barrel Wheel (Top Right) */}
        <mesh position={[0.5, 0.5, 0]} material={gearMaterial}>
          <cylinderGeometry args={[0.55, 0.55, 0.04, 36]} />
        </mesh>
        {/* Center Wheel */}
        <mesh position={[0, 0, -0.02]} material={gearMaterial}>
          <cylinderGeometry args={[0.42, 0.42, 0.03, 32]} />
        </mesh>
        {/* Third Wheel */}
        <mesh position={[-0.45, 0.15, 0.01]} material={gearMaterial}>
          <cylinderGeometry args={[0.32, 0.32, 0.03, 24]} />
        </mesh>
        {/* Escape Wheel */}
        <mesh position={[-0.28, -0.4, 0]} material={gearMaterial}>
          <cylinderGeometry args={[0.22, 0.22, 0.03, 20]} />
        </mesh>
        {showLabels && p > 0.3 && (
          <Html position={[-2.3, 0.2, 0]} center>
            <div className="label-tag text-left">
              <span className="label-text">PRECISION GEAR TRAIN</span>
              <span className="label-line-left" />
            </div>
          </Html>
        )}
      </group>

      {/* ============================================================ */}
      {/* 7. BALANCE WHEEL (28,800 VPH) */}
      {/* ============================================================ */}
      <group position={[0, -0.45, -0.28 + zOffset.balance]}>
        <group ref={balanceWheelRef}>
          {/* Outer Rim */}
          <mesh material={gearMaterial}>
            <torusGeometry args={[0.38, 0.025, 16, 36]} />
          </mesh>
          {/* Balance Arms */}
          <mesh material={gearMaterial}>
            <boxGeometry args={[0.74, 0.025, 0.02]} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} material={gearMaterial}>
            <boxGeometry args={[0.74, 0.025, 0.02]} />
          </mesh>
          {/* Gold Poising Weights */}
          {[0, 1, 2, 3].map((i) => {
            const angle = (i * Math.PI) / 2;
            return (
              <mesh
                key={`poise-${i}`}
                position={[Math.cos(angle) * 0.38, Math.sin(angle) * 0.38, 0]}
                material={gearMaterial}
              >
                <sphereGeometry args={[0.035, 12, 12]} />
              </mesh>
            );
          })}
        </group>
        {showLabels && p > 0.3 && (
          <Html position={[2.2, -0.3, 0]} center>
            <div className="label-tag">
              <span className="label-line" />
              <span className="label-text">28,800 VPH BALANCE WHEEL</span>
            </div>
          </Html>
        )}
      </group>

      {/* ============================================================ */}
      {/* 8. 60-SECOND FLYING TOURBILLON & MAINPLATE */}
      {/* ============================================================ */}
      <group position={[0, -0.62, -0.45 + zOffset.tourbillon]}>
        {/* Floating Titanium Tourbillon Cage at 6 o'clock */}
        <group ref={tourbillonCageRef} position={[0, 0, 0.05]}>
          <mesh material={caseMaterial}>
            <ringGeometry args={[0.25, 0.38, 32]} />
          </mesh>
          <mesh material={caseMaterial}>
            <boxGeometry args={[0.74, 0.04, 0.03]} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 3]} material={caseMaterial}>
            <boxGeometry args={[0.74, 0.04, 0.03]} />
          </mesh>
          <mesh position={[0, 0, 0.03]} material={rubyMaterial}>
            <sphereGeometry args={[0.05, 16, 16]} />
          </mesh>
        </group>
        {showLabels && p > 0.3 && (
          <Html position={[-2.4, -0.7, 0]} center>
            <div className="label-tag text-left">
              <span className="label-text">60-SECOND FLYING TOURBILLON</span>
              <span className="label-line-left" />
            </div>
          </Html>
        )}
      </group>

      {/* ============================================================ */}
      {/* 9. MAINPLATE BACKING */}
      {/* ============================================================ */}
      <group position={[0, 0, -0.6 + zOffset.mainplate]}>
        <mesh material={bridgeMaterial}>
          <cylinderGeometry args={[1.82, 1.82, 0.06, 64]} />
        </mesh>
        {/* Circular Perlage Texture Grain Rings */}
        <mesh position={[0, 0, 0.035]} material={caseMaterial}>
          <ringGeometry args={[0.4, 1.75, 48]} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 10. SAPPHIRE CASEBACK & HOUSING */}
      {/* ============================================================ */}
      <group position={[0, 0, -0.75 + zOffset.caseback]}>
        {/* Titanium Caseback Housing */}
        <mesh material={caseMaterial}>
          <cylinderGeometry args={[1.98, 1.98, 0.1, 8]} />
        </mesh>
        {/* Exhibition Sapphire Window */}
        <mesh position={[0, 0, 0.02]} material={glassMaterial}>
          <cylinderGeometry args={[1.5, 1.5, 0.04, 32]} />
        </mesh>
        {showLabels && p > 0.3 && (
          <Html position={[2.2, -0.8, 0]} center>
            <div className="label-tag">
              <span className="label-line" />
              <span className="label-text">EXHIBITION SAPPHIRE CASEBACK</span>
            </div>
          </Html>
        )}
      </group>

      {/* CROWN AT 3 O'CLOCK POSITION */}
      <group position={[1.98 + p * 0.4, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]} material={caseMaterial}>
          <cylinderGeometry args={[0.22, 0.22, 0.25, 24]} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0.08, 0, 0]} material={gearMaterial}>
          <cylinderGeometry args={[0.23, 0.23, 0.08, 16]} />
        </mesh>
      </group>

    </group>
  );
}
