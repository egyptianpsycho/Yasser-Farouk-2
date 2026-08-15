"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, ScrollTrigger);

export function Reel() {
  const root = useRef(null);

  useEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      const secondSplit = new SplitText(".about-text", {
        type: "words",
      });

      // Promote parent wrappers directly to GPU layer
      gsap.set(".about-text, .about-title", {
        willChange: "transform, filter",
      });

      // Title Scrub Animation
      gsap.fromTo(
        ".about-title",
        { color: "#8F6A6A", filter: "blur(4px)", x: 10, y: 10 },
        {
          y: 0,
          x: 0,
          color: "#edf1e8",
          filter: "blur(0px)",
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            end: "bottom 90%",
            scrub: 1,
          },
        }
      );

      // Paragraph Scrub Animation
      gsap.fromTo(
        secondSplit.words,
        { color: "#8F6A6A", filter: "blur(4px)", x: 10, y: 10 },
        {
          y: 0,
          x: 0,
          color: "#edf1e8",
          filter: "blur(0px)",
          stagger: 0.05,
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            end: "bottom 50%",
            scrub: 1,
            onEnter: () =>
              gsap.set(".about-text, .about-title", {
                willChange: "transform, filter",
              }),
            onEnterBack: () =>
              gsap.set(".about-text, .about-title", {
                willChange: "transform, filter",
              }),
            onLeave: () =>
              gsap.set(".about-text, .about-title", { willChange: "auto" }),
            onLeaveBack: () =>
              gsap.set(".about-text, .about-title", { willChange: "auto" }),
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="py-32 max-sm:py-24 px-6 md:h-[120vh] h-screen bg-background relative"
      id="about"
    >
      <div ref={root} className="max-w-7xl mx-auto ">
        <div className="flex justify-between items-end mb-12 max-sm:mb-8">
          <h2 className="font-display text-5xl md:text-7xl uppercase about-title tracking-tighter">
            About ME
          </h2>
        </div>

        <div className="-mt-2 md:mt-24  ">
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight text-foreground about-text lg:w-8xl mx-auto ">
            I turn ideas into visual stories. Working across commercial
            photography and filmmaking, I create visuals that are built to
            capture attention, and leave an impression.
            From concept to final frame, I focus on composition, movement,
            light, and detail bringing a cinematic edge to every project.
          </p>
        </div>
      </div>
    </section>
  );
}
