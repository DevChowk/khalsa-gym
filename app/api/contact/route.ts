import { NextResponse } from "next/server";
import { SITE } from "@/lib/data";

export const runtime = "nodejs";

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
      { ok: false, error: "Too many messages. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't read that." }, { status: 400 });
  }

  // Honeypot: accept silently so bots learn nothing.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const message = clean(body.message, 5000);

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
  if (message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Please tell us a little more so we can help." },
      { status: 400 },
    );
  }

  const payload = {
    receivedAt: new Date().toISOString(),
    from: { name, organisation: clean(body.organisation, 160), email, phone },
    subject: clean(body.subject, 200),
    message,
    to: SITE.emails,
  };

  // TODO: wire to a transactional provider (Resend / SES) and the CRM.
  console.info("[contact] new message", JSON.stringify(payload, null, 2));

  return NextResponse.json({ ok: true });
}
