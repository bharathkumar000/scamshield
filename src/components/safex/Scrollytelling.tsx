'use client';

import { useLanguage } from '@/context/LanguageContext';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Shield, 
  Globe, 
  Zap, 
  Cpu, 
  Rocket, 
  Activity, 
  Lock, 
  Search,
  AlertTriangle,
  Code,
  Terminal as TerminalIcon,
  Brain,
  ShieldCheck,
  Smartphone,
  ChevronRight,
  Monitor,
  Database,
  Eye,
  Radar
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const SlideIn = ({ children, direction = 'right', delay = 0 }: { children: React.ReactNode, direction?: 'left' | 'right' | 'up' | 'down', delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  
  const variants = {
    hidden: { 
      opacity: 0, 
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
      y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
      scale: 0.98,
      filter: 'blur(10px)'
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { 
        duration: 0.8, 
        delay, 
        ease: [0.16, 1, 0.3, 1] as any 
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

// Terminal Frame Component
const TerminalFrame = ({ children, title = "SYS_PROMPT", className = "" }: { children: React.ReactNode, title?: string, className?: string }) => (
  <div className={`relative rounded-xl border border-white/10 bg-black/80 backdrop-blur-3xl overflow-hidden shadow-2xl ${className}`}>
    <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/[0.02]">
      <div className="flex gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF3B3B]/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#FFD600]/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#00FF9D]/40 animate-pulse" />
      </div>
      <div className="flex items-center gap-2 text-[9px] font-mono tracking-[0.3em] font-black text-white/30 italic">
        <TerminalIcon className="w-3 h-3" /> {title}
      </div>
    </div>
    <div className="p-8 md:p-12">
      {children}
    </div>
  </div>
);

const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <section className={`min-h-screen relative flex flex-col items-center justify-center overflow-hidden py-24 ${className}`}>
    {children}
  </section>
);

// CyberLogBackground for Matrix-style log scrolling
const CyberLogBackground = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const logPool = [
      "SYN_FLOOD DETECTED >> 192.168.1.104",
      "HANDSHAKE PROTOCOL: SECURE",
      "CORE_HEURISTICS: INITIALIZING SCAN...",
      "URL_VETTING: PASSED",
      "ALGO_SYNC: THREAT_PROBABILITY < 0.003",
      "SSL_CERTIFIED: VALID",
      "BUFFER_OVERFLOW PROTECTION: ACTIVE",
      "SQL_INJECTION VECTOR: BLOCKED",
      "REPUTATION_DATABASE_SYNC: COMPLETE",
      "LOCAL_ENCRYPTION: AES_256_GCM",
      "DASHBOARD_LIVE_STREAM: ON",
      "GEO_IP_FETCH: MYSURU_NODE_01",
      "SAFEX_ENGINE_V2: PROCESSING_REQUEST"
    ];

    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-15), logPool[Math.floor(Math.random() * logPool.length)]]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 opacity-[0.04] select-none">
      <div className="absolute top-0 right-10 flex flex-col font-mono text-[9px] text-[#00FF9D] tracking-widest leading-loose">
        {logs.map((log, i) => (
          <motion.span 
            key={i} 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
          >
            {`[${new Date().toLocaleTimeString()}] ${log}`}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default function Scrollytelling({ onComplete }: { onComplete: () => void }) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progressBar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const scannerY = useTransform(scrollYProgress, [0.6, 0.8], ["-10%", "110%"]);

  return (
    <div ref={containerRef} className="bg-[#030303] text-white selection:bg-[#00FF9D]/30 relative overflow-x-hidden font-sans">
      <CyberLogBackground />
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-white/5 z-[101]">
        <motion.div 
          style={{ width: progressBar }} 
          className="h-full bg-gradient-to-r from-[#00FF9D] to-[#00D1FF] shadow-[0_0_20px_#00FF9D]" 
        />
      </div>

      {/* Persistent Badge */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-8 right-8 z-[100] flex items-center gap-3 px-5 py-2 bg-black/80 border border-white/10 backdrop-blur-2xl rounded-lg text-[9px] font-mono font-black uppercase tracking-[0.3em] text-[#00FF9D] shadow-2xl"
      >
        <Radar className="w-3.5 h-3.5 animate-pulse" />
        {t('nexus')}
      </motion.div>

      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[-10%] w-[60%] h-[60%] bg-[#00FF9D]/5 blur-[200px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/5 blur-[200px] rounded-full animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      </div>

      {/* SLIDE 0: INTRO */}
      <Section className="bg-gradient-to-b from-[#0a0a0a] to-transparent">
        <motion.div 
           initial={{ scale: 0.9, opacity: 0, filter: 'blur(20px)' }}
           animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           className="text-center px-12 flex flex-col items-center"
        >
          <div className="w-24 h-24 rounded-2xl bg-[#00FF9D]/5 border-2 border-[#00FF9D]/20 flex items-center justify-center shadow-[0_0_60px_rgba(0,255,157,0.2)] mb-12 relative overflow-hidden group">
            <Shield className="w-12 h-12 text-[#00FF9D]/80 group-hover:scale-110 transition-transform" />
            <motion.div 
               animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }}
               transition={{ repeat: Infinity, duration: 2 }}
               className="absolute inset-x-0 h-1 bg-[#00FF9D] blur-md bottom-0"
            />
          </div>
          <h1 className="text-8xl md:text-[8rem] font-sans font-black uppercase tracking-tighter leading-none mb-4 text-gradient">
            Safe<span className="text-white">x</span>
          </h1>
          <p className="text-xl md:text-2xl font-mono uppercase tracking-[1em] text-white/20 italic">
            DECRYPTING SAFETY
          </p>
        </motion.div>
      </Section>

      {/* SLIDE 1: VISION */}
      <Section>
        <div className="max-w-6xl w-full px-12">
           <TerminalFrame title="CORE_STRATEGY.LOG">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                 <SlideIn direction="left">
                    <div className="space-y-12">
                       <div>
                          <div className="inline-flex items-center gap-3 px-6 py-2 bg-red-500/10 border border-red-500/20 rounded-md mb-8">
                             <AlertTriangle className="w-4 h-4 text-red-500" />
                             <span className="text-[10px] font-mono font-black uppercase text-red-500 tracking-[0.3em]">01: THE_PROBLEM</span>
                          </div>
                          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight mb-8 text-white/90">{t('slide1_subtitle')}</h2>
                          <p className="text-lg md:text-xl font-medium leading-relaxed font-mono text-red-500/60 italic border-l-2 border-red-500/20 pl-6">
                             {t('slide1_problem')}
                          </p>
                       </div>
                    </div>
                 </SlideIn>

                 <SlideIn direction="right" delay={0.2}>
                    <div className="space-y-12">
                       <div>
                          <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#00FF9D]/10 border border-[#00FF9D]/20 rounded-md mb-8">
                             <ShieldCheck className="w-4 h-4 text-[#00FF9D]" />
                             <span className="text-[10px] font-mono font-black uppercase text-[#00FF9D] tracking-[0.3em]">02: THE_SHIELD</span>
                          </div>
                          <p className="text-xl md:text-2xl font-black leading-tight text-white/70 mb-10 uppercase tracking-tighter">
                             {t('slide1_mission')}
                          </p>
                          <div className="space-y-4 pt-8 border-t border-white/5 font-mono">
                             {[t('slide1_zerotrust'), t('slide1_humancentric')].map((text, i) => (
                                <div key={i} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#00FF9D]">
                                   <ChevronRight className="w-4 h-4" /> {text}
                                </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 </SlideIn>
              </div>
           </TerminalFrame>
        </div>
      </Section>

      {/* SLIDE 2: ECOSYSTEM */}
      <Section>
        <div className="max-w-7xl w-full px-12">
           <SlideIn direction="up">
              <div className="text-center mb-16">
                 <div className="inline-flex items-center gap-3 px-6 py-2 bg-blue-500/10 border border-blue-500/20 rounded-md mb-6">
                    <Database className="w-4 h-4 text-blue-400" />
                    <span className="text-[10px] font-mono font-black uppercase text-blue-400 tracking-[0.3em]">MODULE_REGISTRY</span>
                 </div>
                 <h2 className="text-4xl md:text-6xl font-sans font-black uppercase tracking-tight leading-none mb-8 text-center mx-auto">{t('slide2_subtitle')}</h2>
              </div>
           </SlideIn>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                 { icon: <Globe />, title: 'GATEWAY_SCAN', desc: t('slide2_links_desc'), delay: 0 },
                 { icon: <Smartphone />, title: 'SIGNAL_AUDIT', desc: t('slide2_sms_desc'), delay: 0.15 },
                 { icon: <ShieldCheck />, title: 'UPI_HEURISTICS', desc: t('slide2_upi_desc'), delay: 0.3 }
              ].map((p, i) => (
                 <SlideIn key={i} direction="up" delay={p.delay}>
                    <TerminalFrame className="h-full group hover:border-[#00FF9D]/30 transition-all duration-700 hover:shadow-[0_0_50px_rgba(0,255,157,0.1)]" title={`UNIT_${i+1}.OBJ`}>
                       <div className="w-16 h-16 rounded-lg bg-white/[0.03] flex items-center justify-center text-white mb-10 group-hover:scale-110 group-hover:text-[#00FF9D] transition-all">
                          {p.icon}
                       </div>
                       <h3 className="text-xl md:text-2xl font-mono font-black uppercase mb-4 tracking-tight group-hover:text-[#00FF9D] transition-colors">{p.title}</h3>
                       <p className="text-base text-white/30 leading-relaxed font-mono font-medium group-hover:text-white/60 transition-colors uppercase italic">{p.desc}</p>
                    </TerminalFrame>
                 </SlideIn>
              ))}
           </div>
        </div>
      </Section>

      {/* SLIDE 3: ARCHITECTURE */}
      <Section>
        <div className="max-w-7xl w-full px-12">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-16">
                 <SlideIn direction="left">
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-purple-500/10 border border-purple-500/20 rounded-md mb-8">
                       <Cpu className="w-4 h-4 text-purple-400" />
                       <span className="text-[10px] font-mono font-black uppercase text-purple-400 tracking-[0.3em]">TECH_SPEC_V1.16</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-sans font-black uppercase tracking-tighter leading-[0.9] mb-10">{t('slide3_subtitle')}</h2>
                 </SlideIn>
                 
                 <div className="space-y-10">
                    <SlideIn direction="left" delay={0.2}>
                       <div className="p-8 rounded-xl bg-black/40 border border-[#00FF9D]/20 group font-mono shadow-xl">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00FF9D]/40 mb-6 italic">&gt; STACK_OVERVIEW</h4>
                          <p className="text-lg md:text-2xl font-bold tracking-tight text-[#00FF9D] uppercase">{t('slide3_stack')}</p>
                       </div>
                    </SlideIn>
                    <SlideIn direction="left" delay={0.4}>
                       <div className="p-8 rounded-xl bg-white/[0.02] border border-white/5 group font-mono shadow-xl leading-relaxed">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-6 italic">&gt; PIPELINE_FLOW</h4>
                          <p className="text-lg md:text-2xl font-black uppercase tracking-tighter italic text-white/40 group-hover:text-white/80 transition-all">{t('slide3_flow')}</p>
                       </div>
                    </SlideIn>
                 </div>
              </div>

              <SlideIn direction="right" delay={0.3}>
                 <div className="relative h-[42rem] rounded-2xl border border-white/10 bg-black/90 shadow-2xl overflow-hidden flex flex-col p-12 group">
                    <div className="flex items-center justify-between border-b border-white/5 pb-8 mb-10">
                       <div className="flex gap-3">
                          <div className="w-4 h-4 rounded-full bg-red-400/20" />
                          <div className="w-4 h-4 rounded-full bg-yellow-400/20" />
                          <div className="w-4 h-4 rounded-full bg-[#00FF9D] shadow-[0_0_15px_#00FF9D]" />
                       </div>
                       <div className="flex items-center gap-4">
                          <Eye className="w-5 h-5 text-[#00FF9D]/40" />
                          <span className="text-[11px] font-mono text-[#00FF9D]/40 uppercase tracking-[0.4em] font-bold">RUNTIME_TELEMETRY</span>
                       </div>
                    </div>
                    
                    <div className="space-y-6 font-mono text-[11px] leading-relaxed flex-1 opacity-50 group-hover:opacity-100 transition-opacity">
                       <p className="text-[#00FF9D] flex gap-4"><span className="opacity-20 text-white font-normal">SYS:</span> &gt; BOOTING_CORE.SAFEX_SHIELD</p>
                       <p className="text-white/40 flex gap-4"><span className="opacity-20 text-white font-normal">API:</span> &gt; REQ_HANDLERS :: RESTORE_GATEWAY</p>
                       <div className="pl-8 space-y-2 border-l border-[#00FF9D]/10 py-2 ml-2">
                          <p>&gt; LINK_AUDIT: URLSCAN.IO_PING ... 124ms</p>
                          <p>&gt; MALWARE_REP: VT_SYNC ... 88ms</p>
                          <p>&gt; BLACKLIST: ABUSE_DB_CHECK ... 42ms</p>
                       </div>
                       <p className="text-yellow-500/80 flex gap-4"><span className="opacity-20 text-white font-normal">MAT:</span> &gt; HEURISTIC_MATCH :: SIG_VECTOR_4</p>
                       <motion.p 
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="text-red-500 font-bold flex gap-4"
                       >
                          <span className="opacity-20 text-white font-normal">RES:</span> &gt; ALERT_TRIGGER :: SCAM_PROB(0.9992)
                       </motion.p>
                       <p className="text-blue-400 flex gap-4"><span className="opacity-20 text-white font-normal">TXN:</span> &gt; PUSH_UI_DASHBOARD :: COMPLETE</p>
                    </div>

                    <motion.div 
                       className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF9D] to-transparent shadow-[0_0_30px_#00FF9D] z-20 pointer-events-none"
                       style={{ top: scannerY }}
                    />
                 </div>
              </SlideIn>
           </div>
        </div>
      </Section>

      {/* SLIDE 4: EMPOWERMENT */}
      <Section>
        <div className="max-w-6xl w-full px-12 text-center space-y-20">
           <SlideIn direction="up">
              <div className="flex flex-col items-center">
                 <div className="inline-flex items-center gap-3 px-6 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-md mb-8">
                    <Brain className="w-5 h-5 text-yellow-500" />
                    <span className="text-[10px] font-mono font-black uppercase text-yellow-500 tracking-[0.3em]">EDUCATIONAL_VECTORS</span>
                 </div>
                 <h2 className="text-6xl md:text-8xl font-sans font-black uppercase tracking-tighter leading-none mb-4">NEURAL_DEPRESSION</h2>
                 <p className="text-lg md:text-2xl font-mono uppercase tracking-[0.5em] text-[#00FF9D]/80 mb-10">THE HUMAN FIREWALL</p>
              </div>
           </SlideIn>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <SlideIn direction="left" delay={0.2}>
                 <TerminalFrame title="TRAINING_UNIT_X.BIN" className="h-full flex flex-col group">
                    <h4 className="text-2xl font-mono font-black uppercase tracking-tight text-[#00FF9D] mb-6">{t('slide4_module').split(':')[0]}</h4>
                    <p className="text-base font-mono text-white/30 leading-relaxed font-medium mb-12 flex-1 italic group-hover:text-white/60 transition-colors">{t('slide4_module').split(':')[1]}</p>
                    <div className="flex gap-4">
                       <span className="px-4 py-2 bg-[#00FF9D]/10 rounded-md text-[9px] font-mono font-black uppercase text-[#00FF9D] tracking-widest border border-[#00FF9D]/20">{t('slide4_modes').split('•')[0]}</span>
                       <span className="px-4 py-2 bg-white/5 rounded-md text-[9px] font-mono font-black uppercase text-white/30 tracking-widest border border-white/5">{t('slide4_modes').split('•')[1]}</span>
                    </div>
                 </TerminalFrame>
              </SlideIn>
              <SlideIn direction="right" delay={0.4}>
                 <TerminalFrame title="ROADMAP_LOG.TXT" className="h-full flex flex-col group border-dashed border-blue-500/30">
                    <h4 className="text-2xl font-mono font-black uppercase tracking-tight text-blue-400 mb-6">{t('slide4_regional').split(':')[0]}</h4>
                    <p className="text-base font-mono text-white/30 leading-relaxed font-medium mb-12 flex-1 italic group-hover:text-white/60 transition-colors italic">{t('slide4_regional').split(':')[1]}</p>
                    <div className="p-5 rounded-lg bg-blue-500/5 border border-blue-500/10 font-mono">
                       <h5 className="text-[9px] font-black uppercase text-blue-400 tracking-widest mb-3"># UPCOMING_ALPHAS</h5>
                       <p className="text-[10px] uppercase tracking-widest text-white/30">{t('slide4_roadmap')}</p>
                    </div>
                 </TerminalFrame>
              </SlideIn>
           </div>

           <SlideIn direction="up" delay={0.6}>
              <div className="pt-16 flex flex-col items-center">
                 <Button 
                   onClick={onComplete}
                   className="h-20 px-12 md:px-24 rounded-lg bg-[#00FF9D] hover:bg-white text-black font-mono font-black uppercase tracking-[0.4em] text-xl md:text-2xl transition-all shadow-[0_20px_40px_rgba(0,255,157,0.3)] hover:scale-105 active:scale-95 group relative overflow-hidden"
                 >
                   <div className="absolute inset-x-0 h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                   &gt; LAUNCH_DASHBOARD
                 </Button>
                 
                 <div className="mt-20 opacity-30 flex flex-col items-center gap-8 font-mono">
                    <div className="w-px h-16 bg-[#00FF9D]/40" />
                    <div className="text-center">
                       <p className="text-[10px] font-black uppercase tracking-[1em] text-[#00FF9D]">{t('nexus')}</p>
                       <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/50 mt-4 leading-loose">ENCRYPTED // SECURE // BILINGUAL</p>
                    </div>
                 </div>
              </div>
           </SlideIn>
        </div>
      </Section>
    </div>
  );
}
