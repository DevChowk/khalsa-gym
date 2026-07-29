import type { Metadata } from "next";
import Link from "next/link";
import { getCategories, getProducts } from "@/lib/data";
import { ProductCard } from "@/components/product/ProductCard";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Playground, outdoor open-gym, sports equipment and synthetic surfaces manufactured by Khalsa Exports, Meerut. Built to EN 1176 and EN 16630.",
};

export default function ProductsIndex() {
  const cats = getCategories();

  return (
    <div className="mx-auto max-w-[1320px] px-6 py-10 lg:py-14">
      <nav aria-label="Breadcrumb" className="data mb-6 text-text-2">
        <Link href="/" className="hover:text-text">
          Home
        </Link>
        <span aria-hidden> / </span>
        <span className="text-text">Products</span>
      </nav>

      <h1 className="h2 max-w-[16ch]">The range</h1>
      <p className="lede mt-5">
        {getProducts().length} products across {cats.length} groups. Every item carries its
        manufacturing code — quote it directly in a tender document.
      </p>

      {cats.map((c) => {
        const items = getProducts(c.slug);
        if (!items.length) return null;
        return (
          <section key={c.slug} className="mt-12">
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-3">
              <h2 className="h3">{c.title}</h2>
              <Link href={`/products/${c.slug}`} className="eyebrow-muted hover:text-text">
                {items.length} products →
              </Link>
            </div>
            <ul className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-4">
              {items.map((p) => (
                <ProductCard key={p.code} product={p} />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
