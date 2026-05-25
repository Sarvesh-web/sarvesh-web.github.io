/**
 * Player profile — the entire portfolio modeled as game data.
 * Edit this file to update every screen; UI consumes it as the single source of truth.
 */

export type Rarity = 'common' | 'rare' | 'epic' | 'gold' | 'classified';

export interface WeaponStats {
  /** 0-100 — proxy for project complexity */
  complexity: number;
  /** 0-100 — production / shipping impact */
  impact: number;
  /** 0-100 — depth into low-level systems */
  systemsDepth: number;
  /** 0-100 — visual / gameplay polish */
  polish: number;
}

export interface Project {
  id: string;
  codename: string;
  /** Short tag like "PISTOL" / "RIFLE" so it slots into the loadout metaphor */
  weaponClass: string;
  description: string;
  highlights: string[];
  tech: string[];
  rarity: Rarity;
  /** Display-only ID, like "CTN-001" */
  serial: string;
  /** Approx start–end string */
  serviceWindow: string;
  /** Optional sub-org */
  unit?: string;
  stats: WeaponStats;
  /** True if this is the currently-equipped / active weapon */
  active?: boolean;
}

export interface Mission {
  id: string;
  org: string;
  role: string;
  window: string;
  location?: string;
  status: 'ACTIVE' | 'COMPLETE';
  briefing: string;
  objectives: string[];
}

export interface Skill {
  name: string;
  category: 'core' | 'engine' | 'graphics' | 'tooling' | 'soft';
  /** 0-100 — proficiency level */
  level: number;
  /** Optional flavor text shown on hover */
  blurb?: string;
  /** True if treated as a "signature" skill on the upgrade tree */
  signature?: boolean;
}

export interface Trophy {
  title: string;
  detail: string;
  rarity: Rarity;
}

export interface Operator {
  callsign: string;
  fullName: string;
  classTitle: string;
  level: number;
  xp: number; // 0-100 to next level
  bio: string[];
  location: string;
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    github?: string;
  };
  resumeHref: string;
  education: Array<{
    institution: string;
    degree: string;
    window: string;
  }>;
}

/* ---------- DATA ---------- */

export const operator: Operator = {
  callsign: 'OP-SARVESH',
  fullName: 'Sarvesh Narendra Yenarkar',
  classTitle: 'SR. GAME DEVELOPER · C++ / UNREAL',
  level: 30,
  xp: 22,
  bio: [
    'Sr. Game Developer at TPlusPlus Interactive — working on core game development in native C++ and Unreal Engine.',
    'Previously spent nearly 3 years at Zen Technologies building AI frameworks, FPS soldier modules, and a shipped driving training simulator deployed to the Indian Military.',
    'Specializes in low-level systems work — custom interpreters, behavior-tree tooling, replay systems — and the kind of profiling that turns a 14 ms frame into a 6 ms one.',
  ],
  location: 'Kothguda, Hyderabad — IN',
  contact: {
    email: 'sarveshyenarkar24@gmail.com',
    phone: '+91-9137051883',
    linkedin: 'https://www.linkedin.com/in/sarvesh-yenarkar-553260181/',
  },
  resumeHref: '/resume.pdf',
  education: [
    {
      institution: 'Veermata Jijabai Technological Institute, Mumbai',
      degree: 'B.Tech, Electronics & Telecommunication',
      window: '2017 — 2021',
    },
    {
      institution: 'Arts, Commerce and Science College, Chandrapur',
      degree: 'Higher Secondary — PCM + Computer Science',
      window: '2015 — 2017',
    },
    {
      institution: 'Chanda Public School, Chandrapur',
      degree: 'SSC',
      window: '2014 — 2015',
    },
  ],
};

export const projects: Project[] = [
  {
    id: 'tplusplus-current',
    codename: 'CLASSIFIED · IN DEVELOPMENT',
    weaponClass: 'PRIMARY · CORE GAME DEV',
    description:
      'Current deployment at TPlusPlus Interactive. Core game development in native C++ and Unreal Engine — details under wraps until ship-ready.',
    highlights: [
      'Sr. Game Developer — engine-level systems work',
      'Native C++ and Unreal Engine, end-to-end ownership',
      'Details available on request',
    ],
    tech: ['Native C++', 'Unreal Engine', 'Gameplay systems'],
    rarity: 'classified',
    serial: 'TPP-001',
    serviceWindow: 'March 2026 — PRESENT',
    unit: 'TPlusPlus Interactive',
    stats: { complexity: 90, impact: 80, systemsDepth: 88, polish: 75 },
    active: true,
  },
  {
    id: 'ctn',
    codename: 'PROJECT CTN',
    weaponClass: 'PRIMARY · AI FRAMEWORK',
    description:
      'A native-C++ AI framework hot-loaded into Unreal Engine as a DLL, paired with a custom node-graph editor that authors behavior trees Unreal itself can execute at runtime.',
    highlights: [
      'Authored a DLL-based ImGui node editor in pure C++ for visualizing custom behavior trees',
      'Wrote a C++ interpreter that walks the node graph and dispatches gameplay logic',
      'Built AI framework, senses, and decision logic from scratch — no engine boilerplate',
    ],
    tech: ['Native C++', 'Unreal Engine', 'Dear ImGui', 'DLL hot-loading', 'AI senses'],
    rarity: 'gold',
    serial: 'CTN-001',
    serviceWindow: 'May 2025 — Feb 2026',
    unit: 'Zen Technologies',
    stats: { complexity: 92, impact: 86, systemsDepth: 95, polish: 70 },
  },
  {
    id: 'soldier-ai',
    codename: 'GENERIC SOLDIER AI',
    weaponClass: 'PRIMARY · COMBAT AI MODULE',
    description:
      'Generic FPS soldier AI module with swimming and climbing traversal, expanded behavior set, and a custom replay system optimized in native C++.',
    highlights: [
      'Built AI soldier swim + climb traversal mechanics',
      'Expanded the generic FPS AI module with a wider behavior set',
      'Profiled and optimized the existing custom replay system in native C++',
    ],
    tech: ['Unreal C++', 'AI traversal', 'Replay systems', 'Profiling'],
    rarity: 'epic',
    serial: 'SLD-014',
    serviceWindow: 'Jan 2024 — Feb 2026',
    unit: 'Zen Technologies',
    stats: { complexity: 84, impact: 80, systemsDepth: 78, polish: 76 },
  },
  {
    id: 'driving-sim',
    codename: 'DRIVING TRAINING SIMULATOR',
    weaponClass: 'SUPPORT · VEHICLE SIM',
    description:
      'Shipped driving-training simulator: traffic AI on Unreal Chaos, custom navigation, JSON-driven configurable behavior trees, and modular vehicle physics including tyre burst, suspension and door dynamics.',
    highlights: [
      'Implemented traffic-AI vehicles using Unreal Chaos',
      'Wrote navigation algorithm in Unreal C++ with memory-safe logic',
      'Used Unreal Insights to investigate and remove latency',
      'Custom JSON serialization for behavior-tree-driven project configuration',
      'Configured Chaos Physics for tyre burst, suspension, and door dynamics',
      'Integrated modular vehicle physics with a toggle to legacy physics',
      'Enabled multiplayer mirrors without texture-based rendering',
    ],
    tech: ['Unreal C++', 'Unreal Chaos', 'Unreal Insights', 'JSON', 'Multiplayer'],
    rarity: 'epic',
    serial: 'DTS-007',
    serviceWindow: 'Apr 2023 — Jan 2024',
    unit: 'Zen Technologies',
    stats: { complexity: 88, impact: 90, systemsDepth: 82, polish: 84 },
  },
  {
    id: 'aplus-hns',
    codename: 'HACK · N · SLASH',
    weaponClass: 'SIDEARM · APPRENTICESHIP',
    description:
      'Top-down hack-and-slash prototype built during the Unreal Engine 5 apprenticeship at A Plus Associates: assets, mechanics, three levels.',
    highlights: [
      'Explored health system, inventory management and fighting states',
      'Created three levels: Ally map, Hallway map, Room map',
      'Authored gameplay mechanics and supporting assets',
    ],
    tech: ['Unreal Engine 5', 'Blueprints', 'Level design', 'Combat states'],
    rarity: 'rare',
    serial: 'APL-003',
    serviceWindow: 'Sept 2022 — Apr 2023',
    unit: 'A Plus Associates',
    stats: { complexity: 64, impact: 58, systemsDepth: 56, polish: 70 },
  },
  {
    id: '2d-engine',
    codename: 'CUSTOM 2D ENGINE',
    weaponClass: 'SIDEARM · SOLO BUILD',
    description:
      'An ECS-driven 2D game engine built from scratch on raw OpenGL + GLM — a deliberate exercise in writing the entire stack instead of standing on one.',
    highlights: [
      'Designed an Entity-Component-System core',
      'Direct OpenGL rendering pipeline (no engine wrapper)',
      'Math foundation on GLM',
    ],
    tech: ['C++', 'OpenGL', 'GLM', 'ECS architecture'],
    rarity: 'rare',
    serial: 'SLF-2D-1',
    serviceWindow: 'Self project',
    stats: { complexity: 78, impact: 50, systemsDepth: 88, polish: 55 },
  },
  {
    id: 'turn-based',
    codename: 'TURN-BASED TEMPLATE',
    weaponClass: 'SIDEARM · SOLO BUILD',
    description:
      'A reusable turn-based combat template authored in Unreal Engine — turn order, action queue, and state machine wiring ready to slot into a larger game.',
    highlights: [
      'Designed turn order and action queue systems',
      'Reusable state-machine wiring for combat',
    ],
    tech: ['Unreal Engine', 'C++', 'State machines'],
    rarity: 'rare',
    serial: 'SLF-TBN-1',
    serviceWindow: 'Self project',
    stats: { complexity: 60, impact: 48, systemsDepth: 62, polish: 58 },
  },
];

export const missions: Mission[] = [
  {
    id: 'tplusplus',
    org: 'TPlusPlus Interactive',
    role: 'Sr. Game Developer',
    window: 'March 2026 — PRESENT',
    location: 'India · Full-time',
    status: 'ACTIVE',
    briefing:
      'Senior game developer working on core game development in native C++ and Unreal Engine. Current focus: building gameplay systems from the engine up.',
    objectives: [
      'Core game development — C++ and Unreal Engine',
      'Gameplay systems architecture and implementation',
      'Engine-level tooling and performance work',
    ],
  },
  {
    id: 'zen',
    org: 'Zen Technologies Limited',
    role: 'Game Developer · Jr Software Engineer',
    window: 'April 2023 — February 2026 · 2 yrs 11 mos',
    location: 'Hyderabad, Telangana, IN · On-site',
    status: 'COMPLETE',
    briefing:
      'Joined as an intern (Apr 2023 – Aug 2023) and converted to full-time Game Developer (Aug 2023 – Feb 2026). Defense-grade simulation house. Built AI frameworks, FPS soldier modules, and a shipped driving-training simulator — work deployed to the Indian Military.',
    objectives: [
      'Project CTN — DLL-based AI framework & node-editor for Unreal',
      'Generic Soldier AI module — traversal, behavior expansion, replay opt',
      'Driving Training Simulator — traffic AI, Chaos physics, multiplayer',
      'Promoted from Intern to Game Developer after 5 months',
    ],
  },
  {
    id: 'aplus',
    org: 'A Plus Associates',
    role: 'Trainee in Unreal Engine 5 · Apprenticeship',
    window: 'September 2022 — April 2023 · 8 mos',
    location: 'Tiruvannamalai, Tamil Nadu, IN',
    status: 'COMPLETE',
    briefing:
      'Apprenticeship at a small studio building a top-down hack-and-slash. Owned slices of gameplay code, mechanics and level design — first formal Unreal Engine experience.',
    objectives: [
      'Built health, inventory, and fighting-state systems',
      'Authored three production levels (Ally / Hallway / Room)',
      'Produced supporting assets and gameplay mechanics',
    ],
  },
];

export const skills: Skill[] = [
  {
    name: 'Native C++',
    category: 'core',
    level: 92,
    signature: true,
    blurb: 'Memory-safe, profiler-driven, DLL-hot-loaded production C++.',
  },
  {
    name: 'Unreal Engine',
    category: 'engine',
    level: 90,
    signature: true,
    blurb: 'C++ gameplay, Chaos, replay systems, AI, multiplayer.',
  },
  {
    name: 'Unreal Insights',
    category: 'tooling',
    level: 80,
    blurb: 'CPU/GPU profiling, latency hunting.',
  },
  {
    name: 'Dear ImGui',
    category: 'tooling',
    level: 78,
    blurb: 'Custom in-engine editors and node graphs.',
  },
  {
    name: 'Behavior Trees',
    category: 'core',
    level: 84,
    signature: true,
    blurb: 'Custom node editors + C++ interpreters.',
  },
  {
    name: 'AI Senses & Logic',
    category: 'core',
    level: 80,
    blurb: 'Perception, decision systems built from scratch.',
  },
  {
    name: 'Unreal Chaos',
    category: 'engine',
    level: 75,
    blurb: 'Vehicle physics, destruction, modular replacement.',
  },
  {
    name: 'OpenGL',
    category: 'graphics',
    level: 60,
    blurb: 'ECS 2D engine — raw rendering pipeline.',
  },
  {
    name: 'Blender',
    category: 'tooling',
    level: 55,
    blurb: 'Asset prep, simple rigging, prototyping.',
  },
  {
    name: 'Data Structures & Algorithms',
    category: 'core',
    level: 82,
    blurb: 'Time-complexity reasoning, optimization mindset.',
  },
  {
    name: 'Problem Solving',
    category: 'soft',
    level: 90,
  },
  {
    name: 'Decision Making',
    category: 'soft',
    level: 80,
  },
  {
    name: 'Communication',
    category: 'soft',
    level: 78,
  },
];

export const trophies: Trophy[] = [
  {
    title: 'GONDWANA UNIVERSITY TOPPER',
    detail: 'Topped MHT-CET 2017 in the Gondwana University region.',
    rarity: 'gold',
  },
  {
    title: 'SIMULATION FOR INDIAN MILITARY',
    detail:
      'Contributing engineer on simulation projects deployed for the Indian Military via Zen Technologies.',
    rarity: 'classified',
  },
  {
    title: 'SHIPPED · DRIVING SIM',
    detail:
      'Owned core AI / nav / physics on a driving training simulator that went into production.',
    rarity: 'epic',
  },
  {
    title: 'BUILT FROM SCRATCH · 2D ENGINE',
    detail: 'Self-authored ECS-based 2D game engine on raw OpenGL + GLM.',
    rarity: 'rare',
  },
];
