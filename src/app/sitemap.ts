import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { site } from "@/lib/site-config";

/** Static routes; CMS-driven routes (news articles) join in Phase 4. */
const paths = ["/", "/about", "/academics", "/admissions", "/news", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${site.url}/${locale}${path === "/" ? "" : path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [
            l,
            `${site.url}/${l}${path === "/" ? "" : path}`,
          ]),
        ),
      },
    })),
  );
}
