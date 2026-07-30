"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PROJECTS_VIDEOS } from "@/lib/constants";
import { VideoViewer } from "./VideoViewer";
import OptimizedImage from "@/components/OptimizedImage";

const PROJECTS = PROJECTS_VIDEOS.map((p) => ({
  id: String(p.id).padStart(2, "0"),
  title: p.title,
  meta: `${p.client} / ${p.year}`,
  year: p.year,
  cover: p.thumbnail,
  video: p.videoURL,
  client: p.client,
  duration: p.duration,
}));

export function Videography() {
  const root = useRef(null);
  const gridRef = useRef(null);
  const titleRef = useRef(null);
  const [active, setActive] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Title reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      const reveals = root.current.querySelectorAll("[data-reveal]");

      gsap.set(reveals, {
        opacity: 0,
        y: 40,
        filter: "blur(12px)",
        willChange: "transform, opacity, filter",
      });

      gsap.to(reveals, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
        onComplete: () => gsap.set(reveals, { willChange: "auto" }),
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          once: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Row-grouped scroll-in animation — desktop only
  useEffect(() => {
    if (!gridRef.current) return;
    if (isMobile) return; // skip entirely on mobile

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".video-item");
      if (!items.length) return;

      const rowMap = new Map();
      items.forEach((el) => {
        const top = Math.round(el.getBoundingClientRect().top + window.scrollY);
        if (!rowMap.has(top)) rowMap.set(top, []);
        rowMap.get(top).push(el);
      });
      const rows = [...rowMap.entries()]
        .sort(([a], [b]) => a - b)
        .map(([, els]) => els);

      const fromVars = {
        opacity: 0,
        y: 80,
        scale: 0.95,
        willChange: "transform, opacity",
      };

      const toVars = {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
        stagger: {
          amount: 0.25,
          from: "start",
        },
      };

      const eagerRows = rows.slice(0, 3).flat();
      if (eagerRows.length) {
        gsap.fromTo(eagerRows, fromVars, {
          ...toVars,
          onComplete: () => gsap.set(eagerRows, { willChange: "auto" }),
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }

      rows.slice(3).forEach((rowEls) => {
        gsap.fromTo(rowEls, fromVars, {
          ...toVars,
          onComplete: () => gsap.set(rowEls, { willChange: "auto" }),
          scrollTrigger: {
            trigger: rowEls[0],
            start: "top 90%",
            once: true,
          },
        });
      });

      ScrollTrigger.refresh();
    }, gridRef);
    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      id="motion"
      className="py-24 md:py-32 px-4 sm:px-6 bg-background -mt-52 max-sm:-mt-80"
    >
      <div ref={root} className="mx-auto">
        <div className="flex justify-between items-end mb-12 md:mb-16 gap-4">
          <div className="min-w-0">
            <span
              data-reveal
              className="font-mono text-xs uppercase text-primary block"
            >
              Videography
            </span>
            <h2
              ref={titleRef}
              data-reveal
              className="font-display uppercase tracking-tighter leading-none mt-2"
              style={{
                fontSize: "clamp(3rem, 12vw, 8rem)",
              }}
            >
              Vision in <span className="italic text-primary">motion</span>
            </h2>
          </div>
          <div
            data-reveal
            className="font-mono text-[10px] sm:text-xs uppercase text-muted-foreground hidden sm:block shrink-0"
          >
            [ {String(PROJECTS.length).padStart(2, "0")} ] Selected Works
          </div>
        </div>

        {isMobile ? (
          // ── Mobile grid — no GSAP, all cards visible at opacity 1 ──
          <div
            ref={gridRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "2px",
              width: "100vw",
              marginLeft: "calc(-50vw + 50%)",
            }}
          >
            {PROJECTS.map((p, idx) => (
              <div
                key={p.id}
                style={{
                  gridColumn: idx === 0 ? "span 2" : undefined,
                  aspectRatio: idx === 0 ? "16 / 9" : "1 / 1",
                  position: "relative",
                  overflow: "hidden",
                  opacity: 1, // always visible on mobile
                }}
              >
                <VideoCard
                  p={p}
                  onOpen={setActive}
                  sizes={idx === 0 ? "100vw" : "50vw"}
                />
              </div>
            ))}
          </div>
        ) : (
          // ── Desktop bento grid — GSAP animates .video-item ──
          <div ref={gridRef} className="parent-video mx-auto">
            {PROJECTS.map((p, idx) => (
              <div
                key={p.id}
                className={`video-item div${idx + 1}-video relative overflow-hidden`}
              >
                <VideoCard
                  p={p}
                  onOpen={setActive}
                  sizes={
                    idx === 0
                      ? "(max-width: 1280px) 100vw, 50vw"
                      : "(max-width: 768px) 50vw, 25vw"
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <VideoViewer
        open={!!active}
        project={active}
        onClose={() => setActive(null)}
      />
    </section>
  );
}

function VideoCard({
  p,
  onOpen,
  sizes = "(max-width: 768px) 50vw, 25vw",
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(p)}
      className="group relative w-full h-full text-left cursor-pointer overflow-hidden bg-secondary block"
    >
      <OptimizedImage
        src={p.cover}
        alt={p.title}
        priority={true}
        sizes={sizes}
        className="object-cover transition-transform duration-1000 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
      <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest text-white/80">
        #{p.id}
      </div>
      <div className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-widest text-white/60">
        {p.duration}
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="size-14 md:size-16 rounded-full border border-white/40 bg-black/30 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
          <div className="w-0 h-0 border-y-[8px] border-y-transparent border-l-[13px] border-l-white ml-0.5" />
        </div>
      </div>
      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
        <h3 className="font-display text-base sm:text-xl md:text-2xl uppercase tracking-tight text-white leading-none truncate">
          {p.title}
        </h3>
        <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-white/70 mt-1 truncate">
          {p.client}
        </p>
      </div>
      <span className="absolute bottom-0 left-0 h-[2px] w-full bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
    </button>
  );
}