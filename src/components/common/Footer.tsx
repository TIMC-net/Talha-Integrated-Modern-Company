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
    href: "https://linkedin.com",
    network: "linkedin" as const,
    icon: (
      <svg viewBox="0 0 448 512" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M100.3 448H7.4V148.9h92.9V448zM53.8 108.1C24.1 108.1 0 83.5 0 53.8S24.1 0 53.8 0s53.8 24.1 53.8 53.8-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    network: "facebook" as const,
    icon: (
      <svg viewBox="0 0 320 512" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M279.1 288l14.2-92.7h-88.9v-60.1c0-25.4 12.4-50.1 52.2-50.1h40.4V6.3S260.4 0 225.4 0c-73.2 0-121.1 44.4-121.1 124.7v70.6H22.9V288h81.4v224h100.2V288z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    network: "instagram" as const,
    icon: (
      <svg viewBox="0 0 448 512" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
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
              A leading multi-discipline contractor delivering civil
              infrastructure, foundation engineering, energy infrastructure and
              integrated equipment rental across the Kingdom of Saudi Arabia.
            </p>
            <p className="mt-3 text-[11px] text-accent/80">
              Contact details &amp; social links pending official TIMC confirmation.
            </p>
            <div className="mt-6 flex items-center gap-3">
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
                <span>KSA: {company.location}</span>
              </li>
            </ul>
            <Link
              href="/contact"
              className="mt-6 inline-flex font-display text-[12px] font-bold tracking-wide text-accent uppercase transition hover:text-accent-light"
            >
              Contact Us →
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/40 py-5">
        <div className="container-site flex flex-col gap-2 text-[13px] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white/45">
            © {year} Talha Integrated Modern Company ({company.shortName}). All
            rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-white/40">
            <Link href="/projects/ongoing" className="transition hover:text-accent">
              Projects
            </Link>
            <a
              href="/company-profile.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-accent"
            >
              Company Profile
            </a>
            <Link href="/clients" className="transition hover:text-accent">
              Clients
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
