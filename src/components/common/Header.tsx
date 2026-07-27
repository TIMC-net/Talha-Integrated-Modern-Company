"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { company } from "@/lib/company";

const EASE = [0.22, 1, 0.36, 1] as const;

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
  external?: boolean;
};

const navLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects/ongoing" },
  { label: "Clients", href: "/clients" },
  { label: "Contact Us", href: "/contact" },
];

function isLinkActive(pathname: string, href: string, children?: { href: string }[]) {
  if (href === "/") return pathname === "/";
  if (href === "/services") return pathname === "/services" || pathname.startsWith("/services/");
  if (href.startsWith("/projects")) return pathname.startsWith("/projects");
  if (children?.some((c) => pathname === c.href || pathname.startsWith(`${c.href}/`))) {
    return true;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function DesktopNav({ pathname, solid }: { pathname: string; solid: boolean }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <nav className="hidden items-center lg:flex">
      {navLinks.map((item) => {
        const children = item.children;
        const active = isLinkActive(pathname, item.href, children);
        const isOpen = open === item.label;

        return (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => children && setOpen(item.label)}
            onMouseLeave={() => children && setOpen(null)}
          >
            <Link
              href={item.href}
              className={`flex items-center gap-1 px-2.5 py-3 font-display text-[11px] font-semibold tracking-wide whitespace-nowrap uppercase transition xl:px-3 xl:text-[12px] 2xl:px-4 2xl:text-[13px] ${
                active || isOpen
                  ? "text-accent"
                  : solid
                    ? "text-ink hover:text-accent-dark"
                    : "text-white hover:text-accent-light"
              }`}
            >
              {item.label}
              {children && (
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
              )}
            </Link>

            {active && (
              <motion.span
                layoutId="header-nav-indicator"
                className="absolute right-3 bottom-0.5 left-3 h-[2px] bg-accent 2xl:right-4 2xl:left-4"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}

            <AnimatePresence>
              {children && isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="absolute top-full left-0 z-50 min-w-[220px] border-t-2 border-accent bg-ink-2 py-2 shadow-2xl"
                >
                  {children.map((child) => (
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

function MobileMenu({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={overlayVariants}
      data-lenis-prevent
      className="fixed inset-0 z-[200] flex flex-col overflow-y-auto overscroll-contain bg-ink-2 lg:hidden"
    >
      <motion.div
        variants={itemVariants}
        className="container-site flex h-16 shrink-0 items-center justify-between sm:h-[72px]"
      >
        <Logo variant="light" />
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center text-white sm:h-11 sm:w-11"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </motion.div>

      <nav className="container-site flex-1 py-6">
        {navLinks.map((item: NavItem) => {
          const children = item.children;
          const active = isLinkActive(pathname, item.href, children);
          const isOpen = openItem === item.label;

          return (
            <motion.div key={item.label} variants={itemVariants} className="border-b border-white/10">
              {children ? (
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
                        {children.map((child) => (
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

        <motion.div variants={itemVariants} className="border-b border-white/10">
          <a
            href="/company-profile.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="block py-4 font-display text-[15px] font-semibold tracking-wide text-white uppercase"
          >
            Profile
          </a>
        </motion.div>
      </nav>

      <motion.div
        variants={itemVariants}
        className="container-site space-y-3 border-t border-white/10 py-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
      >
        <a href={`tel:${company.phone}`} className="block text-[14px] text-white/80">
          {company.phone}
        </a>
        <a href={`mailto:${company.email}`} className="block text-[14px] text-white/80">
          {company.email}
        </a>
        <Button asChild className="mt-2 w-full justify-center">
          <Link href="/contact" onClick={onClose}>
            Get A Quote
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const lenis = window.timcLenis;
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      window.timcLenis?.start();
    };
  }, [mobileOpen]);

  useEffect(() => {
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

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("timc:scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("timc:scroll", onScroll);
    };
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-navy-950/95 shadow-[0_2px_16px_rgba(0,0,0,0.45)] backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div className="container-site flex h-16 items-center justify-between gap-3 sm:h-[72px] sm:gap-4 lg:h-[84px]">
        <Logo variant="light" />

        <DesktopNav pathname={pathname} solid={false} />

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <a
            href="/company-profile.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden font-display text-[12px] font-semibold tracking-wide text-white uppercase transition hover:text-accent-light lg:inline-flex 2xl:text-[13px]"
          >
            Profile
          </a>

          <Button asChild className="hidden md:inline-flex">
            <Link href="/contact">Get A Quote</Link>
          </Button>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="relative z-[60] flex h-10 w-10 items-center justify-center text-white sm:h-11 sm:w-11 lg:hidden"
          >
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileOpen && (
              <MobileMenu pathname={pathname} onClose={() => setMobileOpen(false)} />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </header>
  );
}
