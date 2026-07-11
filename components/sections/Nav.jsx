"use client";
import { useEffect, useState } from "react";
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <nav className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-5 sm:py-8 flex justify-between items-start mix-blend-difference" style={{
    opacity: scrolled ? 0.95 : 1
  }}>
      {/* <a href="#top" className="font-display text-xl sm:text-2xl tracking-tighter uppercase">
        Yasser.
      </a> */}
      {/* <div className="flex flex-col items-end gap-1 font-mono text-[10px] tracking-widest uppercase">
        <a href="#motion" className="hover:text-primary transition-colors">Motion</a>
        <a href="#stills" className="hover:text-primary transition-colors">Stills</a>
        <a href="#brands" className="hover:text-primary transition-colors">Brands</a>
        <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
      </div> */}
    </nav>;
}