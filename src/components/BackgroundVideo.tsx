'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { hero } from '../content/landing';
import { PauseIcon, PlayIcon } from './icons';

interface BackgroundVideoContextValue {
  paused: boolean;
  toggle: () => void;
}

const BackgroundVideoContext =
  createContext<BackgroundVideoContextValue | null>(null);

export function BackgroundVideoProvider({ children }: { children: ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const syncMotionPreference = () => {
      if (motionQuery.matches) {
        video.pause();
        setPaused(true);
      } else if (!userPausedRef.current) {
        video.play().catch(() => {});
        setPaused(false);
      }
    };

    syncMotionPreference();
    motionQuery.addEventListener('change', syncMotionPreference);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (!entry.isIntersecting) {
          video.pause();
        } else if (!userPausedRef.current && !motionQuery.matches) {
          video.play().catch(() => {});
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(video);

    return () => {
      motionQuery.removeEventListener('change', syncMotionPreference);
      observer.disconnect();
    };
  }, []);

  const toggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      userPausedRef.current = false;
      video.muted = true;
      video.play().catch(() => {});
      setPaused(false);
    } else {
      userPausedRef.current = true;
      video.pause();
      setPaused(true);
    }
  }, []);

  return (
    <BackgroundVideoContext.Provider value={{ paused, toggle }}>
      <video
        ref={videoRef}
        className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover object-center opacity-55"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={hero.video.poster}
        aria-hidden="true"
      >
        <source src={hero.video.mp4} type="video/mp4" />
      </video>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-black/70 via-black/45 to-black/80"
      />

      {children}
    </BackgroundVideoContext.Provider>
  );
}

export function VideoToggle() {
  const ctx = useContext(BackgroundVideoContext);
  if (!ctx) return null;

  return (
    <button
      type="button"
      onClick={ctx.toggle}
      aria-label={ctx.paused ? hero.video.playLabel : hero.video.pauseLabel}
      className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/45 bg-black/55 text-white transition-colors hover:border-white hover:bg-white hover:text-black"
    >
      {ctx.paused ? (
        <PlayIcon className="h-4 w-4" />
      ) : (
        <PauseIcon className="h-4 w-4" />
      )}
    </button>
  );
}
