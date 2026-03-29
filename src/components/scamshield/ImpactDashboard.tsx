'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Target, TrendingUp, Users, HeartPulse, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ImpactDashboard() {
  const { t } = useLanguage();

  const stats = [
    { label: t('prevented'), value: '₹1,24,500', icon: <TrendingUp className="w-5 h-5 text-[#00FF9D]" /> },
    { label: t('protected'), value: '45,280', icon: <Users className="w-5 h-5 text-[#00FF9D]" /> },
    { label: 'Detection Rate', value: '98.5%', icon: <Target className="w-5 h-5 text-[#00FF9D]" /> },
  ];

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto mb-20">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="md:w-1/2">
          <h3 className="text-4xl font-black mb-6 tracking-tight uppercase text-gradient">
            {t('impact')}
          </h3>
          <p className="text-white/40 mb-10 leading-relaxed max-w-lg">
            ScamShield is more than a tool—it's a mission to protect the socio-economic well-being of Indian families. 
            By preventing just one scam, we protect a student's fee, a family's savings, and their peace of mind.
          </p>

          <div className="flex gap-12">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-3xl bg-[#00FF9D]/10 flex items-center justify-center border border-[#00FF9D]/30 group hover:bg-[#00FF9D] transition-all">
                <HeartPulse className="w-8 h-8 text-[#00FF9D] group-hover:text-black transition-all" />
              </div>
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-white/50">SDG 3: Well-being</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-3xl bg-[#00FF9D]/10 flex items-center justify-center border border-[#00FF9D]/30 group hover:bg-[#00FF9D] transition-all">
                <GraduationCap className="w-8 h-8 text-[#00FF9D] group-hover:text-black transition-all" />
              </div>
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-white/50">SDG 4: Education</span>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 grid grid-cols-1 gap-6 w-full">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass shadow-2xl overflow-hidden border-white/5 group hover:border-[#00FF9D]/30 transition-all">
                <CardContent className="p-8 flex items-center gap-6">
                  <div className="p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-[0.3em] font-mono text-white/30 block mb-1">{stat.label}</span>
                    <span className="text-3xl font-black text-white">{stat.value}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
