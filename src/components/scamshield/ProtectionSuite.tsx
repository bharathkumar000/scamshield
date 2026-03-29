'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link2, PhoneIncoming, MessageSquareText, Wallet2, Shield, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const pillarData = [
  { id: 'link', icon: <Link2 className="w-5 h-5" />, titleKey: 'link_scanner', desc: 'Analyzes URL structure for phishing signals like lookalike characters.' },
  { id: 'call', icon: <PhoneIncoming className="w-5 h-5" />, titleKey: 'call_verifier', desc: 'Cross-checks phone numbers against community-reported data and TRAI patterns.' },
  { id: 'msg', icon: <MessageSquareText className="w-5 h-5" />, titleKey: 'msg_analyzer', desc: 'AI-driven sentiment analysis to flag urgency language and "Fake Sender" patterns.' },
  { id: 'upi', icon: <Wallet2 className="w-5 h-5" />, titleKey: 'upi_guard', desc: 'Specifically flags "lookalike IDs" used for fraudulent collect requests.' },
];

export default function ProtectionSuite() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h3 className="text-4xl font-black mb-6 tracking-tight uppercase text-gradient">
          {t('pillars')}
        </h3>
        <p className="text-white/60 text-lg max-w-2xl mx-auto font-medium">
          Multi-layer defense architecture protecting every digital entry point. 
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {pillarData.map((pillar, index) => (
          <motion.div
            key={pillar.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="glass-card h-full group hover:border-[#00FF9D]/40 transition-all cursor-pointer p-2">
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-[#00FF9D]/10 flex items-center justify-center text-[#00FF9D] mb-6 group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <CardTitle className="text-xl font-black group-hover:text-[#00FF9D] transition-colors mb-2 uppercase tracking-tight">{t(pillar.titleKey)}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/60 text-base leading-relaxed font-medium">
                  {pillar.desc}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* UPI Guard Detail Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <Card className="glass-card overflow-hidden border-[#00FF9D]/20">
          <div className="p-8 md:flex gap-12 items-center">
            <div className="md:w-1/3 mb-8 md:mb-0">
              <div className="inline-flex items-center gap-2 text-[#00FF9D] font-mono text-sm mb-4 uppercase tracking-wider">
                <Shield className="w-4 h-4" />
                Special Module
              </div>
              <h4 className="text-2xl font-black mb-4 text-white uppercase tracking-tight">UPI GUARD PRO</h4>
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                Most scams in India occur via lookalike UPI IDs (e.g., verifying 'sbi.support@ybl' against the real 'sbi@ybl'). 
                Our heuristic engine maps these IDs in real-time.
              </p>
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <span className="text-xs text-white/30 uppercase tracking-widest">Accuracy</span>
                  <span className="text-xl font-bold text-[#00FF9D]">99.8%</span>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-xs text-white/30 uppercase tracking-widest">Scan Speed</span>
                  <span className="text-xl font-bold text-[#00FF9D]">~150ms</span>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3 bg-black/40 rounded-2xl p-6 border border-white/5 font-mono text-xs overflow-x-auto">
              <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-400 opacity-50" />
                <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-50" />
                <div className="w-3 h-3 rounded-full bg-green-400 opacity-50" />
                <span className="ml-2 text-white/40 uppercase">UPI-GUARD-HEURISTICS.LOG</span>
              </div>
              <p className="text-white/60 mb-2">[INFO] Checking: paytm.support@ybl</p>
              <p className="text-yellow-400 mb-2">[WARNING] Match detected: Lookalike domain 'support' added to 'paytm'.</p>
              <p className="text-white/60 mb-2">[INFO] Flag: suspicious_prefix_match=85%</p>
              <p className="text-[#FF3B3B] mb-2">[DANGER] Result: FRAUD_DETECTED</p>
              <p className="text-white/60 animate-pulse">_</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
