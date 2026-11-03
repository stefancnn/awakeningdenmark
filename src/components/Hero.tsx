import React from 'react';
import { ArrowRight, Flame } from 'lucide-react';

interface HeroProps {
  onOpenWaitlist: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenWaitlist }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-neutral-950">
      {/* Background Image: Copenhagen Nyhavn with dramatic Nordic sky & subtle Danish flag banner */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/denmark_copenhagen_hero_1793697122410.jpg"
          alt="Copenhagen waterfront at sunset with Danish flag motif in the sky"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark gradient scrims for WCAG 4.5:1 text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/75 to-neutral-950/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-neutral-950/50 to-neutral-950" />
      </div>

      {/* Danish Flag Accent Glow Lines */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        
        {/* 3D Headline */}
        <div className="relative mb-6 select-none">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[0.95] text-white">
            <span className="block text-red-500 text-3d-flag">DENMARK,</span>
            <span className="block text-3d-white text-neutral-100 mt-1">THE TIME IS NOW</span>
          </h1>
        </div>

        {/* Subtitle / Core Calling */}
        <p className="max-w-3xl text-lg sm:text-xl md:text-2xl text-neutral-200 font-normal leading-relaxed mb-10 text-balance">
          A nationwide harvest is beginning. We are equipping every believer to witness, 
          setting apart bold evangelists, commissioning pastors to shepherd the fruit, 
          and building historic campaigns to unite the Church of Denmark.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenWaitlist}
            className="w-full sm:w-auto px-8 py-4 text-base sm:text-lg font-bold text-white bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-xl shadow-2xl shadow-red-700/50 hover:shadow-red-600/60 transition-all flex items-center justify-center gap-3 group focus:outline-none focus-visible:ring-4 focus-visible:ring-red-400"
          >
            <Flame className="w-5 h-5 text-white fill-white group-hover:scale-110 transition-transform" />
            <span>Join The Waitlist Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#the-plan"
            className="w-full sm:w-auto px-7 py-4 text-base font-semibold text-neutral-200 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 rounded-xl backdrop-blur-sm transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
          >
            <span>See The 4-Step Plan</span>
          </a>
        </div>

        {/* High-Impact Stat Strip (60-30-10 distribution) */}
        <div className="mt-16 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 backdrop-blur-xl shadow-2xl">
          <div className="text-center p-3">
            <div className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">5.9M</div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-medium">Population</div>
          </div>
          <div className="text-center p-3 border-l border-neutral-800">
            <div className="text-2xl sm:text-3xl font-black text-red-500 font-mono tabular-nums">&lt; 2%</div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-medium">Active Believers</div>
          </div>
          <div className="text-center p-3 border-l border-neutral-800">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tabular-nums">4 Steps</div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-medium">National Strategy</div>
          </div>
          <div className="text-center p-3 border-l border-neutral-800">
            <div className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">June &apos;27</div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-medium">Copenhagen Launch</div>
          </div>
        </div>

      </div>

      {/* Subtle Bottom Divider */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none" />
    </section>
  );
};
