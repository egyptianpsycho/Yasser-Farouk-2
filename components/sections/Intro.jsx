"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
export function Intro({
  onDone
}) {
  const root = useRef(null);
  const counterRef = useRef(null);
  const barRef = useRef(null);
  const topPanel = useRef(null);
  const botPanel = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const obj = {
      v: 0
    };
    const tl = gsap.timeline({
      onComplete: () => {
        onDone();
      }
    });
    tl.to(obj, {
      v: 100,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => setN(Math.round(obj.v))
    }).to(barRef.current, {
      scaleX: 1,
      duration: 2.2,
      ease: "power2.inOut"
    }, 0).to(counterRef.current, {
      opacity: 0,
      duration: 0.4
    }, "+=0.1").to(topPanel.current, {
      yPercent: -100,
      duration: 1.1,
      ease: "expo.inOut"
    }, "<").to(botPanel.current, {
      yPercent: 100,
      duration: 1.1,
      ease: "expo.inOut"
    }, "<").set(root.current, {
      display: "none"
    });
  }, [onDone]);
  return <div ref={root} className="fixed inset-0 z-[200] pointer-events-none">
      <div ref={topPanel} className="absolute top-0 left-0 w-full h-1/2 bg-background" />
      <div ref={botPanel} className="absolute bottom-0 left-0 w-full h-1/2 bg-background" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-foreground">
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-6">
          Yasser — Director's Reel
        </div>
        <span ref={counterRef} className="font-display text-[28vw] md:text-[18vw] leading-none tracking-tighter">
          {String(n).padStart(3, "0")}
        </span>
        <div className="mt-6 w-[60vw] max-w-md h-px bg-foreground/15 overflow-hidden">
          <div ref={barRef} className="h-full bg-primary origin-left scale-x-0" />
        </div>
        <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          Loading Frames
        </div>
      </div>
    </div>;
}