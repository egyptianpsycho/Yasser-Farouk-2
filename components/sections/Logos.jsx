"use client";

/* eslint-disable prettier/prettier */
import { useInView } from "@/hooks/use-in-view";

// 1. Change to an array of objects to control individual sizes
const LOGOS = [
  {
    src: "/assets/logos/2.png",
  },
  {
    src: "/assets/logos/3.png",
    sizeClass: "max-w-[250px] max-h-[300px]",
  },
  { src: "/assets/logos/6.png", sizeClass: "max-w-[400px] max-h-[250px] max-sm: max-w- " },
  {
    src: "/assets/logos/4.png",
    sizeClass: "max-w-[140px] max-h-[100px]",
  },
  { src: "/assets/logos/5.png", sizeClass: "max-w-[220px] max-h-[150px]" },
  { src: "/assets/logos/logo.png", sizeClass: "max-w-[300px] max-h-[190px]" },
  { src: "/assets/logos/n/1.png", sizeClass: "max-w-[240px] max-h-[250px]" },
  { src: "/assets/logos/n/2.png", sizeClass: "max-w-[350px] max-h-[220px]" },
  { src: "/assets/logos/n/3.png", sizeClass: "max-w-[250px] max-h-[200px]" },
  { src: "/assets/logos/n/4.png", sizeClass: "max-w-[200px] max-h-[200px]" },
  { src: "/assets/logos/n/8.png", sizeClass: "max-w-[280px] max-h-[240px]" },
  { src: "/assets/logos/n/6.png", sizeClass: "max-w-[250px] max-h-[200px]" },
];

export function Logos() {
  const { ref, inView } = useInView();
  return (
    <section id="brands" className="py-32 px-6 overflow-hidden  ">
      <div
        ref={ref}
        className={` mx-auto flex flex-col items-center reveal ${
          inView ? "in-view" : ""
        }`}
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-4 text-muted-foreground">
          Collaborators
        </div>
        <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-16 text-center">
          Trusted <span className="italic text-primary">by</span>
        </h2>

        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
          {LOGOS.map((logo, index) => (
            <div
              key={index}
              className="bg-background p-8 flex items-center justify-center hover:bg-secondary/40 transition-all group min-h-[200px]"
            >
              <img
                src={logo.src} // Updated to use logo.src
                alt={`Logo ${index + 1}`}
                loading="lazy"
                /* 2. Apply the custom size, or fall back to a default size if none is provided */
                className={`w-full object-contain group-hover:opacity-100 transition-all ${
                  logo.sizeClass || "max-w-[180px] max-h-[100px]"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Scrolling marquee */}
        <div className="hidden md:block w-full mt-16 overflow-hidden">
          <div className="flex gap-16 animate-marquee whitespace-nowrap font-display text-6xl uppercase text-muted-foreground/40 items-center">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <img
                loading="lazy"
                key={i}
                src={logo.src} // Updated to use logo.src
                alt={`Logo ${i + 1}`}
                /* Kept the marquee sizes uniform so it scrolls smoothly, 
                   but you can add logo.sizeClass here too if you want them varied */
                className={`w-full object-contain group-hover:opacity-100 transition-all ${
                  logo.sizeClass || "max-w-[180px] max-h-[100px]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
