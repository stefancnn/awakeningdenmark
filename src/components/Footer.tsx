import React from 'react';
import { Flame, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenWaitlist: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWaitlist, onOpenAdmin }) => {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 text-sm border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-900">
          
          {/* Brand & Vision */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2 text-white font-extrabold text-lg">
              <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white">
                <Flame className="w-4 h-4 fill-white" />
              </div>
              <span className="tracking-tight text-white uppercase">Denmark: The Time Is Now</span>
            </div>
            
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              A nationwide Christian movement equipping believers, commissioning evangelists, and uniting churches for harvest in partnership with Christ for All Nations (CfaN).
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Quick Links
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#reality" className="hover:text-white transition-colors">The Reality</a>
              </li>
              <li>
                <a href="#the-plan" className="hover:text-white transition-colors">The 4-Step Plan</a>
              </li>
              <li>
                <a href="#fire-camp" className="hover:text-white transition-colors">Fire Camp CfaN</a>
              </li>
              <li>
                <a href="#copenhagen" className="hover:text-white transition-colors">Copenhagen June 2027</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Action */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Next Step
            </div>
            <p className="text-xs text-slate-400">
              Reserve your priority spot for Copenhagen June 2027.
            </p>
            <button
              onClick={onOpenWaitlist}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
            >
              Join the Waitlist
            </button>
          </div>

        </div>

        {/* Bottom Strip with Discreet Admin Link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Denmark: The Time Is Now · In association with Christ for All Nations
          </div>

          <div className="flex items-center gap-5">
            <span>Copenhagen, Denmark</span>
            {/* Discreet Admin Login Trigger */}
            <button
              onClick={onOpenAdmin}
              className="text-[11px] text-slate-600 hover:text-slate-400 transition-colors cursor-pointer lowercase"
              aria-label="Admin Access"
            >
              admin
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
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
