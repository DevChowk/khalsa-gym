"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Product gallery. The first image renders as a plain <Image> so it is the LCP
 * element and is present without JS; thumbnails only swap which one is shown.
 */
export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="plate flex aspect-square items-center justify-center rounded-[10px] border border-border">
        <span className="data text-text-3">Photography being migrated</span>
      </div>
    );
  }

  return (
    <div>
      <div className="plate relative aspect-square overflow-hidden rounded-[10px] border border-border">
        <Image
          src={images[active]}
          alt={alt}
          fill
          priority
          sizes="(max-width:1024px) 92vw, 620px"
          className="object-contain p-6"
        />
      </div>

      {images.length > 1 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show photo ${i + 1} of ${images.length}`}
                aria-current={i === active}
                className={`plate relative block h-16 w-16 overflow-hidden rounded-[6px] border transition-colors ${
                  i === active ? "border-brand" : "border-border hover:border-border-2"
                }`}
              >
                <Image src={src} alt="" fill sizes="64px" className="object-contain p-1" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
