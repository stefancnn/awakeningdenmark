import React, { useState } from 'react';
import { Flame, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenWaitlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWaitlist }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Zone 1: Brand wordmark (single text element / link) */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 text-slate-900 font-extrabold text-xl tracking-tight whitespace-nowrap shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-sm"
          aria-label="Denmark The Time Is Now homepage"
        >
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-sm group-hover:bg-red-700 transition-colors">
            <Flame className="w-4 h-4 fill-white" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-black text-red-600 tracking-wider text-lg">DENMARK</span>
            <span className="text-slate-600 font-semibold text-xs tracking-normal hidden sm:inline uppercase">The Time Is Now</span>
          </div>
        </a>

        {/* Zone 2: 4-5 concise single-line navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700" aria-label="Main navigation">
          <a href="#reality" className="hover:text-red-600 transition-colors whitespace-nowrap shrink-0">
            The Reality
          </a>
          <a href="#the-plan" className="hover:text-red-600 transition-colors whitespace-nowrap shrink-0">
            The 4-Step Plan
          </a>
          <a href="#fire-camp" className="hover:text-red-600 transition-colors whitespace-nowrap shrink-0">
            Fire Camp CfaN
          </a>
          <a href="#copenhagen" className="hover:text-red-600 transition-colors whitespace-nowrap shrink-0">
            Copenhagen 2027
          </a>
          <a href="#waitlist" className="hover:text-red-600 transition-colors whitespace-nowrap shrink-0">
            Waitlist
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenWaitlist}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          >
            <span>Join Waitlist</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 space-y-4 shadow-lg animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-2 text-base font-semibold text-slate-800">
            <a 
              href="#reality" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              The Reality
            </a>
            <a 
              href="#the-plan" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              The 4-Step Plan
            </a>
            <a 
              href="#fire-camp" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Fire Camp CfaN
            </a>
            <a 
              href="#copenhagen" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Copenhagen 2027
            </a>
            <a 
              href="#waitlist" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Waitlist Form
            </a>
          </nav>
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWaitlist();
              }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 text-base font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-all"
            >
              <span>Join the Waitlist Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
