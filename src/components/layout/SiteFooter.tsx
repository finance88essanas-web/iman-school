import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { LogoGlyph, LogoMark } from "@/components/ui/Logo";
import { ArchContours } from "@/components/ui/ArchContours";
import {
  IconCalendar,
  IconFacebook,
  IconInstagram,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@/components/ui/icons";
import { mainBranch, site } from "@/lib/site-config";

const FOOTER_LINKS = [
  { key: "about", href: "/about" },
  { key: "academics", href: "/academics" },
  { key: "admissions", href: "/admissions" },
  { key: "news", href: "/news" },
  { key: "contact", href: "/contact" },
] as const;

/**
 * FOOTER — the luxury closing plate: the school's name set enormous
 * across the top, layered dark ground (glow + one arch contour), airy
 * link and contact columns, a single gold rule with the star medallion.
 */
export async function SiteFooter() {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;
  const year = new Date().getFullYear();

  const socials = [
    { href: site.socials.facebook, label: "Facebook", Icon: IconFacebook },
    { href: site.socials.instagram, label: "Instagram", Icon: IconInstagram },
  ].filter((s) => s.href);

  return (
    <footer className="relative z-10 -mt-9 overflow-hidden rounded-t-[2.5rem] bg-[#06222e] text-on-primary md:rounded-t-[3rem]">
      {/* layered ground */}
      <div
        aria-hidden="true"
        className="absolute -top-40 start-[15%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(139,124,216,0.1),transparent_70%)]"
      />
      <ArchContours
        layers={4}
        className="absolute -bottom-[35%] end-[-6%] h-[130%] text-white opacity-[0.04]"
      />
      <LogoGlyph className="pointer-events-none absolute -bottom-14 start-[-3%] h-80 w-80 opacity-[0.04]" />

      <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-20 sm:px-8 md:pt-28">
        {/* giant nameplate */}
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-white/10 pb-14 md:pb-20">
          <div>
            <LogoMark className="h-14 w-14" />
            <p className="type-mega mt-6 max-w-3xl text-on-primary">
              {t("site.name")}
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-on-primary/60">
              {t("footer.about")}
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-accent-soft/80">
              {t("footer.affiliation")}
            </p>
          </div>
          <a
            href="#top"
            aria-label={t("footer.backToTop")}
            className="group inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/20 transition-colors duration-300 hover:border-accent hover:text-accent-soft md:h-20 md:w-20"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1"
            >
              <path d="M12 19V5" />
              <path d="m5 12 7-7 7 7" />
            </svg>
          </a>
        </div>

        {/* columns */}
        <div className="grid gap-12 pt-14 md:grid-cols-[1fr_1fr_1.2fr] md:pt-16">
          <nav aria-label={t("a11y.footerNav")}>
            <p className="type-eyebrow text-accent-soft">{t("footer.quickLinksTitle")}</p>
            <ul className="mt-6 space-y-4">
              {FOOTER_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="link-draw text-lg font-medium text-on-primary/75 transition-colors hover:text-on-primary"
                  >
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {socials.length > 0 ? (
            <div>
              <p className="type-eyebrow text-accent-soft">{t("footer.followTitle")}</p>
              <div className="mt-6 flex gap-3">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-accent hover:text-accent-soft"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div aria-hidden="true" />
          )}

          <div>
            <p className="type-eyebrow text-accent-soft">{t("footer.contactTitle")}</p>
            <ul className="mt-6 space-y-5 text-base">
              <li>
                {/* pin + address open the school directly on Google Maps */}
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={t("footer.viewOnMap")}
                  className="flex items-start gap-3.5 text-on-primary/75 transition-colors hover:text-on-primary"
                >
                  <IconMapPin className="mt-1 h-5 w-5 text-accent-soft/70" />
                  <span>
                    {mainBranch.address[locale]}
                    <span className="mt-0.5 block text-xs font-semibold text-accent-soft/80">
                      {t("footer.viewOnMap")}
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3.5">
                <IconPhone className="mt-1 h-5 w-5 text-accent-soft/70" />
                <a
                  href={`tel:${mainBranch.phone}`}
                  className="bidi-isolate text-on-primary/75 transition-colors hover:text-on-primary"
                >
                  {mainBranch.phone}
                </a>
              </li>
              <li className="flex items-start gap-3.5">
                <IconCalendar className="mt-1 h-5 w-5 text-accent-soft/70" />
                <span className="text-on-primary/75">
                  <span className="block text-xs font-bold text-accent-soft">
                    {t("footer.hoursLabel")}
                  </span>
                  {t("footer.hours")}
                  <span className="mt-1.5 block font-semibold text-on-primary/85">
                    {t("footer.principal")}
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3.5">
                <IconMail className="mt-1 h-5 w-5 text-accent-soft/70" />
                <a
                  href={`mailto:${mainBranch.email}`}
                  className="bidi-isolate text-on-primary/75 transition-colors hover:text-on-primary"
                >
                  {mainBranch.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* closing rule */}
        <div className="relative mt-16 border-t border-white/10 pt-7 text-center md:mt-20">
          <span
            aria-hidden="true"
            className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#06222e] px-3 text-accent"
          >
            <svg viewBox="0 0 12 12" className="h-4 w-4" fill="currentColor">
              <path d="M6 0l1.4 3.2L10.6 2 9.2 5.2 12 6 9.2 6.8l1.4 3.2-3.2-1.2L6 12 4.6 8.8 1.4 10l1.4-3.2L0 6l2.8-.8L1.4 2l3.2 1.2L6 0Z" />
            </svg>
          </span>
          <p className="text-sm text-on-primary/50">
            © <span className="bidi-isolate">{year}</span> {t("site.name")} —{" "}
            {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
