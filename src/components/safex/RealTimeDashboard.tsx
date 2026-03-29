'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Shield, 
  Search, 
  MapPin, 
  Activity, 
  User, 
  Link2, 
  MessageSquareText, 
  PhoneIncoming, 
  Wallet2, 
  Cpu,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Zap,
  Info,
  X,
  Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { scanUrl, explainScam, checkBreach } from '@/app/actions';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function RealTimeDashboard() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('message');
  const [inputText, setInputText] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isSimulatingCall, setIsSimulatingCall] = useState(false);
  const [simulationTimer, setSimulationTimer] = useState(0);

  // New Features States
  const [isExplaining, setIsExplaining] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [breachIdentifier, setBreachIdentifier] = useState('');
  const [isCheckingBreach, setIsCheckingBreach] = useState(false);
  const [breachResult, setBreachResult] = useState<any>(null);

  const [toggles, setToggles] = useState({
    ai: true,
    location: true,
    behavioral: false,
    personalization: false
  });

  // Tab Switching Logic: Clear text and results to prevent "demo bleed"
  useEffect(() => {
    setInputText('');
    setResult(null);
  }, [activeTab]);

  // Call Simulation Timer Logic
  useEffect(() => {
    let interval: any;
    if (isSimulatingCall) {
      interval = setInterval(() => setSimulationTimer(prev => prev + 1), 1000);
    } else {
      setSimulationTimer(0);
    }
    return () => clearInterval(interval);
  }, [isSimulatingCall]);

  const generateEvidencePDF = () => {
    if (!result || result.status !== 'danger') return;
    const doc = new jsPDF();
    const caseId = `SFX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    doc.setFillColor(220, 38, 38);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text('SAFEX EVIDENCE LOCKER', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text('OFFICIAL SCAM DETECTION & FORENSIC REPORT', 105, 30, { align: 'center' });
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text(`CASE ID: ${caseId}`, 15, 55);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 150, 55, { align: 'right' });
    autoTable(doc, {
      startY: 70, head: [['Metric', 'Detail']],
      body: [['Type', activeTab.toUpperCase()], ['Score', `${result.score}%`], ['Engine', result.engine]],
      headStyles: { fillColor: [0, 0, 0] }
    });
    const finalY = (doc as any).lastAutoTable.finalY || 100;
    doc.setFont('helvetica', 'bold');
    doc.text('OFFENDING PAYLOAD:', 15, finalY + 15);
    doc.setFont('helvetica', 'normal');
    const splitContent = doc.splitTextToSize(inputText, 180);
    doc.text(splitContent, 15, finalY + 22);
    if (explanation) {
      doc.setFont('helvetica', 'bold');
      doc.text('AI FORENSIC EXPLANATION:', 15, finalY + 45);
      doc.setFont('helvetica', 'normal');
      doc.text(doc.splitTextToSize(explanation, 180), 15, finalY + 52);
    }
    doc.save(`Safex_Evidence_${caseId}.pdf`);
  };

  const handleExplain = async () => {
    if (!inputText) return;
    setIsExplaining(true);
    const res = await explainScam(inputText, activeTab);
    setExplanation(res);
    setIsExplaining(false);
  };

  const handleBreachCheck = async () => {
    if (!breachIdentifier) return;
    setIsCheckingBreach(true);
    const res = await checkBreach(breachIdentifier);
    setBreachResult(res);
    setIsCheckingBreach(false);
  };

  const handleScan = async () => {
    if (!inputText) return;
    setIsScanning(true);
    setResult(null);
    setExplanation('');

    // Live API check for URL tab
    if (activeTab === 'url') {
      const liveResult = await scanUrl(inputText);
      setResult(liveResult as any);
      setIsScanning(false);
      return;
    }

    // Simulated scanner for other tabs
    setTimeout(() => {
      setIsScanning(false);
      const lower = inputText.toLowerCase();
      if (lower.includes('click') || lower.includes('win') || lower.includes('otp') || lower.includes('urgent') || lower.includes('block')) {
        setResult({
          status: 'danger',
          score: 92,
          flags: ['Scam Intent High', 'Urgency Detected', 'Credential Phishing'],
          engine: 'Safex Heuristic Engine'
        });
      } else {
        setResult({
          status: 'safe',
          score: 8,
          flags: ['Clean Pattern', 'Verified Sender', 'Normal Sentiment'],
          engine: 'Static Analysis Pro'
        });
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-full min-h-[700px] border-b border-white/5 bg-black/40">
      {/* SIDEBAR: Constraint Toggles */}
      <aside className="w-full lg:w-[260px] border-b lg:border-b-0 lg:border-r border-white/5 p-4 flex flex-col gap-4 bg-black/40 lg:bg-transparent overflow-hidden">
        <div className="flex items-center gap-2 mb-2 pr-4">
          <Info className="w-4 h-4 text-white/40" />
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Constraint Toggles</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 pr-1">
          <ToggleCard 
            icon={<Zap className="w-4 h-4" />}
            title="AI Intent Detection"
            desc="Linguistic manipulation"
            checked={toggles.ai}
            onCheckedChange={(val: boolean) => setToggles(p => ({ ...p, ai: val }))}
          />
          <ToggleCard 
            icon={<MapPin className="w-4 h-4" />}
            title="Location Check"
            desc="Geofencing anomalies"
            checked={toggles.location}
            onCheckedChange={(val: boolean) => setToggles(p => ({ ...p, location: val }))}
          />
          <ToggleCard 
            icon={<Activity className="w-4 h-4" />}
            title="Behavioral Analysis"
            desc="Detects unusual clicks"
            checked={toggles.behavioral}
            onCheckedChange={(val: boolean) => setToggles(p => ({ ...p, behavioral: val }))}
          />
          <ToggleCard 
            icon={<User className="w-4 h-4" />}
            title="Personalization"
            desc="Local history context"
            checked={toggles.personalization}
            onCheckedChange={(val: boolean) => setToggles(p => ({ ...p, personalization: val }))}
          />
        </div>
      </aside>

      {/* MAIN: Command Center */}
      <main className="flex-1 p-3 md:p-6 flex flex-col gap-6 overflow-hidden">
        {/* Header Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="hidden sm:flex w-12 h-12 bg-[#00FF9D]/10 rounded-xl items-center justify-center border border-[#00FF9D]/20 shrink-0">
              <Shield className="w-6 h-6 text-[#00FF9D]" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-tight">Real-Time Scam Shield</h2>
              <p className="text-white/40 text-[10px] md:text-xs font-medium">Instant Analysis Engine • Powered by Safex Core</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#00FF9D]/5 border border-[#00FF9D]/20 rounded-full shrink-0">
            <div className="w-2 h-2 rounded-full bg-[#00FF9D] animate-pulse" />
            <span className="text-[10px] font-black uppercase text-[#00FF9D] tracking-widest">Engine Online</span>
          </div>
        </div>

        {/* Extraction Engine Area */}
        <section className="bg-white/[0.02] border border-white/5 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 flex flex-col gap-6 flex-1">
          <div className="flex items-center gap-3">
            <Activity className="w-4 h-4 text-[#00FF9D]" />
            <h3 className="text-lg font-black text-white uppercase tracking-tight">Data Extraction Engine</h3>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col">
            <TabsList className="bg-black/40 border border-white/10 p-1 rounded-xl h-11 w-full flex items-stretch mb-6">
              <TabTrigger value="url" icon={<Link2 className="w-3.5 h-3.5" />} label="URL" />
              <TabTrigger value="message" icon={<MessageSquareText className="w-3.5 h-3.5" />} label="SMS" />
              <TabTrigger value="call" icon={<PhoneIncoming className="w-3.5 h-3.5" />} label="Voice" />
              <TabTrigger value="payment" icon={<Wallet2 className="w-3.5 h-3.5" />} label="UPI" />
              <TabTrigger value="breach" icon={<Search className="w-3.5 h-3.5" />} label="Breach" />
            </TabsList>

            <AnimatePresence mode="wait">
              {/* Message Tab */}
              <TabsContent key="message" value="message" className="space-y-6 animate-in fade-in duration-300 h-full flex flex-col">
                <TextEntry 
                  label="SMS / Chat Transcript"
                  value={inputText}
                  onChange={setInputText}
                  placeholder="Paste suspicious message text here..."
                />
                <QuickDemos 
                  items={[
                    { label: 'Phishing', text: 'URGENT: Your KYC is expired. Update at bit.ly/bank-kyc-99 to avoid account block.' },
                    { label: 'Lottery', text: 'Congrats! You won ₹1 Cr. Pay ₹500 fee to claim: reward-winner.in' },
                    { label: 'Tech Scam', text: 'Error #404-X: Virus detected. Call 1800-SECURE now for technical assistance.' }
                  ]}
                  onSelect={setInputText}
                />
                <ScanButton isScanning={isScanning} onClick={handleScan} label="Scan Message Content" disabled={!inputText} />
              </TabsContent>

              {/* URL Tab */}
              <TabsContent key="url" value="url" className="space-y-6 animate-in fade-in duration-300 h-full flex flex-col">
                <EntryField 
                  label="Target Analysis URL"
                  value={inputText}
                  placeholder="https://example.com/login"
                  onChange={setInputText}
                />
                <QuickDemos 
                  items={[
                    { label: 'Bitly Redirect', text: 'https://bit.ly/secure-access-v4' },
                    { label: 'Homograph', text: 'https://arnazon-india.in/verify' },
                    { label: 'Safe Link', text: 'https://google.com/safety' },
                    { label: 'Refund Site', text: 'https://tax-refund-portal.in/status' },
                    { label: 'Cloud Drive', text: 'https://dropbox-secure-share.xyz/files' },
                    { label: 'Bank Security', text: 'https://onlinesbi.sbi/security-tips' }
                  ]}
                  onSelect={setInputText}
                />
                <ScanButton isScanning={isScanning} onClick={handleScan} label="Verify Domain Safety" disabled={!inputText} />
              </TabsContent>

              {/* Voice Tab */}
              <TabsContent key="call" value="call" className="space-y-6 animate-in fade-in duration-300 h-full flex flex-col">
                <TextEntry 
                  label="VoIP / Telephony Transcript"
                  value={inputText}
                  onChange={setInputText}
                  placeholder="Transcription: 'Hello, this is SBI customer care...'"
                />
                <QuickDemos 
                  items={[
                    { label: 'OTP Fraud', text: 'Transcription: "Share the 6-digit OTP to reverse the transaction."' },
                    { label: 'Electricity', text: 'Call: "Your bill is unpaid. Power will cut at 10PM. Pay now."' },
                    { label: 'Govt Scam', text: 'Call: "We are from Income Tax Dept. There is a warrant against you."' }
                  ]}
                  onSelect={setInputText}
                />
                <div className="flex gap-4">
                  <ScanButton isScanning={isScanning} onClick={handleScan} label="Analyze Audio" disabled={!inputText} className="flex-1" />
                  <Button onClick={() => setIsSimulatingCall(true)} className="h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black uppercase text-xs px-6">
                    <Smartphone className="w-4 h-4 mr-2" /> Live Call
                  </Button>
                </div>
              </TabsContent>

              {/* UPI Tab */}
              <TabsContent key="payment" value="payment" className="space-y-6 animate-in fade-in duration-300 h-full flex flex-col">
                <EntryField 
                  label="UPI ID / Payment Link"
                  value={inputText}
                  placeholder="e.g., paytm-rewards@vpa"
                  onChange={setInputText}
                />
                <QuickDemos 
                  items={[
                    { label: 'Fake Reward', text: 'paytm-rewards.support@ybl' },
                    { label: 'Collect Request', text: 'income-tax-refund.gov.in@oksbi' },
                    { label: 'Safe Merchant', text: 'bill-payment@axisbank' }
                  ]}
                  onSelect={setInputText}
                />
                <ScanButton isScanning={isScanning} onClick={handleScan} label="Verify Payment Endpoint" disabled={!inputText} />
              </TabsContent>

              {/* Breach Tab */}
              <TabsContent key="breach" value="breach" className="space-y-6 animate-in fade-in duration-300 h-full flex flex-col">
                <div className="bg-[#00FF9D]/5 border border-[#00FF9D]/20 rounded-2xl p-6 mb-2">
                   <h4 className="text-[#00FF9D] font-black uppercase text-xs mb-2">Dark Web Scan Simulation</h4>
                   <p className="text-white/40 text-[10px]">Enter an email or phone number to check if it exists in known historical data leaks leaked by threat actors.</p>
                </div>
                <EntryField 
                  label="Email or Phone Number"
                  value={breachIdentifier}
                  placeholder="e.g., user@example.com"
                  onChange={setBreachIdentifier}
                />
                <ScanButton isScanning={isCheckingBreach} onClick={handleBreachCheck} label="Check for Breaches" disabled={!breachIdentifier} />
                
                {breachResult && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-4">
                     {breachResult.found ? (
                       <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                          <div className="flex items-center gap-3 text-red-500 font-bold text-sm mb-3">
                            <Shield className="w-4 h-4" /> LEAK DETECTED: {breachResult.count} SOURCES
                          </div>
                          <div className="space-y-2">
                             {breachResult.sources.map((s: any, i: number) => (
                               <div key={i} className="text-[10px] bg-black/40 p-2 rounded border border-white/5">
                                 <span className="text-red-400 font-black">{s.source}</span>
                                 <p className="text-white/40 mt-1">Exposed: {s.details}</p>
                               </div>
                             ))}
                          </div>
                       </div>
                     ) : (
                       <div className="bg-[#00FF9D]/10 border border-[#00FF9D]/20 rounded-xl p-4 text-[#00FF9D] font-bold text-sm">
                          <CheckCircle2 className="w-4 h-4 inline mr-2" /> No immediate breaches found in simulated DB.
                       </div>
                     )}
                  </motion.div>
                )}
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </section>
      </main>

      {/* Analysis Result Area (Right) */}
      <aside className="w-full lg:w-[340px] border-t lg:border-t-0 lg:border-l border-white/5 p-6 md:p-8 flex flex-col gap-6 bg-black/40 lg:bg-black/20 overflow-hidden relative">
        <AnimatePresence>
          {isScanning && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-6 left-6 right-6 z-50 bg-[#00FF9D] text-black p-4 rounded-xl shadow-[0_10px_40px_rgba(0,255,157,0.4)] flex items-center justify-between font-black uppercase tracking-widest text-[10px]"
            >
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>SCANNING_PAYLOAD...</span>
              </div>
              <Activity className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] aspect-square -z-10 opacity-20 pointer-events-none">
          <div className="absolute inset-0 border border-[#00FF9D]/20 rounded-full animate-ping" />
        </div>

        <div className="w-full min-h-[350px] rounded-2xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center p-6 text-center backdrop-blur-xl bg-black/40">
          <AnimatePresence mode="wait">
            {!result && !isScanning && (
              <motion.div key="await" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white/10 border border-white/10">
                  <Cpu className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black text-white uppercase tracking-tight">Ready for Input</h4>
                <p className="text-white/30 text-xs">Enter a payload to beginSafex Heuristic Analysis.</p>
              </motion.div>
            )}

            {isScanning && (
              <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
                <Loader2 className="w-12 h-12 text-[#00FF9D] animate-spin" />
                <h4 className="text-lg font-black text-[#00FF9D] uppercase tracking-widest animate-pulse">Analyzing...</h4>
              </motion.div>
            )}

            {result && !isScanning && (
              <motion.div key="res" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-6">
                <div className={`p-6 rounded-2xl border-2 ${result.status === 'danger' ? 'border-red-500/30 bg-red-500/5 text-red-500' : 'border-[#00FF9D]/30 bg-[#00FF9D]/5 text-[#00FF9D]'}`}>
                  {result.status === 'danger' ? <AlertTriangle className="w-10 h-10 mx-auto mb-3" /> : <CheckCircle2 className="w-10 h-10 mx-auto mb-3" />}
                  <h5 className="text-4xl font-black">{result.score}%</h5>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em]">{result.status === 'danger' ? 'Scam Detected' : 'Verified Safe'}</p>
                </div>
                <div className="space-y-2 text-left">
                  {result.flags.map((f: string) => (
                    <div key={f} className="flex items-center gap-3 text-[10px] md:text-xs text-white/70 bg-white/5 p-3 rounded-xl border border-white/5 group transition-colors hover:border-white/10">
                      <Zap className="w-3.5 h-3.5 text-[#00FF9D] group-hover:animate-pulse" /> {f}
                    </div>
                  ))}

                  {/* Contextual AI Explainer UI */}
                  {explanation ? (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="bg-[#00FF9D]/5 border border-[#00FF9D]/20 rounded-xl p-4 mt-2">
                       <div className="flex items-center gap-2 mb-2">
                         <Cpu className="w-3 h-3 text-[#00FF9D]" />
                         <span className="text-[8px] font-black uppercase text-[#00FF9D] tracking-widest">Safex AI Insight</span>
                       </div>
                       <p className="text-[10px] text-white/60 leading-relaxed italic">"{explanation}"</p>
                    </motion.div>
                  ) : result.status === 'danger' && (
                    <Button 
                      onClick={handleExplain} 
                      disabled={isExplaining}
                      className="w-full h-8 mt-2 bg-white/5 border border-white/10 hover:bg-[#00FF9D]/10 text-[9px] font-black uppercase text-white/60 hover:text-[#00FF9D] transition-all"
                    >
                      {isExplaining ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <Zap className="w-3 h-3 mr-2 text-[#00FF9D]" />}
                      Explain Why with Safex AI
                    </Button>
                  )}
                </div>
                
                {/* Result Actions */}
                <div className="pt-6 border-t border-white/5 w-full flex flex-col gap-3">
                   {activeTab === 'url' && result.status === 'danger' && (
                     <Button 
                      onClick={() => setIsSandboxOpen(true)}
                      className="w-full h-11 rounded-xl bg-[#00FF9D]/10 hover:bg-[#00FF9D]/20 border border-[#00FF9D]/30 text-[#00FF9D] text-[10px] font-black uppercase tracking-widest gap-2"
                     >
                       <Search className="w-3.5 h-3.5" /> Launch Safe Sandbox
                     </Button>
                   )}
                   
                   <Button 
                    onClick={generateEvidencePDF}
                    className="w-full h-11 rounded-xl bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest gap-2"
                   >
                     <Zap className="w-3.5 h-3.5" /> Generate Evidence PDF
                   </Button>
                   <p className="text-[7px] text-white/20 uppercase tracking-widest text-center">Protocol: Automated FIR Evidence</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>

      {/* CALL SIMULATION OVERLAY */}
      <AnimatePresence>
        {isSimulatingCall && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">
            <div className="w-full max-w-sm bg-[#030303] rounded-[3rem] border-2 border-white/5 overflow-hidden shadow-[0_0_100px_rgba(255,59,59,0.2)] relative p-10 flex flex-col items-center gap-10">
              <div className="absolute top-0 w-full h-1/2 bg-red-600/10 blur-[50px] -z-10 animate-pulse" />
              <div className="text-center space-y-4">
                 <div className="w-20 h-20 bg-red-600/10 rounded-full flex items-center justify-center mx-auto border-2 border-red-600/30">
                    <PhoneIncoming className="w-8 h-8 text-red-500 animate-bounce" />
                 </div>
                 <h4 className="text-2xl font-black text-white">+91 9988776655</h4>
                 <p className="text-red-500 font-bold uppercase tracking-widest text-[10px]">High-Risk Scam Call</p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-center">
                 <p className="text-white font-medium text-xs">"Scam detected as per our active database. Block immediately."</p>
              </div>

              <div className="text-white/20 font-mono text-3xl tabular-nums">
                00:{simulationTimer < 10 ? `0${simulationTimer}` : simulationTimer}
              </div>

              <div className="flex gap-10">
                <button onClick={() => setIsSimulatingCall(false)} className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg hover:scale-110 active:scale-90 transition-all">
                  <X className="w-6 h-6 text-white" />
                </button>
                <button onClick={() => setIsSimulatingCall(false)} className="w-16 h-16 rounded-full bg-[#00FF9D] flex items-center justify-center shadow-lg hover:scale-110 active:scale-90 transition-all">
                  <PhoneIncoming className="w-6 h-6 text-black" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SHADOW SANDBOX MODAL */}
      <AnimatePresence>
        {isSandboxOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/95 flex flex-col p-6">
            <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col gap-4">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#00FF9D]/10 rounded-xl flex items-center justify-center border border-[#00FF9D]/20">
                      <Shield className="w-5 h-5 text-[#00FF9D]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white uppercase italic">Shadow Sandbox <span className="text-red-500">v1.0</span></h3>
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Isolated Virtual Environment • Session will not touch local host</p>
                    </div>
                  </div>
                  <Button onClick={() => setIsSandboxOpen(false)} className="bg-white/5 hover:bg-red-500/20 text-white"><X className="w-5 h-5" /></Button>
               </div>
               
               <div className="flex-1 bg-white/5 rounded-3xl border border-white/10 overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-8 bg-black/60 border-b border-white/5 flex items-center px-4 gap-2">
                     <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                     </div>
                     <div className="flex-1 max-w-md mx-auto bg-black/40 h-5 rounded-full border border-white/5 px-3 flex items-center">
                        <Link2 className="w-2 h-2 text-white/20 mr-2" />
                        <span className="text-[8px] text-white/40 truncate">{inputText}</span>
                     </div>
                  </div>
                  
                  <iframe 
                    src={inputText} 
                    className="w-full h-full pt-8"
                    sandbox="allow-scripts" // Extremely restrictive but enough for static analysis scripts
                    title="Safex Sandbox"
                  />
                  
                  {/* Warning Overlay */}
                  <div className="absolute bottom-6 left-6 p-4 bg-red-600/90 backdrop-blur rounded-2xl flex items-center gap-4 border border-red-400/50">
                    <AlertTriangle className="w-6 h-6 text-white animate-pulse" />
                    <div>
                      <p className="text-white font-black text-xs uppercase">Warning: Restricted Environment</p>
                      <p className="text-white/70 text-[10px]">Cookies and Local Storage are disabled in this session.</p>
                    </div>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// SHARED MINI-COMPONENTS
function ToggleCard({ icon, title, desc, checked, onCheckedChange }: any) {
  return (
    <Card className={`glass border border-white/5 hover:border-white/10 flex-shrink-0 transition-all ${checked ? 'bg-[#00FF9D]/5 border-[#00FF9D]/20 shadow-[0_0_20px_rgba(0,255,157,0.05)]' : ''}`}>
      <CardContent className="p-3 pr-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors shrink-0 ${checked ? 'bg-[#00FF9D]/10 text-[#00FF9D]' : 'bg-white/5 text-white/20'}`}>
            {icon}
          </div>
          <div className="overflow-hidden">
            <h4 className={`text-[10px] font-black uppercase tracking-tight truncate ${checked ? 'text-white' : 'text-white/40'}`}>{title}</h4>
            <p className="text-[8px] text-white/30 font-medium truncate">{desc}</p>
          </div>
        </div>
        <div className="shrink-0 scale-75 md:scale-90 flex items-center">
          <Switch checked={checked} onCheckedChange={onCheckedChange} />
        </div>
      </CardContent>
    </Card>
  );
}

function TabTrigger({ value, icon, label }: any) {
  return (
    <TabsTrigger value={value} className="flex-1 rounded-lg h-full data-[state=active]:bg-[#00FF9D]/10 data-[state=active]:text-[#00FF9D] gap-2 text-[10px] font-black uppercase tracking-wider transition-all">
      {icon} <span className="hidden sm:inline">{label}</span>
    </TabsTrigger>
  );
}

function TextEntry({ label, value, onChange, placeholder }: any) {
  return (
    <div className="space-y-3 w-full">
      <p className="text-[10px] font-black text-[#00FF9D]/80 uppercase tracking-widest">{label}</p>
      <textarea 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-32 md:h-40 bg-black/40 border-2 border-white/5 rounded-2xl p-4 md:p-6 text-sm md:text-lg text-white placeholder:text-white/10 focus:border-[#00FF9D]/40 focus:outline-none transition-all resize-none shadow-2xl leading-relaxed"
      />
    </div>
  );
}

function EntryField({ label, value, onChange, placeholder }: any) {
  return (
    <div className="space-y-3 w-full">
      <p className="text-[10px] font-black text-[#00FF9D]/80 uppercase tracking-widest">{label}</p>
      <input 
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 md:h-14 bg-black/40 border-2 border-white/5 rounded-xl px-4 md:px-6 text-sm md:text-lg text-white placeholder:text-white/10 focus:border-[#00FF9D]/40 focus:outline-none transition-all shadow-2xl"
      />
    </div>
  );
}

function QuickDemos({ items, onSelect }: any) {
  return (
    <div className="space-y-3">
      <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Live Test Library:</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item: any) => (
          <Button key={item.label} variant="outline" size="sm" onClick={() => onSelect(item.text)} className="rounded-lg h-7 bg-white/5 border-white/5 hover:bg-[#00FF9D]/10 hover:border-[#00FF9D]/20 text-white/50 text-[9px] font-black uppercase tracking-widest px-3">
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

function ScanButton({ isScanning, onClick, label, disabled, className = "" }: any) {
  return (
    <Button 
      onClick={onClick}
      disabled={disabled || isScanning}
      className={`h-12 md:h-14 rounded-xl bg-[#00FF9D] hover:bg-white text-black text-xs md:text-sm font-black uppercase tracking-widest shadow-[0_0_30px_rgba(0,255,157,0.2)] transition-all ${className}`}
    >
      {isScanning ? <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin mr-2" /> : <Shield className="w-4 h-4 md:w-5 md:h-5 mr-2" />}
      {label}
    </Button>
  );
}
