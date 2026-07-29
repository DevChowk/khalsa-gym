import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct, getRelated, getCategory, accentFor, SITE } from "@/lib/data";
import { ProductCard } from "@/components/product/ProductCard";
import { Gallery } from "@/components/product/Gallery";
import { AddToQuote } from "@/components/quote/QuoteTray";

type Props = { params: Promise<{ category: string; slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const p = getProduct(category, slug);
  if (!p) return {};
  return {
    title: `${p.title} (${p.code})`,
    description: `${p.title}, code ${p.code} — manufactured by ${SITE.legalName}, Meerut. ${p.specs
      .map((s) => `${s.label}: ${s.value}`)
      .join(". ")}.`,
    alternates: { canonical: `/products/${p.category}/${p.slug}` },
  };
}

export default async function ProductPage({ params }: Props) {
  const { category, slug } = await params;
  const p = getProduct(category, slug);
  if (!p) notFound();

  const cat = getCategory(p.category);
  const related = getRelated(p);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.title,
    sku: p.code,
    brand: { "@type": "Brand", name: "Khalsa" },
    manufacturer: { "@type": "Organization", name: SITE.legalName },
    category: cat?.title,
    additionalProperty: p.specs.map((s) => ({
      "@type": "PropertyValue",
      name: s.label,
      value: s.value,
    })),
  };

  return (
    <div className="mx-auto max-w-[1320px] px-6 py-10 lg:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="data mb-8 text-text-2">
        <Link href="/" className="hover:text-text">
          Home
        </Link>
        <span aria-hidden> / </span>
        <Link href="/products" className="hover:text-text">
          Products
        </Link>
        <span aria-hidden> / </span>
        <Link href={`/products/${p.category}`} className="hover:text-text">
          {cat?.title}
        </Link>
        <span aria-hidden> / </span>
        <span className="text-text">{p.code}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* image */}
        <Gallery images={p.images} alt={`${p.title}, product code ${p.code}`} />

        {/* detail */}
        <div>
          <p className="eyebrow-muted" style={{ color: accentFor(p.category) }}>
            {cat?.title}
          </p>
          <h1 className="h1 mt-3">{p.title}</h1>
          <p className="mt-3 data text-text-2">Product code {p.code}</p>

          {p.specs.length > 0 ? (
          <table className="mt-8 w-full border-collapse text-[14.5px]">
            <caption className="sr-only">Technical specification for {p.title}</caption>
            <tbody>
              {p.specs.map((s, i) => (
                <tr key={`${s.label}-${i}`} className="border-b border-border">
                  <th
                    scope="row"
                    className="w-[46%] py-3 text-left font-normal text-text-2"
                  >
                    {s.label}
                  </th>
                  <td className="data py-3 text-text">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          ) : (
            <p className="mt-8 rounded-[8px] border border-border bg-surface p-4 text-[14px] leading-relaxed text-text-2">
              A published specification sheet for this item is not yet online. Add it to a quote
              request and we will send the full technical drawing and dimensions.
            </p>
          )}

          <div className="mt-8">
            <AddToQuote
              code={p.code}
              title={p.title}
              slug={p.slug}
              category={p.category}
            />
            <p className="mt-3 text-[12.5px] leading-relaxed text-text-2">
              No pricing is published. Add as many products as you need and submit one request —
              codes, specifications and quantities travel with it.
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-14 border-t border-border pt-10">
          <h2 className="eyebrow-muted mb-5">More in {cat?.title}</h2>
          <ul className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-4">
            {related.map((r) => (
              <ProductCard key={r.code} product={r} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
