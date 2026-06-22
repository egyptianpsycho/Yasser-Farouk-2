"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
export function useScrubReveal(opts = {}) {
  const ref = useRef(null);
  const {
    y = 40,
    stagger = 0.08,
    childrenSelector,
    start = "top 85%"
  } = opts;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = childrenSelector ? Array.from(el.querySelectorAll(childrenSelector)) : [el];
    if (!targets.length) return;
    const ctx = gsap.context(() => {
      gsap.set(targets, {
        opacity: 0,
        y,
        willChange: "transform, opacity"
      });
      if (reduced) {
        gsap.set(targets, {
          opacity: 1,
          y: 0
        });
        return;
      }
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "expo.out",
        stagger,
        scrollTrigger: {
          trigger: el,
          start,
          once: true
        }
      });
    }, el);
    return () => ctx.revert();
  }, [y, stagger, childrenSelector, start]);
  return ref;
}
export function refreshScrollTriggers() {
  if (typeof window !== "undefined") ScrollTrigger.refresh();
}