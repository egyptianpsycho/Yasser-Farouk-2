"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { REEL_IMG, REEL_VIDEO_SRC } from "@/lib/constants";
import { ScrollTextReveal } from "@/components/ScrollTextReveal";
import Hls from "hls.js";

// ─── Themed Play/Pause Button ─────────────────────────────────────────────────

function ThemedPlayPause({
  isPlaying
}) {
  return <div style={{
    filter: "drop-shadow(0 2px 20px rgba(0,0,0,0.7))"
  }}>
      {!isPlaying ?
    // ── Play ──
    <svg viewBox="0 0 100 100" width="88" height="88">
          {/* Ghost ring */}
          <circle cx="50" cy="50" r="44" fill="none" stroke="hsl(0 85% 55%)" strokeWidth="5" opacity="0.25" />
          {/* Solid ring */}
          <circle cx="50" cy="50" r="44" fill="none" stroke="hsl(0 85% 55%)" strokeWidth="5" />
          {/* Triangle */}
          <polygon points="41,31 41,69 72,50" fill="hsl(0 85% 55%)" />
        </svg> :
    // ── Pause ──
    <svg viewBox="0 0 100 100" width="88" height="88">
          {/* Ghost ring */}
          <circle cx="50" cy="50" r="44" fill="none" stroke="hsl(0 85% 55%)" strokeWidth="5" opacity="0.25" />
          {/* Solid ring */}
          <circle cx="50" cy="50" r="44" fill="none" stroke="hsl(0 85% 55%)" strokeWidth="5" />
          {/* Bar left */}
          <rect x="32" y="28" width="12" height="44" rx="3" fill="hsl(0 85% 55%)" />
          {/* Bar right */}
          <rect x="56" y="28" width="12" height="44" rx="3" fill="hsl(0 85% 55%)" />
        </svg>}
    </div>;
}

// ─── Reel Player ─────────────────────────────────────────────────────────────

function ReelPlayer({
  src,
  poster
}) {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const hasStartedRef = useRef(false);
  const hideTimer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (/\.m3u8(\?|$)/i.test(src) && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hlsRef.current = hls;
    } else {
      video.src = src;
    }
    return () => {
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, [src]);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlaying = () => {
      hasStartedRef.current = true;
      setIsLoading(false);
      setIsPlaying(true);
    };
    const onWaiting = () => {
      if (hasStartedRef.current) setIsLoading(true);
    };
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      video.currentTime = 0;
    };
    video.addEventListener("playing", onPlaying);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
    };
  }, []);
  const resetHideTimer = useCallback(() => {
    setShowBtn(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) setShowBtn(false);
    }, 2200);
  }, []);
  useEffect(() => () => {
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
  }, []);
  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    resetHideTimer();
    if (v.paused) {
      setIsLoading(true);
      v.play().catch(() => setIsLoading(false));
    } else v.pause();
  };
  return <div className="relative w-full h-full bg-black select-none cursor-pointer" onMouseMove={resetHideTimer} onMouseEnter={resetHideTimer} onClick={togglePlay}>
      <video ref={videoRef} poster={poster} className="w-full h-full object-cover" playsInline preload="metadata" />

      {/* Buffering spinner */}
      {isLoading && <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none z-10">
          <svg className="animate-spin w-10 h-10" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="hsl(0 85% 55%)" strokeWidth="2" strokeOpacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="hsl(0 85% 55%)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>}

      {/* Themed animated button */}
      {!isLoading && <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-opacity duration-300" style={{
      opacity: showBtn || !isPlaying ? 1 : 0
    }}>
          <ThemedPlayPause isPlaying={isPlaying} />
        </div>}
    </div>;
}

// ─── Reel Section ─────────────────────────────────────────────────────────────

export function Reel() {
  const root = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const reveals = root.current.querySelectorAll("[data-reveal]");
      gsap.set(reveals, {
        opacity: 0,
        y: 40
      });
      gsap.to(reveals, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          once: true
        }
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return <section className="py-32 px-6 border-t border-border">
      <div ref={root} className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 data-reveal className="font-display text-5xl md:text-7xl uppercase tracking-tighter">
            The Reel
          </h2>
          <div data-reveal className="font-mono text-xs uppercase text-muted-foreground mb-2">
            [ 01 ] Full Portfolio
          </div>
        </div>

        <div data-reveal className="relative aspect-[16/7] overflow-hidden bg-secondary">
          <ReelPlayer src={REEL_VIDEO_SRC} poster={REEL_IMG} />
          <div className="absolute top-8 right-8 font-mono text-[10px] uppercase tracking-widest text-white/80 pointer-events-none z-10">
            02:47 / Director's Cut
          </div>
          <div className="absolute bottom-8 left-8 font-display text-2xl md:text-3xl uppercase text-white pointer-events-none z-10">
            Showreel 2024
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <ScrollTextReveal label="[ - ] ABOUT" lines={["I make images that breathe —", "stills and motion built on patience,", "available light, and a love for", "the quiet middle of a story."]} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight text-foreground" />
        </div>
      </div>
    </section>;
}