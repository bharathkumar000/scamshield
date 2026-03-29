'use client';

import { useState } from 'react';
import Header from '@/components/safex/Header';
import RealTimeDashboard from '@/components/safex/RealTimeDashboard';
import ProtectionSuite from '@/components/safex/ProtectionSuite';
import ScamAwarenessModule from '@/components/safex/ScamAwarenessModule';
import ImpactDashboard from '@/components/safex/ImpactDashboard';
import Scrollytelling from '@/components/safex/Scrollytelling';
import EmergencySOS from '@/components/safex/EmergencySOS';
import Hero from '@/components/safex/Hero';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Info } from 'lucide-react';

export default function Home() {
  const { t } = useLanguage();
  const [showStory, setShowStory] = useState(true);
  const [isSOSOpen, setIsSOSOpen] = useState(false);

  return (
    <main className="min-h-screen relative overflow-x-hidden selection:bg-[#00FF9D]/30 selection:text-white flex flex-col">
      <AnimatePresence mode="wait">
        {showStory ? (
          <motion.div
            key="story"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <Scrollytelling onComplete={() => setShowStory(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Background Ambience */}
            <div className="fixed top-0 left-0 right-0 h-[500px] bg-[#00FF9D] opacity-[0.03] blur-[100px] -z-10" />
            <div className="fixed inset-0 bg-[#030303] -z-20" />

            <Header 
               onSOSClick={() => setIsSOSOpen(true)} 
            />

            <div className="flex-1 flex overflow-hidden">
              <RealTimeDashboard />
            </div>

            <div className="container mx-auto px-4 mt-20">
              <Hero />
              <ProtectionSuite />
              <ScamAwarenessModule />
              <ImpactDashboard />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emergency SOS Overlay */}
      <EmergencySOS isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />



      {/* Footer / Copyright */}
      <footer className="py-16 border-t border-white/5 bg-black/40 backdrop-blur-md relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="text-white/40 text-xs uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-6 mb-8">
            <span>Privacy First</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF9D]/40" />
            <span>Zero-Knowledge Architecture</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF9D]/40" />
            <span>VVCE Mysuru</span>
          </div>
          <p className="text-white/60 text-sm md:text-base font-medium leading-relaxed">
            Designed for <span className="text-white font-bold italic">"Clash of Cortex"</span> 2026 submission.
            <br />
            Developed by <span className="text-[#00FF9D] font-black uppercase tracking-tight">Team Nexus 1</span> from Vidyavardhaka College of Engineering.
          </p>
        </div>
      </footer>
    </main>
  );
}
