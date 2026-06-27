"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

const EARTH_TEX = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg";
const EARTH_NORMAL = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg";
const EARTH_SPEC = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg";
const EARTH_CLOUDS = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png";
const MOON_TEX = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg";

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);

  const [earthMap, normalMap, specMap, cloudMap] = useTexture([
    EARTH_TEX, EARTH_NORMAL, EARTH_SPEC, EARTH_CLOUDS,
  ]);

  useFrame((_, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.08;
    if (cloudRef.current) cloudRef.current.rotation.y += delta * 0.11;
  });

  return (
    <group>
      {/* Atmosphere halo */}
      <mesh>
        <sphereGeometry args={[2.18, 64, 64]} />
        <meshPhongMaterial
          color={new THREE.Color(0x3366ff)}
          transparent
          opacity={0.07}
          side={THREE.FrontSide}
          depthWrite={false}
        />
      </mesh>
      {/* Earth surface */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          map={earthMap}
          normalMap={normalMap}
          specularMap={specMap}
          specular={new THREE.Color(0x221133)}
          shininess={18}
        />
      </mesh>
      {/* Cloud layer */}
      <mesh ref={cloudRef}>
        <sphereGeometry args={[2.04, 64, 64]} />
        <meshPhongMaterial
          map={cloudMap}
          transparent
          opacity={0.32}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function OrbitalRing({
  radius,
  tiltX = 0,
  tiltZ = 0,
  color = "#4488ff",
}: {
  radius: number;
  tiltX?: number;
  tiltZ?: number;
  color?: string;
}) {
  return (
    <mesh rotation={[Math.PI / 2 + tiltX, 0, tiltZ]}>
      <torusGeometry args={[radius, 0.007, 2, 128]} />
      <meshBasicMaterial color={color} transparent opacity={0.22} />
    </mesh>
  );
}

function Moon() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const moonMap = useTexture(MOON_TEX);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.22;
    if (groupRef.current) {
      groupRef.current.position.set(
        Math.cos(t) * 5.6,
        Math.sin(t * 0.15) * 0.7,
        Math.sin(t) * 5.6
      );
    }
    if (meshRef.current) meshRef.current.rotation.y += 0.003;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.54, 32, 32]} />
        <meshPhongMaterial map={moonMap} />
      </mesh>
    </group>
  );
}

function Satellite({ idx }: { idx: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const speed = 0.85 + idx * 0.38;
  const radius = 3.0 + idx * 0.6;
  const tilt = (idx * Math.PI) / 3;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    if (groupRef.current) {
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);
      const rx = Math.cos(t) * radius;
      const rz = Math.sin(t) * radius;
      groupRef.current.position.set(rx, rz * sinT, rz * cosT);

      // Orient forward along orbit tangent
      const vx = -Math.sin(t) * speed * radius;
      const vz = Math.cos(t) * speed * radius;
      groupRef.current.lookAt(
        groupRef.current.position.x + vx,
        groupRef.current.position.y,
        groupRef.current.position.z + vz * cosT
      );
    }
  });

  const bodyColors = ["#b8cfe0", "#c4d4e4", "#a8bcd8"] as const;
  const panelColors = ["#1a3a7a", "#0a2a5a", "#153070"] as const;

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[0.19, 0.13, 0.13]} />
        <meshStandardMaterial color={bodyColors[idx]} metalness={0.85} roughness={0.18} />
      </mesh>
      {/* Solar panels */}
      {[-0.3, 0.3].map((z) => (
        <mesh key={z} position={[0, 0, z]}>
          <boxGeometry args={[0.44, 0.007, 0.19]} />
          <meshStandardMaterial
            color={panelColors[idx]}
            metalness={0.45}
            roughness={0.3}
            emissive={panelColors[idx]}
            emissiveIntensity={0.18}
          />
        </mesh>
      ))}
      {/* Panel struts */}
      {[-0.17, 0.17].map((z) => (
        <mesh key={z} position={[0, 0, z]}>
          <boxGeometry args={[0.01, 0.01, 0.18]} />
          <meshStandardMaterial color="#aaaaaa" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      {/* Antenna mast */}
      <mesh position={[0, 0.115, 0]}>
        <cylinderGeometry args={[0.004, 0.004, 0.19, 6]} />
        <meshStandardMaterial color="#dddddd" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Dish */}
      <mesh position={[0, 0.215, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.055, 0.065, 8]} />
        <meshStandardMaterial color="#cccccc" metalness={0.88} roughness={0.12} />
      </mesh>
      {/* Active signal dot */}
      <mesh position={[0, 0.248, 0]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial
          color="#00ccff"
          emissive="#00ccff"
          emissiveIntensity={3}
        />
      </mesh>
    </group>
  );
}

function SceneContents() {
  return (
    <>
      <ambientLight intensity={0.14} />
      <directionalLight position={[12, 6, 8]} intensity={1.9} color="#ffe8c0" castShadow />
      <pointLight position={[-8, -4, -8]} intensity={0.1} color="#2244aa" />

      <Stars radius={350} depth={80} count={6000} factor={4} saturation={0.1} fade speed={0.4} />

      <Suspense fallback={null}>
        <Earth />
        <Moon />
      </Suspense>

      <OrbitalRing radius={3.0} tiltX={0} tiltZ={0} color="#88aaff" />
      <OrbitalRing radius={3.6} tiltX={Math.PI / 3} tiltZ={0} color="#88ccff" />
      <OrbitalRing radius={4.2} tiltX={(2 * Math.PI) / 3} tiltZ={0.2} color="#aabbff" />

      <Satellite idx={0} />
      <Satellite idx={1} />
      <Satellite idx={2} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.28}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={(3 * Math.PI) / 4}
      />
    </>
  );
}

export function EarthScene() {
  return (
    <Canvas
      camera={{ position: [0, 3, 9], fov: 42 }}
      shadows
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <SceneContents />
    </Canvas>
  );
}
