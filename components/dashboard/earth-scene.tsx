"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

const TEX = {
  day:    "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
  night:  "https://unpkg.com/three-globe/example/img/earth-dark.jpg",
  spec:   "https://unpkg.com/three-globe/example/img/earth-water.png",
  clouds: "/planets/earth_clouds.png",
};

const EARTH_VERT = /* glsl */`
  varying vec2  vUv;
  varying vec3  vNormal;
  varying vec3  vWorldPos;

  void main() {
    vUv       = uv;
    vNormal   = normalize(mat3(modelMatrix) * normal);
    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const EARTH_FRAG = /* glsl */`
  uniform sampler2D uDay;
  uniform sampler2D uNight;
  uniform sampler2D uSpec;
  uniform vec3      uSunDir;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    vec3  N   = normalize(vNormal);
    float NdL = dot(N, normalize(uSunDir));

    vec4 dayCol   = texture2D(uDay,   vUv);
    vec4 nightCol = texture2D(uNight, vUv);
    float specVal = texture2D(uSpec,  vUv).r;

    float t = smoothstep(-0.12, 0.22, NdL);

    vec3 viewDir  = normalize(cameraPosition - vWorldPos);
    vec3 halfVec  = normalize(normalize(uSunDir) + viewDir);
    float spec    = pow(max(dot(N, halfVec), 0.0), 48.0) * specVal * 0.9;
    vec3  specCol = vec3(spec) * vec3(0.9, 0.95, 1.0);

    vec4 col = mix(nightCol, dayCol, t);
    col.rgb  += specCol * t;

    float fresnel = 1.0 - max(dot(N, viewDir), 0.0);
    col.rgb      *= 1.0 - fresnel * fresnel * 0.18;

    gl_FragColor = col;
  }
`;



function EarthMesh() {
  const earthRef  = useRef<THREE.Mesh>(null!);
  const cloudsRef = useRef<THREE.Mesh>(null!);

  const [dayTex, nightTex, specTex, cloudTex] = useTexture([
    TEX.day, TEX.night, TEX.spec, TEX.clouds,
  ]);

  const sunDir = useMemo(() => new THREE.Vector3(1.4, 0.5, 1.2).normalize(), []);

  const earthMat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      uDay:    { value: dayTex },
      uNight:  { value: nightTex },
      uSpec:   { value: specTex },
      uSunDir: { value: sunDir },
    },
    vertexShader:   EARTH_VERT,
    fragmentShader: EARTH_FRAG,
  }), [dayTex, nightTex, specTex, sunDir]);



  useFrame((_, dt) => {
    earthRef.current.rotation.y  += dt * 0.04;
    cloudsRef.current.rotation.y += dt * 0.055;
  });

  return (
    <group>
      <mesh ref={earthRef} castShadow>
        <sphereGeometry args={[2, 96, 96]} />
        <primitive object={earthMat} attach="material" />
      </mesh>

      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.025, 64, 64]} />
        <meshPhongMaterial
          alphaMap={cloudTex}
          transparent
          opacity={0.32}
          color="#ffffff"
          depthWrite={false}
          shininess={0}
        />
      </mesh>


    </group>
  );
}

function SatelliteModel({
  orbitR, speed, tiltX, tiltZ, phase, color,
}: {
  orbitR: number; speed: number; tiltX: number; tiltZ: number; phase: number; color: string;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const angle    = useRef(phase);

  const orbitPts = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 200; i++) {
      const a = (i / 200) * Math.PI * 2;
      pts.push(new THREE.Vector3(
        Math.cos(a) * orbitR,
        Math.sin(a) * orbitR * Math.sin(tiltX),
        Math.sin(a) * orbitR * Math.cos(tiltX),
      ));
    }
    return pts;
  }, [orbitR, tiltX]);

  const orbitGeo = useMemo(() => new THREE.BufferGeometry().setFromPoints(orbitPts), [orbitPts]);
  const orbitMat = useMemo(() => new THREE.LineBasicMaterial({ color: new THREE.Color(color), transparent: true, opacity: 0.18 }), [color]);

  useFrame((_, dt) => {
    angle.current += dt * speed;
    const a = angle.current;
    const x = Math.cos(a) * orbitR;
    const y = Math.sin(a) * orbitR * Math.sin(tiltX);
    const z = Math.sin(a) * orbitR * Math.cos(tiltX);
    groupRef.current.position.set(x, y, z);
    const tangentX = -Math.sin(a);
    const tangentZ =  Math.cos(a) * Math.cos(tiltX);
    groupRef.current.lookAt(
      groupRef.current.position.x + tangentX * 0.1,
      groupRef.current.position.y,
      groupRef.current.position.z + tangentZ * 0.1,
    );
  });

  return (
    <group>
      {/* @ts-ignore */}
      <line geometry={orbitGeo}>
        <primitive object={orbitMat} attach="material" />
      </line>
      <group ref={groupRef} scale={0.045}>
        <mesh>
          <boxGeometry args={[1.6, 1.0, 1.0]} />
          <meshStandardMaterial color="#c8cdd6" metalness={0.85} roughness={0.20} />
        </mesh>
        <mesh position={[0, 0, 0.51]}>
          <boxGeometry args={[1.4, 0.8, 0.02]} />
          <meshStandardMaterial color="#aab0bb" metalness={0.7} roughness={0.3} />
        </mesh>
        {([-2.4, 2.4] as const).map((xp, si) => (
          <group key={si} position={[xp, 0, 0]}>
            <mesh>
              <boxGeometry args={[2.6, 0.8, 0.06]} />
              <meshStandardMaterial color="#1a3a6e" metalness={0.4} roughness={0.4}
                emissive={new THREE.Color(0x0a2244)} emissiveIntensity={0.3} />
            </mesh>
            {[-0.9,-0.3,0.3,0.9].map((x, i) => (
              <mesh key={i} position={[x, 0, 0.04]}>
                <boxGeometry args={[0.5, 0.7, 0.01]} />
                <meshStandardMaterial color="#1e4488" metalness={0.5} roughness={0.3}
                  emissive={new THREE.Color(0x1a3a78)} emissiveIntensity={0.5} />
              </mesh>
            ))}
          </group>
        ))}
        <mesh position={[0, 0.7, 0]} rotation={[Math.PI/4, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.0, 0.4, 12, 1, true]} />
          <meshStandardMaterial color="#d0d5de" metalness={0.9} roughness={0.1} side={THREE.DoubleSide} />
        </mesh>
        <pointLight color={color} intensity={0.8} distance={2} decay={2} />
        <mesh>
          <sphereGeometry args={[0.18, 8, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={4} />
        </mesh>
      </group>
    </group>
  );
}

function AoiPin() {
  const ringRef = useRef<THREE.Mesh>(null!);
  const latR = (26.1 * Math.PI) / 180;
  const lonR = (91.7 * Math.PI) / 180;
  const r    = 2.04;
  const pos: [number,number,number] = [
    r * Math.cos(latR) * Math.sin(lonR),
    r * Math.sin(latR),
    r * Math.cos(latR) * Math.cos(lonR),
  ];
  useFrame(state => {
    const s = 1 + Math.sin(state.clock.elapsedTime * 2.8) * 0.55;
    ringRef.current.scale.setScalar(s);
    (ringRef.current.material as THREE.MeshBasicMaterial).opacity =
      Math.max(0.0, 0.75 - (s - 1) * 1.4);
  });
  return (
    <group position={pos}>
      <mesh>
        <sphereGeometry args={[0.032, 8, 8]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={5} />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.048, 0.072, 20]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.7}
          side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  );
}

const SAT_CONFIGS = [
  { orbitR: 2.82, speed: 0.28, tiltX: 0.48,  tiltZ: 0,   phase: 0,    color: "#60a5fa" },
  { orbitR: 3.05, speed: 0.21, tiltX: 1.05,  tiltZ: 0.3, phase: 2.09, color: "#4ade80" },
  { orbitR: 2.65, speed: 0.36, tiltX: -0.72, tiltZ: 0.1, phase: 4.19, color: "#facc15" },
];

function Scene() {
  return (
    <>
      <ambientLight intensity={0.04} />
      <directionalLight position={[8, 3, 6]} intensity={2.2} color="#fff8f0" castShadow />
      <directionalLight position={[-6, -2, -5]} intensity={0.03} color="#203050" />
      <Stars radius={90} depth={50} count={5000} factor={3.5} saturation={0.0} fade speed={0.3} />
      <Suspense fallback={null}>
        <EarthMesh />
        <AoiPin />
      </Suspense>
      {SAT_CONFIGS.map((cfg, i) => (
        <SatelliteModel key={i} {...cfg} />
      ))}
      <OrbitControls
        enableZoom enablePan={false} enableDamping dampingFactor={0.07}
        minDistance={3.2} maxDistance={10} autoRotate={false}
      />
    </>
  );
}

export function EarthScene() {
  return (
    <Canvas
      camera={{ position: [0, 1, 6.5], fov: 40 }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
      shadows
      style={{ width: "100%", height: "100%", background: "#050d1a" }}
    >
      <Scene />
    </Canvas>
  );
}

export default function Preview() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <EarthScene />
    </div>
  );
}
