import type { ReactNode } from "react";

/**
 * Root layout — intentionally a pass-through.
 * The [locale] layout owns <html> so it can set lang/dir per language.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
