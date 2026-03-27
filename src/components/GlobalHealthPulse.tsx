import React from 'react';

export function GlobalHealthPulse() {
  return (
    <div className="container mx-auto px-8 pt-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 border-y border-white/5 py-8 bg-white/5 backdrop-blur-sm rounded-3xl px-8 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#CCFF00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        <div className="flex flex-col relative z-10">
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Total Skills</span>
          <span className="text-4xl font-black text-[#CCFF00] tracking-tighter italic">363</span>
        </div>
        
        <div className="flex flex-col relative z-10">
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Health Score</span>
          <span className="text-4xl font-black text-white tracking-tighter italic">
            100<span className="text-[#CCFF00]">/</span>100
          </span>
        </div>
        
        <div className="flex flex-col relative z-10">
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Verified Domains</span>
          <span className="text-4xl font-black text-white tracking-tighter italic">12</span>
        </div>
        
        <div className="flex flex-col relative z-10">
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Library Status</span>
          <span className="text-4xl font-black text-[#CCFF00] tracking-tighter italic uppercase">Elite</span>
        </div>
      </div>
    </div>
  );
}
