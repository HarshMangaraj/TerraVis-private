"use client";

import { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export type SpaceBodyKey = "earth" | "moon" | "mars" | "sun" | "milky";

const TEXTURES = {
  earthDay:    "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
  earthNight:  "https://unpkg.com/three-globe/example/img/earth-dark.jpg",
  earthSpec:   "https://unpkg.com/three-globe/example/img/earth-water.png",
  earthClouds: "/planets/earth_clouds.png",
};

// ─── Real texture URLs ────────────────────────────────────────────────────────
// Three.js CDN — equirectangular maps designed for sphere texturing, CORS-safe
const PLANET_TEX = {
  moon: "https://threejs.org/examples/textures/planets/moon_1024.jpg",
  mars: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/1024px-OSIRIS_Mars_true_color.jpg",
};

// ─── Procedural Sun texture — solar granulation ───────────────────────────────
function makeSunTexture(): THREE.CanvasTexture {
  const W = 2048, H = 1024;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d")!;

  // Base: equatorial yellow → polar orange-red gradient (limb-darkening simulation)
  const bg = ctx.createLinearGradient(0, 0, W, 0);
  bg.addColorStop(0,   "#c84800");
  bg.addColorStop(0.12,"#e86000");
  bg.addColorStop(0.30,"#ffaa10");
  bg.addColorStop(0.50,"#ffe060");
  bg.addColorStop(0.70,"#ffaa10");
  bg.addColorStop(0.88,"#e86000");
  bg.addColorStop(1,   "#c84800");
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  // Vertical limb darkening
  const vg = ctx.createLinearGradient(0, 0, 0, H);
  vg.addColorStop(0,    "rgba(120,40,0,0.55)");
  vg.addColorStop(0.15, "rgba(80,20,0,0.20)");
  vg.addColorStop(0.50, "rgba(0,0,0,0)");
  vg.addColorStop(0.85, "rgba(80,20,0,0.20)");
  vg.addColorStop(1,    "rgba(120,40,0,0.55)");
  ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);

  // Granulation — convection cells (each: bright yellow center, dark orange-red border)
  const rng = (n: number) => Math.sin(n * 127.1 + 311.7) * 0.5 + 0.5;
  const cellSize = 28;
  const cols = Math.ceil(W / cellSize) + 1;
  const rows = Math.ceil(H / cellSize) + 1;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const idx = row * cols + col;
      const jx = (rng(idx * 2.3) - 0.5) * cellSize * 0.9;
      const jy = (rng(idx * 5.7) - 0.5) * cellSize * 0.9;
      const x = col * cellSize + jx;
      const y = row * cellSize + jy;
      const r = cellSize * (0.45 + rng(idx * 3.1) * 0.35);
      const brightness = 180 + Math.floor(rng(idx * 7.3) * 60);
      const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
      grd.addColorStop(0,   `rgba(255,${brightness},${Math.floor(brightness*0.28)},0.72)`);
      grd.addColorStop(0.55,`rgba(240,${Math.floor(brightness*0.6)},20,0.38)`);
      grd.addColorStop(1,   `rgba(100,20,0,0.18)`);
      ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
  }

  // Sunspot groups (umbra dark + penumbra medium)
  const spots = [
    [0.18, 0.44, 22], [0.19, 0.47, 14],
    [0.55, 0.38, 28], [0.57, 0.42, 18], [0.58, 0.38, 11],
    [0.72, 0.56, 20], [0.73, 0.53, 13],
    [0.38, 0.60, 16], [0.40, 0.58, 10],
    [0.88, 0.45, 18],
  ];
  for (const [xf, yf, r] of spots) {
    const x = xf * W, y = yf * H;
    // Penumbra
    const pen = ctx.createRadialGradient(x, y, r * 0.5, x, y, r * 1.6);
    pen.addColorStop(0,   "rgba(50,15,0,0.0)");
    pen.addColorStop(0.4, "rgba(50,15,0,0.60)");
    pen.addColorStop(1,   "rgba(0,0,0,0)");
    ctx.fillStyle = pen; ctx.beginPath(); ctx.arc(x, y, r * 1.6, 0, Math.PI * 2); ctx.fill();
    // Umbra
    const umb = ctx.createRadialGradient(x, y, 0, x, y, r * 0.55);
    umb.addColorStop(0,   "rgba(20,5,0,0.92)");
    umb.addColorStop(1,   "rgba(50,15,0,0.70)");
    ctx.fillStyle = umb; ctx.beginPath(); ctx.arc(x, y, r * 0.55, 0, Math.PI * 2); ctx.fill();
  }

  // Bright faculae patches near sunspot groups
  for (let i = 0; i < 12; i++) {
    const x = rng(i * 11.3) * W, y = rng(i * 6.7) * H;
    const r = 15 + rng(i * 3.9) * 30;
    const fac = ctx.createRadialGradient(x, y, 0, x, y, r);
    fac.addColorStop(0, "rgba(255,240,180,0.18)");
    fac.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = fac; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }

  return new THREE.CanvasTexture(c);
}

// ─── Procedural Mars texture — detailed terrain ───────────────────────────────
function makeMarsTexture(): THREE.CanvasTexture {
  const W = 2048, H = 1024;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d")!;
  const rng = (n: number) => Math.sin(n * 127.1 + 311.7) * 0.5 + 0.5;

  // Southern highlands base (brighter ochre-rust)
  ctx.fillStyle = "#c06030"; ctx.fillRect(0, 0, W, H);

  // Color variation patches — geologic provinces
  const regions = [
    // Northern lowlands (darker, blue-grey tint) — top 40%
    { x: 0, y: 0, w: W, h: H * 0.40, color: "rgba(60,18,5,0.50)" },
    // Tharsis plateau — lighter, elevated (center-left band)
    { x: W*0.18, y: H*0.32, w: W*0.22, h: H*0.35, color: "rgba(220,120,60,0.28)" },
    // Arabia Terra — lighter highlands (center-right)
    { x: W*0.52, y: H*0.35, w: W*0.18, h: H*0.28, color: "rgba(200,105,50,0.22)" },
    // Hellas Basin — large dark oval (south-east)
    { x: W*0.68, y: H*0.62, w: W*0.14, h: H*0.16, color: "rgba(50,15,4,0.40)" },
    // Dust storm lighter streak (equatorial)
    { x: W*0.30, y: H*0.43, w: W*0.25, h: H*0.09, color: "rgba(210,150,90,0.18)" },
  ];

  for (const reg of regions) {
    const g = ctx.createLinearGradient(reg.x, reg.y, reg.x + reg.w, reg.y + reg.h);
    g.addColorStop(0,   "rgba(0,0,0,0)");
    g.addColorStop(0.3, reg.color);
    g.addColorStop(0.7, reg.color);
    g.addColorStop(1,   "rgba(0,0,0,0)");
    ctx.fillStyle = g; ctx.fillRect(reg.x - reg.w*0.2, reg.y - reg.h*0.2, reg.w*1.4, reg.h*1.4);
  }

  // Valles Marineris — long diagonal dark canyon system
  // Runs roughly lon 270°-350°, lat 0-15°S → x:0.74-0.97, y:0.48-0.58
  for (let seg = 0; seg < 18; seg++) {
    const t = seg / 17;
    const sx = (0.72 + t * 0.26) * W;
    const sy = (0.48 + t * 0.08 + rng(seg * 3.1) * 0.04) * H;
    const sr = (8 + rng(seg * 5.7) * 14) * (W / 1024);
    const vg = ctx.createRadialGradient(sx, sy, 0, sx, sy, sr * 2.5);
    vg.addColorStop(0,   "rgba(40,10,2,0.75)");
    vg.addColorStop(0.5, "rgba(55,15,4,0.45)");
    vg.addColorStop(1,   "rgba(0,0,0,0)");
    ctx.fillStyle = vg; ctx.beginPath(); ctx.arc(sx, sy, sr * 2.5, 0, Math.PI * 2); ctx.fill();
  }

  // Olympus Mons — slightly lighter circular bulge
  {
    const ox = 0.255 * W, oy = 0.45 * H;
    const omg = ctx.createRadialGradient(ox, oy, 0, ox, oy, W * 0.065);
    omg.addColorStop(0,   "rgba(230,130,70,0.45)");
    omg.addColorStop(0.4, "rgba(210,110,55,0.22)");
    omg.addColorStop(1,   "rgba(0,0,0,0)");
    ctx.fillStyle = omg; ctx.beginPath(); ctx.arc(ox, oy, W * 0.065, 0, Math.PI * 2); ctx.fill();
  }

  // Polar ice caps — white-cream with blue-grey tint
  for (const [yf, dir] of [[0, 1], [1, -1]] as [number, number][]) {
    const capH = H * 0.10;
    const cg = ctx.createLinearGradient(0, yf === 0 ? 0 : H - capH, 0, yf === 0 ? capH : H);
    cg.addColorStop(dir > 0 ? 0 : 1, "rgba(235,225,215,0.96)");
    cg.addColorStop(dir > 0 ? 1 : 0, "rgba(0,0,0,0)");
    ctx.fillStyle = cg;
    ctx.fillRect(0, yf === 0 ? 0 : H - capH, W, capH);
  }

  // Impact craters
  for (let i = 0; i < 100; i++) {
    const x = rng(i * 2.3 + 10) * W, y = rng(i * 4.7 + 20) * H;
    const r = 4 + rng(i * 3.1) * (i < 15 ? 50 : 20);
    const ci = ctx.createRadialGradient(x, y, 0, x, y, r);
    ci.addColorStop(0,    "rgba(55,15,4,0.70)");
    ci.addColorStop(0.65, "rgba(55,15,4,0.35)");
    ci.addColorStop(1,    "rgba(0,0,0,0)");
    ctx.fillStyle = ci; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    const rim = ctx.createRadialGradient(x, y, r * 0.78, x, y, r * 1.25);
    rim.addColorStop(0,   "rgba(0,0,0,0)");
    rim.addColorStop(0.5, "rgba(215,140,90,0.42)");
    rim.addColorStop(1,   "rgba(0,0,0,0)");
    ctx.fillStyle = rim; ctx.beginPath(); ctx.arc(x, y, r * 1.25, 0, Math.PI * 2); ctx.fill();
  }

  // Fine dust grain
  for (let i = 0; i < 2000; i++) {
    const x = Math.random() * W, y = Math.random() * H;
    const v = 160 + Math.floor(Math.random() * 50);
    ctx.fillStyle = `rgba(${v},${Math.floor(v*0.5)},${Math.floor(v*0.22)},${0.04+Math.random()*0.08})`;
    ctx.fillRect(x, y, 1, 1);
  }

  return new THREE.CanvasTexture(c);
}

const VERT = /* glsl */`
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPos;
  void main() {
    vUv     = uv;
    vNormal = normalize(normalMatrix * normal);
    vPos    = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const EARTH_FRAG = /* glsl */`
  uniform sampler2D uDay;
  uniform sampler2D uNight;
  uniform sampler2D uSpec;
  uniform vec3 uSun;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPos;
  void main() {
    vec3  N   = normalize(vNormal);
    vec3  L   = normalize(uSun);
    float NdL = dot(N, L);
    float t   = smoothstep(-0.10, 0.24, NdL);
    vec4  day   = texture2D(uDay,   vUv);
    vec4  night = texture2D(uNight, vUv);
    float sp    = texture2D(uSpec,  vUv).r;
    vec3  V     = normalize(cameraPosition - vPos);
    vec3  H     = normalize(L + V);
    float spec  = pow(max(dot(N, H), 0.0), 60.0) * sp * 0.80;
    vec4  col   = mix(night, day, t);
    col.rgb    += vec3(spec * 0.90, spec * 0.95, spec) * t;
    gl_FragColor = col;
  }
`;

const BODY_FRAG = /* glsl */`
  uniform sampler2D uTex;
  uniform vec3  uSun;
  uniform float uAmbient;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPos;
  void main() {
    vec3  N   = normalize(vNormal);
    float d   = max(dot(N, normalize(uSun)), 0.0);
    vec4  col = texture2D(uTex, vUv);
    col.rgb  *= uAmbient + d * (1.0 - uAmbient);
    gl_FragColor = col;
  }
`;

const SUN_FRAG = /* glsl */`
  uniform sampler2D uTex;
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPos;
  void main() {
    vec2 uv  = vUv;
    uv.x    += uTime * 0.007;
    vec4 col = texture2D(uTex, uv);
    vec3 V   = normalize(cameraPosition - vPos);
    float rim = pow(1.0 - max(dot(normalize(vNormal), V), 0.0), 2.6);
    col.rgb   = mix(col.rgb, vec3(1.0, 0.82, 0.32), rim * 0.42);
    gl_FragColor = col;
  }
`;

const ATM_VERT = /* glsl */`
  varying vec3 vN;
  varying vec3 vP;
  void main() {
    vN = normalize(normalMatrix * normal);
    vP = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const ATM_FRAG = /* glsl */`
  uniform vec3  uColor;
  uniform float uPow;
  uniform float uStr;
  uniform vec3  uSun;
  varying vec3 vN;
  varying vec3 vP;
  void main() {
    vec3  N   = normalize(vN);
    vec3  V   = normalize(cameraPosition - vP);
    float rim = pow(1.0 - max(dot(N, V), 0.0), uPow);
    float day = smoothstep(-0.4, 0.55, dot(N, normalize(uSun)));
    gl_FragColor = vec4(uColor, rim * uStr * (0.28 + day * 0.72));
  }
`;

const SUN_VEC = new THREE.Vector3(1.4, 0.5, 1.2).normalize();

function Atm({ r, sc, color, pow: p, str, sun = SUN_VEC }: {
  r: number; sc: number; color: number; pow: number; str: number; sun?: THREE.Vector3;
}) {
  const mat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uPow:   { value: p },
      uStr:   { value: str },
      uSun:   { value: sun },
    },
    vertexShader: ATM_VERT, fragmentShader: ATM_FRAG,
    transparent: true, depthWrite: false,
    blending: THREE.AdditiveBlending, side: THREE.BackSide,
  }), []);
  return (
    <mesh scale={sc}>
      <sphereGeometry args={[r, 48, 48]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

function PingRing({ pos, color }: { pos: [number, number, number]; color: string }) {
  const ring = useRef<THREE.Mesh>(null!);
  useFrame(s => {
    const sc = 1 + Math.sin(s.clock.elapsedTime * 2.8) * 0.55;
    ring.current.scale.setScalar(sc);
    (ring.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.75 - (sc - 1) * 1.5);
  });
  return (
    <group position={pos}>
      <mesh>
        <sphereGeometry args={[0.030, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={6} />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.046, 0.070, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.72} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  );
}

function Earth({ onGlobeClick }: { onGlobeClick?: (lat: number, lng: number) => void }) {
  const earthRef = useRef<THREE.Mesh>(null!);
  const cloudRef = useRef<THREE.Mesh>(null!);
  const satRef   = useRef<THREE.Group>(null!);
  const angle    = useRef(0);

  const [day, night, spec, clouds] = useLoader(THREE.TextureLoader, [
    TEXTURES.earthDay, TEXTURES.earthNight, TEXTURES.earthSpec, TEXTURES.earthClouds,
  ]);

  const mat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uDay: { value: day }, uNight: { value: night }, uSpec: { value: spec }, uSun: { value: SUN_VEC } },
    vertexShader: VERT, fragmentShader: EARTH_FRAG,
  }), [day, night, spec]);

  const orbitGeo = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 160; i++) {
      const a = (i / 160) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * 2.55, Math.sin(a) * 0.55, Math.sin(a) * 2.15));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  const aoiPos = useMemo((): [number, number, number] => {
    const la = (26.1 * Math.PI) / 180, lo = (91.7 * Math.PI) / 180, r = 1.84;
    return [r * Math.cos(la) * Math.sin(lo), r * Math.sin(la), r * Math.cos(la) * Math.cos(lo)];
  }, []);

  useFrame((_, dt) => {
    earthRef.current.rotation.y += dt * 0.05;
    cloudRef.current.rotation.y += dt * 0.07;
    angle.current += dt * 0.40;
    const a = angle.current;
    satRef.current.position.set(Math.cos(a) * 2.55, Math.sin(a) * 0.55, Math.sin(a) * 2.15);
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (!onGlobeClick || !earthRef.current) return;
    // Transform click point from world space to sphere-local space to get true lat/lng
    const localPoint = earthRef.current.worldToLocal(e.point.clone());
    const r = localPoint.length();
    const lat = (Math.asin(localPoint.y / r) * 180) / Math.PI;
    const lng = (Math.atan2(localPoint.x, localPoint.z) * 180) / Math.PI;
    
    // Pass coordinates but ensure they are within standard bounds
    onGlobeClick(parseFloat(lat.toFixed(4)), parseFloat(lng.toFixed(4)));
  };

  return (
    <group>
      <mesh 
        ref={earthRef} 
        onClick={handleClick} 
        onPointerOver={() => { document.body.style.cursor = "crosshair"; }} 
        onPointerOut={() => { document.body.style.cursor = "auto"; }}
      >
        <sphereGeometry args={[1.8, 96, 96]} />
        <primitive object={mat} attach="material" />
      </mesh>
      <mesh ref={cloudRef}>
        <sphereGeometry args={[1.835, 64, 64]} />
        <meshPhongMaterial alphaMap={clouds} transparent opacity={0.28} color="#fff" depthWrite={false} shininess={0} />
      </mesh>
      {/* @ts-ignore – three-fiber 'line' is a Three.js primitive, not SVGLineElement */}
      <line geometry={orbitGeo}>
        <lineBasicMaterial color="#60a5fa" transparent opacity={0.18} />
      </line>
      <group ref={satRef} scale={0.046}>
        <mesh><boxGeometry args={[1.6, 0.9, 0.9]} /><meshStandardMaterial color="#c8cdd6" metalness={0.88} roughness={0.18} /></mesh>
        {([-1, 1] as const).map(s => (
          <group key={s} position={[s * 2.2, 0, 0]}>
            <mesh><boxGeometry args={[2.4, 0.72, 0.05]} /><meshStandardMaterial color="#1a3a72" emissive={new THREE.Color(0x0a1e48)} emissiveIntensity={0.55} metalness={0.5} roughness={0.3} /></mesh>
          </group>
        ))}
        <mesh><sphereGeometry args={[0.22, 8, 8]} /><meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={5} /></mesh>
        <pointLight color="#60a5fa" intensity={0.7} distance={2.5} />
      </group>
      <PingRing pos={aoiPos} color="#ef4444" />
    </group>
  );
}

function Moon() {
  const ref = useRef<THREE.Mesh>(null!);
  // Real NASA photo-texture from Three.js CDN (equirectangular, CORS-safe)
  const [tex] = useLoader(THREE.TextureLoader, [PLANET_TEX.moon]);
  const mat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uTex: { value: tex }, uSun: { value: SUN_VEC }, uAmbient: { value: 0.022 } },
    vertexShader: VERT, fragmentShader: BODY_FRAG,
  }), [tex]);
  useFrame((_, dt) => { ref.current.rotation.y += dt * 0.025; });
  const ch3Pos = useMemo((): [number, number, number] => {
    const la = (-70 * Math.PI) / 180, r = 1.84;
    return [0, r * Math.sin(la), r * Math.cos(la)];
  }, []);

  return (
    <group>
      <mesh ref={ref}><sphereGeometry args={[1.8, 96, 96]} /><primitive object={mat} attach="material" /></mesh>
      <PingRing pos={ch3Pos} color="#c4b5fd" />
    </group>
  );
}

function Mars() {
  const ref = useRef<THREE.Mesh>(null!);
  const tex = useMemo(() => makeMarsTexture(), []);
  const mat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uTex: { value: tex }, uSun: { value: SUN_VEC }, uAmbient: { value: 0.05 } },
    vertexShader: VERT, fragmentShader: BODY_FRAG,
  }), [tex]);
  useFrame((_, dt) => { ref.current.rotation.y += dt * 0.045; });
  const olympusPos = useMemo((): [number, number, number] => {
    const la = (18.65 * Math.PI) / 180, lo = (226.2 * Math.PI) / 180, r = 1.84;
    return [r * Math.cos(la) * Math.sin(lo), r * Math.sin(la), r * Math.cos(la) * Math.cos(lo)];
  }, []);

  return (
    <group>
      <mesh ref={ref}><sphereGeometry args={[1.8, 96, 96]} /><primitive object={mat} attach="material" /></mesh>
      <PingRing pos={olympusPos} color="#fb923c" />
    </group>
  );
}

const SUN_ATM_VERT = /* glsl */`
  varying vec3 vN;
  varying vec3 vP;
  void main() {
    vN = normalize(normalMatrix * normal);
    vP = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const SUN_ATM_FRAG = /* glsl */`
  uniform vec3  uColor;
  uniform float uPow;
  uniform float uStr;
  varying vec3 vN;
  varying vec3 vP;
  void main() {
    vec3  N   = normalize(vN);
    vec3  V   = normalize(cameraPosition - vP);
    float rim = pow(1.0 - max(dot(N, V), 0.0), uPow);
    gl_FragColor = vec4(uColor, rim * uStr);
  }
`;

function Sun() {
  const ref    = useRef<THREE.Mesh>(null!);
  const corona = useRef<THREE.Mesh>(null!);
  const tex    = useMemo(() => makeSunTexture(), []);
  const mat    = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uTex: { value: tex }, uTime: { value: 0 } },
    vertexShader: VERT, fragmentShader: SUN_FRAG,
  }), [tex]);
  const corMat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color(0xffcc22) }, uPow: { value: 2.1 }, uStr: { value: 2.0 } },
    vertexShader: SUN_ATM_VERT, fragmentShader: SUN_ATM_FRAG,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.BackSide,
  }), []);
  useFrame((s, dt) => {
    ref.current.rotation.y += dt * 0.018;
    mat.uniforms.uTime.value = s.clock.elapsedTime;
    corona.current.scale.setScalar(1.28 + Math.sin(s.clock.elapsedTime * 0.7) * 0.04);
  });

  return (
    <group>
      <mesh scale={1.65}><sphereGeometry args={[1.8,16,16]} /><meshBasicMaterial color="#ff9900" transparent opacity={0.03} depthWrite={false} blending={THREE.AdditiveBlending} /></mesh>
      <mesh scale={1.45}><sphereGeometry args={[1.8,16,16]} /><meshBasicMaterial color="#ffbb00" transparent opacity={0.05} depthWrite={false} blending={THREE.AdditiveBlending} /></mesh>
      <mesh ref={corona} scale={1.28}><sphereGeometry args={[1.8,48,48]} /><primitive object={corMat} attach="material" /></mesh>
      <mesh ref={ref}><sphereGeometry args={[1.8,96,96]} /><primitive object={mat} attach="material" /></mesh>
      <pointLight color="#ffe090" intensity={4} distance={14} decay={1.5} />
    </group>
  );
}

function MilkyWay() {
  const skyRef  = useRef<THREE.Mesh>(null!);
  const diskRef = useRef<THREE.Group>(null!);

  // Equirectangular galaxy skybox — what you see looking outward from inside the Milky Way
  const skyTex = useMemo(() => {
    const W = 2048, H = 1024;
    const c = document.createElement("canvas");
    c.width = W; c.height = H;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, H);

    // Galactic band — dense bright strip across the equator (y ≈ H/2)
    const band = ctx.createLinearGradient(0, H * 0.28, 0, H * 0.72);
    band.addColorStop(0,    "rgba(0,0,0,0)");
    band.addColorStop(0.25, "rgba(40,30,60,0.55)");
    band.addColorStop(0.42, "rgba(110,80,160,0.72)");
    band.addColorStop(0.50, "rgba(160,120,200,0.80)");
    band.addColorStop(0.58, "rgba(110,80,160,0.72)");
    band.addColorStop(0.75, "rgba(40,30,60,0.55)");
    band.addColorStop(1,    "rgba(0,0,0,0)");
    ctx.fillStyle = band; ctx.fillRect(0, 0, W, H);

    // Galactic core — bright warm bulge (center of image)
    const core = ctx.createRadialGradient(W*0.5, H*0.5, 0, W*0.5, H*0.5, W*0.22);
    core.addColorStop(0,    "rgba(255,240,200,0.98)");
    core.addColorStop(0.06, "rgba(255,220,160,0.92)");
    core.addColorStop(0.18, "rgba(220,160,100,0.70)");
    core.addColorStop(0.40, "rgba(140,90,180,0.38)");
    core.addColorStop(0.70, "rgba(60,35,100,0.18)");
    core.addColorStop(1,    "rgba(0,0,0,0)");
    ctx.fillStyle = core; ctx.fillRect(0, 0, W, H);

    // Dust lanes — dark obscuring regions crossing the band
    const dustLanes = [
      { x: W*0.46, y: H*0.48, rx: W*0.16, ry: H*0.035, rot: 0.08, alpha: 0.62 },
      { x: W*0.54, y: H*0.52, rx: W*0.12, ry: H*0.025, rot: -0.05, alpha: 0.50 },
      { x: W*0.30, y: H*0.50, rx: W*0.10, ry: H*0.030, rot: 0.12, alpha: 0.42 },
      { x: W*0.72, y: H*0.49, rx: W*0.09, ry: H*0.022, rot: -0.08, alpha: 0.38 },
    ];
    for (const d of dustLanes) {
      ctx.save();
      ctx.translate(d.x, d.y);
      ctx.rotate(d.rot);
      const dg = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(d.rx, d.ry));
      dg.addColorStop(0,   `rgba(0,0,0,${d.alpha})`);
      dg.addColorStop(0.6, `rgba(0,0,0,${d.alpha * 0.5})`);
      dg.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = dg;
      ctx.beginPath(); ctx.ellipse(0, 0, d.rx, d.ry, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }

    // Emission nebulae (reddish-pink H-alpha patches)
    const nebulae = [
      { x: W*0.62, y: H*0.44, r: W*0.055, color: "rgba(200,80,80,0.28)" },
      { x: W*0.38, y: H*0.54, r: W*0.045, color: "rgba(180,60,100,0.22)" },
      { x: W*0.78, y: H*0.52, r: W*0.038, color: "rgba(160,70,120,0.20)" },
      { x: W*0.22, y: H*0.48, r: W*0.032, color: "rgba(100,140,200,0.18)" },
      { x: W*0.55, y: H*0.56, r: W*0.028, color: "rgba(80,160,180,0.16)" },
    ];
    for (const n of nebulae) {
      const ng = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 1.8);
      ng.addColorStop(0,   n.color);
      ng.addColorStop(0.5, n.color.replace(/[\d.]+\)$/, "0.10)"));
      ng.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = ng;
      ctx.beginPath(); ctx.ellipse(n.x, n.y, n.r * 1.8, n.r, 0.2, 0, Math.PI * 2); ctx.fill();
    }

    // Dense star field — color-varied (blue hot stars, white average, orange/red cool)
    const rng = (n: number) => Math.sin(n * 127.1 + 311.7) * 0.5 + 0.5;
    const starColors = ["#ffffff","#cce0ff","#ffe8cc","#ffccaa","#aaccff","#fff5dd","#ffd0a0"];
    for (let i = 0; i < 8000; i++) {
      // Concentrate more stars near the galactic band
      const bandBias = 0.5 + (Math.random() - 0.5) * (Math.random() < 0.55 ? 0.32 : 1.0);
      const x = Math.random() * W;
      const y = Math.min(1, Math.max(0, bandBias)) * H;
      const sz = Math.random() < 0.02 ? 1.8 : Math.random() < 0.12 ? 1.1 : 0.5;
      const alpha = 0.4 + Math.random() * 0.6;
      const col = starColors[Math.floor(rng(i * 3.7) * starColors.length)];
      ctx.globalAlpha = alpha;
      ctx.fillStyle = col;
      ctx.beginPath(); ctx.arc(x, y, sz, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;

    return new THREE.CanvasTexture(c);
  }, []);

  // Slowly rotating star disk in 3D for depth parallax
  const starGeo = useMemo(() => {
    const pos: number[] = [], col: number[] = [];
    const colors = [[1,.95,.9],[.75,.87,1],[1,.85,.6],[.9,.75,1],[1,1,1]];
    for (let i = 0; i < 2200; i++) {
      const r = 3 + Math.pow(Math.random(), 0.5) * 8;
      const t = Math.random() * Math.PI * 2;
      const h = (Math.random() - 0.5) * (r * 0.22);
      pos.push(r * Math.cos(t), h, r * Math.sin(t));
      const [cr, cg, cb] = colors[Math.floor(Math.random() * colors.length)];
      const br = 0.5 + Math.random() * 0.5;
      col.push(cr * br, cg * br, cb * br);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("color",    new THREE.Float32BufferAttribute(col, 3));
    return g;
  }, []);

  useFrame((_, dt) => { diskRef.current.rotation.y += dt * 0.018; });

  return (
    <group>
      {/* Skybox sphere — galaxy viewed from inside */}
      <mesh ref={skyRef} scale={-1}>
        <sphereGeometry args={[18, 64, 64]} />
        <meshBasicMaterial map={skyTex} side={THREE.BackSide} />
      </mesh>

      {/* 3D star disk for depth */}
      <group ref={diskRef}>
        <points geometry={starGeo}>
          <pointsMaterial vertexColors size={0.025} sizeAttenuation transparent opacity={0.85} />
        </points>
      </group>

      {/* Galactic core central glow */}
      <mesh>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshStandardMaterial color="#fff8e0" emissive="#ffe080" emissiveIntensity={5} transparent opacity={0.90} />
      </mesh>
      <pointLight color="#ffdd88" intensity={3.5} distance={8} decay={2} />

      {/* Galactic plane haze */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 6, 64]} />
        <meshBasicMaterial color="#9060d0" transparent opacity={0.06} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

const BG:  Record<SpaceBodyKey, string>                 = { earth:"#050d1a", moon:"#060608", mars:"#0d0402", sun:"#0c0900", milky:"#020208" };
const CAM: Record<SpaceBodyKey, [number,number,number]> = { earth:[0,0.6,5.2], moon:[0,0.3,5.0], mars:[0,0.3,5.0], sun:[0,0,5.5], milky:[0,2.8,6.5] };

const TABS: { key: SpaceBodyKey; label: string; icon: string; accent: string }[] = [
  { key: "earth", label: "Earth",   icon: "🌍", accent: "#60a5fa" },
  { key: "moon",  label: "Moon",    icon: "🌕", accent: "#a3a3b4" },
  { key: "mars",  label: "Mars",    icon: "🔴", accent: "#fb923c" },
  { key: "sun",   label: "Sun",     icon: "☀️",  accent: "#fbbf24" },
  { key: "milky", label: "Galaxy",  icon: "🌌", accent: "#c4b5fd" },
];

function SceneContent({ body, onGlobeClick }: { body: SpaceBodyKey; onGlobeClick?: (lat: number, lng: number) => void }) {
  const isSun = body === "sun";
  return (
    <>
      <ambientLight intensity={isSun ? 0.65 : 0.04} />
      {!isSun && <directionalLight position={[8,3,6]} intensity={2.4} color="#fff8f0" />}
      <Stars radius={85} depth={45} count={body==="milky"?800:4500} factor={3.2} saturation={0} fade speed={0.4} />
      <Suspense fallback={null}>
        {body==="earth" && <Earth onGlobeClick={onGlobeClick} />}
        {body==="moon"  && <Moon />}
        {body==="mars"  && <Mars />}
        {body==="sun"   && <Sun />}
        {body==="milky" && <MilkyWay />}
      </Suspense>
      <OrbitControls enableZoom enablePan={false} enableDamping dampingFactor={0.07}
        autoRotate={body==="milky"} autoRotateSpeed={0.25} />
    </>
  );
}
export function MonitoringScene({ body: externalBody = "earth", onBodyChange, onGlobeClick, hideUI = false }: { body?: SpaceBodyKey; onBodyChange?: (b: SpaceBodyKey) => void; onGlobeClick?: (lat: number, lng: number) => void; hideUI?: boolean }) {
  const [body, setBody] = useState<SpaceBodyKey>(externalBody);

  // Sync when parent drives the prop (e.g. left sidebar buttons)
  useEffect(() => { setBody(externalBody); }, [externalBody]);

  const handleSwitch = (b: SpaceBodyKey) => { setBody(b); onBodyChange?.(b); };
  const accent = TABS.find(t => t.key === body)?.accent ?? "#60a5fa";

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Canvas
        key={body}
        camera={{ position: CAM[body], fov: 44 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.15 }}
        style={{ width: "100%", height: "100%", background: BG[body], cursor: body === "earth" ? "crosshair" : "grab" }}
      >
        <SceneContent body={body} onGlobeClick={body === "earth" ? onGlobeClick : undefined} />
      </Canvas>

      {/* ── Tab switcher ─────────────────────────────────────────────────── */}
      {!hideUI && (
        <div style={{
          position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
          display: "flex", gap: 8,
          background: "rgba(5,10,20,0.72)", backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: 40, padding: "6px 10px",
          boxShadow: `0 0 24px 0 ${accent}33`,
        }}>
          {TABS.map(tab => {
            const active = tab.key === body;
            return (
              <button
                key={tab.key}
                onClick={() => handleSwitch(tab.key)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "7px 16px", borderRadius: 30, border: "none", cursor: "pointer",
                  fontFamily: "system-ui, sans-serif", fontSize: 13, fontWeight: active ? 600 : 400,
                  letterSpacing: "0.02em",
                  background: active ? `${tab.accent}22` : "transparent",
                  color: active ? tab.accent : "rgba(255,255,255,0.45)",
                  boxShadow: active ? `0 0 0 1px ${tab.accent}55` : "none",
                  transition: "all 0.18s ease",
                }}
              >
                <span style={{ fontSize: 15 }}>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* ── Body label ───────────────────────────────────────────────────── */}
      {!hideUI && (
        <div style={{
          position: "absolute", top: 22, left: 28,
          fontFamily: "system-ui, sans-serif", color: "rgba(255,255,255,0.55)", fontSize: 11,
          letterSpacing: "0.12em", textTransform: "uppercase",
          background: "rgba(5,10,20,0.55)", backdropFilter: "blur(8px)",
          padding: "4px 12px", borderRadius: 20,
          border: "1px solid rgba(255,255,255,0.08)",
        }}>
          Live Monitor · {TABS.find(t=>t.key===body)?.label}
        </div>
      )}
    </div>
  );
}

export default function Preview() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MonitoringScene />
    </div>
  );
}
