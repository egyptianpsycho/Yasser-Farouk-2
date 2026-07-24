"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
const INTERACTIVE_SELECTOR = "a, button, [role='button'], label, input, textarea, select, [data-cursor='text'],.hero-text,.footertxt,.herooo-text";
const TEXT_TAGS = new Set(["H1", "H2", "H3", "H4", "H5", "H6", "P", "SPAN", "STRONG", "EM", "LI", "A", "BUTTON", "LABEL"]);

/** Returns true if (x,y) lies on a glyph rect inside element. */
function pointHitsText(el, x, y) {
  const range = document.createRange();
  for (const node of Array.from(el.childNodes)) {
    if (node.nodeType !== Node.TEXT_NODE) continue;
    const text = (node.nodeValue ?? "").trim();
    if (!text) continue;
    try {
      range.selectNodeContents(node);
      const rects = range.getClientRects();
      for (const r of Array.from(rects)) {
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
          range.detach?.();
          return true;
        }
      }
    } catch {
      // ignore
    }
  }
  return false;
}
export function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const xDot = gsap.quickTo(dot, "x", {
      duration: 0.12,
      ease: "power3.out"
    });
    const yDot = gsap.quickTo(dot, "y", {
      duration: 0.12,
      ease: "power3.out"
    });
    const xRing = gsap.quickTo(ring, "x", {
      duration: 0.4,
      ease: "power3.out"
    });
    const yRing = gsap.quickTo(ring, "y", {
      duration: 0.4,
      ease: "power3.out"
    });
    let isText = false;
    const evaluate = (x, y) => {
      const el = document.elementFromPoint(x, y);
      let hit = false;
      if (el) {
        // 1) interactive elements always activate
        if (el.closest(INTERACTIVE_SELECTOR)) {
          hit = true;
        } else {
          // 2) walk up text-like ancestors, check actual glyph rects
          let cur = el;
          while (cur && cur !== document.body) {
            if (TEXT_TAGS.has(cur.tagName)) {
              if (pointHitsText(cur, x, y)) {
                hit = true;
                break;
              }
            }
            cur = cur.parentElement;
          }
        }
      }
      if (hit !== isText) {
        isText = hit;
        ring.classList.toggle("cursor-ring--text", hit);
      }
    };
    const onMove = e => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
      evaluate(e.clientX, e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    document.documentElement.classList.add("has-custom-cursor");
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);
  return <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>;
}