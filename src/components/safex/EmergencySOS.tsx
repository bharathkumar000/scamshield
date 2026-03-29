'use client';

import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Phone, 
  ShieldAlert, 
  Lock, 
  FileText, 
  Upload, 
  ExternalLink,
  Octagon,
  AlertCircle,
  Banknote,
  Smartphone,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function EmergencySOS({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(1);

  const steps = [
    { id: 1, title: t('sos_step1'), icon: <Octagon className="w-6 h-6" /> },
    { id: 2, title: t('sos_step2'), icon: <Lock className="w-6 h-6" /> },
    { id: 3, title: t('sos_step3'), icon: <Upload className="w-6 h-6" /> },
    { id: 4, title: t('sos_step4'), icon: <FileText className="w-6 h-6" /> },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-[#1a0000] overflow-y-auto selection:bg-[#FF3B3B]/30"
      >
        {/* Urgent Background Noise */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        <div className="relative min-h-screen flex flex-col">
          {/* Header */}
          <header className="p-6 md:p-10 flex items-center justify-between border-b border-[#FF3B3B]/20 bg-[#1a0000]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FF3B3B] flex items-center justify-center animate-pulse shadow-[0_0_20px_rgba(255,59,59,0.5)]">
                <ShieldAlert className="text-white w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-[#FF3B3B] tracking-tighter uppercase leading-none">{t('sos_title')}</h1>
                <p className="text-[10px] font-bold text-white/40 tracking-[0.3em] uppercase mt-1">{t('sos_subtitle')}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </header>

          <main className="flex-1 container mx-auto max-w-6xl px-6 py-12">
            {/* Progress Stepper */}
            <div className="flex flex-wrap gap-4 mb-16 px-2">
              {steps.map((s) => (
                <div 
                  key={s.id}
                  onClick={() => setStep(s.id)}
                  className={`flex-1 min-w-[140px] p-4 rounded-2xl border transition-all cursor-pointer ${
                    step === s.id 
                    ? 'bg-[#FF3B3B] border-[#FF3B3B] text-white shadow-[0_10px_30px_rgba(255,59,59,0.2)]' 
                    : step > s.id 
                    ? 'bg-[#FF3B3B]/10 border-[#FF3B3B]/30 text-[#FF3B3B]' 
                    : 'bg-white/5 border-white/10 text-white/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Step 0{s.id}</span>
                    {step > s.id && <ShieldCheck className="w-4 h-4" />}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={step === s.id ? 'text-white' : 'opacity-40'}>{s.icon}</div>
                    <span className="text-xs font-black uppercase tracking-tight leading-none">{s.title}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-8 md:p-16 min-h-[500px] relative overflow-hidden">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="space-y-12"
                  >
                    <div className="max-w-2xl">
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
                      {t('sos_step1')}
                    </h2>
                    <p className="text-xl text-white/40 font-medium italic">{t('sos_step1_desc')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Button className="h-40 rounded-[2.5rem] bg-[#FF3B3B] hover:bg-[#FF3B3B]/90 text-white flex flex-col gap-4 group">
                        <Phone className="w-10 h-10 group-hover:rotate-12 transition-transform" />
                        <div className="text-center">
                          <span className="block text-2xl font-black">1930</span>
                          <span className="text-[10px] uppercase font-black tracking-widest opacity-60">{t('sos_call_1930')}</span>
                        </div>
                      </Button>
                      <Button className="h-40 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 text-white flex flex-col gap-4 group">
                        <Smartphone className="w-10 h-10 group-hover:scale-110 transition-transform text-[#FF3B3B]" />
                        <div className="text-center">
                          <span className="block text-xl font-black uppercase leading-none mb-1">UPI BLOCK</span>
                          <span className="text-[10px] uppercase font-black tracking-widest opacity-40">{t('sos_block_upi')}</span>
                        </div>
                      </Button>
                      <Button className="h-40 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 text-white flex flex-col gap-4 group">
                        <Banknote className="w-10 h-10 group-hover:scale-110 transition-transform text-[#FF3B3B]" />
                        <div className="text-center">
                          <span className="block text-xl font-black uppercase leading-none mb-1">BANK FREEZE</span>
                          <span className="text-[10px] uppercase font-black tracking-widest opacity-40">{t('sos_freeze_bank')}</span>
                        </div>
                      </Button>
                    </div>

                    <div className="p-8 rounded-[2rem] bg-amber-500/5 border border-amber-500/20 flex gap-6 items-start">
                      <AlertCircle className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
                      <div>
                        <h4 className="text-amber-500 font-black uppercase tracking-widest text-sm mb-2">Did you know?</h4>
                        <p className="text-amber-500/60 text-sm font-medium leading-relaxed leading-tight uppercase italic font-bold">
                          The "Golden Hour" is the first 2 hours of a cyber transaction. Calling 1930 immediately gives local police the power to freeze the money in the scammer's bank account before they withdraw it.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="space-y-12"
                  >
                    <div className="max-w-2xl">
                      <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 leading-none">{t('sos_step2')}</h2>
                      <p className="text-xl text-white/40 font-medium italic">Contain the breach by auditing your digital access.</p>
                    </div>

                    <div className="space-y-4">
                      {[
                        { title: t('sos_lock_logout'), sub: 'Force logout all active sessions across Google, Meta, and Banking apps.', icon: <X /> },
                        { title: t('sos_lock_reset'), sub: 'Change passwords for email, LinkedIn, and banking apps immediately.', icon: <Lock /> },
                        { title: t('sos_lock_2fa'), sub: 'Use Authenticator apps instead of SMS-based OTP if possible.', icon: <ShieldCheck /> }
                      ].map((item, i) => (
                        <div key={i} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-between group hover:border-[#FF3B3B]/40 transition-all">
                          <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#FF3B3B]">
                              {item.icon}
                            </div>
                            <div>
                              <h3 className="text-xl font-black text-white uppercase tracking-tight">{item.title}</h3>
                              <p className="text-white/40 text-sm font-medium">{item.sub}</p>
                            </div>
                          </div>
                          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#FF3B3B] group-hover:bg-[#FF3B3B] transition-all">
                            <ChevronRight className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="space-y-12"
                  >
                    <div className="max-w-2xl">
                      <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 leading-none">{t('sos_step3')}</h2>
                      <p className="text-xl text-white/40 font-medium italic">{t('sos_vault_desc')}</p>
                    </div>

                    <div className="h-80 rounded-[3rem] border-4 border-dashed border-white/10 hover:border-[#FF3B3B]/40 transition-all flex flex-col items-center justify-center text-center p-12 group">
                      <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-white/20 mb-6 group-hover:scale-110 transition-transform">
                        <Upload className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">{t('sos_drop_zone')}</h3>
                      <p className="text-white/30 text-sm uppercase tracking-widest font-bold">Supports PNG, JPG, PDF (Max 10MB)</p>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div 
                    key="step4"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="space-y-12"
                  >
                    <div className="max-w-2xl">
                      <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 leading-none">{t('sos_step4')}</h2>
                      <p className="text-xl text-white/40 font-medium italic">Finalize your report for legal submission.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 space-y-8">
                        <div>
                          <h4 className="text-[#FF3B3B] font-black uppercase tracking-widest text-xs mb-4">AUTO-DRAFTED CONTENT</h4>
                          <div className="space-y-4 text-white/60 font-mono text-sm">
                            <p>[SUBJECT] Cyber Fraud Complaint - Immediate Block Request</p>
                            <p>To: The Cyber Cell, Mysuru</p>
                            <p>I wish to report a phishing scam Occurred on {new Date().toLocaleDateString()}. Transaction ID: ________________. Impact: Possible financial theft...</p>
                          </div>
                        </div>
                        <Button className="w-full h-16 rounded-2xl bg-[#FF3B3B] text-white font-black uppercase tracking-widest">
                          <ShieldCheck className="mr-3 w-5 h-5" /> {t('sos_report_gen')}
                        </Button>
                      </div>

                      <div className="flex flex-col gap-6">
                        <a 
                          href="https://cybercrime.gov.in" 
                          target="_blank"
                          className="flex-1 p-8 rounded-[2.5rem] bg-blue-600/10 border border-blue-500/20 hover:bg-blue-600/20 transition-all flex items-center justify-between group"
                        >
                          <div>
                            <h4 className="text-blue-400 font-black uppercase tracking-tight text-xl mb-1">GOVT PORTAL</h4>
                            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">cybercrime.gov.in</p>
                          </div>
                          <ExternalLink className="text-blue-400 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                        <a 
                          href="#" 
                          className="flex-1 p-8 rounded-[2.5rem] bg-green-600/10 border border-green-500/20 hover:bg-green-600/20 transition-all flex items-center justify-between group"
                        >
                          <div>
                            <h4 className="text-green-400 font-black uppercase tracking-tight text-xl mb-1">MYSURU CYBER CELL</h4>
                            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Local Police Support</p>
                          </div>
                          <Phone className="text-green-400 w-6 h-6 group-hover:scale-110 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-12 flex justify-between gap-6 px-6">
              <Button 
                onClick={() => setStep(s => Math.max(1, s - 1))}
                disabled={step === 1}
                className="h-16 px-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black uppercase tracking-widest disabled:opacity-20"
              >
                Previous
              </Button>
              {step < 4 ? (
                <Button 
                  onClick={() => setStep(s => Math.min(4, s + 1))}
                  className="h-16 px-12 rounded-2xl bg-[#FF3B3B] hover:bg-[#FF3B3B]/90 text-white font-black uppercase tracking-widest ml-auto"
                >
                  Continue Action
                </Button>
              ) : (
                <Button 
                  onClick={onClose}
                  className="h-16 px-12 rounded-2xl bg-white text-black font-black uppercase tracking-widest ml-auto hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                  Exit Emergency Flow
                </Button>
              )}
            </div>
          </main>

          <footer className="p-10 border-t border-white/5 text-center">
            <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em]">Emergency System Active • Local Data Storage Only</p>
          </footer>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
