"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SKILLS_LOGS = [
    "INITIALIZING SOVEREIGN HANDSHAKE...",
    "ACCESSING .agents/skills/AGENT [23 verified]",
    "ACCESSING .agents/skills/UI [39 verified]",
    "ACCESSING .agents/skills/INFRA [21 verified]",
    "ACCESSING .agents/skills/DATA [21 verified]",
    "ACCESSING .agents/skills/BACKEND [31 verified]",
    "ACCESSING .agents/skills/MOBILE [11 verified]",
    "ACCESSING .agents/skills/DEVOPS [57 verified]",
    "ACCESSING .agents/skills/PRODUCT [39 verified]",
    "ACCESSING .agents/skills/DOCS [32 verified]",
    "ACCESSING .agents/skills/MCP [38 verified]",
    "ACCESSING .agents/skills/OS [42 verified]",
    "ACCESSING .agents/skills/LABS [9 verified]",
    "VALIDATING CHECKSUMS [363/363 OK]",
    "ENFORCING 100/100 HEALTH SCORE PROTOCOL...",
    "LINKING KERNEL TO NEXUS.CORE...",
    "PROVISIONING SOVEREIGN ENVIRONMENT...",
    "TECHNICAL SOVEREIGNTY ESTABLISHED."
];

export function SovereignInstallation() {
    const [status, setStatus] = useState<'idle' | 'installing' | 'complete'>('idle');
    const [logs, setLogs] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (status === 'installing') {
            let currentLog = 0;
            const interval = setInterval(() => {
                if (currentLog < SKILLS_LOGS.length) {
                    setLogs(prev => [...prev, SKILLS_LOGS[currentLog]]);
                    setProgress(((currentLog + 1) / SKILLS_LOGS.length) * 100);
                    currentLog++;
                } else {
                    clearInterval(interval);
                    setTimeout(() => setStatus('complete'), 1000);
                }
            }, 150);

            return () => clearInterval(interval);
        }
    }, [status]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="relative w-full py-24 px-8 bg-[#050505] flex flex-col items-center justify-center border-y border-white/5">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#0038FF]/5 blur-[120px]" />
            </div>

            <div className="container max-w-4xl relative">
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white">
                        The Threshold
                    </h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto text-sm tracking-widest uppercase leading-relaxed">
                        Provision the entire 363-skill sovereign suite directly into your active Antigravity environment.
                    </p>
                </div>

                <div className="bg-black/40 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                    <AnimatePresence mode="wait">
                        {status === 'idle' && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center py-12"
                            >
                                <button 
                                    onClick={() => setStatus('installing')}
                                    className="group relative px-12 py-6 bg-white text-black font-black text-xl uppercase italic tracking-tighter hover:bg-[#CCFF00] transition-colors duration-500"
                                >
                                    INITIALIZE INSTALLATION
                                    <div className="absolute inset-0 border border-white translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 pointer-events-none" />
                                </button>
                                <span className="mt-8 text-[10px] text-white/40 tracking-[0.5em] uppercase">
                                    Awaiting Handshake Protocol
                                </span>
                            </motion.div>
                        )}

                        {(status === 'installing' || status === 'complete') && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8"
                            >
                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] text-[#CCFF00] font-mono uppercase tracking-widest">
                                            {status === 'installing' ? 'Deploying Sovereign Core...' : 'Installation Complete'}
                                        </span>
                                        <span className="text-white font-mono text-xs">
                                            {Math.round(progress)}%
                                        </span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 overflow-hidden rounded-full">
                                        <motion.div 
                                            className="h-full bg-[#CCFF00]"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>

                                <div 
                                    ref={scrollRef}
                                    className="h-64 bg-black/60 rounded-xl p-6 font-mono text-xs border border-white/5 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-white/10"
                                >
                                    {logs.map((log, i) => (
                                        <motion.div 
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className={i === logs.length - 1 ? "text-[#CCFF00]" : "text-white/60"}
                                        >
                                            <span className="text-white/20 mr-4">[{i.toString().padStart(2, '0')}]</span>
                                            {log}
                                        </motion.div>
                                    ))}
                                    {status === 'complete' && (
                                        <motion.div 
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="mt-8 p-4 border border-[#CCFF00]/20 bg-[#CCFF00]/5 text-[#CCFF00] text-center font-black tracking-widest uppercase"
                                        >
                                            Sovereignty Confirmed: Environment Optimized
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
