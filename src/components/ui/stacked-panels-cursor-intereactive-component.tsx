import { useRef, useCallback, useState } from "react";
import { motion, useSpring, AnimatePresence } from "motion/react";

const PANEL_COUNT = 12;
const DOMAINS = [
  { id: "AGENT", count: 23, health: "100%", label: "Core Intelligence", color: "#CCFF00", skills: ["Minimax AI", "Neural Orchestration", "Agentic Loops", "Cognitive Architecture", "Memory Management"] },
  { id: "UI", count: 39, health: "100%", label: "Premium Frontend", color: "#0038FF", skills: ["Framer Motion", "Tailwind Master", "Three.js Canvas", "Glassmorphic Design", "Micro-animations"] },
  { id: "INFRA", count: 21, health: "100%", label: "Cloud & Mesh", color: "#CCFF00", skills: ["Kubernetes", "AWS Lambda", "Terraform Hash", "Mesh Networking", "Sovereign Cloud"] },
  { id: "DATA", count: 21, health: "100%", label: "Engineering & ML", color: "#0038FF", skills: ["Vector DB", "Pinecone Sync", "Training Pipelines", "Semantic Search", "Feature Engineering"] },
  { id: "BACKEND", count: 31, health: "100%", label: "Kernel & API", color: "#CCFF00", skills: ["Node.js Kernel", "Go API Engine", "Redis Caching", "PostgreSQL Mastery", "Auth Protocols"] },
  { id: "MOBILE", count: 11, health: "100%", label: "Sovereign Mobile", color: "#0038FF", skills: ["Flutter Core", "React Native", "Native iOS", "Mobile Security", "Offline First"] },
  { id: "DEVOPS", count: 57, health: "100%", status: "OPTIMIZED", label: "CI/CD & Quality", color: "#CCFF00", skills: ["GitHub Actions", "Playwright Test", "QA Automation", "CodeQL Audit", "Docker Compose"] },
  { id: "PRODUCT", count: 39, health: "100%", status: "OPTIMIZED", label: "Strategy & GTM", color: "#0038FF", skills: ["PRD Mastery", "User Research", "GTM Strategy", "Market Analysis", "Strategic Consulting"] },
  { id: "DOCS", count: 32, health: "100%", status: "OPTIMIZED", label: "Technical Lore", color: "#CCFF00", skills: ["Technical Writing", "Docusaurus", "Markdown Master", "API Documentation", "System Lore"] },
  { id: "MCP", count: 38, health: "100%", status: "OPTIMIZED", label: "Context Protocol", color: "#0038FF", skills: ["MCP Server Host", "Connection Mesh", "Context Injection", "Protocol Mapping", "Agentic Context"] },
  { id: "OS", count: 42, health: "100%", status: "OPTIMIZED", label: "Core Utilities", color: "#CCFF00", skills: ["Shell Scripting", "POSIX Kernel", "File System Ops", "Terminal UI", "Lifecycle Mgmt"] },
  { id: "LABS", count: 9, health: "100%", status: "OPTIMIZED", label: "Research & RNG", color: "#0038FF", skills: ["Quantum Flux", "Exploratory AI", "Frontier Agents", "RNG Engines", "R&D Protocols"] },
];

const WAVE_SPRING = { stiffness: 160, damping: 22, mass: 0.6 };
const SCENE_SPRING = { stiffness: 80, damping: 22, mass: 1 };
const Z_SPREAD = 42;
const SIGMA = 2.8;

const PANEL_IMAGES = [
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80", 
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80", 
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80", 
  "https://images.unsplash.com/photo-1558494949-ef0109123c56?w=400&q=80", 
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80", 
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80", 
  "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400&q=80", 
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80", 
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80", 
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&q=80", 
  "https://images.unsplash.com/photo-1518433278988-2b5a643867ce?w=400&q=80", 
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&q=80", 
];

const GRADIENT_OVERLAYS = [
  "linear-gradient(135deg, rgba(99,55,255,0.55) 0%, rgba(236,72,153,0.45) 100%)",
  "linear-gradient(135deg, rgba(6,182,212,0.55) 0%, rgba(59,130,246,0.45) 100%)",
  "linear-gradient(135deg, rgba(245,158,11,0.55) 0%, rgba(239,68,68,0.45) 100%)",
  "linear-gradient(135deg, rgba(16,185,129,0.45) 0%, rgba(6,182,212,0.55) 100%)",
  "linear-gradient(135deg, rgba(236,72,153,0.55) 0%, rgba(245,158,11,0.45) 100%)",
  "linear-gradient(135deg, rgba(59,130,246,0.55) 0%, rgba(99,55,255,0.45) 100%)",
  "linear-gradient(135deg, rgba(239,68,68,0.45) 0%, rgba(236,72,153,0.55) 100%)",
  "linear-gradient(135deg, rgba(6,182,212,0.45) 0%, rgba(16,185,129,0.55) 100%)",
  "linear-gradient(135deg, rgba(99,55,255,0.45) 0%, rgba(6,182,212,0.55) 100%)",
  "linear-gradient(135deg, rgba(245,158,11,0.45) 0%, rgba(16,185,129,0.55) 100%)",
  "linear-gradient(135deg, rgba(239,68,68,0.55) 0%, rgba(245,158,11,0.45) 100%)",
  "linear-gradient(135deg, rgba(99,55,255,0.55) 0%, rgba(59,130,246,0.45) 100%)",
  "linear-gradient(135deg, rgba(16,185,129,0.55) 0%, rgba(99,55,255,0.45) 100%)",
  "linear-gradient(135deg, rgba(236,72,153,0.45) 0%, rgba(59,130,246,0.55) 100%)",
  "linear-gradient(135deg, rgba(6,182,212,0.55) 0%, rgba(245,158,11,0.45) 100%)",
  "linear-gradient(135deg, rgba(59,130,246,0.45) 0%, rgba(16,185,129,0.55) 100%)",
  "linear-gradient(135deg, rgba(245,158,11,0.55) 0%, rgba(99,55,255,0.45) 100%)",
  "linear-gradient(135deg, rgba(239,68,68,0.45) 0%, rgba(6,182,212,0.55) 100%)",
  "linear-gradient(135deg, rgba(99,55,255,0.45) 0%, rgba(236,72,153,0.55) 100%)",
  "linear-gradient(135deg, rgba(16,185,129,0.45) 0%, rgba(245,158,11,0.55) 100%)",
  "linear-gradient(135deg, rgba(236,72,153,0.55) 0%, rgba(239,68,68,0.45) 100%)",
  "linear-gradient(135deg, rgba(59,130,246,0.55) 0%, rgba(6,182,212,0.45) 100%)",
];

function Panel({
  index,
  total,
  waveY,
  scaleY,
  onClick,
}: {
  index: number;
  total: number;
  waveY: any;
  scaleY: any;
  onClick: () => void;
}) {
  const t = index / (total - 1);
  const baseZ = (index - (total - 1)) * Z_SPREAD;

  const w = 200 + t * 80;
  const h = 280 + t * 120;

  const opacity = 0.25 + t * 0.75;
  const imageUrl = PANEL_IMAGES[index % PANEL_IMAGES.length];
  const gradient = GRADIENT_OVERLAYS[index % GRADIENT_OVERLAYS.length];

  return (
    <motion.button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="absolute rounded-xl pointer-events-auto overflow-hidden group/panel cursor-pointer"
      style={{
        width: w,
        height: h,
        marginLeft: -w / 2,
        marginTop: -h / 2,
        translateZ: baseZ,
        y: waveY,
        scaleY,
        transformOrigin: "bottom center",
        opacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: gradient,
          mixBlendMode: "multiply",
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/60 group-hover/panel:via-black/40 group-hover/panel:to-black/80 transition-all duration-500"
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          border: `1px solid rgba(255,255,255,${0.08 + t * 0.22})`,
          boxSizing: "border-box",
        }}
      />
      
      <div className="absolute inset-0 flex flex-col items-center justify-between p-6">
        <div className="w-full flex justify-between items-start">
            <span className="text-[10px] tracking-widest text-white/40 uppercase font-mono group-hover/panel:text-[#CCFF00] transition-colors">
                {DOMAINS[index % DOMAINS.length].health} Health
            </span>
            <div className="w-2 h-2 rounded-full bg-[#CCFF00] shadow-[0_0_10px_#CCFF00] group-hover/panel:scale-150 transition-transform" />
        </div>
        
        <div className="w-full text-center space-y-1 transform group-hover/panel:scale-110 transition-transform duration-500">
            <h3 className="text-white font-black tracking-tighter text-2xl uppercase italic">
              {DOMAINS[index % DOMAINS.length].id}
            </h3>
            <div className="flex flex-col items-center">
                <span className="text-[#CCFF00] text-lg font-black leading-none">
                    {DOMAINS[index % DOMAINS.length].count}
                </span>
                <span className="text-white/40 text-[8px] font-bold tracking-[0.3em] uppercase">
                    Skills Verified
                </span>
            </div>
            <p className="text-white/60 text-[9px] uppercase tracking-wider mt-2 line-clamp-1">
                {DOMAINS[index % DOMAINS.length].label}
            </p>
        </div>
      </div>
    </motion.button>
  );
}

export function StackedPanels() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedDomain, setSelectedDomain] = useState<typeof DOMAINS[0] | null>(null);

  const waveYSprings = Array.from({ length: PANEL_COUNT }, () =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSpring(0, WAVE_SPRING)
  );

  const scaleYSprings = Array.from({ length: PANEL_COUNT }, () =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSpring(1, WAVE_SPRING)
  );

  const rotY = useSpring(-42, SCENE_SPRING);
  const rotX = useSpring(18, SCENE_SPRING);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (selectedDomain) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const cx = (e.clientX - rect.left) / rect.width;
      const cy = (e.clientY - rect.top) / rect.height;

      rotY.set(-42 + (cx - 0.5) * 14);
      rotX.set(18 + (cy - 0.5) * -10);

      const cursorCardPos = cx * (PANEL_COUNT - 1);

      waveYSprings.forEach((spring, i) => {
        const dist = Math.abs(i - cursorCardPos);
        const influence = Math.exp(-(dist * dist) / (2 * SIGMA * SIGMA));
        spring.set(-influence * 70);
      });

      scaleYSprings.forEach((spring, i) => {
        const dist = Math.abs(i - cursorCardPos);
        const influence = Math.exp(-(dist * dist) / (2 * SIGMA * SIGMA));
        spring.set(0.35 + influence * 0.65);
      });
    },
    [rotY, rotX, waveYSprings, scaleYSprings, selectedDomain]
  );

  const handleMouseLeave = useCallback(() => {
    if (selectedDomain) return;
    rotY.set(-42);
    rotX.set(18);
    waveYSprings.forEach((s) => s.set(0));
    scaleYSprings.forEach((s) => s.set(1));
  }, [rotY, rotX, waveYSprings, scaleYSprings, selectedDomain]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[600px] flex items-center justify-center select-none"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        animate={{ 
          filter: selectedDomain ? "blur(10px) brightness(0.3)" : "blur(0px) brightness(1)",
          scale: selectedDomain ? 0.9 : 1
        }}
        style={{
          rotateY: rotY,
          rotateX: rotX,
          transformStyle: "preserve-3d",
          position: "relative",
          width: 0,
          height: 0,
        }}
      >
        {DOMAINS.map((_, i) => (
          <Panel
            key={i}
            index={i}
            total={PANEL_COUNT}
            waveY={waveYSprings[i]}
            scaleY={scaleYSprings[i]}
            onClick={() => setSelectedDomain(DOMAINS[i])}
          />
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedDomain && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-8"
          >
            <div className="bg-black/80 backdrop-blur-3xl border border-white/20 w-full max-w-2xl rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#CCFF00]" />
                
                <button 
                    onClick={() => setSelectedDomain(null)}
                    className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors uppercase text-[10px] tracking-widest font-black"
                >
                    [ Close Audit ]
                </button>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-full md:w-1/3 space-y-6">
                        <div className="space-y-1">
                            <span className="text-[10px] text-[#CCFF00] font-mono uppercase tracking-[0.3em]">Domain Code</span>
                            <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase">{selectedDomain.id}</h2>
                        </div>
                        
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <span className="text-[8px] text-white/40 uppercase tracking-widest font-bold">Health Audit Status</span>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="w-3 h-3 rounded-full bg-[#CCFF00] shadow-[0_0_10px_#CCFF00]" />
                                <span className="text-lg font-black text-white">{selectedDomain.health} VERIFIED</span>
                            </div>
                        </div>

                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <span className="text-[8px] text-white/40 uppercase tracking-widest font-bold">Skill Count</span>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-3xl font-black text-[#CCFF00]">{selectedDomain.count}</span>
                                <span className="text-[10px] text-white/60 leading-tight uppercase font-bold">Active<br/>Modules</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-2/3 space-y-6">
                        <div className="space-y-4">
                            <span className="text-[10px] text-white/40 font-mono uppercase tracking-[0.3em]">Skill Manifest</span>
                            <div className="grid grid-cols-1 gap-2">
                                {selectedDomain.skills?.map((skill, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center justify-between bg-white/5 px-4 py-3 rounded-xl border border-white/5 group hover:bg-[#CCFF00]/10 hover:border-[#CCFF00]/30 transition-all cursor-default"
                                    >
                                        <span className="text-sm font-bold text-white group-hover:text-[#CCFF00]">{skill}</span>
                                        <div className="text-[8px] text-white/20 uppercase tracking-widest font-mono">0x{Math.floor(Math.random() * 1000).toString(16).padStart(4, '0')}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <p className="text-zinc-500 text-xs leading-relaxed uppercase tracking-wider font-medium">
                            {selectedDomain.label}. This domain represents a core pillar of the Antigravity Skills Nexus, audited at {selectedDomain.health} health.
                        </p>
                    </div>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
