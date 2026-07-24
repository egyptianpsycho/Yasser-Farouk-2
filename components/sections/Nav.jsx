"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const logoRef = useRef(null);

  useEffect(() => {
    let animated = false;

    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      if (window.scrollY > 150 && !animated) {
        animated = true;

        gsap.set(logoRef.current, {
          willChange: "opacity, filter",
        });

        gsap.fromTo(
          logoRef.current,
          {
            opacity: 0,
            filter: "blur(12px)",
          },
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.7,
            ease: "power3.out",
            clearProps: "willChange",
          }
        );
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-5 sm:py-8 flex justify-between items-start mix-blend-difference"
    >
      <a
        ref={logoRef}
        href="#top"
        className="font-display text-xl sm:text-2xl tracking-tighter uppercase opacity-0"
      >
        Yasser.
      </a>
    </nav>
  );
}