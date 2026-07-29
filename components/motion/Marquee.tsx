/**
 * Pure-CSS infinite ticker — no JS, no scroll listener, so it costs nothing on
 * the catalogue tier. Pauses on hover and stops entirely under reduced motion.
 * Replaces the deprecated <marquee> element on the legacy site.
 */
export function Marquee({ items }: { items: string[] }) {
  const track = (
    <ul className="marquee-track flex shrink-0 items-center gap-8 pr-8">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-8">
          <span
            className="whitespace-nowrap text-[12.5px] uppercase text-text-2"
            style={{ fontVariationSettings: '"wdth" 100, "wght" 620', letterSpacing: "0.14em" }}
          >
            {t}
          </span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee flex overflow-hidden border-b border-border bg-bg py-3" aria-hidden>
      {track}
      {track}
    </div>
  );
}
