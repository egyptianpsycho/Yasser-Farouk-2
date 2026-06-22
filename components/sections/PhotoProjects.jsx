"use client";

/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PROJECTS_PHOTOS } from "@/lib/constants";
import { ImageViewer } from "./ImageViewer";
import OptimizedImage from "@/components/OptimizedImage";
gsap.registerPlugin(ScrollTrigger);
const CATEGORIES = ["All", "Portrait", "Commercial", "Architecture", "Fine Art", "F&B"];
const PROJECTS = PROJECTS_PHOTOS.map(p => ({
  ...p,
  displayId: `P${String(p.id).padStart(2, "0")}`,
  cover: p.thumbnail
}));
function toViewerProject(p) {
  return {
    id: p.displayId,
    title: p.title,
    meta: p.location,
    year: p.year,
    cover: p.cover,
    images: p.images
  };
}
export function PhotoProjects() {
  const [active, setActive] = useState(null);
  const [selected, setSelected] = useState("All");
  const [displayed, setDisplayed] = useState("All");
  const [transitioning, setTransitioning] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const isFirstRender = useRef(true);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  useEffect(() => {
    const onClick = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);
  const filtered = displayed === "All" ? PROJECTS : PROJECTS.filter(p => p.category === displayed);
  const handleCategoryChange = cat => {
    if (cat === displayed) {
      setDropdownOpen(false);
      return;
    }
    setDropdownOpen(false);
    setTransitioning(true);
    setTimeout(() => {
      setDisplayed(cat);
      setSelected(cat);
      setTransitioning(false);
    }, 350);
  };

  // Header reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      const reveals = headerRef.current?.querySelectorAll("[data-reveal]") ?? [];
      gsap.set(reveals, {
        opacity: 0,
        y: 40,
        filter: "blur(12px)"
      });
      gsap.to(reveals, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          once: true
        }
      });
    });
    return () => ctx.revert();
  }, []);

  // Row-grouped scroll animation
  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".photo-item");
      if (!items.length) return;
      const rowMap = new Map();
      items.forEach(el => {
        const top = Math.round(el.getBoundingClientRect().top + window.scrollY);
        if (!rowMap.has(top)) rowMap.set(top, []);
        rowMap.get(top).push(el);
      });
      const rows = [...rowMap.entries()].sort(([a], [b]) => a - b).map(([, els]) => els);
      const fromVars = {
        opacity: 0,
        scale: 0.9,
        y: 100,
        filter: "blur(10px)",
        transformOrigin: "center bottom"
      };
      const toVars = {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "expo.out",
        stagger: {
          amount: 0.3,
          from: "start"
        }
      };
      const eagerRows = rows.slice(0, 3).flat();
      if (eagerRows.length) {
        gsap.fromTo(eagerRows, fromVars, {
          ...toVars,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            once: true
          }
        });
      }
      rows.slice(3).forEach(rowEls => {
        gsap.set(rowEls, fromVars);
        gsap.fromTo(rowEls, fromVars, {
          ...toVars,
          scrollTrigger: {
            trigger: rowEls[0],
            start: "top 90%",
            once: true
          }
        });
      });
      ScrollTrigger.refresh();
    }, gridRef);
    return () => ctx.revert();
  }, [isMobile, displayed]);

  // Category transition re-anim
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (transitioning) return;
    const items = gsap.utils.toArray(".photo-item");
    if (!items.length) return;
    gsap.fromTo(items, {
      opacity: 0,
      scale: 0.9,
      y: 80,
      filter: "blur(8px)"
    }, {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.1,
      ease: "expo.out",
      stagger: {
        amount: 0.8,
        from: "start"
      }
    });
  }, [displayed, transitioning]);
  return <section id="projects" className="py-24 md:py-32 px-4 sm:px-6 border-t border-border">
      <div className="max-w-[1600px] mx-auto">
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-14 gap-6">
          <div>
            <span data-reveal className="font-mono text-xs uppercase text-primary">
              [ {String(PROJECTS.length).padStart(2, "0")} ] Series
            </span>
            <h2 data-reveal className="font-display uppercase leading-[0.85] tracking-tighter mt-3" style={{
            fontSize: "clamp(3rem, 16vw, 10rem)"
          }}>
              Photo<br />
              <span className="italic text-primary">Archive</span>
            </h2>
          </div>
          <p data-reveal className="max-w-sm font-mono text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground leading-loose">
            A living index of fifteen photographic series. Tap any tile to enter the full set — frames, locations and the in-between moments.
          </p>
        </div>

        {/* Category dropdown */}
        <div data-reveal className="mb-6 relative z-40">
          <div ref={dropdownRef} className="relative inline-block">
            <button onClick={() => setDropdownOpen(p => !p)} className="flex items-center gap-3 px-4 py-2 border border-border bg-card/60 backdrop-blur text-foreground/80 hover:text-foreground hover:border-primary transition-colors font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em]">
              {selected}
              <svg className={`w-3 h-3 transition-transform duration-300 opacity-60 ${dropdownOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className={`absolute top-full left-0 mt-2 w-48 border border-border bg-background/95 backdrop-blur-xl overflow-hidden shadow-2xl transition-all duration-300 origin-top-left ${dropdownOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}>
              {CATEGORIES.map(cat => <button key={cat} onClick={() => handleCategoryChange(cat)} className={`w-full px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.25em] transition-all duration-200 ${selected === cat ? "text-foreground bg-primary/15 border-l-2 border-primary" : "text-muted-foreground hover:text-foreground hover:bg-card border-l-2 border-transparent"}`}>
                  {cat}
                </button>)}
            </div>
          </div>
        </div>

        {/* Grid */}
        {isMobile ? <div ref={gridRef} className={`transition-grid ${transitioning ? "grid-exit" : "grid-enter"}`} style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "2px",
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)"
      }}>
            {filtered.map(p => <div key={p.id} onClick={() => setActive(p)} className="photo-item relative aspect-square overflow-hidden bg-secondary cursor-pointer group">
                <OptimizedImage src={p.cover} alt={p.title} priority={true} sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-active:scale-105" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-active:opacity-100 transition-opacity" />
                <p className="absolute bottom-1 left-1 right-1 text-center font-mono text-[0.55rem] uppercase tracking-widest text-white opacity-0 group-active:opacity-100 transition-opacity truncate">
                  {p.title}
                </p>
              </div>)}
          </div> : <div ref={gridRef} className={`parent transition-grid ${transitioning ? "grid-exit" : "grid-enter"} ${displayed !== "All" ? "filtered" : ""}`}>
            {filtered.map((p, idx) => <div key={p.id} onClick={() => setActive(p)} className={`photo-item div${idx + 1} relative cursor-pointer group overflow-hidden bg-secondary`}>
                <OptimizedImage src={p.cover} alt={p.title} priority={true} sizes="(max-width: 768px) 50vw, 25vw" className="object-cover bg-red-500 transition-transform duration-1000 ease-out group-hover:scale-110" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {p.displayId} / {String(p.images.length).padStart(2, "0")}
                </div>
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-end justify-between gap-2 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                  <div className="min-w-0">
                    <h3 className="font-display text-lg md:text-2xl uppercase tracking-tight text-white leading-none truncate">
                      {p.title}
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/70 mt-1 truncate">
                      {p.location} — {p.year}
                    </p>
                  </div>
                  <div className="size-9 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <span className="text-white font-mono text-xs">↗</span>
                  </div>
                </div>
              </div>)}
          </div>}
      </div>

      <ImageViewer open={!!active} project={active ? toViewerProject(active) : null} onClose={() => setActive(null)} />
    </section>;
}
