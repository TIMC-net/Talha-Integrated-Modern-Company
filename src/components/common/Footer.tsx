"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import { services } from "@/data/services";
import { company } from "@/lib/company";

const projectLinks = [
  { label: "Ongoing Projects", href: "/projects/ongoing" },
  { label: "Completed Projects", href: "/projects/completed" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/talha-integrated-modern-company/",
    network: "linkedin" as const,
    icon: (
      <svg viewBox="0 0 448 512" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M100.3 448H7.4V148.9h92.9V448zM53.8 108.1C24.1 108.1 0 83.5 0 53.8S24.1 0 53.8 0s53.8 24.1 53.8 53.8-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
      </svg>
    ),
  },
];

function FooterNavGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-w-0 border-b border-white/10 pb-4 md:border-0 md:pb-0">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 text-left md:pointer-events-none"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <h4 className="font-display text-[13px] font-bold tracking-[2px] text-white uppercase">
          {title}
        </h4>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-accent transition-transform duration-300 md:hidden ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>
      <ul
        className={`mt-4 space-y-3 md:mt-5 md:block ${
          open ? "block" : "hidden"
        }`}
      >
        {children}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-dark-surface className="mt-auto border-t border-white/10 bg-navy-950">
      <div className="container-site py-14 md:py-16">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-12 lg:grid-cols-[minmax(0,1.35fr)_auto_auto_minmax(0,1.15fr)] lg:gap-x-14 xl:gap-x-16">
          <div className="min-w-0">
            <p className="font-display text-lg font-bold tracking-wide text-white uppercase text-balance">
              {company.name}
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-white/55">
              A Saudi Arabian engineering and contracting company delivering civil
              infrastructure, foundation engineering, energy infrastructure and
              integrated equipment rental across the Kingdom of Saudi Arabia.
            </p>
            <div className="mt-6 hidden items-center gap-3 md:flex">
              {socialLinks.map(({ label, href, network, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-social={network}
                  className="social-icon-btn"
                >
                  <span className="social-icon">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          <FooterNavGroup title="Services">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services#${service.slug}`}
                  className="text-[14px] text-white/55 transition hover:text-accent"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </FooterNavGroup>

          <FooterNavGroup title="Projects">
            {projectLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[14px] text-white/55 transition hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </FooterNavGroup>

          <div className="min-w-0">
            <h4 className="font-display text-[13px] font-bold tracking-[2px] text-white uppercase">
              Get in Touch
            </h4>
            <ul className="mt-5 space-y-4 text-[14px] text-white/55">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href={`tel:${company.phone}`} className="transition hover:text-accent">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href={`mailto:${company.email}`} className="transition hover:text-accent">
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a
                  href={company.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-accent"
                >
                  {company.address}
                </a>
              </li>
              {/* Mobile: LinkedIn sits directly under location */}
              <li className="flex items-center gap-3 pt-1 md:hidden">
                {socialLinks.map(({ label, href, network, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    data-social={network}
                    className="social-icon-btn"
                  >
                    <span className="social-icon">{icon}</span>
                  </a>
                ))}
              </li>
            </ul>
            <dl className="mt-5 space-y-0 border border-white/10 bg-white/[0.03] px-3.5 py-3">
              <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-2.5">
                <dt className="font-display text-[10px] font-semibold tracking-[0.16em] text-white/40 uppercase">
                  CR No.
                </dt>
                <dd className="font-display text-[12px] font-semibold tracking-wide text-white/75 tabular-nums">
                  {company.commercialRegistration}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 pt-2.5">
                <dt className="font-display text-[10px] font-semibold tracking-[0.16em] text-white/40 uppercase">
                  VAT No.
                </dt>
                <dd className="font-display text-[12px] font-semibold tracking-wide text-white/75 tabular-nums">
                  {company.vatNumber}
                </dd>
              </div>
            </dl>
            <Link
              href="/contact"
              className="group/cta relative mt-6 inline-flex h-11 items-center gap-2.5 overflow-hidden bg-accent px-6 font-display text-[12px] font-bold tracking-[0.16em] text-brand-ink uppercase shadow-[0_14px_32px_-16px_rgba(255,107,53,0.8)] transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#ff7d4d] hover:shadow-[0_18px_40px_-14px_rgba(255,107,53,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:translate-y-px"
            >
              {/* Shine sweep */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover/cta:translate-x-[120%]"
              />
              {/* Soft pulse ring on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/cta:opacity-100"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.28)",
                }}
              />
              <span className="relative">Contact Us</span>
              <ArrowRight
                className="relative h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:translate-x-1"
                strokeWidth={2.25}
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/40 py-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:pb-5">
        <div className="container-site flex flex-col gap-2 text-[13px] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white/45">
            © {year} Talha Integrated Modern Company ({company.shortName}). All
            rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-white/40">
            <Link href="/privacy" className="transition hover:text-accent">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-accent">
              Terms of Use
            </Link>
            <Link href="/clients" className="transition hover:text-accent">
              Clients
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
