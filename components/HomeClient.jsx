"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/sections/Nav";
import { Intro } from "@/components/sections/Intro";
import { Hero } from "@/components/sections/Hero";
import { Reel } from "@/components/sections/Reel";
import { Videography } from "@/components/sections/Videography";
import { Photography } from "@/components/sections/Photography";
import { PhotoProjects } from "@/components/sections/PhotoProjects";
import { Logos } from "@/components/sections/Logos";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { ScrollTrigger } from "@/lib/gsap";

export default function HomeClient() {
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    resetScroll();

    const frame = window.requestAnimationFrame(resetScroll);
    window.addEventListener("pageshow", resetScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pageshow", resetScroll);
    };
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.scrollTo(0, 0);
    const id = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(id);
  }, [ready]);

  return (
    <>
      <SmoothScroll />
      <Cursor />
      <main className="bg-background text-foreground font-body overflow-x-clip">
        <Intro onDone={() => setReady(true)} />
        <Nav />
        <div className="relative z-10 bg-background">
          <Hero start={ready} />
          <Reel />
          <Videography />
          <Photography />
          <PhotoProjects />
          <Logos />
        </div>
        <div className="sticky bottom-0 z-0">
          <ContactFooter />
        </div>
      </main>
    </>
  );
}
