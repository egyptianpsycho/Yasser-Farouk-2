"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import Hls from "hls.js";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isEmbeddable(url) {
  return /youtube\.com|youtu\.be|vimeo\.com/.test(url);
}
function toEmbedUrl(url) {
  if (/youtu\.be\/([^?&]+)/.test(url)) {
    const id = url.match(/youtu\.be\/([^?&]+)/)[1];
    return `https://www.youtube.com/embed/${id}?autoplay=1`;
  }
  if (/youtube\.com\/watch\?v=/.test(url)) {
    const id = url.match(/v=([^&]+)/)[1];
    return `https://www.youtube.com/embed/${id}?autoplay=1`;
  }
  if (/vimeo\.com\/(\d+)/.test(url)) {
    const id = url.match(/vimeo\.com\/(\d+)/)[1];
    return `https://player.vimeo.com/video/${id}?autoplay=1`;
  }
  return url;
}
function fmt(s) {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function IconPlay() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}
function IconPause() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <rect x="5" y="3" width="4" height="18" rx="1" />
      <rect x="15" y="3" width="4" height="18" rx="1" />
    </svg>
  );
}
function IconVolume() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path
        d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconMute() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <line
        x1="23"
        y1="9"
        x2="17"
        y2="15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="17"
        y1="9"
        x2="23"
        y2="15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconFullscreen() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="w-4 h-4"
    >
      <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3" />
    </svg>
  );
}
function IconExitFullscreen() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="w-4 h-4"
    >
      <path d="M8 3v3a1 1 0 0 1-1 1H3M16 3v3a1 1 0 0 0 1 1h3M21 16h-3a1 1 0 0 0-1 1v3M3 16h3a1 1 0 0 1 1 1v3" />
    </svg>
  );
}
function IconLoader() {
  return (
    <svg
      className="animate-spin w-10 h-10 text-white/60"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.2"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Themed Play/Pause Button ─────────────────────────────────────────────────

function ThemedPlayPause({ isPlaying }) {
  const RED = "hsl(0 85% 55%)";
  return (
    // w-14 (56px) on mobile → 88px on sm+ breakpoint
    <div
      className="w-14 h-14 sm:w-[88px] sm:h-[88px]"
      style={{
        filter: "drop-shadow(0 2px 20px rgba(0,0,0,0.7))",
      }}
    >
      {isPlaying ? (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke={RED}
            strokeWidth="5"
            opacity="0.2"
          />
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke={RED}
            strokeWidth="5"
          />
          <rect x="32" y="28" width="12" height="44" rx="3" fill={RED} />
          <rect x="56" y="28" width="12" height="44" rx="3" fill={RED} />
        </svg>
      ) : (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke={RED}
            strokeWidth="5"
            opacity="0.2"
          />
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke={RED}
            strokeWidth="5"
          />
          <polygon points="41,31 41,69 72,50" fill={RED} />
        </svg>
      )}
    </div>
  );
}

// ─── Entry Loading Overlay ────────────────────────────────────────────────────

function EntryLoader({ loaderRef, title }) {
  return (
    <div
      ref={loaderRef}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black"
    >
      {/* Animated gold arc spinner */}
      <div className="relative w-14 h-14">
        {/* Outer glow ring */}
        <svg
          viewBox="0 0 56 56"
          className="absolute inset-0 w-full h-full"
        >
          <circle
            cx="28"
            cy="28"
            r="24"
            fill="none"
            stroke="#C41E3A"
            strokeWidth="1"
            opacity="0.08"
          />
        </svg>
        {/* Spinning arc */}
        <svg
          viewBox="0 0 56 56"
          className="w-full h-full"
          style={{
            animation: "spin 1.4s linear infinite",
          }}
        >
          <circle
            cx="28"
            cy="28"
            r="24"
            fill="none"
            stroke="rgba(201,168,76,0.10)"
            strokeWidth="1.5"
          />
          <path
            d="M28 4a24 24 0 0 1 24 24"
            stroke="#C41E3A"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Project title */}
      {title && (
        <p
          className="font-mono text-[10px] md:text-[20px] uppercase tracking-[0.35em] text-white/20 mt-6 select-none"
          style={{ letterSpacing: "0.35em" }}
        >
          {title}
        </p>
      )}

      <style>{`
        @keyframes spin   { to { transform: rotate(360deg); } }
        @keyframes pulse  { 0%,100% { opacity:0.3; transform:scale(1);   }
                            50%      { opacity:1;   transform:scale(1.6); } }
      `}</style>
    </div>
  );
}

// ─── Native Video Player ──────────────────────────────────────────────────────

function NativePlayer({ src, onOrientation }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const progressRef = useRef(null);
  const hideTimer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const hasStartedRef = useRef(false);
  const [hasEverPlayed, setHasEverPlayed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [orientation, setOrientation] = useState(null);

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
    const onMeta = () => {
      setDuration(video.duration);
      const w = video.videoWidth;
      const h = video.videoHeight;
      const o =
        h > w * 1.1 ? "portrait" : w > h * 1.1 ? "landscape" : "square";
      setOrientation(o);
      onOrientation?.(o);
    };
    const onPlaying = () => {
      hasStartedRef.current = true;
      setIsLoading(false);
      setIsPlaying(true);
      setHasEverPlayed(true);
    };
    const onWaiting = () => {
      if (hasStartedRef.current) setIsLoading(true);
    };
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      video.currentTime = 0;
    };
    const onTime = () => {
      setCurrentTime(video.currentTime);
      setProgress(video.duration ? video.currentTime / video.duration : 0);
    };
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);
    video.addEventListener("timeupdate", onTime);
    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("timeupdate", onTime);
    };
  }, []);

  useEffect(() => {
    if (hasEverPlayed) resetHideTimer();
  }, [hasEverPlayed]);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (containerRef.current) containerRef.current.style.cursor = "default";
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        setShowControls(false);
        if (document.fullscreenElement && containerRef.current) {
          containerRef.current.style.cursor = "none";
        }
      }
    }, 2800);
  }, []);

  useEffect(
    () => () => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    },
    []
  );

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (hasEverPlayed) resetHideTimer();
    if (v.paused) {
      setIsLoading(true);
      v.play().catch(() => setIsLoading(false));
    } else v.pause();
  };
  const toggleMute = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
    resetHideTimer();
  };
  const toggleFullscreen = (e) => {
    e.stopPropagation();
    resetHideTimer();
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) el.requestFullscreen();
    else document.exitFullscreen();
  };
  const seekTo = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    const bar = progressRef.current;
    if (!v || !bar || !v.duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(
      0,
      Math.min(1, (e.clientX - rect.left) / rect.width)
    );
    v.currentTime = ratio * v.duration;
    resetHideTimer();
  };

  // ── Responsive player sizing ──────────────────────────────────────────────
  // portrait  → stays tall, auto width
  // square    → stays square, auto width
  // landscape → 98vw on mobile so it fills edge-to-edge; capped at 1300px on desktop
  const playerStyle =
    orientation === null
      ? { width: 0, height: 0, overflow: "hidden", opacity: 0 }
      : orientation === "portrait"
      ? { height: "min(88vh, 680px)", width: "auto", aspectRatio: "9/16" }
      : orientation === "square"
      ? { height: "min(78vh, 680px)", width: "auto", aspectRatio: "1/1" }
      : { width: "min(98vw, 1300px)", aspectRatio: "16/9" };

  return (
    <div
      ref={containerRef}
      className="relative bg-black select-none"
      style={playerStyle}
      onMouseMove={() => { if (hasEverPlayed) resetHideTimer(); }}
      onMouseEnter={() => { if (hasEverPlayed) resetHideTimer(); }}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        playsInline
        preload="metadata"
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 pointer-events-none z-10">
          <IconLoader />
        </div>
      )}

      {!isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-opacity duration-300"
          style={{ opacity: showControls || !isPlaying ? 1 : 0 }}
        >
          <ThemedPlayPause isPlaying={isPlaying} />
        </div>
      )}

      {/* Controls bar — only mounted after the first play event */}
      {hasEverPlayed && (
        <div
          className="absolute bottom-0 left-0 right-0 z-20 transition-opacity duration-300"
          style={{ opacity: showControls ? 1 : 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none rounded-b" />

          <div className="relative px-3 pb-3 pt-8 flex flex-col gap-2">
            <div
              ref={progressRef}
              className="w-full h-1 bg-white/20 rounded-full cursor-pointer group/bar"
              onClick={seekTo}
            >
              <div
                className="h-full bg-primary rounded-full relative transition-none"
                style={{ width: `${progress * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 size-3 rounded-full bg-white opacity-0 group-hover/bar:opacity-100 transition-opacity" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="text-white hover:text-primary transition-colors shrink-0"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <IconPause /> : <IconPlay />}
              </button>

              <span className="font-mono text-[10px] text-white/70 tabular-nums shrink-0">
                {fmt(currentTime)} / {fmt(duration)}
              </span>

              <div className="flex-1" />

              <button
                onClick={toggleMute}
                className="text-white hover:text-primary transition-colors shrink-0"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <IconMute /> : <IconVolume />}
              </button>

              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-primary transition-colors shrink-0"
                aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? <IconExitFullscreen /> : <IconFullscreen />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── VideoViewer ──────────────────────────────────────────────────────────────

export function VideoViewer({ open, project, onClose }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const headerTitleRef = useRef(null);
  const entryLoaderRef = useRef(null);
  const [entryLoadDone, setEntryLoadDone] = useState(false);

  const [mounted, setMounted] = useState(false);
  const [viewerOrientation, setViewerOrientation] = useState(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) {
      setViewerOrientation(null);
      setEntryLoadDone(false);
    }
  }, [open, project?.video]);

  // Dismiss loader once native video metadata is ready
  useEffect(() => {
    if (viewerOrientation !== null) setEntryLoadDone(true);
  }, [viewerOrientation]);

  // Dismiss loader for embeddable iframes after a brief paint window
  useEffect(() => {
    if (open && project && isEmbeddable(project.video)) {
      const t = setTimeout(() => setEntryLoadDone(true), 750);
      return () => clearTimeout(t);
    }
  }, [open, project?.video]);

  // GSAP fade-out of the entry loader
  useEffect(() => {
    if (entryLoadDone && entryLoaderRef.current) {
      gsap.to(entryLoaderRef.current, {
        opacity: 0,
        duration: 0.55,
        ease: "power2.inOut",
        onComplete: () => {
          if (entryLoaderRef.current)
            entryLoaderRef.current.style.display = "none";
        },
      });
    }
  }, [entryLoadDone]);

  useEffect(() => {
    if (open) setViewerOrientation(null);
  }, [open, project]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("lenis-stopped");
    const lenis = window.__lenis;
    lenis?.stop();
    return () => {
      document.body.style.overflow = prev;
      document.documentElement.classList.remove("lenis-stopped");
      lenis?.start();
    };
  }, [open]);

  useEffect(() => {
    if (!open || !overlayRef.current) return;
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" }
    );
    gsap.fromTo(
      contentRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.15 }
    );
    if (project && isEmbeddable(project.video)) {
      gsap.fromTo(
        headerTitleRef.current,
        { opacity: 0, filter: "blur(12px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power3.out",
          delay: 0.25,
        }
      );
    }
  }, [open]);

  useEffect(() => {
    if (!viewerOrientation || !headerTitleRef.current) return;
    gsap.fromTo(
      headerTitleRef.current,
      { opacity: 0, filter: "blur(12px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power3.out",
        delay: 0.05,
      }
    );
  }, [viewerOrientation]);

  const handleClose = useCallback(() => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(contentRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
    });
    tl.to(
      overlayRef.current,
      { opacity: 0, duration: 0.3 },
      "<"
    );
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  if (!mounted || !open || !project) return null;

  const isPortrait = viewerOrientation === "portrait";

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9998] bg-black flex flex-col"
      style={{ opacity: 0 }}
    >
      {/* ── Entry loading overlay ──────────────────────────────────────────── */}
      <EntryLoader loaderRef={entryLoaderRef} title={project.title} />

      {/* ── Header bar ────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-5 sm:px-8 py-3 shrink-0 border-b border-white/5">
        <button
          onClick={handleClose}
          className="flex items-center gap-2.5 text-white/40 hover:text-white transition-colors duration-200 group"
        >
          <svg
            viewBox="0 0 16 16"
            width="13"
            height="13"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:-translate-x-1"
          >
            <path d="M10 3L5 8l5 5" />
          </svg>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] leading-none">
            Back
          </span>
        </button>
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div
        ref={contentRef}
        className="flex-1 overflow-hidden"
        style={{ opacity: 0 }}
      >
        {isEmbeddable(project.video) ? (
          /* ── Embeddable (YouTube / Vimeo) ── */
          <div className="w-full h-full flex flex-col items-center justify-center bg-black gap-8 px-1 sm:px-6">
            <div
              className="w-full max-w-5xl"
              style={{ aspectRatio: "16/9" }}
            >
              <iframe
                src={toEmbedUrl(project.video)}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div
              ref={headerTitleRef}
              className="w-full max-w-5xl flex items-start justify-between gap-6"
              style={{ opacity: 0, filter: "blur(12px)" }}
            >
              <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tighter leading-none text-white">
                {project.title}
              </h2>
              <div className="text-right shrink-0">
                {project.meta && (
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                    {project.meta}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : isPortrait ? (
          /* ── Portrait native video ── */
          <div className="w-full h-full flex items-center justify-center gap-10 px-1 sm:px-6 md:px-16">
            <NativePlayer
              key={project.video}
              src={project.video}
              onOrientation={setViewerOrientation}
            />
            <div
              ref={headerTitleRef}
              className="flex-col gap-6 max-w-xs shrink-0 hidden md:flex"
              style={{ opacity: 0, filter: "blur(12px)" }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                {project.id}
              </span>
              <h2 className="font-display text-4xl lg:text-6xl uppercase tracking-tighter leading-[0.9] text-white">
                {project.title}
              </h2>
              <div className="w-8 h-px bg-primary" />
              <div className="flex flex-col gap-1.5">
                {project.meta && (
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                    {project.meta}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* ── Landscape / square native video ── */
          // px-0 on mobile so the 98vw video has no extra margin eating into it
          <div className="w-full h-full flex flex-col items-center justify-center gap-6 px-0 sm:px-4">
            <NativePlayer
              key={project.video}
              src={project.video}
              onOrientation={setViewerOrientation}
            />
            {viewerOrientation !== null && (
              <div
                ref={headerTitleRef}
                className="w-full flex items-end justify-between gap-6 px-3 sm:px-0"
                style={{
                  maxWidth: "min(98vw, 1100px)",
                  opacity: 0,
                  filter: "blur(12px)",
                }}
              >
                <h2 className="font-display text-2xl md:text-4xl uppercase tracking-tighter leading-none text-white">
                  {project.title}
                </h2>
                <div className="text-right shrink-0 pb-0.5">
                  {project.meta && (
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                      {project.meta}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

export default VideoViewer;