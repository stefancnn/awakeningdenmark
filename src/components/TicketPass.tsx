import React from 'react';
import { Calendar, MapPin, Download, CheckCircle, Share2, Flame } from 'lucide-react';
import { WaitlistEntry } from '../types';
import { generateICalendarEvent } from '../utils/waitlist';

interface TicketPassProps {
  entry: WaitlistEntry;
  onClose?: () => void;
}

export const TicketPass: React.FC<TicketPassProps> = ({ entry, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(
        `I just joined the waitlist for Fire Camp Copenhagen & Denmark: The Time Is Now! Check it out: ${window.location.href}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-lg mx-auto shadow-2xl text-white relative overflow-hidden">
      {/* Top Banner */}
      <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white">
            <Flame className="w-4 h-4 fill-white" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-red-500">Official Priority Pass</div>
            <div className="text-sm font-black text-white">FIRE CAMP COPENHAGEN 2027</div>
          </div>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>CONFIRMED</span>
          </span>
        </div>
      </div>

      {/* Ticket Body */}
      <div className="py-6 space-y-4">
        <div>
          <div className="text-xs font-mono uppercase text-neutral-400">Waitlist Pass Holder</div>
          <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {entry.firstName} {entry.lastName}
          </div>
          <div className="text-xs text-neutral-400 font-mono mt-0.5">{entry.email}</div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-3 border-y border-neutral-800/80">
          <div>
            <div className="text-[11px] font-mono uppercase text-neutral-400">Pass Number</div>
            <div className="text-base sm:text-lg font-mono font-bold text-amber-400">
              {entry.ticketNumber}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase text-neutral-400">Location</div>
            <div className="text-sm font-bold text-neutral-200 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>{entry.city}, {entry.country}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <div className="text-[11px] font-mono uppercase text-neutral-400">Target Timeframe</div>
            <div className="font-semibold text-neutral-200 flex items-center gap-1 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Late June 2027</span>
            </div>
            <div className="text-[10px] text-neutral-400 font-mono mt-0.5">Dates to be confirmed</div>
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase text-neutral-400">Role / Track</div>
            <div className="font-semibold text-neutral-200 uppercase mt-0.5">
              {entry.roleInterest}
            </div>
          </div>
        </div>

        {/* Barcode Graphic */}
        <div className="pt-4 pb-2 text-center">
          <div className="h-12 bg-neutral-900 rounded-lg border border-neutral-800 p-2 flex items-center justify-center gap-1.5 overflow-hidden">
            {[4, 2, 6, 3, 5, 2, 8, 4, 2, 7, 3, 5, 2, 8, 3, 6, 2, 4, 7, 3, 5, 2, 6, 4, 8, 3].map((h, i) => (
              <div 
                key={i} 
                className="w-1 bg-neutral-300 rounded-sm"
                style={{ height: `${h * 4}px` }} 
              />
            ))}
          </div>
          <div className="text-[10px] font-mono text-neutral-400 mt-1 tracking-widest">
            {entry.ticketNumber} · VERIFIED WAITLIST REGISTRATION
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row gap-3">
        <a
          href={generateICalendarEvent()}
          download="fire-camp-copenhagen-2027.ics"
          className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors text-center"
        >
          <Download className="w-4 h-4" />
          <span>Add to Calendar (.ics)</span>
        </a>

        <button
          onClick={handleCopyShare}
          className="py-3 px-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span>{copied ? 'Link Copied!' : 'Share Pass'}</span>
        </button>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="w-full mt-4 text-xs text-neutral-400 hover:text-white transition-colors text-center py-1"
        >
          Close Pass Window
        </button>
      )}
    </div>
  );
};
