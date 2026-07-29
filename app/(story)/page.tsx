import Image from "next/image";
import Link from "next/link";
import { SITE, CERTIFICATIONS, RECOGNITION, GROUP_ACCENT, accentFor, getCategories, getProducts } from "@/lib/data";
import { Counter } from "@/components/motion/Counter";
import { Marquee } from "@/components/motion/Marquee";
import { Carousel, CarouselItem } from "@/components/ui/Carousel";

const STEPS = [
  {
    n: "1",
    title: "Browse the range",
    body: "Every product shows its manufacturing code and full specification — pipe diameter, height, capacity, materials.",
  },
  {
    n: "2",
    title: "Add what you need",
    body: "Build a list across any number of categories. Set the quantity for each item as you go.",
  },
  {
    n: "3",
    title: "Send one request",
    body: "We reply with pricing, lead time and installation. Your codes and specifications come attached automatically.",
  },
];

export default function HomePage() {
  const cats = getCategories();
  const featured = getProducts();

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="mx-auto flex max-w-[1560px] flex-col justify-end [min-height:min(76svh,820px)] px-[clamp(18px,3.4vw,56px)] pb-[clamp(22px,4vh,48px)] pt-[clamp(32px,8vh,80px)]">
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

        <div className="mt-[clamp(20px,3.5vh,40px)] flex flex-wrap items-end justify-between gap-6 border-t border-rule pt-6">
          <p className="t-body max-w-[46ch] text-[17px]">
            Khalsa Exports manufactures playground, outdoor open-gym and sports equipment in
            Meerut — supplied to municipal bodies, gram panchayats, schools and export buyers
            across four decades.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/products"
              className="lift rounded-full bg-ink px-7 py-3.5 text-[15px] text-paper"
              style={{ fontVariationSettings: '"wdth" 110, "wght" 700' }}
            >
              Browse the range
            </Link>
            <Link
              href="/quote"
              className="rounded-full border-[1.5px] border-ink px-7 py-3.5 text-[15px] transition-colors hover:bg-ink hover:text-paper"
              style={{ fontVariationSettings: '"wdth" 110, "wght" 700' }}
            >
              Request a quote
            </Link>
          </div>
        </div>
      </section>

      <Marquee
        items={["Open gym", "Children's park", "Multiplay", "Athletics", "Gymnastics", "Surfaces"]}
      />

      {/* ── WHAT WE MAKE ─────────────────────────────────────── */}
      <section className="mx-auto max-w-[1560px] px-[clamp(18px,3.4vw,56px)] py-[clamp(58px,8.5vh,110px)]">
        <SectionHead
          label="What we make"
          title="Five ranges"
          intro="Pick a range to see every product in it, with full specifications."
        />
        <ul className="reveal-stagger mt-[clamp(22px,3.5vh,40px)] grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3 [&>li]:bg-paper">
          {cats.map((c) => {
            const n = getProducts(c.slug).length;
            return (
              <li key={c.slug} className="bg-paper">
                <Link
                  href={`/products/${c.slug}`}
                  className="group flex h-full flex-col justify-between p-[clamp(20px,2.4vw,32px)] transition-colors hover:bg-paper-2"
                >
                  <div>
                    <span
                      className="mb-4 block h-1 w-10 rounded-full"
                      style={{ background: GROUP_ACCENT[c.group].hex }}
                    />
                    <h3 className="t-h3">{c.title}</h3>
                    <p className="t-body mt-3 text-[14.5px]">{c.intro}</p>
                  </div>
                  <p
                    className="t-data mt-6 flex items-center gap-2"
                    style={{ color: GROUP_ACCENT[c.group].hex }}
                  >
                    {n > 0 ? `${n} product${n === 1 ? "" : "s"}` : "View range"}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ── PRODUCT CAROUSEL ─────────────────────────────────── */}
      <section className="mx-auto max-w-[1560px] border-t border-rule px-[clamp(18px,3.4vw,56px)] py-[clamp(58px,8.5vh,110px)]">
        <SectionHead
          label="Popular products"
          title="In the catalogue"
          intro="Hover any product to see it in full colour. Every item carries its code — quote it directly in a tender."
          action={{ href: "/products", text: `All ${featured.length} products` }}
        />

        <Carousel label="Popular products" className="mt-[clamp(18px,3vh,32px)]">
          {featured.map((p) => (
            <CarouselItem key={p.code}>
              <Link
                href={`/products/${p.category}/${p.slug}`}
                className="group relative block h-full p-4 transition-colors hover:bg-paper-2"
              >
                <span
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                  style={{ background: accentFor(p.category) }}
                />
                <div className="plate relative aspect-square overflow-hidden">
                  {p.image ? (
                    <>
                      <Image
                        src={p.image}
                        alt={`${p.title} — ${p.code}`}
                        fill
                        sizes="300px"
                        className={
                          p.imageColour
                            ? "object-contain transition-opacity duration-500 group-hover:opacity-0"
                            : "object-contain"
                        }
                      />
                      {p.imageColour && (
                        <Image
                          src={p.imageColour}
                          alt=""
                          aria-hidden
                          fill
                          sizes="300px"
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
                  className="mt-3.5 text-[14px] leading-tight"
                  style={{ fontVariationSettings: '"wdth" 106, "wght" 700' }}
                >
                  {p.title}
                </p>
                <p className="mt-1.5 t-data text-ink-mute">{p.code}</p>
                <p className="mt-2.5 t-data flex items-center gap-1.5 text-ink">
                  View
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </p>
              </Link>
            </CarouselItem>
          ))}
        </Carousel>
      </section>

      {/* ── HOW TO ORDER ─────────────────────────────────────── */}
      <section className="mx-auto max-w-[1560px] border-t border-rule px-[clamp(18px,3.4vw,56px)] py-[clamp(58px,8.5vh,110px)]">
        <SectionHead
          label="How to order"
          title="Three steps"
          intro="No pricing is published — equipment is quoted to your site and quantity."
        />
        <ol className="reveal-stagger mt-[clamp(22px,3.5vh,40px)] grid gap-px border border-rule bg-rule md:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="bg-paper p-[clamp(20px,2.6vw,36px)]">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-[16px] text-paper"
                style={{ fontVariationSettings: '"wdth" 110, "wght" 750' }}
              >
                {s.n}
              </span>
              <h3 className="t-h3 mt-5">{s.title}</h3>
              <p className="t-body mt-3 text-[14.5px]">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── RECOGNITION CAROUSEL ─────────────────────────────── */}
      <section className="mx-auto max-w-[1560px] border-t border-rule px-[clamp(18px,3.4vw,56px)] py-[clamp(58px,8.5vh,110px)]">
        <SectionHead
          label="Recognition"
          title="They have used it"
          intro="The Prime Minister and the Defence Minister of India have personally used Khalsa open-gym equipment. Hover any photograph to see it in colour."
          action={{ href: "/recognition", text: "All records" }}
        />

        <Carousel label="Recognition" className="mt-[clamp(18px,3vh,32px)]">
          {RECOGNITION.map((r, i) => (
            <CarouselItem key={r.id}>
              <figure className="group m-0 h-full">
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
                    sizes="300px"
                    className="object-cover transition-opacity duration-700 group-hover:opacity-0"
                  />
                  <Image
                    src={r.imageColour}
                    alt=""
                    aria-hidden
                    fill
                    sizes="300px"
                    className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  />
                </div>
                <figcaption className="p-4">
                  <p
                    className="text-[14.5px] leading-tight"
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
                  <p className="mt-2 text-[12.5px] leading-snug text-ink-mute">{r.what}</p>
                </figcaption>
              </figure>
            </CarouselItem>
          ))}
        </Carousel>
      </section>

      {/* ── CREDENTIALS ──────────────────────────────────────── */}
      <section className="mx-auto max-w-[1560px] border-t border-rule px-[clamp(18px,3.4vw,56px)] py-[clamp(58px,8.5vh,110px)]">
        <SectionHead
          label="Credentials"
          title="Certified and tested"
          intro={`${CERTIFICATIONS.length}+ certifications including ISO 9001, EN 1176-1:2017 and EN 16630, backed by MSME test reports on pipe, weld, bearing and coating.`}
        />
        <ul className="mt-[clamp(22px,3.5vh,40px)] grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {SITE.counters.map((c) => (
            <li key={c.label} className="bg-paper p-[clamp(20px,2.8vw,36px)]">
              <Counter to={c.value} suffix={c.suffix} />
              <p className="mt-3 text-[12.5px] leading-snug text-ink-mute">{c.label}</p>
            </li>
          ))}
        </ul>
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
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="bg-ink-max px-[clamp(18px,3.4vw,56px)] py-[clamp(52px,9vh,110px)] text-paper">
        <div className="mx-auto max-w-[1560px]">
          <p className="t-label" style={{ color: "#8A8A90" }}>
            Request a quote
          </p>
          <h2 className="t-h2 mt-4 max-w-[14ch]">Build your list. We&rsquo;ll price it.</h2>
          <p className="t-body mt-5" style={{ color: "#A5A5AB" }}>
            Add any number of products to one request. Codes, specifications and quantities travel
            with it, so nothing gets lost in translation.
          </p>
          <div className="mt-[clamp(24px,4vh,44px)] flex flex-wrap gap-3">
            <Link
              href="/products"
              className="lift inline-flex items-center gap-3 rounded-full bg-paper px-7 py-4 text-[15px] text-ink-max"
              style={{ fontVariationSettings: '"wdth" 110, "wght" 750' }}
            >
              <span className="h-[7px] w-[7px] rounded-full bg-signal" />
              Browse the range
            </Link>
            <a
              href={`tel:${SITE.phones[0].replace(/\s/g, "")}`}
              className="inline-flex items-center rounded-full border-[1.5px] px-7 py-4 text-[15px] transition-colors hover:bg-paper hover:text-ink-max"
              style={{
                fontVariationSettings: '"wdth" 110, "wght" 700',
                borderColor: "rgba(244,242,237,.34)",
              }}
            >
              Call {SITE.phones[0]}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHead({
  label,
  title,
  intro,
  action,
}: {
  label: string;
  title: string;
  intro: string;
  action?: { href: string; text: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
      <div>
        <p className="t-label">{label}</p>
        <h2
          className="mt-3 uppercase"
          style={{
            fontVariationSettings: '"wdth" 118, "wght" 800',
            letterSpacing: "-0.035em",
            fontSize: "clamp(1.6rem, 3.6vw, 2.9rem)",
            lineHeight: "0.92",
          }}
        >
          {title}
        </h2>
        <p className="t-body mt-3.5 text-[15px]">{intro}</p>
      </div>
      {action && (
        <Link
          href={action.href}
          className="t-data flex items-center gap-2 whitespace-nowrap border-b border-ink pb-1 transition-opacity hover:opacity-60"
        >
          {action.text} <span aria-hidden>→</span>
        </Link>
      )}
    </div>
  );
}
