"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
export function ScrollTextReveal({
  lines,
  label,
  className = ""
}) {
  const root = useRef(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const lineEls = el.querySelectorAll(".str-line");
    if (!lineEls.length) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      gsap.set(lineEls, {
        opacity: reduced ? 1 : 0.12
      });
      if (reduced) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          end: "top 25%",
          scrub: 0.6
        }
      });
      lineEls.forEach((line, i) => {
        tl.to(line, {
          opacity: 1,
          duration: 0.5,
          ease: "none"
        }, i * 0.15);
      });
    }, el);
    return () => ctx.revert();
  }, []);
  return <div ref={root} className={`relative ${className}`}>
      {label && <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-8 md:mb-12 md:absolute md:left-0 md:top-2">
          {label}
        </div>}
      <div className="md:pl-32 lg:pl-40">
        {lines.map((line, i) => <span key={i} className="str-line block will-change-[opacity]" style={{
        fontFamily: "var(--font-playfair), 'Playfair Display', serif"
      }}>
            {line}
          </span>)}
      </div>
    </div>;
}