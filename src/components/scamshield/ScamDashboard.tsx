'use client';

import React, { useState } from 'react';
import { 
  Shield, 
  SwitchCamera, 
  MapPin, 
  Zap, 
  UserCircle, 
  Link2, 
  MessageSquare, 
  PhoneIncoming, 
  Wallet2, 
  Send,
  Cpu,
  Circle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScamDashboard() {
  const [activeTab, setActiveTab] = useState('message');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | string>(null);

  const handleAnalysis = () => {
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setAnalyzing(false);
      setResult('Analysis Complete: No immediate threats detected in the current payload. Behavioral patterns align with standard user interaction.');
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-zinc-100 overflow-hidden font-sans">
      {/* LEFT SIDEBAR: CONSTRAINT TOGGLES */}
      <aside className="w-72 border-r border-[#1a1a1a] bg-[#0d0d0d] p-6 flex flex-col gap-8">
        <div className="flex items-center gap-2 mb-2">
          <Circle className="w-3 h-3 text-[#5865F2] fill-[#5865F2]" />
          <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500">Constraint Toggles</h2>
        </div>

        <div className="space-y-4">
          <ToggleCard 
            icon={<SwitchCamera className="w-4 h-4 text-[#5865F2]" />}
            title="AI Intent Detection"
            desc="Deep linguistic manipulation analysis"
            defaultChecked
          />
          <ToggleCard 
            icon={<MapPin className="w-4 h-4 text-[#5865F2]" />}
            title="Location Check"
            desc="IP and geofencing anomaly detection"
            defaultChecked
          />
          <ToggleCard 
            icon={<Zap className="w-4 h-4 text-zinc-500" />}
            title="Behavioral Analysis"
            desc="Detects unusual recipient interactions"
          />
          <ToggleCard 
            icon={<UserCircle className="w-4 h-4 text-zinc-500" />}
            title="Personalization Profile"
            desc="Compares against local history (avg ₹1500)"
          />
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col">
        {/* TOP BAR */}
        <header className="h-20 border-b border-[#1a1a1a] bg-[#0d0d0d] flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <div className="bg-[#5865F2]/10 p-2.5 rounded-xl border border-[#5865F2]/20">
              <Shield className="w-6 h-6 text-[#5865F2]" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
                Real-Time Scam Shield
              </h1>
              <p className="text-[11px] text-zinc-500 font-medium tracking-wide">
                Prevent scams before they happen • Instant Analysis Engine
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900/50 px-3 py-1.5 rounded-full border border-zinc-800">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Engine Online</span>
          </div>
        </header>

        <div className="flex-1 flex p-8 gap-8 overflow-hidden">
          {/* DATA EXTRACTION ENGINE */}
          <div className="flex-[1.5] flex flex-col gap-6">
            <Card className="bg-[#111111] border-[#1a1a1a] flex-1 overflow-hidden flex flex-col p-8">
              <div className="flex items-center gap-3 mb-10">
                <Zap className="w-5 h-5 text-[#5865F2]" />
                <h2 className="text-2xl font-black tracking-tight">Data Extraction Engine</h2>
              </div>

              <Tabs defaultValue="message" onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-[#1a1a1a] border border-[#2a2a2a] p-1.5 h-auto w-full grid grid-cols-4 gap-2 rounded-xl mb-10">
                  <TabsTrigger value="url" className="data-[state=active]:bg-[#5865F2] data-[state=active]:text-white h-11 transition-all rounded-lg flex gap-2">
                    <Link2 className="w-4 h-4" /> URL Link
                  </TabsTrigger>
                  <TabsTrigger value="message" className="data-[state=active]:bg-[#5865F2] data-[state=active]:text-white h-11 transition-all rounded-lg flex gap-2">
                    <MessageSquare className="w-4 h-4" /> Message
                  </TabsTrigger>
                  <TabsTrigger value="call" className="data-[state=active]:bg-[#5865F2] data-[state=active]:text-white h-11 transition-all rounded-lg flex gap-2">
                    <PhoneIncoming className="w-4 h-4" /> Incoming Call
                  </TabsTrigger>
                  <TabsTrigger value="payment" className="data-[state=active]:bg-[#5865F2] data-[state=active]:text-white h-11 transition-all rounded-lg flex gap-2">
                    <Wallet2 className="w-4 h-4" /> Payment
                  </TabsTrigger>
                </TabsList>

                <div className="space-y-4">
                  <span className="text-[11px] font-black uppercase text-zinc-500 tracking-[0.1em]">Paste {activeTab === 'message' ? 'Message' : activeTab} Text</span>
                  <textarea 
                    className="w-full h-48 bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-6 text-zinc-300 placeholder:text-zinc-700 resize-none focus:outline-none focus:border-[#5865F2]/50 transition-all font-mono text-sm"
                    placeholder="e.g., Dear user, your account has been blocked..."
                  />
                </div>

                <div className="mt-8">
                  <span className="text-[10px] font-black uppercase text-zinc-600 tracking-[0.2em] block mb-4">Quick Demo Scenarios:</span>
                  <div className="flex flex-wrap gap-2">
                    <QuickButton label="Phishing Link" />
                    <QuickButton label="Scam Message" />
                    <QuickButton label="Fake Call" />
                    <QuickButton label="Risky Payment" />
                  </div>
                </div>

                <div className="mt-auto pt-10">
                  <Button 
                    onClick={handleAnalysis}
                    className="w-full h-16 bg-[#5865F2] hover:bg-[#4752c4] text-white text-lg font-black rounded-xl gap-3 shadow-[0_4px_20px_rgba(88,101,242,0.3)]"
                  >
                    {analyzing ? <Zap className="w-6 h-6 animate-pulse" /> : <Send className="w-5 h-5" />}
                    Run Real-Time Analysis
                  </Button>
                </div>
              </Tabs>
            </Card>
          </div>

          {/* RIGHT SIDEBAR: ANALYSIS RESULT */}
          <div className="flex-1">
            <Card className="bg-[#111111] border-[#1a1a1a] h-full flex flex-col items-center justify-center p-12 text-center group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-[#5865F2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <AnimatePresence mode="wait">
                {!result ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="flex flex-col items-center gap-8 relative z-10"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-zinc-900 flex items-center justify-center border border-zinc-800 shadow-xl">
                      <Cpu className="w-10 h-10 text-zinc-700 group-hover:text-[#5865F2] transition-colors" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-black tracking-tight text-zinc-400">Awaiting Payload Analysis</h3>
                      <p className="text-sm text-zinc-600 leading-relaxed max-w-[240px] font-medium">
                        Real-time extraction engine standing by for incoming web requests, SMSTo, UPI triggers, or telephony streams.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-8 relative z-10"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/30">
                      <Shield className="w-10 h-10 text-green-500" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-black text-green-500">Shield Active</h3>
                      <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                        {result}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      onClick={() => setResult(null)}
                      className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-zinc-300 font-bold"
                    >
                      Reset Engine
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function ToggleCard({ icon, title, desc, defaultChecked = false }: { icon: React.ReactNode, title: string, desc: string, defaultChecked?: boolean }) {
  return (
    <div className={`p-5 rounded-2xl border transition-all ${defaultChecked ? 'bg-zinc-900/40 border-[#5865F2]/30' : 'bg-[#0d0d0d] border-[#1a1a1a] grayscale'}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="p-2 rounded-lg bg-black/50 border border-zinc-800/50">
          {icon}
        </div>
        <Switch checked={defaultChecked} disabled />
      </div>
      <h4 className={`text-sm font-black mb-1 ${defaultChecked ? 'text-[#5865F2]' : 'text-zinc-600'}`}>{title}</h4>
      <p className="text-[10px] font-bold text-zinc-500 leading-tight uppercase tracking-wide">{desc}</p>
    </div>
  );
}

function QuickButton({ label }: { label: string }) {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="bg-[#1a1a1a] border-[#2a2a2a] text-[10px] font-bold uppercase tracking-wider h-8 px-4 rounded-lg hover:bg-zinc-800 transition-colors"
    >
      {label}
    </Button>
  );
}
