import type { Metadata } from "next";
import type { ReactNode } from "react";

/**
 * Internal console shell. Not linked from public navigation, excluded from
 * the sitemap, disallowed in robots.txt, and marked noindex here.
 *
 * NOTE: real authentication and server-side authorization are required
 * before any live data may appear behind these routes. Until then the
 * console renders clearly labelled mock data only. See
 * PRODUCTION_READINESS.md.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false }
};

export default function AdminSectionLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
