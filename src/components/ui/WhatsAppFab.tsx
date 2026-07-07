import { getTranslations } from "next-intl/server";
import { whatsappHref } from "@/lib/site-config";

/**
 * Floating WhatsApp action — the primary conversion path for Lebanese
 * parents. Anchored to the end edge (mirrors in RTL); the label unfolds
 * on hover/focus for pointer users. Server component.
 */
export async function WhatsAppFab() {
  const t = await getTranslations("a11y");
  const ta = await getTranslations("actions");
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsappFab")}
      className="group fixed bottom-5 z-30 inline-flex h-14 items-center justify-center rounded-full bg-whatsapp px-[0.875rem] text-white shadow-lift ring-4 ring-white/40 transition-[box-shadow] duration-300 hover:shadow-xl [inset-inline-end:1.25rem]"
    >
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-[max-width,opacity,padding] duration-500 group-hover:max-w-40 group-hover:ps-1.5 group-hover:pe-2 group-hover:opacity-100 group-focus-visible:max-w-40 group-focus-visible:ps-1.5 group-focus-visible:pe-2 group-focus-visible:opacity-100">
        {ta("chatShort")}
      </span>
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M12.04 2c-5.5 0-9.96 4.45-9.96 9.94 0 1.75.46 3.46 1.34 4.96L2 22l5.24-1.37c1.45.79 3.08 1.2 4.8 1.2h.01c5.49 0 9.95-4.45 9.95-9.94 0-2.66-1.03-5.15-2.91-7.03A9.86 9.86 0 0 0 12.04 2Zm0 18.16h-.01a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.11.81.83-3.04-.2-.31a8.24 8.24 0 0 1-1.26-4.35c0-4.54 3.7-8.23 8.26-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.21-8.25 8.21Zm4.52-6.15c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
      </svg>
    </a>
  );
}
