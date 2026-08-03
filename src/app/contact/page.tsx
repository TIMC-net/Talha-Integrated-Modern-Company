"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
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


const infoItems = [
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
  },
  {
    icon: Clock3,
    label: "Opening Hours",
    value: "Sun – Thu: 8:30 – 17:00",
  },
] as const;

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [newsletterSent, setNewsletterSent] = useState(false);
  const reduce = useReducedMotion();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent(
      `TIMC Project Enquiry — ${String(data.get("service") || "General")}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${data.get("name")}`,
        `Email: ${data.get("email")}`,
        `Phone: ${data.get("phone")}`,
        `Service: ${data.get("service")}`,
        "",
        String(data.get("message") || ""),
      ].join("\n"),
    );
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  function onNewsletterSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent("TIMC Newsletter Subscription");
    const body = encodeURIComponent(
      `Please subscribe this email to the TIMC newsletter:\n${data.get("newsletter-email")}`,
    );
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
    setNewsletterSent(true);
  }

  return (
    <>
      <InternalPageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
        titleLead="Get"
        titleAccent="In"
        title="Touch"
        description="Share your project scope with the TIMC team in Jeddah — we prepare technical and commercial responses for civil, foundation, energy, and equipment rental requirements."
        backgroundImage="/images/header-scaffolding.jpg"
      />

      <section data-dark-surface className="bg-navy-950 py-14 md:py-20">
        <div id="contact-form" className="container-site scroll-mt-28">
          <Reveal immediate>
            <div className="grid overflow-hidden border border-white/10 lg:grid-cols-[0.9fr_1.35fr]">
              {/* Left — Quick contact */}
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
                  {infoItems.map((item, index) => {
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
                        className="border-b border-white/10 py-5 first:pt-0 last:border-b-0 last:pb-0 sm:py-6"
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center text-accent sm:h-10 sm:w-10">
                            <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                          </span>
                          <div className="min-w-0">
                            <p className="font-display text-[11px] font-semibold tracking-[2px] text-white/45 uppercase">
                              {item.label}
                            </p>
                            {"href" in item && item.href ? (
                              <a
                                href={item.href}
                                {...(item.href.startsWith("http")
                                  ? {
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                    }
                                  : {})}
                                className="mt-1.5 block break-words font-display text-[15px] font-bold text-white transition hover:text-accent sm:text-[17px] md:text-[18px]"
                              >
                                {item.value}
                              </a>
                            ) : (
                              <p className="mt-1.5 break-words font-display text-[15px] font-bold text-white sm:text-[17px] md:text-[18px]">
                                {item.value}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              </aside>

              {/* Right — Form */}
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
                      Thank you. Your email client should open with your message.
                      If it did not, please write directly to {company.email}.
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={onSubmit}
                      className="mt-8 space-y-5"
                    >
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
                          />
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-[13px] font-medium text-white/70">
                            Phone Number<span className="text-accent">*</span>
                          </span>
                          <input
                            required
                            name="phone"
                            placeholder="Phone Number"
                            className={fieldClass}
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
                        />
                      </label>

                      <Pressable>
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 bg-accent px-7 py-3.5 font-display text-[13px] font-bold tracking-wide text-navy-950 uppercase transition hover:bg-accent-light"
                        >
                          Send Message <ArrowRight className="h-4 w-4" />
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

      {/* Full-bleed map + newsletter bar */}
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

        <div className="relative z-10 bg-accent">
          <div className="container-site flex flex-col items-start justify-between gap-6 py-7 md:flex-row md:items-center md:py-8">
            <div>
              <h3 className="font-display text-xl font-bold text-white md:text-2xl">
                Sign Up For Our Newsletter
              </h3>
              <p className="mt-1 max-w-md text-[13px] text-white/85 md:text-[14px]">
                Get project updates and contractor insights from TIMC delivered
                to your inbox.
              </p>
            </div>

            {newsletterSent ? (
              <p className="font-display text-[14px] font-semibold text-white">
                Thanks — you&rsquo;re subscribed.
              </p>
            ) : (
              <form
                onSubmit={onNewsletterSubmit}
                className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-stretch"
              >
                <input
                  required
                  type="email"
                  name="newsletter-email"
                  placeholder="Enter Your Email"
                  className="h-12 flex-1 border-0 bg-white/15 px-4 text-base text-white outline-none placeholder:text-white/70 ring-1 ring-white/25 transition focus:bg-white/20 focus:ring-white md:text-[14px]"
                />
                <Pressable>
                  <button
                    type="submit"
                    className="hover-to-ink inline-flex h-12 w-full items-center justify-center gap-2 bg-white px-6 font-display text-[13px] font-bold tracking-wide text-navy-950 uppercase transition hover:bg-navy-950 hover:text-white sm:w-auto"
                  >
                    Submit <ArrowUpRight className="h-4 w-4" />
                  </button>
                </Pressable>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
