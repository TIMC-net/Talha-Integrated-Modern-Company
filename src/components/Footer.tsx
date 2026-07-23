"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Globe, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
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
      <div className="container-site py-12 md:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
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
          </div>

          <div>
            <FooterHeading>Quick Links</FooterHeading>
            <ul>
              {quickLinks.map((link) => (
                <FooterLink key={link.href} href={link.href} label={link.label} />
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>Our Services</FooterHeading>
            <ul>
              {serviceLinks.map((link) => (
                <FooterLink key={link.href} href={link.href} label={link.label} />
              ))}
            </ul>
          </div>

          <div>
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

      <div className="bg-[#0f0f0f] py-7">
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
