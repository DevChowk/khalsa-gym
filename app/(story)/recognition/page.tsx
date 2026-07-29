import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RECOGNITION, CERTIFICATIONS, TEST_REPORTS, SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Recognition",
  description:
    "The Prime Minister and the Defence Minister of India have used Khalsa Exports open-gym equipment. Ministerial visits, municipal installations, international trade fairs, and 27 certifications.",
  alternates: { canonical: "/recognition" },
};

export default function RecognitionPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-6 py-10 lg:py-14">
      <nav aria-label="Breadcrumb" className="data mb-8 text-text-2">
        <Link href="/" className="hover:text-text">
          Home
        </Link>
        <span aria-hidden> / </span>
        <span className="text-text">Recognition</span>
      </nav>

      <h1 className="h2 max-w-[13ch]">They have used it</h1>
      <p className="lede mt-6">
        On the site this replaces, these nine photographs were fused into a single decorative image
        with every caption painted into the pixels — unreadable to a search engine, a screen reader,
        or a phone. Each is now a record in its own right.
      </p>

      <ul className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {RECOGNITION.map((r, i) => (
          <li key={r.id} className="group bg-bg">
            <figure className="m-0">
              <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                <span
                  className="absolute left-3 top-3 z-10 data text-white"
                  style={{ textShadow: "0 1px 4px rgba(0,0,0,.65)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Image
                  src={r.image}
                  alt={`${r.who}, ${r.role}. ${r.what}`}
                  fill
                  sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw"
                  className="object-cover transition-opacity duration-700 group-hover:opacity-0"
                />
                <Image
                  src={r.imageColour}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw"
                  className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                />
              </div>
              <figcaption className="border-t border-border p-4">
                <p
                  className="text-[15.5px] leading-tight"
                  style={{ fontVariationSettings: '"wdth" 108, "wght" 740' }}
                >
                  {r.who}
                </p>
                <p
                  className="mt-1.5 text-[10px] uppercase text-brand"
                  style={{
                    fontVariationSettings: '"wdth" 100, "wght" 700',
                    letterSpacing: "0.15em",
                  }}
                >
                  {r.role}
                </p>
                <p className="mt-2.5 text-[12.5px] leading-snug text-text-2">{r.what}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {/* credentials */}
      <section className="mt-14 border-t border-border pt-10">
        <h2 className="h3">Certifications</h2>
        <p className="lede mt-3 text-[15px]">
          {SITE.legalName} holds {CERTIFICATIONS.length}+ certifications and {TEST_REPORTS.length}+
          MSME test reports covering materials, welding and coatings.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {CERTIFICATIONS.map((c) => (
            <li
              key={c}
              className="rounded-full border border-border-2 px-3.5 py-1.5 text-[11.5px] text-text-2"
              style={{ fontVariationSettings: '"wdth" 100, "wght" 550' }}
            >
              {c}
            </li>
          ))}
        </ul>

        <h3 className="eyebrow-muted mt-10">Test reports — MSME (PPDC)</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {TEST_REPORTS.map((t) => (
            <li
              key={t}
              className="rounded-full border border-border px-3.5 py-1.5 text-[11.5px] text-text-2"
              style={{ fontVariationSettings: '"wdth" 100, "wght" 550' }}
            >
              {t}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
