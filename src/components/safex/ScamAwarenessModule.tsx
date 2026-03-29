'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Trophy, 
  ArrowRight, 
  RotateCcw, 
  AlertCircle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  Search,
  Wallet2,
  User,
  Zap,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Scenario {
  id: number;
  type: 'email' | 'sms' | 'link' | 'payment';
  content: string;
  sender: string;
  isScam: boolean;
  explanation: string;
  clues: string[];
}

const scenarios: Scenario[] = [
  {
    id: 1,
    type: 'email',
    sender: 'support@amazon-security-login.net',
    content: 'DEAR CUSTOMER, YOUR ACCOUNT HAS BEEN FLAGGED FOR SUSPICIOUS ACTIVITY. CLICK HERE TO VERIFY YOUR IDENTITY WITHIN 24 HOURS OR YOUR ACCOUNT WILL BE TERMINATED.',
    isScam: true,
    explanation: "Legitimate companies never use long, hyphenated domains like 'amazon-security-login.net'. They also avoid all-caps urgent threats to terminate accounts.",
    clues: ['Suspicious Domain', 'Urgency Language', 'All-Caps Text']
  },
  {
    id: 2,
    type: 'sms',
    sender: 'AD-HDFCBNK',
    content: 'Your HDFC Bank account XX1234 has been credited with Rs 5,000.00 from V. Kumar. Ref No: 918273645. Download app for details.',
    isScam: false,
    explanation: "This is a standard transactional SMS from a verified 6-character sender ID (AD-HDFCBNK). It contains specific reference numbers and doesn't ask for immediate action on a suspicious link.",
    clues: ['Verified Sender ID', 'Specific Ref Number', 'No Urgent Action']
  },
  {
    id: 3,
    type: 'link',
    sender: 'WhatsApp Message',
    content: 'FREE GIFT CARD! 🎁 You have won a ₹5,000 Amazon Gift Card from VVCE Ideathon. Claim now: http://vvce-reward.xyz/claim',
    isScam: true,
    explanation: "Reward scams often use '.xyz' or other cheap top-level domains. VVCE or Amazon would never host official giveaways on such generic, untrusted links.",
    clues: ['Untrusted .xyz domain', 'Too good to be true', 'Unsolicited Reward']
  },
  {
    id: 4,
    type: 'email',
    sender: 'no-reply@accounts.google.com',
    content: 'Security alert: A new sign-in was detected on a Windows device. If this was you, you can ignore this email. If not, please review your activity.',
    isScam: false,
    explanation: "This is a genuine Google security alert. The sender matches the official domain, and it provides a clear path to review activity without forcing a high-pressure click.",
    clues: ['Official google.com domain', 'Informative tone', 'Standard security practice']
  },
  {
    id: 5,
    type: 'payment',
    sender: 'PhonePe Reward',
    content: 'CONGRATULATIONS! You have won a Scratch Card worth ₹1,999. Click to claim and enter your UPI PIN to receive the amount in your bank.',
    isScam: true,
    explanation: "You NEVER need to enter your UPI PIN to RECEIVE money. This is a classic 'Request' Scam disguised as a 'Reward'.",
    clues: ['UPI PIN for credit', 'Too good to be true', 'Sender misuse']
  },
  {
    id: 6,
    type: 'link',
    sender: 'Microsoft Security',
    content: 'Your PC is infected with a Trojan horse! System access is blocked. Call our certified technician immediately at 1800-SAFE-PC.',
    isScam: true,
    explanation: "Microsoft or Apple will never show popup warnings with phone numbers to call. They don't monitor individual home PCs for viruses in this way.",
    clues: ['High-pressure warning', 'Unsolicited support', 'Phone number bait']
  }
];

import { useLanguage } from '@/context/LanguageContext';

export default function ScamAwarenessModule() {
  const { t, language } = useLanguage();
  const [mode, setMode] = useState<'intro' | 'learn' | 'test'>('intro');
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [userChoice, setUserChoice] = useState<boolean | null>(null);
  const [gameFinished, setGameFinished] = useState(false);

  const scenario = scenarios[currentStep];

  const scamFlags = [
    { title: language === 'kn' ? 'ತುರ್ತು ಮತ್ತು ಒತ್ತಡ' : 'Urgency & Pressure', desc: language === 'kn' ? 'ಸ್ಕ್ಯಾಮರ್‌ಗಳು ಜನರನ್ನು ಪ್ಯಾನಿಕ್ ಮಾಡಲು "24 ಗಂಟೆಗಳಲ್ಲಿ ಖಾತೆಯು ಅಳಿಸಲ್ಪಡುತ್ತದೆ" ಎನ್ನುವ ಬೆದರಿಕೆಗಳನ್ನು ಬಳಸುತ್ತಾರೆ.' : 'Scammers use threats like "Account will be deleted in 24h" to make you panic.', icon: <AlertCircle className="w-5 h-5 text-red-500" /> },
    { title: language === 'kn' ? 'ನಕಲಿ ಡೊಮೇನ್‌ಗಳು' : 'Lookalike Domains', desc: language === 'kn' ? '"amazon.com" ನ ಬದಲಾಗಿ "amazon-security.net" ನಂತಹ ಸಣ್ಣ ತಪ್ಪುಗಳನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ.' : 'Checks for small typos like "amazon-security.net" instead of "amazon.com".', icon: <Search className="w-5 h-5 text-blue-500" /> },
    { title: language === 'kn' ? 'ಅಸಾಮಾನ್ಯ ಪಾವತಿಗಳು' : 'Unusual Payments', desc: language === 'kn' ? 'ಅಧಿಕೃತ ಏಜೆನ್ಸಿಗಳು ಎಂದಿಗೂ UPI ಪಿನ್, ಗಿಫ್ಟ್ ಕಾರ್ಡ್‌ಗಳು ಅಥವಾ ಕ್ರಿಪ್ಟೋ ಮೂಲಕ ಪಾವತಿಯನ್ನು ಕೇಳುವುದಿಲ್ಲ.' : 'Official agencies never ask for payment via UPI pin, gift cards, or crypto.', icon: <Wallet2 className="w-5 h-5 text-green-500" /> },
    { title: language === 'kn' ? 'ಅನುಮಾನಾಸ್ಪದ ಕಳುಹಿಸುವವರು' : 'Suspicious Senders', desc: language === 'kn' ? 'ಇಮೇಲ್ ಅಥವಾ ಎಸ್‌ಎಂಎಸ್ ಕಳುಹಿಸುವವರ ಐಡಿಯು ಅಧಿಕೃತ ಹೆಸರಿಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ.' : 'Check if the email or SMS sender ID matches the official verified name.', icon: <User className="w-5 h-5 text-purple-500" /> },
  ];

  const handleChoice = (choice: boolean) => {
    setUserChoice(choice);
    if (choice === scenario.isScam) {
      setScore(s => s + 1);
    }
    setShowFeedback(true);
  };

  const nextScenario = () => {
    if (currentStep < scenarios.length - 1) {
      setCurrentStep(s => s + 1);
      setShowFeedback(false);
      setUserChoice(null);
    } else {
      setGameFinished(true);
    }
  };

  const startTest = () => {
    setMode('test');
    resetGame();
  };

  const resetGame = () => {
    setCurrentStep(0);
    setScore(0);
    setShowFeedback(false);
    setUserChoice(null);
    setGameFinished(false);
  };

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto border-t border-white/5 bg-black/20 rounded-[3rem] my-20">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00FF9D]/10 border border-[#00FF9D]/20 rounded-full mb-6">
          <Award className="w-4 h-4 text-[#00FF9D]" />
          <span className="text-[10px] font-black uppercase text-[#00FF9D] tracking-widest">{t('training_active')}</span>
        </div>
        <h3 className="text-5xl font-black mb-6 tracking-tight uppercase text-gradient">
          {t('awareness')}
        </h3>
        <p className="text-white/40 text-lg max-w-2xl mx-auto font-medium">
          {language === 'kn' ? 'ವಂಚನೆ ಪತ್ತೆಹಚ್ಚುವ ಕಲೆಯ ಮೇಲೆ ಪ್ರಭುತ್ವ ಸಾಧಿಸಿ. ನಿಮ್ಮ ಸ್ಕ್ಯಾಮ್ ಐಕ್ಯೂ ಅನ್ನು ವೃದ್ಧಿಸಿ.' : 'Master the art of detection. Test your instincts against real vs. fake digital interactions and build your Scam IQ.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {mode === 'test' && !gameFinished && (
          <div className="lg:col-span-3 space-y-6">
            <Card className="glass border-white/10 p-6">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-20 h-20 rounded-full bg-[#00FF9D]/10 flex items-center justify-center border-4 border-[#030303] outline outline-1 outline-[#00FF9D]/20 shadow-[0_0_20px_rgba(0,255,157,0.1)]">
                  <span className="text-3xl font-black text-[#00FF9D]">{Math.round((score / scenarios.length) * 100)}%</span>
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase text-white tracking-widest">{t('iq_score')}</h4>
                  <p className="text-white/30 text-[10px] uppercase font-bold mt-1">Tier: {score === scenarios.length ? 'Master Defender' : score > 1 ? 'Expert' : 'Trainee'}</p>
                </div>
              </div>
              <div className="mt-8 space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase text-white/40 mb-1">
                  <span>Progress</span>
                  <span>{currentStep + 1} / {scenarios.length}</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-[#00FF9D]" 
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / scenarios.length) * 100}%` }}
                  />
                </div>
              </div>
            </Card>
          </div>
        )}

        <div className={mode === 'test' && !gameFinished ? 'lg:col-span-9' : 'lg:col-span-12'}>
          <AnimatePresence mode="wait">
            {mode === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto text-center space-y-12 py-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="glass border-white/5 p-10 group hover:border-[#00FF9D]/30 transition-all cursor-pointer" onClick={() => setMode('learn')}>
                    <div className="w-16 h-16 bg-[#00FF9D]/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <Zap className="w-8 h-8 text-[#00FF9D]" />
                    </div>
                    <h4 className="text-2xl font-black text-white uppercase mb-4">{t('learn_more')}</h4>
                    <p className="text-white/40 text-sm leading-relaxed">
                      {language === 'kn' ? 'ಆಧುನಿಕ ಸ್ಕ್ಯಾಮರ್‌ಗಳು ಬಳಸುವ ಸಾಮಾನ್ಯ ವಂಚನೆಯ ಮಾದರಿಗಳು ಮತ್ತು ತುರ್ತು ಫ್ಲಾಗ್‌ಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.' : 'Understand common fraud patterns, lookalike domains, and urgency triggers used by modern scammers.'}
                    </p>
                  </Card>
                  <Card className="glass border-white/5 p-10 group hover:border-[#00FF9D]/30 transition-all cursor-pointer" onClick={() => startTest()}>
                    <div className="w-16 h-16 bg-[#00FF9D]/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-8 h-8 text-[#00FF9D]" />
                    </div>
                    <h4 className="text-2xl font-black text-white uppercase mb-4">{t('start_test')}</h4>
                    <p className="text-white/40 text-sm leading-relaxed">
                      {language === 'kn' ? 'ನಮ್ಮ ರಿಯಲ್-ಟೈಮ್ ಸನ್ನಿವೇಶ ಪರೀಕ್ಷೆಯನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ ಮತ್ತು ಮಾಸ್ಟರ್ ಡಿಫೆಂಡರ್ ಪ್ರಮಾಣೀಕರಣವನ್ನು ಆಗಳಿಸಿ.' : 'Take our real-time scenario test and earn your "Master Defender" certification.'}
                    </p>
                  </Card>
                </div>
              </motion.div>
            )}

            {mode === 'learn' && (
              <motion.div
                key="learn"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {scamFlags.map((flag, i) => (
                    <motion.div
                      key={flag.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Card className="glass border-white/5 h-full p-6 hover:bg-white/5 transition-colors">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                          {flag.icon}
                        </div>
                        <h5 className="text-lg font-black text-white uppercase mb-3">{flag.title}</h5>
                        <p className="text-white/40 text-xs leading-relaxed">{flag.desc}</p>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <Button 
                    onClick={() => startTest()}
                    className="h-16 px-12 rounded-2xl bg-[#00FF9D] hover:bg-[#00FF9D]/90 text-black font-black uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(0,255,157,0.3)]"
                  >
                    {t('start_test')} <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {mode === 'test' && !gameFinished && (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <Card className="glass-card overflow-hidden border-[#00FF9D]/20">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                          {scenario.type === 'email' ? <HelpCircle /> : scenario.type === 'sms' ? <AlertCircle /> : scenario.type === 'payment' ? <Wallet2 /> : <ArrowRight />}
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase text-[#00FF9D] tracking-widest">SENDER IDENTITY</p>
                          <p className="text-white font-mono text-sm">{scenario.sender}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-white/40">
                         {scenario.type} Module
                      </span>
                    </div>

                    <div className="bg-black/40 rounded-3xl p-8 border border-white/5 mb-8">
                       <p className="text-xl md:text-2xl text-white font-medium leading-relaxed italic">
                         "{scenario.content}"
                       </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <Button 
                        disabled={showFeedback}
                        onClick={() => handleChoice(false)}
                        className={`h-20 rounded-[1.5rem] border-2 uppercase font-black tracking-widest text-lg transition-all ${userChoice === false ? 'border-[#00FF9D] bg-[#00FF9D]/10 text-white' : 'border-white/5 bg-white/5 hover:bg-[#00FF9D]/10 hover:border-[#00FF9D]/30'}`}
                      >
                        <ShieldCheck className="w-5 h-5 mr-3" />
                        {t('legal')}
                      </Button>
                      <Button 
                        disabled={showFeedback}
                        onClick={() => handleChoice(true)}
                        className={`h-20 rounded-[1.5rem] border-2 uppercase font-black tracking-widest text-lg transition-all ${userChoice === true ? 'border-[#FF3B3B] bg-[#FF3B3B]/10 text-white' : 'border-white/5 bg-white/5 hover:bg-[#FF3B3B]/10 hover:border-[#FF3B3B]/30'}`}
                      >
                        <ShieldAlert className="w-5 h-5 mr-3" />
                        {t('scam_detected')}
                      </Button>
                    </div>
                  </div>
                </Card>

                <AnimatePresence>
                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <Card className={`glass border-2 overflow-hidden ${userChoice === scenario.isScam ? 'border-[#00FF9D]/50 bg-[#00FF9D]/5' : 'border-[#FF3B3B]/50 bg-[#FF3B3B]/5'}`}>
                        <CardContent className="p-8">
                           <div className="flex items-center gap-4 mb-6">
                              {userChoice === scenario.isScam ? (
                                <CheckCircle2 className="w-8 h-8 text-[#00FF9D]" />
                              ) : (
                                <XCircle className="w-8 h-8 text-[#FF3B3B]" />
                              )}
                              <h4 className="text-2xl font-black uppercase text-white tracking-tight">
                                {userChoice === scenario.isScam ? t('correct') : t('incorrect')}
                              </h4>
                           </div>
                           
                           <p className="text-white/70 text-lg leading-relaxed mb-8">
                             {scenario.explanation}
                           </p>

                           <div className="flex flex-wrap gap-3 mb-8">
                              {scenario.clues.map(clue => (
                                <span key={clue} className="px-4 py-2 bg-black/40 border border-white/10 rounded-full text-xs font-bold text-white/60">
                                  #{clue}
                                </span>
                              ))}
                           </div>

                           <Button 
                             onClick={nextScenario}
                             className="w-full h-14 rounded-2xl bg-[#00FF9D] hover:bg-[#00FF9D]/90 text-black font-black uppercase tracking-widest transition-all"
                           >
                              {t('next_scenario')} <ArrowRight className="ml-2 w-4 h-4" />
                           </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {gameFinished && (
              <motion.div
                key="summary"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8 py-12"
              >
                <div className="w-32 h-32 bg-[#00FF9D]/10 rounded-full flex items-center justify-center mx-auto border-4 border-[#00FF9D] shadow-[0_0_40px_rgba(0,255,157,0.3)] animate-bounce">
                  <Trophy className="w-16 h-16 text-[#00FF9D]" />
                </div>
                <div>
                   <h4 className="text-6xl font-black text-white uppercase tracking-tighter mb-4">Training Complete!</h4>
                   <p className="text-white/40 text-2xl font-medium max-w-xl mx-auto">
                     Your Scam IQ score is <span className="text-[#00FF9D]">{score}/{scenarios.length}</span>. 
                     {score === scenarios.length ? ' You are a digital fortress!' : ' We suggest one more round of training to sharpen your senses.'}
                   </p>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <Button 
                    onClick={() => setMode('intro')}
                    className="h-16 px-12 rounded-2xl bg-[#030303] border border-white/10 text-white hover:bg-white/5 font-black uppercase tracking-widest"
                  >
                    <RotateCcw className="mr-2 w-4 h-4" /> Back to Intro
                  </Button>
                  <Button 
                    className="h-16 px-12 rounded-2xl bg-[#00FF9D] hover:bg-[#00FF9D]/90 text-black font-black uppercase tracking-widest shadow-[0_0_30px_rgba(0,255,157,0.4)]"
                  >
                    Download Certificate
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
