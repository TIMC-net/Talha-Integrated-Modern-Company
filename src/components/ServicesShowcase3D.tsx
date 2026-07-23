"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useCursor } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  Cog,
  Layers,
  Package,
  Truck,
  Users,
} from "lucide-react";
import {
  Component,
  type PointerEvent as ReactPointerEvent,
  type ReactElement,
  type ReactNode,
  type RefObject,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";

const ACCENT = "#f2740b";
const NAVY_BASE = "#34383b";
const NAVY_EDGE = "#202226";

type DivisionKey =
  | "scaffolding"
  | "manpower"
  | "civil"
  | "mechanical"
  | "materials"
  | "equipment";

type Division = {
  key: DivisionKey;
  label: string;
  href: string;
  Icon: typeof Layers;
};

const divisions: Division[] = [
  { key: "scaffolding", label: "Scaffolding", href: "/services/scaffolding", Icon: Layers },
  { key: "manpower", label: "Manpower Supply", href: "/services/manpower", Icon: Users },
  { key: "civil", label: "Civil Division", href: "/services/civil", Icon: Building2 },
  { key: "mechanical", label: "Mechanical Division", href: "/services/mechanical", Icon: Cog },
  { key: "materials", label: "Materials Supply", href: "/services/materials", Icon: Package },
  { key: "equipment", label: "Equipment Rental", href: "/services/equipment", Icon: Truck },
];

/* ---------------------------------------------------------------- */
/* Shape geometry per division — built from primitives, no assets    */
/* ---------------------------------------------------------------- */

function ScaffoldingShape() {
  return (
    <group>
      <mesh>
        <boxGeometry args={[1.3, 1.6, 1.3]} />
        <meshStandardMaterial color={NAVY_EDGE} wireframe />
      </mesh>
      {[
        [-0.5, 0, 0, Math.PI / 4],
        [0.5, 0, 0, -Math.PI / 4],
      ].map(([x, y, z, rz], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[0, 0, rz]}>
          <cylinderGeometry args={[0.025, 0.025, 1.9, 6]} />
          <meshStandardMaterial
            color={ACCENT}
            emissive={ACCENT}
            emissiveIntensity={0.4}
            metalness={0.6}
            roughness={0.25}
          />
        </mesh>
      ))}
    </group>
  );
}

function ManpowerShape() {
  const nodes: [number, number, number][] = [
    [0, 0.55, 0],
    [-0.55, -0.15, 0.2],
    [0.55, -0.1, -0.15],
    [0, -0.6, 0.3],
    [0.2, 0.15, -0.4],
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [0, 4],
    [1, 3],
    [2, 3],
    [1, 4],
  ];

  return (
    <group>
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <icosahedronGeometry args={[0.14, 0]} />
          <meshStandardMaterial
            color={ACCENT}
            emissive={ACCENT}
            emissiveIntensity={0.35}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
      ))}
      {edges.map(([a, b], i) => {
        const start = new THREE.Vector3(...nodes[a]);
        const end = new THREE.Vector3(...nodes[b]);
        const mid = start.clone().add(end).multiplyScalar(0.5);
        const dir = end.clone().sub(start);
        const len = dir.length();
        const quaternion = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.clone().normalize()
        );
        return (
          <mesh key={i} position={mid} quaternion={quaternion}>
            <cylinderGeometry args={[0.015, 0.015, len, 5]} />
            <meshStandardMaterial color={NAVY_BASE} metalness={0.7} roughness={0.35} />
          </mesh>
        );
      })}
    </group>
  );
}

function CivilShape() {
  const tiers: [number, number, number][] = [
    [0.9, 0.32, 0.9],
    [0.68, 0.32, 0.68],
    [0.5, 0.32, 0.5],
    [0.32, 0.32, 0.32],
  ];

  return (
    <group position={[0, -0.5, 0]}>
      {tiers.map(([w, h, d], i) => (
        <mesh key={i} position={[0, h * (i + 0.5), 0]}>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? NAVY_BASE : NAVY_EDGE}
            emissive={ACCENT}
            emissiveIntensity={0.06}
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

function MechanicalShape() {
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.55, 0.11, 8, 20]} />
        <meshStandardMaterial
          color={NAVY_BASE}
          emissive={ACCENT}
          emissiveIntensity={0.15}
          metalness={0.65}
          roughness={0.22}
        />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} position={[0.35, 0, 0]}>
        <torusGeometry args={[0.35, 0.09, 8, 20]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={0.4}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

function MaterialsShape() {
  const crates: [number, number, number][] = [
    [-0.28, -0.45, 0.1],
    [0.3, -0.45, -0.1],
    [0, -0.05, 0],
    [-0.05, 0.4, 0.05],
  ];

  return (
    <group>
      {crates.map((pos, i) => (
        <mesh key={i} position={pos} rotation={[0, i * 0.3, 0]}>
          <boxGeometry args={[0.62, 0.34, 0.62]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? NAVY_BASE : NAVY_EDGE}
            emissive={ACCENT}
            emissiveIntensity={0.08}
            metalness={0.3}
            roughness={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

function EquipmentShape() {
  return (
    <group position={[0, -0.3, 0]}>
      {/* mast */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.12, 1.5, 0.12]} />
        <meshStandardMaterial color={NAVY_BASE} metalness={0.6} roughness={0.3} />
      </mesh>
      {/* jib arm */}
      <mesh position={[0.55, 0.9, 0]}>
        <boxGeometry args={[1.3, 0.08, 0.08]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={0.35}
          metalness={0.55}
          roughness={0.25}
        />
      </mesh>
      {/* counterweight */}
      <mesh position={[-0.35, 0.85, 0]}>
        <boxGeometry args={[0.22, 0.16, 0.16]} />
        <meshStandardMaterial color={NAVY_EDGE} metalness={0.6} roughness={0.3} />
      </mesh>
      {/* cable + hook */}
      <mesh position={[1.05, 0.55, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.7, 5]} />
        <meshStandardMaterial color={NAVY_EDGE} metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[1.05, 0.18, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={0.4}
          metalness={0.55}
          roughness={0.25}
        />
      </mesh>
    </group>
  );
}

const shapeByKey: Record<DivisionKey, () => ReactElement> = {
  scaffolding: ScaffoldingShape,
  manpower: ManpowerShape,
  civil: CivilShape,
  mechanical: MechanicalShape,
  materials: MaterialsShape,
  equipment: EquipmentShape,
};

/* ---------------------------------------------------------------- */
/* Individual interactive instance                                   */
/* ---------------------------------------------------------------- */

function DivisionInstance({
  division,
  position,
  spinSpeed,
  floatPhase,
  reduceMotion,
  baseScale = 1,
  interaction,
}: {
  division: Division;
  position: [number, number, number];
  spinSpeed: number;
  floatPhase: number;
  reduceMotion: boolean;
  baseScale?: number;
  interaction: RefObject<InteractionState>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  useCursor(hovered);

  const Shape = shapeByKey[division.key];
  const baseY = position[1];

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    if (!reduceMotion) {
      groupRef.current.rotation.y += delta * spinSpeed;
      groupRef.current.position.y =
        baseY + Math.sin(state.clock.elapsedTime * 0.8 + floatPhase) * 0.08;
    }
    const targetScale = (hovered ? 1.12 : 1) * baseScale;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.15
    );
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => {
        if (interaction.current.wasDragged) return;
        router.push(division.href);
      }}
    >
      <Shape />
      <Html center position={[0, -1.15, 0]} occlude={false} style={{ pointerEvents: "auto" }}>
        <Link
          href={division.href}
          className={`block w-max font-display text-[11px] font-bold tracking-[1.5px] whitespace-nowrap uppercase transition-colors ${
            hovered ? "text-accent" : "text-ink/70"
          }`}
        >
          {division.label}
        </Link>
      </Html>
    </group>
  );
}

/* ---------------------------------------------------------------- */
/* Ambient dust particles — subtle depth/atmosphere behind the shapes */
/* ---------------------------------------------------------------- */

function createDustPositions() {
  const count = 240;
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    arr[i * 3] = (Math.random() - 0.5) * 18;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 9;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 7 - 2.5;
  }
  return arr;
}

const DUST_POSITIONS = createDustPositions();

function DustField({ reduceMotion }: { reduceMotion: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = DUST_POSITIONS;

  useFrame((state) => {
    if (!pointsRef.current || reduceMotion) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.012;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={ACCENT}
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.32}
        depthWrite={false}
      />
    </points>
  );
}

/* ---------------------------------------------------------------- */
/* Scene root — layout, camera parallax, lighting                    */
/* ---------------------------------------------------------------- */

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return isMobile;
}

function SceneContents({
  reduceMotion,
  interaction,
}: {
  reduceMotion: boolean;
  interaction: RefObject<InteractionState>;
}) {
  const isMobile = useIsMobile();
  const rootRef = useRef<THREE.Group>(null);

  const positions = useMemo<[number, number, number][]>(() => {
    if (isMobile) {
      const xs = [-1.6, 1.6];
      const ys = [1.9, 0, -1.9];
      return divisions.map((_, i) => [xs[i % 2], ys[Math.floor(i / 2)], 0]);
    }
    const spacing = 2.5;
    const start = -((divisions.length - 1) * spacing) / 2;
    return divisions.map((_, i) => [start + i * spacing, 0, 0]);
  }, [isMobile]);

  useFrame((state) => {
    if (!rootRef.current || reduceMotion) return;
    const { x: dragX, y: dragY } = interaction.current.dragRotation;
    const targetY = state.pointer.x * 0.15 + dragY;
    const targetX = -state.pointer.y * 0.08 + dragX;
    rootRef.current.rotation.y = THREE.MathUtils.lerp(
      rootRef.current.rotation.y,
      targetY,
      0.08
    );
    rootRef.current.rotation.x = THREE.MathUtils.lerp(
      rootRef.current.rotation.x,
      targetX,
      0.08
    );
  });

  return (
    <>
      <DustField reduceMotion={reduceMotion} />
      <group ref={rootRef}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 5, 6]} intensity={0.9} />
        <directionalLight position={[-5, 2, -6]} intensity={0.4} color="#aab0b4" />
        <pointLight position={[-4, -2, 3]} color={ACCENT} intensity={12} />
        <pointLight position={[0, -3, -4]} color="#aab0b4" intensity={6} />
        {divisions.map((division, i) => (
          <DivisionInstance
            key={division.key}
            division={division}
            position={positions[i]}
            spinSpeed={0.25 + (i % 3) * 0.08}
            floatPhase={i * 1.1}
            reduceMotion={reduceMotion}
            baseScale={isMobile ? 0.78 : 1}
            interaction={interaction}
          />
        ))}
      </group>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Static fallback (WebGL unavailable / render error)                */
/* ---------------------------------------------------------------- */

function StaticFallbackGrid() {
  return (
    <div className="grid grid-cols-2 gap-6 py-16 sm:grid-cols-3 md:grid-cols-6">
      {divisions.map(({ key, label, href, Icon }) => (
        <Link
          key={key}
          href={href}
          className="group flex flex-col items-center gap-3 text-center"
        >
          <span className="flex h-14 w-14 items-center justify-center border border-border-soft text-accent transition group-hover:border-accent">
            <Icon className="h-6 w-6" />
          </span>
          <span className="font-display text-[11px] font-bold tracking-[1.5px] text-ink/70 uppercase transition group-hover:text-accent">
            {label}
          </span>
        </Link>
      ))}
    </div>
  );
}

type InteractionState = {
  dragRotation: { x: number; y: number };
  wasDragged: boolean;
};

class Canvas3DErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return <StaticFallbackGrid />;
    return this.props.children;
  }
}

/* ---------------------------------------------------------------- */
/* Public component                                                  */
/* ---------------------------------------------------------------- */

const DRAG_THRESHOLD = 4;

export default function ServicesShowcase3D() {
  const reduceMotion = Boolean(useReducedMotion());
  const interaction = useRef<InteractionState>({
    dragRotation: { x: 0, y: 0 },
    wasDragged: false,
  });
  const pointerState = useRef({ dragging: false, lastX: 0, lastY: 0, travelled: 0 });

  // The canvas is mounted well after initial page load (lazy import), so
  // react-three-fiber's own resize observer sometimes never gets its first
  // measurement tick. Nudge it once the canvas has had a chance to exist.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      window.dispatchEvent(new Event("resize"));
    });
    const timeout = window.setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 250);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
    };
  }, []);

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    pointerState.current = {
      dragging: true,
      lastX: e.clientX,
      lastY: e.clientY,
      travelled: 0,
    };
    interaction.current.wasDragged = false;
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointerState.current.dragging) return;
    const dx = e.clientX - pointerState.current.lastX;
    const dy = e.clientY - pointerState.current.lastY;
    pointerState.current.lastX = e.clientX;
    pointerState.current.lastY = e.clientY;
    pointerState.current.travelled += Math.abs(dx) + Math.abs(dy);
    if (pointerState.current.travelled > DRAG_THRESHOLD) {
      interaction.current.wasDragged = true;
    }
    interaction.current.dragRotation = {
      y: interaction.current.dragRotation.y + dx * 0.006,
      x: Math.min(0.5, Math.max(-0.5, interaction.current.dragRotation.x - dy * 0.004)),
    };
  };

  const endDrag = () => {
    pointerState.current.dragging = false;
  };

  return (
    <div className="relative h-[300px] w-full overflow-hidden bg-white md:h-[340px]">
      <div
        className="absolute inset-x-0 top-1/2 h-[420px] -translate-y-1/2 touch-none select-none active:cursor-grabbing md:h-[480px]"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
      >
        <Canvas3DErrorBoundary>
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0.4, 9.5], fov: 38 }}
            gl={{ antialias: true, alpha: false }}
          >
            <color attach="background" args={["#ffffff"]} />
            <Suspense fallback={null}>
              <SceneContents reduceMotion={reduceMotion} interaction={interaction} />
            </Suspense>
          </Canvas>
        </Canvas3DErrorBoundary>
      </div>
    </div>
  );
}
