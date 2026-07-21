import type { ReactNode } from "react";

/**
 * Marquee — endless, ultra-smooth horizontal moving text banner.
 * Uses CSS-only translate loop for buttery smoothness (no JS ticker).
 */
export function Marquee({
  items,
  className,
  speed = 45,
  separator,
}: {
  items: string[];
  className?: string;
  speed?: number; // seconds per full loop
  separator?: ReactNode;
}) {
  const sep = separator ?? <span className="mx-8 text-gold/60">✦</span>;
  const strip = (
    <div className="flex items-center shrink-0">
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap">{t}</span>
          {sep}
        </span>
      ))}
    </div>
  );
  return (
    <div
      className={`relative w-full overflow-hidden select-none ${className ?? ""}`}
      aria-hidden
    >
      <div
        className="flex marquee-track will-change-transform"
        style={{ animationDuration: `${speed}s` }}
      >
        {strip}
        {strip}
      </div>
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
