import React, { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { PhotoScrollExhibition } from './components/PhotoScrollExhibition';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { useAudio } from './hooks/useAudio';
import { useReducedMotion } from './hooks/useReducedMotion';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { isPlaying: isAudioPlaying, toggleSound: toggleAudio } = useAudio();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-[#050608] text-slate-100 relative font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* 1. Loading Screen */}
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {/* 2. Custom Desktop Cursor */}
      {!prefersReducedMotion && <CustomCursor />}

      {/* 3. 10-Stage Vertical Photo Scroll Exhibition */}
      <PhotoScrollExhibition
        isAudioPlaying={isAudioPlaying}
        toggleAudio={toggleAudio}
      />

      {/* 4. Luxury Footer */}
      <Footer />
    </div>
  );
}

export default App;
