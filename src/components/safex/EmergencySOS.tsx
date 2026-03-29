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
  const [actionsCompleted, setActionsCompleted] = useState<{ [key: string]: boolean }>({});
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'complete'>('idle');

  const toggleAction = (id: string) => {
    setActionsCompleted(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const simulateUpload = () => {
    setUploadState('uploading');
    setTimeout(() => setUploadState('complete'), 2000);
  };

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
                <h1 className="text-xl font-black text-[#FF3B3B] tracking-tighter uppercase leading-none">{t('sos_title')}</h1>
                <p className="text-[9px] font-bold text-white/40 tracking-[0.3em] uppercase mt-1">{t('sos_subtitle')}</p>
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
                  className={`flex-1 min-w-[120px] p-3 rounded-xl border transition-all cursor-pointer ${
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
            <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-6 md:p-10 min-h-[400px] relative overflow-hidden">
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
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
                      {t('sos_step1')}
                    </h2>
                    <p className="text-lg text-white/40 font-medium italic">{t('sos_step1_desc')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button 
                        onClick={() => toggleAction('1930')}
                        className={`h-32 rounded-2xl transition-all duration-500 flex flex-col gap-2 group relative overflow-hidden ${
                          actionsCompleted['1930'] 
                          ? 'bg-green-600 hover:bg-green-700 shadow-[0_0_40px_rgba(34,197,94,0.4)]' 
                          : 'bg-[#FF3B3B] hover:bg-[#FF3B3B]/90 shadow-[0_0_20px_rgba(255,59,59,0.3)]'
                        }`}
                      >
                        <AnimatePresence mode="wait">
                          {actionsCompleted['1930'] ? (
                            <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-2">
                              <ShieldCheck className="w-10 h-10 text-white" />
                              <span className="text-[10px] uppercase font-black tracking-widest text-white/80">Dialed Successfully</span>
                            </motion.div>
                          ) : (
                            <motion.div key="phone" initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-2">
                              <Phone className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                              <div className="text-center">
                                <span className="block text-xl font-black">1930</span>
                                <span className="text-[9px] uppercase font-black tracking-widest opacity-60">{t('sos_call_1930')}</span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Button>

                      <Button 
                        onClick={() => toggleAction('upi')}
                        className={`h-32 rounded-2xl transition-all duration-500 border flex flex-col gap-2 group ${
                          actionsCompleted['upi']
                          ? 'bg-green-600/10 border-green-500 text-green-500'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                        }`}
                      >
                        <AnimatePresence mode="wait">
                          {actionsCompleted['upi'] ? (
                            <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-2">
                              <ShieldCheck className="w-8 h-8" />
                              <span className="text-[9px] uppercase font-black tracking-widest">UPI LOCK ACTIVE</span>
                            </motion.div>
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                               <Smartphone className="w-8 h-8 group-hover:scale-110 transition-transform text-[#FF3B3B]" />
                               <div className="text-center">
                                 <span className="block text-lg font-black uppercase leading-none mb-1">UPI BLOCK</span>
                                 <span className="text-[9px] uppercase font-black tracking-widest opacity-40">{t('sos_block_upi')}</span>
                               </div>
                            </div>
                          )}
                        </AnimatePresence>
                      </Button>

                      <Button 
                        onClick={() => toggleAction('bank')}
                        className={`h-32 rounded-2xl transition-all duration-500 border flex flex-col gap-2 group ${
                          actionsCompleted['bank']
                          ? 'bg-green-600/10 border-green-500 text-green-500'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                        }`}
                      >
                       <AnimatePresence mode="wait">
                          {actionsCompleted['bank'] ? (
                            <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-2">
                              <ShieldCheck className="w-8 h-8" />
                              <span className="text-[9px] uppercase font-black tracking-widest">BANK FREEZE INITIATED</span>
                            </motion.div>
                          ) : (
                             <div className="flex flex-col items-center gap-2">
                               <Banknote className="w-8 h-8 group-hover:scale-110 transition-transform text-[#FF3B3B]" />
                               <div className="text-center">
                                 <span className="block text-lg font-black uppercase leading-none mb-1">BANK FREEZE</span>
                                 <span className="text-[9px] uppercase font-black tracking-widest opacity-40">{t('sos_freeze_bank')}</span>
                               </div>
                             </div>
                          )}
                        </AnimatePresence>
                      </Button>
                    </div>

                    <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex gap-6 items-start">
                      <AlertCircle className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                      <div>
                        <h4 className="text-amber-500 font-black uppercase tracking-widest text-[10px] mb-2">Did you know?</h4>
                        <p className="text-amber-500/60 text-xs font-medium leading-relaxed uppercase italic font-bold">
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
                        { id: 'logout', title: t('sos_lock_logout'), sub: 'Force logout all active sessions across Google, Meta, and Banking apps.', icon: <X /> },
                        { id: 'reset', title: t('sos_lock_reset'), sub: 'Change passwords for email, LinkedIn, and banking apps immediately.', icon: <Lock /> },
                        { id: '2fa', title: t('sos_lock_2fa'), sub: 'Use Authenticator apps instead of SMS-based OTP if possible.', icon: <ShieldCheck /> }
                      ].map((item, i) => (
                        <button 
                          key={i} 
                          onClick={() => toggleAction(item.id)}
                          className={`w-full p-6 md:p-8 rounded-2xl border flex items-center justify-between group transition-all duration-300 ${
                            actionsCompleted[item.id] 
                            ? 'bg-green-600/10 border-green-500/50' 
                            : 'bg-white/5 border-white/10 hover:border-[#FF3B3B]/40'
                          }`}
                        >
                          <div className="flex items-center gap-6">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${actionsCompleted[item.id] ? 'bg-green-500 text-white' : 'bg-white/5 text-[#FF3B3B]'}`}>
                              {actionsCompleted[item.id] ? <ShieldCheck className="w-6 h-6" /> : item.icon}
                            </div>
                            <div className="text-left">
                              <h3 className={`text-lg font-black uppercase tracking-tight transition-colors ${actionsCompleted[item.id] ? 'text-green-500' : 'text-white'}`}>{item.title}</h3>
                              <p className="text-white/40 text-[10px] md:text-xs font-medium">{item.sub}</p>
                            </div>
                          </div>
                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${actionsCompleted[item.id] ? 'bg-green-500 border-green-500' : 'border-white/20'}`}>
                            {actionsCompleted[item.id] ? <ShieldCheck className="w-3 h-3 text-white" /> : <ChevronRight className="w-3 h-3 text-white" />}
                          </div>
                        </button>
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

                    <button 
                      onClick={simulateUpload}
                      disabled={uploadState !== 'idle'}
                      className={`w-full h-64 rounded-[2rem] border-4 border-dashed transition-all flex flex-col items-center justify-center text-center p-8 group relative overflow-hidden ${
                         uploadState === 'complete' ? 'border-green-500 bg-green-500/5' : 'border-white/10 hover:border-[#FF3B3B]/40'
                      }`}
                    >
                      {uploadState === 'uploading' && (
                        <motion.div 
                          className="absolute inset-x-0 bottom-0 h-1 bg-green-500"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2 }}
                        />
                      )}
                      
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all ${uploadState === 'complete' ? 'bg-green-500 text-white' : 'bg-white/5 text-white/20 group-hover:scale-110'}`}>
                        {uploadState === 'complete' ? <ShieldCheck className="w-8 h-8" /> : (uploadState === 'uploading' ? <Upload className="w-8 h-8 animate-bounce" /> : <Upload className="w-8 h-8" />)}
                      </div>
                      <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">
                        {uploadState === 'idle' ? t('sos_drop_zone') : (uploadState === 'uploading' ? 'HYPER_VAULT_UPLOADING...' : 'EVIDENCE_SECURED_LOCALLY')}
                      </h3>
                      <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">Supports PNG, JPG, PDF (Max 10MB)</p>
                    </button>
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
                        <Button 
                          onClick={() => toggleAction('report')}
                          className={`w-full h-16 rounded-2xl transition-all font-black uppercase tracking-widest ${actionsCompleted['report'] ? 'bg-green-600' : 'bg-[#FF3B3B]'}`}
                        >
                          <ShieldCheck className="mr-3 w-5 h-5" /> 
                          {actionsCompleted['report'] ? 'REPORT_DELIVERED' : t('sos_report_gen')}
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
                className="h-12 px-8 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black uppercase tracking-widest disabled:opacity-20"
              >
                Previous
              </Button>
              {step < 4 ? (
                <Button 
                  onClick={() => setStep(s => Math.min(4, s + 1))}
                  className="h-12 px-8 rounded-xl bg-[#FF3B3B] hover:bg-[#FF3B3B]/90 text-white font-black uppercase tracking-widest ml-auto"
                >
                  Continue Action
                </Button>
              ) : (
                <Button 
                  onClick={onClose}
                  className="h-12 px-8 rounded-xl bg-white text-black font-black uppercase tracking-widest ml-auto hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
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
