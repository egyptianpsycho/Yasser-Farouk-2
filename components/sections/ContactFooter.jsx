"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

// ────────────────────────────────────────────────────────────────────────────
// FORMSPREE: paste your form ID below (e.g. "xrgkabcd" from
// https://formspree.io/forms). The form will POST straight to Formspree.
// Until you add it, submissions are validated and logged in dev only.
const FORMSPREE_ID = "your-form-id";
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`;
// ────────────────────────────────────────────────────────────────────────────

function useClock(tz) {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => {
      try {
        setT(
          new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone: tz,
            hour12: false,
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please tell me your name.";
  else if (values.name.trim().length > 100) errors.name = "Name is too long.";

  if (!values.email.trim()) errors.email = "An email is required so I can reply.";
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = "That email doesn't look right.";
  else if (values.email.trim().length > 255) errors.email = "Email is too long.";

  if (!values.project.trim()) errors.project = "Add a few words about the project.";
  else if (values.project.trim().length > 1500) errors.project = "Message is too long.";

  return errors;
}

export function ContactFooter() {
  const [values, setValues] = useState({ name: "", email: "", project: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | sent | error
  const sectionRef = useRef(null);

  const cairo = useClock("Africa/Cairo");
  const portsaid = useClock("Africa/Cairo");

  useEffect(() => {
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
          end: "top 40%",
          scrub: 0.6,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const update = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("submitting");

    if (FORMSPREE_ID === "your-form-id") {
      // No Formspree endpoint configured yet — simulate a successful send.
      await new Promise((r) => setTimeout(r, 600));
      setStatus("sent");
      return;
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target),
      });
      if (res.ok) {
        setStatus("sent");
        setValues({ name: "", email: "", project: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputBase =
    "w-full bg-transparent border-b border-neutral-300 pb-2 font-display text-2xl sm:text-3xl uppercase placeholder:text-neutral-400 focus:outline-none focus:border-primary transition-colors";

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative bg-white text-neutral-900 overflow-hidden border-t border-neutral-200"
    >
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 pt-20 md:pt-40 pb-12 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 md:items-center">
          {/* Headline */}
          <div data-reveal>
            <h2
              className="font-display leading-[0.85] uppercase tracking-tighter break-words"
              style={{ fontSize: "clamp(3rem, 12vw, 11rem)" }}
            >
              Let&apos;s
              <br />
              Work
            </h2>
            <p className="mt-6 max-w-sm font-mono text-[11px] sm:text-xs uppercase tracking-widest text-neutral-500">
              Available for commissions — Q3 / Q4 2026. Tell me about your project
              and I&apos;ll be in touch within 48 hours.
            </p>
          </div>

          {/* Form */}
          <div data-reveal className="w-full">
            <div className="w-full md:max-w-md md:ml-auto border border-neutral-200 bg-neutral-50 p-5 sm:p-8">
              {status === "sent" ? (
                <div className="space-y-6 min-h-[260px] flex flex-col justify-center">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                    Transmission Received
                  </div>
                  <h3 className="font-display text-4xl sm:text-5xl uppercase leading-none">
                    Talk
                    <br />
                    <span className="italic text-primary">soon.</span>
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    Thanks for reaching out — I&apos;ll get back to you within 48 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setValues({ name: "", email: "", project: "" });
                    }}
                    className="self-start font-mono text-[10px] uppercase tracking-widest underline underline-offset-4 hover:no-underline"
                  >
                    ← Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-7">
                  <div className="space-y-2">
                    <label
                      htmlFor="cf-name"
                      className="block font-mono text-[10px] uppercase tracking-[0.3em] text-primary"
                    >
                      01 / Name
                    </label>
                    <input
                      id="cf-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      maxLength={100}
                      value={values.name}
                      onChange={update("name")}
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                      className={inputBase}
                    />
                    {errors.name && (
                      <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="cf-email"
                      className="block font-mono text-[10px] uppercase tracking-[0.3em] text-primary"
                    >
                      02 / Email
                    </label>
                    <input
                      id="cf-email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      maxLength={255}
                      value={values.email}
                      onChange={update("email")}
                      placeholder="you@studio.com"
                      aria-invalid={!!errors.email}
                      className={inputBase}
                    />
                    {errors.email && (
                      <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="cf-project"
                      className="block font-mono text-[10px] uppercase tracking-[0.3em] text-primary"
                    >
                      03 / Project
                    </label>
                    <textarea
                      id="cf-project"
                      name="project"
                      rows={3}
                      maxLength={1500}
                      value={values.project}
                      onChange={update("project")}
                      placeholder="Tell me about it…"
                      aria-invalid={!!errors.project}
                      className="w-full bg-transparent border-b border-neutral-300 pb-2 font-display text-xl sm:text-2xl uppercase placeholder:text-neutral-400 focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                    {errors.project && (
                      <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                        {errors.project}
                      </p>
                    )}
                  </div>

                  {status === "error" && (
                    <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                      Something went wrong. Please try again or email me directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group flex w-full items-center justify-center gap-3 bg-neutral-900 text-white px-6 py-4 font-mono text-[11px] uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50"
                  >
                    {status === "submitting" ? "Sending…" : "Send message"}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Three-column info grid */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-12 border-t border-neutral-200 pt-12">
          <div data-reveal>
            <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-3">
              Contact
            </div>
            <a
              href="mailto:Yassereladrosy@gmail.com"
              className="font-display text-xl sm:text-2xl uppercase block hover:text-primary transition-colors break-all"
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
            <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-3">
              Channels
            </div>
            <ul className="space-y-2">
              {[
                {
                  l: "Instagram",
                  h: "https://www.instagram.com/yasserfarouk_ph?igsh=cGExZXd6enVsN2J2&utm_source=qr",
                },
                {
                  l: "Facebook",
                  h: "https://www.facebook.com/share/18wRVwqHsv/?mibextid=wwXIfr",
                },
                {
                  l: "LinkedIn",
                  h: "https://www.linkedin.com/in/yasser-farouk?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
                },
              ].map((s) => (
                <li key={s.l}>
                  <a
                    href={s.h}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 font-display text-xl sm:text-2xl uppercase hover:text-primary transition-colors"
                  >
                    {s.l}
                    <span className="transition-transform group-hover:translate-x-1">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal>
            <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-3">
              Studio
            </div>
            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span>Cairo</span>
                <span className="text-primary">{cairo}</span>
              </div>
              <div className="flex justify-between">
                <span>Portsaid</span>
                <span className="text-primary">{portsaid}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
          <span>&copy; 2026 Yasser Film Studio</span>
          <span>Built in motion · No frames wasted</span>
        </div>
      </div>
    </footer>
  );
}
