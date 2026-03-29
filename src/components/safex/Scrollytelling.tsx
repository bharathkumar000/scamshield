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

  const s1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const s1Scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const s2Opacity = useTransform(scrollYProgress, [0.25, 0.4, 0.5], [0, 1, 0]);
  const s3Opacity = useTransform(scrollYProgress, [0.5, 0.65, 0.75], [0, 1, 0]);
  const s4Opacity = useTransform(scrollYProgress, [0.75, 0.9, 1], [0, 1, 1]);

  const scannerY = useTransform(scrollYProgress, [0.5, 0.7], ["-20%", "120%"]);
  const progressBar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="bg-[#030303] text-white selection:bg-[#00FF9D]/30">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[1px] bg-white/10 z-[101]">
        <motion.div 
          style={{ width: progressBar }} 
          className="h-full bg-[#00FF9D] shadow-[0_0_10px_#00FF9D]" 
        />
      </div>

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

      <Section>
        <motion.div style={{ opacity: s1Opacity, scale: s1Scale }} className="text-center px-6 max-w-6xl">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-7xl md:text-[12rem] font-black uppercase tracking-tighter text-gradient leading-none mb-10"
          >
            SAFEX
          </motion.h1>
          <div className="space-y-12">
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tight text-[#00FF9D] drop-shadow-[0_0_30px_rgba(0,255,157,0.3)]">
              {t('slide1_title')}
            </h2>
            <div className="space-y-6 text-xl md:text-4xl font-medium leading-tight italic text-white/50 max-w-4xl mx-auto border-l-4 border-[#00FF9D] pl-8 text-left">
              <p>"{t('slide1_mission')}"</p>
              <p className="text-white/30 text-lg md:text-2xl font-bold not-italic">
                {t('slide1_problem')}
              </p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="pt-20 flex flex-col items-center gap-4"
            >
               <Zap className="w-12 h-12 text-[#00FF9D] animate-pulse" />
               <div className="flex flex-col items-center gap-2">
                 <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Powered by Team Nexus 1</p>
                 <motion.div 
                   animate={{ y: [0, 10, 0] }}
                   transition={{ repeat: Infinity, duration: 2 }}
                   className="mt-8 flex flex-col items-center gap-2"
                 >
                   <span className="text-[10px] font-black uppercase tracking-widest text-[#00FF9D]">Scroll to Explore</span>
                   <div className="w-px h-12 bg-gradient-to-b from-[#00FF9D] to-transparent" />
                 </motion.div>
               </div>
            </motion.div>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <h3 className="text-[#00FF9D] font-mono text-sm uppercase tracking-widest flex items-center gap-2 font-black">
                  <Code className="w-4 h-4" /> System Infrastructure
                </h3>
                <h2 className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-[0.85]">
                  TECH<br/>ARCHITECTURE
                </h2>
                <div className="inline-block p-6 rounded-3xl bg-black/40 border border-[#00FF9D]/20 font-black text-xl text-[#00FF9D] tracking-wide">
                  {t('slide3_stack')}
                </div>
              </div>

              <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Terminal className="w-24 h-24" />
                </div>
                <h3 className="text-red-500 font-mono text-xs uppercase tracking-widest mb-6 flex items-center gap-2 font-bold">
                  <Zap className="w-3 h-3" /> Data Flow Pipeline
                </h3>
                <p className="relative z-10 text-xl md:text-3xl text-white/80 leading-tight font-black uppercase tracking-tighter italic">
                  {t('slide3_flow')}
                </p>
              </div>
            </div>

            <div className="relative h-[450px] md:h-[550px] rounded-[3.5rem] border border-white/10 bg-black/60 backdrop-blur-3xl overflow-hidden shadow-2xl flex flex-col p-10 md:p-12 group">
              <div className="flex items-center gap-2 mb-8 border-b border-white/10 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/30" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                <div className="w-3 h-3 rounded-full bg-green-500/30" />
                <div className="ml-auto text-[10px] font-mono text-white/20 uppercase">safex_kernel_v1.0</div>
              </div>
              <div className="space-y-6 flex-1 font-mono text-[10px] md:text-xs opacity-50">
                 <p className="text-[#00FF9D]">[SYS] Analyzing threat vectors...</p>
                 <div className="p-4 border border-white/10 rounded-2xl bg-white/5">&gt; virus_total cluster init</div>
                 <div className="p-4 border border-white/10 rounded-2xl bg-white/5">&gt; urlscan.io_api: SCANNING</div>
                 <div className="p-4 border border-red-500/20 rounded-2xl text-red-400 bg-red-500/5">&gt; pattern_match: HOMOGRAPH_DETECTED</div>
                 <p className="text-blue-400 animate-pulse">[INFO] Bypassing localized latency...</p>
              </div>
              <motion.div 
                className="absolute inset-x-0 h-0.5 bg-[#00FF9D] shadow-[0_0_20px_#00FF9D] z-20"
                style={{ top: scannerY }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#00FF9D]/5 to-transparent pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </Section>

      {/* SLIDE 4: EDUCATIONAL EMPOWERMENT */}
      <Section className="!pb-32">
        <motion.div style={{ opacity: s4Opacity }} className="text-center px-6 max-w-6xl">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-[#00FF9D]/10 border border-[#00FF9D]/20 rounded-full mb-12">
             <Brain className="w-6 h-6 text-[#00FF9D]" />
             <span className="text-xs md:text-sm font-black uppercase text-[#00FF9D] tracking-[0.3em]">{t('awareness')}</span>
          </div>

          <h2 className="text-4xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter text-white mb-12 leading-none border-y border-white/5 py-12">
            {t('slide4_motto')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-20">
            <div className="p-8 md:p-12 rounded-[2.5rem] bg-white/[0.03] border border-white/10 group hover:bg-[#00FF9D]/5 transition-all duration-700">
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-[#00FF9D]/20 flex items-center justify-center text-[#00FF9D]">1</div>
                 <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#00FF9D]">{t('slide4_modes').split(':')[0]}</h4>
               </div>
               <p className="text-base md:text-xl text-white/50 leading-relaxed font-medium">
                 {t('slide4_modes').split(':')[1]}
               </p>
            </div>
            <div className="p-8 md:p-12 rounded-[2.5rem] bg-white/[0.03] border border-white/10 group hover:bg-blue-500/5 transition-all duration-700">
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">2</div>
                 <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight text-blue-400">{language === 'kn' ? 'ದ್ವಿಭಾಷಾ ಬೆಂಬಲ' : 'Bilingual Support'}</h4>
               </div>
               <p className="text-base md:text-xl text-white/50 leading-relaxed font-medium">
                 {t('slide4_bilingual')}
               </p>
            </div>
          </div>
          
          <Button 
            onClick={onComplete}
            className="h-24 md:h-32 px-12 md:px-24 rounded-[3rem] md:rounded-[4rem] bg-[#00FF9D] hover:bg-[#00FF9D]/90 text-black font-black uppercase tracking-[0.2em] text-xl md:text-4xl transition-all shadow-[0_40px_100px_rgba(0,255,157,0.4)] group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative z-10 flex items-center gap-4 md:gap-8">
              {t('launch_shield')} <Rocket className="w-8 h-8 md:w-16 md:h-16 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
            </span>
          </Button>

          <div className="mt-24 opacity-20 flex flex-col items-center">
             <div className="w-12 h-px bg-[#00FF9D] mb-4" />
             <p className="text-[10px] font-black uppercase tracking-[0.5em]">{t('nexus')}</p>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}
