import type { ReactNode } from "react";

/**
 * ICON SET — one hand-drawn stroke family (1.75px, round joins) so every
 * icon on the site shares the same visual weight. All icons are decorative
 * (aria-hidden) and inherit currentColor.
 */

function IconBase({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-6 w-6 shrink-0 ${className}`}
    >
      {children}
    </svg>
  );
}

export type IconProps = { className?: string };

/* ---- Stages ---- */

export function IconSmile({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="9.25" />
      <path d="M8.5 14s1.3 1.8 3.5 1.8 3.5-1.8 3.5-1.8" />
      <path d="M9 9.25h.01" />
      <path d="M15 9.25h.01" />
    </IconBase>
  );
}

export function IconBookOpen({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M2 4.5h6a4 4 0 0 1 4 4V20a3 3 0 0 0-3-3H2Z" />
      <path d="M22 4.5h-6a4 4 0 0 0-4 4V20a3 3 0 0 1 3-3h7Z" />
    </IconBase>
  );
}

export function IconPenLine({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </IconBase>
  );
}

export function IconGraduationCap({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M22 9.5 12 4.5l-10 5 10 5 10-5Z" />
      <path d="M6 11.75V17c0 1.66 2.69 3 6 3s6-1.34 6-3v-5.25" />
      <path d="M22 9.5V15" />
    </IconBase>
  );
}

/* ---- Why us ---- */

export function IconShield({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M12 21.5s8-3.2 8-9.7V5.3L12 2.5l-8 2.8v6.5c0 6.5 8 9.7 8 9.7Z" />
      <path d="m9 11.5 2 2 4-4.5" />
    </IconBase>
  );
}

export function IconHeart({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </IconBase>
  );
}

export function IconUsers({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </IconBase>
  );
}

export function IconAward({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="8" r="5.5" />
      <path d="m15.4 12.9 1.6 8.1-5-3-5 3 1.6-8.1" />
    </IconBase>
  );
}

export function IconLanguages({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="m5 8 6 6" />
      <path d="m4 14 6-6 2-3" />
      <path d="M2 5h12" />
      <path d="M7 2h1" />
      <path d="m22 22-5-10-5 10" />
      <path d="M14 18h6" />
    </IconBase>
  );
}

export function IconMessage({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.5 0-2.9-.38-4.13-1.05L3 20l1.05-5.37A8.5 8.5 0 1 1 21 11.5Z" />
    </IconBase>
  );
}

/* ---- Facilities ---- */

export function IconFlask({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M10 2.5v7L4.7 19a2 2 0 0 0 1.8 3h11a2 2 0 0 0 1.8-3L14 9.5v-7" />
      <path d="M8.5 2.5h7" />
      <path d="M7.2 15.5h9.6" />
    </IconBase>
  );
}

export function IconLibrary({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="m16 6 4 14" />
      <path d="M12 6v14" />
      <path d="M8 8v12" />
      <path d="M4 4v16" />
    </IconBase>
  );
}

export function IconMonitor({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <rect x="2" y="3.5" width="20" height="13.5" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </IconBase>
  );
}

export function IconField({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <circle cx="12" cy="12" r="2.75" />
      <path d="M2 12h7.25" />
      <path d="M14.75 12H22" />
    </IconBase>
  );
}

export function IconMoonStar({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M12 3.5a6.5 6.5 0 0 0 8.5 8.5A8.5 8.5 0 1 1 12 3.5Z" />
      <path d="M19 3v4" />
      <path d="M17 5h4" />
    </IconBase>
  );
}

export function IconSparkles({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M12 3.5 13.8 9 19.5 11 13.8 13 12 18.5 10.2 13 4.5 11 10.2 9 12 3.5Z" />
      <path d="M19 16.5v4" />
      <path d="M17 18.5h4" />
    </IconBase>
  );
}

/* ---- Student life ---- */

export function IconBus({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5V17H4V5.5Z" />
      <path d="M4 11h16" />
      <path d="M8 3v8" />
      <path d="M16 3v8" />
      <circle cx="7.5" cy="19" r="1.75" />
      <circle cx="16.5" cy="19" r="1.75" />
    </IconBase>
  );
}

export function IconTrophy({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v6.5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 5.5H4.5v1a3 3 0 0 0 3 3" />
      <path d="M17 5.5h2.5v1a3 3 0 0 1-3 3" />
    </IconBase>
  );
}

export function IconBlocks({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="8.5" y="13.5" width="7" height="7" rx="1" />
    </IconBase>
  );
}

export function IconBookText({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      <path d="M9 7h6" />
      <path d="M9 11h6" />
    </IconBase>
  );
}

export function IconPalette({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M12 22a10 10 0 1 1 10-10c0 1.9-1.4 3-3 3h-2.2a2.3 2.3 0 0 0-1.8 3.7c.9 1.2.1 3.3-3 3.3Z" />
      <circle cx="7.5" cy="10.5" r="0.5" fill="currentColor" />
      <circle cx="12" cy="7.5" r="0.5" fill="currentColor" />
      <circle cx="16.5" cy="10.5" r="0.5" fill="currentColor" />
    </IconBase>
  );
}

/* ---- Contact / meta ---- */

export function IconPhone({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </IconBase>
  );
}

export function IconMail({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </IconBase>
  );
}

export function IconMapPin({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </IconBase>
  );
}

export function IconCalendar({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
    </IconBase>
  );
}

export function IconChevronDown({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="m6 9 6 6 6-6" />
    </IconBase>
  );
}

export function IconFacebook({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </IconBase>
  );
}

export function IconInstagram({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <path d="M17.5 6.5h.01" />
    </IconBase>
  );
}

/** Large decorative quotation mark for testimonial cards (filled, not stroked). */
export function QuoteMark({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`h-8 w-8 shrink-0 ${className}`}
    >
      <path d="M10.5 7.5c-3.1 0-5.25 2.2-5.25 5.4v3.6h5v-5h-2.4c.1-1.5 1.1-2.3 2.65-2.4v-1.6Zm8.25 0c-3.1 0-5.25 2.2-5.25 5.4v3.6h5v-5h-2.4c.1-1.5 1.1-2.3 2.65-2.4v-1.6Z" />
    </svg>
  );
}
