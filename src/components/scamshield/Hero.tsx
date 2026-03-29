'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, ShieldAlert, ShieldCheck, ShieldX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

export default function Hero() {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<null | { score: 'Safe' | 'Suspicious' | 'Scam', description: string }>(null);

  const handleScan = () => {
    if (!query) return;
    setScanning(true);
    setResult(null);

    // Simulate 1-second high-speed scan
    setTimeout(() => {
      setScanning(false);
      // Simple logic for the demo
      if (query.includes('sbi.support') || query.includes('bit.ly') || query.includes('919293')) {
        setResult({ score: 'Scam', description: 'Matched known phishing patterns.' });
      } else if (query.includes('google.com') || query.includes('hdfcbank.com')) {
        setResult({ score: 'Safe', description: 'Verified legitimate domain.' });
      } else {
        setResult({ score: 'Suspicious', description: 'Unverifiable source. Proceed with caution.' });
      }
    }, 1200);
  };

  return (
    <section className="relative pt-20 pb-16 px-6 max-w-5xl mx-auto flex flex-col items-center text-center">
      {/* 3D-like glowing element in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] -z-10 blur-[120px] bg-gradient-to-tr from-[#00FF9D]/20 via-transparent to-transparent animate-pulse-subtle" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="mb-8 relative"
      >
        <div className="absolute inset-0 bg-[#00FF9D]/20 blur-3xl rounded-full" />
        <img 
          src="/hero_shield.png" 
          alt="ScamShield Logo" 
          className="w-48 h-48 md:w-64 md:h-64 object-contain relative z-10 drop-shadow-[0_0_30px_rgba(0,255,157,0.3)]"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-6xl font-black mb-4 flex flex-col">
          <span className="text-white/60 text-sm uppercase tracking-[0.4em] mb-4">{t('subtitle')}</span>
          <span className="text-gradient">ONE-SECOND WARNING</span>
        </h2>
        <p className="text-white/40 max-w-xl mx-auto mb-12 text-sm md:text-base leading-relaxed">
          AI-powered real-time detection for phishing links, suspicious UPI IDs, and fraudulent calls. 
          Your frontline defense against cybercrime.
        </p>
      </motion.div>

      <div className="w-full max-w-2xl relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00FF9D]/30 to-transparent blur-2xl group-hover:blur-3xl transition-all opacity-20" />
        <Card className="glass shadow-2xl overflow-hidden border-white/10">
          <CardContent className="p-2 flex items-center gap-2">
            <Input 
              type="text" 
              placeholder={t('scan_placeholder')} 
              className="border-none bg-transparent h-14 text-white text-lg placeholder:text-white/20 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleScan()}
            />
            <Button 
              size="lg" 
              className="bg-[#00FF9D] text-black hover:bg-[#00FF9D]/90 h-14 px-8 rounded-lg font-bold transition-all"
              onClick={handleScan}
              disabled={scanning}
            >
              {scanning ? <Loader2 className="w-5 h-5 animate-spin" /> : t('scan_button')}
            </Button>
          </CardContent>
        </Card>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mt-8 w-full max-w-md"
          >
            <Card className={`glass border-2 border-opacity-50 ${result.score === 'Safe' ? 'border-[#00FF9D]/50 bg-[#00FF9D]/5' : result.score === 'Suspicious' ? 'border-yellow-500/50 bg-yellow-500/5' : 'border-[#FF3B3B]/50 bg-[#FF3B3B]/5'}`}>
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`p-3 rounded-full ${result.score === 'Safe' ? 'bg-[#00FF9D]/20 text-[#00FF9D]' : result.score === 'Suspicious' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-[#FF3B3B]/20 text-[#FF3B3B]'}`}>
                  {result.score === 'Safe' ? <ShieldCheck /> : result.score === 'Suspicious' ? <ShieldAlert /> : <ShieldX />}
                </div>
                <div className="text-left">
                  <h4 className={`text-xl font-black uppercase ${result.score === 'Safe' ? 'text-[#00FF9D]' : result.score === 'Suspicious' ? 'text-yellow-500' : 'text-[#FF3B3B]'}`}>
                    {result.score === 'Safe' ? t('safe') : result.score === 'Suspicious' ? t('suspicious') : t('scam')}
                  </h4>
                  <p className="text-white/60 text-sm">{result.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
