import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation primitives. Always import Link / useRouter /
 * usePathname from here — never from next/link or next/navigation directly —
 * so every link stays inside the active locale automatically.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
