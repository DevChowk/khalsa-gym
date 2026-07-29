import Link from "next/link";
import { SITE, getCategories } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto max-w-[1320px] px-6 py-12">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <p className="eyebrow-muted">{SITE.legalName}</p>
            <address className="mt-3 max-w-[32ch] text-[13.5px] not-italic leading-relaxed text-text-2">
              {SITE.address.street}, {SITE.address.city}, {SITE.address.region}{" "}
              {SITE.address.postalCode}, {SITE.address.country}
            </address>
          </div>

          <div>
            <p className="eyebrow-muted">Range</p>
            <ul className="mt-3 space-y-1.5">
              {getCategories().map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/products/${c.slug}`}
                    className="text-[13.5px] text-text-2 transition-colors hover:text-text"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-left sm:text-right">
            <p className="eyebrow-muted">Contact</p>
            <ul className="mt-3 space-y-1.5">
              {SITE.emails.map((e) => (
                <li key={e}>
                  <a className="data text-text-2 hover:text-text" href={`mailto:${e}`}>
                    {e}
                  </a>
                </li>
              ))}
              {SITE.phones.map((p) => (
                <li key={p}>
                  <a
                    className="data text-text-2 hover:text-text"
                    href={`tel:${p.replace(/\s/g, "")}`}
                  >
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-border pt-6 data text-text-3">
          © {new Date().getFullYear()} {SITE.legalName} · Est. {SITE.founded} · Meerut, India
        </p>
      </div>
    </footer>
  );
}
