"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo, LogoGlyph } from "@/components/ui/Logo";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { GeometricPattern } from "@/components/ui/GeometricPattern";
import { IconPhone } from "@/components/ui/icons";
import { EASE_SOFT } from "@/components/motion/tokens";
import { mainBranch, whatsappHref } from "@/lib/site-config";

/**
 * SITE HEADER — transparent over the dark hero, condensing into a blurred
 * paper bar once the page scrolls. Homepage sections are single-page
 * anchors in Phase 2; they swap to real routes as inner pages ship.
 */

const NAV_ITEMS = [
  { key: "about", href: "/about" },
  { key: "academics", href: "/academics" },
  { key: "admissions", href: "/admissions" },
  { key: "news", href: "/news" },
  { key: "contact", href: "/contact" },
] as const;

export function SiteHeader() {
  const t = useTranslations();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll();

  // Condense on scroll; slide away when scrolling down, return on scroll up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > 160 && y > lastY + 4);
      if (y < lastY - 4 || y <= 160) setHidden(false);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu when navigation changes the route.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Menu open: lock scroll, move focus in, close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      triggerRef.current?.focus();
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-transform duration-500 ${
          hidden && !open ? "-translate-y-[130%]" : "translate-y-0"
        }`}
      >
        {/* At rest: a quiet full-width transparent bar over the hero.
            Scrolled: a floating glass capsule, inset from the edges. */}
        <div
          className={`mx-auto transition-[max-width,padding] duration-500 ${
            scrolled ? "max-w-6xl px-3 pt-3 sm:px-5" : "max-w-none px-0 pt-0"
          }`}
        >
          <div
            className={`relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 transition-[background-color,color,border-color,box-shadow,border-radius,height] duration-500 sm:px-8 ${
              scrolled
                ? "h-16 rounded-full border border-[#c6dde9]/70 bg-[#eef6fa]/90 text-ink shadow-soft backdrop-blur-xl"
                : "h-18 rounded-none border border-transparent bg-transparent text-on-primary md:h-20"
            }`}
          >
            {/* reading progress — a gold thread along the capsule's base */}
            {scrolled ? (
              <motion.span
                aria-hidden="true"
                className="absolute inset-x-8 bottom-0 block h-[2px] origin-left rounded-full bg-gradient-to-r from-accent to-accent-strong rtl:origin-right"
                style={{ scaleX: scrollYProgress }}
              />
            ) : null}
            <Logo />

          {/* centered nav needs xl width — below that it collides with the
              (long) Arabic wordmark, so the menu button takes over */}
          <nav
            aria-label={t("a11y.mainNav")}
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 xl:block"
          >
            <ul className="flex items-center gap-8">
              {NAV_ITEMS.map(({ key, href }) => {
                const isActive = pathname === href;
                return (
                  <li key={key}>
                    <Link
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      className={`link-draw text-sm font-medium transition-opacity hover:opacity-100 ${
                        isActive ? "link-active opacity-100" : "opacity-80"
                      }`}
                    >
                      {t(`nav.${key}`)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitcher className="hidden text-current sm:inline-block" />
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sheen hidden rounded-[var(--radius-button)] bg-accent px-5 py-2.5 text-sm font-semibold text-[#0a2a38] shadow-sm transition-[background-color,box-shadow] duration-300 hover:bg-accent-strong hover:text-white hover:shadow-md sm:inline-flex"
            >
              {t("actions.apply")}
            </a>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t("a11y.openMenu")}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="-me-2 inline-flex h-11 w-11 items-center justify-center rounded-md xl:hidden"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="h-6 w-6"
              >
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h10" />
              </svg>
            </button>
          </div>
          </div>
        </div>
      </header>

      {/* ---- Mobile menu overlay ---- */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t("a11y.mainNav")}
            className="fixed inset-0 z-50 overflow-y-auto bg-primary-deep/90 text-on-primary backdrop-blur-xl"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: EASE_SOFT }}
          >
            <GeometricPattern id="menu-pattern" opacity={0.05} />
            <LogoGlyph className="pointer-events-none absolute -bottom-14 -end-8 h-72 w-72 opacity-[0.05]" />

            <div className="relative mx-auto flex min-h-full max-w-6xl flex-col px-5 sm:px-8">
              <div className="flex h-18 items-center justify-between md:h-20">
                <Logo />
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label={t("a11y.closeMenu")}
                  className="-me-2 inline-flex h-11 w-11 items-center justify-center rounded-md"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="h-6 w-6"
                  >
                    <path d="m6 6 12 12" />
                    <path d="m18 6-12 12" />
                  </svg>
                </button>
              </div>

              <nav aria-label={t("a11y.mainNav")} className="flex-1 py-10">
                <motion.ul
                  className="space-y-2"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: reduce ? 0 : 0.06 } },
                  }}
                >
                  {NAV_ITEMS.map(({ key, href }, i) => (
                    <motion.li
                      key={key}
                      variants={{
                        hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 14 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.45, ease: EASE_SOFT },
                        },
                      }}
                    >
                      <Link
                        href={href}
                        onClick={close}
                        className="group flex items-baseline gap-4 border-b border-white/10 py-4 text-2xl font-semibold transition-colors hover:text-accent-soft"
                      >
                        <span
                          aria-hidden="true"
                          className="text-xs font-bold tabular-nums text-accent-soft/50 transition-colors group-hover:text-accent-soft"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {t(`nav.${key}`)}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>

              <motion.div
                className="pb-10"
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: reduce ? 0 : 0.35, ease: EASE_SOFT }}
              >
                <div className="flex flex-wrap items-center gap-5">
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-sheen rounded-[var(--radius-button)] bg-accent px-6 py-3 font-semibold text-[#0a2a38]"
                  >
                    {t("actions.apply")}
                  </a>
                  <LanguageSwitcher className="text-on-primary" />
                </div>
                <a
                  href={`tel:${mainBranch.phone}`}
                  className="bidi-isolate mt-6 inline-flex items-center gap-2.5 text-sm font-semibold text-on-primary/70 transition-colors hover:text-on-primary"
                >
                  <IconPhone className="h-4.5 w-4.5" />
                  {mainBranch.phone}
                </a>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
