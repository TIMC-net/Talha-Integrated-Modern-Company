"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Html, useCursor } from "@react-three/drei";
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

const ACCENT = "#ff7f04";
const NAVY_BASE = "#34383b";
const NAVY_EDGE = "#202226";
const BROWN = "#b98d5e";
const BROWN_DARK = "#8a5a34";
const BROWN_LIGHT = "#d9b48a";
const EDGE_LINE = "#6b4226";

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

// The crane's mast is much taller than every other shape. In the mobile
// 2-column x 3-row grid that extra height pokes into the row above it, so it
// gets scaled down further than its neighbors specifically on mobile.
const MOBILE_SCALE: Partial<Record<DivisionKey, number>> = {
  equipment: 0.55,
};

/* ---------------------------------------------------------------- */
/* Shape geometry per division — built from primitives, no assets    */
/* ---------------------------------------------------------------- */

function ScaffoldingShape() {
  const couplers: [number, number, number][] = [
    [-0.65, 0, -0.65],
    [0.65, 0, -0.65],
    [-0.65, 0, 0.65],
    [0.65, 0, 0.65],
  ];

  return (
    <group>
      <mesh>
        <boxGeometry args={[1.3, 1.6, 1.3]} />
        <meshStandardMaterial color={NAVY_EDGE} wireframe />
      </mesh>
      {/* horizontal cross-brace */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 1.3, 6]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={0.3}
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>
      {/* coupler clamps at the mid-height joints */}
      {couplers.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshStandardMaterial
            color={ACCENT}
            emissive={ACCENT}
            emissiveIntensity={0.3}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
      ))}
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
          <icosahedronGeometry args={[0.14, 1]} />
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
  const windowGrid: [number, number][] = [
    [-0.2, 0],
    [0.2, 0],
    [-0.2, 1],
    [0.2, 1],
    [-0.2, 2],
    [0.2, 2],
  ];

  return (
    <group position={[0, -0.55, 0]}>
      {/* foundation slab */}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[1.1, 0.12, 0.85]} />
        <meshStandardMaterial color={BROWN_DARK} metalness={0.2} roughness={0.7} />
        <Edges color={EDGE_LINE} threshold={15} />
      </mesh>
      {/* building body */}
      <mesh position={[0, 0.68, 0]}>
        <boxGeometry args={[0.8, 1, 0.6]} />
        <meshStandardMaterial color={BROWN} metalness={0.2} roughness={0.6} />
        <Edges color={EDGE_LINE} threshold={15} />
      </mesh>
      {/* roof cap */}
      <mesh position={[0, 1.24, 0]}>
        <boxGeometry args={[0.9, 0.1, 0.7]} />
        <meshStandardMaterial color={BROWN_DARK} metalness={0.2} roughness={0.7} />
        <Edges color={EDGE_LINE} threshold={15} />
      </mesh>
      {/* glowing window grid — reads instantly as "building" */}
      {windowGrid.map(([x, row]) => (
        <mesh key={`${x}-${row}`} position={[x, 0.32 + row * 0.3, 0.31]}>
          <boxGeometry args={[0.15, 0.17, 0.02]} />
          <meshStandardMaterial
            color={ACCENT}
            emissive={ACCENT}
            emissiveIntensity={0.5}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>
      ))}
      {/* entrance door + frame */}
      <mesh position={[0, 0.335, 0.315]}>
        <boxGeometry args={[0.2, 0.33, 0.015]} />
        <meshStandardMaterial color={EDGE_LINE} metalness={0.3} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.335, 0.318]}>
        <boxGeometry args={[0.03, 0.06, 0.01]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={0.4}
          metalness={0.5}
          roughness={0.25}
        />
      </mesh>
    </group>
  );
}

function MechanicalShape() {
  const boltCount = 6;
  const boltRadius = 0.55;

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
      {/* bolt heads ringing the flange */}
      {Array.from({ length: boltCount }).map((_, i) => {
        const angle = (i / boltCount) * Math.PI * 2;
        return (
          <mesh
            key={i}
            rotation={[Math.PI / 2, 0, 0]}
            position={[
              Math.cos(angle) * boltRadius,
              Math.sin(angle) * boltRadius,
              0,
            ]}
          >
            <cylinderGeometry args={[0.035, 0.035, 0.05, 6]} />
            <meshStandardMaterial color={EDGE_LINE} metalness={0.7} roughness={0.3} />
          </mesh>
        );
      })}
      {/* center shaft/axle running through both rings */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.045, 0.045, 1.2, 10]} />
        <meshStandardMaterial color={NAVY_EDGE} metalness={0.7} roughness={0.25} />
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
  return (
    <group position={[0, -0.5, 0]}>
      {/* pallet base */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[1.3, 0.1, 0.7]} />
        <meshStandardMaterial color={BROWN_DARK} metalness={0.1} roughness={0.8} />
        <Edges color={EDGE_LINE} threshold={15} />
      </mesh>
      {/* crate */}
      <mesh position={[-0.32, 0.38, 0]}>
        <boxGeometry args={[0.55, 0.55, 0.55]} />
        <meshStandardMaterial color={BROWN} metalness={0.15} roughness={0.7} />
        <Edges color={EDGE_LINE} threshold={15} />
      </mesh>
      {/* crate strap bands — a wrapped "+" pattern reads as "packaged crate" */}
      <mesh position={[-0.32, 0.38, 0.28]}>
        <boxGeometry args={[0.58, 0.08, 0.02]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={0.4}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[-0.595, 0.38, 0]}>
        <boxGeometry args={[0.02, 0.08, 0.58]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={0.4}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>
      {/* shipping tag */}
      <mesh position={[-0.1, 0.55, 0.285]} rotation={[0, 0, -0.15]}>
        <boxGeometry args={[0.12, 0.09, 0.008]} />
        <meshStandardMaterial color={BROWN_LIGHT} metalness={0.1} roughness={0.8} />
      </mesh>
      {/* barrel/drum — reads instantly as "materials/warehouse" */}
      <mesh position={[0.38, 0.42, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.75, 20]} />
        <meshStandardMaterial color={BROWN_LIGHT} metalness={0.2} roughness={0.6} />
        <Edges color={EDGE_LINE} threshold={15} />
      </mesh>
      <mesh position={[0.38, 0.68, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.27, 0.02, 8, 16]} />
        <meshStandardMaterial color={BROWN_DARK} metalness={0.3} roughness={0.5} />
      </mesh>
      <mesh position={[0.38, 0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.27, 0.02, 8, 16]} />
        <meshStandardMaterial color={BROWN_DARK} metalness={0.3} roughness={0.5} />
      </mesh>
    </group>
  );
}

function EquipmentShape() {
  return (
    <group position={[0, -0.3, 0]}>
      {/* base plate */}
      <mesh position={[0, -0.56, 0]}>
        <boxGeometry args={[0.32, 0.06, 0.32]} />
        <meshStandardMaterial color={NAVY_EDGE} metalness={0.5} roughness={0.4} />
      </mesh>
      {/* mast */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.12, 1.5, 0.12]} />
        <meshStandardMaterial color={NAVY_BASE} metalness={0.6} roughness={0.3} />
      </mesh>
      {/* mast cross-bracing */}
      {[0.55, 0.15, -0.25].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.16, 0.02, 0.02]} />
          <meshStandardMaterial color={NAVY_EDGE} metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
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
      {/* pulley wheel at the jib tip */}
      <mesh position={[1.05, 0.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.055, 0.015, 6, 12]} />
        <meshStandardMaterial color={NAVY_EDGE} metalness={0.7} roughness={0.25} />
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
  labelOffset = -1.15,
}: {
  division: Division;
  position: [number, number, number];
  spinSpeed: number;
  floatPhase: number;
  reduceMotion: boolean;
  baseScale?: number;
  interaction: RefObject<InteractionState>;
  labelOffset?: number;
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
      <Html center position={[0, labelOffset, 0]} occlude={false} style={{ pointerEvents: "auto" }}>
        <Link
          href={division.href}
          className={`block w-max max-w-[42vw] text-center font-display text-[10px] font-bold tracking-[1.2px] uppercase transition-colors sm:text-[11px] sm:tracking-[1.5px] md:max-w-none ${
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
    const update = () => setIsMobile(window.innerWidth < 1024);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return isMobile;
}

function ResponsiveCamera({ isMobile }: { isMobile: boolean }) {
  const { camera } = useThree();

  useEffect(() => {
    const perspective = camera as THREE.PerspectiveCamera;
    if (isMobile) {
      perspective.position.set(0, 0.05, 12.2);
      perspective.fov = 44;
    } else {
      perspective.position.set(0, 0.4, 9.5);
      perspective.fov = 38;
    }
    perspective.updateProjectionMatrix();
  }, [camera, isMobile]);

  return null;
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
      // 2 columns × 3 rows — spaced for a taller mobile viewport
      const xs = [-1.55, 1.55];
      const ys = [2.1, 0, -2.1];
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
      <ResponsiveCamera isMobile={isMobile} />
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
            baseScale={isMobile ? MOBILE_SCALE[division.key] ?? 0.82 : 1}
            interaction={interaction}
            labelOffset={isMobile ? -1.05 : -1.15}
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
    <div className="grid grid-cols-2 gap-8 px-4 py-10 sm:grid-cols-3 sm:gap-6 md:grid-cols-6 md:py-16">
      {divisions.map(({ key, label, href, Icon }) => (
        <Link
          key={key}
          href={href}
          className="group flex flex-col items-center gap-3 text-center"
        >
          <span className="flex h-14 w-14 items-center justify-center border border-border-soft text-accent transition group-hover:border-accent sm:h-16 sm:w-16">
            <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
          </span>
          <span className="font-display text-[10px] font-bold tracking-[1.2px] text-ink/70 uppercase transition group-hover:text-accent sm:text-[11px] sm:tracking-[1.5px]">
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
  const isMobile = useIsMobile();
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
    <div
      className={`relative w-full overflow-hidden bg-white ${
        isMobile ? "h-[500px] sm:h-[540px]" : "h-[340px]"
      }`}
    >
      <div
        className={
          isMobile
            ? "absolute inset-0 touch-pan-y select-none active:cursor-grabbing"
            : "absolute inset-x-0 top-1/2 h-[480px] -translate-y-1/2 touch-pan-y select-none active:cursor-grabbing"
        }
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
