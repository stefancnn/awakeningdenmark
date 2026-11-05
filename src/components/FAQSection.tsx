import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'When will the exact dates for Copenhagen in June 2027 be finalized?',
      a: 'The initiative is scheduled for the last week of June 2027 in Copenhagen. We are currently finalizing the specific venue and schedule with our partners. All waitlist members will receive priority notification as soon as dates are confirmed.',
    },
    {
      q: 'Who is Fire Camp designed for? Do I need evangelism experience?',
      a: 'Fire Camp is designed for any believer hungry to share Jesus! Whether you have never spoken to a stranger about God in your life or you already love outreach, experienced evangelists will coach and support you step-by-step in small, encouraging teams.',
    },
    {
      q: 'What is the connection with Christ for All Nations (CfaN)?',
      a: 'Christ for All Nations (founded by Reinhard Bonnke and led by Daniel Kolenda) has seen over 100 million documented salvations globally. CfaN partners with national movements to bring their proven Fire Camp evangelism bootcamps to equip local believers.',
    },
    {
      q: 'How does this support local churches in Denmark?',
      a: 'Step 3 of our plan is "Commissioning pastors to receive the harvest." We do not plant separate churches. Our goal is to train believers within their local congregations and connect every newly saved person into existing Danish churches for baptism and discipleship.',
    },
    {
      q: 'Is this only in Copenhagen, or nationwide?',
      a: 'Copenhagen is the initial launch location for the late June 2027 Fire Camp. However, the mission is nationwide, uniting Christians and leaders from all Danish regions.',
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-b border-slate-200 text-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-red-600" />
            <span>Questions & Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-950">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-slate-600 text-sm">
            Quick answers about Fire Camp Copenhagen and the national vision.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-slate-50 border border-slate-200 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-red-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
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
