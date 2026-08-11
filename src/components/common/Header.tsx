"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import Logo from "@/components/Logo";
import { DualToneShell, refreshNavInk } from "@/components/motion/DualToneShell";
import { useTheme } from "@/components/theme/ThemeProvider";
import { Button } from "@/components/ui/button";
import { company } from "@/lib/company";
import { cn } from "@/lib/cn";
import { lockPageScroll } from "@/hooks/useLenis";
import { handleSameRouteClick } from "@/lib/nav";

const EASE = [0.22, 1, 0.36, 1] as const;
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
  tone,
  interactive,
}: {
  pathname: string;
  collapsed: boolean;
  tone: "on-dark" | "on-light";
  interactive: boolean;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [highlight, setHighlight] = useState<Highlight>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const onDark = tone === "on-dark";

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
        if (!interactive) return;
        setOpen(null);
        setHighlight((h) => ({ ...h, opacity: 0 }));
      }}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-1/2 z-0 h-9 -translate-y-1/2 rounded-full transition-all duration-300 ease-out xl:h-10",
          // Hardcoded rgba — light theme remaps bg-white/* to black, which
          // erases the hover pill on the dark dual-tone capsule.
          onDark ? "bg-[rgba(10,10,10,0.08)]" : "bg-[rgba(255,255,255,0.22)]",
        )}
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
              if (!interactive) return;
              moveHighlightTo(e.currentTarget);
              if (children) setOpen(item.label);
            }}
          >
            <Link
              href={item.href}
              tabIndex={interactive ? undefined : -1}
              onClick={(e) => {
                handleSameRouteClick(e, pathname, item.href);
              }}
              className={cn(
                "relative z-10 flex items-center gap-1 rounded-full px-3 py-2 font-display text-[12px] font-semibold tracking-wide whitespace-nowrap uppercase transition-colors xl:px-4 xl:text-[13px] 2xl:px-5 2xl:text-[14px]",
                active || isOpen
                  ? "bg-accent text-[#0a0a0a]"
                  : onDark
                    ? "text-[#0a0a0a]/75 hover:text-[#0a0a0a]"
                    : "text-[#ffffff]/80 hover:text-[#ffffff]",
              )}
            >
              {item.label}
              {children && (
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
              )}
            </Link>

            <AnimatePresence>
              {children && isOpen && !collapsed && interactive && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: EASE }}
                  className="absolute top-[calc(100%+10px)] left-1/2 z-50 min-w-[220px] -translate-x-1/2 overflow-hidden rounded-2xl border border-black/10 bg-white/97 py-2 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl"
                >
                  {children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={(e) => {
                        handleSameRouteClick(e, pathname, child.href);
                      }}
                      className="block px-5 py-3 font-display text-[12px] font-semibold tracking-wide text-[#0a0a0a]/75 uppercase transition hover:bg-accent/10 hover:text-accent"
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

function NavThemeToggle({
  tone,
  size = "sm",
  className,
}: {
  tone: "on-dark" | "on-light";
  size?: "sm" | "md";
  className?: string;
}) {
  const { theme, toggleTheme, mounted } = useTheme();
  const isLightTheme = mounted && theme === "light";
  const onDark = tone === "on-dark";
  const iconClass = size === "md" ? "h-5 w-5" : "h-4 w-4 xl:h-5 xl:w-5";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={isLightTheme ? "Switch to dark theme" : "Switch to light theme"}
      title={isLightTheme ? "Dark mode" : "Light mode"}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
      className={cn(
        "group/theme relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border transition-[border-color,background-color,color,box-shadow] duration-300",
        size === "md" ? "h-11 w-11" : "h-10 w-10 xl:h-11 xl:w-11",
        onDark
          ? "border-black/10 bg-black/5 text-[#0a0a0a] hover:border-accent/50 hover:bg-accent/12 hover:text-accent hover:shadow-[0_0_0_4px_rgba(255,107,53,0.12)]"
          : "border-white/15 bg-white/5 text-[#ffffff] hover:border-accent/50 hover:bg-accent/12 hover:text-accent hover:shadow-[0_0_0_4px_rgba(255,107,53,0.18)]",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full bg-accent/0 transition-colors duration-300 group-hover/theme:bg-accent/[0.08]"
      />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isLightTheme ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -55, scale: 0.45 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 55, scale: 0.45 }}
          transition={{ duration: 0.28, ease: EASE }}
          className="relative inline-flex"
        >
          {isLightTheme ? (
            <Moon className={iconClass} strokeWidth={2.1} />
          ) : (
            <Sun
              className={cn(
                iconClass,
                "transition-transform duration-500 ease-out group-hover/theme:rotate-45",
              )}
              strokeWidth={2.1}
            />
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

function CapsuleInner({
  pathname,
  collapsed,
  tone,
  interactive,
}: {
  pathname: string;
  collapsed: boolean;
  tone: "on-dark" | "on-light";
  interactive: boolean;
}) {
  const onDark = tone === "on-dark";

  return (
    <>
      <div className="shrink-0 items-center lg:flex">
        <Logo variant={onDark ? "dark" : "light"} />
      </div>

      <div
        className={`relative min-h-0 min-w-0 overflow-hidden transition-[max-width,opacity,flex-grow,margin] lg:flex lg:items-center lg:justify-center ${MORPH} will-change-[max-width,opacity] ${
          collapsed
            ? "pointer-events-none mx-0 max-w-0 flex-none opacity-0"
            : "mx-1 max-w-[1400px] flex-1 opacity-100"
        }`}
      >
        <DesktopNav
          pathname={pathname}
          collapsed={collapsed}
          tone={tone}
          interactive={interactive}
        />
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <NavThemeToggle tone={tone} />
        <a
          href="/company-profile.pdf"
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={interactive ? undefined : -1}
          className={cn(
            "whitespace-nowrap font-display text-[12px] font-semibold tracking-wide uppercase transition-[max-width,opacity,margin,padding,color] duration-300 hover:text-accent lg:inline-flex 2xl:text-[13px]",
            MORPH,
            onDark ? "text-[#0a0a0a]/80" : "text-[#ffffff]/85",
            collapsed
              ? "pointer-events-none m-0 max-w-0 overflow-hidden p-0 opacity-0"
              : "max-w-[8rem] opacity-100",
          )}
        >
          Profile
        </a>

        <Button
          asChild
          size="sm"
          className="h-11 shrink-0 rounded-full px-4 text-xs tracking-wide whitespace-nowrap xl:h-12 xl:px-5"
        >
          <Link
            href="/contact"
            tabIndex={interactive ? undefined : -1}
            onClick={(e) => {
              handleSameRouteClick(e, pathname, "/contact");
            }}
          >
            Get A Quote
          </Link>
        </Button>
      </div>
    </>
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
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === "light";

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
        <Logo variant={isLight ? "dark" : "light"} />
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
                              onClick={(e) => {
                                handleSameRouteClick(e, pathname, child.href);
                                onClose();
                              }}
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
                  onClick={(e) => {
                    handleSameRouteClick(e, pathname, item.href);
                    onClose();
                  }}
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
          <Link
            href="/contact"
            onClick={(e) => {
              handleSameRouteClick(e, pathname, "/contact");
              onClose();
            }}
          >
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
  const { theme, mounted: themeMounted } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  /** Bumps on every route change so menu unlock can skip restoring scroll */
  const routeGenRef = useRef(0);
  const isLightTheme = themeMounted && theme === "light";
  const ThemeIcon = isLightTheme ? Moon : Sun;

  const deskShellRef = useRef<HTMLDivElement>(null);
  const deskOverlayRef = useRef<HTMLDivElement>(null);
  const menuShellRef = useRef<HTMLDivElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const themeShellRef = useRef<HTMLDivElement>(null);
  const themeOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    routeGenRef.current += 1;
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const openGen = routeGenRef.current;
    const unlock = lockPageScroll();
    return () => {
      // Navbar tap while menu open: do NOT restore the old page's scroll onto the new one
      const navigated = openGen !== routeGenRef.current;
      unlock({ restore: !navigated });
    };
  }, [mobileOpen]);

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

      if (y < 48) {
        setCollapsed(false);
        accumulated = 0;
        return;
      }

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

  useEffect(() => {
    refreshNavInk();
  }, [collapsed, pathname]);

  const capsulePad = collapsed
    ? "justify-between gap-3 pr-2.5 pl-5 sm:gap-4 sm:pr-3 sm:pl-6 lg:pr-3 lg:pl-6 xl:pr-3.5 xl:pl-7"
    : "justify-between gap-3 px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7";

  return (
    <>
      {/* Mobile menu — liquid-ink wipe (same flow as desktop capsule) */}
      <DualToneShell
        shellRef={menuShellRef}
        overlayRef={menuOverlayRef}
        className="pointer-events-auto fixed top-4 left-4 z-50 h-12 w-12 overflow-hidden rounded-full shadow-lg sm:top-5 sm:left-5 sm:h-14 sm:w-14 lg:hidden"
        base={
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="flex h-full w-full items-center justify-center rounded-full border border-white/25 bg-[#0a0a0a] text-[#ffffff]"
          >
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.25} />
          </button>
        }
        overlay={
          <div className="flex h-full w-full items-center justify-center rounded-full border border-black/10 bg-[#ffffff] text-[#0a0a0a]">
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.25} />
          </div>
        }
      />

      {/* Mobile theme — liquid-ink wipe (same flow as desktop capsule) */}
      <DualToneShell
        shellRef={themeShellRef}
        overlayRef={themeOverlayRef}
        className="pointer-events-auto fixed top-4 right-4 z-50 h-12 w-12 overflow-hidden rounded-full shadow-lg sm:top-5 sm:right-5 sm:h-14 sm:w-14 lg:hidden"
        base={
          <NavThemeToggle
            tone="on-light"
            size="md"
            className="h-full w-full border-white/25 bg-[#0a0a0a] text-[#ffffff] shadow-none"
          />
        }
        overlay={
          <div
            aria-hidden
            className="flex h-full w-full items-center justify-center rounded-full border border-black/10 bg-[#ffffff] text-[#0a0a0a]"
          >
            <ThemeIcon className="h-5 w-5" strokeWidth={2.25} />
          </div>
        }
      />

      {/* Desktop capsule — dual-tone liquid ink */}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-50 hidden justify-center sm:top-5 md:top-[22px] lg:top-6 lg:flex">
        <div
          className={cn(
            "pointer-events-none relative w-[94vw] transition-[max-width] will-change-[max-width]",
            MORPH,
            collapsed ? "max-w-[600px]" : "max-w-[1280px]",
          )}
        >
          <DualToneShell
            shellRef={deskShellRef}
            overlayRef={deskOverlayRef}
            className="pointer-events-auto w-full"
            base={
              <nav
                data-site-nav
                className={cn(
                  "flex w-full items-center overflow-hidden rounded-[130px] border border-white/12 bg-[#0a0a0a]/70 text-[#ffffff] shadow-lg backdrop-blur-xl",
                  MORPH,
                  "min-h-[68px] py-3 transition-[padding,gap,box-shadow] sm:min-h-[72px] lg:min-h-[78px] xl:min-h-[84px] xl:py-3.5",
                  capsulePad,
                )}
              >
                <CapsuleInner
                  pathname={pathname}
                  collapsed={collapsed}
                  tone="on-light"
                  interactive
                />
              </nav>
            }
            overlay={
              <nav
                className={cn(
                  "flex h-full w-full items-center overflow-hidden rounded-[130px] border border-black/10 bg-[#ffffff]/75 text-[#0a0a0a] shadow-lg backdrop-blur-xl",
                  "min-h-[68px] py-3 sm:min-h-[72px] lg:min-h-[78px] xl:min-h-[84px] xl:py-3.5",
                  capsulePad,
                )}
              >
                <CapsuleInner
                  pathname={pathname}
                  collapsed={collapsed}
                  tone="on-dark"
                  interactive={false}
                />
              </nav>
            }
          />
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
    </>
  );
}
