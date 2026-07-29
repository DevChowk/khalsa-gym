"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up on entry. The resting state is the FINAL value, so if JS never
 * runs, hydration fails, or the user prefers reduced motion, the correct
 * number is still on screen.
 */
export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [display, setDisplay] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (document.documentElement.dataset.motion === "off") return;

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting) return;
        io.disconnect();

        const start = performance.now();
        const dur = 1200;
        const step = (now: number) => {
          const k = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - k, 3);
          setDisplay(Math.round(to * eased));
          if (k < 1) raf = requestAnimationFrame(step);
        };
        setDisplay(0);
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.35 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <p
      ref={ref}
      className="leading-[0.82]"
      style={{
        fontVariationSettings: '"wdth" 125, "wght" 850',
        letterSpacing: "-0.05em",
        fontSize: "clamp(2.4rem, 6vw, 5rem)",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {display.toLocaleString("en-IN")}
      {display === to ? suffix : ""}
    </p>
  );
}
