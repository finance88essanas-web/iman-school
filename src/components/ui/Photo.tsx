import Image from "next/image";

/**
 * PHOTO — every photograph on the site passes through here, receiving the
 * same deep-green shadow grade so mixed photography reads as one campaign.
 * Parent controls shape via className (aspect/size + rounding).
 */
export function Photo({
  src,
  alt,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  className = "",
  imgClassName = "",
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-primary-deep ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        quality={72}
        className={`object-cover ${imgClassName}`}
      />
      {/* the house grade: deep-green shadows, quiet highlights */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,63,84,0.05),rgba(13,63,84,0.28))] mix-blend-multiply"
      />
      {/* framed-print hairline — the gallery-wall detail */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/15"
      />
    </div>
  );
}
