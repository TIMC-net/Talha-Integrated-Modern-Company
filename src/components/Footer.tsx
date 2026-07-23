"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronRight, Globe, Mail, MapPin, Phone } from "lucide-react";
import { useState, type ReactNode } from "react";
import { company } from "@/lib/company";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Clients", href: "/clients" },
  { label: "Contact Us", href: "/contact" },
];

const serviceLinks = [
  { label: "Scaffolding", href: "/services/scaffolding" },
  { label: "Manpower Supply", href: "/services/manpower" },
  { label: "Civil Division", href: "/services/civil" },
  { label: "Mechanical Division", href: "/services/mechanical" },
  { label: "Equipment Rental", href: "/services/equipment" },
  { label: "Materials Supply", href: "/services/materials" },
];

const certifications = [
  { src: "/images/iso45001.png", alt: "ISO 45001:2018" },
  { src: "/images/iso14001.png", alt: "ISO 14001:2015" },
  { src: "/images/iso9001.png", alt: "ISO 9001:2015" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 320 512" className="h-[14px] w-[14px] fill-current" aria-hidden>
        <path d="M279.1 288l14.2-92.7h-88.9v-60.1c0-25.4 12.4-50.1 52.2-50.1h40.4V6.3S260.4 0 225.4 0c-73.2 0-121.1 44.4-121.1 124.7v70.6H22.9V288h81.4v224h100.2V288z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg viewBox="0 0 512 512" className="h-[14px] w-[14px] fill-current" aria-hidden>
        <path d="M459.4 151.7c.3 4.5.3 9.1.3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4.9 16.5 1.3 25.2 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5.9 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14.1 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.2-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z" />
      </svg>
    ),
  },
  {
    label: "Google+",
    href: "#",
    icon: (
      <svg viewBox="0 0 640 512" className="h-[14px] w-[14px] fill-current" aria-hidden>
        <path d="M386.1 228.5c1.8 9.7 3.1 19.4 3.1 31.9 0 108.2-73.1 185.1-182.6 185.1-104.9 0-190.1-85.3-190.1-190.1S101.6 65.3 206.5 65.3c51.4 0 95.1 18.8 128.3 50.1l-52 50c-14-13.4-38.3-29.1-76.3-29.1-65.4 0-118.7 54.2-118.7 120.9s53.3 120.9 118.7 120.9c75.8 0 104.2-54.5 108.6-82.6H206.5v-65.9h179.6zM586 212.7V166h-45.3v46.7h-46.7v45.3H540.7v46.7H586V258h46.7V212.7H586z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 448 512" className="h-[14px] w-[14px] fill-current" aria-hidden>
        <path d="M100.3 448H7.4V148.9h92.9V448zM53.8 108.1C24.1 108.1 0 83.5 0 53.8S24.1 0 53.8 0s53.8 24.1 53.8 53.8-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
      </svg>
    ),
  },
];

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <h4 className="mb-5 font-display text-[16px] leading-[22px] font-bold tracking-[1.5px] text-accent uppercase">
      {children}
    </h4>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li className="border-t border-[#2c2c2e]">
      <Link
        href={href}
        className="group flex items-center gap-2 px-2.5 py-[15px] text-[14px] leading-[18px] text-[#c0c0c0] transition hover:text-[#de6536]"
      >
        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#c0c0c0] transition group-hover:text-[#de6536]" />
        {label}
      </Link>
    </li>
  );
}

function FooterCollapsible({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="mb-5 flex w-full items-center justify-between font-display text-[16px] leading-[22px] font-bold tracking-[1.5px] text-accent uppercase sm:pointer-events-none sm:cursor-default"
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-300 sm:hidden ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div className={`${open ? "block" : "hidden"} sm:block`}>{children}</div>
    </div>
  );
}

function FooterContact({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="relative border-t border-[#2c2c2e] py-[13px] pr-5 pl-9 font-display text-[14px] leading-[18px] font-medium tracking-[0.3px] text-[#c0c0c0]">
      <span className="absolute top-1/2 left-0 -translate-y-1/2 text-white/90">
        {icon}
      </span>
      {children}
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-dark-surface className="mt-auto bg-[#171f2b]">
      <div className="container-site py-8 md:py-14">
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-8">
          <div>
            <FooterHeading>Certifications</FooterHeading>
            <div className="mb-2.5 h-px bg-[#262728]" />
            <div className="flex flex-col gap-3 pt-2.5">
              {certifications.map((cert) => (
                <motion.div
                  key={cert.src}
                  className="w-max"
                  whileHover={{ scale: 1.08, y: -2 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                >
                  <Image
                    src={cert.src}
                    alt={cert.alt}
                    width={148}
                    height={48}
                    className="h-12 w-auto max-w-[80%] object-contain object-left"
                  />
                </motion.div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8">
              <p className="mb-3 font-display text-[14px] leading-[18px] font-normal text-white">
                Follow Us On
              </p>
              <div className="flex items-center gap-[10px] text-[#9aa0a4]">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="transition hover:text-[#de6536]"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-[#2c2c2e] pt-4 sm:border-t-0 sm:pt-0">
            <FooterCollapsible title="Quick Links">
              <ul>
                {quickLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href} label={link.label} />
                ))}
              </ul>
            </FooterCollapsible>
          </div>

          <div className="border-t border-[#2c2c2e] pt-4 sm:border-t-0 sm:pt-0">
            <FooterCollapsible title="Our Services">
              <ul>
                {serviceLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href} label={link.label} />
                ))}
              </ul>
            </FooterCollapsible>
          </div>

          <div className="border-t border-[#2c2c2e] pt-4 sm:border-t-0 sm:pt-0">
            <FooterHeading>Get In Touch</FooterHeading>
            <FooterContact icon={<MapPin className="h-5 w-5" />}>
              {company.location}
            </FooterContact>
            <FooterContact icon={<Phone className="h-5 w-5" />}>
              <a
                href={`tel:${company.phone}`}
                className="text-[#c0c0c0] transition hover:text-[#de6536]"
              >
                {company.phone}
              </a>
            </FooterContact>
            <FooterContact icon={<Mail className="h-5 w-5" />}>
              <a
                href={`mailto:${company.email}`}
                className="text-[#c0c0c0] transition hover:text-[#de6536]"
              >
                {company.email}
              </a>
            </FooterContact>
            <FooterContact icon={<Globe className="h-5 w-5" />}>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c0c0c0] transition hover:text-[#de6536]"
              >
                {company.website}
              </a>
            </FooterContact>
          </div>
        </div>
      </div>

      <div className="bg-[#0f0f0f] py-5 sm:py-7">
        <div className="container-site flex flex-col gap-2 text-[14px] leading-[18px] tracking-[0.5px] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[#c0c0c0]">
            Copyright &copy; {company.shortName} {year}. All rights are reserved.
          </p>
          <p className="text-[#3f3f3f] sm:text-right">
            Designed By{" "}
            <span className="text-[#6b8cae]">WeRQA</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
