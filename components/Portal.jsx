"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
export function Portal({
  label,
  code = "000",
  onDone,
  duration = 1.8
}) {
  const root = useRef(null);
  const top = useRef(null);
  const bot = useRef(null);
  const labelRef = useRef(null);
  const codeRef = useRef(null);
  const barRef = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const obj = {
      v: 0
    };
    const tl = gsap.timeline({
      onComplete: onDone
    });
    // panels close in
    gsap.set(top.current, {
      yPercent: -100
    });
    gsap.set(bot.current, {
      yPercent: 100
    });
    tl.to([top.current, bot.current], {
      yPercent: 0,
      duration: 0.7,
      ease: "expo.inOut"
    }).from(labelRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.5,
      ease: "expo.out"
    }, "-=0.2").to(obj, {
      v: 100,
      duration,
      ease: "power2.inOut",
      onUpdate: () => setN(Math.round(obj.v))
    }, "<").to(barRef.current, {
      scaleX: 1,
      duration,
      ease: "power2.inOut"
    }, "<").to(codeRef.current, {
      opacity: 0,
      duration: 0.3
    }, "+=0.05").to(top.current, {
      yPercent: -100,
      duration: 0.9,
      ease: "expo.inOut"
    }, "+=0.05").to(bot.current, {
      yPercent: 100,
      duration: 0.9,
      ease: "expo.inOut"
    }, "<").set(root.current, {
      display: "none"
    });
    return () => {
      tl.kill();
    };
  }, [onDone, duration]);
  return createPortal(<div ref={root} className="fixed inset-0 z-[300] pointer-events-none">
      <div ref={top} className="absolute top-0 left-0 w-full h-1/2 bg-background" />
      <div ref={bot} className="absolute bottom-0 left-0 w-full h-1/2 bg-background" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-foreground">
        <div ref={labelRef} className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-6">
          {label}
        </div>
        <span ref={codeRef} className="font-display text-[18vw] md:text-[12vw] leading-none tracking-tighter">
          {String(n).padStart(3, "0")}
        </span>
        <div className="mt-6 w-[50vw] max-w-md h-px bg-foreground/15 overflow-hidden">
          <div ref={barRef} className="h-full bg-primary origin-left scale-x-0" />
        </div>
        <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          {code}
        </div>
      </div>
    </div>, document.body);
}