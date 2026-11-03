import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'When will the exact dates for Copenhagen in June 2027 be finalized?',
      a: 'The initiative is scheduled for the last week of June 2027 in Copenhagen. We are currently finalizing the specific arena/conference facilities and itinerary with our international partners. All waitlist members will receive direct SMS/email notification the moment exact dates are published, along with a 48-hour priority registration window.',
    },
    {
      q: 'Who is Fire Camp designed for? Do I need evangelism experience?',
      a: 'Fire Camp is specifically designed for anyone who is hungry to share Jesus! Whether you have never spoken to a stranger about God in your life or you are already an active street preacher, our seasoned leaders will mentor you step-by-step. You will be placed in small, safe, empowered teams.',
    },
    {
      q: 'What is the connection with Christ for All Nations (CfaN)?',
      a: 'Christ for All Nations (founded by Reinhard Bonnke and directed by Daniel Kolenda) has seen over 100 million people accept Christ in global mass campaigns. CfaN partners with national movements to bring their proven Fire Camp evangelism bootcamps, training materials, and veteran ministers to ignite local believers.',
    },
    {
      q: 'How does this support and strengthen Danish local churches?',
      a: 'Step 3 of our plan is "Commissioning pastors to receive the harvest." We do not plant a rival church or pull people away from their congregations. Our sole objective is to empower believers within their local churches and funnel every single new salvation directly into local Danish congregations for baptism and discipleship.',
    },
    {
      q: 'Is this only in Copenhagen, or across all of Denmark?',
      a: 'Copenhagen is the initial spark and launch city for the late June 2027 Fire Camp. However, the 4-step harvest strategy is nationwide. Phase 2 and beyond will expand into Aarhus, Odense, Aalborg, Esbjerg, and the regional islands.',
    },
  ];

  return (
    <section id="faq" className="py-24 bg-neutral-900 border-t border-neutral-800 text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-widest mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
            Everything You Need To Know
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            Have questions about Fire Camp, the timeline, or partnering with your church? Here are the facts.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base sm:text-lg text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-red-500' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm sm:text-base text-neutral-300 leading-relaxed border-t border-neutral-900 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
