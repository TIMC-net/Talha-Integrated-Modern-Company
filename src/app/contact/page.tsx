"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { FormEvent, useState } from "react";
import InternalPageHero from "@/components/InternalPageHero";
import Pressable from "@/components/motion/Pressable";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/data/services";
import { company } from "@/lib/company";

const EASE = [0.22, 1, 0.36, 1] as const;

// text-base (16px) on mobile avoids iOS Safari's automatic zoom-on-focus
// for inputs under 16px; shrinks back down at md: where zoom isn't triggered.
const fieldClass =
  "w-full border border-white/10 bg-navy-950 px-4 py-3.5 text-base text-white outline-none transition placeholder:text-white/35 focus:border-accent md:text-[14px]";

const contactLinks = [
  {
    icon: Phone,
    label: "Contact Phone",
    value: company.phone,
    href: `tel:${company.phone}`,
  },
  {
    icon: Mail,
    label: "Mail",
    value: company.email,
    href: `mailto:${company.email}`,
  },
  {
    icon: MapPin,
    label: "Our Location",
    value: company.address,
    href: company.mapsUrl,
    external: true,
  },
] as const;

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reduce = useReducedMotion();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const phoneDigits = String(data.get("phone") ?? "").replace(/\D/g, "");

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          phone: phoneDigits,
          service: String(data.get("service") ?? "").trim(),
          message: String(data.get("message") ?? "").trim(),
          company_website: String(data.get("company_website") ?? ""),
        }),
      });

      const payload = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!res.ok) {
        setError(
          payload?.error ??
            `Could not send your message. Please email ${company.email} directly.`,
        );
        return;
      }

      setSent(true);
    } catch {
      setError(
        `Could not send your message. Please email ${company.email} directly.`,
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <InternalPageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
        titleLead="Get"
        titleAccent="In"
        title="Touch"
        description="Share your project scope with the TIMC team in Jeddah — we prepare technical and commercial responses for civil, foundation, energy, and equipment rental requirements."
        backgroundImage="/images/contact-hero-hd.jpg"
        imageClassName="object-cover object-[center_40%]"
        connectBottom
      />

      <section data-dark-surface className="bg-navy-950 pt-6 pb-14 md:pt-8 md:pb-20">
        <div id="contact-form" className="container-site scroll-mt-28">
          <Reveal immediate>
            <div className="grid overflow-hidden border border-white/10 lg:grid-cols-[0.9fr_1.35fr]">
              <aside className="relative bg-navy-900 px-5 py-8 text-white sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
                <div className="absolute top-8 bottom-8 left-0 hidden items-center sm:flex">
                  <span className="h-full w-[3px] bg-accent" />
                  <span
                    className="ml-3 origin-center -rotate-180 font-display text-[11px] font-semibold tracking-[0.28em] text-white/45 uppercase"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    Quick Contact Information
                  </span>
                </div>

                <p className="mb-6 font-display text-[11px] font-semibold tracking-[2px] text-accent uppercase sm:hidden">
                  Quick Contact Information
                </p>

                {company.contactPending && (
                  <p className="mb-5 border border-accent/30 bg-accent/10 px-3 py-2 text-[12px] text-accent sm:ml-10 md:ml-12">
                    Phone, WhatsApp, and address shown below are placeholders until
                    TIMC confirms official contact details.
                  </p>
                )}

                <ul className="space-y-0 sm:ml-10 md:ml-12">
                  {contactLinks.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.li
                        key={item.label}
                        initial={reduce ? false : { opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: index * 0.08,
                          duration: 0.45,
                          ease: EASE,
                        }}
                        className="border-b border-white/10 py-5 first:pt-0 sm:py-6"
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center text-accent sm:h-10 sm:w-10">
                            <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                          </span>
                          <div className="min-w-0">
                            <p className="font-display text-[11px] font-semibold tracking-[2px] text-white/45 uppercase">
                              {item.label}
                            </p>
                            <a
                              href={item.href}
                              {...("external" in item && item.external
                                ? {
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                  }
                                : {})}
                              className="mt-1.5 block break-words font-display text-[15px] font-bold text-white transition hover:text-accent sm:text-[17px] md:text-[18px]"
                            >
                              {item.value}
                            </a>
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}

                  <motion.li
                    initial={reduce ? false : { opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.24, duration: 0.45, ease: EASE }}
                    className="py-5 last:pb-0 sm:py-6"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center text-accent sm:h-10 sm:w-10">
                        <Clock3 className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                      </span>
                      <div className="min-w-0">
                        <p className="font-display text-[11px] font-semibold tracking-[2px] text-white/45 uppercase">
                          Opening Hours
                        </p>
                        <p className="mt-1.5 break-words font-display text-[15px] font-bold text-white sm:text-[17px] md:text-[18px]">
                          Sun – Thu: 8:30 – 17:00
                        </p>
                      </div>
                    </div>
                  </motion.li>
                </ul>
              </aside>

              <div className="bg-navy-950 px-5 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
                <h2 className="font-display text-xl font-bold text-white sm:text-2xl md:text-[32px]">
                  Feel Free to Contact Us
                </h2>

                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="sent"
                      initial={reduce ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="mt-10 flex items-start gap-3 border border-accent/40 border-l-4 bg-accent/10 p-6 text-[14px] text-white/80"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span>
                        Thank you. Your message has been sent. Our team will
                        respond as soon as possible. For urgent enquiries, call{" "}
                        {company.phone} or write to {company.email}.
                      </span>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={onSubmit}
                      className="mt-8 space-y-5"
                    >
                      {/* Honeypot — leave empty */}
                      <input
                        type="text"
                        name="company_website"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden
                        className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
                      />

                      <div className="grid gap-5 sm:grid-cols-2">
                        <label className="block">
                          <span className="mb-2 block text-[13px] font-medium text-white/70">
                            Full Name<span className="text-accent">*</span>
                          </span>
                          <input
                            required
                            name="name"
                            placeholder="Your full name"
                            className={fieldClass}
                            disabled={submitting}
                          />
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-[13px] font-medium text-white/70">
                            Email Address<span className="text-accent">*</span>
                          </span>
                          <input
                            required
                            type="email"
                            name="email"
                            placeholder="info@example.com"
                            className={fieldClass}
                            disabled={submitting}
                          />
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-[13px] font-medium text-white/70">
                            Phone Number<span className="text-accent">*</span>
                          </span>
                          <input
                            required
                            type="tel"
                            name="phone"
                            inputMode="numeric"
                            autoComplete="tel"
                            pattern="[0-9]+"
                            title="Enter numbers only"
                            maxLength={15}
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) =>
                              setPhone(e.target.value.replace(/\D/g, ""))
                            }
                            className={fieldClass}
                            disabled={submitting}
                          />
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-[13px] font-medium text-white/70">
                            Type Of Service<span className="text-accent">*</span>
                          </span>
                          <div className="relative">
                            <select
                              required
                              name="service"
                              defaultValue=""
                              className={`${fieldClass} appearance-none pr-10`}
                              disabled={submitting}
                            >
                              <option value="" disabled className="bg-navy-950">
                                Select a service
                              </option>
                              {services.map((service) => (
                                <option
                                  key={service.id}
                                  value={service.slug}
                                  className="bg-navy-950"
                                >
                                  {service.name}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-white/45" />
                          </div>
                        </label>
                      </div>

                      <label className="block">
                        <span className="mb-2 block text-[13px] font-medium text-white/70">
                          Message<span className="text-accent">*</span>
                        </span>
                        <textarea
                          required
                          name="message"
                          rows={6}
                          placeholder="Type Here..."
                          className={`${fieldClass} resize-y`}
                          disabled={submitting}
                        />
                      </label>

                      {error ? (
                        <p
                          role="alert"
                          className="border border-red-400/40 border-l-4 border-l-red-400 bg-red-500/10 px-4 py-3 text-[13px] leading-relaxed text-white/85"
                        >
                          {error}
                        </p>
                      ) : null}

                      <Pressable>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="inline-flex items-center gap-2 bg-accent px-7 py-3.5 font-display text-[13px] font-bold tracking-wide text-navy-950 uppercase transition hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {submitting ? "Sending…" : "Send Message"}
                          {!submitting ? (
                            <ArrowRight className="h-4 w-4" />
                          ) : null}
                        </button>
                      </Pressable>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Full-bleed map — always visible */}
      <section className="relative">
        <div className="relative h-[380px] w-full md:h-[480px] lg:h-[520px]">
          <iframe
            title="TIMC Location Map"
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${company.mapsLat},${company.mapsLng}&z=17&ie=UTF8&iwloc=&output=embed`}
          />
        </div>
      </section>
    </>
  );
}
