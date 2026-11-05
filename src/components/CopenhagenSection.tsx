import React from 'react';
import { MapPin, Calendar, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import cphFlagImg from '../assets/images/copenhagen_denmark_flag_1793874884867.jpg';

interface CopenhagenSectionProps {
  onOpenWaitlist: () => void;
}

export const CopenhagenSection: React.FC<CopenhagenSectionProps> = ({ onOpenWaitlist }) => {
  return (
    <section id="copenhagen" className="py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 font-bold text-xs uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>The First Gathering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 uppercase">
            Copenhagen: The Epicenter
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Every movement has a starting place. We are gathering in Denmark&apos;s capital city to launch this national fire.
          </p>
        </div>

        {/* Copenhagen Launch Card - Honest, Authentic, Mobile-Friendly */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left: Authentic Copenhagen Photo with Danish Flag */}
            <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-auto min-h-[300px]">
              <img
                src={cphFlagImg}
                alt="Authentic Copenhagen Nyhavn harbor with the Danish flag Dannebrog gently waving"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-mono text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>Copenhagen, Denmark</span>
              </div>
            </div>

            {/* Right: Key Details & Confirmation Notice */}
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold font-mono mb-4">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Important Notice on Dates</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 leading-tight">
                  Last Week of June 2027
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-1 mb-4">
                  Dates and venue to be officially confirmed
                </p>

                <p className="text-sm text-slate-700 leading-relaxed mb-6">
                  The movement launches with the first Fire Camp in Copenhagen during the final week of June 2027. We are coordinating with local Danish church networks and international leaders to finalize dates and location.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>Accessible central Copenhagen location with public transit links (Metro & S-Tog).</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>Uniting believers and pastors from Copenhagen, Jutland, and across the nation.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>Waitlist members receive priority 48-hour early notification when registration opens.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <button
                  onClick={onOpenWaitlist}
                  className="w-full sm:w-auto px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Join Priority Waitlist</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Late June 2027</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
