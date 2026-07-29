import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/data";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${SITE.legalName} — ${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}. Manufacturer of playground, open gym and sports equipment since ${SITE.founded}.`,
  alternates: { canonical: "/contact" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.legalName,
  telephone: SITE.phones[0],
  email: SITE.emails[0],
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: "IN",
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-6 py-10 lg:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="data mb-6 text-text-2">
        <Link href="/" className="hover:text-text">
          Home
        </Link>
        <span aria-hidden> / </span>
        <span className="text-text">Contact</span>
      </nav>

      <p className="eyebrow">Get in touch</p>
      <h1 className="h1 mt-3 max-w-[18ch]">Talk to the people who build it</h1>
      <p className="lede mt-4">
        For pricing, technical drawings, site visits or distribution enquiries — reach us directly.
        If you already know what you need, a{" "}
        <Link href="/quote" className="text-brand-dark underline underline-offset-4">
          quote request
        </Link>{" "}
        gets a faster answer.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <section>
            <h2 className="h3">Works &amp; office</h2>
            <address className="mt-3 text-[15px] not-italic leading-relaxed text-text-2">
              {SITE.legalName}
              <br />
              {SITE.address.street}
              <br />
              {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}
              <br />
              {SITE.address.country}
            </address>
          </section>

          <section className="mt-8">
            <h2 className="h3">Phone</h2>
            <ul className="mt-3 space-y-1.5">
              {SITE.phones.map((p) => (
                <li key={p}>
                  <a
                    href={`tel:${p.replace(/\s/g, "")}`}
                    className="data text-text-2 transition-colors hover:text-brand-dark"
                  >
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="h3">Email</h2>
            <ul className="mt-3 space-y-1.5">
              {SITE.emails.map((e) => (
                <li key={e}>
                  <a
                    href={`mailto:${e}`}
                    className="data text-text-2 transition-colors hover:text-brand-dark"
                  >
                    {e}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="h3">Find us</h2>
            {/* lazy-loaded so the map never blocks first paint */}
            <div className="mt-3 overflow-hidden rounded-[10px] border border-border">
              <iframe
                title={`Map showing ${SITE.legalName} in ${SITE.address.city}`}
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13961.452745499193!2d77.721114!3d28.976607000000005!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c659cf6b31f8f%3A0xc67e9a972a069fa4!2sKhalsa%20Gymnastic%20Works!5e0!3m2!1sen!2sus!4v1683014463555!5m2!1sen!2sus"
                width="100%"
                height="300"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, display: "block" }}
              />
            </div>
          </section>
        </div>

        <div className="card p-6 lg:p-8">
          <h2 className="h3">Send a message</h2>
          <p className="mt-2 text-[14px] text-text-2">
            We reply on working days. Fields marked * are required.
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
