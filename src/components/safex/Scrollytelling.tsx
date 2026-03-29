'use client';

import { useLanguage } from '@/context/LanguageContext';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, forwardRef } from 'react';
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

const SlideIn = ({ children, direction = 'right', delay = 0, className = "" }: { children: React.ReactNode, direction?: 'left' | 'right' | 'up' | 'down', delay?: number, className?: string }) => {
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
      className={`w-full ${className}`}
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

const Section = forwardRef<HTMLElement, { children: React.ReactNode, className?: string }>(({ children, className = "" }, ref) => (
  <section ref={ref} className={`min-h-screen relative flex flex-col items-center justify-center overflow-hidden py-24 ${className}`}>
    {children}
  </section>
));
Section.displayName = 'Section';

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
  const protectRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const trainingRef = useRef<HTMLElement>(null);
  const impactRef = useRef<HTMLElement>(null);
  
  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progressBar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const scannerY = useTransform(scrollYProgress, [0.6, 0.8], ["-10%", "110%"]);

  // Parallax effects for background
  const bgY1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  // Keyboard Navigation like PPT
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowRight', ' '].includes(e.key)) {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      } else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
        window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
        <motion.div style={{ y: bgY1 }} className="absolute top-[10%] left-[-10%] w-[60%] h-[60%] bg-[#00FF9D]/5 blur-[200px] rounded-full animate-pulse" />
        <motion.div style={{ y: bgY2 }} className="absolute bottom-[10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/5 blur-[200px] rounded-full animate-pulse" />
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
          <h1 className="text-6xl md:text-8xl font-sans font-black uppercase tracking-tighter leading-none mb-4 text-gradient">
            Safe<span className="text-white">x</span>
          </h1>
          <p className="text-xl md:text-2xl font-mono uppercase tracking-[1em] text-white/20 italic">
            DECRYPTING SAFETY
          </p>
        </motion.div>
      </Section>

      {/* SLIDE 1: THE CRISIS (PROBLEM) */}
      <Section className="scroll-mt-screen" ref={protectRef}>
        <div className="max-w-6xl w-full px-12">
           <TerminalFrame title="SECURITY_THREAT_ASSESSMENT.LOG">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                 <SlideIn direction="left">
                    <div className="space-y-12">
                       <div>
                          <div className="inline-flex items-center gap-3 px-6 py-2 bg-red-500/10 border border-red-500/20 rounded-md mb-8">
                             <AlertTriangle className="w-4 h-4 text-red-500" />
                             <span className="text-[10px] font-mono font-black uppercase text-red-500 tracking-[0.3em]">CRITICAL_ALERT</span>
                          </div>
                          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none mb-4 text-white">THE ₹1.2<span className="text-red-500">L</span> CR GASP</h2>
                          <div className="space-y-6 font-mono border-l-2 border-red-500/20 pl-8">
                             <p className="text-xl md:text-2xl font-bold text-red-500/80 italic leading-snug">
                                {t('slide1_problem')}
                             </p>
                             <div className="flex flex-col gap-2 pt-4">
                                <div className="text-[10px] text-white/40 uppercase tracking-widest">NATIONAL IMPACT :</div>
                                <div className="text-2xl font-black text-white/90">₹1,20,000,000,000+ <span className="text-[10px] text-white/30 font-normal underline">PER ANNUM</span></div>
                             </div>
                          </div>
                       </div>
                    </div>
                 </SlideIn>

                 <SlideIn direction="right" delay={0.2}>
                    <div className="relative p-10 rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden group">
                       <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                       <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/30 mb-10">&gt; HUMAN_VULNERABILITY_INDEX</h3>
                       <div className="space-y-8">
                          {[
                             { label: 'SENSE OF URGENCY', val: '92%', color: 'bg-red-500' },
                             { label: 'IDENTITY MIMICRY', val: '88%', color: 'bg-orange-500' },
                             { label: 'KNOWLEDGE GAP', val: '74%', color: 'bg-yellow-500' }
                          ].map((item, i) => (
                             <div key={i} className="space-y-3">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/60">
                                   <span>{item.label}</span>
                                   <span>{item.val}</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                   <motion.div 
                                      initial={{ width: 0 }}
                                      whileInView={{ width: item.val }}
                                      transition={{ duration: 1.5, delay: i * 0.2 }}
                                      className={`h-full ${item.color}`}
                                   />
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                 </SlideIn>
              </div>
           </TerminalFrame>
        </div>
      </Section>

      {/* SLIDE 2: THE SOLUTION (SHIELD) */}
      <Section className="scroll-mt-screen" ref={featuresRef}>
        <div className="max-w-7xl w-full px-12 text-center">
           <SlideIn direction="up">
              <div className="inline-flex items-center gap-4 px-8 py-3 bg-[#00FF9D]/5 border border-[#00FF9D]/20 rounded-full mb-12 backdrop-blur-3xl">
                 <ShieldCheck className="w-5 h-5 text-[#00FF9D]" />
                 <span className="text-xs font-mono font-black uppercase text-[#00FF9D] tracking-[0.4em]">1-SECOND WARNING SYSTEM</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-10 mx-auto max-w-4xl">
                 CORE_SHIELD <span className="text-[#00FF9D]">ECOSYSTEM</span>
              </h2>
           </SlideIn>

           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
              {[
                 { icon: <Search className="w-5 h-5" />, title: 'LINK_SCAN', desc: 'Homograph Attack Detection', detail: 'O(L) Trie Matching' },
                 { icon: <Smartphone className="w-5 h-5" />, title: 'SMS_AUDIT', desc: 'Urgency Sentiment AI', detail: 'Neural Text Analysis' },
                 { icon: <Radar className="w-5 h-5" />, title: 'UPI_GUARD', desc: 'Lookalike ID Matching', detail: 'Linguistic Heuristics' },
                 { icon: <Lock className="w-5 h-5" />, title: 'PRIVACY_X', desc: 'Zero-Data Architecture', detail: 'Local Edge Computing' }
              ].map((p, i) => (
                 <SlideIn key={i} direction="up" delay={i * 0.1}>
                    <div className="group relative p-8 rounded-2xl bg-black/40 border border-white/5 hover:border-[#00FF9D]/30 transition-all duration-500">
                       <div className="w-14 h-14 rounded-xl bg-white/[0.03] flex items-center justify-center text-white/40 mb-8 mx-auto group-hover:bg-[#00FF9D]/10 group-hover:text-[#00FF9D] transition-all">
                          {p.icon}
                       </div>
                       <h3 className="text-lg font-mono font-black uppercase mb-2 tracking-widest text-white/90">{p.title}</h3>
                       <p className="text-xs font-mono uppercase text-white/40 mb-6 group-hover:text-white/60 transition-colors">{p.desc}</p>
                       <div className="text-[10px] font-black uppercase tracking-widest text-[#00FF9D]/40 group-hover:text-[#00FF9D] transition-colors bg-[#00FF9D]/5 py-2 rounded-md">
                          {p.detail}
                       </div>
                    </div>
                 </SlideIn>
              ))}
           </div>
        </div>
      </Section>

      {/* SLIDE 3: DATA STRUCTURES & ALGORITHMS (TECH) */}
      <Section className="bg-[#050505]">
        <div className="max-w-7xl w-full px-12">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-16">
                 <SlideIn direction="left">
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-purple-500/10 border border-purple-500/20 rounded-md mb-8">
                       <Cpu className="w-5 h-5 text-purple-400" />
                       <span className="text-[10px] font-mono font-black uppercase text-purple-400 tracking-[0.3em]">ALGORITHMIC_EXCELLENCE</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-sans font-black uppercase tracking-tighter leading-[0.9] mb-10">THE ARCHITECTURE OF <span className="text-purple-400">SAFETY</span></h2>
                 </SlideIn>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                       { title: 'TRIES (PREFIX TREES)', desc: 'Ultra-fast O(L) domain blacklisting and prefix matching for millions of malicious URLs.' },
                       { title: 'BLOOM FILTERS', desc: 'Space-efficient probabilistic data structures for instant safety verification.' },
                       { title: 'DYNAMIC PROGRAMMING', desc: 'Levenshtein Distance algorithms to detect "lookalike" (Homograph) characters.' },
                       { title: 'FINITE STATE MACHINES', desc: 'Powering the deterministic state flow of the SOS Panic Room & Educational tracks.' }
                    ].map((tech, i) => (
                       <SlideIn key={i} direction="left" delay={0.2 + (i * 0.1)}>
                          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 font-mono shadow-xl hover:border-purple-500/30 transition-colors">
                             <h4 className="text-xs font-black uppercase tracking-[0.2em] text-purple-400 mb-3 italic">{tech.title}</h4>
                             <p className="text-xs text-white/50 leading-relaxed uppercase">{tech.desc}</p>
                          </div>
                       </SlideIn>
                    ))}
                 </div>
              </div>

              <SlideIn direction="right" delay={0.3}>
                 <div className="relative rounded-2xl border border-white/10 bg-black/90 shadow-2xl overflow-hidden p-1 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent)]">
                    <TerminalFrame title="CORE_HEURISTICS_ENGINE" className="border-none">
                       <div className="space-y-6 font-mono text-[11px] leading-relaxed">
                          <div className="flex justify-between items-center text-purple-400/60 font-black">
                             <span>STACK: NEXT.js 16 | REACT 19 | TS</span>
                             <span>V1.16_RC</span>
                          </div>
                          <div className="p-6 bg-black/60 rounded-lg border border-white/5 space-y-4">
                             <p className="text-white/40 flex gap-4"><span className="text-purple-500">01</span> &gt; INITIALIZING_TRIE_WALK...</p>
                             <div className="pl-8 space-y-1">
                                <p className="text-white/60">&gt; SEARCH( "urnzn.in" )</p>
                                <p className="text-purple-400/80">&gt; DISTANCE: 0.88 (LEVENSHTEIN)</p>
                                <p className="text-red-500 font-bold">&gt; MATCH FOUND: amazon.in</p>
                             </div>
                             <p className="text-white/40 flex gap-4"><span className="text-purple-500">02</span> &gt; PROBABILISTIC_CHECK: BLOOM_HIT</p>
                             <p className="text-white/40 flex gap-4"><span className="text-purple-500">03</span> &gt; FSM_STATE: SOS_TRIGGER_READY</p>
                             <div className="pt-6 border-t border-white/5 flex gap-1 justify-center">
                                {[...Array(20)].map((_, i) => (
                                   <motion.div 
                                      key={i}
                                      animate={{ height: [4, 20, 4] }}
                                      transition={{ repeat: Infinity, duration: 1, delay: i * 0.05 }}
                                      className="w-1 bg-purple-500/40 rounded-full"
                                   />
                                ))}
                             </div>
                          </div>
                       </div>
                    </TerminalFrame>
                 </div>
              </SlideIn>
           </div>
        </div>
      </Section>

      {/* SLIDE 4: CASE STUDY - SOS PANIC ROOM */}
      <Section className="scroll-mt-screen" ref={trainingRef}>
        <div className="max-w-7xl w-full px-12 space-y-24">
           {/* Top Row: Title & Card */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <SlideIn direction="left">
                 <div className="space-y-12">
                    <div>
                       <div className="inline-flex items-center gap-3 px-6 py-2 bg-red-500/10 border border-red-500/20 rounded-md mb-8">
                          <Activity className="w-5 h-5 text-red-500" />
                          <span className="text-[10px] font-mono font-black uppercase text-red-500 tracking-[0.3em]">CASE_STUDY_REF:2026</span>
                       </div>
                       <h2 className="text-3xl md:text-5xl font-sans font-black uppercase tracking-tighter leading-none mb-8 text-white">
                          THE GAP BETWEEN 
                          <span className="block text-red-500 italic underline decoration-white/20">SCAM & ACTION</span>
                       </h2>
                       <p className="text-lg md:text-2xl font-mono text-white/40 uppercase leading-relaxed italic border-l-2 border-red-500/20 pl-8 max-w-xl">
                          {t('dt_sos_rationale')}
                       </p>
                    </div>
                 </div>
              </SlideIn>

              <SlideIn direction="right">
                 <div className="relative aspect-video rounded-3xl border border-red-500/20 bg-black/60 overflow-hidden shadow-[0_0_100px_rgba(239,68,68,0.1)] group">
                    <div className="absolute inset-x-0 h-full bg-gradient-to-t from-red-500/20 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                       <div className="w-20 h-20 rounded-full bg-red-500/10 border-4 border-red-500/20 flex items-center justify-center mb-8 relative">
                          <motion.div 
                             animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0, 0.1] }}
                             transition={{ repeat: Infinity, duration: 2 }}
                             className="absolute inset-0 bg-red-500 rounded-full"
                          />
                          <AlertTriangle className="w-8 h-8 text-red-500 animate-pulse" />
                       </div>
                       <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-4">SOS PANIC ROOM</h3>
                       <p className="text-[10px] font-mono font-black text-red-500 uppercase tracking-[0.5em] mb-10">URGENCY_ENGINE_ACTIVE</p>
                       <div className="flex gap-4">
                          <button className="px-6 py-2 bg-red-500 rounded font-mono text-[9px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors">BLOCK_ALL</button>
                          <button className="px-6 py-2 bg-white/10 rounded font-mono text-[9px] font-black uppercase tracking-widest text-white/40 hover:bg-white/20 transition-colors">GENERATE_DRAFT</button>
                       </div>
                    </div>
                 </div>
              </SlideIn>
           </div>

           {/* Bottom Row: 2x2 Grid of Actions */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                 'Immediate Freeze: One-click scripts for UPI & Bank lockdown.',
                 'Evidence Vault: Secure, local snapshot storage for forensics.',
                 'Reporting Engine: 1930 Helpline integration & Automated legal drafts.',
                 'Bilingual SOS: Kannada/English voice guidance for crisis moments.'
              ].map((step, i) => (
                 <SlideIn key={i} direction="up" delay={0.2 + (i * 0.1)}>
                    <div className="flex items-center gap-6 p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group hover:border-red-500/20">
                       <div className="text-xl md:text-3xl font-black text-red-500/20 group-hover:text-red-500 transition-colors">0{i+1}</div>
                       <div className="text-xs md:text-sm font-mono font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white/80 transition-all leading-relaxed">{step}</div>
                    </div>
                 </SlideIn>
              ))}
           </div>
        </div>
      </Section>


      {/* SLIDE 5: IMPACT & SDGs */}
      <Section className="scroll-mt-screen" ref={impactRef}>
        <div className="max-w-7xl w-full px-12 text-center space-y-24 pb-24">
           <SlideIn direction="up">
              <div className="flex flex-col items-center">
                 <div className="inline-flex items-center gap-4 px-8 py-3 bg-blue-500/10 border border-blue-500/20 rounded-full mb-10">
                    <Globe className="w-5 h-5 text-blue-400" />
                    <span className="text-xs font-mono font-black uppercase text-blue-400 tracking-[0.4em]">SOCIO_ECONOMIC_MANDATE</span>
                 </div>
                 <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight">IMPACT <span className="text-blue-400 italic">ROI</span></h2>
              </div>
           </SlideIn>

           {/* BIG IMPACT COUNTER */}
           <SlideIn direction="up" delay={0.2}>
              <div className="relative p-12 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-3xl overflow-hidden text-left max-w-5xl mx-auto group">
                 <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity">
                    <Zap className="w-20 h-20 text-[#00FF9D]" />
                 </div>
                 <div className="space-y-4">
                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white group-hover:text-[#00FF9D] transition-colors">THE SAVINGS MULTIPLIER</h3>
                    <div className="flex flex-col md:flex-row gap-8 items-baseline">
                       <div className="text-5xl md:text-7xl font-black text-[#00FF9D] font-mono">₹1.2<span className="text-2xl text-white/40">L</span> CR</div>
                       <p className="text-lg md:text-xl font-mono text-white/40 uppercase tracking-widest max-w-sm">
                          POTENTIAL ANNUAL WEALTH PROTECTION BY NEUTRALIZING HOMOGRAPH & UPI VECTORS.
                       </p>
                    </div>
                 </div>
              </div>
           </SlideIn>

           <div className="grid grid-cols-1 md:grid-cols-6 gap-8 max-w-6xl mx-auto">
              {[
                 { 
                   sdg: 'SDG_03: WELLNESS', 
                   title: 'HUMAN_COST_REDUCTION', 
                   desc: 'Eliminating the psychological trauma and life-shattering stress caused by savings theft.',
                   color: 'blue' 
                 },
                 { 
                   sdg: 'SDG_04: EDUCATION', 
                   title: 'DIGITAL_IMMUNITY', 
                   desc: 'Turning the "Scammed" into "Scam-Proof" through gamified certification and peer learning.',
                   color: '[#00FF9D]' 
                 },
                 { 
                   sdg: 'SDG_08: GROWTH', 
                   title: 'FINANCIAL_INTEGRITY', 
                   desc: 'Protecting the digital economy of the Next Billion by securing middle-class capital flow.',
                   color: 'yellow' 
                 },
                 { 
                   sdg: 'SDG_09: INNOVATION', 
                   title: 'TRUST_INFRASTRUCTURE', 
                   desc: 'Building resilient digital systems that users can trust for innovation and commerce.',
                   color: 'purple' 
                 },
                 { 
                   sdg: 'SDG_16: JUSTICE', 
                   title: 'EXPLOITATION_BLOCK', 
                   desc: 'Reducing organized cybercrime nodes and providing a voice to exploited rural users.',
                   color: 'red' 
                 }
              ].map((item, i) => (
                 <SlideIn key={i} direction="up" delay={0.3 + (i * 0.1)} className={`md:col-span-2 ${i === 3 ? 'md:col-start-2' : ''}`}>
                    <div className={`p-8 rounded-2xl bg-${item.color}-600/5 border border-white/5 space-y-6 hover:bg-white/[0.03] transition-all group relative overflow-hidden h-full w-full`}>
                       {/* White Corner Borders */}
                       <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-white opacity-40" />
                       <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-white opacity-40" />
                       <div className="absolute bottom-0 left-0 w-8 h-8 border-l border-b border-white opacity-40" />
                       <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-white opacity-40" />
                       
                       <h4 className={`text-sm font-black uppercase tracking-[0.3em] text-${item.color}-400 mb-2 italic`}>{item.sdg}</h4>
                       <h5 className="text-xl font-black uppercase tracking-tighter text-white/90">{item.title}</h5>
                       <p className="text-sm md:text-base font-mono text-white/40 leading-relaxed uppercase group-hover:text-white/60 transition-colors italic">{item.desc}</p>
                    </div>
                 </SlideIn>
              ))}
           </div>

           <SlideIn direction="up" delay={0.8}>
              <div className="pt-20 flex flex-col items-center">
                 <Button 
                   onClick={onComplete}
                   className="h-24 px-16 md:px-32 rounded-xl bg-[#00FF9D] hover:bg-white text-black font-mono font-black uppercase tracking-[0.5em] text-2xl md:text-3xl transition-all shadow-[0_20px_80px_rgba(0,255,157,0.4)] hover:scale-105 active:scale-95 group relative overflow-hidden"
                 >
                   LAUNCH_COMMAND_CENTER
                 </Button>
                 
                 <div className="mt-20 opacity-20 flex flex-col items-center gap-6 font-mono">
                    <div className="w-px h-24 bg-gradient-to-b from-[#00FF9D] to-transparent" />
                    <p className="text-[10px] uppercase tracking-[1em] text-white/50 text-center leading-loose">
                       EMPOWERING THE HUMAN FIREWALL<br/>FOR A SAFER DIGITAL INDIA
                    </p>
                 </div>
              </div>
           </SlideIn>
        </div>
      </Section>
    </div>
  );
}
