"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/Heading";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { photos } from "@/lib/photos";

/**
 * GALLERY — cinematic masonry: three columns drifting at different speeds
 * as the page scrolls (transform-only parallax), photos in varied aspect
 * ratios, captions surfacing on hover. Flat grid under reduced motion.
 * All six frames are real school moments.
 */
const COLUMNS: {
  speed: number;
  items: { key: string; photo: string; aspect: string }[];
}[] = [
  {
    speed: -28,
    items: [
      { key: "scientist", photo: photos.scientist, aspect: "aspect-[3/4]" },
      { key: "graduation", photo: photos.kgGraduation, aspect: "aspect-square" },
    ],
  },
  {
    speed: 24,
    items: [
      { key: "joy", photo: photos.assembly, aspect: "aspect-square" },
      { key: "sports", photo: photos.karate, aspect: "aspect-[3/4]" },
    ],
  },
  {
    speed: -16,
    items: [
      { key: "volunteering", photo: photos.volunteering, aspect: "aspect-[3/4]" },
      { key: "science", photo: photos.theater, aspect: "aspect-square" },
    ],
  },
];

function DriftColumn({
  speed,
  className = "",
  children,
}: {
  speed: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { y }}
      className={`flex flex-col gap-5 md:gap-7 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function Gallery() {
  const t = useTranslations("home.gallery");

  return (
    <Section className="overflow-hidden pb-28 md:pb-44">
      <Reveal>
        <SectionHeader
          index="10"
          eyebrow={t("eyebrow")}
          title={t("title")}
          lead={t("lead")}
          layout="split"
        />
      </Reveal>

      <div className="mt-20 grid grid-cols-2 items-start gap-5 md:grid-cols-3 md:gap-7">
        {COLUMNS.map(({ speed, items }, c) => (
          <DriftColumn
            key={c}
            speed={speed}
            className={`${c === 1 ? "md:mt-20" : c === 2 ? "hidden md:flex md:mt-8" : ""}`}
          >
            {items.map(({ key, photo, aspect }) => (
              <figure key={key} className="group relative">
                <div className="overflow-hidden rounded-2xl">
                  <Photo
                    src={photo}
                    alt={t(`tiles.${key}`)}
                    sizes="(max-width: 768px) 46vw, 30vw"
                    className={`${aspect} rounded-2xl transition-transform duration-700 group-hover:scale-[1.05]`}
                  />
                </div>
                <figcaption className="pointer-events-none absolute bottom-3 start-3 translate-y-1 rounded-full border border-white/25 bg-black/35 px-3.5 py-1 text-sm font-medium text-white opacity-0 backdrop-blur-sm transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {t(`tiles.${key}`)}
                </figcaption>
              </figure>
            ))}
          </DriftColumn>
        ))}
      </div>
    </Section>
  );
}
