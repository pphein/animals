import { useEffect, useState } from 'react';
import { HomePage } from './components/HomePage';
import { AnimalGame } from './components/AnimalGame';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

type Screen = 'home' | 'animals';

export default function App() {
  const [screen, setScreen]       = useState<Screen>('home');
  const [lang, setLang]           = useState<'en' | 'mm'>('en');
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') setInstallPrompt(null);
  };

  if (screen === 'animals') {
    return <AnimalGame lang={lang} onBack={() => setScreen('home')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex flex-col select-none">
      {/* Top bar */}
      <div className="flex items-center justify-end gap-2 px-5 pt-5">
        {installPrompt && (
          <button
            onClick={handleInstall}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-3 py-1.5 rounded-full shadow transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Install
          </button>
        )}

        {/* Language toggle */}
        <div className="flex bg-gray-100 rounded-full p-1 gap-1">
          <button
            onClick={() => setLang('en')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              lang === 'en'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang('mm')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              lang === 'mm'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            မြန်မာ
          </button>
        </div>
      </div>

      <HomePage lang={lang} onSelect={(id) => setScreen(id as Screen)} />
    </div>
  );
}
