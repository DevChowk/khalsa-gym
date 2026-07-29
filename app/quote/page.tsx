"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuote } from "@/components/quote/QuoteStore";

type Status = "idle" | "sending" | "sent" | "error";

export default function QuotePage() {
  const { lines, setQty, remove, clear, count } = useQuote();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      organisation: String(fd.get("organisation") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      city: String(fd.get("city") ?? ""),
      notes: String(fd.get("notes") ?? ""),
      website: String(fd.get("website") ?? ""), // honeypot
      lines,
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error ?? "That didn't send. Please try again.");
        return;
      }
      setStatus("sent");
      clear();
    } catch {
      setStatus("error");
      setMessage("Network problem — your request was not sent. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="mx-auto max-w-[1560px] px-[clamp(18px,3.4vw,56px)] py-[clamp(60px,12vh,140px)]">
        <h1 className="t-h2 max-w-[14ch]">Request received</h1>
        <p className="t-body mt-6">
          Our team will come back with pricing and availability. Every product code and
          specification you selected was included.
        </p>
        <Link
          href="/products"
          className="lift mt-8 inline-flex rounded-full bg-ink px-7 py-4 text-[15px] text-paper"
          style={{ fontVariationSettings: '"wdth" 110, "wght" 750' }}
        >
          Back to the range
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1560px] px-[clamp(18px,3.4vw,56px)] py-[clamp(40px,7vh,90px)]">
      <nav aria-label="Breadcrumb" className="t-data mb-8 text-ink-mute">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        <span aria-hidden> / </span>
        <span className="text-ink">Quote request</span>
      </nav>

      <h1 className="t-h2 max-w-[14ch]">Your quote request</h1>

      {count === 0 ? (
        <>
          <p className="t-body mt-6">
            Nothing added yet. Browse the range and add any products you want priced — you can
            submit them all in one request.
          </p>
          <Link
            href="/products"
            className="lift mt-8 inline-flex rounded-full bg-ink px-7 py-4 text-[15px] text-paper"
            style={{ fontVariationSettings: '"wdth" 110, "wght" 750' }}
          >
            Browse the range
          </Link>
        </>
      ) : (
        <div className="mt-[clamp(28px,4.5vh,56px)] grid gap-[clamp(24px,4vw,64px)] lg:grid-cols-[1fr_1fr]">
          {/* lines */}
          <section aria-labelledby="lines-h">
            <h2 id="lines-h" className="t-label mb-4">
              {count} item{count === 1 ? "" : "s"}
            </h2>
            <ul className="border border-rule">
              {lines.map((l) => (
                <li
                  key={l.code}
                  className="flex items-center justify-between gap-4 border-b border-rule p-4 last:border-b-0"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/products/${l.category}/${l.slug}`}
                      className="block truncate text-[14.5px] hover:underline"
                      style={{ fontVariationSettings: '"wdth" 104, "wght" 650' }}
                    >
                      {l.title}
                    </Link>
                    <p className="mt-1 t-data text-ink-mute">{l.code}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <label className="sr-only" htmlFor={`qty-${l.code}`}>
                      Quantity for {l.title}
                    </label>
                    <input
                      id={`qty-${l.code}`}
                      type="number"
                      min={1}
                      value={l.qty}
                      onChange={(e) => setQty(l.code, Number(e.target.value))}
                      className="w-16 border border-rule-2 bg-paper px-2 py-1.5 text-center t-data"
                    />
                    <button
                      type="button"
                      onClick={() => remove(l.code)}
                      className="px-2 py-1.5 text-[12px] text-ink-mute underline underline-offset-4 hover:text-ink"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* form */}
          <section aria-labelledby="details-h">
            <h2 id="details-h" className="t-label mb-4">
              Your details
            </h2>
            <form onSubmit={onSubmit} className="grid gap-3">
              <Field name="name" label="Name" required autoComplete="name" />
              <Field name="organisation" label="Organisation / department" autoComplete="organization" />
              <Field name="email" label="Email" type="email" required autoComplete="email" />
              <Field name="phone" label="Phone" type="tel" required autoComplete="tel" />
              <Field name="city" label="City" autoComplete="address-level2" />

              <div>
                <label htmlFor="notes" className="t-label">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  className="mt-1.5 w-full border border-rule-2 bg-paper px-3 py-2.5 text-[15px]"
                  placeholder="Site, timeline, installation requirements…"
                />
              </div>

              {/* honeypot — visually and programmatically hidden from real users */}
              <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              {status === "error" && (
                <p role="alert" className="text-[13.5px] text-signal">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="lift mt-2 rounded-full bg-ink px-7 py-4 text-[15px] text-paper disabled:opacity-60"
                style={{ fontVariationSettings: '"wdth" 110, "wght" 750' }}
              >
                {status === "sending" ? "Sending…" : `Send request (${count})`}
              </button>

              <p className="text-[12px] leading-relaxed text-ink-mute">
                Product codes and full specifications are attached automatically.
              </p>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="t-label">
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-1.5 w-full border border-rule-2 bg-paper px-3 py-2.5 text-[15px]"
      />
    </div>
  );
}
