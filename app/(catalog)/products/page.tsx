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
    <div className="mx-auto max-w-[1560px] px-[clamp(18px,3.4vw,56px)] py-[clamp(40px,7vh,90px)]">
      <nav aria-label="Breadcrumb" className="t-data mb-6 text-ink-mute">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        <span aria-hidden> / </span>
        <span className="text-ink">Products</span>
      </nav>

      <h1 className="t-h2 max-w-[16ch]">The range</h1>
      <p className="t-body mt-5">
        {getProducts().length} products across {cats.length} groups. Every item carries its
        manufacturing code — quote it directly in a tender document.
      </p>

      {cats.map((c) => {
        const items = getProducts(c.slug);
        if (!items.length) return null;
        return (
          <section key={c.slug} className="mt-[clamp(40px,6vh,80px)]">
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3 border-b border-rule pb-3">
              <h2 className="t-h3">{c.title}</h2>
              <Link href={`/products/${c.slug}`} className="t-label hover:text-ink">
                {items.length} products →
              </Link>
            </div>
            <ul className="grid grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-3 lg:grid-cols-4">
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
