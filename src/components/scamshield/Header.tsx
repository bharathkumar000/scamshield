'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, ShieldCheck, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-white/5 bg-black/50 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-[#00FF9D]/10 p-2 rounded-lg border border-[#00FF9D]/20">
          <Shield className="w-6 h-6 text-[#00FF9D]" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tighter text-white">
            Scam<span className="text-[#00FF9D]">Shield</span>
          </h1>
          <p className="text-[10px] text-white/50 uppercase tracking-widest">{t('nexus')}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Badge variant="outline" className="hidden md:flex items-center gap-1 border-[#00FF9D]/20 bg-[#00FF9D]/5 text-[#00FF9D] font-mono">
          <ShieldCheck className="w-3 h-3" />
          {t('local_processing')}
        </Badge>
        
        <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`rounded-full h-8 px-3 text-xs ${language === 'en' ? 'bg-[#00FF9D]/20 text-[#00FF9D] hover:bg-[#00FF9D]/30 hover:text-[#00FF9D]' : 'text-white/60 hover:text-white'}`}
            onClick={() => setLanguage('en')}
          >
            EN
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`rounded-full h-8 px-3 text-xs ${language === 'kn' ? 'bg-[#00FF9D]/20 text-[#00FF9D] hover:bg-[#00FF9D]/30 hover:text-[#00FF9D]' : 'text-white/60 hover:text-white'}`}
            onClick={() => setLanguage('kn')}
          >
            KN
          </Button>
        </div>
      </div>
    </header>
  );
}
