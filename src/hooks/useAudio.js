import { useState, useCallback, useRef, useEffect } from 'react';

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);

  const initAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  }, []);

  const playTick = useCallback(() => {
    if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.015);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.025);
    } catch (e) {
      console.warn('Audio tick error', e);
    }
  }, []);

  const playClick = useCallback(() => {
    if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(2400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {
      console.warn('Audio click error', e);
    }
  }, []);

  const toggleSound = useCallback(() => {
    initAudioCtx();
    setIsPlaying(prev => {
      const next = !prev;
      if (!next && timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return next;
    });
  }, [initAudioCtx]);

  useEffect(() => {
    if (isPlaying) {
      // Mechanical tick loop (4Hz tick-tock)
      timerRef.current = setInterval(() => {
        playTick();
      }, 250);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playTick]);

  return { isPlaying, toggleSound, playClick, playTick };
}
