import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

const HeartShape = () => {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const x = 0, y = 0;
    s.moveTo(x, y + 0.5);
    s.bezierCurveTo(x, y + 0.5, x - 0.5, y, x - 0.5, y);
    s.bezierCurveTo(x - 0.5, y - 0.35, x, y - 0.6, x, y - 0.8);
    s.bezierCurveTo(x, y - 0.6, x + 0.5, y - 0.35, x + 0.5, y);
    s.bezierCurveTo(x + 0.5, y, x, y + 0.5, x, y + 0.5);
    return s;
  }, []);

  const geometry = useMemo(() => {
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.15,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 3,
    });
  }, [shape]);

  return geometry;
};

const FloatingHeart = ({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = HeartShape();

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3;
    meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * speed * 0.3) * 0.1;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
  });

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
        <meshStandardMaterial
          color="#e84393"
          emissive="#c44569"
          emissiveIntensity={0.4}
          transparent
          opacity={0.6}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
    </Float>
  );
};

const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 200;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c1 = new THREE.Color('#e84393');
    const c2 = new THREE.Color('#fd79a8');
    const c3 = new THREE.Color('#fab1a0');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const pick = [c1, c2, c3][Math.floor(Math.random() * 3)];
      col[i * 3] = pick.r;
      col[i * 3 + 1] = pick.g;
      col[i * 3 + 2] = pick.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  );
};

const Scene = () => (
  <>
    <ambientLight intensity={0.3} />
    <pointLight position={[5, 5, 5]} color="#e84393" intensity={0.8} />
    <pointLight position={[-5, -3, 3]} color="#fab1a0" intensity={0.5} />

    <FloatingHeart position={[-3, 2, -2]} scale={0.5} speed={1.2} />
    <FloatingHeart position={[3.5, -1, -3]} scale={0.35} speed={0.8} />
    <FloatingHeart position={[-1, -2.5, -1.5]} scale={0.25} speed={1.5} />
    <FloatingHeart position={[2, 3, -4]} scale={0.4} speed={1} />
    <FloatingHeart position={[-4, 0, -5]} scale={0.3} speed={0.9} />

    <ParticleField />
    <Stars radius={12} depth={30} count={800} factor={3} saturation={0.5} fade speed={0.5} />
  </>
);

const ThreeBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none">
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Scene />
    </Canvas>
  </div>
);

export default ThreeBackground;
