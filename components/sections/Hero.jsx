"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { HERO_BG } from "@/lib/constants";
const LOCATIONS = ["PORTSAID", "CAIRO"];
export function Hero({ start = false }) {
  const root = useRef(null);
  const bgRef = useRef(null);
  const locRef = useRef(null);
  const timeoutIdRef = useRef(undefined);
  useEffect(() => {
    if (!start || !root.current) return;
    const ctx = gsap.context(() => {
      const lines = root.current.querySelectorAll("[data-anim-hero]");
      const bg = bgRef.current;
      gsap.set(lines, {
        opacity: 0,
        y: 60,
      });
      gsap.set(bg, {
        opacity: 0,
        scale: 1.15,
      });
      const tl = gsap.timeline({
        defaults: {
          ease: "expo.out",
        },
      });
      tl.to(
        bg,
        {
          opacity: 1,
          scale: 1,
          duration: 1.8,
        },
        0
      )
        .to(
          lines,
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.1,
          },
          0.15
        )
        .add(() => ScrollTrigger.refresh(), ">-0.2");

      // Parallax bg only — no blur, no opacity fade on headline
      gsap.to(bg, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Rotating location cycle (respects reduced motion)
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const items = locRef.current?.querySelectorAll(".loc-item");
      if (items && items.length) {
        gsap.set(items, {
          yPercent: 100,
          opacity: 0,
          filter: "blur(8px)",
        });
        if (reduce) {
          gsap.set(items[0], {
            yPercent: 0,
            opacity: 1,
            filter: "blur(0px)",
          });
        } else {
          let i = 0;
          gsap.to(items[0], {
            yPercent: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power2.out",
            delay: 1.4,
            onComplete: () => {
              timeoutIdRef.current = window.setTimeout(swap, 1600);
            },
          });
          const swap = () => {
            const cur = items[i];
            const nx = items[(i + 1) % items.length];
            const t = gsap.timeline();
            t.to(cur, {
              yPercent: -100,
              opacity: 0,
              filter: "blur(8px)",
              duration: 0.5,
              ease: "power2.in",
            }).fromTo(
              nx,
              {
                yPercent: 100,
                opacity: 0,
                filter: "blur(8px)",
              },
              {
                yPercent: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 0.55,
                ease: "power2.out",
              },
              "-=0.3"
            );
            i = (i + 1) % items.length;
            timeoutIdRef.current = window.setTimeout(swap, 2200);
          };
        }
      }
    }, root);
    return () => {
      if (timeoutIdRef.current) window.clearTimeout(timeoutIdRef.current);
      ctx.revert();
    };
  }, [start]);
  return (
    <section
      ref={root}
      id="top"
      className="relative h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      <div
        ref={bgRef}
        data-anim-hero-bg
        className="absolute inset-0 z-0 will-change-transform bg-cover "
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundPosition: "center 55%",
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.6'/></svg>\")",
          }}
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 flex flex-col items-center">
        <h1
          data-headline
          className="font-display leading-[0.85] tracking-tighter uppercase text-center select-none w-full"
          style={{
            fontSize: "clamp(3.5rem, 20vw, 16rem)",
          }}
        >
          <span data-anim-hero className="block">
            Director
          </span>
          <span data-anim-hero className="block text-primary italic">
            Yasser
          </span>
        </h1>
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-12 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-center">
          <span data-anim-hero>Film &amp; Visuals</span>
          <span
            data-anim-hero
            className="text-muted-foreground inline-flex items-center gap-2"
          >
            Based in
            <span
              ref={locRef}
              className="relative inline-block h-[1.2em] w-[7.5em] overflow-hidden align-middle text-left"
              aria-live="polite"
            >
              {LOCATIONS.map((loc) => (
                <span
                  key={loc}
                  className="loc-item absolute inset-0 flex items-center justify-start text-primary tracking-[0.25em] will-change-transform"
                >
                  {loc}
                </span>
              ))}
            </span>
          </span>
        </div>
      </div>

      <div
        data-anim-hero
        className="absolute bottom-6 right-4 sm:bottom-10 sm:right-6 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-primary"
      >
        Est. 2018
      </div>
    </section>
  );
}
