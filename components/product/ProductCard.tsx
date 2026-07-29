import Image from "next/image";
import Link from "next/link";
import { accentFor, type Product } from "@/lib/data";

/**
 * Images are boxed, never cropped or blown up. Sources are ~560px and the
 * display box stays well under that, which is what keeps them sharp.
 * Graded product shots return to colour on hover where a colour variant exists.
 */
export function ProductCard({ product: p }: { product: Product }) {
  return (
    <li className="bg-paper">
      <Link
        href={`/products/${p.category}/${p.slug}`}
        className="group relative block p-4 transition-colors hover:bg-paper-2"
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
                sizes="(max-width:640px) 45vw, (max-width:1024px) 30vw, 22vw"
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
                  sizes="(max-width:640px) 45vw, (max-width:1024px) 30vw, 22vw"
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
  );
}
