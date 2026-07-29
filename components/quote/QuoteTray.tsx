"use client";

import Link from "next/link";
import { useQuote } from "./QuoteStore";

export function QuoteTray() {
  const { count } = useQuote();
  if (count === 0) return null;

  return (
    <Link
      href="/quote"
      className="btn btn-primary lift fixed bottom-5 right-5 z-[500] shadow-[var(--shadow-lg)]"
    >
      <span className="text-[14px]">Your quote request</span>
      <span
        className="rounded-full bg-white/25 px-2 py-[3px] text-[12px]"
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
      className="btn btn-primary lift w-full"
    >
      {inList ? `Added (${inList.qty}) — add another` : "Add to quote request"}
    </button>
  );
}
