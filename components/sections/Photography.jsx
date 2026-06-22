"use client";

/* eslint-disable prettier/prettier */
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { BTS_PHOTOS } from "@/lib/constants";
import OptimizedImage from "@/components/OptimizedImage";
export function Photography() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const titleRef = useRef(null);
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const getDistance = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1
        }
      });
    });
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, {
        opacity: 0,
        y: 40
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          once: true
        }
      });
    }, section);
    return () => {
      mm.revert();
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);
  return <section id="stills" ref={sectionRef} className="relative bg-secondary/30 border-t border-border overflow-hidden md:h-screen">
      <div ref={titleRef} className="relative md:absolute md:top-8 md:left-10 z-20 px-6 pt-16 md:pt-0 md:p-0 pointer-events-none">
        <span className="font-mono text-xs uppercase text-primary">Field Notes</span>
        <h3 className="font-display text-4xl md:text-7xl uppercase tracking-tighter leading-[0.85] mt-2">
          Behind<br /><span className="italic text-primary">The Lens</span>
        </h3>
        <p className="mt-4 max-w-xs text-muted-foreground text-xs leading-relaxed font-mono">
          [ {BTS_PHOTOS.length.toString().padStart(2, "0")} ] frames
        </p>
      </div>

      {/* Mobile: normal vertical stack */}
      <div className="md:hidden px-6 pt-8 pb-16 grid grid-cols-1 gap-4">
        {BTS_PHOTOS.map((img, i) => <figure key={img.id} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
              <OptimizedImage src={img.src} alt={img.caption} sizes="100vw" className="object-cover" />

              <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest text-white/80 bg-black/40 backdrop-blur px-2 py-1">
                BTS // {String(i + 1).padStart(3, "0")}
              </div>
            </div>
            <figcaption className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-widest">
              <span>{img.caption}</span>
              <span className="text-muted-foreground">{img.location}</span>
            </figcaption>
          </figure>)}
      </div>

      {/* Desktop: horizontal pinned scrub */}
      <div className="hidden md:flex md:h-screen md:items-center md:overflow-visible">
        <div ref={trackRef} className="flex gap-10 pl-[40vw] pr-[20vw] will-change-transform">
          {BTS_PHOTOS.map((img, i) => <figure key={img.id} data-bts className="group relative shrink-0 w-[32vw]">
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                <OptimizedImage src={img.src} alt={img.caption} sizes="32vw" className="object-cover group-hover:scale-105 transition-transform duration-1000" />

                <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest text-white/80 bg-black/40 backdrop-blur px-2 py-1">
                  BTS // {String(i + 1).padStart(3, "0")}
                </div>
              </div>
              <figcaption className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-widest">
                <span>{img.caption}</span>
                <span className="text-muted-foreground">{img.location}</span>
              </figcaption>
            </figure>)}
        </div>
      </div>
    </section>;
}
