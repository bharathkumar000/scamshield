'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Layers, TestTube2, MessageCircleQuestion, HelpCircle, UserCheck } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const timelineData = [
  { step: '01', title: 'Empathize', icon: <UserCheck className="w-4 h-4" />, desc: 'Understanding the trauma of the 11.28 lakh cybercrime victims in India.' },
  { step: '02', title: 'Define', icon: <AlertTriangle className="w-4 h-4" />, desc: 'Mapping the exact points of failure in current UPI/Call authentication systems.' },
  { step: '03', title: 'Ideate', icon: <Layers className="w-4 h-4" />, desc: 'Concept: "One-Second Warning" - stopping the scam before the victim clicks.' },
  { step: '04', title: 'Prototype', icon: <TestTube2 className="w-4 h-4" />, desc: 'Building Safex: Ultra-modern, localized, and privacy-first detection.' },
  { step: '05', title: 'Test', icon: <CheckCircle2 className="w-4 h-4" />, desc: 'Real-world validation against live scam data sets and user feedback loop.' },
];

export default function Methodology() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto border-t border-white/5">
      <div className="text-center mb-16">
        <h3 className="text-3xl font-black mb-4 tracking-tight uppercase text-gradient">
          {t('methodology')}
        </h3>
        <p className="text-white/40 max-w-2xl mx-auto">
          Built on Design Thinking principles to bridge the gap between human error and technical security.
        </p>
      </div>

      {/* Interactive Timeline */}
      <div className="relative mb-24 px-12 md:px-0">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 hidden md:block" />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {timelineData.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col items-center text-center p-6 bg-black/60 rounded-3xl border border-white/5 hover:border-[#00FF9D]/30 group transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-[#00FF9D]/10 text-[#00FF9D] flex items-center justify-center mb-6 font-mono text-sm group-hover:bg-[#00FF9D] group-hover:text-black transition-all">
                {item.step}
              </div>
              <div className="mb-2 text-[#00FF9D] font-mono text-xs uppercase tracking-widest">{item.title}</div>
              <p className="text-white/40 text-[10px] uppercase leading-relaxed mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-20">
        {/* 5Why Analysis */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 text-[#00FF9D] font-mono text-xs uppercase tracking-wider mb-6">
            <MessageCircleQuestion className="w-4 h-4" />
            5-Why Analysis
          </div>
          <Card className="glass-card">
            <CardContent className="p-8">
              <h4 className="text-xl font-black mb-1 text-[#FF3B3B] uppercase">ROOT CAUSE: WHY DO PEOPLE GET SCAMMED?</h4>
              <p className="text-white/30 text-xs mb-8">Systematic breakdown of human-centric cybercrime.</p>
              
              <div className="space-y-6 relative">
                <div className="absolute left-4 top-2 bottom-8 w-px bg-white/10" />
                {[
                  { q: 'Why do victims click?', a: 'They face high-urgency language from a "fake" authority.' },
                  { q: 'Why is it convincing?', a: 'The UPI ID or Caller ID looks nearly identical to legitimate ones.' },
                  { q: 'Why is it hard to verify?', a: 'Modern apps lack a "one-second" verification bridge during the interaction.' },
                  { q: 'Why does verification fail?', a: 'Cognitive load is too high during stressful scam situations.' },
                  { q: 'Why Safex?', a: 'To automate the verification process and provide a visceral "Stop" warning.' },
                ].map((item, i) => (
                  <div key={i} className="pl-10 relative">
                    <div className="absolute left-3 top-2 w-2 h-2 rounded-full bg-white/30 border border-white/50" />
                    <p className="text-[#00FF9D] font-mono text-xs mb-1 uppercase tracking-wider">{item.q}</p>
                    <p className="text-white/60 text-sm">{item.a}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 5W1H Chart */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 text-[#00FF9D] font-mono text-xs uppercase tracking-wider mb-6">
            <HelpCircle className="w-4 h-4" />
            5W1H Perspective
          </div>
          <Card className="glass-card">
            <CardContent className="p-8">
              <h4 className="text-xl font-black mb-1 text-white uppercase">11.28 LAKH COMPLAINTS: THE BREAKDOWN</h4>
              <p className="text-white/30 text-xs mb-8">Statistical analysis of cybercrime in India.</p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Who?', value: 'Digital payment users (80% aged 18-45)' },
                  { label: 'What?', value: 'UPI Fraud, KYC Scams, Investment Scams' },
                  { label: 'Where?', value: 'Major cities (Mysuru, Bengaluru, NCR, Mumbai)' },
                  { label: 'When?', value: 'During peak banking & shopping hours (10 AM - 6 PM)' },
                  { label: 'Why?', value: 'Low digital literacy and sophisticated social engineering' },
                  { label: 'How?', value: 'Phishing links and Lookalike UPI IDs' },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 transition-all hover:bg-white/[0.08]">
                    <span className="text-[#00FF9D] font-mono text-[10px] uppercase block mb-1 tracking-widest">{item.label}</span>
                    <span className="text-white text-xs font-bold leading-tight block">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
