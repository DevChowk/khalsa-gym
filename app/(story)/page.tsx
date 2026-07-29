import Image from "next/image";
import Link from "next/link";
import { SITE, CERTIFICATIONS, RECOGNITION, getCategories, getProducts } from "@/lib/data";
import { Counter } from "@/components/motion/Counter";
import { Marquee } from "@/components/motion/Marquee";

export default function HomePage() {
  const cats = getCategories();
  const featured = getProducts().slice(0, 8);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="mx-auto flex min-h-[76svh] max-h-[860px] max-w-[1560px] flex-col justify-end px-[clamp(18px,3.4vw,56px)] pb-[clamp(22px,4vh,48px)] pt-[clamp(32px,8vh,80px)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
          <p className="t-label">
            Est. {SITE.founded} · {SITE.address.city}, {SITE.address.region}
          </p>
          <p className="t-label">Playground · Open gym · Sports</p>
        </div>

        <h1 className="t-mega reveal mt-[clamp(18px,4vh,44px)]">
          We build
          <br />
          what a nation
          <br />
          plays on
        </h1>

        <div className="reveal-stagger mt-[clamp(22px,4vh,46px)] grid gap-5 border-t border-rule pt-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="t-label">Manufactured</p>
            <p className="mt-2 text-[13px] leading-snug text-ink-mute">
              Fabricated and powder-coated in Meerut for four decades.
            </p>
          </div>
          <div>
            <p className="t-label">Supplied to</p>
            <p className="mt-2 text-[13px] leading-snug text-ink-mute">
              Municipal bodies, gram panchayats, smart-city projects, schools and export buyers.
            </p>
          </div>
          <div>
            <p className="t-label">Certified</p>
            <p className="mt-2 text-[13px] leading-snug text-ink-mute">
              ISO 9001 · EN&nbsp;1176-1:2017 · EN&nbsp;16630 · CE · GS — {CERTIFICATIONS.length}+ in total.
            </p>
          </div>
          <div>
            <p className="t-label">Recognised by</p>
            <p className="mt-2 text-[13px] leading-snug text-ink-mute">
              The Prime Minister and Defence Minister of India have used this equipment.
            </p>
          </div>
        </div>
      </section>

      <Marquee
        items={["Open gym", "Children's park", "Multiplay", "Athletics", "Gymnastics", "Surfaces"]}
      />

      {/* ── THE IDEA ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1560px] px-[clamp(18px,3.4vw,56px)] py-[clamp(58px,8.5vh,120px)]">
        <p className="t-label mb-[clamp(20px,3.4vh,38px)]">The idea</p>
        <h2 className="t-h2 reveal max-w-[17ch]">
          The site is monochrome. The only colour in it is the equipment.
        </h2>
        <p className="t-body reveal mt-[clamp(20px,3.5vh,36px)]">
          Every product is graded to a clean technical illustration and returns to full colour on
          interaction. Type carries the design; the photographs are held small, sharp and many.
        </p>
      </section>

      {/* ── RANGE ────────────────────────────────────────────── */}
      <section
        id="range"
        className="mx-auto max-w-[1560px] border-t border-rule px-[clamp(18px,3.4vw,56px)] py-[clamp(58px,8.5vh,120px)]"
      >
        <div className="mb-[clamp(20px,3.4vh,38px)] flex items-center gap-3">
          <p className="t-label">Range</p>
          <span className="h-px flex-1 bg-rule" />
          <Link href="/products" className="t-label transition-colors hover:text-ink">
            All {getProducts().length} products →
          </Link>
        </div>

        <ul className="reveal grid grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <li key={p.code} className="bg-paper">
              <Link
                href={`/products/${p.category}/${p.slug}`}
                className="group relative block p-4 transition-colors hover:bg-paper-2"
              >
                <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-signal transition-transform duration-300 group-hover:scale-x-100" />
                <div className="plate relative aspect-square overflow-hidden">
                  {p.image ? (
                    <>
                      <Image
                        src={p.image}
                        alt={`${p.title} — ${p.code}`}
                        fill
                        sizes="(max-width:640px) 45vw, (max-width:1024px) 30vw, 22vw"
                        className="object-contain transition-opacity duration-500 group-hover:opacity-0"
                      />
                      {p.imageColour && (
                        <Image
                          src={p.imageColour}
                          alt=""
                          fill
                          sizes="(max-width:640px) 45vw, (max-width:1024px) 30vw, 22vw"
                          aria-hidden
                          className="object-contain opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        />
                      )}
                    </>
                  ) : (
                    <div className="flex h-full items-center justify-center bg-paper-2">
                      <span className="t-data text-ink-mute">{p.code}</span>
                    </div>
                  )}
                </div>
                <p
                  className="mt-3 text-[13px] leading-tight"
                  style={{ fontVariationSettings: '"wdth" 106, "wght" 700' }}
                >
                  {p.title}
                </p>
                <p className="mt-1.5 t-data text-ink-mute">{p.code}</p>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-4 t-data text-ink-mute">
          Small and sharp beats large and soft — a 280&nbsp;px source in a 140&nbsp;px box is exactly
          2× on retina.
        </p>
      </section>

      {/* ── RECOGNITION ──────────────────────────────────────── */}
      <section className="mx-auto max-w-[1560px] border-t border-rule px-[clamp(18px,3.4vw,56px)] py-[clamp(58px,8.5vh,120px)]">
        <div className="mb-[clamp(20px,3.4vh,38px)] flex items-center gap-3">
          <p className="t-label">Recognition</p>
          <span className="h-px flex-1 bg-rule" />
        </div>
        <h2 className="t-h2 reveal max-w-[14ch]">They have used it</h2>
        <p className="t-body reveal mt-5">
          Nine photographs, currently flattened into one decorative JPEG on the live site with every
          caption painted into the pixels. Here each is a record — indexable, and citable in a tender.
        </p>

        <ul className="reveal mt-[clamp(26px,4vh,50px)] grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {RECOGNITION.slice(0, 3).map((r) => (
            <li key={r.id} className="group bg-paper">
              <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
                <Image
                  src={r.image}
                  alt={`${r.who} — ${r.what}`}
                  fill
                  sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw"
                  className="object-cover transition-opacity duration-700 group-hover:opacity-0"
                />
                <Image
                  src={r.imageColour}
                  alt=""
                  fill
                  aria-hidden
                  sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw"
                  className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                />
              </div>
              <div className="p-4">
                <p
                  className="text-[15px] leading-tight"
                  style={{ fontVariationSettings: '"wdth" 108, "wght" 740' }}
                >
                  {r.who}
                </p>
                <p
                  className="mt-1.5 text-[10px] uppercase text-signal"
                  style={{ fontVariationSettings: '"wdth" 100, "wght" 700', letterSpacing: "0.15em" }}
                >
                  {r.role}
                </p>
                <p className="mt-2 text-[12.5px] leading-snug text-ink-mute">{r.what}</p>
              </div>
            </li>
          ))}
        </ul>

        <Link
          href="/recognition"
          className="t-label mt-6 inline-block transition-colors hover:text-ink"
        >
          All {RECOGNITION.length} records →
        </Link>
      </section>

      {/* ── CREDENTIALS ──────────────────────────────────────── */}
      <section className="mx-auto max-w-[1560px] border-t border-rule px-[clamp(18px,3.4vw,56px)] py-[clamp(58px,8.5vh,120px)]">
        <p className="t-label mb-[clamp(20px,3.4vh,38px)]">Credentials</p>
        <ul className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {SITE.counters.map((c) => (
            <li key={c.label} className="bg-paper p-[clamp(20px,2.8vw,36px)]">
              <Counter to={c.value} suffix={c.suffix} />
              <p className="mt-3 text-[12px] leading-snug text-ink-mute">{c.label}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────── */}
      <section className="mx-auto max-w-[1560px] border-t border-rule px-[clamp(18px,3.4vw,56px)] py-[clamp(58px,8.5vh,120px)]">
        <p className="t-label mb-[clamp(20px,3.4vh,38px)]">Browse</p>
        <ul className="reveal-stagger grid gap-px border border-rule bg-rule md:grid-cols-2">
          {cats.map((c, i) => (
            <li key={c.slug} className="bg-paper">
              <Link
                href={`/products/${c.slug}`}
                className="block p-[clamp(20px,3vw,40px)] transition-colors hover:bg-paper-2"
              >
                <span className="t-data text-ink-mute">
                  {String(i + 1).padStart(2, "0")} / {String(cats.length).padStart(2, "0")}
                </span>
                <h3 className="t-h3 mt-3">{c.title}</h3>
                <p className="t-body mt-3 text-[15px]">{c.intro}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="bg-ink-max px-[clamp(18px,3.4vw,56px)] py-[clamp(52px,9vh,116px)] text-paper">
        <div className="mx-auto max-w-[1560px]">
          <p className="t-label" style={{ color: "#8A8A90" }}>
            Request a quote
          </p>
          <h2 className="t-h2 mt-4 max-w-[14ch]">Build your list. We&rsquo;ll price it.</h2>
          <p className="t-body mt-5" style={{ color: "#A5A5AB" }}>
            Add any number of products to a single request. Codes, specifications and quantities
            travel with the enquiry.
          </p>
          <Link
            href="/products"
            className="lift mt-[clamp(24px,4vh,44px)] inline-flex items-center gap-3 rounded-full bg-paper px-7 py-4 text-[15px] text-ink-max"
            style={{ fontVariationSettings: '"wdth" 110, "wght" 750' }}
          >
            <span className="h-[7px] w-[7px] rounded-full bg-signal" />
            Browse the range
          </Link>
        </div>
      </section>
    </>
  );
}
