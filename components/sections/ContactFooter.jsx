/* eslint-disable prettier/prettier */

"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsMobile } from "@/hooks/use-mobile";

// ─── Replace with your Formspree form ID ───────────────────────────────────────
const FORMSPREE_ID = "meebqrrp";
// ────────────────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    key: "name",
    label: "Name",
    type: "text",
    placeholder: "Your name",
    hint: "01 / Who's reaching out",
  },
  {
    key: "email",
    label: "Email",
    type: "email",
    placeholder: "you@studio.com",
    hint: "02 / Where to reply",
  },
  {
    key: "project",
    label: "Project",
    type: "textarea",
    placeholder: "Tell me about it…",
    hint: "03 / The brief",
  },
];

// ── Inline SVG social icons ───────────────────────────────────────────────────

function InstagramIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/yasserfarouk_ph?igsh=cGExZXd6enVsN2J2&utm_source=qr",
    Icon: InstagramIcon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/18wRVwqHsv/?mibextid=wwXIfr",
    Icon: FacebookIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yasser-farouk?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    Icon: LinkedInIcon,
  },
];

export function ContactFooter() {
  const isMobile = useIsMobile();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({ name: "", email: "", project: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const sectionRef = useRef(null);
  const stepRef = useRef(null);
  const inputRef = useRef(null);
  const textareaRef = useRef(null);

  // ── Scroll-reveal ────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const blocks = sectionRef.current.querySelectorAll("[data-reveal]");

      gsap.set(blocks, { opacity: 0, y: 50, filter: "blur(14px)" });

      gsap.to(blocks, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        ease: "none",
        stagger: 0.06,

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "top 55%", // Changed from 40% so it guarantees completion before the page bottoms out
          scrub: 0.6,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Step-change animation ─────────────────────────────────────────────────

  useEffect(() => {
    if (!stepRef.current) return;

    const els = stepRef.current.querySelectorAll("[data-step-el]");

    gsap.fromTo(
      els,
      { y: 30, opacity: 0, filter: "blur(8px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.7,
        ease: "expo.out",
        stagger: 0.07,
      }
    );
  }, [step, sent]);

  // ── Auto-focus — desktop only ─────────────────────────────────────────────

  useEffect(() => {
    if (sent || isMobile) return;

    const id = window.requestAnimationFrame(() => {
      if (STEPS[step].type === "textarea") textareaRef.current?.focus();
      else inputRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(id);
  }, [step, sent, isMobile]);

  const current = STEPS[step];
  const canNext = (values[current?.key] ?? "").trim().length > 0;
  const isLast = step === STEPS.length - 1;

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
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
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
  };

  return (
    <footer
      id="contact"
      ref={sectionRef}
      // Added flex-col and min-h-[100dvh] so the footer always fills the screen on scroll
      className="relative bg-white text-neutral-900 overflow-hidden border-t border-neutral-200 min-h-[100dvh] flex flex-col justify-center"
    >
      {/* Changed pt-16 to pt-28 on mobile to prevent overlapping fixed headers */}
      <div className="relative w-full max-w-7xl mx-auto px-6 pt-28 md:pt-40 pb-6 flex-1 flex flex-col justify-between">
        {/* ── Hero row ────────────────────────────────────────────────────── */}

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center md:min-h-[50vh] max-sm:mt-12">
          {/* CTA headline — static, no hover interaction */}
          <h2
            data-reveal
            className="font-display footertxt leading-[0.85] uppercase tracking-tighter text-left select-none self-start md:self-center"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
          >
            Let&apos;s
            <br />
            Work
          </h2>

          {/* Form panel — always visible */}
          <div className="w-full">
            <div className="w-full md:max-w-md md:ml-auto border border-neutral-200 bg-neutral-50 p-4 md:p-8">
              {/* Step progress bar */}
              <div className="flex items-center gap-2 mb-8">
                {STEPS.map((s, i) => (
                  <button
                    key={s.key}
                    onClick={() => !sent && setStep(i)}
                    className="group flex items-center gap-2"
                    aria-label={`Go to step ${i + 1}: ${s.label}`}
                  >
                    <span
                      className={`h-px transition-all duration-500 ${
                        i === step
                          ? "w-10 bg-primary"
                          : i < step
                          ? "w-6 bg-neutral-900/80"
                          : "w-6 bg-neutral-900/30"
                      }`}
                    />

                    <span
                      className={`font-mono text-[10px] uppercase tracking-widest ${
                        i === step ? "text-neutral-900" : "text-neutral-500"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </button>
                ))}

                <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                  {sent ? "Sent ✓" : `${step + 1} / ${STEPS.length}`}
                </span>
              </div>

              {/* Step content */}
              <div ref={stepRef} className="min-h-[150px] sm:min-h-[220px]:">
                {sent ? (
                  /* ── Success state ─────────────────────────────────────── */
                  <div className="space-y-6">
                    <div
                      data-step-el
                      className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary"
                    >
                      Transmission Received
                    </div>

                    <h3
                      data-step-el
                      className="font-display text-5xl md:text-6xl uppercase leading-none"
                    >
                      Talk
                      <br />
                      <span className="italic text-primary">soon.</span>
                    </h3>

                    <p
                      data-step-el
                      className="text-neutral-500 text-sm leading-relaxed"
                    >
                      Thanks {values.name?.split(" ")[0] || "friend"} —
                      I&apos;ll be back within 48h via{" "}
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
                    <div
                      data-step-el
                      className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary"
                    >
                      {current.hint}
                    </div>

                    {current.type === "textarea" ? (
                      <textarea
                        data-step-el
                        ref={textareaRef}
                        name={current.key}
                        rows={3}
                        value={values[current.key]}
                        onChange={(e) =>
                          setValues((v) => ({
                            ...v,
                            [current.key]: e.target.value,
                          }))
                        }
                        placeholder={current.placeholder}
                        className="w-full bg-transparent border-b border-neutral-300 pb-2 font-body text-base placeholder:text-neutral-400 focus:outline-none focus:border-primary resize-none"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && (e.metaKey || e.ctrlKey))
                            handleSubmit();
                        }}
                      />
                    ) : (
                      <input
                        data-step-el
                        ref={inputRef}
                        type={current.type}
                        name={current.key}
                        autoComplete={
                          current.key === "email"
                            ? "email"
                            : current.key === "name"
                            ? "name"
                            : "off"
                        }
                        value={values[current.key]}
                        onChange={(e) =>
                          setValues((v) => ({
                            ...v,
                            [current.key]: e.target.value,
                          }))
                        }
                        placeholder={current.placeholder}
                        className="w-full bg-transparent border-b border-neutral-300 pb-2 font-display text-2xl md:text-3xl uppercase placeholder:text-neutral-400 focus:outline-none focus:border-primary"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSubmit();
                        }}
                      />
                    )}

                    {formError && (
                      <p
                        data-step-el
                        className="font-mono text-[10px] uppercase tracking-widest text-red-500 pt-1"
                      >
                        ⚠ {formError}
                      </p>
                    )}

                    <div
                      data-step-el
                      className="flex items-center justify-between pt-6"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setFormError(null);
                          setStep((s) => Math.max(0, s - 1));
                        }}
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
                          <>
                            Sending<span className="animate-pulse">…</span>
                          </>
                        ) : (
                          <>
                            {isLast ? "Send" : "Next"}
                            <span className="transition-transform group-hover:translate-x-1">
                              →
                            </span>
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

        {/* ── Two-column info grid ─────────────────────────────────────────── */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-12 border-t border-neutral-200 pt-12">
          {/* Contact */}
          <div data-reveal>
            <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-3">
              Contact
            </div>

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

          {/* Social icons — horizontal row, right-aligned */}
          <div data-reveal className="flex flex-col items-start md:items-end">
            <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-3">
              Socials
            </div>

            <div className="flex items-center gap-5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="text-neutral-900 hover:text-primary transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Copyright bar ────────────────────────────────────────────────── */}
        <div className="mt-12 pt-6 pb-2 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
          <span>&copy; 2026 Yasser Film Studio</span>
          <span>Built in motion · No frames wasted</span>
        </div>
      </div>
    </footer>
  );
}
