import React, { useState } from 'react';
import { Users, Flame, Church, Compass, ArrowRight, X, Check } from 'lucide-react';
import trainingImg from '../assets/images/evangelism_training_cohort_1793874020498.jpg';
import evangelistImg from '../assets/images/fire_camp_evangelism_1793697124075.jpg';
import pastorsImg from '../assets/images/pastors_roundtable_unity_1793874020914.jpg';
import cphFlagImg from '../assets/images/copenhagen_denmark_flag_1793874884867.jpg';

interface ThePlanProps {
  onOpenWaitlist: () => void;
}

interface Pillar {
  num: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  image: string;
  imageAlt: string;
  lead: string;
  points: string[];
  ctaText: string;
}

export const ThePlan: React.FC<ThePlanProps> = ({ onOpenWaitlist }) => {
  const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(null);

  const pillars: Pillar[] = [
    {
      num: '01',
      title: 'Training Every Single Christian',
      subtitle: 'To share the gospel in their everyday sphere of influence',
      icon: Users,
      image: trainingImg,
      imageAlt: 'Young Christians practicing practical 1-on-1 evangelism in Copenhagen',
      lead: 'The Great Commission is not reserved for a stage. It belongs to every single Christian in Denmark.',
      points: [
        'Equipping believers to overcome fear with simple, loving conversation tools.',
        'Saturating workplaces, universities, coffee shops, and family tables across Denmark.',
        'Learning how to share a clear testimony and pray for people on the spot.',
      ],
      ctaText: 'Join the Training Waitlist',
    },
    {
      num: '02',
      title: 'Setting Apart Evangelists',
      subtitle: 'To reach the nation, go further, and develop lifelong partnerships',
      icon: Flame,
      image: evangelistImg,
      imageAlt: 'Street evangelists in Copenhagen witnessing on the public squares',
      lead: 'We identify, train, and send dedicated evangelists called to reach Denmark and beyond.',
      points: [
        'Intensive hands-on street and public proclamation coaching through CfaN Fire Camps.',
        'Deploying teams into Danish cities, university hubs, and forgotten towns.',
        'Reach out to us to develop lifelong partnerships for national outreach.',
      ],
      ctaText: 'Partner as an Evangelist',
    },
    {
      num: '03',
      title: 'Commissioning Pastors to Receive the Harvest',
      subtitle: 'Uniting local churches to shepherd and disciple new converts',
      icon: Church,
      image: pastorsImg,
      imageAlt: 'Danish pastors praying together in unity around a table',
      lead: 'Evangelism without follow-up is incomplete. Pastors and local churches are the home where new believers grow.',
      points: [
        'Building 24–48 hour follow-up pathways so every new believer connects with a church.',
        'Uniting Lutheran, Free Church, Pentecostal, Baptist, and independent pastors.',
        'Equipping home groups to welcome newly saved Danes with love and discipleship.',
      ],
      ctaText: 'Connect as a Pastor',
    },
    {
      num: '04',
      title: 'Building Bigger Events to Reach the Lost & Unite the Church',
      subtitle: 'Citywide proclamation gatherings across Denmark',
      icon: Compass,
      image: cphFlagImg,
      imageAlt: 'Historic Copenhagen harbor with Danish flag waving over the city',
      lead: 'Public proclamation gathers the church under one banner: the name of Jesus Christ.',
      points: [
        'Gathering thousands under the simple, unapologetic preaching of the Cross.',
        'Breaking spiritual ceilings over cities and demonstrating visible Christian unity.',
        'Documenting salvations with direct handover into local partner congregations.',
      ],
      ctaText: 'Get Involved in Copenhagen 2027',
    },
  ];

  return (
    <section id="the-plan" className="py-16 sm:py-24 bg-white text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 font-bold text-xs uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <span>The 4-Step Strategy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 uppercase">
            What&apos;s The Plan?
          </h2>
        </div>

        {/* 4 Clean Cards Grid (No jumping tabs - click opens popup modal!) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Photo Header */}
                <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-100">
                  <img
                    src={pillar.image}
                    alt={pillar.imageAlt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-mono font-bold">
                    Pillar {pillar.num}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-red-600">
                      <Icon className="w-5 h-5 shrink-0" />
                      <span className="text-xs font-bold uppercase tracking-wider">Step {pillar.num}</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-950 leading-snug mb-2">
                      {pillar.title}
                    </h3>
                    
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {pillar.subtitle}
                    </p>
                  </div>

                  {/* Click to open Clean Pop-up Modal */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setSelectedPillar(pillar)}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600 hover:text-red-700 cursor-pointer focus:outline-none"
                    >
                      <span>Read Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-slate-400">Tap to expand</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* CLEAN POP-UP MODAL (Solves the jumping & scrolling problem!)   */}
      {/* ------------------------------------------------------------- */}
      {selectedPillar && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedPillar(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPillar(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-600 uppercase mb-2">
              <span>Pillar {selectedPillar.num}</span>
              <span>·</span>
              <span>Strategy Blueprint</span>
            </div>

            <h3 className="text-2xl font-black text-slate-950 mb-3">
              {selectedPillar.title}
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium">
              {selectedPillar.lead}
            </p>

            {/* Key Action Points */}
            <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              {selectedPillar.points.map((point: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                  <div className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedPillar(null);
                  onOpenWaitlist();
                }}
                className="w-full sm:flex-1 py-3 px-5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm shadow-sm transition-all cursor-pointer text-center"
              >
                {selectedPillar.ctaText}
              </button>
              <button
                type="button"
                onClick={() => setSelectedPillar(null)}
                className="w-full sm:w-auto py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-all cursor-pointer text-center"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
