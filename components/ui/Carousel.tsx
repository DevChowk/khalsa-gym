"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Scroll-snap carousel.
 *
 * The scrolling itself is native CSS (`scroll-snap-type`), so touch, trackpad,
 * keyboard and screen-reader users all get correct behaviour with no JS. The
 * client code only adds the arrow buttons and the position readout — if it
 * never loads, the strip is still fully scrollable.
 */
export function Carousel({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [index, setIndex] = useState(1);
  const [total, setTotal] = useState(0);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    setTotal(items.length);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);

    // nearest item to the left edge
    let nearest = 0;
    let best = Infinity;
    items.forEach((it, i) => {
      const d = Math.abs(it.offsetLeft - el.scrollLeft);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    setIndex(nearest + 1);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const step = useCallback((dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const first = el.children[0] as HTMLElement | undefined;
    const gap = 1; // 1px rule between items
    const amount = first ? first.offsetWidth + gap : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: amount * dir, behavior: reduce ? "auto" : "smooth" });
  }, []);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className={className}
    >
      <div className="mb-4 flex items-center justify-end gap-3">
        <p className="t-data text-ink-mute" aria-live="polite">
          {total > 0 ? `${index} / ${total}` : ""}
        </p>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={atStart}
            aria-label={`Previous — ${label}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-rule-2 transition-colors hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30"
          >
            <Arrow dir="left" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={atEnd}
            aria-label={`Next — ${label}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-rule-2 transition-colors hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30"
          >
            <Arrow dir="right" />
          </button>
        </div>
      </div>

      <ul
        ref={track}
        tabIndex={0}
        className="no-scrollbar flex snap-x snap-mandatory gap-px overflow-x-auto border border-rule bg-rule focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
      >
        {children}
      </ul>
    </section>
  );
}

export function CarouselItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li
      className={`shrink-0 snap-start bg-paper ${className}`}
      style={{ flexBasis: "clamp(220px, 24vw, 300px)" }}
    >
      {children}
    </li>
  );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      style={{ transform: dir === "left" ? "rotate(180deg)" : undefined }}
    >
      <path
        d="M2 8h12M9 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  );
}
