import React from 'react';
import { Compass, Users, AlertCircle, Heart } from 'lucide-react';
import youthRevivalImg from '../assets/images/denmark_revival_youth_1793874020156.jpg';

export const DenmarkReality: React.FC = () => {
  return (
    <section id="reality" className="py-16 sm:py-24 bg-slate-50 border-t border-b border-slate-200 text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Straight to the point */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 font-bold text-xs uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>The Reality in Denmark</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 uppercase">
            Europe&apos;s Forgotten Mission Field
          </h2>
        </div>

        {/* Visual Graph & Data Grid - Mobile-First */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-10">
          
          {/* Card 1: Donut Chart - Responsive & Clean */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              {/* Clean SVG Donut Chart */}
              <div className="flex flex-col sm:flex-row items-center gap-6 my-4">
                <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120" aria-label="Donut chart showing 98.2% unreached population">
                    {/* Background Circle */}
                    <circle
                      cx="60"
                      cy="60"
                      r="48"
                      className="text-slate-100"
                      strokeWidth="16"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    {/* 98.2% Unreached (Danish Red) */}
                    <circle
                      cx="60"
                      cy="60"
                      r="48"
                      stroke="#dc2626"
                      strokeWidth="16"
                      strokeDasharray="301.6"
                      strokeDashoffset="5.4"
                      strokeLinecap="round"
                      fill="transparent"
                    />
                    {/* 1.8% Active Believers (Emerald) */}
                    <circle
                      cx="60"
                      cy="60"
                      r="48"
                      stroke="#10b981"
                      strokeWidth="16"
                      strokeDasharray="301.6"
                      strokeDashoffset="296.2"
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  
                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight tabular-nums">98.2%</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Unreached</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="space-y-3 w-full text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0" />
                      <span className="font-bold text-slate-900">Without Living Faith</span>
                    </div>
                    <div className="flex justify-between text-slate-500 text-[11px] font-mono">
                      <span>98.2% of citizens</span>
                      <span className="font-bold text-red-600">~5,790,000</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                      <span className="font-bold text-slate-900">Active Bible Believers</span>
                    </div>
                    <div className="flex justify-between text-slate-500 text-[11px] font-mono">
                      <span>&lt; 2.0% in church</span>
                      <span className="font-bold text-emerald-600">~106,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>National Ratio:</span>
              <span className="font-bold text-red-600 font-mono">Only 1 Christian per 55 Danes</span>
            </div>
          </div>

          {/* Card 2: Cultural Heritage vs Personal Living Faith */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Most Danish citizens are enrolled at birth in the Folkekirken (state church), yet less than 2% hold personal faith in Jesus or attend weekly fellowship.
              </p>

              {/* Visual Bars */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-700">Nominal State Church Membership</span>
                    <span className="font-mono text-slate-900 font-bold">72.1% (~4.25M)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-slate-400 rounded-full" style={{ width: '72.1%' }} />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Cultural tradition; passive membership</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-red-700 font-bold">Personal Living Faith & Regular Fellowship</span>
                    <span className="font-mono text-red-600 font-bold">&lt; 1.8% (~106K)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-red-600 rounded-full" style={{ width: '1.8%' }} />
                  </div>
                  <span className="text-[10px] text-red-600 font-medium mt-1 block">Personal relationship with Jesus Christ</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-center">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-lg font-black text-slate-900 font-mono">1 / 20,000</div>
                <div className="text-[10px] text-slate-500 uppercase mt-0.5">Church to Citizen Ratio</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-lg font-black text-emerald-600 font-mono">High</div>
                <div className="text-[10px] text-slate-500 uppercase mt-0.5">Youth Spiritual Hunger</div>
              </div>
            </div>
          </div>

        </div>

        {/* Authentic Photo Card - Grounded in Reality */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white grid grid-cols-1 md:grid-cols-12 items-center shadow-sm">
          <div className="md:col-span-5 h-56 sm:h-64 md:h-full relative">
            <img
              src={youthRevivalImg}
              alt="Young Christians praying and worshiping together in Copenhagen"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="md:col-span-7 p-6 sm:p-8 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 fill-red-600" />
              <span>A Generation Ready for Truth</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950">
              Young Danes Are Hungry for Authentic Faith
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Material prosperity has not filled the spiritual void. Across Copenhagen and Danish universities, young people are seeking genuine truth, deep community, and real encounter with God.
            </p>
            <div className="pt-1 text-xs text-slate-500 italic">
              &ldquo;The harvest is plentiful, but the workers are few. Ask the Lord of the harvest to send out workers into His harvest field.&rdquo; — Luke 10:2
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
