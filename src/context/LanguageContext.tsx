'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'kn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    title: 'Safex',
    subtitle: 'Ultra-Modern Cybersecurity Protection',
    scan_placeholder: 'Enter URL, Phone Number, or UPI ID...',
    scan_button: 'Scan Now',
    risk_score: 'Risk Score',
    safe: 'Safe',
    suspicious: 'Suspicious',
    scam: 'Scam',
    local_processing: 'Local Processing',
    local_processing_desc: 'Data stays on your device and is discarded after analysis.',
    pillars: 'Protection Pillars',
    link_scanner: 'Link Scanner',
    call_verifier: 'Call Verifier',
    msg_analyzer: 'Message Analyzer',
    upi_guard: 'UPI Guard',
    impact: 'Socio-Economic Impact',
    nexus: 'Team Nexus 1 | VVCE Mysuru',
    prevented: 'Potential Losses Prevented',
    protected: 'Victims Protected',
    awareness: 'Scam Awareness Module',
    iq_score: 'Scam IQ Score',
    start_test: 'Start Certification Test',
    learn_more: 'Phase 1: Analysis Learn',
    training_active: 'Training Unit Active',
    legal: 'Legitimate',
    scam_detected: 'Scam Attempt',
    next_scenario: 'Next Scenario',
    correct: 'Correct Identification!',
    incorrect: 'You missed the red flags!',
    hero_quote: 'A single link can drain a lifetime of savings.',
    hero_warning: 'SECURE THE NEXT BILLION.',
    stats_label: 'ANNUAL FRAUD COMPLAINTS',
    why_1: 'Personalized Scams',
    why_2: 'Mimicked Identities',
    why_3: 'Trust Exploitation',
    why_4: 'Urgency Pressure',
    why_5: 'Knowledge Gap',
    engine_title: 'UPI GUARD PRO',
    engine_desc: 'Linguistic Manipulation Analysis & Lookalike UPI Verification',
    launch_shield: 'Launch Shield',
    local_badge: 'Local Processing: Zero-Data Privacy',
    slide1_title: 'VISION & THE SOLUTION',
    slide1_mission: 'Protecting the next billion digital citizens from the rising tide of sophisticated fraud.',
    slide1_problem: '$12.5B+ lost to phishing & UPI fraud annually. The human factor is the weakest link.',
    slide1_innovation: 'A synchronized ecosystem of Real-time Monitoring and Gamified Education.',
    slide2_title: 'FEATURE ECOSYSTEM',
    slide2_links: 'Link Scanner: Deep analysis for homograph attacks and untrusted TLDs.',
    slide2_sms: 'SMS Analyzer: AI-driven sentiment analysis flagging high-pressure "urgency".',
    slide2_upi: 'UPI Guard Pro: Proprietary heuristic engine for lookalike ID detection.',
    slide3_title: 'TECH ARCHITECTURE',
    slide3_stack: 'Next.js 16 • React 19 • Tailwind 4 • Framer Motion',
    slide3_flow: 'Input ➔ Server Actions ➔ Multi-API Intel ➔ Local Heuristics ➔ <200ms Response.',
    slide4_title: 'EDUCATIONAL EMPOWERMENT',
    slide4_motto: 'Building your Digital Immune System.',
    slide4_modes: 'Tell & Test Mode: Gamified Learn/Test modules with Master Defender Certification.',
    slide4_bilingual: 'Bilingual Support: Full English and Kannada accessibility for rural empowerment.',
  },
  kn: {
    title: 'ಸ್ಕ್ಯಾಮ್‌ಶೀಲ್ಡ್',
    subtitle: 'ಅಲ್ಟ್ರಾ-ಮಾಡರ್ನ್ ಸೈಬರ್ ಸೆಕ್ಯುರಿಟಿ ರಕ್ಷಣೆ',
    scan_placeholder: 'URL, ಫೋನ್ ಸಂಖ್ಯೆ ಅಥವಾ UPI ID ನಮೂದಿಸಿ...',
    scan_button: 'ಈಗ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
    risk_score: 'ಅಪಾಯದ ಸ್ಕೋರ್',
    safe: 'ಸುರಕ್ಷಿತ',
    suspicious: 'ಅನುಮಾನಾಸ್ಪದ',
    scam: 'ವಂಚನೆ',
    local_processing: 'ಸ್ಥಳೀಯ ಸಂಸ್ಕರಣೆ',
    local_processing_desc: 'ಡೇಟಾ ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿಯೇ ಇರುತ್ತದೆ ಮತ್ತು ವಿಶ್ಲೇಷಣೆಯ ನಂತರ ಅಳಿಸಲ್ಪಡುತ್ತದೆ.',
    pillars: 'ರಕ್ಷಣಾ ಸ್ತಂಭಗಳು',
    link_scanner: 'ಲಿಂಕ್ ಸ್ಕ್ಯಾನರ್',
    call_verifier: 'ಕಾಲ್ ವೆರಿಫೈಯರ್',
    msg_analyzer: 'ಸಂದೇಶ ವಿಲೇಷಕ',
    upi_guard: 'UPI ಗಾರ್ಡ್',
    impact: 'ಸಾಮಾಜಿಕ-ಆರ್ಥಿಕ ಪ್ರಭಾವ',
    nexus: 'ಟೀಮ್ ನೆಕ್ಸಸ್ 1 | VVCE ಮೈಸೂರು',
    prevented: 'ತಡೆಗಟ್ಟಲಾದ ಸಂಭಾವ್ಯ ನಷ್ಟಗಳು',
    protected: 'ಬಲಿಪಶುಗಳ ರಕ್ಷಣೆ',
    awareness: 'ವಂಚನೆ ಅರಿವು ಮಾಡ್ಯೂಲ್',
    iq_score: 'ವಂಚನೆ ಐಕ್ಯೂ ಸ್ಕೋರ್',
    start_test: 'ಪ್ರಮಾಣೀಕರಣ ಪರೀಕ್ಷೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿ',
    learn_more: 'ಹಂತ 1: ವಿಶ್ಲೇಷಣೆ ಕಲಿಕೆ',
    training_active: 'ತರಬೇತಿ ಯುನಿಟ್ ಸಕ್ರಿಯವಾಗಿದೆ',
    legal: 'ಕಾನೂನುಬದ್ಧವಾಗಿದೆ',
    scam_detected: 'ವಂಚನೆ ತಡೆಗಟ್ಟಲಾಗಿದೆ',
    next_scenario: 'ಮುಂದಿನ ಸನ್ನಿವೇಶ',
    correct: 'ಸರಿಯಾದ ಗುರುತಿಸುವಿಕೆ!',
    incorrect: 'ನೀವು ಕೆಂಪು ಧ್ವಜಗಳನ್ನು ಮಿಸ್ ಮಾಡಿದ್ದೀರಿ!',
    hero_quote: 'ಒಂದು ಸಣ್ಣ ಲಿಂಕ್ ಜೀವಮಾನದ ಉಳಿತಾಯವನ್ನು ಬಲಿತೆಗೆದುಕೊಳ್ಳಬಲ್ಲದು.',
    hero_warning: 'ಮುಂದಿನ ನೂರು ಕೋಟಿ ಜನರಿಗೆ ಭದ್ರತೆ.',
    stats_label: 'ವಾರ್ಷಿಕ ವಂಚನೆ ದೂರುಗಳು',
    why_1: 'ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಸ್ಕ್ಯಾಮ್‌ಗಳು',
    why_2: 'ನಕಲಿ ಗುರುತುಗಳು',
    why_3: 'ನಂಬಿಕೆಯ ಶೋಷಣೆ',
    why_4: 'ತುರ್ತು ಒತ್ತಡ',
    why_5: 'ಜ್ಞಾನದ ಕೊರತೆ',
    engine_title: 'UPI ಗಾರ್ಡ್ ಪ್ರೊ',
    engine_desc: 'ಭಾಷಾ ಕುಶಲತೆಯ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ನಕಲಿ UPI ಪರಿಶೀಲನೆ',
    launch_shield: 'ಶೀಲ್ಡ್ ಲಾಂಚ್ ಮಾಡಿ',
    local_badge: 'ಸ್ಥಳೀಯ ಸಂಸ್ಕರಣೆ: ಶೂನ್ಯ-ಡೇಟಾ ಗೌಪ್ಯತೆ',
    slide1_title: 'ನಮ್ಮ ದೃಷ್ಟಿ ಮತ್ತು ಪರಿಹಾರ',
    slide1_mission: 'ಅತ್ಯಾಧುನಿಕ ವಂಚನೆಗಳಿಂದ ಮುಂದಿನ ನೂರು ಕೋಟಿ ಡಿಜಿಟಲ್ ನಾಗರಿಕರನ್ನು ರಕ್ಷಿಸುವುದು ನಮ್ಮ ಗುರಿ.',
    slide1_problem: 'ವಾರ್ಷಿಕವಾಗಿ ₹1 ಲಕ್ಷ ಕೋಟಿಗೂ ಹೆಚ್ಚು ಹಣ ಪ phishing ಮತ್ತು UPI ವಂಚನೆಗೆ ಬಲಿಯಾಗುತ್ತಿದೆ.',
    slide1_innovation: 'ರಿಯಲ್-ಟೈಮ್ ಮಾನಿಟರಿಂಗ್ ಮತ್ತು ಗೇಮಿಫೈಡ್ ಶಿಕ್ಷಣದ ಸಮನ್ವಯ ವ್ಯವಸ್ಥೆ.',
    slide2_title: 'ವೈಶಿಷ್ಟ್ಯಗಳ ಪರಿಸರ ವ್ಯವಸ್ಥೆ',
    slide2_links: 'ಲಿಂಕ್ ಸ್ಕ್ಯಾನರ್: ನಕಲಿ ಕ್ಯಾರೆಕ್ಟರ್‌ಗಳ ಮತ್ತು ಅನುಮಾನಾಸ್ಪದ ಡೊಮೇನ್‌ಗಳ ವಿಶ್ಲೇಷಣೆ.',
    slide2_sms: 'SMS ವಿಶ್ಲೇಷಕ: AI ಚಾಲಿತ ಎಮೋಷನಲ್ ಸೆಂಟಿಮೆಂಟ್ ವಿಶ್ಲೇಷಣೆ.',
    slide2_upi: 'UPI ಗಾರ್ಡ್ ಪ್ರೊ: ನಕಲಿ ಐಡಿಗಳನ್ನು ಪತ್ತೆಹಚ್ಚುವ ಸುಧಾರಿತ ಎಂಜಿನ್.',
    slide3_title: 'ತಾಂತ್ರಿಕ ವಿನ್ಯಾಸ',
    slide3_stack: 'ನೆಕ್ಸ್ಟ್ ಜೆಎಸ್ 16 • ರಿಯಾಕ್ಟ್ 19 • ಟೈಲ್‌ವಿಂಡ್ 4 • ಫ್ರೇಮರ್ ಮೋಷನ್',
    slide3_flow: 'ಇನ್ಪುಟ್ ➔ ಸರ್ವರ್ ಆಕ್ಷನ್ಸ್ ➔ ಮಲ್ಟಿ-ಎಪಿಐ ಇಂಟೆಲ್ ➔ ಲೋಕಲ್ ಹ್ಯೂರಿಸ್ಟಿಕ್ಸ್ ➔ <200ms ಪ್ರತಿಕ್ರಿಯೆ.',
    slide4_title: 'ಶೈಕ್ಷಣಿಕ ಸಬಲೀಕರಣ',
    slide4_motto: 'ನಿಮ್ಮ ಡಿಜಿಟಲ್ ರೋಗನಿರೋಧಕ ಶಕ್ತಿಯನ್ನು ವೃದ್ಧಿಸಿ.',
    slide4_modes: 'ಟೇಲ್ & ಟೆಸ್ಟ್ ಮೋಡ್: ಗೇಮಿಫೈಡ್ ಕಲಿಯುವಿಕೆ ಮತ್ತು ಮಾಸ್ಟರ್ ಡಿಫೆಂಡರ್ ಪ್ರಮಾಣಪತ್ರ.',
    slide4_bilingual: 'ದ್ವಿಭಾಷಾ ಬೆಂಬಲ: ಗ್ರಾಮೀಣ ಜನರನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸಲು ಪೂರ್ಣ ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಕನ್ನಡ ಬೆಂಬಲ.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
