"use client";

/* eslint-disable prettier/prettier */
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { MediaCarousel } from "@/components/ui/MediaCarousel";
import Image from "next/image";

// ─── Column count hook ────────────────────────────────────────────────────────

function useColumns() {
  const get = () => {
    if (typeof window === "undefined") return 2;
    const w = window.innerWidth;
    if (w >= 1280) return 4;
    if (w >= 1024) return 3;
    if (w >= 640) return 3;
    return 2;
  };
  const [c, setC] = useState(get);
  useEffect(() => {
    const onR = () => setC(get());
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);
  return c;
}

// ─── Round-robin column distributor (no empty columns) ───────────────────────

function distributeColumns(items, colCount) {
  const count = Math.min(colCount, items.length);
  if (count === 0) return [];
  const columns = Array.from({ length: count }, () => []);
  items.forEach((item, i) => columns[i % count].push(item));
  return columns;
}

// ─── Image Lightbox (carousel) ───────────────────────────────────────────────

function ImageLightbox({ images, cover, startIndex, onClose }) {
  const overlayRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    <div
      ref={overlayRef}
      onClick={onClose}
      className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
      style={{ opacity: 0 }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 size-10 md:size-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-mono text-xs uppercase tracking-widest hover:scale-110 transition-transform z-20"
        aria-label="Close"
      >
        ✕
      </button>
      <div onClick={(e) => e.stopPropagation()} className="w-full">
        <MediaCarousel images={images} cover={cover} initialIndex={startIndex} />
      </div>
    </div>,
    document.body
  );
}

// ─── ImageViewer ──────────────────────────────────────────────────────────────

export function ImageViewer({ open, project, onClose }) {
  const overlayRef    = useRef(null);
  const contentRef    = useRef(null);
  const loaderRef     = useRef(null);
  const centerTitleRef = useRef(null);
  const headerTitleRef = useRef(null);
  const scrollRef     = useRef(null);

  const [mounted, setMounted]         = useState(false);
  const [allLoaded, setAllLoaded]     = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [imageLightbox, setImageLightbox] = useState(null);

  const loadedCountRef = useRef(0);
  const totalRef       = useRef(0);

  const cols = useColumns();

  useEffect(() => setMounted(true), []);

  // Build image list — always before early return (Rules of Hooks)
  const allImages = useMemo(() => {
    if (!project) return [];
    return project.cover
      ? [project.cover, ...project.images.filter((img) => img !== project.cover)]
      : project.images ?? [];
  }, [project]);

  // Distribute evenly across columns — no empty column gaps
  const columnArrays = useMemo(
    () => distributeColumns(allImages, cols),
    [allImages, cols]
  );

  const progress = totalRef.current > 0
    ? Math.round((loadedCount / totalRef.current) * 100)
    : 0;

  // Reset on open
  useEffect(() => {
    if (!open || !project) return;
    setAllLoaded(false);
    loadedCountRef.current = 0;
    setLoadedCount(0);
    totalRef.current = allImages.length || 1;

    if (loaderRef.current)     gsap.set(loaderRef.current,     { opacity: 1, scale: 1 });
    if (contentRef.current)    gsap.set(contentRef.current,    { opacity: 0, y: 0 });
    if (centerTitleRef.current) gsap.set(centerTitleRef.current, { opacity: 0, filter: "blur(40px)", scale: 1.1 });
    if (headerTitleRef.current) gsap.set(headerTitleRef.current, { opacity: 0, filter: "blur(12px)" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, project]);

  // Lock scroll
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

  // Contain scroll within masonry
  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (!el) return;
    const stop = (e) => e.stopPropagation();
    el.addEventListener("wheel", stop, { passive: true });
    el.addEventListener("touchmove", stop, { passive: true });
    return () => {
      el.removeEventListener("wheel", stop);
      el.removeEventListener("touchmove", stop);
    };
  }, [open]);

  // Overlay fade-in
  useEffect(() => {
    if (!open || !overlayRef.current) return;
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
  }, [open]);

  // Reveal sequence after images load
  useEffect(() => {
    if (!allLoaded || !open) return;
    const tl = gsap.timeline();

    tl.to(loaderRef.current, { opacity: 0, scale: 0.97, duration: 0.3, ease: "power2.in" });
    tl.to(centerTitleRef.current, { opacity: 1, filter: "blur(0px)", scale: 1, duration: 0.7, ease: "power3.out" }, "-=0.1");
    tl.to(centerTitleRef.current, { opacity: 0, filter: "blur(30px)", scale: 0.95, duration: 0.5, ease: "power2.in", delay: 0.55 });
    tl.fromTo(contentRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" }, "-=0.2");
    tl.to(headerTitleRef.current, { opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }, "-=0.2");

    const items = contentRef.current?.querySelectorAll(".viewer-img-item") ?? [];
    if (items.length > 0) {
      tl.fromTo(
        items,
        { opacity: 0, scale: 0.95, filter: "blur(8px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.5, stagger: { amount: 0.5, from: "random" }, ease: "power3.out" },
        "-=0.3"
      );
    }
  }, [allLoaded, open]);

  const handleImageLoad = useCallback(() => {
    loadedCountRef.current += 1;
    setLoadedCount(loadedCountRef.current);
    if (loadedCountRef.current >= totalRef.current) setAllLoaded(true);
  }, []);

  const handleClose = useCallback(() => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(contentRef.current,  { y: 30, opacity: 0, duration: 0.25, ease: "power2.in" });
    tl.to(overlayRef.current,  { opacity: 0, duration: 0.3 }, "<");
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape" && !imageLightbox) handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, imageLightbox, handleClose]);

  if (!mounted || !open || !project) return null;

  return createPortal(
    <div ref={overlayRef} className="fixed inset-0 z-[9998] bg-black/95 backdrop-blur-sm" style={{ opacity: 0 }}>

      {/* Loader */}
      <div ref={loaderRef} className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-8 pointer-events-none">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-foreground/10" />
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 animate-spin"
            style={{ animationDuration: "1.1s" }}
            viewBox="0 0 96 96"
            fill="none"
          >
            <circle cx="48" cy="48" r="44" stroke="hsl(0 85% 55%)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="80 200" />
          </svg>
          <span className="font-display text-2xl tabular-nums text-foreground/80">{progress}</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <span className="font-display text-xl uppercase tracking-[0.25em] text-foreground">
            {project.title}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Loading {allImages.length} photos
          </span>
        </div>
        <div className="w-48 h-px bg-foreground/10 overflow-hidden">
          <div className="h-full bg-primary transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Big centered title flash */}
      <div
        ref={centerTitleRef}
        className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none px-6"
        style={{ opacity: 0, filter: "blur(40px)" }}
      >
        <h1
          className="font-display text-center leading-none uppercase tracking-tighter select-none"
          style={{ fontSize: "clamp(3rem, 12vw, 10rem)" }}
        >
          {project.title}
        </h1>
      </div>

      {/* Content */}
      <div ref={contentRef} className="w-full h-full flex flex-col" style={{ opacity: 0 }}>

        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-8 pt-6 pb-4 border-b border-border bg-background/80 backdrop-blur-md shrink-0">
          <button onClick={handleClose} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
            <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>
            <span className="font-mono text-[10px] uppercase tracking-widest">Back</span>
          </button>
          <span className="h-4 w-px bg-border shrink-0" />
          <h2
            ref={headerTitleRef}
            className="font-display text-base sm:text-xl uppercase tracking-wider truncate"
            style={{ opacity: 0, filter: "blur(12px)" }}
          >
            {project.title}
          </h2>
          <div className="ml-auto flex items-center gap-3 sm:gap-5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground shrink-0">
            {project.meta && <span className="hidden sm:inline">{project.meta}</span>}
            {project.year && <span className="hidden sm:inline">{project.year}</span>}
            <span>[{String(allImages.length).padStart(2, "0")}]</span>
          </div>
        </div>

        {/* ── Masonry grid: flex columns, evenly distributed ── */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-3 sm:p-4"
          style={{ overscrollBehavior: "contain", touchAction: "pan-y" }}
        >
          <div className="flex gap-2" style={{ alignItems: "flex-start" }}>
            {columnArrays.map((colImages, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-2" style={{ flex: 1, minWidth: 0 }}>
                {colImages.map((src, rowIdx) => {
                  // Recover original index for the lightbox
                  const originalIdx = colIdx + rowIdx * columnArrays.length;
                  return (
                    <button
                      key={rowIdx}
                      type="button"
                      className="viewer-img-item group block w-full cursor-pointer relative overflow-hidden border border-border text-left"
                      onClick={() => setImageLightbox({ index: originalIdx })}
                    >
                      <Image
                        src={src}
                        alt={`${project.title} ${originalIdx + 1}`}
                        width={0}
                        height={0}
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="w-full h-auto block group-hover:scale-105 transition-transform duration-700 ease-out"
                        onLoad={handleImageLoad}
                        onError={handleImageLoad}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/80">
                          {String(originalIdx + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {imageLightbox && (
        <ImageLightbox
          images={project.images}
          cover={project.cover}
          startIndex={imageLightbox.index}
          onClose={() => setImageLightbox(null)}
        />
      )}
    </div>,
    document.body
  );
}

export default ImageViewer;