import React, { useState } from 'react';
import { Compass, AlertCircle, Sparkles, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const DenmarkReality: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reality' | 'hunger' | 'heritage'>('reality');

  return (
    <section id="reality" className="py-24 bg-neutral-900 border-t border-b border-neutral-800 text-neutral-100 relative">
      {/* Decorative Scandinavian Flag Cross Accent in Background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-widest mb-3">
            <Compass className="w-4 h-4" />
            <span>The State of the Nation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase text-balance">
            Denmark: Europe&apos;s Forgotten Mission Field
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
            Behind Denmark&apos;s pristine reputation as one of the happiest societies lies one of the most spiritually dry and unreached nations in the Western world. But the dry bones are ready to breathe again.
          </p>
        </div>

        {/* 3 Metric Band Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-red-900/50 transition-colors">
            <div className="text-4xl sm:text-5xl font-black text-red-500 font-mono tabular-nums mb-3">
              98.2%
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Outside Living Faith</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              While ~72% remain nominal members of the state church, less than 2% actively attend a Bible-believing fellowship or hold a personal relationship with Christ.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-amber-900/50 transition-colors">
            <div className="text-4xl sm:text-5xl font-black text-amber-400 font-mono tabular-nums mb-3">
              5.7M+
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Unreached Souls</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Out of 5.9 million residents, millions live without ever hearing a clear, life-transforming presentation of the gospel with power, love, and salvation.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-emerald-900/50 transition-colors">
            <div className="text-4xl sm:text-5xl font-black text-white font-display mb-3 tracking-tight">
              Ripe Now
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Generational Openness</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Gen Z and young Danish adults are questioning empty secularism. They are weary of shallow answers and hungry for encounter, truth, and community.
            </p>
          </div>
        </div>

        {/* Interactive Deep Dive with Segmented Controls */}
        <div className="mt-16 bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden">
          {/* Segmented Tab Bar */}
          <div className="flex border-b border-neutral-800 p-2 gap-2 bg-neutral-900/60 overflow-x-auto">
            <button
              onClick={() => setActiveTab('reality')}
              className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                activeTab === 'reality'
                  ? 'bg-red-600 text-white shadow-md shadow-red-950'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <AlertCircle className="w-4 h-4" />
              <span>The Spiritual Landscape</span>
            </button>

            <button
              onClick={() => setActiveTab('hunger')}
              className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                activeTab === 'hunger'
                  ? 'bg-red-600 text-white shadow-md shadow-red-950'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Why The Time Is Now</span>
            </button>

            <button
              onClick={() => setActiveTab('heritage')}
              className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                activeTab === 'heritage'
                  ? 'bg-red-600 text-white shadow-md shadow-red-950'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Denmark&apos;s Revival Roots</span>
            </button>
          </div>

          {/* Tab Content Panes */}
          <div className="p-8 sm:p-10">
            {activeTab === 'reality' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Comfortable Secularism vs. Eternal Reality
                  </h3>
                  <p className="text-neutral-300 leading-relaxed mb-6">
                    In Denmark, faith has long been treated as a private heritage museum piece rather than a living, burning fire. Millions of everyday Danes—students, engineers, families, business owners—live without ever encountering the transformative power of Jesus Christ.
                  </p>
                  <ul className="space-y-3 text-sm text-neutral-300">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <span>Most cities have fewer than 1 active gospel church for every 20,000 residents.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <span>The average Danish youth has never opened a Bible or heard a personal testimony.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <span>Secular happiness rankings mask record rates of depression, loneliness, and search for identity.</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
                  <h4 className="text-xs uppercase tracking-widest font-mono text-neutral-400 mb-4">
                    Regional Population & Mission Need
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-neutral-200 mb-1">
                        <span>Greater Copenhagen (Hovedstaden)</span>
                        <span className="font-mono text-red-400">1.4M People · &lt;1.5% Reached</span>
                      </div>
                      <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full w-[2%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-neutral-200 mb-1">
                        <span>Central Jutland (Aarhus Region)</span>
                        <span className="font-mono text-red-400">1.3M People · &lt;2.1% Reached</span>
                      </div>
                      <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full w-[2.1%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-neutral-200 mb-1">
                        <span>Funen & South Denmark (Odense Region)</span>
                        <span className="font-mono text-red-400">1.2M People · &lt;1.8% Reached</span>
                      </div>
                      <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full w-[1.8%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-neutral-200 mb-1">
                        <span>North Denmark (Aalborg Region)</span>
                        <span className="font-mono text-red-400">600K People · &lt;2.3% Reached</span>
                      </div>
                      <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full w-[2.3%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'hunger' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    The Ground Is Soft: An Unprecedented Spiritual Awakening
                  </h3>
                  <p className="text-neutral-300 leading-relaxed mb-6">
                    God is shifting the spiritual climate of Northern Europe. When Christians step out onto the streets of Copenhagen with genuine love and Holy Spirit authority, people stop. They listen. They weep. They pray.
                  </p>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-neutral-900 border border-neutral-800">
                      <div className="font-bold text-white text-sm mb-1">The Illusion of Self-Sufficiency Has Cracked</div>
                      <div className="text-xs text-neutral-400">
                        Economic wealth cannot cure the spiritual vacuum in the human soul. Danish people are more open to honest spiritual conversations today than at any point in the past 40 years.
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-neutral-900 border border-neutral-800">
                      <div className="font-bold text-white text-sm mb-1">Scandinavia&apos;s Prophetic Destiny</div>
                      <div className="text-xs text-neutral-400">
                        Throughout church history, Northern Europe has sent missionaries across the earth. A revitalized Danish church can ignite revivals across the entire Nordic realm.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-xl bg-red-950/20 border border-red-900/40 text-neutral-200">
                  <div className="text-red-400 font-bold text-sm uppercase tracking-wider mb-2">The Mandate</div>
                  <blockquote className="text-lg italic font-serif text-white mb-4">
                    &ldquo;Do you not say, &lsquo;Four months more and then the harvest&rsquo;? I tell you, open your eyes and look at the fields! They are ripe for harvest.&rdquo;
                  </blockquote>
                  <div className="text-xs text-red-400 font-mono">— John 4:35</div>
                </div>
              </div>
            )}

            {activeTab === 'heritage' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Awakening the Historic Spiritual Wells of Denmark
                  </h3>
                  <p className="text-neutral-300 leading-relaxed mb-6">
                    Denmark is not a pagan territory without memory. The Dannebrog flag itself carries the white cross of Jesus Christ. Great heroes of faith walked this soil and poured their lives out for the gospel.
                  </p>
                  <ul className="space-y-3 text-sm text-neutral-300">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                      <span><strong>Hans Egede (1686–1758)</strong>: The pioneering missionary pastor who sailed from Scandinavia into the frozen Arctic of Greenland with the gospel.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                      <span><strong>Søren Kierkegaard (1813–1855)</strong>: The Copenhagen philosopher who demanded that Danish believers abandon lukewarm religion for an absolute, burning passion for Christ.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                      <span><strong>The Moravian Awakening in Christiansfeld</strong>: A historic hub of 24/7 prayer, radical missions, and gospel proclamation that impacted the world.</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
                  <h4 className="text-white font-bold text-base mb-2">The Fire Is Returning</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    We are not coming to build an organization or create another conference. We are stepping into the slipstream of what God has always dreamed for this nation: a Denmark ablaze with the glory of God.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
