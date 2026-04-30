import { site } from "@/content/site";
import { renderEmphasis } from "@/lib/render-emphasis";

export function ContactMailto() {
  const { eyebrow, headline, lead, ctaLabel, subjectLine } = site.contact;
  const { email, phoneDisplay, phoneHref } = site.contactInfo;
  const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(subjectLine)}`;

  return (
    <section
      id="contact"
      className="bg-ink text-cream py-[clamp(4rem,8vw,7rem)] px-8"
    >
      <div className="max-w-[900px] mx-auto">
        <div className="text-[0.7rem] tracking-[0.25em] uppercase text-accent-light font-medium mb-6">
          {eyebrow}
        </div>
        <h2 className="font-serif font-normal tracking-tight leading-[1.1] text-[clamp(2rem,4vw,3rem)] mb-8 text-cream">
          {renderEmphasis(headline, "font-serif italic text-accent-light")}
        </h2>
        <p className="font-serif text-[1.3rem] leading-[1.6] text-[#d4cdbf] mb-12 max-w-[600px]">
          {lead}
        </p>

        <a
          href={mailtoHref}
          className="inline-block text-xs tracking-[0.2em] uppercase font-medium px-10 py-5 bg-accent-light text-ink no-underline hover:opacity-90 transition-opacity"
        >
          {ctaLabel}
        </a>

        <p className="text-xs text-[#9a8f7f] mt-8 leading-[1.6]">
          Or write directly to{" "}
          <a href={`mailto:${email}`} className="text-accent-light">
            {email}
          </a>{" "}
          or call{" "}
          <a href={phoneHref} className="text-accent-light">
            {phoneDisplay}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
