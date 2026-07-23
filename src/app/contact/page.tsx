"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Mail, MapPin, Phone, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import PageBanner from "@/components/PageBanner";
import Pressable from "@/components/motion/Pressable";
import { Reveal } from "@/components/motion/Reveal";
import { company } from "@/lib/company";

const EASE = [0.22, 1, 0.36, 1] as const;

const fieldClass =
  "w-full border border-border-soft bg-white px-4 py-3.5 text-[14px] text-ink outline-none transition focus:border-accent";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <PageBanner
        title="Contact Us"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />
      <section className="bg-white py-16 md:py-20">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <span className="section-eyebrow mb-4">Get In Touch</span>
              <h2 className="section-heading mb-8 text-2xl md:text-[28px]">
                We&rsquo;d Love To Hear From You
              </h2>

              <ul className="mb-8 space-y-4">
                <li className="flex items-start gap-3 text-[14px] text-slate">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  {company.location}
                </li>
                <li className="flex items-start gap-3 text-[14px] text-slate">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="space-x-3">
                    <a href={`tel:${company.phone}`} className="hover:text-accent-dark">
                      {company.phone}
                    </a>
                    <a href={`tel:${company.mobile}`} className="hover:text-accent-dark">
                      {company.mobile}
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3 text-[14px] text-slate">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <a href={`mailto:${company.email}`} className="hover:text-accent-dark">
                    {company.email}
                  </a>
                </li>
              </ul>

              <div className="h-64 w-full border border-border-soft">
                <iframe
                  title="Map"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=Jubail%20Saudi%20Arabia&t=&z=11&ie=UTF8&iwloc=&output=embed"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <span className="section-eyebrow mb-4">Send A Message</span>
              <h2 className="section-heading mb-8 text-2xl md:text-[28px]">
                Request A Quote
              </h2>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="surface-card flex items-start gap-3 border-t-4 border-t-accent bg-white p-6 text-[14px] text-slate"
                  >
                    <motion.span
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    </motion.span>
                    Thank you. Your message has been received. Our team will contact you
                    shortly.
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={onSubmit}
                    className="space-y-4"
                  >
                    <motion.input
                      required
                      name="name"
                      placeholder="Your Name"
                      className={fieldClass}
                      whileFocus={{ scale: 1.015 }}
                      transition={{ duration: 0.2, ease: EASE }}
                    />
                    <motion.input
                      required
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      className={fieldClass}
                      whileFocus={{ scale: 1.015 }}
                      transition={{ duration: 0.2, ease: EASE }}
                    />
                    <motion.input
                      name="phone"
                      placeholder="Phone"
                      className={fieldClass}
                      whileFocus={{ scale: 1.015 }}
                      transition={{ duration: 0.2, ease: EASE }}
                    />
                    <motion.input
                      name="subject"
                      placeholder="Subject"
                      className={fieldClass}
                      whileFocus={{ scale: 1.015 }}
                      transition={{ duration: 0.2, ease: EASE }}
                    />
                    <motion.textarea
                      required
                      name="message"
                      rows={5}
                      placeholder="Message"
                      className={fieldClass}
                      whileFocus={{ scale: 1.015 }}
                      transition={{ duration: 0.2, ease: EASE }}
                    />
                    <Pressable>
                      <button type="submit" className="btn-primary">
                        Submit <Send className="h-4 w-4" />
                      </button>
                    </Pressable>
                  </motion.form>
                )}
              </AnimatePresence>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
