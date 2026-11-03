import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DenmarkReality } from './components/DenmarkReality';
import { ThePlan } from './components/ThePlan';
import { FireCamp } from './components/FireCamp';
import { CopenhagenSection } from './components/CopenhagenSection';
import { WaitlistSection } from './components/WaitlistSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { WaitlistModal } from './components/WaitlistModal';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenWaitlist = () => {
    // Scroll smoothly to the inline waitlist form, or open modal if mobile/preferred
    const waitlistElement = document.getElementById('waitlist');
    if (waitlistElement) {
      waitlistElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      setModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar onOpenWaitlist={() => setModalOpen(true)} />

      {/* Main Content Sections with alternating, purposeful Bands of Color */}
      <main className="flex-1">
        {/* Band 1: Nordic Twilight & Copenhagen Harbor with 3D Title */}
        <Hero onOpenWaitlist={handleOpenWaitlist} />

        {/* Band 2: Deep Charcoal / Obsidian: The Reality of Denmark & Unreached Statistics */}
        <DenmarkReality />

        {/* Band 3: Crisp Scandinavian White & Crimson: The 4-Pillar Harvest Plan */}
        <ThePlan onOpenWaitlist={handleOpenWaitlist} />

        {/* Band 4: Fiery Ember & Dark Steel: Fire Camp with Christ for All Nations (CfaN) */}
        <FireCamp onOpenWaitlist={handleOpenWaitlist} />

        {/* Band 5: Architectural Graphite: Copenhagen Launch & Regional Timeline */}
        <CopenhagenSection onOpenWaitlist={handleOpenWaitlist} />

        {/* Band 6: Vivid Dannebrog Crimson & Obsidian: Priority Waitlist Form */}
        <WaitlistSection />

        {/* Band 7: Deep Charcoal: FAQ */}
        <FAQSection />
      </main>

      {/* Quiet, authoritative Footer */}
      <Footer onOpenWaitlist={handleOpenWaitlist} />

      {/* Quick Access Modal */}
      <WaitlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
