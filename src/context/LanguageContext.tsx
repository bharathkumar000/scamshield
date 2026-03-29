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
    protected: 'ರಕ್ಷಿಸಲ್ಪಟ್ಟ ಬಲಿಪಶುಗಳು',
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
