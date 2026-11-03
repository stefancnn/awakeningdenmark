import React, { useState } from 'react';
import { Users, Compass, Church, Flame, ArrowRight, Check } from 'lucide-react';

interface ThePlanProps {
  onOpenWaitlist: () => void;
}

export const ThePlan: React.FC<ThePlanProps> = ({ onOpenWaitlist }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      num: '01',
      title: 'Training Every Single Christian',
      subtitle: 'To share the gospel in their everyday sphere of influence',
      icon: Users,
      badge: 'Pillar 1: Mobilization',
      lead: 'The Great Commission was never meant for an elite few on a stage. It belongs to every single follower of Jesus.',
      details: [
        'Overcoming fear with simple, practical, loving evangelism frameworks anyone can use.',
        'Saturating workplaces, universities, gymnasiums, coffee shops, and family dinner tables across Denmark.',
        'Equipping everyday believers with testimonies, scripture mastery, and how to pray for healing on the spot.',
        'Building regular soul-winning habits that transform passive churchgoers into active ambassadors of Christ.',
      ],
      impact: 'If just 10,000 Danish Christians lead 2 people to Christ a year, 20,000 souls enter the Kingdom annually.',
    },
    {
      num: '02',
      title: 'Setting Apart Evangelists',
      subtitle: 'That will reach the nation and further',
      icon: Flame,
      badge: 'Pillar 2: Apostolic Fire',
      lead: 'Ephesians 4:11 commands the Church to recognize and release the office of the Evangelist.',
      details: [
        'Identifying young men and women carrying a relentless burden for the lost.',
        'Intensive hands-on street and public proclamation training through Fire Camps and field bootcamps.',
        'Deploying teams into forgotten Danish towns, suburban estates, and university campuses.',
        'Releasing Danish evangelists into Scandinavia, the Baltic nations, and Europe.',
      ],
      impact: 'Raising 100 dedicated, battle-tested evangelists to ignite city-wide revivals across Denmark.',
    },
    {
      num: '03',
      title: 'Commissioning Pastors to Receive the Harvest',
      subtitle: 'Strengthening local churches for massive discipleship',
      icon: Church,
      badge: 'Pillar 3: The Shepherds',
      lead: 'Evangelism without discipleship is a tragedy. Pastors and local churches are the vital home where new converts grow.',
      details: [
        'Bridging the critical gap between itinerant evangelism and local church integration.',
        'Creating practical systems for immediate 24-48 hour follow-up with every new convert.',
        'Equipping home groups and congregations to welcome post-Christian Danes with patience, love, and doctrine.',
        'Honoring, encouraging, and refreshing Danish pastors carrying the long-term spiritual weight of the nation.',
      ],
      impact: 'Ensuring that every soul won in Denmark is rooted in a healthy, Christ-centered local church family.',
    },
    {
      num: '04',
      title: 'Building Bigger Events to Reach the Lost & Unite the Church',
      subtitle: 'Historic public proclamation campaigns in major arenas',
      icon: Compass,
      badge: 'Pillar 4: Mass Awakening',
      lead: 'Public mass evangelism breaks spiritual ceilings over cities and creates unprecedented unity across denominational lines.',
      details: [
        'Organizing city-wide arena and stadium gospel campaigns in Copenhagen, Aarhus, and regional hubs.',
        'Bringing together Pentecostal, Baptist, Lutheran, Apostolic, and Independent fellowships around one banner: Jesus.',
        'Unapologetic preaching of the Cross, salvation, repentance, and the power of the Holy Spirit.',
        'Documenting every salvation decision with direct transfer into participating partner churches.',
      ],
      impact: 'Demonstrating that the Gospel is not dead in Denmark, but alive, public, and victorious.',
    },
  ];

  return (
    <section id="the-plan" className="py-24 bg-white text-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <span>The 4-Pillar Strategy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950 uppercase">
            What&apos;s The Plan?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Revival is not an accident. God responds to hungry hearts and united action. 
            Here is our comprehensive blueprint to ignite and sustain a national harvest in Denmark.
          </p>
        </div>

        {/* Step Selector Cards (Desktop / Tablet) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCurrent = activeStep === idx;
            return (
              <button
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`text-left p-6 rounded-2xl transition-all border text-neutral-900 cursor-pointer ${
                  isCurrent
                    ? 'bg-neutral-950 text-white border-neutral-950 shadow-xl scale-[1.02]'
                    : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-900'
                }`}
                aria-pressed={isCurrent}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`font-mono font-bold text-sm ${isCurrent ? 'text-red-500' : 'text-neutral-400'}`}>
                    {step.num}
                  </span>
                  <Icon className={`w-5 h-5 ${isCurrent ? 'text-red-500' : 'text-neutral-600'}`} />
                </div>
                <h3 className={`font-bold text-base leading-snug mb-1 ${isCurrent ? 'text-white' : 'text-neutral-900'}`}>
                  {step.title}
                </h3>
                <p className={`text-xs line-clamp-2 ${isCurrent ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  {step.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Step Deep Dive Card */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <div className="inline-block text-xs font-bold text-red-600 uppercase tracking-widest mb-3">
                {steps[activeStep].badge}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight mb-4">
                {steps[activeStep].title}
              </h3>
              <p className="text-lg text-neutral-700 font-medium leading-relaxed mb-6">
                {steps[activeStep].lead}
              </p>
              
              <div className="space-y-3 mb-8">
                {steps[activeStep].details.map((detail, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-sm sm:text-base text-neutral-700">{detail}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenWaitlist}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-red-600/20 transition-all"
                >
                  <span>Step Into This Vision</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-xs text-neutral-500 font-medium">
                  Copenhagen · Late June 2027 Launch
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200">
              <div className="text-xs font-mono uppercase text-neutral-400 mb-2">Target Impact Metric</div>
              <div className="text-lg font-bold text-neutral-900 mb-6">
                {steps[activeStep].impact}
              </div>

              <div className="border-t border-neutral-100 pt-6">
                <div className="text-xs font-mono uppercase text-neutral-400 mb-3">How To Get Involved</div>
                <div className="space-y-2 text-xs text-neutral-600">
                  <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-100">
                    <strong>Every Believer:</strong> Join our Fire Camp practical street soul-winning cohorts.
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-100">
                    <strong>Evangelists:</strong> Reach out to us and develop lifelong partnership.
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-100">
                    <strong>Pastors & Churches:</strong> Partner with us to receive and shepherd incoming harvest souls.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
