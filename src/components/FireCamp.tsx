import React from 'react';
import { Flame, ArrowRight, CheckCircle2, Shield, HeartHandshake, MapPin, Calendar } from 'lucide-react';
import cfanCrusadeImg from '../assets/images/cfan_gospel_crusade_1793697137949.jpg';
import streetEvangelismImg from '../assets/images/fire_camp_evangelism_1793697124075.jpg';

interface FireCampProps {
  onOpenWaitlist: () => void;
}

export const FireCamp: React.FC<FireCampProps> = ({ onOpenWaitlist }) => {
  const fireCampFeatures = [
    'Overcome the fear of man and receive Holy Spirit boldness.',
    'Master practical, loving 1-on-1 gospel conversation frameworks.',
    'Step out onto the streets of Copenhagen alongside seasoned leaders to preach Christ and pray for the sick.',
    'Nightly gatherings of extended worship, intercession, and spiritual impartation.',
    'Return to your local church empowered for a lifetime of fruitful soul-winning.',
  ];

  return (
    <section id="fire-camp" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Red accent line */}
      <div className="absolute inset-x-0 top-0 h-1 bg-red-600" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-800 text-red-400 font-bold text-xs uppercase tracking-wider mb-4">
            <Flame className="w-4 h-4 fill-red-500 text-red-500" />
            <span>The First Step</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-tight">
            Fire Camp <span className="text-red-500">Copenhagen</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            The national spark begins in Copenhagen this summer in partnership with <strong>Christ for All Nations (CfaN)</strong>.
          </p>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* ABOUT CHRIST FOR ALL NATIONS (Authentic Crusade Photo)         */}
        {/* ------------------------------------------------------------- */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Real CfaN Crusade Photo */}
            <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-96">
              <img
                src={cfanCrusadeImg}
                alt="Christ for All Nations mass gospel crusade with hundreds of thousands gathering"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                <span className="font-semibold text-white">Christ for All Nations (CfaN)</span>
                <span className="font-mono font-bold text-red-400 text-sm">100M+ Salvations</span>
              </div>
            </div>

            {/* About Copy */}
            <div className="lg:col-span-5 p-6 sm:p-8 space-y-4">
              <div className="text-xs uppercase tracking-widest font-mono text-red-400 font-bold">
                Strategic Global Partner
              </div>
              <h3 className="text-2xl font-black text-white">
                About Christ for All Nations
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Founded by evangelist Reinhard Bonnke and led today by Daniel Kolenda, Christ for All Nations has recorded <strong>over 100 million documented salvations</strong> worldwide.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Through CfaN Fire Camps across Europe, ordinary believers discover that the same Holy Spirit fire that fills global crusades lives inside everyday believers on the streets of Europe.
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs font-mono text-slate-300 border-t border-slate-800">
                <div>
                  <span className="font-bold text-white text-base block font-mono">100M+</span>
                  <span className="text-[10px] text-slate-400 uppercase">Documented Decisions</span>
                </div>
                <div className="border-l border-slate-800 pl-4">
                  <span className="font-bold text-amber-400 text-base block font-mono">50+ Yrs</span>
                  <span className="text-[10px] text-slate-400 uppercase">Gospel Heritage</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* WHAT WILL HAPPEN AT FIRE CAMP (Direct, Straight to the point)  */}
        {/* ------------------------------------------------------------- */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-10 shadow-xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* List */}
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                Hands-On Spiritual Boot Camp
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                In Fire Camp You Will:
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Fire Camp is not a passive lecture hall. It is an intensive, joyful training ground where theory transforms immediately into real street outreach.
              </p>

              <div className="space-y-3 pt-2">
                {fireCampFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <button
                  onClick={onOpenWaitlist}
                  className="w-full sm:w-auto px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Join the Waitlist Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Late June 2027 · Dates TBC</span>
                </div>
              </div>
            </div>

            {/* Street Outreach Photo */}
            <div className="lg:col-span-5 rounded-xl overflow-hidden border border-slate-800 relative h-72 sm:h-80 shadow-md">
              <img
                src={streetEvangelismImg}
                alt="Young believers praying with people on the streets of Copenhagen"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
