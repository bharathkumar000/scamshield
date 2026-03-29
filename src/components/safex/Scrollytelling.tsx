'use client';

import { useLanguage } from '@/context/LanguageContext';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  Zap, 
  Heart, 
  BookOpen,
  Terminal,
  Code,
  CircuitBoard,
  Brain,
  Cpu,
  ShieldCheck,
  Globe,
  Rocket
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <section className={`min-h-screen relative flex flex-col items-center justify-center overflow-hidden py-32 ${className}`}>
    {children}
  </section>
);

export default function Scrollytelling({ onComplete }: { onComplete: () => void }) {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Opacity Transforms for 4 sections
  const s1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.25], [1, 1, 0]);
  const s2Opacity = useTransform(scrollYProgress, [0.25, 0.45, 0.5], [0, 1, 0]);
  const s3Opacity = useTransform(scrollYProgress, [0.5, 0.7, 0.75], [0, 1, 0]);
  const s4Opacity = useTransform(scrollYProgress, [0.75, 0.95, 1], [0, 1, 1]);

  const scannerY = useTransform(scrollYProgress, [0.5, 0.7], ["-20%", "120%"]);

  return (
    <div ref={containerRef} className="bg-[#030303] text-white">
      {/* Persistent Team Badge */}
      <motion.div 
        className="fixed top-8 right-8 z-[100] flex items-center gap-2 px-4 py-2 bg-black/40 border border-[#00FF9D]/30 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-[#00FF9D]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="w-2 h-2 rounded-full bg-[#00FF9D] animate-pulse" />
        {t('nexus')}
      </motion.div>

      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00FF9D]/5 blur-[200px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[200px] rounded-full" />
      </div>

      {/* SLIDE 1: VISION & SOLUTION */}
      <Section>
        <motion.div style={{ opacity: s1Opacity }} className="text-center px-6 max-w-5xl">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter text-gradient leading-none mb-10"
          >
            SAFEX
          </motion.h1>
          <div className="space-y-12">
            <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tight text-[#00FF9D]">
              {t('slide1_title')}
            </h2>
            <div className="space-y-6 text-xl md:text-3xl font-medium leading-relaxed italic text-white/50 max-w-4xl mx-auto border-l-4 border-[#00FF9D] pl-8 text-left">
              <p>"{t('slide1_mission')}"</p>
              <p className="text-white/30 text-lg md:text-2xl">
                {t('slide1_problem')}
              </p>
            </div>
            <div className="pt-10 flex flex-col items-center">
               <Zap className="w-12 h-12 text-[#00FF9D] mb-4 animate-pulse" />
               <p className="text-xs font-black uppercase tracking-[0.4em] text-white/20">Powered by Team Nexus 1</p>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* SLIDE 2: FEATURE ECOSYSTEM */}
      <Section>
        <motion.div style={{ opacity: s2Opacity }} className="max-w-6xl w-full px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-4">{t('slide2_title')}</h2>
            <div className="w-24 h-1 bg-[#00FF9D] mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Globe />, title: t('link_scanner'), desc: t('slide2_links'), color: '#00FF9D' },
              { icon: <CircuitBoard />, title: t('msg_analyzer'), desc: t('slide2_sms'), color: '#00D1FF' },
              { icon: <ShieldCheck />, title: t('engine_title'), desc: t('slide2_upi'), color: '#FFD600' }
            ].map((p, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-[#00FF9D]/30 transition-all flex flex-col h-full group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#00FF9D]/10 flex items-center justify-center text-[#00FF9D] mb-6 group-hover:scale-110 transition-transform">
                  {p.icon}
                </div>
                <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">{p.title}</h3>
                <p className="text-white/40 leading-relaxed flex-1 font-medium">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* SLIDE 3: TECH ARCHITECTURE */}
      <Section>
        <motion.div style={{ opacity: s3Opacity }} className="w-full max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div>
                <h3 className="text-[#00FF9D] font-mono text-sm uppercase tracking-widest mb-4 flex items-center gap-2 font-black">
                  <Code className="w-4 h-4" /> The Infrastructure
                </h3>
                <h2 className="text-5xl md:text-[5.5rem] font-black uppercase tracking-tight text-white mb-6 leading-[0.9]">TECH ARCHITECTURE</h2>
                <div className="p-10 rounded-[2.5rem] bg-black/40 border-2 border-dashed border-[#00FF9D]/20 font-black text-2xl text-[#00FF9D] tracking-wide">
                  {t('slide3_stack')}
                </div>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10">
                <h3 className="text-red-500 font-mono text-sm uppercase tracking-widest mb-4 flex items-center gap-2 font-bold">
                  <Terminal className="w-4 h-4" /> FLOW LOGIC
                </h3>
                <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-black uppercase tracking-tighter italic">
                  {t('slide3_flow')}
                </p>
              </div>
            </div>

            <div className="relative h-[550px] rounded-[4rem] border border-white/5 bg-black/60 backdrop-blur-3xl overflow-hidden shadow-2xl flex flex-col p-12 group">
              <div className="flex items-center gap-2 mb-8 border-b border-white/10 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="space-y-6 flex-1 font-mono text-xs opacity-50">
                 <p className="text-[#00FF9D]">[SYS] Analyzing threat vectors...</p>
                 <div className="p-4 border border-white/10 rounded-2xl">&gt; virus_total cluster init</div>
                 <div className="p-4 border border-white/10 rounded-2xl">&gt; urlscan.io_api: SCANNING</div>
                 <div className="p-4 border border-red-500/20 rounded-2xl text-red-400">&gt; pattern_match: HOMOGRAPH_DETECTED</div>
              </div>
              <motion.div 
                className="absolute inset-x-0 h-1 bg-[#00FF9D] shadow-[0_0_20px_#00FF9D]"
                style={{ top: scannerY }}
              />
            </div>
          </div>
        </motion.div>
      </Section>

      {/* SLIDE 4: EDUCATIONAL EMPOWERMENT */}
      <Section className="!pb-32">
        <motion.div style={{ opacity: s4Opacity }} className="text-center px-6 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-[#00FF9D]/10 border border-[#00FF9D]/20 rounded-full mb-12">
             <Brain className="w-6 h-6 text-[#00FF9D]" />
             <span className="text-sm font-black uppercase text-[#00FF9D] tracking-widest">{t('awareness')}</span>
          </div>

          <h2 className="text-5xl md:text-9xl font-black uppercase tracking-tighter text-white mb-12 leading-none border-y border-white/5 py-10">
            {t('slide4_motto')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-20 px-4">
            <div className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/10 group hover:bg-[#00FF9D]/5 transition-colors duration-700">
               <h4 className="text-2xl font-black uppercase tracking-tight text-[#00FF9D] mb-4">Phase 1: {t('slide4_modes').split(':')[0]}</h4>
               <p className="text-lg text-white/40 leading-relaxed font-medium">
                 {t('slide4_modes').split(':')[1]}
               </p>
            </div>
            <div className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/10 group hover:bg-blue-500/5 transition-colors duration-700">
               <h4 className="text-2xl font-black uppercase tracking-tight text-blue-400 mb-4">{language === 'kn' ? 'ದ್ವಿಭಾಷಾ ಬೆಂಬಲ' : 'Bilingual Support'}</h4>
               <p className="text-lg text-white/40 leading-relaxed font-medium">
                 {t('slide4_bilingual')}
               </p>
            </div>
          </div>
          
          <Button 
            onClick={onComplete}
            className="h-28 px-28 rounded-[3.5rem] bg-[#00FF9D] hover:bg-[#00FF9D]/90 text-black font-black uppercase tracking-widest text-3xl transition-all shadow-[0_40px_100px_rgba(0,255,157,0.3)] group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            {t('launch_shield')} <Rocket className="ml-4 w-10 h-10 group-hover:scale-110 transition-transform" />
          </Button>

          <div className="mt-24 opacity-10 flex flex-col items-center">
             <div className="w-12 h-px bg-white mb-4" />
             <p className="text-[10px] font-black uppercase tracking-widest">{t('nexus')}</p>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}
