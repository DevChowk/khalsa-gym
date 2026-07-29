import Link from "next/link";
import { SITE, GROUP_ACCENT, getCategories, getProducts } from "@/lib/data";

export function Header() {
  const cats = getCategories();
  const total = getProducts().length;

  return (
    <>
      {/* utility bar — contact details are the first thing a buyer looks for */}
      <div className="hidden border-b border-border bg-surface md:block">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-6 py-2">
          <p className="text-[12.5px] text-text-2">
            Manufacturer &amp; exporter · {SITE.address.city}, {SITE.address.region} · Est.{" "}
            {SITE.founded}
          </p>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${SITE.phones[0].replace(/\s/g, "")}`}
              className="text-[12.5px] text-text-2 transition-colors hover:text-brand-dark"
            >
              {SITE.phones[0]}
            </a>
            <a
              href={`mailto:${SITE.emails[0]}`}
              className="text-[12.5px] text-text-2 transition-colors hover:text-brand-dark"
            >
              {SITE.emails[0]}
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-[400] border-b border-border bg-bg/95 backdrop-blur-md">
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-[1320px] items-center gap-8 px-6 py-3"
        >
          <Link href="/" className="flex shrink-0 items-baseline gap-2">
            <span
              className="text-[21px] uppercase leading-none text-brand"
              style={{ fontVariationSettings: '"wdth" 112, "wght" 830', letterSpacing: "-0.02em" }}
            >
              Lakshika
            </span>
            <span className="hidden whitespace-nowrap text-[9.5px] uppercase leading-none tracking-[0.16em] text-text-3 lg:block">
              Industries Pvt Ltd
            </span>
          </Link>

          <ul className="hidden flex-1 items-center gap-7 md:flex">
            {/* Products opens a panel listing every range — scales to 48 categories */}
            <li className="group relative">
              <Link
                href="/products"
                className="flex items-center gap-1.5 whitespace-nowrap py-2 text-[14.5px] text-text transition-colors hover:text-brand-dark"
                style={{ fontVariationSettings: '"wdth" 100, "wght" 600' }}
              >
                Products
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden fill="none">
                  <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Link>

              <div className="invisible absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-2 opacity-0 transition-all duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="rounded-[10px] border border-border bg-bg p-2 shadow-[var(--shadow-lg)]">
                  <ul className="grid grid-cols-2 gap-1">
                    {cats.map((c) => {
                      const n = getProducts(c.slug).length;
                      return (
                        <li key={c.slug}>
                          <Link
                            href={`/products/${c.slug}`}
                            className="flex items-start gap-3 rounded-[6px] p-3 transition-colors hover:bg-surface"
                          >
                            <span
                              className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                              style={{ background: GROUP_ACCENT[c.group].hex }}
                            />
                            <span>
                              <span
                                className="block text-[14px] leading-tight text-text"
                                style={{ fontVariationSettings: '"wdth" 100, "wght" 620' }}
                              >
                                {c.title}
                              </span>
                              <span className="mt-0.5 block text-[12px] text-text-3">
                                {n > 0 ? `${n} products` : "View range"}
                              </span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                    <li>
                      <Link
                        href="/products"
                        className="flex h-full items-center gap-3 rounded-[6px] bg-surface p-3 transition-colors hover:bg-surface-2"
                      >
                        <span
                          className="text-[14px] text-brand-dark"
                          style={{ fontVariationSettings: '"wdth" 100, "wght" 620' }}
                        >
                          All {total} products →
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            {[
              { href: "/recognition", label: "Recognition" },
              { href: "/quote", label: "Get a quote" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="whitespace-nowrap py-2 text-[14.5px] text-text-2 transition-colors hover:text-text"
                  style={{ fontVariationSettings: '"wdth" 100, "wght" 560' }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex shrink-0 items-center gap-2.5 md:ml-0">
            <Link href="/quote" className="btn btn-primary">
              Request a quote
            </Link>
          </div>
        </nav>

        {/* category rail for small screens */}
        <div className="no-scrollbar flex gap-5 overflow-x-auto border-t border-border px-6 py-2.5 md:hidden">
          {cats.map((c) => (
            <Link
              key={c.slug}
              href={`/products/${c.slug}`}
              className="whitespace-nowrap text-[13px] text-text-2"
              style={{ fontVariationSettings: '"wdth" 100, "wght" 560' }}
            >
              {c.title}
            </Link>
          ))}
        </div>
      </header>
    </>
  );
}
