/* eslint-disable prettier/prettier */
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsMobile } from "@/hooks/use-mobile";

// ─── Replace with your Formspree form ID ───────────────────────────────────────
// Sign up at https://formspree.io, create a form, copy the ID from the endpoint:
// e.g. https://formspree.io/f/abcd1234 → FORMSPREE_ID = "abcd1234"
const FORMSPREE_ID = "YOUR_FORM_ID";
// ────────────────────────────────────────────────────────────────────────────────

const STEPS = [
  { key: "name",    label: "Name",    type: "text",     placeholder: "Your name",       hint: "01 / Who's reaching out" },
  { key: "email",   label: "Email",   type: "email",    placeholder: "you@studio.com",  hint: "02 / Where to reply"     },
  { key: "project", label: "Project", type: "textarea", placeholder: "Tell me about it…", hint: "03 / The brief"        },
];

function useClock(tz) {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const tick = () => {
      try {
        setT(
          new Intl.DateTimeFormat("en-GB", {
            hour:     "2-digit",
            minute:   "2-digit",
            second:   "2-digit",
            timeZone: tz,
            hour12:   false,
          }).format(new Date())
        );
      } catch {
        setT("--:--:--");
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tz]);
  return t;
}

export function ContactFooter() {
  const isMobile = useIsMobile();

  // Desktop: form panel slides in on hover/click; mobile: always visible
  const [openState, setOpen] = useState(false);
  const open = isMobile ? true : openState;

  const [step,       setStep]       = useState(0);
  const [values,     setValues]     = useState({ name: "", email: "", project: "" });
  const [sent,       setSent]       = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError,  setFormError]  = useState(null);

  const sectionRef  = useRef(null);
  const ctaRef      = useRef(null);
  const formRef     = useRef(null);
  const stepRef     = useRef(null);
  const inputRef    = useRef(null);
  const textareaRef = useRef(null);

  const cairo    = useClock("Africa/Cairo");
  const portsaid = useClock("Africa/Cairo");

  // ── Scroll-reveal ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const blocks = sectionRef.current.querySelectorAll("[data-reveal]");
      gsap.set(blocks, { opacity: 0, y: 50, filter: "blur(14px)" });
      gsap.to(blocks, {
        opacity: 1, y: 0, filter: "blur(0px)", ease: "none", stagger: 0.06,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%", end: "top 40%", scrub: 0.6,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // ── CTA shrink + form slide-in — desktop only ─────────────────────────────
  useEffect(() => {
    const cta  = ctaRef.current;
    const form = formRef.current;
    if (!cta || !form) return;

    if (isMobile) {
      // Clear any inline styles set by a previous desktop animation
      gsap.set(cta,  { clearProps: "all" });
      gsap.set(form, { clearProps: "all" });
      return;
    }

    if (openState) {
      gsap.to(cta,  { scale: 0.55, x: "-8%", duration: 1, ease: "expo.out" });
      gsap.fromTo(
        form,
        { opacity: 0, x: 80, filter: "blur(12px)" },
        { opacity: 1, x: 0,  filter: "blur(0px)", duration: 1, ease: "expo.out", delay: 0.1 }
      );
    } else {
      gsap.to(cta,  { scale: 1, x: 0, duration: 1, ease: "expo.out" });
      gsap.to(form, { opacity: 0, x: 80, filter: "blur(12px)", duration: 0.5, ease: "power2.in" });
    }
  }, [openState, isMobile]);

  // ── Step-change animation ─────────────────────────────────────────────────
  useEffect(() => {
    if (!open || !stepRef.current) return;
    const els = stepRef.current.querySelectorAll("[data-step-el]");
    gsap.fromTo(
      els,
      { y: 30, opacity: 0, filter: "blur(8px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7, ease: "expo.out", stagger: 0.07 }
    );
  }, [step, open, sent]);

  // ── Auto-focus — desktop only (never steal focus on mobile) ──────────────
  useEffect(() => {
    if (!open || sent || isMobile) return;
    const id = window.requestAnimationFrame(() => {
      if (STEPS[step].type === "textarea") textareaRef.current?.focus();
      else inputRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(id);
  }, [open, step, sent, isMobile]);

  const current = STEPS[step];
  const canNext = (values[current?.key] ?? "").trim().length > 0;
  const isLast  = step === STEPS.length - 1;

  // ── Formspree submit ──────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!canNext) return;

    if (!isLast) {
      setStep((s) => s + 1);
      return;
    }

    setSubmitting(true);
    setFormError(null);

    try {
      const res = await fetch(`https://formspree.io/f/meebqrrp`, {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body:    JSON.stringify({
          name:    values.name,
          email:   values.email,
          project: values.project,
        }),
      });

      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setFormError(
          data?.errors?.[0]?.message ??
          "Something went wrong — please try again."
        );
      }
    } catch {
      setFormError("Network error — check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSent(false);
    setStep(0);
    setValues({ name: "", email: "", project: "" });
    setFormError(null);
    if (!isMobile) setOpen(false);
  };

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative bg-white text-neutral-900 overflow-hidden border-t border-neutral-200"
    >
      <div className="relative max-w-7xl mx-auto px-6 pt-16 md:pt-40 pb-0">

        {/* ── Hero row ────────────────────────────────────────────────────── */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center md:min-h-[50vh]">

          {/* CTA headline */}
          <button
            ref={ctaRef}
            onMouseEnter={() => !isMobile && !openState && setOpen(true)}
            onFocus={()      => !isMobile && !openState && setOpen(true)}
            onClick={()      => !isMobile && !openState && setOpen(true)}
            data-reveal
            aria-label="Open contact form"
            className="font-display leading-[0.85] uppercase tracking-tighter text-left origin-left hover:text-primary transition-colors"
            style={{ fontSize: isMobile ? "clamp(3.5rem, 18vw, 5.5rem)" : "clamp(3rem, 10vw, 11rem)" }}
          >
            Let&apos;s<br />Work
          </button>

          {/* Form panel */}
          <div
            ref={formRef}
            className={isMobile ? "w-full" : "opacity-0 pointer-events-none"}
            style={isMobile ? undefined : { pointerEvents: open ? "auto" : "none" }}
          >
            <div className="w-full md:max-w-md md:ml-auto border border-neutral-200 bg-neutral-50 p-6 md:p-8">

              {/* Step progress bar */}
              <div className="flex items-center gap-2 mb-8">
                {STEPS.map((s, i) => (
                  <button
                    key={s.key}
                    onClick={() => !sent && setStep(i)}
                    className="group flex items-center gap-2"
                    aria-label={`Go to step ${i + 1}: ${s.label}`}
                  >
                    <span className={`h-px transition-all duration-500 ${
                      i === step ? "w-10 bg-primary" : i < step ? "w-6 bg-neutral-900/80" : "w-6 bg-neutral-900/30"
                    }`} />
                    <span className={`font-mono text-[10px] uppercase tracking-widest ${
                      i === step ? "text-neutral-900" : "text-neutral-500"
                    }`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </button>
                ))}
                <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                  {sent ? "Sent ✓" : `${step + 1} / ${STEPS.length}`}
                </span>
              </div>

              {/* Step content */}
              <div ref={stepRef} className="min-h-[220px]">
                {sent ? (
                  /* ── Success state ─────────────────────────────────────── */
                  <div className="space-y-6">
                    <div data-step-el className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                      Transmission Received
                    </div>
                    <h3 data-step-el className="font-display text-5xl md:text-6xl uppercase leading-none">
                      Talk<br /><span className="italic text-primary">soon.</span>
                    </h3>
                    <p data-step-el className="text-neutral-500 text-sm leading-relaxed">
                      Thanks {values.name?.split(" ")[0] || "friend"} — I&apos;ll be back within 48h via{" "}
                      {values.email || "your inbox"}.
                    </p>
                    <button
                      data-step-el
                      onClick={handleReset}
                      className="font-mono text-[10px] uppercase tracking-widest underline underline-offset-4 hover:no-underline"
                    >
                      ← Send another
                    </button>
                  </div>
                ) : (
                  /* ── Multi-step form ──────────────────────────────────── */
                  <div className="space-y-5">
                    <div data-step-el className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                      {current.hint}
                    </div>

                    {current.type === "textarea" ? (
                      <textarea
                        data-step-el
                        ref={textareaRef}
                        name={current.key}
                        rows={3}
                        value={values[current.key]}
                        onChange={(e) => setValues((v) => ({ ...v, [current.key]: e.target.value }))}
                        placeholder={current.placeholder}
                        className="w-full bg-transparent border-b border-neutral-300 pb-2 font-body text-base placeholder:text-neutral-400 focus:outline-none focus:border-primary resize-none"
                        onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit(); }}
                      />
                    ) : (
                      <input
                        data-step-el
                        ref={inputRef}
                        type={current.type}
                        name={current.key}
                        autoComplete={current.key === "email" ? "email" : current.key === "name" ? "name" : "off"}
                        value={values[current.key]}
                        onChange={(e) => setValues((v) => ({ ...v, [current.key]: e.target.value }))}
                        placeholder={current.placeholder}
                        className="w-full bg-transparent border-b border-neutral-300 pb-2 font-display text-3xl uppercase placeholder:text-neutral-400 focus:outline-none focus:border-primary"
                        onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
                      />
                    )}

                    {/* Inline error */}
                    {formError && (
                      <p data-step-el className="font-mono text-[10px] uppercase tracking-widest text-red-500 pt-1">
                        ⚠ {formError}
                      </p>
                    )}

                    <div data-step-el className="flex items-center justify-between pt-6">
                      <button
                        type="button"
                        onClick={() => { setFormError(null); setStep((s) => Math.max(0, s - 1)); }}
                        disabled={step === 0}
                        className="font-mono text-[10px] uppercase tracking-widest opacity-60 hover:opacity-100 disabled:opacity-20 transition-opacity"
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!canNext || submitting}
                        className="group flex items-center gap-3 bg-neutral-900 text-white px-6 py-3 font-mono text-[10px] uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-40"
                      >
                        {submitting ? (
                          <>Sending<span className="animate-pulse">…</span></>
                        ) : (
                          <>
                            {isLast ? "Send" : "Next"}
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Three-column info grid ───────────────────────────────────────── */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 border-t border-neutral-200 pt-12">

          <div data-reveal>
            <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-3">Contact</div>
            <a
              href="mailto:Yassereladrosy@gmail.com"
              className="font-display text-xl md:text-2xl uppercase block hover:text-primary transition-colors break-all"
            >
              Yassereladrosy@gmail.com
            </a>
            <a
              href="tel:+201111422032"
              className="font-mono text-xs text-neutral-500 mt-2 block hover:text-neutral-900 transition-colors"
            >
              +20 11 11422032
            </a>
          </div>

          <div data-reveal>
            <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-3">Channels</div>
            <ul className="space-y-2">
              {[
                { l: "Instagram", h: "https://www.instagram.com/yasserfarouk_ph?igsh=cGExZXd6enVsN2J2&utm_source=qr" },
                { l: "Facebook",  h: "https://www.facebook.com/share/18wRVwqHsv/?mibextid=wwXIfr" },
                { l: "LinkedIn",  h: "https://www.linkedin.com/in/yasser-farouk?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
              ].map((s) => (
                <li key={s.l}>
                  <a
                    href={s.h}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 font-display text-2xl uppercase hover:text-primary transition-colors"
                  >
                    {s.l}
                    <span className="transition-transform group-hover:translate-x-1">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal>
            <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-3">Studio</div>
            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span>Cairo</span>
                <span className="text-primary tabular-nums">{cairo}</span>
              </div>
              <div className="flex justify-between">
                <span>Portsaid</span>
                <span className="text-primary tabular-nums">{portsaid}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Copyright bar ────────────────────────────────────────────────── */}
        <div className="mt-12 pt-6 pb-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
          <span>&copy; 2026 Yasser Film Studio</span>
          <span>Built in motion · No frames wasted</span>
        </div>

      </div>
    </footer>
  );
}