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
    <div className="mx-auto max-w-[1320px] px-6 py-10 lg:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="data mb-6 text-text-2">
        <Link href="/" className="hover:text-text">
          Home
        </Link>
        <span aria-hidden> / </span>
        <Link href="/products" className="hover:text-text">
          Products
        </Link>
        <span aria-hidden> / </span>
        <span className="text-text">{c.title}</span>
      </nav>

      <span
        className="mb-5 block h-1.5 w-14 rounded-full"
        style={{ background: GROUP_ACCENT[c.group].hex }}
      />
      <h1 className="h2 max-w-[16ch]">{c.title}</h1>
      <p className="lede mt-5">{c.intro}</p>
      <p className="data mt-4 text-text-2">
        {items.length} product{items.length === 1 ? "" : "s"}
      </p>

      {items.length > 0 ? (
        <ul className="mt-8 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.code} product={p} />
          ))}
        </ul>
      ) : (
        <p className="lede mt-10">
          This range is being migrated from the printed catalogue.{" "}
          <Link href="/quote" className="text-text underline underline-offset-4">
            Request a quote
          </Link>{" "}
          and we will send the current specification sheet.
        </p>
      )}
    </div>
  );
}
