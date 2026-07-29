import Link from "next/link";
import { SITE, getCategories } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-rule">
      <div className="mx-auto max-w-[1560px] px-[clamp(18px,3.4vw,56px)] py-[clamp(32px,5vh,60px)]">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <p className="t-label">{SITE.legalName}</p>
            <address className="mt-3 max-w-[32ch] text-[13.5px] not-italic leading-relaxed text-ink-mute">
              {SITE.address.street}, {SITE.address.city}, {SITE.address.region}{" "}
              {SITE.address.postalCode}, {SITE.address.country}
            </address>
          </div>

          <div>
            <p className="t-label">Range</p>
            <ul className="mt-3 space-y-1.5">
              {getCategories().map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/products/${c.slug}`}
                    className="text-[13.5px] text-ink-mute transition-colors hover:text-ink"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-left sm:text-right">
            <p className="t-label">Contact</p>
            <ul className="mt-3 space-y-1.5">
              {SITE.emails.map((e) => (
                <li key={e}>
                  <a className="t-data text-ink-mute hover:text-ink" href={`mailto:${e}`}>
                    {e}
                  </a>
                </li>
              ))}
              {SITE.phones.map((p) => (
                <li key={p}>
                  <a
                    className="t-data text-ink-mute hover:text-ink"
                    href={`tel:${p.replace(/\s/g, "")}`}
                  >
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          className="mt-[clamp(24px,5vh,60px)] uppercase leading-[0.78] text-ink"
          style={{
            fontVariationSettings: '"wdth" 125, "wght" 850',
            letterSpacing: "-0.05em",
            fontSize: "clamp(2.4rem, 13vw, 10rem)",
          }}
        >
          Khalsa
        </p>

        <p className="mt-6 t-data text-ink-mute">
          © {new Date().getFullYear()} {SITE.legalName} · Est. {SITE.founded} · Meerut, India
        </p>
      </div>
    </footer>
  );
}
