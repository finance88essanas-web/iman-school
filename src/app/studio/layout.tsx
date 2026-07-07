import type { ReactNode } from "react";

export const metadata = { title: "Content Studio", robots: { index: false } };

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
