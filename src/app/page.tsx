import Header from '@/components/scamshield/Header';
import Hero from '@/components/scamshield/Hero';
import ProtectionSuite from '@/components/scamshield/ProtectionSuite';
import ImpactDashboard from '@/components/scamshield/ImpactDashboard';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden selection:bg-[#00FF9D]/30 selection:text-white">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 right-0 h-[500px] bg-[#00FF9D] opacity-[0.03] blur-[100px] -z-10" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-[#FF3B3B] opacity-[0.02] blur-[100px] -z-10" />
      <div className="fixed inset-0 bg-[#030303] -z-20" />

      <Header />
      
      <div className="container mx-auto px-4">
        <Hero />
        <ProtectionSuite />
        <ImpactDashboard />
      </div>

      {/* Footer / Copyright */}
      <footer className="py-16 border-t border-white/5 bg-black/40 backdrop-blur-md relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="text-white/40 text-xs uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-6 mb-8">
            <span>Privacy First</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF9D]/40" />
            <span>Zero-Knowledge Architecture</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF9D]/40" />
            <span>VVCE Mysuru</span>
          </div>
          <p className="text-white/60 text-sm md:text-base font-medium leading-relaxed">
            Designed for <span className="text-white font-bold italic">"Clash of Cortex"</span> 2026 submission. 
            <br /> 
            Developed by <span className="text-[#00FF9D] font-black uppercase tracking-tight">Team Nexus 1</span> from Vidyavardhaka College of Engineering.
          </p>
        </div>
      </footer>
    </main>
  );
}
