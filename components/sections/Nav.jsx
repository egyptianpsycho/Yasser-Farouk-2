"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Videography Projects", href: "#motion" },
  { label: "Behind The Scene", href: "#stills" },
  { label: "Photography Projects", href: "#projects" },
  { label: "Partners & Clients", href: "#brands" },
  { label: "Contact", href:null },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const logoRef = useRef(null);
  const menuBtnRef = useRef(null);
  const overlayRef = useRef(null);
  const stairsRef = useRef([]);
  const contentRef = useRef(null);

  // ─── Logo & Menu Scroll Animation ────────────────────────────────────────────
  useEffect(() => {
    let animated = false;

    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      if (window.scrollY > 150 && !animated) {
        animated = true;

        const targets = [logoRef.current, menuBtnRef.current];

        gsap.set(targets, { willChange: "opacity, filter" });

        gsap.fromTo(
          targets,
          { opacity: 0, filter: "blur(12px)" },
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "willChange",
          }
        );
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ─── GSAP Sliding Stairs Menu Animation ──────────────────────────────────────
  useEffect(() => {
    const stairs = stairsRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !stairs.length || !content) return;

    if (isActive) {
      gsap.set(overlay, { display: "flex", pointerEvents: "auto" });

      const tl = gsap.timeline();

      tl.set(stairs, { scaleY: 0, transformOrigin: "top" })
        .set(content, { opacity: 0, y: 20, filter: "blur(8px)" })
        .to(stairs, {
          scaleY: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: [0.76, 0, 0.24, 1],
        })
        .to(
          content,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.3"
        );
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { display: "none", pointerEvents: "none" });
        },
      });

      tl.set(stairs, { transformOrigin: "top" })
        .to(content, {
          opacity: 0,
          y: -10,
          filter: "blur(8px)",
          duration: 0.2,
          ease: "power2.in",
        })
        .to(
          stairs,
          {
            scaleY: 0,
            duration: 0.6,
            stagger: {
              each: 0.05,
              from: "end",
            },
            ease: [0.76, 0, 0.24, 1],
          },
          "-=0.1"
        );
    }
  }, [isActive]);

  return (
    <>
      {/* ── Header Navbar ─────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-5 sm:py-8 flex justify-between items-start mix-blend-difference text-white">
        <a
          ref={logoRef}
          href="#top"
          onClick={() => setIsActive(false)}
          className="font-display text-xl sm:text-2xl tracking-tighter uppercase opacity-0"
        >
          Yasser.
        </a>

        <button
          ref={menuBtnRef}
          onClick={() => setIsActive(!isActive)}
          className="font-mono text-xs sm:text-sm uppercase tracking-widest hover:opacity-60 transition-opacity mt-1 cursor-pointer opacity-0"
          aria-label="Toggle Menu"
        >
          {isActive ? "Close" : "Menu"}
        </button>
      </nav>

      {/* ── Sliding Stairs Overlay Container ──────────────────────────────── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 hidden pointer-events-none flex"
      >
        {/* 5 Vertical Stair Columns */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (stairsRef.current[i] = el)}
            className="relative h-full flex-1 bg-neutral-900"
          />
        ))}

        {/* Menu Links Content */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-50 pointer-events-auto flex flex-col justify-center px-6 sm:px-12 md:px-24 opacity-0"
        >
          <div className="flex flex-col gap-4 sm:gap-6">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-neutral-500 mb-2 sm:mb-4">
              Navigation
            </span>

            {NAV_ITEMS.map((item, index) => (
              <a
              key={item.label}
              href={item.href ?? "#"}
              onClick={() => {
                setIsActive(false);
                if (!item.href) {
                  setTimeout(() => {
                    window.scrollTo({top: document.documentElement.scrollHeight, 
                      behavior: "smooth" });
                  }, 600); // small delay so the menu closes first
                }
              }}
              className="font-display text-3xl sm:text-5xl uppercase text-white hover:text-neutral-400 transition-colors w-fit flex items-center"              >
                <span className="font-mono text-xs sm:text-sm text-neutral-500 mr-4 sm:mr-8 self-center">
      0{index + 1}
    </span>
    {item.label}
  </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}