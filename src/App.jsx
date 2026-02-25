import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './LandingPage';
import IntroLetter from './IntroLetter';
import PoemScrapbook from './PoemScrapbook';
import HandLetter from './HandLetter';
import PasswordScene from './PasswordScene';
import MusicPlayer from './MusicPlayer';

const SCREENS = {
  HERO: 'hero',
  INTRO: 'intro',
  SCRAPBOOK: 'scrapbook',
  PASSWORD: 'password',
  LETTER: 'letter',
};

const screenTransition = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.04 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.HERO);
  const [curtainTriggered, setCurtainTriggered] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);

  const goTo = useCallback((screen) => {
    setCurrentScreen(screen);
  }, []);

  const handleCurtainOpen = useCallback(() => {
    setCurtainTriggered(true);
    // Start music when curtains open
    setMusicStarted(true);
  }, []);

  const handleCurtainDone = useCallback(() => {
    setCurrentScreen(SCREENS.INTRO);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Global Background Texture */}
      <div className="absolute inset-0 z-[-1]">
        <img
          src="/assets/bg_texture.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* IntroLetter sits behind curtains, pre-loaded on stamp click */}
      {(curtainTriggered || currentScreen === SCREENS.INTRO) && currentScreen !== SCREENS.SCRAPBOOK && currentScreen !== SCREENS.PASSWORD && currentScreen !== SCREENS.LETTER && (
        <div className="absolute inset-0 z-0">
          <IntroLetter onContinue={() => goTo(SCREENS.SCRAPBOOK)} />
        </div>
      )}

      {/* Curtains overlay */}
      {currentScreen === SCREENS.HERO && (
        <LandingPage onOpen={handleCurtainOpen} onComplete={handleCurtainDone} />
      )}

      <AnimatePresence mode="wait">
        {currentScreen === SCREENS.SCRAPBOOK && (
          <motion.div key="scrapbook" className="absolute inset-0" {...screenTransition}>
            <PoemScrapbook
              onBack={() => goTo(SCREENS.INTRO)}
              onNext={() => goTo(SCREENS.PASSWORD)}
            />
          </motion.div>
        )}

        {currentScreen === SCREENS.PASSWORD && (
          <motion.div key="password" className="absolute inset-0" {...screenTransition}>
            <PasswordScene onUnlock={() => goTo(SCREENS.LETTER)} />
          </motion.div>
        )}

        {currentScreen === SCREENS.LETTER && (
          <motion.div key="letter" className="absolute inset-0" {...screenTransition}>
            <HandLetter onReplay={() => {
              setCurtainTriggered(false);
              setMusicStarted(false);
              goTo(SCREENS.HERO);
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Music Player — mounts once curtain opens, persists across all screens */}
      {musicStarted && (
        <MusicPlayer autoPlay={true} />
      )}
    </div>
  );
}

export default App;
