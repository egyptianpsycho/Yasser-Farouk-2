"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Intro({ onDone }) {
  const root = useRef(null);
  const counterRef = useRef(null);
  const barRef = useRef(null);
  const barsWrapper = useRef(null);
  const contentWrapper = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const obj = {
      v: 0,
    };

    const tl = gsap.timeline({
      onComplete: () => {
        onDone();
      },
    });

    // 1. Add will-change before the animation starts to optimize performance
    tl.set([contentWrapper.current, barRef.current], {
      willChange: "opacity, filter, transform",
    })
      .set(barsWrapper.current.children, {
        willChange: "height",
      })
      .to(obj, {
        v: 100,
        duration: 2.2,
        ease: "power2.inOut",
        onUpdate: () => setN(Math.round(obj.v)),
      })
      .to(
        barRef.current,
        {
          scaleX: 1,
          duration: 2.2,
          ease: "power2.inOut",
        },
        0
      )
      // 2. Fades out AND smoothly blurs the entire center text block
      .to(
        contentWrapper.current,
        {
          opacity: 0,
          filter: "blur(12px)", // Added blur effect
          color: "#8F6A6A", // Optional: Change color to a muted tone for a more dramatic effect
          duration: 1, // Slightly increased duration for a smoother blur transition
          ease: "power2.inOut",
        },
        "+=0.1"
      )
      // Staggered pixel curtain reveal
      .to(
        barsWrapper.current.children,
        {
          height: 0,
          duration: 1.1,
          stagger: 0.08,
          ease: "expo.inOut",
        },
        "<"
      )
      // 3. Cleanup: Remove will-change properties to free up browser memory
      .set([contentWrapper.current, barRef.current, barsWrapper.current.children], {
        willChange: "auto",
      })
      .set(root.current, {
        display: "none",
      });
  }, [onDone]);

  return (
    <div ref={root} className="fixed inset-0 z-[200] pointer-events-none">
      {/* Pixel Curtains Background */}
      <div ref={barsWrapper} className="absolute inset-0 flex w-full h-full overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className="flex-1 h-full bg-[#121212] scale-x-[1.05]" 
          />
        ))}
      </div>

      {/* Grouped content to ensure it stays above the bars and fades together */}
      <div
        ref={contentWrapper}
        className="absolute inset-0 flex flex-col items-center justify-center text-foreground z-10"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-6">
          Yasser Farouk
        </div>
        <span
          ref={counterRef}
          className="font-display text-[28vw] md:text-[18vw] leading-none tracking-tighter"
        >
          {String(n).padStart(3, "0")}
        </span>
        <div className="mt-6 w-[60vw] max-w-md h-px bg-foreground/15 overflow-hidden">
          <div
            ref={barRef}
            className="h-full bg-primary origin-left scale-x-0"
          />
        </div>
        <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          Loading Frames
        </div>
      </div>
    </div>
  );
}