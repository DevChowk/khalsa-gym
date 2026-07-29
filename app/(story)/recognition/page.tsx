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
    <div className="mx-auto max-w-[1560px] px-[clamp(18px,3.4vw,56px)] py-[clamp(40px,7vh,90px)]">
      <nav aria-label="Breadcrumb" className="t-data mb-8 text-ink-mute">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        <span aria-hidden> / </span>
        <span className="text-ink">Recognition</span>
      </nav>

      <h1 className="t-h2 max-w-[13ch]">They have used it</h1>
      <p className="t-body mt-6">
        On the site this replaces, these nine photographs were fused into a single decorative image
        with every caption painted into the pixels — unreadable to a search engine, a screen reader,
        or a phone. Each is now a record in its own right.
      </p>

      <ul className="mt-[clamp(32px,5vh,70px)] grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
        {RECOGNITION.map((r, i) => (
          <li key={r.id} className="group bg-paper">
            <figure className="m-0">
              <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
                <span
                  className="absolute left-3 top-3 z-10 t-data text-white"
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
              <figcaption className="border-t border-rule p-4">
                <p
                  className="text-[15.5px] leading-tight"
                  style={{ fontVariationSettings: '"wdth" 108, "wght" 740' }}
                >
                  {r.who}
                </p>
                <p
                  className="mt-1.5 text-[10px] uppercase text-signal"
                  style={{
                    fontVariationSettings: '"wdth" 100, "wght" 700',
                    letterSpacing: "0.15em",
                  }}
                >
                  {r.role}
                </p>
                <p className="mt-2.5 text-[12.5px] leading-snug text-ink-mute">{r.what}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {/* credentials */}
      <section className="mt-[clamp(48px,8vh,110px)] border-t border-rule pt-[clamp(28px,4vh,56px)]">
        <h2 className="t-h3">Certifications</h2>
        <p className="t-body mt-3 text-[15px]">
          {SITE.legalName} holds {CERTIFICATIONS.length}+ certifications and {TEST_REPORTS.length}+
          MSME test reports covering materials, welding and coatings.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {CERTIFICATIONS.map((c) => (
            <li
              key={c}
              className="rounded-full border border-rule-2 px-3.5 py-1.5 text-[11.5px] text-ink-mute"
              style={{ fontVariationSettings: '"wdth" 100, "wght" 550' }}
            >
              {c}
            </li>
          ))}
        </ul>

        <h3 className="t-label mt-10">Test reports — MSME (PPDC)</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {TEST_REPORTS.map((t) => (
            <li
              key={t}
              className="rounded-full border border-rule px-3.5 py-1.5 text-[11.5px] text-ink-mute"
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
