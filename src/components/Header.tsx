"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import Pressable from "@/components/motion/Pressable";
import { company, navLinks } from "@/lib/company";

const EASE = [0.22, 1, 0.36, 1] as const;

type NavItem = (typeof navLinks)[number];

function isLinkActive(
  pathname: string,
  href: string,
  children?: { href: string }[]
) {
  if (href === "/") return pathname === "/";
  if (children?.some((c) => pathname.startsWith(c.href))) return true;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function DesktopNav({ pathname, solid }: { pathname: string; solid: boolean }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <nav className="hidden lg:flex lg:items-center">
      {navLinks.map((item) => {
        const active = isLinkActive(pathname, item.href, item.children);
        const hasChildren = Boolean(item.children);
        const isOpen = open === item.label;

        return (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => hasChildren && setOpen(item.label)}
            onMouseLeave={() => hasChildren && setOpen(null)}
          >
            {hasChildren ? (
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : item.label)}
                className={`flex items-center gap-1 px-4 py-3 font-display text-[13px] font-semibold tracking-wide whitespace-nowrap uppercase transition ${
                  active || isOpen
                    ? "text-accent"
                    : solid
                      ? "text-ink hover:text-accent-dark"
                      : "text-white hover:text-accent-light"
                }`}
              >
                {item.label}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
            ) : (
              <Link
                href={item.href}
                className={`block px-4 py-3 font-display text-[13px] font-semibold tracking-wide whitespace-nowrap uppercase transition ${
                  active
                    ? "text-accent"
                    : solid
                      ? "text-ink hover:text-accent-dark"
                      : "text-white hover:text-accent-light"
                }`}
              >
                {item.label}
              </Link>
            )}

            {active && (
              <motion.span
                layoutId="header-nav-indicator"
                className="absolute right-4 -bottom-0.5 left-4 h-[2px] bg-accent"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}

            <AnimatePresence>
              {hasChildren && isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="absolute top-full left-0 z-50 w-64 border-t-2 border-accent bg-ink-2 py-2 shadow-2xl"
                >
                  {item.children!.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-5 py-3 font-display text-[12px] font-semibold tracking-wide text-white/75 uppercase transition hover:bg-white/5 hover:text-accent"
                    >
                      {child.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
}

const overlayVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.055, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

function MobileMenu({
  pathname,
  onClose,
}: {
  pathname: string;
  onClose: () => void;
}) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={overlayVariants}
      className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-ink-2/98 backdrop-blur-sm lg:hidden"
    >
      <motion.div variants={itemVariants} className="container-site flex h-[85px] items-center justify-between">
        <Logo variant="light" />
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center text-white"
        >
          <X className="h-6 w-6" />
        </button>
      </motion.div>

      <nav className="container-site flex-1 py-6">
        {navLinks.map((item: NavItem) => {
          const active = isLinkActive(pathname, item.href, item.children);
          const isOpen = openItem === item.label;

          return (
            <motion.div key={item.label} variants={itemVariants} className="border-b border-white/10">
              {item.children ? (
                <>
                  <button
                    type="button"
                    onClick={() => setOpenItem(isOpen ? null : item.label)}
                    className="flex w-full items-center justify-between py-4 text-left font-display text-[15px] font-semibold tracking-wide text-white uppercase"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180 text-accent" : ""}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className="overflow-hidden"
                      >
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className="block py-2.5 pl-4 font-display text-[13px] font-medium tracking-wide text-white/70 uppercase transition hover:text-accent"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`block py-4 font-display text-[15px] font-semibold tracking-wide uppercase transition ${
                    active ? "text-accent" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </motion.div>
          );
        })}
      </nav>

      <motion.div variants={itemVariants} className="container-site space-y-3 border-t border-white/10 py-6">
        <a href={`tel:${company.phone}`} className="flex items-center gap-3 text-[14px] text-white/80">
          <Phone className="h-4 w-4 text-accent" /> {company.phone}
        </a>
        <a href={`mailto:${company.email}`} className="flex items-center gap-3 text-[14px] text-white/80">
          <Mail className="h-4 w-4 text-accent" /> {company.email}
        </a>
        <Pressable className="w-full">
          <Link href="/contact" onClick={onClose} className="btn-primary mt-2 w-full justify-center">
            Get A Quote
          </Link>
        </Pressable>
      </motion.div>
    </motion.div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    setScrolled(false);

    let ticking = false;
    const update = () => {
      setScrolled(window.scrollY > 40);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const solid = !isHome || scrolled;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-white shadow-[0_2px_16px_rgba(7,11,18,0.08)]" : "bg-transparent"
      }`}
    >
      {/* Utility bar — collapses via a CSS grid-row track (fr units), which
          browsers animate far more cheaply than max-height (no artificial
          oversized range to interpolate through), so it stays smooth. */}
      <div
        className={`hidden overflow-hidden border-white/10 bg-ink-2/60 backdrop-blur-sm transition-[grid-template-rows] duration-300 ease-in-out lg:grid ${
          solid ? "grid-rows-[0fr] border-b-0" : "grid-rows-[1fr] border-b"
        }`}
      >
        <div
          className={`overflow-hidden transition-opacity duration-200 ${
            solid ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="container-site flex h-11 items-center justify-between text-[13px] text-white/70">
            <p className="italic">Welcome to {company.shortName}</p>
            <div className="flex items-center gap-6">
              <a href={`tel:${company.phone}`} className="flex items-center gap-2 transition hover:text-accent-light">
                <Phone className="h-3.5 w-3.5" /> {company.phone}
              </a>
              <a href={`mailto:${company.email}`} className="flex items-center gap-2 transition hover:text-accent-light">
                <Mail className="h-3.5 w-3.5" /> {company.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-site flex h-[84px] items-center justify-between gap-6">
        <Logo variant={solid ? "dark" : "light"} />

        <DesktopNav pathname={pathname} solid={solid} />

        <div className="flex items-center gap-3">
          <a
            href="/company-profile.pdf"
            target="_blank"
            rel="noreferrer"
            className={`hidden font-display text-[12px] font-bold tracking-wide uppercase transition xl:inline-block ${
              solid ? "text-ink hover:text-accent-dark" : "text-white hover:text-accent-light"
            }`}
          >
            Profile
          </a>
          <Pressable className="hidden lg:inline-block">
            <Link href="/contact" className="btn-primary inline-flex whitespace-nowrap">
              Get A Quote
            </Link>
          </Pressable>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className={`flex h-11 w-11 items-center justify-center lg:hidden ${
              solid ? "text-ink" : "text-white"
            }`}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && <MobileMenu pathname={pathname} onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </header>
  );
}
