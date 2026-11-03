import React from 'react';
import { Flame, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenWaitlist: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWaitlist }) => {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 py-16 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-900">
          
          {/* Brand & Vision */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5 text-white font-black text-xl">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white">
                <Flame className="w-4 h-4 fill-white" />
              </div>
              <span className="font-display tracking-tight text-white">DENMARK: THE TIME IS NOW</span>
            </div>
            
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              An interdenominational gospel initiative mobilizing believers, training evangelists, and partnering with Christ for All Nations to see an authentic spiritual revival across Denmark.
            </p>

            <div className="text-xs text-neutral-500 font-serif italic">
              &ldquo;The harvest is plentiful, but the workers are few. Ask the Lord of the harvest, therefore, to send out workers into his harvest field.&rdquo;
              <span className="block mt-1 font-mono text-[11px] text-neutral-400 font-normal not-italic">— Luke 10:2</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-200">
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#reality" className="hover:text-white transition-colors">The Reality of Denmark</a>
              </li>
              <li>
                <a href="#the-plan" className="hover:text-white transition-colors">The 4-Pillar Harvest Plan</a>
              </li>
              <li>
                <a href="#fire-camp" className="hover:text-white transition-colors">Fire Camp with CfaN</a>
              </li>
              <li>
                <a href="#copenhagen" className="hover:text-white transition-colors">Copenhagen June 2027</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">Frequently Asked Questions</a>
              </li>
            </ul>
          </div>

          {/* Action & Contact */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-200">
              Take Action
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Registrations for Fire Camp Copenhagen will be released in batches. Join the priority waitlist to lock in early access.
            </p>
            <button
              onClick={onOpenWaitlist}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg text-xs transition-colors inline-block"
            >
              Join the Waitlist Now
            </button>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} Denmark: The Time Is Now. In strategic association with Christ for All Nations.
          </div>

          <div className="flex items-center gap-6">
            <span>Copenhagen, Denmark</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              aria-label="Scroll to top of page"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
