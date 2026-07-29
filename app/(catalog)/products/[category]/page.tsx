import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GROUP_ACCENT, getCategories, getCategory, getProducts } from "@/lib/data";
import { ProductCard } from "@/components/product/ProductCard";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return {
    title: c.title,
    description: c.intro,
    alternates: { canonical: `/products/${c.slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();

  const items = getProducts(c.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Products", item: "/products" },
      { "@type": "ListItem", position: 3, name: c.title, item: `/products/${c.slug}` },
    ],
  };

  return (
    <div className="mx-auto max-w-[1560px] px-[clamp(18px,3.4vw,56px)] py-[clamp(40px,7vh,90px)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="t-data mb-6 text-ink-mute">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        <span aria-hidden> / </span>
        <Link href="/products" className="hover:text-ink">
          Products
        </Link>
        <span aria-hidden> / </span>
        <span className="text-ink">{c.title}</span>
      </nav>

      <span
        className="mb-5 block h-1.5 w-14 rounded-full"
        style={{ background: GROUP_ACCENT[c.group].hex }}
      />
      <h1 className="t-h2 max-w-[16ch]">{c.title}</h1>
      <p className="t-body mt-5">{c.intro}</p>
      <p className="t-data mt-4 text-ink-mute">
        {items.length} product{items.length === 1 ? "" : "s"}
      </p>

      {items.length > 0 ? (
        <ul className="mt-[clamp(28px,4.5vh,56px)] grid grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.code} product={p} />
          ))}
        </ul>
      ) : (
        <p className="t-body mt-10">
          This range is being migrated from the printed catalogue.{" "}
          <Link href="/quote" className="text-ink underline underline-offset-4">
            Request a quote
          </Link>{" "}
          and we will send the current specification sheet.
        </p>
      )}
    </div>
  );
}
