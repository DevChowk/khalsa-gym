import Link from "next/link";
import { getCategories } from "@/lib/data";

export function Header() {
  const cats = getCategories();

  return (
    <header className="sticky top-0 z-[400] border-b border-rule bg-paper/85 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1560px] items-center justify-between gap-5 px-[clamp(18px,3.4vw,56px)] py-4"
      >
        <Link
          href="/"
          className="text-[19px] uppercase"
          style={{ fontVariationSettings: '"wdth" 125, "wght" 850', letterSpacing: "-0.03em" }}
        >
          Khalsa
        </Link>

        <ul className="flex items-center gap-[clamp(12px,1.8vw,26px)]">
          {cats.slice(0, 3).map((c) => (
            <li key={c.slug} className="hidden md:block">
              <Link
                href={`/products/${c.slug}`}
                className="text-[11.5px] uppercase text-ink-mute transition-colors hover:text-ink"
                style={{ fontVariationSettings: '"wdth" 100, "wght" 600', letterSpacing: "0.11em" }}
              >
                {c.title}
              </Link>
            </li>
          ))}
          <li className="hidden md:block">
            <Link
              href="/recognition"
              className="text-[11.5px] uppercase text-ink-mute transition-colors hover:text-ink"
              style={{ fontVariationSettings: '"wdth" 100, "wght" 600', letterSpacing: "0.11em" }}
            >
              Recognition
            </Link>
          </li>
          <li>
            <Link
              href="/quote"
              className="rounded-full border-[1.5px] border-ink px-4 py-2 text-[11.5px] uppercase transition-colors hover:bg-ink hover:text-paper"
              style={{ fontVariationSettings: '"wdth" 100, "wght" 600', letterSpacing: "0.11em" }}
            >
              Request a quote
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
