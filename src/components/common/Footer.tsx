"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import { services } from "@/data/services";
import { company } from "@/lib/company";

const industryLinks = [
  { label: "Civil Infrastructure", href: "/services#civil-infrastructure" },
  { label: "Foundation Engineering", href: "/services#foundation-engineering" },
  { label: "Energy Infrastructure", href: "/services#energy-infrastructure" },
  { label: "Equipment Rental", href: "/services#equipment-rental" },
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
    <div className="border-b border-white/10 pb-4 md:border-0 md:pb-0">
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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-4 lg:gap-12">
          <div>
            <p className="font-display text-lg font-bold tracking-wide text-white uppercase">
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

          <FooterNavGroup title="Industries">
            {industryLinks.map((link) => (
              <li key={link.href + link.label}>
                <Link
                  href={link.href}
                  className="text-[14px] text-white/55 transition hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </FooterNavGroup>

          <div>
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
            <p className="mt-5 text-[12px] leading-relaxed text-white/40">
              CR: {company.commercialRegistration}
              <br />
              VAT: {company.vatNumber}
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex font-display text-[12px] font-bold tracking-wide text-accent uppercase transition hover:text-accent-light"
            >
              Contact Us →
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
