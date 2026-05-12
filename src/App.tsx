import { useEffect, useState } from 'react';
import { animals } from './data/animals';
import { fruits } from './data/fruits';
import { vegetables } from './data/vegetables';
import { colors } from './data/colors';
import { shapes } from './data/shapes';
import { numbers } from './data/numbers';
import { bodyParts } from './data/bodyparts';
import { vehicles } from './data/vehicles';
import { clothes } from './data/clothes';
import { food } from './data/food';
import { weather } from './data/weather';
import { emotions } from './data/emotions';
import { occupations } from './data/occupations';
import { alphabet } from './data/alphabet';
import { birds } from './data/birds';
import { insects } from './data/insects';
import { seaAnimals } from './data/seaAnimals';
import { dinosaurs } from './data/dinosaurs';
import { farmAnimals } from './data/farmAnimals';
import { sports } from './data/sports';
import { instruments } from './data/instruments';
import { planets } from './data/planets';
import { phonics } from './data/phonics';
import { HomePage } from './components/HomePage';
import { AnimalList } from './components/AnimalList';
import { AnimalGame } from './components/AnimalGame';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

type Screen = 'home' | 'animalList' | 'animalGame' | 'fruitList' | 'fruitGame' | 'vegetableList' | 'vegetableGame' | 'colorList' | 'colorGame' | 'shapeList' | 'shapeGame' | 'numberList' | 'numberGame' | 'bodyPartList' | 'bodyPartGame' | 'vehicleList' | 'vehicleGame' | 'clothesList' | 'clothesGame' | 'foodList' | 'foodGame' | 'weatherList' | 'weatherGame' | 'emotionList' | 'emotionGame' | 'occupationList' | 'occupationGame' | 'alphabetList' | 'alphabetGame' | 'phonicsList' | 'phonicsGame' | 'birdList' | 'birdGame' | 'insectList' | 'insectGame' | 'seaAnimalList' | 'seaAnimalGame' | 'dinosaurList' | 'dinosaurGame' | 'farmAnimalList' | 'farmAnimalGame' | 'sportsList' | 'sportsGame' | 'instrumentList' | 'instrumentGame' | 'planetList' | 'planetGame';

export default function App() {
  const [screen, setScreen]                 = useState<Screen>('home');
  const [selectedIndex, setSelectedIndex]   = useState(0);
  const [lang, setLang]                     = useState<'en' | 'mm'>('en');
  const [installPrompt, setInstallPrompt]   = useState<BeforeInstallPromptEvent | null>(null);

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

  if (screen === 'animalList') {
    return (
      <AnimalList
        items={animals}
        title="Animals"
        lang={lang}
        onBack={() => setScreen('home')}
        onSelect={(i) => { setSelectedIndex(i); setScreen('animalGame'); }}
      />
    );
  }

  if (screen === 'animalGame') {
    return (
      <AnimalGame
        items={animals}
        title="Animals"
        lang={lang}
        initialPage={selectedIndex}
        onBack={() => setScreen('animalList')}
      />
    );
  }

  if (screen === 'fruitList') {
    return (
      <AnimalList
        items={fruits}
        title="Fruits"
        lang={lang}
        onBack={() => setScreen('home')}
        onSelect={(i) => { setSelectedIndex(i); setScreen('fruitGame'); }}
      />
    );
  }

  if (screen === 'fruitGame') {
    return (
      <AnimalGame
        items={fruits}
        title="Fruits"
        lang={lang}
        initialPage={selectedIndex}
        onBack={() => setScreen('fruitList')}
      />
    );
  }

  if (screen === 'vegetableList') {
    return (
      <AnimalList
        items={vegetables}
        title="Vegetables"
        lang={lang}
        onBack={() => setScreen('home')}
        onSelect={(i) => { setSelectedIndex(i); setScreen('vegetableGame'); }}
      />
    );
  }

  if (screen === 'vegetableGame') {
    return (
      <AnimalGame
        items={vegetables}
        title="Vegetables"
        lang={lang}
        initialPage={selectedIndex}
        onBack={() => setScreen('vegetableList')}
      />
    );
  }

  if (screen === 'colorList') {
    return (
      <AnimalList
        items={colors}
        title="Colors"
        lang={lang}
        onBack={() => setScreen('home')}
        onSelect={(i) => { setSelectedIndex(i); setScreen('colorGame'); }}
      />
    );
  }

  if (screen === 'colorGame') {
    return (
      <AnimalGame
        items={colors}
        title="Colors"
        lang={lang}
        initialPage={selectedIndex}
        onBack={() => setScreen('colorList')}
      />
    );
  }

  if (screen === 'shapeList') {
    return (
      <AnimalList
        items={shapes}
        title="Shapes"
        lang={lang}
        onBack={() => setScreen('home')}
        onSelect={(i) => { setSelectedIndex(i); setScreen('shapeGame'); }}
      />
    );
  }

  if (screen === 'shapeGame') {
    return (
      <AnimalGame
        items={shapes}
        title="Shapes"
        lang={lang}
        initialPage={selectedIndex}
        onBack={() => setScreen('shapeList')}
      />
    );
  }

  if (screen === 'numberList') {
    return (
      <AnimalList
        items={numbers}
        title="Numbers"
        lang={lang}
        onBack={() => setScreen('home')}
        onSelect={(i) => { setSelectedIndex(i); setScreen('numberGame'); }}
      />
    );
  }

  if (screen === 'numberGame') {
    return (
      <AnimalGame
        items={numbers}
        title="Numbers"
        lang={lang}
        initialPage={selectedIndex}
        onBack={() => setScreen('numberList')}
      />
    );
  }

  if (screen === 'bodyPartList') {
    return (
      <AnimalList
        items={bodyParts}
        title="Body Parts"
        lang={lang}
        onBack={() => setScreen('home')}
        onSelect={(i) => { setSelectedIndex(i); setScreen('bodyPartGame'); }}
      />
    );
  }

  if (screen === 'bodyPartGame') {
    return (
      <AnimalGame
        items={bodyParts}
        title="Body Parts"
        lang={lang}
        initialPage={selectedIndex}
        onBack={() => setScreen('bodyPartList')}
      />
    );
  }

  if (screen === 'vehicleList') {
    return (
      <AnimalList
        items={vehicles}
        title="Vehicles"
        lang={lang}
        onBack={() => setScreen('home')}
        onSelect={(i) => { setSelectedIndex(i); setScreen('vehicleGame'); }}
      />
    );
  }

  if (screen === 'vehicleGame') {
    return (
      <AnimalGame
        items={vehicles}
        title="Vehicles"
        lang={lang}
        initialPage={selectedIndex}
        onBack={() => setScreen('vehicleList')}
      />
    );
  }

  if (screen === 'clothesList') {
    return (
      <AnimalList
        items={clothes}
        title="Clothes"
        lang={lang}
        onBack={() => setScreen('home')}
        onSelect={(i) => { setSelectedIndex(i); setScreen('clothesGame'); }}
      />
    );
  }

  if (screen === 'clothesGame') {
    return (
      <AnimalGame
        items={clothes}
        title="Clothes"
        lang={lang}
        initialPage={selectedIndex}
        onBack={() => setScreen('clothesList')}
      />
    );
  }

  if (screen === 'foodList') {
    return (
      <AnimalList
        items={food}
        title="Food"
        lang={lang}
        onBack={() => setScreen('home')}
        onSelect={(i) => { setSelectedIndex(i); setScreen('foodGame'); }}
      />
    );
  }

  if (screen === 'foodGame') {
    return (
      <AnimalGame
        items={food}
        title="Food"
        lang={lang}
        initialPage={selectedIndex}
        onBack={() => setScreen('foodList')}
      />
    );
  }

  if (screen === 'weatherList') {
    return (
      <AnimalList
        items={weather}
        title="Weather"
        lang={lang}
        onBack={() => setScreen('home')}
        onSelect={(i) => { setSelectedIndex(i); setScreen('weatherGame'); }}
      />
    );
  }

  if (screen === 'weatherGame') {
    return (
      <AnimalGame
        items={weather}
        title="Weather"
        lang={lang}
        initialPage={selectedIndex}
        onBack={() => setScreen('weatherList')}
      />
    );
  }

  if (screen === 'emotionList') {
    return (
      <AnimalList
        items={emotions}
        title="Emotions"
        lang={lang}
        onBack={() => setScreen('home')}
        onSelect={(i) => { setSelectedIndex(i); setScreen('emotionGame'); }}
      />
    );
  }

  if (screen === 'emotionGame') {
    return (
      <AnimalGame
        items={emotions}
        title="Emotions"
        lang={lang}
        initialPage={selectedIndex}
        onBack={() => setScreen('emotionList')}
      />
    );
  }

  if (screen === 'occupationList') {
    return (
      <AnimalList
        items={occupations}
        title="Occupations"
        lang={lang}
        onBack={() => setScreen('home')}
        onSelect={(i) => { setSelectedIndex(i); setScreen('occupationGame'); }}
      />
    );
  }

  if (screen === 'occupationGame') {
    return (
      <AnimalGame
        items={occupations}
        title="Occupations"
        lang={lang}
        initialPage={selectedIndex}
        onBack={() => setScreen('occupationList')}
      />
    );
  }

  if (screen === 'alphabetList') {
    return (
      <AnimalList
        items={alphabet}
        title="Alphabet"
        lang={lang}
        onBack={() => setScreen('home')}
        onSelect={(i) => { setSelectedIndex(i); setScreen('alphabetGame'); }}
      />
    );
  }

  if (screen === 'alphabetGame') {
    return (
      <AnimalGame
        items={alphabet}
        title="Alphabet"
        lang={lang}
        initialPage={selectedIndex}
        onBack={() => setScreen('alphabetList')}
      />
    );
  }

  if (screen === 'planetList') {
    return (
      <AnimalList
        items={planets}
        title="Planets"
        lang={lang}
        onBack={() => setScreen('home')}
        onSelect={(i) => { setSelectedIndex(i); setScreen('planetGame'); }}
      />
    );
  }

  if (screen === 'planetGame') {
    return (
      <AnimalGame
        items={planets}
        title="Planets"
        lang={lang}
        initialPage={selectedIndex}
        onBack={() => setScreen('planetList')}
      />
    );
  }

  if (screen === 'instrumentList') {
    return (
      <AnimalList
        items={instruments}
        title="Instruments"
        lang={lang}
        onBack={() => setScreen('home')}
        onSelect={(i) => { setSelectedIndex(i); setScreen('instrumentGame'); }}
      />
    );
  }

  if (screen === 'instrumentGame') {
    return (
      <AnimalGame
        items={instruments}
        title="Instruments"
        lang={lang}
        initialPage={selectedIndex}
        onBack={() => setScreen('instrumentList')}
      />
    );
  }

  if (screen === 'sportsList') {
    return (
      <AnimalList
        items={sports}
        title="Sports"
        lang={lang}
        onBack={() => setScreen('home')}
        onSelect={(i) => { setSelectedIndex(i); setScreen('sportsGame'); }}
      />
    );
  }

  if (screen === 'sportsGame') {
    return (
      <AnimalGame
        items={sports}
        title="Sports"
        lang={lang}
        initialPage={selectedIndex}
        onBack={() => setScreen('sportsList')}
      />
    );
  }

  if (screen === 'farmAnimalList') {
    return (
      <AnimalList
        items={farmAnimals}
        title="Farm Animals"
        lang={lang}
        onBack={() => setScreen('home')}
        onSelect={(i) => { setSelectedIndex(i); setScreen('farmAnimalGame'); }}
      />
    );
  }

  if (screen === 'farmAnimalGame') {
    return (
      <AnimalGame
        items={farmAnimals}
        title="Farm Animals"
        lang={lang}
        initialPage={selectedIndex}
        onBack={() => setScreen('farmAnimalList')}
      />
    );
  }

  if (screen === 'dinosaurList') {
    return (
      <AnimalList
        items={dinosaurs}
        title="Dinosaurs"
        lang={lang}
        onBack={() => setScreen('home')}
        onSelect={(i) => { setSelectedIndex(i); setScreen('dinosaurGame'); }}
      />
    );
  }

  if (screen === 'dinosaurGame') {
    return (
      <AnimalGame
        items={dinosaurs}
        title="Dinosaurs"
        lang={lang}
        initialPage={selectedIndex}
        onBack={() => setScreen('dinosaurList')}
      />
    );
  }

  if (screen === 'seaAnimalList') {
    return (
      <AnimalList
        items={seaAnimals}
        title="Sea Animals"
        lang={lang}
        onBack={() => setScreen('home')}
        onSelect={(i) => { setSelectedIndex(i); setScreen('seaAnimalGame'); }}
      />
    );
  }

  if (screen === 'seaAnimalGame') {
    return (
      <AnimalGame
        items={seaAnimals}
        title="Sea Animals"
        lang={lang}
        initialPage={selectedIndex}
        onBack={() => setScreen('seaAnimalList')}
      />
    );
  }

  if (screen === 'insectList') {
    return (
      <AnimalList
        items={insects}
        title="Insects"
        lang={lang}
        onBack={() => setScreen('home')}
        onSelect={(i) => { setSelectedIndex(i); setScreen('insectGame'); }}
      />
    );
  }

  if (screen === 'insectGame') {
    return (
      <AnimalGame
        items={insects}
        title="Insects"
        lang={lang}
        initialPage={selectedIndex}
        onBack={() => setScreen('insectList')}
      />
    );
  }

  if (screen === 'birdList') {
    return (
      <AnimalList
        items={birds}
        title="Birds"
        lang={lang}
        onBack={() => setScreen('home')}
        onSelect={(i) => { setSelectedIndex(i); setScreen('birdGame'); }}
      />
    );
  }

  if (screen === 'birdGame') {
    return (
      <AnimalGame
        items={birds}
        title="Birds"
        lang={lang}
        initialPage={selectedIndex}
        onBack={() => setScreen('birdList')}
      />
    );
  }

  if (screen === 'phonicsList') {
    return (
      <AnimalList
        items={phonics}
        title="Phonics"
        lang={lang}
        onBack={() => setScreen('home')}
        onSelect={(i) => { setSelectedIndex(i); setScreen('phonicsGame'); }}
      />
    );
  }

  if (screen === 'phonicsGame') {
    return (
      <AnimalGame
        items={phonics}
        title="Phonics"
        lang={lang}
        initialPage={selectedIndex}
        onBack={() => setScreen('phonicsList')}
      />
    );
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
