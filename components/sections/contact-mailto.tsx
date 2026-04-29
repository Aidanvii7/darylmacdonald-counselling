// TBD: Daryl confirm contact email
const CONTACT_EMAIL = "hello@darylmacdonald.com";

const subject = "Booking enquiry — darylmacdonald.com";
const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

export function ContactMailto() {
  return (
    <section
      id="contact"
      className="bg-ink text-cream py-[clamp(4rem,8vw,7rem)] px-8"
    >
      <div className="max-w-[900px] mx-auto">
        <div className="text-[0.7rem] tracking-[0.25em] uppercase text-accent-light font-medium mb-6">
          04 — Contact
        </div>
        <h2 className="font-serif font-normal tracking-tight leading-[1.1] text-[clamp(2rem,4vw,3rem)] mb-8 text-cream">
          Take the{" "}
          <span className="font-serif italic text-accent-light">first step</span>.
        </h2>
        <p className="font-serif text-[1.3rem] leading-[1.6] text-[#d4cdbf] mb-12 max-w-[600px]">
          Getting in touch is often the hardest part. Send a short email and I&apos;ll
          reply within two working days.
        </p>

        <a
          href={mailtoHref}
          className="inline-block text-xs tracking-[0.2em] uppercase font-medium px-10 py-5 bg-accent-light text-ink no-underline hover:opacity-90 transition-opacity"
        >
          Email Daryl →
        </a>

        <p className="text-xs text-[#9a8f7f] mt-8 leading-[1.6]">
          Or write directly to{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent-light">
            {CONTACT_EMAIL}
          </a>
          .
          <br />
          Your message is confidential. Please don&apos;t share sensitive personal
          information in a first contact.
        </p>
      </div>
    </section>
  );
}
