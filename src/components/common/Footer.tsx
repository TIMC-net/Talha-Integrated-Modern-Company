"use client";

import { useId, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import { services } from "@/data/services";
import { company } from "@/lib/company";
import { cn } from "@/lib/cn";

const projectLinks = [
  { label: "Ongoing Projects", href: "/projects/ongoing" },
  { label: "Completed Projects", href: "/projects/completed" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Clients", href: "/clients" },
  { label: "Contact", href: "/contact" },
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

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="text-[14px] leading-snug text-white/55 transition-colors duration-200 hover:text-accent"
    >
      {children}
    </Link>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="min-w-0 border-b border-white/[0.08] last:border-b-0 md:border-0">
      <button
        type="button"
        className="flex w-full items-center gap-2.5 py-3.5 text-left md:pointer-events-none md:cursor-default md:gap-0 md:py-0"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {/* Chevron on the left on mobile so it never sits under FAB / call controls */}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-white/40 transition-transform duration-300 md:hidden",
            open && "rotate-180 text-accent",
          )}
          aria-hidden
        />
        <h3 className="font-display text-[11px] font-bold tracking-[0.18em] text-white/90 uppercase">
          {title}
        </h3>
      </button>
      <div
        id={panelId}
        className={cn(
          "md:mt-5 md:block",
          open ? "block pb-3.5 pl-6 md:pl-0" : "hidden",
        )}
      >
        <ul className="space-y-2.5">{children}</ul>
      </div>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const linkedIn = socialLinks[0];

  return (
    <footer
      data-dark-surface
      className="relative mt-auto border-t border-white/10 bg-navy-950"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 0% 0%, rgba(255,107,53,0.06), transparent 50%)",
        }}
      />

      <div className="container-site relative pt-10 pb-2 md:pt-14 md:pb-4">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-start lg:gap-x-16 xl:gap-x-24">
          {/* Brand + contact */}
          <div className="min-w-0">
            <p className="font-display text-[11px] font-semibold tracking-[0.22em] text-accent uppercase">
              {company.shortName}
            </p>
            <p className="mt-1.5 max-w-[18rem] font-display text-[1.05rem] leading-snug font-bold tracking-wide text-white uppercase sm:max-w-md sm:text-xl">
              {company.name}
            </p>

            <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-white/48 sm:text-[14px]">
              Civil infrastructure, foundation engineering, energy, and equipment
              rental across Saudi Arabia.
            </p>

            <div className="mt-5 flex items-center gap-3 sm:mt-6">
              <Link
                href="/contact"
                className="group/cta inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-2 bg-accent px-5 font-display text-[12px] font-bold tracking-[0.14em] text-brand-ink uppercase transition-[background-color,transform] duration-300 hover:bg-[#ff7d4d] sm:flex-none sm:px-6"
              >
                Contact Us
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5"
                  strokeWidth={2.25}
                />
              </Link>
              {/* Desktop: LinkedIn sits right of Contact Us */}
              <span className="hidden shrink-0 md:inline-flex">
                <a
                  href={linkedIn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TIMC on LinkedIn"
                  data-social={linkedIn.network}
                  className="social-icon-btn !h-11 !w-11"
                >
                  <span className="social-icon">{linkedIn.icon}</span>
                </a>
              </span>
            </div>

            <ul className="mt-6 space-y-3.5 border-t border-white/[0.08] pt-6 text-[13px] sm:text-[14px]">
              <li>
                <a
                  href={`tel:${company.phone}`}
                  className="group flex items-center gap-3 text-white/70 transition-colors hover:text-accent"
                >
                  <Phone
                    className="h-4 w-4 shrink-0 text-accent"
                    strokeWidth={1.75}
                  />
                  <span>{company.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="group flex items-center gap-3 text-white/70 transition-colors hover:text-accent"
                >
                  <Mail
                    className="h-4 w-4 shrink-0 text-accent"
                    strokeWidth={1.75}
                  />
                  <span className="break-all">{company.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={company.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-white/70 transition-colors hover:text-accent"
                >
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    strokeWidth={1.75}
                  />
                  <span className="leading-snug">{company.address}</span>
                </a>
              </li>
            </ul>

            <div className="mt-5 flex items-center justify-between gap-3 pr-14 md:pr-0">
              <p className="min-w-0 font-display text-[11px] tracking-wide text-white/28">
                CR {company.commercialRegistration}
                <span className="mx-2 text-white/12" aria-hidden>
                  ·
                </span>
                VAT {company.vatNumber}
              </p>
              {/* Mobile: LinkedIn on the CR / VAT row */}
              <span className="inline-flex shrink-0 md:hidden">
                <a
                  href={linkedIn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TIMC on LinkedIn"
                  data-social={linkedIn.network}
                  className="social-icon-btn !h-8 !w-8"
                >
                  <span className="social-icon scale-90">{linkedIn.icon}</span>
                </a>
              </span>
            </div>
          </div>

          {/* Nav — collapsed by default on mobile; extra right pad clears FABs */}
          <nav
            aria-label="Footer"
            className="min-w-0 border-t border-white/[0.08] pr-14 md:border-t-0 md:pr-0"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 lg:gap-10">
              <FooterColumn title="Services">
                {services.map((service) => (
                  <li key={service.slug}>
                    <FooterLink href={`/services#${service.slug}`}>
                      {service.name}
                    </FooterLink>
                  </li>
                ))}
              </FooterColumn>

              <FooterColumn title="Projects">
                {projectLinks.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </FooterColumn>

              <FooterColumn title="Company">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </FooterColumn>
            </div>
          </nav>
        </div>
      </div>

      <div className="relative border-t border-white/[0.08] bg-black/30">
        <div className="container-site flex flex-col gap-2.5 py-3.5 pb-[calc(0.875rem+env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-4 sm:pb-4">
          <p className="text-[12px] text-white/38 sm:text-[13px]">
            © {year} {company.shortName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-white/32 sm:text-[13px]">
            <Link href="/privacy" className="transition hover:text-accent">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-accent">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

