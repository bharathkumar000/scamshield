'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, ShieldCheck, Award, AlertTriangle, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Header({ onSOSClick }: { onSOSClick: () => void }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-white/5 bg-black/50 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-[#00FF9D]/10 p-2 rounded-lg border border-[#00FF9D]/20">
          <Shield className="w-6 h-6 text-[#00FF9D]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tighter text-white">
            Safe<span className="text-[#00FF9D]">x</span>
          </h1>
          <p className="text-[12px] text-white/70 uppercase tracking-widest">{t('nexus')}</p>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-6 font-bold uppercase tracking-[0.2em] text-[9px]">
        <button className="text-[#00FF9D] hover:text-[#00FF9D]/80 transition-all">Protect</button>
        <button className="text-white/40 hover:text-white transition-all">Features</button>
        <button
          onClick={() => document.getElementById('training-module')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-[#00FF9D] hover:text-[#00FF9D]/80 transition-all flex items-center gap-2"
        >
          <Award className="w-3 h-3" /> Training
        </button>
        <button className="text-white/40 hover:text-white transition-all">Impact</button>
      </nav>

      <div className="flex items-center gap-4">


        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSOSClick}
          className="h-10 px-6 rounded-xl bg-[#FF3B3B] text-white flex items-center gap-3 font-black shadow-[0_0_20px_rgba(255,59,59,0.3)] animate-pulse hover:shadow-[0_0_40px_rgba(255,59,59,0.5)] transition-all"
        >
          <AlertTriangle className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-widest">{t('sos_button')}</span>
        </motion.button>
        <Badge variant="outline" className="hidden md:flex items-center gap-2 border-[#00FF9D]/20 bg-[#00FF9D]/5 text-[#00FF9D] font-mono text-xs py-1 px-3">
          <ShieldCheck className="w-4 h-4" />
          {t('local_processing')}
        </Badge>

        <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
          <Button
            variant="ghost"
            size="sm"
            className={`rounded-full h-8 px-3 text-xs font-bold ${language === 'en' ? 'bg-[#00FF9D]/20 text-[#00FF9D] hover:bg-[#00FF9D]/30 hover:text-[#00FF9D]' : 'text-white/60 hover:text-white'}`}
            onClick={() => setLanguage('en')}
          >
            EN
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`rounded-full h-8 px-3 text-xs font-bold ${language === 'kn' ? 'bg-[#00FF9D]/20 text-[#00FF9D] hover:bg-[#00FF9D]/30 hover:text-[#00FF9D]' : 'text-white/60 hover:text-white'}`}
            onClick={() => setLanguage('kn')}
          >
            KN
          </Button>
        </div>
      </div>
    </header>
  );
}
