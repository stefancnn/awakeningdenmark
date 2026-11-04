import React from 'react';
import { Flame, ArrowRight, Calendar, MapPin, Zap } from 'lucide-react';
import cfanCrusadeImg from '../assets/images/cfan_gospel_crusade_1793697137949.jpg';
import fireCampEvangelismImg from '../assets/images/fire_camp_evangelism_1793697124075.jpg';

interface FireCampProps {
  onOpenWaitlist: () => void;
}

export const FireCamp: React.FC<FireCampProps> = ({ onOpenWaitlist }) => {
  const fireCampExperiences = [
    {
      title: 'Biblical Power Evangelism Training',
      description: 'Learn how to preach the pure, uncompromised Gospel of Jesus Christ with Holy Spirit power, clarity, and boldness.',
    },
    {
      title: 'Daily Hands-On Street Evangelism in Copenhagen',
      description: 'You will not just sit in a classroom. Every afternoon, teams head into the heart of Copenhagen—Strøget, transit stations, and city parks—to lead real people to Christ.',
    },
    {
      title: 'Praying for the Sick & Miracles on the Streets',
      description: 'Discover how to minister healing and prophesy with compassion right on the public square, breaking down secular skepticism.',
    },
    {
      title: 'Deep Holy Spirit Encounters & Impartation',
      description: 'Evenings saturated with extended worship, deep prayer, deliverance, and personal spiritual consecration.',
    },
    {
      title: 'Mentorship from Global CfaN Evangelists',
      description: 'Direct impartation and personal coaching from seasoned evangelists who travel the nations seeing tens of thousands saved.',
    },
    {
      title: 'Lifelong Kingdom Brotherhood & Community',
      description: 'Connect with fiery, like-minded young revivalists across Scandinavia and Europe who refuse to settle for lukewarm religion.',
    },
  ];

  return (
    <section id="fire-camp" className="py-24 bg-neutral-950 text-white relative overflow-hidden">
      {/* Background Ember Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-800/80 text-red-400 font-bold text-xs uppercase tracking-widest mb-4">
            <Flame className="w-4 h-4 fill-red-500 text-red-500" />
            <span>The First Step of the Vision</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-tight">
            Fire Camp <span className="text-red-500">Copenhagen</span>
          </h2>
          <p className="mt-4 text-base sm:text-xl text-neutral-300 leading-relaxed text-balance">
            Before we fill stadiums, we ignite souls. The catalyst begins in Copenhagen this summer in partnership with <strong>Christ for All Nations (CfaN)</strong>.
          </p>
        </div>

        {/* Christ for All Nations Spotlight Banner with Crusade Photo */}
        <div className="mb-20 rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900/90 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Crusade Photography */}
            <div className="lg:col-span-7 relative min-h-[360px] sm:min-h-[460px]">
              <img
                src={cfanCrusadeImg}
                alt="Christ for All Nations mass gospel campaign at night with thousands worshiping"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent lg:hidden" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-neutral-900/90 hidden lg:block" />
              <div className="absolute bottom-4 left-4 right-4 bg-neutral-950/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-neutral-800/80 text-xs text-neutral-300 flex items-center justify-between">
                <span className="font-semibold text-white">Christ for All Nations (CfaN) Global Campaigns</span>
                <span className="font-mono text-red-400">100M+ Decisions for Christ</span>
              </div>
            </div>

            {/* CfaN Summary Copy */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-center">
              <div className="text-xs uppercase tracking-widest font-mono text-red-400 mb-2">
                Strategic Partner
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
                About Christ for All Nations
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
                Founded by evangelist Reinhard Bonnke and today led by Daniel Kolenda, Christ for All Nations is one of the most prolific evangelistic ministries in church history, recording over <strong>100 million documented salvations</strong> worldwide.
              </p>
              <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                Through CfaN Fire Camps, thousands of young European men and women have had their lives forever disrupted by the Holy Spirit—discovering that the exact same power that shakes African stadiums lives inside every believer on the streets of Europe.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white font-mono tabular-nums">50+ Yrs</div>
                  <div className="text-xs text-neutral-400">Gospel Legacy</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-red-500 font-mono tabular-nums">100%</div>
                  <div className="text-xs text-neutral-400">Frontline Evangelism</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* What Will Happen at Fire Camp Section with Street Evangelism Photo */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
            <div className="lg:col-span-6">
              <div className="text-xs uppercase tracking-widest font-mono text-amber-400 mb-2">
                Immersion Bootcamp
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                In Fire Camp You Will:
              </h3>
              <p className="mt-3 text-neutral-300 text-base">
                Fire Camp is not an ordinary summer conference. It is a rigorous, joy-filled, Holy Ghost spiritual boot camp where theory becomes instant street practice.
              </p>
            </div>
            
            <div className="lg:col-span-6 flex flex-wrap gap-4 lg:justify-end">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs sm:text-sm text-neutral-200">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Copenhagen, Denmark</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs sm:text-sm text-amber-300">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Last Week of June 2027 (Dates TBC)</span>
              </div>
            </div>
          </div>

          {/* Grid of Experiences with Photo Callout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fireCampExperiences.map((item, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-red-900/60 transition-all hover:-translate-y-1 group"
              >
                <div className="w-10 h-10 rounded-xl bg-red-950/80 text-red-500 flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <Flame className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2 leading-snug">
                  {item.title}
                </h4>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Real Street Evangelism Showcase Card */}
          <div className="mt-8 rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 p-8 sm:p-10">
              <div className="inline-flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-widest mb-3">
                <Zap className="w-4 h-4" />
                <span>Live On-The-Ground Ministry</span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
                From Hesitation to Unshakable Boldness
              </h4>
              <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                Most believers have never seen someone come to faith before their eyes. At Fire Camp, you step out with seasoned leaders who take you by the hand.
              </p>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Within 48 hours, sharing your testimony and praying for strangers in Danish city squares will become natural, exhilarating, and second nature.
              </p>
            </div>
            <div className="lg:col-span-6 h-72 sm:h-96 relative">
              <img
                src={fireCampEvangelismImg}
                alt="Young European Christians street outreach in Copenhagen"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* CTA Callout Band */}
        <div className="rounded-3xl bg-dannebrog p-8 sm:p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto relative z-10">
            <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mb-4">
              Seats Are Strictly Limited for Mentorship Depth
            </h3>
            <p className="text-neutral-100 text-base sm:text-lg mb-8 leading-relaxed">
              To ensure every participant receives intensive 1-on-1 coaching and direct street leadership, cohorts for Fire Camp Copenhagen will be capped. Join the waitlist now to receive first priority when registration opens.
            </p>
            <button
              onClick={onOpenWaitlist}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-neutral-100 text-neutral-950 font-black text-base sm:text-lg rounded-xl shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <span>Join the Waitlist Now</span>
              <ArrowRight className="w-5 h-5 text-red-600" />
            </button>
            <div className="mt-4 text-xs text-red-100/80">
              Copenhagen, Denmark · Last week of June 2027 (Dates to be confirmed)
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
