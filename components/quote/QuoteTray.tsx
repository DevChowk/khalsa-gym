"use client";

import Link from "next/link";
import { useQuote } from "./QuoteStore";

export function QuoteTray() {
  const { count } = useQuote();
  if (count === 0) return null;

  return (
    <Link
      href="/quote"
      className="lift fixed bottom-5 right-5 z-[500] flex items-center gap-3 rounded-full bg-ink px-5 py-3 text-paper shadow-lg"
      style={{ fontVariationSettings: '"wdth" 108, "wght" 700' }}
    >
      <span className="text-[14px]">Your quote request</span>
      <span
        className="rounded-full bg-paper px-2 py-[3px] text-[12px] text-ink"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {count}
      </span>
    </Link>
  );
}

export function AddToQuote({
  code,
  title,
  slug,
  category,
}: {
  code: string;
  title: string;
  slug: string;
  category: string;
}) {
  const { add, lines } = useQuote();
  const inList = lines.find((l) => l.code === code);

  return (
    <button
      type="button"
      onClick={() => add({ code, title, slug, category })}
      className="lift w-full rounded-full bg-ink px-6 py-4 text-[15px] text-paper"
      style={{ fontVariationSettings: '"wdth" 110, "wght" 750' }}
    >
      {inList ? `Added (${inList.qty}) — add another` : "Add to quote request"}
    </button>
  );
}
