"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fd.entries())),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error ?? "That didn't send. Please try again.");
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setMessage("Network problem — your message was not sent. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <p className="mt-6 rounded-[8px] border border-border bg-surface p-4 text-[15px] leading-relaxed text-text-2">
        Thank you — your message has reached us. We will reply on the next working day.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Name" required autoComplete="name" />
        <Field name="organisation" label="Organisation" autoComplete="organization" />
        <Field name="email" label="Email" type="email" required autoComplete="email" />
        <Field name="phone" label="Phone" type="tel" required autoComplete="tel" />
      </div>

      <div>
        <label htmlFor="subject" className="eyebrow-muted">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          className="mt-1.5 w-full rounded-[6px] border border-border-2 bg-bg px-3 py-2.5 text-[15px]"
        />
      </div>

      <div>
        <label htmlFor="message" className="eyebrow-muted">
          Message <span aria-hidden>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1.5 w-full rounded-[6px] border border-border-2 bg-bg px-3 py-2.5 text-[15px]"
          placeholder="Products, quantities, site location, timeline…"
        />
      </div>

      {/* honeypot — hidden from real users, catches naive bots */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p role="alert" className="text-[14px] text-brand-dark">
          {message}
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn btn-primary lift">
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
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
      <label htmlFor={name} className="eyebrow-muted">
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-1.5 w-full rounded-[6px] border border-border-2 bg-bg px-3 py-2.5 text-[15px]"
      />
    </div>
  );
}
