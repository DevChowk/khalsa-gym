import { CATEGORIES, PRODUCTS } from "./data";

/**
 * 301 map from the legacy flat-PHP URLs. This is the deliverable that protects
 * the site's existing rankings — every one of the 491 legacy `.php` paths must
 * resolve here or to a canonical parent. Duplicate and typo slugs on the old
 * site (basketball/basket-ball, dustbins/bins, atheltic-, swimming-pool-accesories,
 * sports-trainining-) collapse onto one canonical target.
 */
/* 301, not Next's default 308. Both are permanent, but 301 is what every SEO
   tool, log analyser and older crawler expects on a migration of this kind. */
export type Redirect = { source: string; destination: string; statusCode: 301 };

export function legacyRedirects(): Redirect[] {
  const out: Redirect[] = [
    { source: "/index.php", destination: "/", statusCode: 301 },
    { source: "/profile.php", destination: "/recognition", statusCode: 301 },
    { source: "/enquiry.php", destination: "/quote", statusCode: 301 },

    // 5 thin doorway pages collapse onto one real page
    { source: "/green-gym-distributors.php", destination: "/products/outdoor-open-gym", statusCode: 301 },
    { source: "/open-gym-distributors.php", destination: "/products/outdoor-open-gym", statusCode: 301 },
    { source: "/open-air-gym-distributors.php", destination: "/products/outdoor-open-gym", statusCode: 301 },
    { source: "/outdoor-gym-distributors.php", destination: "/products/outdoor-open-gym", statusCode: 301 },
    { source: "/outdoor-fitness-distributors.php", destination: "/products/outdoor-open-gym", statusCode: 301 },

    // duplicate / typo slugs on the legacy site
    { source: "/basket-ball.php", destination: "/products/sports", statusCode: 301 },
    { source: "/basketball.php", destination: "/products/sports", statusCode: 301 },
    { source: "/atheltic-equipments.php", destination: "/products/sports", statusCode: 301 },
    { source: "/bins.php", destination: "/products/surfaces", statusCode: 301 },
    { source: "/dustbins.php", destination: "/products/surfaces", statusCode: 301 },
    { source: "/goal-posts-1.php", destination: "/products/sports", statusCode: 301 },
    { source: "/lawn-tennis-1.php", destination: "/products/sports", statusCode: 301 },
    { source: "/swimming-pool-accesories.php", destination: "/products/surfaces", statusCode: 301 },
    { source: "/sports-trainining-equipment.php", destination: "/products/sports", statusCode: 301 },
  ];

  for (const c of CATEGORIES) {
    for (const p of c.legacyPaths) {
      if (!out.some((r) => r.source === p)) {
        out.push({ source: p, destination: `/products/${c.slug}`, statusCode: 301 });
      }
    }
  }

  for (const p of PRODUCTS) {
    if (p.legacyPath && !out.some((r) => r.source === p.legacyPath)) {
      out.push({
        source: p.legacyPath,
        destination: `/products/${p.category}/${p.slug}`,
        statusCode: 301,
      });
    }
  }

  return out;
}
