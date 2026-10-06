import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { WatchModel } from './WatchModel';

function CameraController({ sequenceStep, manualControl }) {
  const targetPosRef = useRef(new THREE.Vector3(0, 0, 8));
  const targetLookRef = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    if (manualControl) return;

    if (sequenceStep) {
      const [px, py, pz] = sequenceStep.cameraPos;
      const [tx, ty, tz] = sequenceStep.cameraTarget;

      targetPosRef.current.set(px, py, pz);
      targetLookRef.current.set(tx, ty, tz);

      state.camera.position.lerp(targetPosRef.current, 0.05);
      state.camera.lookAt(targetLookRef.current);
    }
  });

  return null;
}

export function WatchScene({
  explodedProgress = 0,
  activeWatchId = 'a-01',
  sequenceStep = null,
  manualControl = false,
  showLabels = false,
  autoRotate = true,
  interactive = true,
  className = ''
}) {
  const controlsRef = useRef();

  return (
    <div className={`w-full h-full relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 42, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
      >
        <color attach="background" args={['#050608']} />

        {/* Studio Lighting Setup */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 15, 10]} intensity={2.5} color="#ffffff" castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={1.2} color="#D4AF37" />
        <spotLight position={[0, 10, 5]} angle={0.6} penumbra={1} intensity={3.5} color="#f8fafc" />
        <pointLight position={[0, -4, 4]} intensity={1.5} color="#38bdf8" />

        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3} enabled={!manualControl && explodedProgress < 0.1}>
            <WatchModel
              explodedProgress={explodedProgress}
              activeWatchId={activeWatchId}
              autoRotate={autoRotate && !manualControl}
              focusedComponent={sequenceStep ? sequenceStep.focusedComponent : 'all'}
              showLabels={showLabels || (sequenceStep && sequenceStep.explodedProgress > 0.3)}
            />
          </Float>

          {/* Contact Shadows on Dark Floor */}
          <ContactShadows
            position={[0, -2.8, 0]}
            opacity={0.7}
            scale={12}
            blur={2.5}
            far={4}
            color="#000000"
          />

          {/* Procedural Metallic Environment */}
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 0, 1]}>
              <Lightformer form="rect" intensity={4} position={[0, 5, -9]} scale={[10, 10, 1]} color="#ffffff" />
              <Lightformer form="rect" intensity={2} position={[-5, 2, -10]} scale={[10, 10, 1]} color="#D4AF37" />
              <Lightformer form="circle" intensity={3} position={[10, 1, 0]} scale={[10, 10, 1]} color="#ffffff" />
            </group>
          </Environment>
        </Suspense>

        {/* Camera Scroll Controller */}
        <CameraController sequenceStep={sequenceStep} manualControl={manualControl} />

        {/* Interactive Orbit Controls */}
        {interactive && (
          <OrbitControls
            ref={controlsRef}
            enableZoom={manualControl}
            enablePan={false}
            minDistance={2}
            maxDistance={14}
            maxPolarAngle={Math.PI / 1.4}
            minPolarAngle={Math.PI / 4}
            rotateSpeed={0.6}
            zoomSpeed={0.8}
          />
        )}
      </Canvas>
    </div>
  );
}
