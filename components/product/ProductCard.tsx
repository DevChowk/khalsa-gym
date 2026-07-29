import Image from "next/image";
import Link from "next/link";
import { accentFor, type Product } from "@/lib/data";

export function ProductCard({ product: p }: { product: Product }) {
  const img = p.images[0];
  return (
    <li>
      <Link
        href={`/products/${p.category}/${p.slug}`}
        className="card lift group relative flex h-full flex-col overflow-hidden"
      >
        <div className="plate relative aspect-square overflow-hidden border-b border-border">
          {img ? (
            <Image
              src={img}
              alt={`${p.title} — ${p.code}`}
              fill
              sizes="(max-width:640px) 45vw, (max-width:1024px) 30vw, 300px"
              className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="data text-text-3">{p.code}</span>
            </div>
          )}
          {p.images.length > 1 && (
            <span className="absolute bottom-2 right-2 rounded-full bg-bg/90 px-2 py-0.5 text-[11px] text-text-2">
              {p.images.length} photos
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-3.5">
          <p
            className="text-[14px] leading-snug"
            style={{ fontVariationSettings: '"wdth" 102, "wght" 640' }}
          >
            {p.title}
          </p>
          <div className="mt-auto flex items-center justify-between pt-2.5">
            <span className="data text-text-3">{p.code}</span>
            <span className="data" style={{ color: accentFor(p.category) }}>
              View →
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
