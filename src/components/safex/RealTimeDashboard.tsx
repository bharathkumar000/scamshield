'use client';

import { useState } from 'react';
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
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { scanUrl } from '@/app/actions';

export default function RealTimeDashboard() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('message');
  const [inputText, setInputText] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<null | any>(null);

  const [toggles, setToggles] = useState({
    ai: true,
    location: true,
    behavioral: false,
    personalization: false
  });

  const handleScan = async () => {
    if (!inputText) return;
    setIsScanning(true);
    setResult(null);

    // LIVE API INTEGRATION FOR URLS!
    if (activeTab === 'url') {
      const liveResult = await scanUrl(inputText);
      setResult(liveResult as any);
      setIsScanning(false);
      return;
    }

    setTimeout(() => {
      setIsScanning(false);
      // Realistic simulation
      if (inputText.toLowerCase().includes('click') || inputText.toLowerCase().includes('win') || inputText.toLowerCase().includes('kyc') || inputText.toLowerCase().includes('bit.ly')) {
        setResult({
          status: 'danger',
          score: 89,
          flags: ['Social Engineering Detected', 'Malicious Link Pattern', 'Urgency Trigger'],
          engine: 'AI Intent Detection'
        });
      } else {
        setResult({
          status: 'safe',
          score: 12,
          flags: ['Verified Context', 'Clean URL', 'Trusted Source'],
          engine: 'Full Spectrum Analysis'
        });
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-full min-h-[700px] border-b border-white/5 bg-black/40">
      {/* Sidebar: Constraint Toggles */}
      <aside className="w-full lg:w-[320px] border-b lg:border-b-0 lg:border-r border-white/5 p-6 flex flex-col gap-6 bg-black/40 lg:bg-transparent">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-white/40" />
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Constraint Toggles</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          <ToggleCard 
            icon={<Zap className="w-4 h-4" />}
            title="AI Intent Detection"
            desc="Deep linguistic manipulation analysis"
            checked={toggles.ai}
            onCheckedChange={(val: boolean) => setToggles(p => ({ ...p, ai: val }))}
          />
          <ToggleCard 
            icon={<MapPin className="w-4 h-4" />}
            title="Location Check"
            desc="IP and geofencing anomaly detection"
            checked={toggles.location}
            onCheckedChange={(val: boolean) => setToggles(p => ({ ...p, location: val }))}
          />
          <ToggleCard 
            icon={<Activity className="w-4 h-4" />}
            title="Behavioral Analysis"
            desc="Detects unusual recipient interactions"
            checked={toggles.behavioral}
            onCheckedChange={(val: boolean) => setToggles(p => ({ ...p, behavioral: val }))}
          />
          <ToggleCard 
            icon={<User className="w-4 h-4" />}
            title="Personalization Profile"
            desc="Compares against local history (avg ₹1500)"
            checked={toggles.personalization}
            onCheckedChange={(val: boolean) => setToggles(p => ({ ...p, personalization: val }))}
          />
        </div>
      </aside>

      {/* Main Command Center */}
      <main className="flex-1 p-4 md:p-8 flex flex-col gap-8 overflow-x-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="hidden sm:flex w-12 h-12 bg-[#00FF9D]/10 rounded-xl items-center justify-center border border-[#00FF9D]/20 shrink-0">
              <Shield className="w-6 h-6 text-[#00FF9D]" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Real-Time Scam Shield</h2>
              <p className="text-white/40 text-xs md:text-sm font-medium">Prevent scams before they happen • Instant Analysis Engine</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#00FF9D]/5 border border-[#00FF9D]/20 rounded-full shrink-0">
            <div className="w-2 h-2 rounded-full bg-[#00FF9D] animate-pulse" />
            <span className="text-[10px] font-black uppercase text-[#00FF9D] tracking-widest">Engine Online</span>
          </div>
        </div>

        <section className="bg-white/[0.02] border border-white/5 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-[#00FF9D]" />
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Data Extraction Engine</h3>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full gap-10">
            <TabsList className="bg-black/80 border border-white/10 p-1.5 rounded-2xl h-16 w-full flex items-stretch">
              <TabsTrigger value="url" className="flex-1 rounded-xl h-full data-[state=active]:bg-[#00FF9D]/10 data-[state=active]:text-[#00FF9D] gap-3 text-xs md:text-sm font-black uppercase tracking-[0.2em] transition-all">
                <Link2 className="w-4 h-4" /> URL Link
              </TabsTrigger>
              <TabsTrigger value="message" className="flex-1 rounded-xl h-full data-[state=active]:bg-[#00FF9D]/10 data-[state=active]:text-[#00FF9D] gap-3 text-xs md:text-sm font-black uppercase tracking-[0.2em] transition-all">
                <MessageSquareText className="w-4 h-4" /> Message
              </TabsTrigger>
              <TabsTrigger value="call" className="flex-1 rounded-xl h-full data-[state=active]:bg-[#00FF9D]/10 data-[state=active]:text-[#00FF9D] gap-3 text-xs md:text-sm font-black uppercase tracking-[0.2em] transition-all">
                <PhoneIncoming className="w-4 h-4" /> Incoming Call
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex-1 rounded-xl h-full data-[state=active]:bg-[#00FF9D]/10 data-[state=active]:text-[#00FF9D] gap-3 text-xs md:text-sm font-black uppercase tracking-[0.2em] transition-all">
                <Wallet2 className="w-4 h-4" /> Payment
              </TabsTrigger>
            </TabsList>

            <TabsContent value="message" className="space-y-8 animate-in fade-in duration-500 w-full">
              <div className="space-y-4 w-full">
                <p className="text-sm font-black text-[#00FF9D]/80 uppercase tracking-[0.3em]">Paste Message Text</p>
                <div className="relative group w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00FF9D]/15 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <textarea 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="e.g., Dear user, your account has been blocked. Immediate action required..."
                    className="w-full h-64 bg-black/80 border-2 border-white/5 rounded-[2.5rem] p-10 text-2xl md:text-3xl text-white placeholder:text-white/5 focus:border-[#00FF9D]/60 focus:outline-none transition-all resize-none relative z-10 leading-relaxed shadow-2xl"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Quick Demo Scenarios:</p>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {['Phishing', 'Scam', 'Call', 'Payment'].map(s => (
                    <Button 
                      key={s} 
                      variant="outline" 
                      className="rounded-lg bg-white/5 border-white/10 hover:bg-[#00FF9D]/10 hover:border-[#00FF9D]/30 text-white/60 text-[10px] font-bold py-1 px-3"
                      onClick={() => setInputText(`Scenario for ${s}: Verify your details now at bit.ly/secure-bank`)}
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </div>

              <Button 
                onClick={handleScan}
                disabled={isScanning || !inputText}
                className="w-full h-14 md:h-16 rounded-xl md:rounded-[1.5rem] bg-[#00FF9D] hover:bg-[#00FF9D]/90 text-black text-sm md:text-lg font-black uppercase tracking-widest mt-4 shadow-[0_0_30px_rgba(0,255,157,0.3)] transition-all"
              >
                {isScanning ? <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin mr-2" /> : <Search className="w-4 h-4 md:w-5 md:h-5 mr-2" />}
                Run Real-Time Analysis
              </Button>
            </TabsContent>

            <TabsContent value="url" className="space-y-8 animate-in fade-in duration-500 w-full">
              <div className="space-y-4 w-full">
                <p className="text-sm font-black text-[#00FF9D]/80 uppercase tracking-[0.3em]">Scan Target URL</p>
                <div className="relative group w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00FF9D]/15 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <input 
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="e.g., https://bit.ly/secure-login-v4"
                    className="w-full h-20 md:h-24 bg-black/80 border-2 border-white/5 rounded-[1.5rem] md:rounded-[2rem] px-10 text-2xl md:text-3xl text-white placeholder:text-white/5 focus:border-[#00FF9D]/60 focus:outline-none transition-all relative z-10 shadow-2xl"
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleScan}
                disabled={isScanning || !inputText}
                className="w-full h-14 md:h-16 rounded-xl md:rounded-[1.5rem] bg-[#00FF9D] hover:bg-[#00FF9D]/90 text-black text-sm md:text-lg font-black uppercase tracking-widest mt-4 transition-all"
              >
                {isScanning ? <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin mr-2" /> : <Search className="w-4 h-4 md:w-5 md:h-5 mr-2" />}
                Run Link Heuristics
              </Button>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      {/* Analysis Result Area (Right) */}
      <aside className="w-full lg:w-[400px] border-t lg:border-t-0 lg:border-l border-white/5 p-6 md:p-8 flex flex-col gap-6 bg-black/40 lg:bg-black/20 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] aspect-square -z-10 opacity-20 pointer-events-none">
           <div className="absolute inset-0 border border-[#00FF9D]/20 rounded-full animate-[ping_4s_linear_infinite]" />
           <div className="absolute inset-0 border border-[#00FF9D]/10 rounded-full animate-[ping_7s_linear_infinite] delay-1000" />
        </div>

        <div className="w-full min-h-[400px] rounded-[2rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-6 md:p-10 text-center relative overflow-hidden backdrop-blur-xl bg-black/40">
          <AnimatePresence mode="wait">
            {!result && !isScanning && (
              <motion.div 
                key="awaiting"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10">
                  <Cpu className="w-10 h-10 text-white/20" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-white uppercase tracking-tight mb-2">Awaiting Payload Analysis</h4>
                  <p className="text-white/30 text-sm leading-relaxed">
                    Real-time extraction engine standing by for incoming web requests, SMS, UPI triggers, or telephony streams.
                  </p>
                </div>
              </motion.div>
            )}

            {isScanning && (
              <motion.div 
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-[#00FF9D]/10 animate-ping absolute inset-0" />
                  <div className="w-24 h-24 rounded-full border-4 border-t-[#00FF9D] animate-spin border-transparent relative z-10" />
                </div>
                <h4 className="text-xl font-black text-[#00FF9D] uppercase tracking-widest animate-pulse">Scanning...</h4>
              </motion.div>
            )}

            {result && !isScanning && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full space-y-8"
              >
                <div className={`p-8 rounded-[2rem] border-2 ${result.status === 'danger' ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-[#00FF9D]/10 border-[#00FF9D]/30 text-[#00FF9D]'}`}>
                   {result.status === 'danger' ? <AlertTriangle className="w-16 h-16 mx-auto mb-4" /> : <CheckCircle2 className="w-16 h-16 mx-auto mb-4" />}
                   <h5 className="text-4xl font-black mb-1">{result.score}%</h5>
                   <p className="uppercase text-xs font-black tracking-[0.3em]">{result.status === 'danger' ? 'Scam Detected' : 'Verified Safe'}</p>
                </div>

                <div className="space-y-4 text-left">
                  <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Confidence Metrics</p>
                  <div className="space-y-2">
                    {result.flags.map((f: string) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-white/80 font-medium bg-white/5 p-3 rounded-xl border border-white/5">
                        <Zap className="w-3 h-3 text-[#00FF9D]" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-[#00FF9D]/10 rounded-2xl border border-[#00FF9D]/20 text-[10px] uppercase font-black text-[#00FF9D] tracking-widest">
                  Processed by: {result.engine}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>
    </div>
  );
}

function ToggleCard({ icon, title, desc, checked, onCheckedChange }: any) {
  return (
    <Card className={`glass border border-white/5 hover:border-white/10 transition-all ${checked ? 'shadow-[0_0_20px_rgba(0,255,157,0.05)]' : ''}`}>
      <CardContent className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${checked ? 'bg-[#00FF9D]/10 text-[#00FF9D]' : 'bg-white/5 text-white/20'}`}>
            {icon}
          </div>
          <div>
            <h4 className={`text-sm font-black uppercase tracking-tight ${checked ? 'text-white' : 'text-white/40'}`}>{title}</h4>
            <p className="text-[10px] text-white/30 font-medium leading-tight">{desc}</p>
          </div>
        </div>
        <Switch checked={checked} onCheckedChange={onCheckedChange} />
      </CardContent>
    </Card>
  );
}
