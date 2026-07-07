import type { ReactNode } from "react";
import { Container } from "./Container";

type Tone = "paper" | "deep" | "sky" | "primary" | "dark";

const tones: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  // light bands carry a faint vertical falloff — lit from above, never flat
  deep: "bg-[linear-gradient(180deg,#f4ecd9_0%,#eadfc8_100%)] text-ink",
  // cool light-blue band — the school-blue counterpart to `deep`
  sky: "bg-[linear-gradient(180deg,#f1f8fb_0%,#dfeef5_100%)] text-ink",
  primary: "bg-primary text-on-primary",
  dark: "bg-[linear-gradient(180deg,#0a3243_0%,#0d3f54_100%)] text-on-primary",
};

/**
 * Standard page section: consistent vertical rhythm via the
 * --spacing-section token, tone variants for alternating bands.
 */
export function Section({
  children,
  tone = "paper",
  className = "",
  id,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`py-[var(--spacing-section-sm)] md:py-[var(--spacing-section)] ${tones[tone]} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}
