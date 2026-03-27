import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { FullScreenScrollFX, type FullScreenFXAPI } from "./ui/full-screen-scroll-fx";
import { SovereignInstallation } from "./ui/sovereign-installation";
import { GlobalHealthPulse } from "./GlobalHealthPulse";
import Footer from "./ui/animated-footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { X, ExternalLink, ShieldCheck, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DOMAINS = [
  {
    id: "AGENT",
    title: "Intelligence & Orchestration",
    skills: 38,
    health: 100,
    bg: "/assets/agent.png",
    description: "Core intelligence layers, agentic loops, and multi-agent coordination systems.",
    manifest: ["Minimax AI", "Reasoning Engines", "Tool Orchestrators", "Memory Buffers"],
  },
  {
    id: "UI",
    title: "Experience & Premium Frontend",
    skills: 42,
    health: 100,
    bg: "/assets/ui.png",
    description: "High-fidelity design systems, GSAP animations, and glassmorphism architectures.",
    manifest: ["Shadcn/UI", "Framer Motion", "GSAP Core", "Radix Primitives"],
  },
  {
    id: "INFRA",
    title: "Cloud & Sovereign Systems",
    skills: 31,
    health: 100,
    bg: "/assets/infra.png",
    description: "Edge computing, container orchestration, and sovereign cloud deployment.",
    manifest: ["AWS/Azure Hub", "Vercel Edge", "Docker Engine", "Terraform Provider"],
  },
  {
    id: "DATA",
    title: "Engineering & Intelligence",
    skills: 29,
    health: 100,
    bg: "/assets/data.png",
    description: "Vector databases, ETL pipelines, and real-time semantic processing.",
    manifest: ["Pinecone RAG", "Supabase DB", "Data Streams", "Semantic Search"],
  },
  {
    id: "BACKEND",
    title: "API & Server-Side Systems",
    skills: 34,
    health: 100,
    bg: "/assets/backend.png",
    description: "Distributed architectures, microservices, and serverless logic layers.",
    manifest: ["Node.js Core", "gRPC / Protobuf", "Auth Gateways", "Event Bus"],
  },
  {
    id: "MOBILE",
    title: "Native & Cross-Platform",
    skills: 27,
    health: 100,
    bg: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2000&auto=format&fit=crop",
    description: "SwiftUI, Flutter, and cross-platform mobile agent integration.",
    manifest: ["SwiftUI / iOS", "Flutter Engine", "Mobile SDK", "Native Bridge"],
  },
  {
    id: "DEVOPS",
    title: "CI/CD & System Quality",
    skills: 30,
    health: 100,
    bg: "https://images.unsplash.com/photo-1664447972810-2c0c0def4de6?q=80&w=2000&auto=format&fit=crop",
    description: "Automated testing, security scanning, and deployment pipelines.",
    manifest: ["GitHub Actions", "Playwright QA", "Security Audit", "Health Check"],
  },
  {
    id: "PRODUCT",
    title: "Strategy & GTM Excellence",
    skills: 25,
    health: 100,
    bg: "/assets/product.png",
    description: "Market intelligence, PRD automation, and roadmap orchestration.",
    manifest: ["PRD Generator", "GTM Strategy", "Competitor Audit", "Roadmap AI"],
  },
  {
    id: "DOCS",
    title: "Technical Writing & Specs",
    skills: 22,
    health: 100,
    bg: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=2000&auto=format&fit=crop",
    description: "LLM-assisted documentation, architecture diagrams, and system specs.",
    manifest: ["Mermaid Engine", "Technical PRDs", "API Docs", "System Maps"],
  },
  {
    id: "MCP",
    title: "Ecosystem Protocols",
    skills: 18,
    health: 100,
    bg: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop",
    description: "Model Context Protocol servers, tool integration, and discovery.",
    manifest: ["MCP Core", "Server Registry", "Tool Mapping", "Context Bus"],
  },
  {
    id: "OS",
    title: "Utilities & Lifecycle",
    skills: 40,
    health: 100,
    bg: "/assets/os.png",
    description: "Core system utilities, filesystem agents, and lifecycle management.",
    manifest: ["CLI Tools", "File Watcher", "Process Manager", "System Hooks"],
  },
  {
    id: "LABS",
    title: "Frontier Research",
    skills: 21,
    health: 100,
    bg: "/assets/labs.png",
    description: "Experimental agents, multi-modal reasoning, and future-tech audits.",
    manifest: ["Neuro-Symbolic", "Multi-Modal", "Zero-Shot Audit", "Alpha R&D"],
  },
];

const Demo: React.FC = () => {
    const [selectedDomain, setSelectedDomain] = useState<typeof DOMAINS[0] | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const fxApiRef = useRef<FullScreenFXAPI>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 1.5,
            smoothWheel: true,
            syncTouch: true,
        });

        // Sync ScrollTrigger with Lenis
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
        };
    }, []);

    const sections = DOMAINS.map((domain) => ({
      id: domain.id,
      background: domain.bg,
      leftLabel: (
        <div className="flex flex-col">
          <span className="text-[10px] opacity-50 tracking-widest uppercase">Certified</span>
          <span className="text-2xl font-black text-[#CCFF00] italic">{domain.skills}</span>
        </div>
      ),
      title: domain.id,
      rightLabel: (
        <div className="flex flex-col items-end">
          <span className="text-[10px] opacity-50 tracking-widest uppercase">Verified</span>
          <span className="text-2xl font-black text-white italic">{domain.health}%</span>
        </div>
      ),
    }));

    return (
        <div className="bg-[#050505] text-white selection:bg-[#CCFF00]/30 min-h-screen">
            <GlobalHealthPulse />

            {/* Cinematic Explorer Section */}
            <FullScreenScrollFX
              apiRef={fxApiRef}
              sections={sections}
              currentIndex={activeIndex}
              onIndexChange={setActiveIndex}
              header={
                <div className="text-center pt-24 pointer-events-none">
                  <h2 className="text-[10px] tracking-[0.5em] uppercase opacity-70 mb-4 font-black">Architectural Dominion</h2>
                  <p className="text-xs italic opacity-40 px-4 max-w-xl mx-auto uppercase tracking-widest">
                    Transverse through the 12 sovereign layers of the Antigravity Skills Nexus. 
                  </p>
                </div>
              }
              footer={
                <div className="pb-12 text-center pointer-events-auto">
                  <button 
                    onClick={() => setSelectedDomain(DOMAINS[activeIndex])}
                    className="group relative px-12 py-4 bg-white/5 border border-white/10 hover:border-[#CCFF00]/50 rounded-full transition-all duration-500 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#CCFF00]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[#CCFF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    <span className="text-[10px] tracking-[0.3em] font-black uppercase flex items-center gap-2">
                      <Zap className="w-3 h-3 text-[#CCFF00]" />
                      Deep Audit manifest
                    </span>
                  </button>
                </div>
              }
              colors={{
                text: "#fff",
                overlay: "rgba(0,0,0,0.6)",
                pageBg: "#050505",
                stageBg: "#050505"
              }}
            />

            {/* Level 5: The Threshold (Installation) */}
            <section id="installation" className="bg-[#050505] py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5">
              <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                  <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic text-white leading-none">
                    SOVEREIGN <span className="text-[#CCFF00]">DEPLOYMENT</span>
                  </h2>
                  <p className="text-zinc-500 max-w-2xl text-sm tracking-[0.2em] uppercase leading-relaxed mt-6">
                    Initialize the full 12-domain Nexus into your local environment. 
                    One-click provisioning with real-time audit logs.
                  </p>
                </div>
                <SovereignInstallation />
              </div>
            </section>

            {/* Level 6: The Footer */}
            <Footer 
                leftLinks={[
                    { href: "#", label: "Alpha 100 Protocol" },
                    { href: "#", label: "Sovereignty Node" },
                ]}
                rightLinks={[
                    { href: "#", label: "Discord" },
                    { href: "#", label: "Github" },
                    { href: "#", label: "Documentation" },
                ]}
                copyrightText="ANTIGRAVITY SKILLS NEXUS v2.0 - ALPHA 100 SOVEREIGNTY"
                barCount={32}
            />

            {/* Domain Audit Modal */}
            <AnimatePresence>
              {selectedDomain && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedDomain(null)}
                    className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
                  />
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 30 }}
                    className="relative w-full max-w-3xl bg-zinc-900 shadow-[0_0_100px_rgba(204,255,0,0.1)] border border-white/10 p-12 rounded-[2rem] overflow-hidden"
                  >
                    {/* Interior gradient */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-[#CCFF00]/5 blur-[120px] -translate-x-1/2 -translate-y-1/2" />

                    <div className="absolute top-0 right-0 p-8">
                      <button
                        onClick={() => setSelectedDomain(null)}
                        className="p-3 hover:bg-white/5 rounded-full transition-colors border border-white/10 group"
                      >
                        <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                      </button>
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-6 mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#CCFF00] to-[#CCFF00]/50 rounded-3xl flex items-center justify-center">
                          <ShieldCheck className="w-10 h-10 text-black" />
                        </div>
                        <div>
                          <h3 className="text-6xl font-black tracking-tighter uppercase italic leading-none">{selectedDomain.id}</h3>
                          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.5em] block mt-2">{selectedDomain.title}</span>
                        </div>
                      </div>
                      
                      <p className="text-zinc-400 text-lg leading-relaxed mb-12 max-w-2xl">{selectedDomain.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                          <h4 className="text-[10px] tracking-[0.3em] font-black uppercase text-zinc-500 mb-6 flex items-center gap-2">
                             <span className="w-4 h-px bg-zinc-800" /> Skill Manifest
                          </h4>
                          <div className="grid grid-cols-1 gap-4">
                            {selectedDomain.manifest.map((skill) => (
                              <div key={skill} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl group hover:border-[#CCFF00]/50 transition-colors">
                                <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">{skill}</span>
                                <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-[#CCFF00] transition-colors" />
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-[10px] tracking-[0.3em] font-black uppercase text-zinc-500 mb-6 flex items-center gap-2">
                            <span className="w-4 h-px bg-zinc-800" /> Domain Vitals
                          </h4>
                          <div className="space-y-6">
                            <div className="p-6 bg-black/50 rounded-2xl border border-white/5 relative overflow-hidden group">
                              <div className="absolute right-0 top-0 w-32 h-32 bg-[#CCFF00]/5 blur-[60px]" />
                              <div className="flex justify-between items-end">
                                <div>
                                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">Health Score</span>
                                  <span className="text-4xl font-black text-white italic">100<span className="text-[#CCFF00]">/</span>100</span>
                                </div>
                                <div className="text-right">
                                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">Verified Nodes</span>
                                  <span className="text-4xl font-black text-[#CCFF00] italic">{selectedDomain.skills}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 px-6 py-4 bg-[#CCFF00] text-black rounded-xl font-black uppercase text-[10px] tracking-widest justify-center cursor-pointer hover:bg-white transition-colors">
                              Download Documentation Package
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
        </div>
    );
};

export default Demo;
