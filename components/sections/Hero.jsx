"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import * as THREE from "three";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { HERO_BG } from "@/lib/constants";

// ─── Shader Sources ───────────────────────────────────────────────────────────

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uProgress;
  uniform vec3  uColor;
  uniform float uEdgeSoftness;
  varying vec2  vUv;

  float hash(vec2 p) {
    p  = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2  i = floor(p);
    vec2  f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2  u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    float n         = noise(vUv * 5.0) * 0.6 + noise(vUv * 10.0) * 0.4;
    float threshold = (uProgress * 1.7) - uEdgeSoftness;
    float mask      = 1.0 - smoothstep(
      threshold - uEdgeSoftness,
      threshold + uEdgeSoftness,
      n + vUv.y
    );
    gl_FragColor = vec4(uColor, mask);
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────

export function Hero({ start = false }) {
  const rootRef = useRef(null);
  const bgRef = useRef(null);
  const canvasRef = useRef(null);
  const timeoutRef = useRef(undefined);

  useEffect(() => {
    if (!start || !rootRef.current || !canvasRef.current) return;

    // ── Three.js setup ───────────────────────────────────────────────────────
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
    });
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const targetColor = new THREE.Color("#0a0a0a");
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uProgress: { value: 0 },
        uColor: {
          value: new THREE.Vector3(targetColor.r, targetColor.g, targetColor.b),
        },
        uEdgeSoftness: { value: 0.25 },
      },
    });

    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

    const resizeRenderer = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    resizeRenderer();
    window.addEventListener("resize", resizeRenderer);

    const renderScene = () => {
      if (canvas.style.display !== "none") {
        renderer.render(scene, camera);
      }
    };
    renderScene();

    // ── Granular will-change management ─────────────────────────────────────
    const willChangeEls = new Set();

    const addWillChange = (el, props) => {
      if (!el) return;
      el.style.willChange = props;
      willChangeEls.add(el);
    };

    const removeWillChange = (el) => {
      if (!el) return;
      el.style.willChange = "auto";
      willChangeEls.delete(el);
    };

    const removeAllWillChange = () => {
      willChangeEls.forEach((el) => {
        el.style.willChange = "auto";
      });
      willChangeEls.clear();
    };

    // Promote elements for intro animation
    const heroText = rootRef.current.querySelector("#hero-text");
    const animHeroEls = rootRef.current.querySelectorAll("[data-anim-hero]");

    addWillChange(bgRef.current, "transform");
    addWillChange(canvas, "transform, opacity");
    addWillChange(heroText, "opacity, filter");
    animHeroEls.forEach((el) => addWillChange(el, "opacity, filter"));

    // ── GSAP context ─────────────────────────────────────────────────────────
    const ctx = gsap.context(() => {
      const lines = rootRef.current.querySelectorAll("[data-anim-hero]");
      const path = document.querySelector("#pathToAnimate1");

      // ── Intro timeline ───────────────────────────────────────────────────
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => {
          // Immediately release text compositor layers once intro completes
          removeWillChange(heroText);
          animHeroEls.forEach((el) => removeWillChange(el));
        },
      });

      tl.fromTo(
        "#hero-text",
        { opacity: 0, filter: "blur(20px)" },
        { opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power2.out", }
      )
        .fromTo(
          lines,
          { filter: "blur(10px)" },
          { opacity: 1, filter: "blur(0px)", duration: 1.2, stagger: 0.1 },
          "-=0.9"
        )
        .add(() => ScrollTrigger.refresh(), ">-0.2");

      // ── SVG signature draw ───────────────────────────────────────────────
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          visibility: "visible",
        });
        tl.to(
          path,
          { strokeDashoffset: 0, duration: 3, ease: "power2.out" },
          "-=1"
        );
      }

      // ── Scroll: pin + WebGL dissolve ─────────────────────────────────────
      gsap.to(material.uniforms.uProgress, {
        value: 1.5,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: renderScene,
          onLeave: () => {
            // Stop shader & drop GPU layer once hero pin finishes
            canvas.style.display = "none";
            removeAllWillChange();
          },
          onEnterBack: () => {
            // Restore shader rendering & re-promote GPU layers when scrolling back up
            canvas.style.display = "block";
            addWillChange(canvas, "transform, opacity");
            addWillChange(bgRef.current, "transform");
            renderScene();
          },
          onLeaveBack: () => {
            canvas.style.display = "block";
            removeAllWillChange();
          },
          onEnter: () => {
            canvas.style.display = "block";
            addWillChange(canvas, "transform, opacity");
            addWillChange(bgRef.current, "transform");
            renderScene();
          },
        },
      });

      // ── Scroll: overlay blur scrub ───────────────────────────────────────
      gsap.fromTo(
        ".overlay-blur-pin",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "95% bottom",
            end: "75% top",
            scrub: 1,
          },
        }
      );
    }, rootRef);

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      ctx.revert();
      removeAllWillChange();
      window.removeEventListener("resize", resizeRenderer);
      renderer.dispose();
      material.dispose();
    };
  }, [start]);

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-background hero-pin"
    >
      {/* ── Background image ──────────────────────────────────────────────── */}
      <div ref={bgRef} className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src={HERO_BG}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_60%]"
        />

        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />

        {/* Film-grain noise */}
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.6'/></svg>\")",
          }}
        />

        {/* Blur overlay — GSAP scrubs opacity + backdropFilter during pin window */}
        <div className="overlay-blur-pin backdrop-blur-md opacity-0 absolute inset-0 " />
      </div>

      {/* ── WebGL dissolve canvas ─────────────────────────────────────────── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none w-full h-full"
      />

      {/* ── SVG signature ─────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 -rotate-8 top-12 left-30 z-50 mix-blend-difference max-sm:inset-0 max-sm:left-10 max-sm:top-40 pointer-events-none z"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 1718 491"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          className="w-[84%] max-sm:w-[120%]"
        >
          <path
            id="pathToAnimate1"
            d="M-16.9136 489.299C-13.7043 477.36 -5.83596 467.019 1.39852 457.243C43.77 399.988 94.4031 349.142 146.141 300.466C235.078 216.791 328.218 136.876 425.213 62.6901C443.224 48.9141 468.997 30.0855 488.657 16.8407C493.638 13.4846 498.753 10.3267 503.898 7.22779C507.233 5.21897 513.309 -0.736034 514.741 2.88927C516.507 7.35998 511.638 12.0137 509.522 16.3273C498.984 37.8054 487.145 58.6916 474.575 79.0365C428.926 152.924 376.324 222.171 327.881 294.184C309.913 320.894 295.181 343.004 280.193 371.115C268.836 392.416 255.88 418.287 255.26 443.278C254.361 479.541 297.141 475.496 321.305 470.62C424.963 449.704 521.157 368.403 574.905 278.924C577.444 274.696 583.23 269.082 580.273 265.133C579.473 264.066 577.58 264.865 576.276 265.137C570.489 266.348 561.015 270.737 556.471 272.915C519.43 290.672 485.849 316.475 456.281 344.81C431.115 368.927 401.233 398.897 388.327 432.204C380.282 452.967 401.408 445.75 412.715 440.541C476.204 411.297 533.66 365.59 585.971 319.989C636.077 276.311 682.012 228.251 727.382 179.752C729.311 177.691 744.755 161.399 732.435 173.379C711.446 193.79 692.342 215.975 675.16 239.694C671.687 244.488 633.087 294.467 640.447 301.926C647.309 308.88 660.097 301.809 669.653 299.823C723.543 288.625 776.837 273.126 829.419 257.044C920.337 229.236 1009.59 196.465 1098.89 163.929C1099.35 163.76 1149.24 141.726 1150.06 150.066C1152.29 172.865 1150.33 197.066 1147.44 219.707C1145.34 236.216 1144.54 259.675 1167.46 258.417C1202.3 256.504 1238.33 234.155 1268.45 219.047C1339.63 183.338 1410.5 147.803 1485.42 120.354C1530.51 103.833 1581.51 84.119 1630.3 82.2506C1643.38 81.7496 1649.9 87.5531 1660.57 93.6864C1677.66 103.514 1696.98 102.138 1715.93 100.667"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ visibility: "hidden" }}
          />
        </svg>
      </div>

      {/* ── Hero typography ───────────────────────────────────────────────── */}
      <div className="relative z-20 w-full px-4 sm:px-6 md:px-10 flex flex-col items-center mix-blend-difference pointer-events-none">
        <h1
          id="hero-text"
          data-headline
          className="pointer-events-auto opacity-0 font-display leading-[0.85] tracking-tighter uppercase text-center select-none w-full"
          style={{ fontSize: "clamp(3.5rem, 20vw, 19rem)" }}
        >
          <span className="block lg:mt-34 herooo-text">Yasser Farouk</span>
        </h1>

        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-12 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-center">
          <span className="opacity-0" data-anim-hero>
            Film &amp; Visuals
          </span>

          <span
            data-anim-hero
            className="text-muted-foreground inline-flex items-center gap-2 opacity-0"
          >
            Based in
            <span
              className="relative inline-block h-[1.2em] w-[7.5em] overflow-hidden align-middle text-left"
              aria-live="polite"
            >
              <span className="loc-item absolute inset-0 flex items-center justify-start text-primary tracking-[0.25em]">
                Egypt
              </span>
            </span>
          </span>
        </div>
      </div>

      {/* ── Est. badge ────────────────────────────────────────────────────── */}
      <div
        data-anim-hero
        className="opacity-0 absolute bottom-6 right-4 sm:bottom-10 sm:right-6 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-primary z-20"
      >
        Est. 2018
      </div>
    </section>
  );
}