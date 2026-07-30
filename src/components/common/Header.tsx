"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { company } from "@/lib/company";

const EASE = [0.22, 1, 0.36, 1] as const;
/** Matches Integriti: duration-500 + cubic-bezier(0.22, 1, 0.36, 1) */
const MORPH = "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
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

type Highlight = { left: number; width: number; opacity: number };

function DesktopNav({
  pathname,
  collapsed,
}: {
  pathname: string;
  collapsed: boolean;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [highlight, setHighlight] = useState<Highlight>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const moveHighlightTo = useCallback((el: HTMLElement | null) => {
    const list = listRef.current;
    if (!list || !el) {
      setHighlight((h) => ({ ...h, opacity: 0 }));
      return;
    }
    setHighlight({
      left: el.offsetLeft,
      width: el.offsetWidth,
      opacity: 1,
    });
  }, []);

  useEffect(() => {
    if (collapsed) setHighlight((h) => ({ ...h, opacity: 0 }));
  }, [collapsed]);

  const highlightStyle: CSSProperties = {
    transform: `translateX(${highlight.left}px)`,
    width: highlight.width,
    opacity: highlight.opacity,
  };

  return (
    <ul
      ref={listRef}
      className="relative flex items-center gap-1 xl:gap-2"
      onMouseLeave={() => {
        setOpen(null);
        setHighlight((h) => ({ ...h, opacity: 0 }));
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 z-0 h-9 -translate-y-1/2 rounded-full bg-accent/20 transition-all duration-300 ease-out xl:h-10"
        style={highlightStyle}
      />

      {navLinks.map((item) => {
        const children = item.children;
        const active = isLinkActive(pathname, item.href, children);
        const isOpen = open === item.label;

        return (
          <li
            key={item.label}
            className="relative z-10 flex h-full items-center"
            onMouseEnter={(e) => {
              moveHighlightTo(e.currentTarget);
              if (children) setOpen(item.label);
            }}
          >
            <Link
              href={item.href}
              className={`flex items-center gap-1 rounded-full px-3 py-2 font-display text-[12px] font-semibold tracking-wide whitespace-nowrap uppercase transition-colors xl:px-4 xl:text-[13px] 2xl:px-5 2xl:text-[14px] ${
                active || isOpen ? "bg-accent/15 text-accent" : "text-white/75 hover:text-white"
              }`}
            >
              {item.label}
              {children && (
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
              )}
            </Link>

            <AnimatePresence>
              {children && isOpen && !collapsed && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: EASE }}
                  className="absolute top-[calc(100%+10px)] left-1/2 z-50 min-w-[220px] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-navy-950/95 py-2 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl"
                >
                  {children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-5 py-3 font-display text-[12px] font-semibold tracking-wide text-white/75 uppercase transition hover:bg-accent/10 hover:text-accent"
                    >
                      {child.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
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
      className="fixed inset-0 z-[200] flex flex-col overflow-y-auto overscroll-contain bg-navy-950/98 backdrop-blur-xl lg:hidden"
    >
      <motion.div
        variants={itemVariants}
        className="flex h-16 shrink-0 items-center justify-between px-5 sm:h-[72px] sm:px-6"
      >
        <Logo variant="light" />
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-accent/40 hover:bg-accent/10"
        >
          <X className="h-5 w-5" />
        </button>
      </motion.div>

      <nav className="flex-1 px-5 py-6 sm:px-6">
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
        className="space-y-3 border-t border-white/10 px-5 py-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:px-6"
      >
        <a href={`tel:${company.phone}`} className="block text-[14px] text-white/80">
          {company.phone}
        </a>
        <a href={`mailto:${company.email}`} className="block text-[14px] text-white/80">
          {company.email}
        </a>
        <Button asChild className="mt-2 w-full justify-center rounded-full">
          <Link href="/contact" onClick={onClose}>
            Get A Quote
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}

function getScrollY() {
  const lenis = window.timcLenis;
  if (lenis && typeof lenis.scroll === "number") return lenis.scroll;
  return window.scrollY || document.documentElement.scrollTop || 0;
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

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

  // Collapse on scroll down, expand on scroll up (Lenis-friendly thresholds)
  useEffect(() => {
    let accumulated = 0;

    const update = () => {
      ticking.current = false;

      if (!window.matchMedia("(min-width: 1024px)").matches) {
        setCollapsed(false);
        lastScrollY.current = getScrollY();
        accumulated = 0;
        return;
      }

      const y = getScrollY();
      const delta = y - lastScrollY.current;
      lastScrollY.current = y;
      accumulated += delta;

      // Near top — always show full nav
      if (y < 48) {
        setCollapsed(false);
        accumulated = 0;
        return;
      }

      // Need enough net movement so Lenis micro-steps still count
      if (accumulated > 10) {
        setCollapsed(true);
        accumulated = 0;
      } else if (accumulated < -6) {
        setCollapsed(false);
        accumulated = 0;
      }
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };

    const onResize = () => {
      if (!window.matchMedia("(min-width: 1024px)").matches) {
        setCollapsed(false);
      }
    };

    lastScrollY.current = getScrollY();
    accumulated = 0;
    if (window.matchMedia("(min-width: 1024px)").matches && getScrollY() > 72) {
      setCollapsed(true);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("timc:scroll", onScroll);
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("timc:scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [pathname]);

  return (
    <>
      {/* Mobile — menu button only (no capsule / no wordmark) */}
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen(true)}
        className="pointer-events-auto fixed top-4 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#2A2927] text-white shadow-lg transition hover:border-accent/40 hover:bg-accent/10 sm:top-5 sm:left-5 sm:h-14 sm:w-14 lg:hidden"
      >
        <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/*
        Desktop capsule — width morph via max-width only (always w-[94vw])
        so expand & collapse share the same smooth CSS flow.
      */}
      <div
        className={`pointer-events-none fixed top-4 left-1/2 z-50 hidden w-[94vw] -translate-x-1/2 sm:top-5 md:top-[22px] lg:top-6 lg:block ${MORPH} will-change-[max-width] transition-[max-width] ${
          collapsed ? "max-w-[460px]" : "max-w-[1280px]"
        }`}
      >
        <nav
          className={`pointer-events-auto flex w-full items-center overflow-hidden rounded-[130px] border border-white/10 bg-navy-950/80 shadow-lg backdrop-blur-[30px] ${MORPH} min-h-[68px] py-3 transition-[padding,gap,background-color,box-shadow] sm:min-h-[72px] lg:min-h-[78px] xl:min-h-[84px] xl:py-3.5 ${
            collapsed
              ? "justify-between gap-4 pr-2 pl-4 sm:gap-5 sm:pr-2.5 sm:pl-5 lg:pr-2.5 lg:pl-5 xl:pr-3 xl:pl-6"
              : "justify-between gap-3 px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7"
          }`}
        >
          <div className="shrink-0 items-center lg:flex">
            <Logo variant="light" />
          </div>

          <div
            className={`relative min-h-0 min-w-0 overflow-hidden transition-[max-width,opacity,flex-grow,margin] lg:flex lg:items-center lg:justify-center ${MORPH} will-change-[max-width,opacity] ${
              collapsed
                ? "pointer-events-none mx-0 max-w-0 flex-none opacity-0"
                : "mx-1 max-w-[1400px] flex-1 opacity-100"
            }`}
          >
            <DesktopNav pathname={pathname} collapsed={collapsed} />
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href="/company-profile.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`whitespace-nowrap font-display text-[12px] font-semibold tracking-wide text-white/85 uppercase transition-[max-width,opacity,margin,padding] hover:text-accent lg:inline-flex 2xl:text-[13px] ${MORPH} ${
                collapsed
                  ? "pointer-events-none m-0 max-w-0 overflow-hidden p-0 opacity-0"
                  : "max-w-[8rem] opacity-100"
              }`}
            >
              Profile
            </a>

            <Button
              asChild
              size="sm"
              className="h-11 shrink-0 rounded-full px-5 text-xs tracking-wide xl:h-12 xl:px-6"
            >
              <Link href="/contact">Get A Quote</Link>
            </Button>
          </div>
        </nav>
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
    </>
  );
}
