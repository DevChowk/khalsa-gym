/**
 * Pure-CSS infinite ticker. No JS, no scroll listener, so it costs nothing on
 * the catalogue tier. Pauses on hover and stops entirely under reduced motion.
 * Replaces the deprecated <marquee> element on the legacy site.
 */
export function Marquee({ items }: { items: string[] }) {
  const track = (
    <ul className="marquee-track flex shrink-0 items-center gap-10 pr-10">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-10">
          <span
            className="uppercase"
            style={{
              fontVariationSettings: '"wdth" 122, "wght" 800',
              letterSpacing: "-0.04em",
              fontSize: "clamp(1.3rem, 3.2vw, 2.4rem)",
            }}
          >
            {t}
          </span>
          <span className="h-2 w-2 shrink-0 rounded-full bg-signal" aria-hidden />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className="marquee flex overflow-hidden border-y border-rule py-3"
      aria-hidden
    >
      {track}
      {track}
    </div>
  );
}
