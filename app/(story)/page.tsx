import Image from "next/image";
import Link from "next/link";
import {
  SITE,
  CERTIFICATIONS,
  RECOGNITION,
  GROUP_ACCENT,
  accentFor,
  getCategories,
  getProducts,
} from "@/lib/data";
import { Counter } from "@/components/motion/Counter";
import { Marquee } from "@/components/motion/Marquee";
import { Carousel, CarouselItem } from "@/components/ui/Carousel";

const STEPS = [
  {
    n: "01",
    title: "Browse the range",
    body: "Every product lists its manufacturing code and full specification — pipe diameter, height, capacity and materials.",
  },
  {
    n: "02",
    title: "Add what you need",
    body: "Build one list across any number of ranges, setting quantities as you go.",
  },
  {
    n: "03",
    title: "Send a single request",
    body: "We reply with pricing, lead time and installation. Codes and specifications are attached automatically.",
  },
];

const SERVES = [
  "Municipal corporations",
  "Gram panchayats",
  "Smart-city projects",
  "Schools & anganwadi",
  "Resorts & societies",
  "Export distributors",
];

export default function HomePage() {
  const cats = getCategories();
  const products = getProducts();
  const hero = RECOGNITION[0];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-6 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div>
            <p className="eyebrow">Manufacturer &amp; exporter since {SITE.founded}</p>
            <h1 className="h1 mt-4">
              Playground, open gym and sports equipment — built to last in public spaces.
            </h1>
            <p className="lede mt-5">
              Lakshika Industries has manufactured and powder-coated equipment in Meerut for four
              decades, supplying municipal bodies, gram panchayats, schools and export buyers
              across India and overseas.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/products" className="btn btn-primary lift">
                Browse {products.length} products
              </Link>
              <Link href="/quote" className="btn btn-secondary lift">
                Request a quote
              </Link>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-5">
              {["ISO 9001", "EN 1176-1:2017", "EN 16630", "CE", "GS"].map((c) => (
                <li key={c} className="data text-text-3">
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* the strongest credential Lakshika Industries owns, on the first screen */}
          <figure className="card m-0 overflow-hidden">
            <div className="relative aspect-[5/4]">
              <Image
                src={hero.imageColour}
                alt={`${hero.who}, ${hero.role}. ${hero.what}`}
                fill
                priority
                sizes="(max-width:1024px) 92vw, 620px"
                className="object-cover"
              />
            </div>
            <figcaption className="border-t border-border bg-bg p-4">
              <p className="eyebrow">{hero.role}</p>
              <p className="h3 mt-1.5">{hero.who}</p>
              <p className="mt-1.5 text-[13.5px] leading-snug text-text-2">{hero.what}</p>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────── */}
      <section className="border-b border-border bg-bg">
        <ul className="mx-auto grid max-w-[1320px] grid-cols-2 gap-px bg-border lg:grid-cols-4">
          {SITE.counters.map((c) => (
            <li key={c.label} className="bg-bg px-6 py-7">
              <Counter to={c.value} suffix={c.suffix} />
              <p className="mt-2 text-[13px] leading-snug text-text-2">{c.label}</p>
            </li>
          ))}
        </ul>
      </section>

      <Marquee
        items={[
          "Outdoor open gym",
          "Children's park",
          "Multi-action play",
          "Athletics",
          "Gymnastics",
          "Basketball",
          "Synthetic surfaces",
          "Anganwadi",
          "Smart-city projects",
          "Export supply",
        ]}
      />

      {/* ── RANGES ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1320px] px-6 py-14 lg:py-20">
        <Head
          eyebrow="What we manufacture"
          title="Five ranges"
          lede="Each range links to every product in it, with the full specification table."
        />

        <ul className="reveal-stagger mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cats.map((c) => {
            const n = getProducts(c.slug).length;
            const accent = GROUP_ACCENT[c.group].hex;
            return (
              <li key={c.slug}>
                <Link
                  href={`/products/${c.slug}`}
                  className="card lift group flex h-full flex-col p-6"
                >
                  <span
                    className="mb-4 block h-1.5 w-10 rounded-full"
                    style={{ background: accent }}
                  />
                  <h3 className="h3">{c.title}</h3>
                  <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-text-2">
                    {c.intro}
                  </p>
                  <p className="data mt-5 flex items-center gap-2" style={{ color: accent }}>
                    {n > 0 ? `${n} product${n === 1 ? "" : "s"}` : "View range"}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ── PRODUCTS CAROUSEL ────────────────────────────────── */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-[1320px] px-6 py-14 lg:py-20">
          <Head
            eyebrow="Catalogue"
            title="Products"
            lede="Hover any item to see it in full colour. Every product carries its manufacturing code."
            action={{ href: "/products", text: `All ${products.length} products` }}
          />

          <Carousel label="Products" className="mt-8">
            {products.map((p) => (
              <CarouselItem key={p.code}>
                <Link
                  href={`/products/${p.category}/${p.slug}`}
                  className="group block h-full bg-bg p-4 transition-colors hover:bg-surface-2"
                >
                  <div className="plate relative aspect-square overflow-hidden rounded-[4px] border border-border">
                    {p.images[0] ? (
                      <Image
                        src={p.images[0]}
                        alt={`${p.title} — ${p.code}`}
                        fill
                        sizes="280px"
                        className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.05]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="data text-text-3">{p.code}</span>
                      </div>
                    )}
                  </div>
                  <p
                    className="mt-3.5 text-[14.5px] leading-snug"
                    style={{ fontVariationSettings: '"wdth" 102, "wght" 660' }}
                  >
                    {p.title}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="data text-text-3">{p.code}</span>
                    <span
                      className="data flex items-center gap-1"
                      style={{ color: accentFor(p.category) }}
                    >
                      View{" "}
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </span>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </Carousel>
        </div>
      </section>

      {/* ── WHO WE SUPPLY ────────────────────────────────────── */}
      <section className="mx-auto max-w-[1320px] px-6 py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Head
              eyebrow="Who we supply"
              title="Built for public use"
              lede="Equipment installed in unsupervised public spaces has to survive weather, volume and time. Ours is fabricated from heavy-gauge steel, powder-coated, and certified to European playground standards."
            />
            <ul className="mt-6 flex flex-wrap gap-2">
              {SERVES.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <ul className="reveal-stagger grid grid-cols-2 gap-4">
            {RECOGNITION.slice(1, 5).map((r) => (
              <li key={r.id}>
                <figure className="card m-0 h-full overflow-hidden">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={r.imageColour}
                      alt={`${r.who}. ${r.what}`}
                      fill
                      sizes="(max-width:1024px) 45vw, 300px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="border-t border-border p-3.5">
                    <p
                      className="text-[13.5px] leading-tight"
                      style={{ fontVariationSettings: '"wdth" 102, "wght" 680' }}
                    >
                      {r.who}
                    </p>
                    <p className="mt-1 text-[11.5px] leading-snug text-text-3">{r.role}</p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── HOW TO ORDER ─────────────────────────────────────── */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-[1320px] px-6 py-14 lg:py-20">
          <Head
            eyebrow="How to order"
            title="Three steps to a quote"
            lede="No pricing is published — equipment is quoted against your site, quantity and installation requirements."
          />
          <ol className="reveal-stagger mt-8 grid gap-4 md:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n} className="card bg-bg p-6">
                <span className="data text-brand">{s.n}</span>
                <h3 className="h3 mt-3">{s.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-text-2">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── CERTIFICATIONS ───────────────────────────────────── */}
      <section className="mx-auto max-w-[1320px] px-6 py-14 lg:py-20">
        <Head
          eyebrow="Quality"
          title="Certified and independently tested"
          lede={`${CERTIFICATIONS.length}+ certifications and MSME (PPDC) test reports covering pipe thickness, weld strength, bearing load and coating adhesion.`}
          action={{ href: "/recognition", text: "See all credentials" }}
        />
        <ul className="mt-7 flex flex-wrap gap-2">
          {CERTIFICATIONS.map((c) => (
            <li key={c} className="chip">
              {c}
            </li>
          ))}
        </ul>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="bg-text px-6 py-14 lg:py-20">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-8">
          <div>
            <h2 className="h2" style={{ color: "#fff" }}>
              Ready to specify your project?
            </h2>
            <p
              className="mt-3 max-w-[52ch] text-[15.5px] leading-relaxed"
              style={{ color: "#b9bfc5" }}
            >
              Add products to one request and we&rsquo;ll come back with pricing, lead time and
              installation — with every code and specification attached.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/products" className="btn btn-primary lift">
              Browse the range
            </Link>
            <a href={`tel:${SITE.phones[0].replace(/\s/g, "")}`} className="btn btn-ghost">
              Call {SITE.phones[0]}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Head({
  eyebrow,
  title,
  lede,
  action,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  action?: { href: string; text: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="h2 mt-2.5">{title}</h2>
        <p className="lede mt-3">{lede}</p>
      </div>
      {action && (
        <Link
          href={action.href}
          className="data flex items-center gap-2 whitespace-nowrap text-brand-dark transition-opacity hover:opacity-70"
        >
          {action.text} <span aria-hidden>→</span>
        </Link>
      )}
    </div>
  );
}
