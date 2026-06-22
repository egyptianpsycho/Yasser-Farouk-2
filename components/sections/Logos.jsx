"use client";

/* eslint-disable prettier/prettier */
import { useInView } from "@/hooks/use-in-view";
const BRANDS = ["black fox", "Shellos", "Eye Town", "88 cubs", "Honda", "El Mansory", "Mimet", "Black fox"];
export function Logos() {
  const {
    ref,
    inView
  } = useInView();
  return <section id="brands" className="py-32 px-6 border-t border-border overflow-hidden">
      <div ref={ref} className={`max-w-7xl mx-auto flex flex-col items-center reveal ${inView ? "in-view" : ""}`}>
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-4 text-muted-foreground">
          Collaborators
        </div>
        <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-16 text-center">
          Trusted <span className="italic text-primary">by</span>
        </h2>

        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
          {BRANDS.map(b => <div key={b} className="bg-background p-12 flex items-center justify-center grayscale hover:grayscale-0 hover:bg-secondary/40 transition-all group">
              <div className="font-display text-2xl opacity-50 group-hover:opacity-100 group-hover:text-primary transition-all tracking-tight">
                {b}
              </div>
            </div>)}
        </div>

        {/* Scrolling marquee */}
        <div className="hidden md:block w-full mt-16 overflow-hidden">
          <div className="flex gap-16 animate-marquee whitespace-nowrap font-display text-6xl uppercase text-muted-foreground/40">
            {[...BRANDS, ...BRANDS].map((b, i) => <span key={i} className="shrink-0">
                {b} <span className="text-primary">★</span>
              </span>)}
          </div>
        </div>
      </div>
    </section>;
}