import React from 'react';
import { MapPin, Calendar, Clock, Navigation, CheckCircle2 } from 'lucide-react';

interface CopenhagenSectionProps {
  onOpenWaitlist: () => void;
}

export const CopenhagenSection: React.FC<CopenhagenSectionProps> = ({ onOpenWaitlist }) => {
  const cities = [
    { name: 'Copenhagen', role: 'Phase 1: Epicenter & Fire Camp', date: 'Late June 2027 (Dates TBC)', active: true },
    { name: 'Aarhus', role: 'Phase 2: Jutland Regional Awakening', active: false },
    { name: 'Odense', role: 'Phase 3: Central Island Harvest', active: false },
    { name: 'Aalborg', role: 'Phase 4: North Jutland Saturation', active: false },
  ];

  return (
    <section id="copenhagen" className="py-24 bg-neutral-900 border-t border-neutral-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-widest mb-3">
            <Navigation className="w-4 h-4" />
            <span>Launch City & Timeline</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            Copenhagen: The First Spark
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
            Every movement has a birthplace. Denmark&apos;s historic capital of 1.4 million people is where we kick off the first wave this summer.
          </p>
        </div>

        {/* Highlight Card */}
        <div className="bg-neutral-950 rounded-3xl border border-neutral-800 p-8 sm:p-12 mb-16 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase mb-4">
                <Clock className="w-3.5 h-3.5" />
                <span>Notice on Dates</span>
              </div>
              
              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
                Target: Last Week of June 2027
              </h3>
              
              <p className="text-neutral-300 text-base leading-relaxed mb-6">
                Our team is working in direct coordination with Copenhagen city venues, Danish church networks, and Christ for All Nations global itinerary leaders. <strong>The planned window is the final week of June 2027, with exact daily schedule and venues to be officially confirmed shortly.</strong>
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0" />
                  <span>Central Copenhagen location with seamless public transit access (Metro & S-Tog)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0" />
                  <span>Subsidized student and youth registration tiers to ensure accessibility</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0" />
                  <span>Waitlist members receive priority 48-hour early ticket window before public launch</span>
                </div>
              </div>

              <button
                onClick={onOpenWaitlist}
                className="px-6 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-red-900/40 inline-flex items-center gap-2"
              >
                <span>Reserve Your Waitlist Spot</span>
              </button>
            </div>

            <div className="lg:col-span-5 bg-neutral-900/80 p-6 sm:p-8 rounded-2xl border border-neutral-800">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Nationwide Campaign Roadmap</span>
              </h4>
              <div className="space-y-4">
                {cities.map((city, idx) => (
                  <div 
                    key={idx}
                    className={`p-4 rounded-xl border transition-all ${
                      city.active 
                        ? 'bg-neutral-950 border-red-500/60 shadow-lg shadow-red-950/50' 
                        : 'bg-neutral-900 border-neutral-800/80 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-base text-white">{city.name}</span>
                      <span className={`text-xs font-mono ${city.active ? 'text-red-400 font-bold' : 'text-neutral-500'}`}>
                        {city.active ? 'CONFIRMED FIRST STOP' : 'UPCOMING'}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-300">{city.role}</div>
                    {city.date && (
                      <div className="text-xs text-neutral-400 mt-1 flex items-center gap-1 font-mono">
                        <Calendar className="w-3 h-3 text-neutral-500" />
                        <span>{city.date}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
