import React, { useState } from 'react';
import { Flame, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenWaitlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWaitlist }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single text element / link) */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 text-white font-extrabold text-xl tracking-tight whitespace-nowrap shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-sm"
          aria-label="Denmark The Time Is Now homepage"
        >
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-900/40 group-hover:bg-red-500 transition-colors">
            <Flame className="w-4 h-4 fill-white" />
          </div>
          <div className="flex items-baseline gap-1.5 font-display">
            <span className="font-black text-red-500 tracking-wider">DENMARK</span>
            <span className="text-neutral-300 font-semibold text-sm tracking-normal hidden sm:inline">THE TIME IS NOW</span>
          </div>
        </a>

        {/* Zone 2: 4-5 concise single-line navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300" aria-label="Main navigation">
          <a href="#reality" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            The Reality
          </a>
          <a href="#the-plan" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            The 4-Step Plan
          </a>
          <a href="#fire-camp" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Fire Camp CfaN
          </a>
          <a href="#copenhagen" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Copenhagen 2027
          </a>
          <a href="#faq" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            FAQ
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenWaitlist}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-lg shadow-lg shadow-red-900/30 transition-all whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          >
            <span>Join the Waitlist</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-900 border-b border-neutral-800 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-base font-medium text-neutral-200">
            <a 
              href="#reality" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-neutral-800 transition-colors"
            >
              The Reality
            </a>
            <a 
              href="#the-plan" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-neutral-800 transition-colors"
            >
              The 4-Step Plan
            </a>
            <a 
              href="#fire-camp" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-neutral-800 transition-colors"
            >
              Fire Camp CfaN
            </a>
            <a 
              href="#copenhagen" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-neutral-800 transition-colors"
            >
              Copenhagen 2027
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-neutral-800 transition-colors"
            >
              FAQ
            </a>
          </nav>
          <div className="pt-3 border-t border-neutral-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWaitlist();
              }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 text-base font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg shadow-md transition-all"
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
