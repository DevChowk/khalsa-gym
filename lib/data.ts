/**
 * Local content layer. Shapes mirror the planned Sanity schema exactly, so
 * swapping `getX()` for a GROQ query later is a one-file change.
 * All values below were extracted from the live khalsa.co.in crawl.
 */

export type Spec = { label: string; value: string };

export type Product = {
  code: string;
  slug: string;
  title: string;
  category: string; // category slug
  specs: Spec[];
  image?: string; // graded (monochrome) source
  imageColour?: string; // full-colour source, revealed on interaction
  /** true when the only photo is a busy field shot that must NOT be graded */
  colourOnly?: boolean;
  legacyPath?: string; // for the 301 map
};

export type Category = {
  slug: string;
  title: string;
  group: "play" | "fitness" | "sports" | "surfaces";
  intro: string;
  legacyPaths: string[];
};

/**
 * Range accents. Colour here is wayfinding, not decoration — with five ranges
 * and eventually ~48 categories, a consistent hue per range is how someone
 * keeps their place. Every value is >= 4.5:1 on --paper (#F7F5F2), so these
 * are safe as text as well as rules.
 */
export const GROUP_ACCENT: Record<Category["group"], { hex: string; ratio: string }> = {
  play: { hex: "#1A5FB4", ratio: "5.8:1" },
  fitness: { hex: "#B3121B", ratio: "6.4:1" },
  sports: { hex: "#146B3A", ratio: "6.0:1" },
  surfaces: { hex: "#8A5A00", ratio: "5.5:1" },
};

export function accentFor(slug: string) {
  const c = CATEGORIES.find((x) => x.slug === slug);
  return c ? GROUP_ACCENT[c.group].hex : "var(--ink)";
}

export const SITE = {
  legalName: "Khalsa Exports Private Limited",
  shortName: "Khalsa",
  founded: 1985,
  tagline: "Igniting the sporting zeal through quality equipment",
  address: {
    street: "88/1 Suraj Kund Road, Near Sati Mandir",
    city: "Meerut",
    region: "Uttar Pradesh",
    postalCode: "250001",
    country: "India",
  },
  phones: ["+91 94122 03943", "+91 93584 02281", "+91 89410 37333"],
  emails: ["infokgw@khalsa.co.in", "infokepl@khalsa.co.in"],
  counters: [
    { value: 40, suffix: "+", label: "Years of continuous manufacture" },
    { value: 27, suffix: "", label: "Certifications held" },
    { value: 14, suffix: "", label: "MSME test reports" },
    { value: 491, suffix: "", label: "Products in the catalogue" },
  ],
};

export const CERTIFICATIONS = [
  "ISO 9001", "ISO 14001", "ISO 45001", "ISO 50001", "ISO 27001", "ISO 13485",
  "EN 1176-1:2017", "EN 16630", "EN 14904", "CE", "GS", "BIFMA", "GMP", "RoHS",
];

export const TEST_REPORTS = [
  "GI pipe — thickness & coating", "Weld strength", "Bearing load",
  "Powder-coat adhesion", "Salt-spray corrosion", "Impact attenuation",
];

/** The nine photographs currently fused into one 1600×1600 JPEG on the live site. */
export const RECOGNITION = [
  {
    id: "modi",
    who: "Sh. Narendra Modi",
    role: "Prime Minister of India",
    what: "Exercising on Khalsa open-gym equipment at a Fit India exhibition.",
    image: "/recognition/modi.jpg",
    imageColour: "/recognition/modi-colour.jpg",
  },
  {
    id: "rajnath",
    who: "Sh. Rajnath Singh",
    role: "Defence Minister of India",
    what: "Exercising on Khalsa open-gym equipment during a ministerial visit.",
    image: "/recognition/rajnath.jpg",
    imageColour: "/recognition/rajnath-colour.jpg",
  },
  {
    id: "yogi",
    who: "Sh. Yogi Adityanath",
    role: "Chief Minister, Uttar Pradesh",
    what: "Reviewing the Khalsa stand alongside the Prime Minister.",
    image: "/recognition/yogi.jpg",
    imageColour: "/recognition/yogi-colour.jpg",
  },
  {
    id: "lucknow",
    who: "Khalsa Gym, Lucknow",
    role: "Municipal installation",
    what: "Inaugurated with the Mayor and the Municipal Commissioner.",
    image: "/recognition/lucknow.jpg",
    imageColour: "/recognition/lucknow-colour.jpg",
  },
  {
    id: "germany",
    who: "Germany",
    role: "International trade fair",
    what: "Khalsa Exports equipment presented to export buyers in Europe.",
    image: "/recognition/germany.jpg",
    imageColour: "/recognition/germany-colour.jpg",
  },
  {
    id: "founder",
    who: "Late Sh. Jagjit Singh",
    role: "Founder",
    what: "Representing Khalsa at the February 2024 sports fair.",
    image: "/recognition/founder.jpg",
    imageColour: "/recognition/founder-colour.jpg",
  },
];

export const CATEGORIES: Category[] = [
  {
    slug: "outdoor-open-gym",
    title: "Outdoor & open gym",
    group: "fitness",
    intro:
      "Fifty-four powder-coated stations engineered for unsupervised public use — municipal parks, gram panchayats and smart-city fitness zones.",
    legacyPaths: [
      "/outdoor-open-gym-equipment.php",
      "/outdoor-open-gym-equipments.php",
      "/green-gym.php",
      "/open-air-gym.php",
      "/outdoor-fitness.php",
    ],
  },
  {
    slug: "childrens-park",
    title: "Children's park",
    group: "play",
    intro:
      "Slides, swings, seesaws and climbers built to EN 1176 for schools, anganwadi centres and public parks.",
    legacyPaths: [
      "/children-park-equipments.php",
      "/children-playground-equipments.php",
      "/kids-play-equipments.php",
      "/kids-playground-equipment.php",
    ],
  },
  {
    slug: "multiplay",
    title: "Multi-action play systems",
    group: "play",
    intro:
      "Over two hundred configurations combining platforms, slides, climbers and tunnels into a single structure.",
    legacyPaths: ["/multiaction-play-system.php"],
  },
  {
    slug: "sports",
    title: "Sports equipment",
    group: "sports",
    intro:
      "Athletics, gymnastics, basketball and court equipment supplied and installed nationwide.",
    legacyPaths: [
      "/sports-equipments.php",
      "/athletics-equipments.php",
      "/atheltic-equipments.php",
      "/gymnastic-equipments.php",
    ],
  },
  {
    slug: "surfaces",
    title: "Surfaces & flooring",
    group: "surfaces",
    intro:
      "Synthetic turf, rubberised safety flooring, sports tiles and indoor wooden flooring.",
    legacyPaths: [
      "/synthetic-artificial-grass.php",
      "/rubberised-synthetic-flooring.php",
      "/indoor-synthetic-flooring.php",
      "/outdoor-synthetic-flooring.php",
      "/indoor-wooden-flooring.php",
    ],
  },
];

export const PRODUCTS: Product[] = [
  // ── Children's park — slides (specs read off the catalogue page scan) ──
  {
    code: "AE307", slug: "fibre-deluxe-slide-ae307", title: "Fibre Deluxe Slide",
    category: "childrens-park", image: "/products/ae307.jpg",
    specs: [
      { label: "Structure", value: "35 mm pipe / angle iron" },
      { label: "Railing pipes", value: "Fibre" },
      { label: "Gauge", value: "8 ft, 12 ft, 16 ft" },
      { label: "Sliding sheet", value: "20 ft" },
    ],
  },
  {
    code: "AE308", slug: "double-fibre-deluxe-slide-ae308", title: "Double Fibre Deluxe Slide",
    category: "childrens-park", image: "/products/ae308.jpg",
    specs: [
      { label: "Structure", value: "35 mm N.B. pipe" },
      { label: "Platform", value: "2 ft sq. in 8 ft length slide" },
      { label: "Platform", value: "2.5 ft sq. in 12 ft length slide" },
      { label: "Platform", value: "3 ft sq. in 16 ft length slide" },
    ],
  },
  {
    code: "AE309", slug: "fibre-kids-slide-ae309", title: "Fibre Kids Slide",
    category: "childrens-park",
    image: "/products/ae309.jpg", imageColour: "/products/ae309-colour.jpg",
    specs: [
      { label: "Structure", value: "25 mm N.B. pipe" },
      { label: "Slide length", value: "4 ft – 5 ft" },
    ],
  },
  {
    code: "AE310", slug: "fibre-kidswave-slide-ae310", title: "Fibre Kidswave Slide",
    category: "childrens-park",
    image: "/products/ae310.jpg", imageColour: "/products/ae310-colour.jpg",
    specs: [
      { label: "Slide", value: "Fibre" },
      { label: "Stairs", value: "35 mm" },
      { label: "Height", value: "3 ft" },
    ],
  },
  {
    code: "AE311", slug: "fibre-kids-swinger-slide-ae311", title: "Fibre Kids Swinger Slide",
    category: "childrens-park", image: "/products/ae311.jpg",
    specs: [
      { label: "Slide", value: "Fibre" },
      { label: "Stairs", value: "35 mm" },
      { label: "Height", value: "3 ft" },
    ],
  },
  {
    code: "AE312", slug: "platform-with-fibre-wave-slide-ae312", title: "Platform with Fibre Wave Slide",
    category: "childrens-park", image: "/products/ae312.jpg", colourOnly: true,
    specs: [
      { label: "Standing pipe", value: "75 mm" },
      { label: "Platform", value: "2 ft height, 2 ft × 2 ft size" },
      { label: "Railing pipe", value: "25 mm N.B." },
    ],
  },
  {
    code: "AE501", slug: "seesaw-ae501", title: "Seesaw",
    category: "childrens-park", legacyPath: "/seesaw-ae501.php",
    specs: [
      { label: "Structure pipe", value: "35 mm" },
      { label: "Handle pipe", value: "25 mm" },
      { label: "Height", value: "0.5 m" },
      { label: "Seat", value: "Fibre" },
      { label: "Capacity", value: "2 children" },
    ],
  },
  {
    code: "AE903", slug: "spiders-web-climber-ae903", title: "Spider's Web Climber",
    category: "childrens-park", legacyPath: "/spiders-web-ae903.php",
    colourOnly: true, image: "/products/ae903.jpg",
    specs: [
      { label: "Structure", value: "40 mm N.B. pipe" },
      { label: "Net", value: "16 mm PP rope" },
      { label: "Height", value: "2.4 m" },
    ],
  },

  // ── Outdoor open gym (KOG series) ──
  {
    code: "KOG-010", slug: "kog-010-air-walker", title: "Air Walker",
    category: "outdoor-open-gym", legacyPath: "/kog-010-air-walker.php",
    specs: [
      { label: "Main post", value: "114 mm dia" },
      { label: "Finish", value: "Powder-coated MS" },
      { label: "Users", value: "1" },
    ],
  },
  {
    code: "KOG-014", slug: "kog-014-leg-press", title: "Leg Press Station",
    category: "outdoor-open-gym", legacyPath: "/kog-014-leg-press.php",
    specs: [
      { label: "Main post", value: "114 mm dia" },
      { label: "Seat", value: "Moulded HDPE" },
      { label: "Finish", value: "Powder-coated MS" },
      { label: "Users", value: "1" },
    ],
  },
  {
    code: "KOG-015", slug: "kog-015-chest-press", title: "Chest Press",
    category: "outdoor-open-gym", legacyPath: "/kog-015-chest-press.php",
    specs: [
      { label: "Main post", value: "114 mm dia" },
      { label: "Finish", value: "Powder-coated MS" },
      { label: "Users", value: "1" },
    ],
  },
  {
    code: "KOG-017", slug: "kog-017-elliptical-cross-trainer", title: "Elliptical Cross Trainer",
    category: "outdoor-open-gym", legacyPath: "/kog-017-elliptical-cross-trainer.php",
    specs: [
      { label: "Main post", value: "114 mm dia" },
      { label: "Bearing", value: "Sealed, maintenance-free" },
      { label: "Users", value: "1" },
    ],
  },
  {
    code: "KOG-019", slug: "kog-019-rowing-machine", title: "Rowing Machine",
    category: "outdoor-open-gym", legacyPath: "/kog-019-rowing-machine.php",
    specs: [
      { label: "Main post", value: "114 mm dia" },
      { label: "Seat", value: "Moulded HDPE" },
      { label: "Users", value: "1" },
    ],
  },
  {
    code: "KOG-020", slug: "kog-020-triple-twister", title: "Triple Twister",
    category: "outdoor-open-gym", legacyPath: "/kog-020-triple-twister.php",
    specs: [
      { label: "Main post", value: "114 mm dia" },
      { label: "Discs", value: "3" },
      { label: "Users", value: "3" },
    ],
  },
  {
    code: "KOG-031", slug: "kog-031-parallel-bar", title: "Parallel Bar",
    category: "outdoor-open-gym", legacyPath: "/kog-031-parallel-bar.php",
    specs: [
      { label: "Main post", value: "114 mm dia" },
      { label: "Bar", value: "42 mm dia" },
      { label: "Users", value: "1" },
    ],
  },
  {
    code: "KOG-033", slug: "kog-033-pull-up-rack", title: "Pull-Up Rack",
    category: "outdoor-open-gym", legacyPath: "/kog-033-pull-up-rack.php",
    specs: [
      { label: "Main post", value: "114 mm dia" },
      { label: "Bar", value: "33 mm dia" },
      { label: "Users", value: "2" },
    ],
  },
];

/* ── accessors — swap these for GROQ queries when Sanity lands ── */

export function getCategories() {
  return CATEGORIES;
}
export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}
export function getProducts(categorySlug?: string) {
  return categorySlug
    ? PRODUCTS.filter((p) => p.category === categorySlug)
    : PRODUCTS;
}
export function getProduct(categorySlug: string, slug: string) {
  return PRODUCTS.find((p) => p.category === categorySlug && p.slug === slug);
}
export function getRelated(p: Product, limit = 4) {
  return PRODUCTS.filter(
    (x) => x.category === p.category && x.slug !== p.slug,
  ).slice(0, limit);
}
