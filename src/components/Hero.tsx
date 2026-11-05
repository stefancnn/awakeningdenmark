import { ArrowRight, Flame } from 'lucide-react';
import copenhagenFlagImg from '../assets/images/copenhagen_denmark_flag_1793874884867.jpg';

interface HeroProps {
  onOpenWaitlist: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenWaitlist }) => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[88vh] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
      {/* Background Image: Authentic Copenhagen Nyhavn with the Danish flag (Dannebrog) */}
      <div className="absolute inset-0 z-0">
        <img
          src={copenhagenFlagImg}
          alt="Copenhagen Nyhavn harbor with Danish flag waving under clear skies"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* High contrast gradient scrim for pristine legibility on mobile and desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-900/60" />
      </div>

      {/* Danish Red Accent Bar */}
      <div className="absolute inset-x-0 top-0 h-1 bg-red-600" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center flex flex-col items-center">


        {/* Clean, Massive Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-[1.05] text-white max-w-4xl">
          <span className="text-red-500 block">DENMARK,</span>
          <span className="text-white block mt-1">THE TIME IS NOW</span>
        </h1>

        {/* Concise, Straight to the Point Calling */}
        <p className="mt-6 max-w-2xl text-base sm:text-xl text-slate-200 font-normal leading-relaxed text-balance">
          A nationwide Christian movement to ignite the Church, equip everyday believers to share the gospel, commission evangelists, and see Denmark turn to Jesus.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenWaitlist}
            className="w-full sm:w-auto px-8 py-4 text-base sm:text-lg font-bold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-xl shadow-lg shadow-red-700/40 transition-all flex items-center justify-center gap-2 group cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-red-400"
          >
            <Flame className="w-5 h-5 fill-white" />
            <span>Join the Waitlist Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#the-plan"
            className="w-full sm:w-auto px-7 py-4 text-base font-semibold text-white bg-white/15 hover:bg-white/25 border border-white/25 rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>See The 4-Step Plan</span>
          </a>
        </div>

        {/* Concise Stat Row - Mobile Optimized */}
        <div className="mt-12 w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-white/10 backdrop-blur-md text-left">
          <div className="p-2 sm:p-3">
            <span className="text-xs uppercase font-medium text-slate-400 block">Nation</span>
            <span className="text-xl sm:text-2xl font-black text-white font-mono tabular-nums">5.9M</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Danish population</span>
          </div>
          <div className="p-2 sm:p-3 border-l border-white/10">
            <span className="text-xs uppercase font-medium text-red-400 block">Unreached</span>
            <span className="text-xl sm:text-2xl font-black text-red-400 font-mono tabular-nums">98.2%</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Outside living faith</span>
          </div>
          <div className="p-2 sm:p-3 border-l border-white/10">
            <span className="text-xs uppercase font-medium text-emerald-400 block">Active Believers</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono tabular-nums">&lt; 2%</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">~106,000 Christians</span>
          </div>
          <div className="p-2 sm:p-3 border-l border-white/10">
            <span className="text-xs uppercase font-medium text-amber-400 block">Launch</span>
            <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono tabular-nums">June &apos;27</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Copenhagen</span>
          </div>
        </div>

      </div>
    </section>
  );
};
