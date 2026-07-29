import { NextResponse } from "next/server";
import { PRODUCTS, SITE } from "@/lib/data";

export const runtime = "nodejs";

type Line = { code: string; qty: number };

/** In-memory limiter. Replace with Redis/Upstash before multi-instance deploy. */
const hits = new Map<string, { n: number; resetAt: number }>();
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.resetAt) {
    hits.set(ip, { n: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  rec.n += 1;
  return rec.n > MAX_PER_WINDOW;
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "We couldn't read that request." },
      { status: 400 },
    );
  }

  // Honeypot: a real user never fills this. Accept silently so bots learn nothing.
  if (clean(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const organisation = clean(body.organisation, 160);
  const city = clean(body.city, 120);
  const notes = clean(body.notes, 4000);

  if (!name) {
    return NextResponse.json({ ok: false, error: "Please add your name." }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "That email address doesn't look right." },
      { status: 400 },
    );
  }
  if (phone.replace(/\D/g, "").length < 7) {
    return NextResponse.json(
      { ok: false, error: "Please add a phone number we can reach you on." },
      { status: 400 },
    );
  }

  const rawLines = Array.isArray(body.lines) ? (body.lines as Line[]) : [];
  if (rawLines.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Your request is empty — add at least one product." },
      { status: 400 },
    );
  }
  if (rawLines.length > 200) {
    return NextResponse.json(
      { ok: false, error: "That's more than 200 line items. Please contact us directly." },
      { status: 400 },
    );
  }

  /* Resolve every line against the catalogue on the SERVER. The client sends only
     a code and a quantity — titles and specs are never trusted from the browser. */
  const resolved = rawLines
    .map((l) => {
      const product = PRODUCTS.find((p) => p.code === clean(l.code, 40));
      if (!product) return null;
      const qty = Math.max(1, Math.min(9999, Math.floor(Number(l.qty) || 1)));
      return { product, qty };
    })
    .filter((x): x is { product: (typeof PRODUCTS)[number]; qty: number } => x !== null);

  if (resolved.length === 0) {
    return NextResponse.json(
      { ok: false, error: "None of those products could be matched." },
      { status: 400 },
    );
  }

  const summary = resolved
    .map(
      ({ product, qty }) =>
        `${product.code} — ${product.title} × ${qty}\n` +
        product.specs.map((s) => `    ${s.label}: ${s.value}`).join("\n"),
    )
    .join("\n\n");

  const payload = {
    receivedAt: new Date().toISOString(),
    from: { name, organisation, email, phone, city },
    notes,
    itemCount: resolved.reduce((n, r) => n + r.qty, 0),
    summary,
    to: SITE.emails,
  };

  // TODO: wire to a transactional provider (Resend / SES) and the CRM.
  // Logged for now so nothing is silently dropped in development.
  console.info("[quote] new request", JSON.stringify(payload, null, 2));

  return NextResponse.json({ ok: true, itemCount: payload.itemCount });
}
