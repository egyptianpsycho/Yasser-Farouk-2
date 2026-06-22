"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export function useGsapReveal(opts = {}) {
  const ref = useRef(null);
  const {
    y = 60,
    stagger = 0.08,
    delay = 0,
    childrenSelector
  } = opts;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = childrenSelector ? el.querySelectorAll(childrenSelector) : el.children;
    const ctx = gsap.context(() => {
      gsap.fromTo(targets, {
        y,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "expo.out",
        stagger,
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 85%"
        }
      });
    }, el);
    return () => ctx.revert();
  }, [y, stagger, delay, childrenSelector]);
  return ref;
}