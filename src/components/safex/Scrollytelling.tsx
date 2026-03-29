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
  ArrowDown
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <section className={`min-h-screen relative flex flex-col items-center justify-center overflow-hidden py-20 ${className}`}>
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

  // Section 1 Transforms (Human Cost)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const teacherScale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1.2]);
  const teacherOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.25], [0, 1, 0]);

  // Section 2 Transforms (Rising Tide)
  const statsOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
  const mapScale = useTransform(scrollYProgress, [0.25, 0.4], [0.9, 1.1]);

  // Section 3 Transforms (5-Why Analysis)
  const whyOpacity = useTransform(scrollYProgress, [0.45, 0.55, 0.65], [0, 1, 0]);

  // Section 4 Transforms (Engine)
  const engineOpacity = useTransform(scrollYProgress, [0.65, 0.75, 0.85], [0, 1, 0]);
  const scannerY = useTransform(scrollYProgress, [0.68, 0.82], ["-20%", "120%"]);

  // Section 5 Transforms (Impact)
  const impactOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const zoomOut = useTransform(scrollYProgress, [0.95, 1], [1, 0.8]);

  // Count-up logic for Section 2
  const [count, setCount] = useState(0);
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', v => {
      if (v > 0.3 && v < 0.45) {
        setCount(Math.min(1128000, Math.floor(((v - 0.3) / 0.15) * 1128000)));
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Timer logic for Section 4
  const [timeLeft, setTimeLeft] = useState(1.00);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev <= 0.01 ? 1.00 : prev - 0.01));
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="bg-[#030303] text-white">
      {/* Persistent Privacy Badge */}
      <motion.div
        className="fixed top-8 right-8 z-50 flex items-center gap-2 px-4 py-2 bg-black/40 border border-[#00FF9D]/30 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-[#00FF9D]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="w-2 h-2 rounded-full bg-[#00FF9D] animate-pulse" />
        {t('local_badge')}
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2"
        style={{ opacity: heroOpacity }}
      >
        <span className="text-[10px] font-black uppercase tracking-widest text-white/30">{language === 'kn' ? 'ಸಂಪರ್ಕ ಸಾಧಿಸಲು ಸ್ಕ್ರಾಲ್ ಮಾಡಿ' : 'Scroll to Empathize'}</span>
        <ArrowDown className="w-4 h-4 text-[#00FF9D] animate-bounce" />
      </motion.div>

      {/* SECTION 1: THE HUMAN COST */}
      <Section className="z-40">
        <motion.div style={{ opacity: heroOpacity }} className="text-center px-6">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-gradient leading-tight mb-8">
            {t('hero_warning')}
          </h1>
        </motion.div>

        <motion.div
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
          style={{ opacity: teacherOpacity, scale: teacherScale }}
        >
          <Image
            src="/persona.png"
            alt="Persona"
            fill
            className="object-cover opacity-40 filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-transparent to-[#030303]" />
        </motion.div>

        <motion.div
          className="absolute inset-x-0 bottom-1/4 text-center px-6 z-10"
          style={{ opacity: teacherOpacity }}
        >
          <div className="max-w-3xl mx-auto p-8 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl">
            <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-6" />
            <p className="text-2xl md:text-3xl font-medium leading-relaxed italic text-white/90">
              "{t('hero_quote')}"
            </p>
          </div>
        </motion.div>
      </Section>

      {/* SECTION 2: THE RISING TIDE */}
      <Section className="z-30">
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-20"
          style={{ scale: mapScale }}
        >
          <div className="relative w-full max-w-4xl aspect-square">
            <div className="absolute top-1/4 left-1/2 w-4 h-4 bg-red-500 rounded-full animate-ping" />
            <div className="absolute top-1/2 left-1/3 w-6 h-6 bg-red-500 rounded-full animate-ping" />
            <div className="absolute bottom-1/3 right-1/4 w-5 h-5 bg-red-500 rounded-full animate-ping" />
            <div className="absolute top-2/3 left-1/2 w-4 h-4 bg-red-500 rounded-full animate-ping" />
          </div>
        </motion.div>

        <motion.div style={{ opacity: statsOpacity }} className="text-center px-6 z-10">
          <TrendingUp className="w-12 h-12 text-[#00FF9D] mx-auto mb-6" />
          <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter text-[#00FF9D] mb-4">
            {count.toLocaleString()}+
          </h2>
          <p className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white/40 mb-12">
            {t('stats_label')}
          </p>
          <div className="max-w-2xl mx-auto text-xl text-white/60 leading-relaxed font-medium">
            {language === 'kn' ? 'ಪ್ರಸ್ತುತ ಭದ್ರತೆಯು "ರಿಯಾಕ್ಟಿವ್" ಆಗಿದೆ. ವಂಚಕರು ಮಿಲಿಸೆಕೆಂಡ್‌ಗಳಲ್ಲಿ ಚಲಿಸುತ್ತಾರೆ. ನಮಗೆ "ಪ್ರೊಆಕ್ಟಿವ್, ರಿಯಲ್-ಟೈಮ್" ಪತ್ತೆಹಚ್ಚುವಿಕೆ ಅಗತ್ಯವಿದೆ.' : 'Current security is reactive. Fraudsters move in milliseconds. We need proactive, real-time intent detection.'}
          </div>
        </motion.div>
      </Section>

      {/* SECTION 3: THE 5-WHY ANALYSIS */}
      <Section className="z-20">
        <motion.div style={{ opacity: whyOpacity }} className="w-full max-w-4xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tight text-gradient mb-4">
              {language === 'kn' ? 'ವೈಜ್ಞಾನಿಕ ವಿಶ್ಲೇಷಣೆ' : 'The Root Cause Analysis'}
            </h2>
            <div className="w-24 h-1 bg-[#00FF9D] mx-auto rounded-full" />
          </div>

          <div className="flex flex-col items-center gap-12">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                initial={{ y: -50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ margin: "-50px" }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  delay: i * 0.1
                }}
                className="w-full flex items-center gap-6"
              >
                <div className="w-16 h-16 rounded-full border-2 border-[#00FF9D] flex items-center justify-center font-black text-2xl text-[#00FF9D] shadow-[0_0_20px_#00FF9D]">
                  {i}
                </div>
                <div className="flex-1 p-8 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden group hover:border-[#00FF9D]/40 transition-all">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#00FF9D]/20" />
                  <p className="text-2xl font-black uppercase tracking-tight text-white/90">
                    {t(`why_${i}` as any)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16 text-center"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-[#00FF9D]/10 rounded-full border border-[#00FF9D]/30">
              <Shield className="w-8 h-8 text-[#00FF9D]" />
              <span className="text-lg font-black uppercase text-[#00FF9D]">{language === 'kn' ? 'ಸೇಫೆಕ್ಸ್ ವ್ಯಾಖ್ಯಾನ' : 'Defining SafeX'}</span>
            </div>
          </motion.div>
        </motion.div>
      </Section>

      {/* SECTION 4: THE ENGINE */}
      <Section className="z-10">
        <motion.div style={{ opacity: engineOpacity }} className="w-full max-w-6xl px-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center text-red-500 font-mono font-bold tracking-tighter">
                  {timeLeft.toFixed(2)}s
                </div>
                <p className="text-sm font-black uppercase tracking-widest text-red-500">Intent Window Closing</p>
              </div>
              <h2 className="text-6xl font-black uppercase tracking-tight text-white leading-none">
                {t('engine_title')}
              </h2>
              <p className="text-xl text-white/40 leading-relaxed">
                {t('engine_desc')}
              </p>
              <div className="flex flex-wrap gap-4">
                {['Linguistic AI', 'URL Heuristics', 'UPI Mapping', 'Call Sentiment'].map(tag => (
                  <span key={tag} className="px-4 py-2 border border-white/10 rounded-full text-[10px] font-black uppercase text-white/40 tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative h-[400px] rounded-[3rem] border border-white/5 bg-black/40 overflow-hidden flex items-center justify-center">
              <div className="space-y-6 w-full px-12 opacity-40">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className={`h-8 rounded-lg border-2 border-dashed ${i % 2 === 0 ? 'border-red-500/30' : 'border-[#00FF9D]/30'}`} />
                ))}
              </div>
              <motion.div
                className="absolute inset-x-0 h-1 bg-[#00FF9D] shadow-[0_0_20px_#00FF9D] z-20"
                style={{ top: scannerY }}
              />
              <motion.div
                className="absolute inset-x-0 h-20 bg-gradient-to-b from-[#00FF9D]/20 to-transparent z-10"
                style={{ top: scannerY }}
              />
            </div>
          </div>
        </motion.div>
      </Section>

      {/* SECTION 5: IMPACT & TRANSITION */}
      <Section className="z-0">
        <motion.div style={{ opacity: impactOpacity, scale: zoomOut }} className="text-center px-6 max-w-4xl">
          <div className="flex justify-center gap-12 mb-12">
            <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-3xl bg-[#00FF9D]/10 flex items-center justify-center text-[#00FF9D] border border-[#00FF9D]/20">
                <Heart className="w-12 h-12" />
              </div>
              <span className="font-black uppercase tracking-widest text-xs text-white/40">SDG 3: Well-being</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                <BookOpen className="w-12 h-12" />
              </div>
              <span className="font-black uppercase tracking-widest text-xs text-white/40">SDG 4: Education</span>
            </motion.div>
          </div>

          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-8">
            {language === 'kn' ? 'ವಿಶ್ವದ ಮುಂದಿನ ನೂರು ಕೋಟಿ ಡಿಜಿಟಲ್ ನಾಗರಿಕರ ರಕ್ಷಣೆ' : 'Protecting the next billion digital citizens.'}
          </h2>

          <Button
            onClick={onComplete}
            className="h-20 px-16 rounded-[2rem] bg-[#00FF9D] hover:bg-[#00FF9D]/90 text-black font-black uppercase tracking-widest text-xl transition-all shadow-[0_0_40px_rgba(0,255,157,0.4)] group"
          >
            {t('launch_shield')} <Zap className="ml-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
          </Button>

          <p className="mt-8 text-white/20 uppercase font-black tracking-[0.3em] text-[10px]">
            Final Prototype Test // Release v1.0.0
          </p>
        </motion.div>
      </Section>

      <div className="h-[20vh]" />
    </div>
  );
}
