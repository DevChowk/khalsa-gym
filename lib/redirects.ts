import { LEGACY_REDIRECTS } from "./data";

/**
 * 301 map covering every one of the 491 legacy `.php` paths, generated from
 * the crawl. This is the deliverable that protects the site's existing
 * rankings — a missed path is a 404 on a page that currently ranks.
 *
 * 301, not Next's default 308: both are permanent, but 301 is what every SEO
 * tool, log analyser and older crawler expects on a migration of this kind.
 */
export type Redirect = { source: string; destination: string; statusCode: 301 };

export function legacyRedirects(): Redirect[] {
  return Object.entries(LEGACY_REDIRECTS).map(([source, destination]) => ({
    source,
    destination,
    statusCode: 301 as const,
  }));
}
