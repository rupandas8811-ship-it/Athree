import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  Layers,
  RotateCw,
  Eye,
  Activity,
  Maximize2,
  ChevronDown,
  ChevronUp,
  Info,
  Sliders,
  Sparkles,
  Zap,
  HelpCircle
} from 'lucide-react';

// ==========================================
// TYPES & INTERFACES
// ==========================================

export type MedicalModelType = 'spine-disc' | 'laparoscopic' | 'knee-joint';
export type MaterialModeType = 'natural' | 'xray' | 'heatmap' | 'metallic';
export type CameraPresetType = 'iso' | 'front' | 'closeup' | 'top';

interface ModelPartData {
  mesh: THREE.Mesh;
  initialPos: THREE.Vector3;
  explodeVector: THREE.Vector3; // Direction vector when exploded
  name: string;
  category: 'primary' | 'secondary' | 'accent';
  description: string;
  clinicalNote: string;
}

interface Medical3DViewerProps {
  initialModel?: MedicalModelType;
  height?: string;
  className?: string;
  onOpenAppointment?: (treatmentId?: string) => void;
}

// ==========================================
// SOFTWARE WEBGL DETECTION & HELPERS
// ==========================================

const detectSoftwareGl = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
};

// Procedural Canvas Texture Generators
const createProceduralBoneTexture = (maxAnisotropy: number): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(0, 0, 512, 512);

  // Add subtle bone trabecular grain pattern
  for (let i = 0; i < 12000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const r = Math.random() * 1.5;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(210, 215, 225, 0.25)' : 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = maxAnisotropy;
  return texture;
};

const createProceduralMetalGrainTexture = (maxAnisotropy: number): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#cccccc';
  ctx.fillRect(0, 0, 512, 512);

  // Linear brushed steel streaks
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1;
  for (let y = 0; y < 512; y += 2) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y + (Math.random() - 0.5) * 4);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = maxAnisotropy;
  return texture;
};

// Radial Contact Shadow Texture for Grounding
const createContactShadowTexture = (): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 120);
  gradient.addColorStop(0, 'rgba(2, 6, 23, 0.7)');
  gradient.addColorStop(0.4, 'rgba(2, 6, 23, 0.35)');
  gradient.addColorStop(1, 'rgba(2, 6, 23, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

// ==========================================
// COMPONENT
// ==========================================

export const Medical3DViewer: React.FC<Medical3DViewerProps> = ({
  initialModel = 'spine-disc',
  height = 'h-[520px] sm:h-[620px]',
  className = '',
  onOpenAppointment
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Interactive UI State
  const [modelType, setModelType] = useState<MedicalModelType>(initialModel);
  const [materialMode, setMaterialMode] = useState<MaterialModeType>('natural');
  const [cameraPreset, setCameraPreset] = useState<CameraPresetType>('iso');
  const [explodedFactor, setExplodedFactor] = useState<number>(0);
  const [dockCollapsed, setDockCollapsed] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [hoveredPart, setHoveredPart] = useState<ModelPartData | null>(null);
  const [selectedPart, setSelectedPart] = useState<ModelPartData | null>(null);
  const [isSoftwareGlState, setIsSoftwareGlState] = useState<boolean>(false);

  // References for Three.js Lifecycle
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const modelPartsRef = useRef<ModelPartData[]>([]);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(-999, -999));
  const targetExplodeRef = useRef<number>(0);
  const currentExplodeRef = useRef<number>(0);
  const targetCamPosRef = useRef<THREE.Vector3 | null>(null);
  const targetCamLookRef = useRef<THREE.Vector3 | null>(null);
  const frameIdRef = useRef<number>(0);
  const isSoftwareGlRef = useRef<boolean>(false);

  // Synchronize Exploded Factor Target
  useEffect(() => {
    targetExplodeRef.current = explodedFactor;
  }, [explodedFactor]);

  // Handle Model Geometry Construction
  const buildModel = useCallback(
    (type: MedicalModelType, scene: THREE.Scene, maxAnisotropy: number) => {
      if (modelGroupRef.current) {
        scene.remove(modelGroupRef.current);
        // Recursively dispose geometry and materials
        modelGroupRef.current.traverse((obj: THREE.Object3D) => {
          if ((obj as THREE.Mesh).isMesh) {
            const mesh = obj as THREE.Mesh;
            mesh.geometry?.dispose();
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((m: THREE.Material) => m.dispose());
            } else if (mesh.material) {
              mesh.material.dispose();
            }
          }
        });
      }

      const mainGroup = new THREE.Group();
      mainGroup.name = 'MedicalSubjectGroup';
      modelPartsRef.current = [];

      const boneTex = createProceduralBoneTexture(maxAnisotropy);
      const metalTex = createProceduralMetalGrainTexture(maxAnisotropy);

      // Shared PBR Material Templates
      const boneMat = new THREE.MeshStandardMaterial({
        color: 0xf3f4f6,
        roughness: 0.45,
        metalness: 0.05,
        map: boneTex,
        bumpMap: boneTex,
        bumpScale: 0.02
      });

      const discMat = new THREE.MeshPhysicalMaterial({
        color: 0x38bdf8,
        roughness: 0.25,
        metalness: 0.1,
        transmission: isSoftwareGlRef.current ? 0 : 0.65,
        transparent: true,
        opacity: 0.9,
        ior: 1.45,
        thickness: 0.8
      });

      const prolapsedMat = new THREE.MeshStandardMaterial({
        color: 0xef4444,
        roughness: 0.3,
        metalness: 0.2,
        emissive: 0x991b1b,
        emissiveIntensity: 0.2
      });

      const nerveMat = new THREE.MeshStandardMaterial({
        color: 0xfacc15,
        roughness: 0.35,
        metalness: 0.1,
        emissive: 0x854d0e,
        emissiveIntensity: 0.15
      });

      const titaniumMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        roughness: 0.2,
        metalness: 0.9,
        map: metalTex
      });

      const handleMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.6,
        metalness: 0.3
      });

      const accentCyanMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        roughness: 0.2,
        metalness: 0.7,
        emissive: 0x0891b2,
        emissiveIntensity: 0.3
      });

      // ----------------------------------------------------
      // MODEL 1: SPINE LUMBAR VERTEBRAE & DISC PROLAPSE
      // ----------------------------------------------------
      if (type === 'spine-disc') {
        // 1. Superior Vertebra L4 (Primary)
        const l4BodyGeo = new THREE.CylinderGeometry(1.6, 1.7, 1.2, 32);
        l4BodyGeo.scale(1.2, 1, 1);
        const l4Mesh = new THREE.Mesh(l4BodyGeo, boneMat.clone());
        l4Mesh.position.set(0, 1.3, 0);
        l4Mesh.castShadow = true;
        l4Mesh.receiveShadow = true;

        // Add L4 Spinous Process Arch (Secondary)
        const spinousGeo = new THREE.BoxGeometry(0.5, 0.7, 1.8);
        spinousGeo.translate(0, 0, -1.4);
        const spinousMesh = new THREE.Mesh(spinousGeo, boneMat.clone());
        spinousMesh.castShadow = true;
        l4Mesh.add(spinousMesh);

        mainGroup.add(l4Mesh);
        modelPartsRef.current.push({
          mesh: l4Mesh,
          initialPos: l4Mesh.position.clone(),
          explodeVector: new THREE.Vector3(0, 1.4, 0),
          name: 'L4 Lumbar Vertebra Body',
          category: 'primary',
          description: 'Superior vertebral body supporting axial weight.',
          clinicalNote: 'Provides load-bearing stability and protects the spinal cord.'
        });

        // 2. Intervertebral Disc Outer Ring (Annulus Fibrosus)
        const discRingGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.5, 32);
        discRingGeo.scale(1.15, 1, 1);
        const discMesh = new THREE.Mesh(discRingGeo, discMat);
        discMesh.position.set(0, 0.45, 0);
        discMesh.castShadow = true;
        mainGroup.add(discMesh);

        modelPartsRef.current.push({
          mesh: discMesh,
          initialPos: discMesh.position.clone(),
          explodeVector: new THREE.Vector3(0, 0.4, 0),
          name: 'Annulus Fibrosus (Intervertebral Disc)',
          category: 'primary',
          description: 'Tough outer fibrous cartilage layer absorbing spinal shock.',
          clinicalNote: 'When torn or weakened, inner gel extrudes causing disc prolapse.'
        });

        // 3. Prolapsed / Herniated Nucleus Bulge (Accent)
        const prolapseGeo = new THREE.SphereGeometry(0.48, 24, 24);
        prolapseGeo.scale(1.3, 0.7, 1);
        const prolapseMesh = new THREE.Mesh(prolapseGeo, prolapsedMat);
        prolapseMesh.position.set(0.4, 0.4, -1.05);
        prolapseMesh.castShadow = true;
        mainGroup.add(prolapseMesh);

        modelPartsRef.current.push({
          mesh: prolapseMesh,
          initialPos: prolapseMesh.position.clone(),
          explodeVector: new THREE.Vector3(0.8, 0.4, -0.8),
          name: 'Herniated Disc Bulge (Prolapse Site)',
          category: 'accent',
          description: 'Extruded nucleus pulposus compressing adjacent nerve roots.',
          clinicalNote: 'Causes severe sciatica, leg numbness, and lower back pain.'
        });

        // 4. Compressed Spinal Nerve Root (Accent)
        const nerveCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 1.2, -1.1),
          new THREE.Vector3(0.5, 0.45, -1.25),
          new THREE.Vector3(1.2, -0.3, -1.4)
        ]);
        const nerveGeo = new THREE.TubeGeometry(nerveCurve, 20, 0.12, 12, false);
        const nerveMesh = new THREE.Mesh(nerveGeo, nerveMat);
        nerveMesh.castShadow = true;
        mainGroup.add(nerveMesh);

        modelPartsRef.current.push({
          mesh: nerveMesh,
          initialPos: nerveMesh.position.clone(),
          explodeVector: new THREE.Vector3(1.1, 0, -0.6),
          name: 'L5 Spinal Nerve Root (Compressed)',
          category: 'accent',
          description: 'Nerve path irritated by disc prolapse causing radiation pain.',
          clinicalNote: 'Targeted for micro-decompression & endoscopic laser annuloplasty.'
        });

        // 5. Inferior Vertebra L5 (Primary)
        const l5BodyGeo = new THREE.CylinderGeometry(1.65, 1.75, 1.25, 32);
        l5BodyGeo.scale(1.2, 1, 1);
        const l5Mesh = new THREE.Mesh(l5BodyGeo, boneMat.clone());
        l5Mesh.position.set(0, -0.4, 0);
        l5Mesh.castShadow = true;
        l5Mesh.receiveShadow = true;

        const l5SpinousGeo = new THREE.BoxGeometry(0.5, 0.7, 1.8);
        l5SpinousGeo.translate(0, 0, -1.4);
        const l5SpinousMesh = new THREE.Mesh(l5SpinousGeo, boneMat.clone());
        l5SpinousMesh.castShadow = true;
        l5Mesh.add(l5SpinousMesh);

        mainGroup.add(l5Mesh);
        modelPartsRef.current.push({
          mesh: l5Mesh,
          initialPos: l5Mesh.position.clone(),
          explodeVector: new THREE.Vector3(0, -1.4, 0),
          name: 'L5 Lumbar Vertebra Body',
          category: 'primary',
          description: 'Inferior lumbar vertebra resting above sacrum.',
          clinicalNote: 'Subject to high biomechanical shear stress during bending.'
        });
      }

      // ----------------------------------------------------
      // MODEL 2: LAPAROSCOPIC KEYHOLE SURGICAL INSTRUMENT
      // ----------------------------------------------------
      else if (type === 'laparoscopic') {
        // 1. Surgical Ergonomic Handle (Primary)
        const handleGeo = new THREE.CylinderGeometry(0.4, 0.6, 2.2, 24);
        handleGeo.rotateZ(Math.PI / 4);
        const handleMesh = new THREE.Mesh(handleGeo, handleMat);
        handleMesh.position.set(-1.8, -0.8, 0);
        handleMesh.castShadow = true;
        mainGroup.add(handleMesh);

        modelPartsRef.current.push({
          mesh: handleMesh,
          initialPos: handleMesh.position.clone(),
          explodeVector: new THREE.Vector3(-1.5, -0.8, 0),
          name: 'Ergonomic Surgical Control Handle',
          category: 'primary',
          description: 'Precision grip designed for surgeon comfort and micro-articulation.',
          clinicalNote: 'Allows millimeter-level precision inside minimally invasive ports.'
        });

        // 2. Stainless Shaft & Trocar Port Sheath (Secondary)
        const shaftGeo = new THREE.CylinderGeometry(0.18, 0.18, 4.2, 32);
        shaftGeo.rotateZ(Math.PI / 2);
        const shaftMesh = new THREE.Mesh(shaftGeo, titaniumMat);
        shaftMesh.position.set(0.5, 0, 0);
        shaftMesh.castShadow = true;
        mainGroup.add(shaftMesh);

        modelPartsRef.current.push({
          mesh: shaftMesh,
          initialPos: shaftMesh.position.clone(),
          explodeVector: new THREE.Vector3(0, 0.8, 0),
          name: 'Endoscopic Optical Shaft (3mm Trocar Sheath)',
          category: 'secondary',
          description: 'Ultra-thin rigid stainless cannula harboring HD fiber-optics.',
          clinicalNote: 'Inserted through tiny keyhole incision (5mm) for minimal scarring.'
        });

        // 3. LED Optical Fiber Illumination Ring (Accent)
        const ringGeo = new THREE.TorusGeometry(0.22, 0.05, 16, 32);
        ringGeo.rotateY(Math.PI / 2);
        const ringMesh = new THREE.Mesh(ringGeo, accentCyanMat);
        ringMesh.position.set(2.4, 0, 0);
        ringMesh.castShadow = true;
        mainGroup.add(ringMesh);

        modelPartsRef.current.push({
          mesh: ringMesh,
          initialPos: ringMesh.position.clone(),
          explodeVector: new THREE.Vector3(0.6, 0.6, 0),
          name: 'HD Fiber-Optic Light Ring & Camera Lens',
          category: 'accent',
          description: 'Integrated cold LED illumination source and 4K optical lens.',
          clinicalNote: 'Transmits crystal-clear live operative view to 4K surgical monitors.'
        });

        // 4. Dual Articulated Micro-Grasper Jaws (Accent)
        const jawGroup = new THREE.Group();
        const jaw1Geo = new THREE.BoxGeometry(0.4, 0.06, 0.12);
        jaw1Geo.translate(0.2, 0.08, 0);
        const jaw1Mesh = new THREE.Mesh(jaw1Geo, titaniumMat);
        jaw1Mesh.rotation.z = Math.PI / 12;

        const jaw2Geo = new THREE.BoxGeometry(0.4, 0.06, 0.12);
        jaw2Geo.translate(0.2, -0.08, 0);
        const jaw2Mesh = new THREE.Mesh(jaw2Geo, titaniumMat);
        jaw2Mesh.rotation.z = -Math.PI / 12;

        jawGroup.add(jaw1Mesh);
        jawGroup.add(jaw2Mesh);
        jawGroup.position.set(2.6, 0, 0);
        mainGroup.add(jawGroup as unknown as THREE.Mesh);

        modelPartsRef.current.push({
          mesh: jawGroup as unknown as THREE.Mesh,
          initialPos: jawGroup.position.clone(),
          explodeVector: new THREE.Vector3(1.2, 0, 0),
          name: 'Micro-Articulated Surgical Grasper Jaws',
          category: 'accent',
          description: 'Atraumatic forceps tips for tissue handling, hernia mesh placement, or ablation.',
          clinicalNote: 'Ensures zero tissue trauma and rapid post-operative recovery.'
        });
      }

      // ----------------------------------------------------
      // MODEL 3: KNEE JOINT ANATOMY & MENISCUS LIGAMENTS
      // ----------------------------------------------------
      else if (type === 'knee-joint') {
        // 1. Distal Femur Condyles (Primary)
        const femurGeo = new THREE.CylinderGeometry(1.3, 1.1, 2.0, 32);
        femurGeo.scale(1.2, 1, 1);
        const femurMesh = new THREE.Mesh(femurGeo, boneMat.clone());
        femurMesh.position.set(0, 1.2, 0);
        femurMesh.castShadow = true;
        mainGroup.add(femurMesh);

        modelPartsRef.current.push({
          mesh: femurMesh,
          initialPos: femurMesh.position.clone(),
          explodeVector: new THREE.Vector3(0, 1.2, 0),
          name: 'Distal Femur Condyles (Thigh Bone)',
          category: 'primary',
          description: 'Smooth rounded bone articulation forming top half of knee joint.',
          clinicalNote: 'Coated in articular cartilage to glide seamlessly over tibia.'
        });

        // 2. Medial & Lateral Meniscus Pads (Secondary)
        const meniscusGeo = new THREE.TorusGeometry(1.05, 0.22, 16, 32, Math.PI * 1.5);
        meniscusGeo.rotateX(Math.PI / 2);
        const meniscusMesh = new THREE.Mesh(meniscusGeo, discMat);
        meniscusMesh.position.set(0, 0.1, 0);
        meniscusMesh.castShadow = true;
        mainGroup.add(meniscusMesh);

        modelPartsRef.current.push({
          mesh: meniscusMesh,
          initialPos: meniscusMesh.position.clone(),
          explodeVector: new THREE.Vector3(0, 0.3, 0),
          name: 'Medial & Lateral Meniscus Cartilage Pads',
          category: 'secondary',
          description: 'Crescent-shaped fibrocartilage shock absorbers inside the joint.',
          clinicalNote: 'Subject to sports tears; treatable via keyhole arthroscopic repair.'
        });

        // 3. Anterior Cruciate Ligament (ACL) (Accent)
        const aclCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-0.3, -0.6, 0.2),
          new THREE.Vector3(0, 0.1, 0),
          new THREE.Vector3(0.3, 0.7, -0.2)
        ]);
        const aclGeo = new THREE.TubeGeometry(aclCurve, 16, 0.14, 12, false);
        const aclMesh = new THREE.Mesh(aclGeo, accentCyanMat);
        aclMesh.castShadow = true;
        mainGroup.add(aclMesh);

        modelPartsRef.current.push({
          mesh: aclMesh,
          initialPos: aclMesh.position.clone(),
          explodeVector: new THREE.Vector3(-0.6, 0, 0.6),
          name: 'Anterior Cruciate Ligament (ACL)',
          category: 'accent',
          description: 'Stabilizing ligament preventing forward sliding of tibia relative to femur.',
          clinicalNote: 'Critical for knee rotational stability during active movement.'
        });

        // 4. Proximal Tibia Plateau (Primary)
        const tibiaGeo = new THREE.CylinderGeometry(1.2, 0.9, 2.0, 32);
        tibiaGeo.scale(1.15, 1, 1);
        const tibiaMesh = new THREE.Mesh(tibiaGeo, boneMat.clone());
        tibiaMesh.position.set(0, -1.1, 0);
        tibiaMesh.castShadow = true;
        mainGroup.add(tibiaMesh);

        modelPartsRef.current.push({
          mesh: tibiaMesh,
          initialPos: tibiaMesh.position.clone(),
          explodeVector: new THREE.Vector3(0, -1.2, 0),
          name: 'Proximal Tibia Plateau (Shin Bone)',
          category: 'primary',
          description: 'Flat weight-bearing platform supporting body load.',
          clinicalNote: 'Smooth surfaces prevent friction and wear during walking.'
        });
      }

      // Add Ground Radial Contact Shadow
      const shadowGeo = new THREE.PlaneGeometry(8, 8);
      shadowGeo.rotateX(-Math.PI / 2);
      const shadowMat = new THREE.MeshBasicMaterial({
        map: createContactShadowTexture(),
        transparent: true,
        depthWrite: false,
        opacity: 0.55
      });
      const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
      shadowMesh.position.set(0, -2.2, 0);
      mainGroup.add(shadowMesh);

      scene.add(mainGroup);
      modelGroupRef.current = mainGroup;

      // Select default primary part
      if (modelPartsRef.current.length > 0) {
        setSelectedPart(modelPartsRef.current[0]);
      }
    },
    []
  );

  // Initialize Three.js WebGL Scene once
  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const heightPx = containerRef.current.clientHeight;

    const isSoftGl = detectSoftwareGl();
    isSoftwareGlRef.current = isSoftGl;
    setIsSoftwareGlState(isSoftGl);

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617); // Deep slate dark backdrop
    scene.fog = new THREE.FogExp2(0x020617, 0.08);
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(42, width / heightPx, 0.1, 50);
    camera.position.set(4, 3, 6);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftGl,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, heightPx);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. PMREM Environment Generator for Realistic Reflections
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 5. Lighting Rig
    const keyLight = new THREE.DirectionalLight(0xfff5ea, 2.4);
    keyLight.position.set(5, 8, 5);
    if (!isSoftGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 20;
      keyLight.shadow.camera.left = -4;
      keyLight.shadow.camera.right = 4;
      keyLight.shadow.camera.top = 4;
      keyLight.shadow.camera.bottom = -4;
      keyLight.shadow.bias = -0.0005;
    }
    scene.add(keyLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x020617, 0.9);
    scene.add(hemiLight);

    const rimLight = new THREE.DirectionalLight(0x06b6d4, 1.5);
    rimLight.position.set(-5, -2, -5);
    scene.add(rimLight);

    // 6. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftGl;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 14;
    controls.minDistance = 2.5;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // Build Initial Model
    buildModel(initialModel, scene, maxAnisotropy);

    // 7. Animation & Render Loop
    let lastTime = performance.now();

    const tick = () => {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Smooth Exploded Factor Damping
      if (Math.abs(currentExplodeRef.current - targetExplodeRef.current) > 0.001) {
        currentExplodeRef.current = THREE.MathUtils.damp(
          currentExplodeRef.current,
          targetExplodeRef.current,
          8,
          delta
        );

        // Apply explosion vector offsets to model parts
        modelPartsRef.current.forEach((part) => {
          const targetPos = part.initialPos
            .clone()
            .addScaledVector(part.explodeVector, currentExplodeRef.current);
          part.mesh.position.copy(targetPos);
        });
      }

      // Smooth Camera Preset Transitions
      if (targetCamPosRef.current && cameraRef.current) {
        cameraRef.current.position.lerp(targetCamPosRef.current, delta * 4);
        if (targetCamLookRef.current) {
          controls.target.lerp(targetCamLookRef.current, delta * 4);
        }
        if (cameraRef.current.position.distanceTo(targetCamPosRef.current) < 0.05) {
          targetCamPosRef.current = null;
          targetCamLookRef.current = null;
        }
      }

      // Auto rotation
      if (modelGroupRef.current && autoRotate && !isSoftGl) {
        modelGroupRef.current.rotation.y += delta * 0.25;
      }

      controls.update();
      renderer.render(scene, camera);

      frameIdRef.current = requestAnimationFrame(tick);
    };

    tick();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (rendererRef.current.domElement.parentNode) {
          rendererRef.current.domElement.parentNode.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, [buildModel, initialModel]);

  // Handle Model Change
  useEffect(() => {
    if (sceneRef.current && rendererRef.current) {
      const maxAniso = rendererRef.current.capabilities.getMaxAnisotropy();
      buildModel(modelType, sceneRef.current, maxAniso);
      setExplodedFactor(0);
    }
  }, [modelType, buildModel]);

  // Handle Material Mode Change
  useEffect(() => {
    if (!modelGroupRef.current) return;

    modelPartsRef.current.forEach((part) => {
      const mesh = part.mesh;
      if (!mesh || !mesh.material) return;

      const mat = mesh.material as THREE.MeshStandardMaterial;

      if (materialMode === 'xray') {
        mat.wireframe = false;
        mat.transparent = true;
        mat.opacity = 0.45;
        mat.emissive = new THREE.Color(0x0284c7);
        mat.emissiveIntensity = 0.35;
      } else if (materialMode === 'heatmap') {
        mat.wireframe = false;
        mat.transparent = false;
        mat.opacity = 1.0;
        if (part.category === 'accent') {
          mat.color = new THREE.Color(0xef4444);
          mat.emissive = new THREE.Color(0xd97706);
          mat.emissiveIntensity = 0.4;
        } else if (part.category === 'secondary') {
          mat.color = new THREE.Color(0xeab308);
          mat.emissiveIntensity = 0.1;
        } else {
          mat.color = new THREE.Color(0x3b82f6);
          mat.emissiveIntensity = 0.05;
        }
      } else if (materialMode === 'metallic') {
        mat.wireframe = false;
        mat.transparent = false;
        mat.opacity = 1.0;
        mat.metalness = 0.85;
        mat.roughness = 0.2;
        mat.color = new THREE.Color(0xe2e8f0);
      } else {
        // Natural
        mat.wireframe = false;
        mat.transparent = part.name.includes('Disc') || part.name.includes('Meniscus');
        mat.opacity = mat.transparent ? 0.85 : 1.0;
        mat.emissiveIntensity = 0.1;
      }
    });
  }, [materialMode]);

  // Handle Camera Presets
  const setPresetView = (preset: CameraPresetType) => {
    setCameraPreset(preset);
    if (!cameraRef.current) return;

    let targetPos = new THREE.Vector3(4, 3, 6);
    let targetLook = new THREE.Vector3(0, 0, 0);

    if (preset === 'front') {
      targetPos = new THREE.Vector3(0, 0, 6.5);
    } else if (preset === 'closeup') {
      targetPos = new THREE.Vector3(1.8, 1.2, 2.8);
      targetLook = new THREE.Vector3(0.2, 0.3, 0);
    } else if (preset === 'top') {
      targetPos = new THREE.Vector3(0, 7, 0.1);
    }

    targetCamPosRef.current = targetPos;
    targetCamLookRef.current = targetLook;
  };

  // Pointer Move Raycasting for Anatomical Hover / Select
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current || !cameraRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    const meshes = modelPartsRef.current.map((p) => p.mesh);
    const intersects = raycasterRef.current.intersectObjects(meshes, true);

    if (intersects.length > 0) {
      const hitMesh = intersects[0].object as THREE.Mesh;
      const foundPart = modelPartsRef.current.find(
        (p) => p.mesh === hitMesh || p.mesh.children.includes(hitMesh)
      );
      if (foundPart) {
        setHoveredPart(foundPart);
      }
    } else {
      setHoveredPart(null);
    }
  };

  const handlePointerClick = () => {
    if (hoveredPart) {
      setSelectedPart(hoveredPart);
    }
  };

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl ${height} ${className}`}
    >
      {/* Top Header Overlay (Non-obstructive) */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-xl text-white text-xs font-semibold backdrop-blur-none pointer-events-auto shadow-lg">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>Interactive 3D Medical Explorer</span>
          <span className="text-slate-400">|</span>
          <span className="text-cyan-300 font-normal hidden xs:inline">
            Athree Precision Anatomy
          </span>
        </div>

        {/* Top Controls: Auto rotate & Fullscreen */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          {isSoftwareGlState && (
            <div className="bg-amber-950/80 text-amber-200 border border-amber-800/80 text-[10px] px-2.5 py-1 rounded-lg">
              Standard 3D Render
            </div>
          )}

          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-colors flex items-center gap-1.5 ${
              autoRotate
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-900/90 text-slate-300 border-slate-700/80 hover:bg-slate-800'
            }`}
            title="Toggle 3D Auto Rotation"
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Rotate</span>
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Mount Point */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onClick={handlePointerClick}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Hover / Selection Anatomical Info Badge (Top-Left under title) */}
      {(hoveredPart || selectedPart) && (
        <div className="absolute top-14 left-3 z-10 max-w-xs sm:max-w-sm bg-slate-900/95 border border-cyan-500/40 text-white rounded-xl p-3 shadow-xl pointer-events-auto text-xs space-y-1 animate-fadeIn">
          <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1">
            <span className="font-bold text-cyan-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              {(hoveredPart || selectedPart)?.name}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
              {(hoveredPart || selectedPart)?.category}
            </span>
          </div>
          <p className="text-slate-300 text-[11px] leading-snug">
            {(hoveredPart || selectedPart)?.description}
          </p>
          <div className="text-[10px] text-cyan-200/90 font-medium pt-0.5 border-t border-slate-800/80">
            <strong>Clinical Insight:</strong> {(hoveredPart || selectedPart)?.clinicalNote}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* Sleek Collapsible Bottom Dock (Zero Viewport Occlusion) */}
      {/* ========================================================= */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-3xl pointer-events-auto">
        {/* Dock Drawer Collapse / Expand Toggle Button */}
        <div className="flex justify-center -mb-2">
          <button
            onClick={() => setDockCollapsed(!dockCollapsed)}
            className="bg-slate-900/95 border border-slate-700 hover:border-cyan-500/60 text-cyan-300 text-[11px] font-bold px-3 py-1 rounded-t-xl transition-all shadow-md flex items-center gap-1.5"
          >
            {dockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
                <span>Show 3D Dock Controls</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
                <span>Hide Dock</span>
              </>
            )}
          </button>
        </div>

        {/* Main Dock Container */}
        <div
          className={`bg-slate-900/95 border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-2xl transition-all duration-300 space-y-3 ${
            dockCollapsed ? 'translate-y-full opacity-0 pointer-events-none hidden' : 'opacity-100'
          }`}
        >
          {/* Row 1: Model Preset Tabs */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-cyan-400" /> Anatomy:
            </span>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setModelType('spine-disc')}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  modelType === 'spine-disc'
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                L4-L5 Spine & Disc
              </button>

              <button
                onClick={() => setModelType('laparoscopic')}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  modelType === 'laparoscopic'
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Keyhole Surgical Tool
              </button>

              <button
                onClick={() => setModelType('knee-joint')}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  modelType === 'knee-joint'
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Knee Joint & Ligaments
              </button>
            </div>
          </div>

          {/* Row 2: Exploded View Slider + Material Mode + Camera Views */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center text-xs">
            {/* Exploded View Slider (5 cols) */}
            <div className="md:col-span-5 flex items-center gap-2.5 bg-slate-950/60 p-2 rounded-xl border border-slate-800">
              <span className="text-[11px] font-medium text-slate-300 shrink-0 flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Explode View:
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={explodedFactor}
                onChange={(e) => setExplodedFactor(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[10px] font-bold text-cyan-300 w-8 text-right shrink-0">
                {Math.round(explodedFactor * 100)}%
              </span>
            </div>

            {/* Material Finish Modes (4 cols) */}
            <div className="md:col-span-4 flex items-center gap-1 justify-center bg-slate-950/60 p-1.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase mr-1 hidden sm:inline">
                Mode:
              </span>
              <button
                onClick={() => setMaterialMode('natural')}
                className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  materialMode === 'natural'
                    ? 'bg-blue-900/80 text-cyan-300 border border-cyan-500/50'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Natural
              </button>
              <button
                onClick={() => setMaterialMode('xray')}
                className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  materialMode === 'xray'
                    ? 'bg-blue-900/80 text-cyan-300 border border-cyan-500/50'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                X-Ray
              </button>
              <button
                onClick={() => setMaterialMode('heatmap')}
                className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  materialMode === 'heatmap'
                    ? 'bg-blue-900/80 text-cyan-300 border border-cyan-500/50'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Diagnostic
              </button>
            </div>

            {/* Camera Presets & Appointment CTA (3 cols) */}
            <div className="md:col-span-3 flex items-center justify-end gap-1.5">
              <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setPresetView('iso')}
                  className={`px-2 py-1 rounded text-[10px] font-bold ${
                    cameraPreset === 'iso' ? 'bg-cyan-500/30 text-cyan-300' : 'text-slate-400'
                  }`}
                  title="ISO Angle"
                >
                  ISO
                </button>
                <button
                  onClick={() => setPresetView('front')}
                  className={`px-2 py-1 rounded text-[10px] font-bold ${
                    cameraPreset === 'front' ? 'bg-cyan-500/30 text-cyan-300' : 'text-slate-400'
                  }`}
                  title="Front Angle"
                >
                  Front
                </button>
                <button
                  onClick={() => setPresetView('closeup')}
                  className={`px-2 py-1 rounded text-[10px] font-bold ${
                    cameraPreset === 'closeup' ? 'bg-cyan-500/30 text-cyan-300' : 'text-slate-400'
                  }`}
                  title="Close-Up"
                >
                  Zoom
                </button>
              </div>

              {onOpenAppointment && (
                <button
                  onClick={() => onOpenAppointment()}
                  className="px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all shrink-0 flex items-center gap-1"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>Consult</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
